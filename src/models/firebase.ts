import { FIREBASE_SERVICE_ACCOUNT, FIREBASE_DATABASE, USERVERIFICATION_THROUGH_FIREBASE } from '../util/secrets';

//eslint-disable-next-line @typescript-eslint/no-var-requires
export const serviceAccount = require(FIREBASE_SERVICE_ACCOUNT);

if (FIREBASE_SERVICE_ACCOUNT === '' || FIREBASE_DATABASE === '') {
  if (parseInt(USERVERIFICATION_THROUGH_FIREBASE)) {
    throw new Error('Please configure env "FIREBASE_DATABASE_URL" & "FIREBASE_SERVICE_ACCOUNT"');
  }
}

// reference
// https://firebase.google.com/docs/auth/users#auth_tokens

// Firebase ID tokens = Created by Firebase when a user signs in to an app. These tokens are signed JWTs that securely
// identify a user in a Firebase project. These tokens contain basic profile information for a user, including the
//user's ID string, which is unique to the Firebase project. Because the integrity of ID tokens can be verified, you
// can send them to a backend server to identify the currently signed-in user.

// Identity provider tokens =  	Created by federated identity providers, such as Google and Facebook. These tokens
// can have different formats, but are often OAuth 2.0 access tokens. Apps use these tokens to verify that users
// have successfully authenticated with the identity provider, and then convert them into credentials usable by
// Firebase services.

// Firebase custom tokens =  	Created by your custom auth system to allow users to sign in to an app using your auth
// system. Custom tokens are JWTs signed using a service account's private key. Apps use these tokens much like they
// use the tokens returned from federated identity providers.
