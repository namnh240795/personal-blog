import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";
import * as cloudfront from "aws-cdk-lib/aws-cloudfront";
import * as cloudfront_origins from "aws-cdk-lib/aws-cloudfront-origins";
import * as iam from "aws-cdk-lib/aws-iam";
import * as acm from "aws-cdk-lib/aws-certificatemanager";

export class AwsS3Stack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    new StaticS3Service(this, "StaticS3Service", {
      domainName: "sveltevn.com",
      subDomain: "namnh240795",
    });
  }
}

interface StaticS3ServiceProps {
  domainName: string;
  subDomain: string;
}

class StaticS3Service extends Construct {
  constructor(parent: cdk.Stack, name: string, props: StaticS3ServiceProps) {
    super(parent, name);
    const siteDomain = `${props.subDomain}.${props.domainName}`;

    const siteBucket = new s3.Bucket(this, "SiteBucket", {
      bucketName: siteDomain,
      publicReadAccess: false,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
    });

    const cloudfrontOAI = new cloudfront.OriginAccessIdentity(
      this,
      "cloudfront-OAI",
      {
        comment: `OAI for ${name}`,
      }
    );

    const getObjectPolicy = new iam.PolicyStatement({
      actions: ["s3:GetObject"],
      resources: [siteBucket.arnForObjects("*")],
      principals: [
        new iam.CanonicalUserPrincipal(
          cloudfrontOAI.cloudFrontOriginAccessIdentityS3CanonicalUserId
        ),
      ],
    });

    siteBucket.addToResourcePolicy(getObjectPolicy);

    new cdk.CfnOutput(this, "Bucket", { value: siteBucket.bucketName });

    const certificate = acm.Certificate.fromCertificateArn(
      parent,
      "Certificate",
      "arn:aws:acm:us-east-1:571678314364:certificate/12f3f452-43f3-4f27-a888-618a52382105"
    );

    const functionCode = `function handler(event) {
      var request = event.request;
      var uri = request.uri;
      
      if (uri.endsWith('/')) {
          request.uri += 'index.html';
      } else if (!uri.includes('.')) {
          request.uri += '/index.html';
      }
  
      return request;
    }`;

    const distribution = new cloudfront.Distribution(this, "SiteDistribution", {
      certificate: certificate,
      defaultRootObject: "index.html",
      domainNames: [siteDomain],
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021,
      errorResponses: [
        {
          httpStatus: 404,
          responseHttpStatus: 404,
          responsePagePath: "/404.html",
          ttl: cdk.Duration.minutes(30),
        },
      ],
      defaultBehavior: {
        origin: new cloudfront_origins.S3Origin(siteBucket, {
          originAccessIdentity: cloudfrontOAI,
        }),
        compress: true,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD_OPTIONS,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        functionAssociations: [
          {
            eventType: cloudfront.FunctionEventType.VIEWER_REQUEST,
            function: new cloudfront.Function(this, "MyBlogFunction", {
              code: cloudfront.FunctionCode.fromInline(functionCode),
            }),
          },
        ],
      },
    });

    new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
      sources: [s3deploy.Source.asset("../build")],
      destinationBucket: siteBucket,
      distribution,
      distributionPaths: ["/*"],
    });
  }
}
