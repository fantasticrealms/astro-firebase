import admin from 'firebase-admin';
import {type App, getApps, initializeApp} from 'firebase-admin/app';

const { credential } = admin;

/**
 * Your environment should either export CREDENTIALS to point to your service
 * credentials OR not set it (if necessary in your shell, `unset CREDENTIALS`)
 * to use the default service credentials in your hosting environment (such as
 * Google Cloud).
 * @returns {App}
 */
function initFromConfig(): App {
  const configFile = import.meta.env.CREDENTIALS || "/run/secrets/credentials.json";
  try {
    console.log("INFO: using credentials from:", configFile);
    return initializeApp({credential: credential.cert(configFile)})
  } catch (err) {
    console.error("ERROR: using default initialization because unable to load credentials from:", configFile);
    console.error(err);
    return initializeApp();
  }
}

const activeApps = getApps();
export const app = activeApps.length ? activeApps[0] : initFromConfig();
