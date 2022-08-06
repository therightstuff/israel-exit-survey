import { RemovalPolicy, Stack } from 'aws-cdk-lib';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';

export class StaticWebsite {
    siteBucket: Bucket;
    bucketDeployment: BucketDeployment

    constructor(stack: Stack) {

        this.siteBucket = new Bucket(stack, "static-website", {
            publicReadAccess: true,
            removalPolicy: RemovalPolicy.DESTROY,
            websiteIndexDocument: "index.html"
        });

        this.bucketDeployment = new BucketDeployment(stack, "static-website-deployment", {
            sources: [Source.asset("./static-website")],
            destinationBucket: this.siteBucket
        });

   }
}