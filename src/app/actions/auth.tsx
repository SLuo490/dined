"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export async function signUp(state: FormState, formData: FormData) {
  const supabase = await createClient();

  // Validate form fields
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
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
    };
  }

  redirect("/check-email");
}

export async function signIn() {}
