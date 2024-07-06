#!/usr/bin/env node
import { App } from 'aws-cdk-lib';
import 'source-map-support/register';
import { UnicoPagGeneralNetworkStack } from './stacks/network';
import { appConfig } from './utils/config';

const app = new App();

new UnicoPagGeneralNetworkStack(app, 'UnicoPagGeneralNetworkStack', {
  env: { account: appConfig.get("account"), region: appConfig.get("defaultRegion") },
});
