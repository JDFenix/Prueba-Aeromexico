"use client"

import Image from "next/image";
import ListCharacter from "@/src/features/character/components/ListCharacter";
import logo from "@/assets/images/logo.png"
import styles from "@/app/page.module.css"


export default function Home() {



  return (
    <main className={styles.page}>
      <header className={styles.header} >
        <Image src={logo} alt="logo-rick-and-morty" />
      </header>

      <section className={styles.characterShell}>
        <ListCharacter />
      </section>

      <footer className={styles.footer} />
    </main>
  );
}