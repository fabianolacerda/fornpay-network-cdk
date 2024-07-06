import { Aspects, Tag, aws_ec2 } from "aws-cdk-lib";
import { pascalCase } from "case-anything";
import { Construct } from "constructs";

export function defineGeneralVPC(
  scope: Construct,
  projectName: string,
  region: string
): aws_ec2.Vpc {
  const name = pascalCase(`${projectName}${region}GeneralVPC`);

  const vpc = new aws_ec2.Vpc(scope, name, {
    ipAddresses: aws_ec2.IpAddresses.cidr("10.0.0.0/16"),
    natGateways: 0,
    maxAzs: 2,
    subnetConfiguration: [
      {
        name: "public-subnet",
        subnetType: aws_ec2.SubnetType.PUBLIC,
        cidrMask: 24,
      },
    ],
  });

  Aspects.of(vpc).add(new Tag("isUnicoPagVpc", "true"));

  return vpc;
}
