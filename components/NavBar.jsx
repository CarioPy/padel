import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import styles from "../styles/NavBar.module.css";
import Image from "next/image";

function Navbar() {
  const { data: session, loading } = useSession();
  //className={`main-nav ${!session && loading ? "loading" : "loaded"}`}
  return (
    <nav className={styles.navHeader}>
      <Image src="/paddi-1.svg" width={60} height={60}></Image>
      <h1 className={styles.logo}>
        <a href="#">PADDI</a>
      </h1>
      <div className={styles.navRight}>
        <ul className={styles.titleList}>
          {!loading && !session && (
            <>
              <li className={styles.link}>
                <Link href="/api/auth/signin">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signIn("github");
                    }}
                  >
                    Sign In
                  </a>
                </Link>
              </li>
            </>
          )}

          {session && (
            <>
              <h1 className={styles.linktitle}>{session.user.name}</h1>
              <li className={styles.link}>
                <Link href="/api/auth/signout">
                  <a
                    onClick={(e) => {
                      e.preventDefault();
                      signOut();
                    }}
                  >
                    Sign Out
                  </a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
