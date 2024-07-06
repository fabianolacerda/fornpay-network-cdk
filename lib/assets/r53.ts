import { aws_route53 } from "aws-cdk-lib";
import { pascalCase } from "case-anything";
import { Construct } from "constructs";
import { appConfig } from "../utils/config";

export function defineRootRoute53HostedZone(
  scope: Construct,
  projectName: string,
  region: string,
): aws_route53.PublicHostedZone {
  const name = pascalCase(`${projectName}${region}RootR53HostedZone`);

  const hostedZone = new aws_route53.PublicHostedZone(scope, name, {
    zoneName: appConfig.get("domainName"),
    comment: `Root Route53 Hosted Zone for ${projectName}`,
  });

  return hostedZone;
}
