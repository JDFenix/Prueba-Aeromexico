import CharacterCard from "@/src/features/character/components/CardCharacter";
import { useCharacter } from "@/src/features/character/useCharacter";
import { useEffect, useState } from "react";
import { Character } from "rickmortyapi";
import styles from "@/src/features/character/components/styles/ListCharacter.module.css";
import FocusCharacter from "./FocusCharacter";

export default function ListCharacter() {
    const { getAllCharacters, characters, loading, error, message } = useCharacter();
    const [characterFocus, setCharacterFocus] = useState<Character | null>(null)

    useEffect(() => {
        getAllCharacters();
    }, [])


    useEffect(() => {
        if (characters.length > 0 && !characterFocus) {
            setCharacterFocus(characters[0]);
        }
    }, [characters, characterFocus])


    return (
        <article className={styles.containerArticle}>
            {loading ? (
                <p>Cargando</p>
            ) : (
                <div className={styles.bodyLayout}>
                    {message ? (
                        <p>{message}</p>
                    ) : (
                        <>
                           {characterFocus && (
                               <FocusCharacter characterFocus={characterFocus} />
                           )}

                            <section className={styles.listSection}>
                                {characters.map((c) => (
                                    <CharacterCard
                                        key={c.id}
                                        characterFocus={characterFocus}
                                        character={c}
                                        onSelect={(character) => setCharacterFocus(character)}
                                    />
                                ))}
                            </section>
                        </>
                    )}
                </div>
            )}
        </article>
    )
}