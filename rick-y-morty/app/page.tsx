"use client"

import ListCharacter from "@/src/features/character/components/ListCharacter";



export default function Home() {


  return (
    <main>
      <header>
        <h1>Rick y Morty</h1>
      </header>

      <div>
        <ListCharacter />
      </div>
    </main>
  );
}