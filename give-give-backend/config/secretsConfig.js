const { DefaultAzureCredential } = require('@azure/identity');
const { SecretClient } = require('@azure/keyvault-secrets');

const keyVaultUrl = `https://api-keys-give-give.vault.azure.net/`;
const credential = new DefaultAzureCredential();
const secretClient = new SecretClient(keyVaultUrl, credential);

async function initializeSecrets(){
    console.log("Fetching secrets...");

    try{
        //Fetch keys from key vault
        const blobConnectionString = await secretClient.getSecret('BlobAPIKey');
        const dbUserName = await secretClient.getSecret('DBUserName');
        const dbPassword = await secretClient.getSecret('DBPassword');
        const googleApiKey = await secretClient.getSecret('GoogleAPIKey');

        //set secrets object values
        secrets.blobConnectionString = blobConnectionString.value;
        secrets.dbUserName = dbUserName.value;
        secrets.dbPassword = dbPassword.value;
        secrets.googleApiKey = googleApiKey.value;

        console.log("Secrets succesfully fetched");
    }
    catch (error){
        console.log("Failed fetching secrets", error);
    }  
}

const secrets = {
    blobConnectionString: '',
    dbUserName: '',
    dbPassword: '',
    googleApiKey: ''
}

module.exports = { secrets, initializeSecrets };