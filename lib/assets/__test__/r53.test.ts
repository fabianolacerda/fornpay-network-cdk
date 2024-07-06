import { Stack, assertions } from "aws-cdk-lib";
import { defineRootRoute53HostedZone } from "../r53";
import { appConfig } from "../../utils/config";

describe("defineElasticContainerRegistry", () => {
  const PROJECT_NAME = "MyProject";
  const REGION = "us-east-1";

  test("should create a route 53 hosted zone with the specified parameters", () => {
    const stack = new Stack();
    defineRootRoute53HostedZone(stack, PROJECT_NAME, REGION);

    const template = assertions.Template.fromStack(stack);

    template.hasResourceProperties("AWS::Route53::HostedZone", {
      Name: appConfig.get("domainName") + ".",
      HostedZoneConfig: {
        Comment: `Root Route53 Hosted Zone for ${PROJECT_NAME}`,
      },
    });
  });
});
