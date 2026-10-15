import { createClient } from "./client";
import type { User } from "@supabase/supabase-js";

export interface UserProfile {
  id: string;
  email?: string;
  full_name?: string;
  avatar_url?: string;
  role?: string;
  created_at?: string;
  updated_at?: string;
}

export interface VitalRecord {
  id?: string;
  user_id: string;
  blood_pressure: string;
  glucose: number | string;
  weight: number | string;
  health_score?: number;
  steps?: number;
  heart_rate?: number;
  notes?: string;
  created_at?: string;
}

export interface AppointmentRecord {
  id?: string;
  user_id: string;
  doctor_name: string;
  specialty?: string;
  appointment_date: string;
  appointment_time: string;
  mode?: string;
  status?: string;
  booking_ref?: string;
  notes?: string;
  created_at?: string;
}

/**
 * Sync user profile to the Supabase `profiles` table.
 */
export async function syncUserProfile(user: User, fullName?: string): Promise<UserProfile | null> {
  const supabase = createClient();
  const name = fullName || user.user_metadata?.full_name || user.user_metadata?.name || user.email?.split("@")[0] || "User";

  const payload: Partial<UserProfile> = {
    id: user.id,
    email: user.email,
    full_name: name,
    avatar_url: user.user_metadata?.avatar_url || "",
    updated_at: new Date().toISOString(),
  };

  try {
    const { data, error } = await supabase
      .from("profiles")
      .upsert(payload, { onConflict: "id" })
      .select()
      .single();

    if (error) {
      console.warn("Could not sync profile to public.profiles (table may need schema run):", error.message);
      // Fallback: cache in localStorage for instant offline/unmigrated UI
      if (typeof window !== "undefined") {
        localStorage.setItem(`aura_profile_${user.id}`, JSON.stringify(payload));
      }
      return payload as UserProfile;
    }

    return data as UserProfile;
  } catch (err) {
    console.warn("Exception during profile sync:", err);
    return payload as UserProfile;
  }
}

/**
 * Fetch profile for a specific user ID.
 */
export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", userId)
      .maybeSingle();

    if (error || !data) {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`aura_profile_${userId}`);
        if (cached) return JSON.parse(cached);
      }
      return null;
    }

    return data as UserProfile;
  } catch {
    return null;
  }
}

/**
 * Fetch the latest vitals recorded for a user.
 */
export async function getUserVitals(userId: string): Promise<VitalRecord[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("vitals")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(10);

    if (error || !data || data.length === 0) {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`aura_vitals_${userId}`);
        if (cached) return JSON.parse(cached);
      }
      return [];
    }

    return data as VitalRecord[];
  } catch {
    return [];
  }
}

/**
 * Save a new vital record to the Supabase `vitals` table.
 */
export async function saveUserVitals(vitals: Omit<VitalRecord, "id" | "created_at">): Promise<{ success: boolean; data?: VitalRecord; error?: string }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("vitals")
      .insert([
        {
          user_id: vitals.user_id,
          blood_pressure: vitals.blood_pressure,
          glucose: Number(vitals.glucose) || null,
          weight: Number(vitals.weight) || null,
          health_score: vitals.health_score ?? 88,
          steps: vitals.steps,
          heart_rate: vitals.heart_rate,
          notes: vitals.notes,
        },
      ])
      .select()
      .single();

    if (error) {
      console.warn("Vitals insert error in Supabase:", error.message);
      // Fallback: save to localStorage
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem(`aura_vitals_${vitals.user_id}`) || "[]");
        const newRecord = { ...vitals, id: `local-${Date.now()}`, created_at: new Date().toISOString() };
        localStorage.setItem(`aura_vitals_${vitals.user_id}`, JSON.stringify([newRecord, ...existing]));
        return { success: true, data: newRecord as VitalRecord };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data: data as VitalRecord };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to record vitals.";
    return { success: false, error: msg };
  }
}

/**
 * Fetch appointments for a user.
 */
export async function getUserAppointments(userId: string): Promise<AppointmentRecord[]> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("appointments")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (error || !data || data.length === 0) {
      if (typeof window !== "undefined") {
        const cached = localStorage.getItem(`aura_appointments_${userId}`);
        if (cached) return JSON.parse(cached);
      }
      return [];
    }

    return data as AppointmentRecord[];
  } catch {
    return [];
  }
}

/**
 * Save an appointment to the database.
 */
export async function saveUserAppointment(appointment: Omit<AppointmentRecord, "id" | "created_at">): Promise<{ success: boolean; data?: AppointmentRecord; error?: string }> {
  const supabase = createClient();

  try {
    const { data, error } = await supabase
      .from("appointments")
      .insert([appointment])
      .select()
      .single();

    if (error) {
      console.warn("Appointment insert error:", error.message);
      if (typeof window !== "undefined") {
        const existing = JSON.parse(localStorage.getItem(`aura_appointments_${appointment.user_id}`) || "[]");
        const newRec = { ...appointment, id: `local-${Date.now()}`, created_at: new Date().toISOString() };
        localStorage.setItem(`aura_appointments_${appointment.user_id}`, JSON.stringify([newRec, ...existing]));
        return { success: true, data: newRec as AppointmentRecord };
      }
      return { success: false, error: error.message };
    }

    return { success: true, data: data as AppointmentRecord };
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Failed to record appointment.";
    return { success: false, error: msg };
  }
}

/**
 * Verify whether Supabase tables (profiles, vitals) are created.
 */
export async function checkDatabaseHealth(): Promise<{ connected: boolean; tablesFound: string[]; missingTables: string[] }> {
  const supabase = createClient();
  const tables = ["profiles", "vitals", "appointments"];
  const tablesFound: string[] = [];
  const missingTables: string[] = [];

  for (const table of tables) {
    try {
      const { error } = await supabase.from(table).select("id").limit(1);
      if (error && (error.code === "PGRST205" || error.message.includes("not find the table") || error.message.includes("does not exist"))) {
        missingTables.push(table);
      } else {
        tablesFound.push(table);
      }
    } catch {
      missingTables.push(table);
    }
  }

  return {
    connected: tablesFound.length > 0,
    tablesFound,
    missingTables,
  };
}
