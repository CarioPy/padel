import Head from "next/head";
import Image from "next/image";
import { useSession } from "next-auth/react";
import NavBar from "../../../components/NavBar";
import styles from "/styles/Home.module.css";
import SideNavBar from "../../../components/SideNavBar";
import LeaderBoard from "../../../components/LeaderBoard";

export default function LeaderBoardPage() {
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
          <Image src="/paddi-1.svg" width={300} height={300}></Image>
          <Image src="/Title.svg" width={600} height={200}></Image>
        </main>
      )}
      {session && (
        <>
          <div className={styles.component_container}>
            <SideNavBar />
            <LeaderBoard />
          </div>
        </>
      )}
    </>
  );
}
