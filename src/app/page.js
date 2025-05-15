"use client";
import styles from './Home.module.css';

export default function Home() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>
          SharedAI
        </h1>
        <p className={styles.subtitle}>
          Your team's real-time, collaborative AI workspace.<br />
          Select or create a project to get started.
        </p>
        <div className={styles.projectList}>
          {/* Placeholder for project/chat room list */}
          <div className={styles.projectPlaceholder}>
            <em>No projects yet. Create your first project!</em>
          </div>
        </div>
        <button
          className={styles.button}
          onClick={() => alert('Project creation coming soon!')}
        >
          + New Project
        </button>
      </div>
    </main>
  );
}
