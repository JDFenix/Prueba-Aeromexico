import CharacterCard from "@/src/features/character/components/CardCharacter";
import { useCharacter } from "@/src/features/character/useCharacter";
import { useEffect, useState } from "react";
import { Character } from "rickmortyapi";
import styles from "@/src/features/character/components/styles/ListCharacter.module.css";
import FocusCharacter from "./FocusCharacter";
import SearchBar from "@/src/features/searchBar/SearchBar";
import Favourites from "../../favourites/Favourites";

export default function ListCharacter() {
    const { getAllCharacters, characters, loading, error, message } = useCharacter();
    const [characterFocus, setCharacterFocus] = useState<Character | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        getAllCharacters();
    }, [])


    useEffect(() => {
        if (characters.length > 0 && !characterFocus) {
            setCharacterFocus(characters[0]);
        }
    }, [characters, characterFocus])

    const handleSelectCharacter = (character: Character) => {
        setCharacterFocus(character);
        if (window.innerWidth <= 768) {
            setIsModalOpen(true);
        }
    };


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
                            {/* Versión Desktop: Panel Lateral */}
                            {characterFocus && (
                                <div className={styles.focusDesktop}>
                                    <FocusCharacter characterFocus={characterFocus} />
                                </div>
                            )}

                            {/* Modal para Móvil */}
                            {isModalOpen && characterFocus && (
                                <div className={styles.modalOverlay} onClick={() => setIsModalOpen(false)}>
                                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                                        <button className={styles.closeButton} onClick={() => setIsModalOpen(false)}>✕</button>
                                        <FocusCharacter characterFocus={characterFocus} />
                                    </div>
                                </div>
                            )}

                            <section className={styles.listSection}>

                                <div className={styles.searchBarSlot}>
                                    <SearchBar />
                                </div>

                                {characters.map((c) => (
                                    <CharacterCard
                                        key={c.id}
                                        characterFocus={characterFocus}
                                        character={c}
                                        onSelect={handleSelectCharacter}
                                    />
                                ))}


                                <div className={styles.favouritesOverlay}>
                                    <Favourites />
                                </div>
                            </section>
                        </>
                    )}
                </div>
            )}
        </article>
    )
}