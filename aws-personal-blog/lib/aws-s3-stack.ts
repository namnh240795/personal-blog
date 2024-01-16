import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import * as s3 from "aws-cdk-lib/aws-s3";
import * as s3deploy from "aws-cdk-lib/aws-s3-deployment";

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

    new cdk.CfnOutput(this, "Bucket", { value: siteBucket.bucketName });

    new s3deploy.BucketDeployment(this, "DeployWithInvalidation", {
      sources: [s3deploy.Source.asset("../build")],
      destinationBucket: siteBucket,
      // distribution,
      // distributionPaths: ["/*"],
    });
  }
}
