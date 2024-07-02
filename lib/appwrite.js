import { Client, Account, ID, Avatars, Databases, Query} from 'react-native-appwrite';

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
const avatars = new Avatars(client);
const databases = new Databases(client);

//create a new user
export const createUser = async (email, password, username) => {
   try {
    const newAccount = await account.create(ID.unique(), email, password, username);

    if (!newAccount) throw Error; 
    
    const avatarUrl = avatars.getInitials(username);

    await signIn(email, password);
    const newUser = await databases.createDocument(appwriteConfig.databaseId, appwriteConfig.userCollectionId, ID.unique(), {
        accountId: new account.$id, 
        email,
        username, 
        avatarUrl: avatarUrl
    })

    return newUser;

   } catch (error) {
    console.error(error);
    throw new Error (error);
   }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(
            email, password
        )

        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
       const currAccount = await account.get();

       if(!currAccount) throw Error;

       const currUser = await databases.listDocuments(appwriteConfig.databaseId, appwriteConfig.userCollectionId, [Query.equal('accountId', currAccount.$id)]);
       
       if(!currUser) throw Error;

       return currUser.documents[0];
    } catch (error) {
       throw new Error(error); 
    }
}