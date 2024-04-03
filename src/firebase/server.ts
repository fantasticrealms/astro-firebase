import admin, {type ServiceAccount} from 'firebase-admin';
import {type App, getApps, initializeApp} from 'firebase-admin/app';

const { credential } = admin;

/**
 * Initialize app with service account credentials.
 *
 * Unless you're running the app on Google Cloud hosting infrastructure
 * (Cloud Functions, Cloud Run, etc.), then you need to configure things so
 * that either 1) or 2) below succeeds.
 *
 * 1) If .env is present, read FB_ properties from .env and use them.
 *    You can use `(project-root)/scripts/creds2env` to transform the service account
 *    credentials downloaded from the Firebase console to a .env file.
 *    Note: don't use FIREBASE_ as the prefix (this is reserved); see
 *    https://firebase.google.com/docs/functions/config-env?gen=2nd#reserved-names
 *
 * 2) If GOOGLE_APPLICATION_CREDENTIALS is set in the environment, those will be
 *    used. This is the file downloaded from the Firebase console.
 *
 * 3) Finally, application default credentials will be used (should always use
 *    them on Google Cloud infrastructure).
 */
function initFromConfig(): App {
  try {
    const serviceAccount = {
      type: "service_account",
      project_id: import.meta.env.FB_PROJECT_ID,
      private_key_id: import.meta.env.FB_PRIVATE_KEY_ID,
      private_key: import.meta.env.FB_PRIVATE_KEY,
      client_email: import.meta.env.FB_CLIENT_EMAIL,
      client_id: import.meta.env.FB_CLIENT_ID,
      auth_uri: import.meta.env.FB_AUTH_URI,
      token_uri: import.meta.env.FB_TOKEN_URI,
      auth_provider_x509_cert_url: import.meta.env.FB_AUTH_CERT_URL,
      client_x509_cert_url: import.meta.env.FB_CLIENT_CERT_URL,
      universe_domain: import.meta.env.FB_UNIVERSE_DOMAIN,
    };

    const looksValid =
        serviceAccount.project_id &&
        serviceAccount.client_email &&
        serviceAccount.private_key;

    if (looksValid) {
      console.log("INFO: reading service credentials from environment (FB_*)");
      return initializeApp({credential: credential.cert(serviceAccount as ServiceAccount)});
    }
  } catch (error) {
    console.error("ERROR: unable to initialize app from environment.", error);
  }

  const credentials = import.meta.env.GOOGLE_APPLICATION_CREDENTIALS;
  if (credentials) {
    console.log("INFO: reading service account credentials from:", credentials);
  } else {
    console.log("INFO: using application default service account credentials");
  }

  // Automatically uses GOOGLE_APPLICATION_CREDENTIALS (if set), otherwise
  // uses application default credentials (automatically provisioned on
  // Google Cloud hosting services.
  return initializeApp();
}

const activeApps = getApps();
export const app = activeApps.length ? activeApps[0] : initFromConfig();
