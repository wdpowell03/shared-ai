"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../utils/supabaseClient";
import styles from "./home.module.css";

export default function HomePage() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session?.user) {
        router.replace("/");
      } else {
        setUser(session.user);
      }
      setLoading(false);
    });
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session?.user) {
        router.replace("/");
      } else {
        setUser(session.user);
      }
    });
    return () => {
      listener?.subscription.unsubscribe();
    };
  }, [router]);

  if (loading) {
    return <div className={styles.container}><div className={styles.card}>Loading...</div></div>;
  }
  if (!user) return null;

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.replace('/');
  };

  return (
    <div className={styles.container}>
      <button className={styles.signOutBtn} onClick={handleSignOut}>
        Sign Out
      </button>
      <div className={styles.card}>
        <div className={styles.title}>SharedAI</div>
        <div className={styles.projectList}>
          {/* Placeholder for chat/project list */}
          <div className={styles.projectPlaceholder}>
            No projects yet. Click below to start a new chat!
          </div>
        </div>
        <button className={styles.button} style={{ width: "100%" }}>
          + Start New Chat
        </button>
      </div>
    </div>
  );
}
