const { BlobServiceClient } = require("@azure/storage-blob");
const { ClientSecretCredential } = require("@azure/identity");

async function main() {
  const accountName = process.env.AZURE_STORAGE_ACCOUNT_NAME;
  const credential = new ClientSecretCredential(
    process.env.AZURE_TENANT_ID,
    process.env.AZURE_CLIENT_ID,
    process.env.AZURE_CLIENT_SECRET
  );
  
  const blobServiceClient = new BlobServiceClient(
    `https://${accountName}.blob.core.windows.net`,
    credential
  );

  console.log("Fetching current properties...");
  const properties = await blobServiceClient.getProperties();
  console.log("Current Default Service Version:", properties.defaultServiceVersion);

  console.log("Setting Default Service Version to 2023-11-03...");
  properties.defaultServiceVersion = "2023-11-03";
  await blobServiceClient.setProperties(properties);
  
  console.log("Successfully updated Default Service Version. Videos should now support Range requests!");
}

main().catch(console.error);
