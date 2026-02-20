"use server";

import { SignupFormSchema, FormState } from "@/lib/definitions";
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

  redirect("/confirm-email");
}

export async function signIn() {}
