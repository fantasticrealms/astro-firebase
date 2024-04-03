import type { APIRoute } from "astro";
import { getAuth } from "firebase-admin/auth";
import { app } from "../../../firebase/server";

import { formData, get } from "../../lib/utils/formdata";

export const POST: APIRoute = async ({ request, redirect }) => {
  const auth = getAuth(app);

  /* Get form data */
  // BUG: Doesn't work when deployed, so using my custom form data parser below.
  // const formData = await request.formData();
  // const email = formData.get("email")?.toString();
  // const password = formData.get("password")?.toString();
  // const name = formData.get("name")?.toString();

  const form = await formData(request);
  const email = get(form, "email")?.toString();
  const password = get(form, "password")?.toString();
  const name = get(form, "name")?.toString();

  console.log(email, password, name);

  if (!email || !password || !name) {
    return new Response(
      JSON.stringify({
        error: "Missing data",
      }),
      { status: 400 }
    );
  }

  /* Create user */
  try {
    await auth.createUser({
      email,
      password,
      displayName: name,
    });
  } catch (error: unknown) {
    console.log("register: Error creating user:", error);
    return new Response(
      JSON.stringify({
        error: "Could not create user",
      }),
      { status: 400 }
    );
  }
  return redirect("/signin");
};
