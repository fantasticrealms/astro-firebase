# Astro SSR and Firebase Authentication bug

This is a template that uses [Astro](https://astro.build)
and [Firebase Authentication](https://firebase.google.com/docs/auth) to create a
simple login, logout and signup flow.

[![Open in StackBlitz](
https://developer.stackblitz.com/img/open_in_stackblitz.svg)](
https://stackblitz.com/github/fantasticrealms/astro-firebase)


## Quick start

Streamlined checklist for those already familiar with Astro and Firebase.

#### 1. Update client configuration

1. Copy `firebaseConfig` from the Firebase console [Project Settings]((https://console.firebase.google.com/u/0/project/_/settings/general))

   ```bash
   src/firebase/client.ts
   ````

#### 2. Update service account configuration

1. Generate a new private key from the Firebase console [service accounts](https://console.firebase.google.com/u/0/project/_/settings/serviceaccounts/adminsdk)
2. Run `creds2env` script to create a `.env` file from the downloaded file

   ``` bash
   # From the project root directory
   ./scripts/creds2env path-to-downloaded-credentials.json .env
   ```

#### 3. Set up the Firebase emulators

This is so the frontend can connect to backend services running locally. In
this case, the only backend services needed are for
[auth](https://firebase.google.com/docs/auth)
and
[serving dynamic pages](https://firebase.google.com/docs/hosting/functions).

1. Install [Java JDK v11](https://adoptium.net/) or higher
2. Log into Firebase

   ```bash
   npx firebase login
   ```
3. Associate with a Firebase project.

If you don't have a Firebase project, you need to create one. The easiest way
is to use the Firebase console.

If you have an existing Firebase project (ex: my-firebase-project), then run:

```bash
npx use --add my-firebase-project
```

#### 4. Start the Firebase emulators

```bash
npm run local
```

## Troubleshooting

Most common issues are:

* A stale session cookie. Fix by deleting the cookie by navigating
  to `/api/auth/signout` in the browser.
* Network error trying to access an API (like auth). Make sure you start (or)
  restart) the Firebase emulators.

<details>
   <summary>[ERROR] There is no user record corresponding to the provided identifier.</summary>
   The page tried to verify an older session cookie, but the user doesn't exist.
   This happens because users aren't saved when restarting the auth emulator.

   FIX: Delete the session cookie: navigate to `/api/auth/signout`.
</details>



 
