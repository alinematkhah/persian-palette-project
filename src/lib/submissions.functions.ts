import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

const SubmitSchema = z.object({
  type: z.enum(["pre_register", "ads", "cooperation"]),
  name: z.string().min(1).max(200),
  phone: z.string().max(50).optional(),
  business: z.string().max(200).optional(),
  field: z.string().max(200).optional(),
  contact: z.string().max(200).optional(),
  message: z.string().max(2000).optional(),
});

export const submitForm = createServerFn({ method: "POST" })
  .inputValidator((data) => SubmitSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("submissions").insert({
      type: data.type,
      name: data.name,
      phone: data.phone ?? null,
      business: data.business ?? null,
      field: data.field ?? null,
      contact: data.contact ?? null,
      message: data.message ?? null,
    });
    if (error) {
      throw new Error(error.message);
    }

    // Best-effort sync to Google Sheets; sheet failure must not fail the submission.
    try {
      const lovableKey = process.env["LOVABLE_API_KEY"];
      const sheetsKey = process.env["GOOGLE_SHEETS_API_KEY"];
      if (lovableKey && sheetsKey) {
        const res = await fetch(
          "https://connector-gateway.lovable.dev/google_sheets/v4/spreadsheets/1B8vs4gza3N4HWfISakBFGtwglbFoLoNL6smAZUjzsbI/values/Submissions!A1:H1:append?valueInputOption=USER_ENTERED",
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${lovableKey}`,
              "X-Connection-Api-Key": sheetsKey,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              values: [[
                data.type,
                data.name,
                data.phone ?? "",
                data.business ?? "",
                data.field ?? "",
                data.contact ?? "",
                data.message ?? "",
                new Date().toISOString(),
              ]],
            }),
          },
        );
        if (!res.ok) {
          console.error("Google Sheets sync failed:", res.status, await res.text());
        }
      }
    } catch (sheetError) {
      console.error("Google Sheets sync error:", sheetError);
    }

    return { ok: true };
  });

const OwnerSignUpSchema = z.object({
  email: z.string().email().max(250),
  password: z.string().min(8).max(100),
});

export const ownerSignUp = createServerFn({ method: "POST" })
  .inputValidator((data) => OwnerSignUpSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: existing } = await supabaseAdmin
      .from("user_roles")
      .select("id")
      .eq("role", "admin")
      .limit(1);

    if (existing && existing.length > 0) {
      throw new Error("Sign up is disabled. Please sign in as the owner.");
    }

    const { data: userData, error: createError } = await supabaseAdmin.auth.admin.createUser({
      email: data.email,
      password: data.password,
      email_confirm: true,
    });

    if (createError || !userData.user) {
      throw new Error(createError?.message ?? "Failed to create owner account.");
    }

    const { error: roleError } = await supabaseAdmin.from("user_roles").insert({
      user_id: userData.user.id,
      role: "admin",
    });

    if (roleError) {
      throw new Error(roleError.message);
    }

    return { ok: true };
  });

export const getSubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { data: roleRows, error: roleError } = await context.supabase
      .from("user_roles")
      .select("id")
      .eq("user_id", context.userId)
      .eq("role", "admin")
      .limit(1);

    if (roleError || !roleRows || roleRows.length === 0) {
      throw new Error("Unauthorized");
    }

    const { data, error } = await supabaseAdmin
      .from("submissions")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      throw new Error(error.message);
    }

    return data ?? [];
  });
