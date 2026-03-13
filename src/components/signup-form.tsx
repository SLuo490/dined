"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Alert, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

import { useActionState } from "react";
import { signUp } from "@/app/actions/auth";

import Link from "next/link";

export function SignupForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, action, isPending] = useActionState(signUp, undefined);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create your account</CardTitle>
          <CardDescription>
            Enter your email below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            {state?.message && (
              <Alert
                variant="destructive"
                className="mb-4 flex items-center gap-3 px-4 py-3"
              >
                <div>
                  <AlertCircleIcon className="h-4 w-4" />
                </div>
                <AlertTitle className="mb-0 mt-0 text-sm font-medium leading-none">
                  {state.message}
                </AlertTitle>
              </Alert>
            )}
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="jDoe"
                  defaultValue={state?.inputs?.name}
                  required
                />
                {state?.errors?.name && (
                  <FieldError
                    errors={state.errors.name.map((m) => ({ message: m }))}
                  />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="m@example.com"
                  defaultValue={state?.inputs?.email}
                  required
                />
                {state?.errors?.email && (
                  <FieldError
                    errors={state.errors.email.map((m) => ({ message: m }))}
                  />
                )}
              </Field>
              <Field>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  required
                />
                {state?.errors?.password ? (
                  <FieldError
                    errors={state.errors.password.map((m) => ({ message: m }))}
                  />
                ) : (
                  <FieldDescription>
                    Must be at least 8 characters long.
                  </FieldDescription>
                )}
              </Field>
            </FieldGroup>
            <Button type="submit" className="w-full mt-4" disabled={isPending}>
              {isPending ? "Creating account..." : "Create Account"}
            </Button>
            <p className="text-muted-foreground text-center text-sm mt-3">
              Already have an account? <Link href="/login">Sign in</Link>
            </p>
          </form>
        </CardContent>
      </Card>
      <p className="px-3 text-center text-muted-foreground text-sm leading-normal">
        By clicking continue, you agree to our{" "}
        <Link href="/terms">Terms of Service</Link> and{" "}
        <Link href="/privacy">Privacy Policy</Link>.
      </p>
    </div>
  );
}
