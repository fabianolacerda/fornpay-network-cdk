import { Stack, StackProps, aws_ec2, aws_route53 } from "aws-cdk-lib";
import { Construct } from "constructs";
import { defineGeneralVPC } from "../assets/ec2";
import { defineRootRoute53HostedZone } from "../assets/r53";
import { appConfig } from "../utils/config";

export class UnicoPagGeneralNetworkStack extends Stack {
  public appVpc: aws_ec2.Vpc;
  public route53RootHostedZone: aws_route53.IHostedZone;
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const projectName: string = appConfig.get("projectName");

    this.route53RootHostedZone = defineRootRoute53HostedZone(
      this,
      projectName,
      props.env!.region!
    );

    this.appVpc = defineGeneralVPC(this, projectName, props.env!.region!);
  }
}
