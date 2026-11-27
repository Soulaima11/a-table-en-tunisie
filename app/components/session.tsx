"use client";

import type { User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { getSupabase } from "../lib/supabase";

const SessionContext = createContext<User | null | undefined>(undefined);
const RecoveryContext = createContext({
  active: false,
  terminer: () => {},
});

export function SessionProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [recuperation, setRecuperation] = useState(false);
  const [user, setUser] = useState<User | null | undefined>(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? undefined : null
  );

  useEffect(() => {
    const supabase = getSupabase();
    if (!supabase) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (event === "PASSWORD_RECOVERY" && session) setRecuperation(true);
      if (event === "SIGNED_OUT") setRecuperation(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (recuperation && window.location.pathname !== "/mot-de-passe-oublie") {
      router.replace("/mot-de-passe-oublie");
    }
  }, [recuperation, router]);

  return (
    <SessionContext.Provider value={user}>
      <RecoveryContext.Provider value={{ active: recuperation, terminer: () => setRecuperation(false) }}>
        {children}
      </RecoveryContext.Provider>
    </SessionContext.Provider>
  );
}

export function useSessionUser() {
  return useContext(SessionContext);
}

export function useRecuperationMotDePasse() {
  return useContext(RecoveryContext);
}
