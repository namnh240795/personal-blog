#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import { AwsS3Stack } from "../lib/aws-s3-stack";

const app = new cdk.App();

new AwsS3Stack(app, "DocusaurusPersonalBucket", {
  env: {
    account: process.env.CDK_DEFAULT_ACCOUNT,
    region: process.env.CDK_DEFAULT_REGION,
  },
});
