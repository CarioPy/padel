import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useSession } from "next-auth/react";
import NavBar from "../../../components/NavBar";
import styles from "../../../styles/Home.module.css";
import SideNavBar from "../../../components/SideNavBar";

export default function MatchPage() {
  const { data: session, status } = useSession();

  return (
    <>
      <Head>
        <title>Paddi</title>
        <link rel="icon" href="/paddi-1.svg" />
      </Head>
      <NavBar />
      {!session && (
        <main className={styles.main}>
          <Image src="/paddi-1.svg" width={200} height={200}></Image>
          <Image src="/Title.svg" width={400} height={100}></Image>
        </main>
      )}
      {session && (
        <>
          <div className={styles.component_container}>
            <SideNavBar />
            <div className={styles.main}>
              <Image
                src="/validation_icon.png"
                width={200}
                height={200}
              ></Image>
              <h1>Match is registered</h1>
              <h4 className={styles.subtitle}>
                Validation from other players pending
              </h4>
              <Link href="/profile/match">
                <button>New matches</button>
              </Link>
            </div>
          </div>
        </>
      )}
      <footer className={styles.footer}>
        <p className={styles.credentials}>
          Welcome on PADDI - Edition Thomas Allez
        </p>
        <Image src="/paddi-1.svg" width={20} height={20}></Image>
      </footer>
    </>
  );
}
