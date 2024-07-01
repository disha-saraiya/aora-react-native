import { Client, Account, ID} from 'react-native-appwrite';

export const appwriteConfig = { 
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.dsjsm.aora',
    projectId: '6683168c0008c161b1e0',
    databaseId: '668317d2001935c21ae2',
    userCollectionId: '668317e900199e816897',
    videoCollectionId: '66831810001fccb794e5',
    storageId:'668319b4002f120bc8ab'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(appwriteConfig.endpoint) // Your Appwrite Endpoint
    .setProject(appwriteConfig.projectId) // Your project ID
    .setPlatform(appwriteConfig.platform) // Your application ID or bundle ID.
;

//Init the appwrite account instance 
const account = new Account(client);

//create a new user
export const createUser = (email, password, username) => {
    account.create(ID.unique(), email, password, username)
    .then(function (response) {
        console.log(response);
    }, function (error) {
        console.log(error);
    });
}
