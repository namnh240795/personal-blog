---
slug: vpc-practice-example-part-1
title: AWS VPC Practice - Part 1
authors: [namnguyen]
tags: [networking, aws, vpc-example]
---

VPC is the fundamental of a lot service in AWS. So let's start create our own vpc in aws via cdk.

We gonna create a VPC in AWS southeast-asia that have a vpc, one public subnet, one private subnet, one route table and one internet gateway.

![VPC Example](/img/20240531/sample-vpc.png)

<!--truncate-->

**I gonna use AWS JavaScript SDK to do this practice**

You should have your own aws account, the access key id and access key config in your local machine.

If you don't have this yet, please register account and get your environment setted up.

#### Configure your credentials

- Use this command to config your credentials

```bash
aws configure
```

- Check your credentials

```bash
cat ~/.aws/credentials
```

#### Setup CDK env

- Create Folder

```bash
mkdir vpc-aws-practice && cd vpc-aws-practice
```

- Init Project

```bash
npx cdk init app --language typescript
```

- open `vpc-aws-practice-stack.ts` you should see something like this

```ts
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class VpcAwsPracticeStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here

    // example resource
    // const queue = new sqs.Queue(this, 'VpcAwsPracticeQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
```

- Let's create new VPC with this cidr block: `10.0.0.0/16`, a public subnet with cidr block `10.0.1.0/24`, a private subnet with cidr block `10.0.10.0/24`

- The subnet cidr must be within the VPC cidr range.

```ts
const vpc = new cdk.aws_ec2.CfnVPC(this, "AWS-Practice", {
  cidrBlock: "10.0.0.0/16",
  tags: [
    {
      key: "Name",
      value: "aws-practice",
    },
  ],
});

const publicSubnet = new cdk.aws_ec2.CfnSubnet(
  this,
  "AWS-Practice-Public-Subnet",
  {
    availabilityZone: "ap-southeast-1a",
    cidrBlock: "10.0.1.0/24", // 2^8 - 5 = 251 ip addresses
    vpcId: vpc.attrVpcId,
    tags: [
      {
        key: "Name",
        value: "aws-practice-public-subnet",
      },
    ],
  }
);

const privateSubnet = new cdk.aws_ec2.CfnSubnet(
  this,
  "AWS-Practice-Private-Subnet",
  {
    availabilityZone: "ap-southeast-1b",
    cidrBlock: "10.0.10.0/24", // 2^8 - 5 = 251 ip addresses
    vpcId: vpc.attrVpcId,
    tags: [
      {
        key: "Name",
        value: "aws-practice-private-subnet",
      },
    ],
  }
);
```

- After adding the code, run this command

```bash
npx cdk deploy --profile [your_aws_credentials_profile]
```

- You should see something like this on your aws vpc:

  ![VPC Example](/img/20240531/vpc-with-subnet-only-detail.png)

- There is a route table there, it should be a default route table, it gonna help your subnet public talk to private subnet and vice versa

  ![VPC Example](/img/20240531/default-route-table.png)

- Now let's create a internet gateway and attach it to our vpc:

```ts
const internetGateway = new cdk.aws_ec2.CfnInternetGateway(
  this,
  "AWS-Practice-InternetGateway",
  {
    tags: [
      {
        key: "Name",
        value: "aws-practice-internet-gateway",
      },
    ],
  }
);

new cdk.aws_ec2.CfnVPCGatewayAttachment(
  this,
  "AWS-Practice-InternetGateway-Attachment",
  {
    vpcId: vpc.attrVpcId,
    internetGatewayId: internetGateway.ref,
  }
);
```

Run:

```bash
npx cdk deploy --profile [your_aws_credentials_profile]
```

So now we have the internet gateway, but the traffic from our subnet can not going to the internet yet because there is no linking between the internet gateway and our subnet.

![VPC Example](/img/20240531/vpc-has-internet-gateway.png)

- So now we gonna need to create a route table, attach the public subnet to the route table, and attach the route table to the internet gateway.

```ts
const publicRouteTable = new cdk.aws_ec2.CfnRouteTable(
  this,
  "AWS-Practice-PublicRouteTable",
  {
    vpcId: vpc.attrVpcId,
    tags: [
      {
        key: "Name",
        value: "aws-practice-public-route-table",
      },
    ],
  }
);

new cdk.aws_ec2.CfnSubnetRouteTableAssociation(
  this,
  "AWS-Practic-RouteTable-PublicSubnet-Association",
  {
    subnetId: publicSubnet.attrSubnetId,
    routeTableId: publicRouteTable.ref,
  }
);

new cdk.aws_ec2.CfnRoute(this, "AWS-Practic-RouteTable-InternetGateway", {
  routeTableId: publicRouteTable.attrRouteTableId,
  destinationCidrBlock: "0.0.0.0/0",
  gatewayId: internetGateway.attrInternetGatewayId,
});
```

- Run:

  ```bash
  npx cdk deploy --profile [your_aws_credentials_profile]
  ```

![vpc-has-access-to-the-internet-via-igw.png](/img/20240531/vpc-has-access-to-the-internet-via-igw.png)

Very nice. Let's take a deeper look at the route table

- The routable is associated with the vpc and the igw

  ![route-table-attach-to-igw-and-vpc.png](/img/20240531/route-table-attach-to-igw-and-vpc.png)

- And only public subnet is associated with it

  ![public-subnet-attached-to-the-route-table](/img/20240531/public-subnet-attached-to-the-route-table.png)

- And now your public subnet can go to the internet

  ![final](/img/20240531/final.png)

Yeah, that's enough for today. Next lession we gonna create the Linux instance and try to connect to it via the internet.

- Run this command after finish your work:

```bash
npx cdk destroy --profile [your_aws_credentials_profile]
```

Code example: [VPC AWS Practice](https://github.com/namnh240795/aws-cloud-formation/tree/main/vpc-aws-practice)

**Thanks for reading.**
