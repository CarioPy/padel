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
        <main className={styles.main}>
          <Image src="/paddi-1.svg" width={200} height={200}></Image>
          <Image src="/Title.svg" width={400} height={100}></Image>
        </main>
      )}
      {session && <SideNavBar />}
      <footer className={styles.footer}>
        <p>Paddi - Edition Thomas Allez</p>
      </footer>
    </>
  );
}
