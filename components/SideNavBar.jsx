import styles from "../styles/SideNavBar.module.css";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function SideNavBar() {
  const { data: session, loading } = useSession();

  return (
    <div className={styles.main_container}>
      <div className={styles.title}>
        <Link href="/profile">
          <h4 className={styles.text}>{session.user.name}</h4>
        </Link>
      </div>
      <div className={styles.element}>
        <Link href="/profile/statistics">
          <p> Stats </p>
        </Link>
      </div>
      <div className={styles.element}>
        <Link href="/profile/leaderboard">
          <p> Board</p>
        </Link>
      </div>
      <div className={styles.element}>
        <Link href="/profile/match">
          <p> Match !</p>
        </Link>
      </div>
    </div>
  );
}
