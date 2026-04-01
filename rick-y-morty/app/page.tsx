"use client"

import Image from "next/image";
import ListCharacter from "@/src/features/character/components/ListCharacter";
import logo from "@/assets/images/logo.png"


export default function Home() {


  return (
    <main>
      <header>
        <Image src={logo} alt="logo-rick-and-morty" />
      </header>

      <ListCharacter />
    </main>
  );
}