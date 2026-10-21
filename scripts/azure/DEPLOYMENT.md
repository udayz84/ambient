# Website deployments from cms

The workflow `.github/workflows/deploy-web.yml` deploys committed website code from
`udayz84/ambient`, branch `cms`, to `asi-prod-web`. It never deploys the Strapi CMS,
changes a database, uploads Blob files, or includes local uncommitted edits.

## Azure access

Use a user-assigned managed identity named `asi-prod-web-github` in `ASI-PROD-RG`.
Its GitHub federated credential must have these exact values:

- Issuer: `https://token.actions.githubusercontent.com`
- Subject: `repo:udayz84@182265203/ambient@1395495148:ref:refs/heads/cms`
- Audience: `api://AzureADTokenExchange`
- Role: Website Contributor, scoped only to the `asi-prod-web` resource.

The repository was created after GitHub enabled immutable OIDC subjects by default;
the owner/repository IDs above keep the trust bound to this exact repository.

Set GitHub Actions repository variables `AZURE_CLIENT_ID`, `AZURE_TENANT_ID`, and
`AZURE_SUBSCRIPTION_ID`. No GitHub repository secret or new publishing password is
required. The deployment obtains the app's existing publishing credentials in
memory using its Azure identity. Existing SCM basic publishing authentication must
remain available for Kudu ZIP deployment. Do not broaden the identity's role to the
resource group, subscription, CMS, database, or storage account.

After the first successful GitHub deployment is verified, disconnect the previous
Azure Repos source in the website's Deployment Center to prevent competing builds.
Previous source: `https://AmbientScientific@dev.azure.com/AmbientScientific/website/_git/website`,
branch `main`, App Service Build Service, Node 24 LTS.

## What happens on a push

1. Install development/build dependencies, run deployment safeguard tests, and build
   with Node 24. Existing source lint errors are reported as warnings; tests and
   build failures block release.
2. Package only the committed website source and a rollback source package for the
   last successful deployment. Both exclude CMS, environment files, and dependencies.
3. Check that changed public files served through Blob already exist there with
   the exact committed bytes. Publish those assets through the existing asset
   process before pushing; otherwise the release stops before production changes.
4. Authenticate through GitHub OIDC and send the source to this website's Kudu
   deployment endpoint. Azure builds using the existing production environment.
   `.npmrc` ensures TypeScript and Tailwind are installed even in production mode.
5. Check the release commit marker and the homepage's running Next.js build ID,
   all three icon files by SHA-256, and seven public pages.

Deployments are serialized and running deployments are not cancelled by later
pushes. GitHub can replace an older pending run with a newer pending run, so the
latest pushed commit takes precedence when several pushes arrive during a build.

## Rollback and recovery

If Azure reports a terminal build failure or the new release fails its public
checks, the workflow rebuilds and deploys the previous successful website source.
It verifies the restored pages and icons and still reports the new release as
failed. This is a source rollback; it does not undo database or Blob changes.

If upload/status becomes uncertain or Azure is still building at the timeout,
the workflow stops without starting a competing rollback. Inspect the deployment
in Azure before retrying. A source rebuild can also fail, so inspect the rollback
step's result rather than assuming recovery succeeded.

The first rollback baseline is the manually verified commit
`9fab3245aecdb008bfb11d8858c80b90ce324404`. It predates release markers: only this
exact bootstrap commit is checked by pages/icons without a build marker.
Subsequent successful workflow deployments require exact commit/build identity.

To recover manually, revert the bad commit on `cms` and push, or rerun the last
successful workflow run from GitHub Actions. Do not press Azure Repos Sync during
cutover. Preserve the startup command that clears stale icon metadata route caches:

```text
node scripts/azure/clear-icon-route-cache.mjs && NODE_ENV=production node node_modules/next/dist/bin/next start --hostname 0.0.0.0
```

Public probes verify deployment identity, routes, icons, and changed static assets;
they do not exercise email submission or every interactive feature. The current
Basic App Service plan has no staging slot, so a production restart may briefly
interrupt requests. This setup makes no plan or capacity changes.
