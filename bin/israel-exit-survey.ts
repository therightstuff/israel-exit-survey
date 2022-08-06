#!/usr/bin/env node
import * as cdk from 'aws-cdk-lib';
import { IsraelExitSurveyStack } from '../lib/israel-exit-survey-stack';
import loadSensitiveJson from './load-sensitive-json';
import path from 'path';
import 'source-map-support/register';

let stacksJson = loadSensitiveJson(path.resolve(__dirname, '../lib/stacks.json'));

const app = new cdk.App();
cdk.Tags.of(app).add("app", "israel-exit-survey");

// determine which stacks will be deployed to which regions
// for region-agnostic deployments, set the region to null
let stacks:any = stacksJson;

for (let name in stacks) {
    let stack:any = stacks[name];
    let regionOptions;
    let stackName = `IsraelExitSurveyStack-${name}`;
    if (!stack.region) {
        // deploy region-agnostic when no region is specified
        regionOptions = undefined;
    } else {
        regionOptions = { env: stack.region };
    }
    let stackInstance = new IsraelExitSurveyStack(
        app, stackName,
        regionOptions,
        stack
    );
    cdk.Tags.of(stackInstance).add('stack-name', stackName);
}
