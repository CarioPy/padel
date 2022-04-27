import Head from "next/head";
import styles from "../styles/Home.module.css";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Router from "next/router";
import NavBar from "../components/NavBar";
import Link from "next/link";

export default function Home() {
  const { data: session, status } = useSession();
  console.log(session, status);

  if (!session) {
    return (
      <div className={styles.container}>
        <Head>
          <title>Paddi</title>
          <link rel="icon" href="/paddi.svg" />
        </Head>
        <main className={styles.main}>
          <Link href="/api/auth/signin">
            <div className={styles.image_container}>
              <Image src="/paddi-1.svg" width={200} height={200}></Image>
              <Image src="/Login.svg" width={200} height={200}></Image>
            </div>
          </Link>
        </main>
      </div>
    );
  } else {
    Router.push("/profile");
  }
}
