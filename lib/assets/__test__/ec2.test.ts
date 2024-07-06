import { Stack, assertions } from "aws-cdk-lib";
import { defineGeneralVPC } from "../ec2";

describe("define network resources", () => {
  const PROJECT_NAME = "MyProject";
  const REGION = "us-east-1";

  test("should create vpc with correct parameters", () => {
    const stack = new Stack();
    defineGeneralVPC(stack, PROJECT_NAME, REGION);

    const template = assertions.Template.fromStack(stack);

    template.hasResourceProperties("AWS::EC2::VPC", {
      CidrBlock: "10.0.0.0/16",
    });
  });
});
