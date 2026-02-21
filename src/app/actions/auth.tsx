"use server";

import {
  SignupFormSchema,
  FormState,
  LoginFormSchema,
  LoginFormState,
} from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(state: FormState, formData: FormData) {
  const supabase = await createClient();

  const inputs = {
    name: formData.get("name")?.toString() || "",
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse(inputs);

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      inputs,
    };
  }

  const { email, password, name } = validatedFields.data;

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    return {
      message: error.message,
      inputs,
    };
  }

  redirect("/dashboard");
}

export async function signIn(state: LoginFormState, formData: FormData) {
  const supabase = await createClient();

  const inputs = {
    email: formData.get("email")?.toString() || "",
    password: formData.get("password")?.toString() || "",
  };

  const validatedFields = LoginFormSchema.safeParse(inputs);

  if (!validatedFields.success) {
    const fieldErrors = validatedFields.error.flatten().fieldErrors;
    return {
      error:
        fieldErrors.email?.[0] ?? fieldErrors.password?.[0] ?? "Invalid input.",
      inputs,
    };
  }

  const { email, password } = validatedFields.data;

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return {
      error: error.message,
      inputs: { email },
    };
  }

  redirect("/dashboard");
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/login");
}
