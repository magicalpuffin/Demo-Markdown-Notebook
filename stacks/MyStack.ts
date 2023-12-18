import { StaticSite } from "sst/constructs";
import { StackContext } from "sst/constructs";

export function API({ stack }: StackContext) {
  const site = new StaticSite(stack, "svelte", {
    path: "markdown_notebook",
    buildOutput: "build",
    buildCommand: "npm run build",
    customDomain: {
      domainName: "demo.markdown.puffinsystems.com",
      hostedZone: "puffinsystems.com",
    },
  });

  stack.addOutputs({
    URL: site.url,
  });
}
