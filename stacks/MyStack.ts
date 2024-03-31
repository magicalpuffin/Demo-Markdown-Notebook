import { Certificate } from "aws-cdk-lib/aws-certificatemanager";
import { StaticSite } from "sst/constructs";
import { StackContext } from "sst/constructs";

export function API({ stack }: StackContext) {
  const site = new StaticSite(stack, "svelte", {
    path: "markdown_notebook",
    buildOutput: "build",
    buildCommand: "npm run build",
    customDomain: {
      isExternalDomain: true,
      domainName: "demo.markdown.puffinsystems.com",
      cdk: {
        certificate: Certificate.fromCertificateArn(
          stack,
          "mycert",
          process.env.CERT_ARN ?? ""
        ),
      },
    },
  });

  stack.addOutputs({
    URL: site.url,
  });
}
