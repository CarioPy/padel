import Head from "next/head";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";
import NavBar from "../../components/NavBar";
import styles from "/styles/Home.module.css";
import SideNavBar from "../../components/SideNavBar";

export default function Profile() {
  const { data: session, status } = useSession();
  console.log("Profile = ", session, status);

  return (
    <>
      <Head>
        <title>Paddi</title>
        <link rel="icon" href="/paddi-1.svg" />
      </Head>
      <NavBar />
      {!session && (
        <>
          <main className={styles.main}>
            <Image src="/paddi-1.svg" width={200} height={200}></Image>
            <Image src="/Title.svg" width={400} height={100}></Image>
          </main>
        </>
      )}
      <main className={styles.main_connected}>
        {session && <SideNavBar />}
        <div className={styles.main_container}>
          <div className={styles.titleProfile}>
            <h1>👋</h1>
            <h1>Welcome to Paddi</h1>
            <p>Paddi is a website to register your Padel Matches !</p>
            <p>
              Your profile gets created when you go to your STATS page for the
              first time
            </p>
            <p>
              To create a match, go to the match page. Register the teams with
              the exact player names in every player spots. PADDI register the
              player when the status change to black
            </p>
            <p>Indicate the score and validate ! Let PADDI do the rest !</p>
            <p></p>
            <Image src="/paddi-1.svg" width={200} height={200}></Image>
          </div>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>Paddi - Edition Thomas Allez</p>
      </footer>
    </>
  );
}
