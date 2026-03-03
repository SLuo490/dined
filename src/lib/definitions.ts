import * as z from "zod";

export const SignupFormSchema = z.object({
  name: z
    .string()
    .min(2, { error: "Name must be at least 2 characters long." })
    .trim(),
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z
    .string()
    .min(8, { error: "Be at least 8 characters long" })
    .regex(/[a-zA-Z]/, { error: "Contain at least one letter." })
    .regex(/[0-9]/, { error: "Contain at least one number." })
    .regex(/[^a-zA-Z0-9]/, {
      error: "Contain at least one special character.",
    })
    .trim(),
});

export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
      };
      message?: string;
      inputs?: {
        name?: string;
        email?: string;
        password?: string;
      };
    }
  | undefined;

export const LoginFormSchema = z.object({
  email: z.email({ error: "Please enter a valid email." }).trim(),
  password: z.string().min(1, { error: "Password is required." }),
});

export type LoginFormState =
  | {
      error?: string;
      inputs?: {
        email?: string;
      };
    }
  | undefined;

// ── Database types ──────────────────────────────────────────────────

export interface Restaurant {
  id: string;
  slug: string;
  name: string;
  price_range: string;
  type: string;
  accessible: boolean;
  address: string;
  description: string;
  created_at: string;
  updated_at: string;
}

export interface RestaurantImage {
  id: string;
  restaurant_id: string;
  url: string;
  alt_text: string;
  display_order: number;
  created_at: string;
}

export interface Review {
  id: string;
  restaurant_id: string;
  user_id: string;
  rating: number;
  body: string;
  visited_on: string | null;
  created_at: string;
  updated_at: string;
}

export interface RestaurantStats {
  restaurant_id: string;
  avg_rating: number;
  review_count: number;
}

export interface List {
  id: string;
  user_id: string;
  name: string;
  description: string;
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface ListItem {
  id: string;
  list_id: string;
  restaurant_id: string;
  created_at: string;
}

// ── Composite types ─────────────────────────────────────────────────

export interface RestaurantSummary {
  id: string;
  slug: string;
  name: string;
  price_range: string;
  type: string;
  accessible: boolean;
  avg_rating: number;
  review_count: number;
}

export interface RestaurantDetail extends Restaurant {
  images: RestaurantImage[];
  avg_rating: number;
  review_count: number;
}
