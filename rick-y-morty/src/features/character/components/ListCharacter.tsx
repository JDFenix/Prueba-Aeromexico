import CharacterCard from "@/src/features/character/components/CardCharacter";
import { useCharacter } from "@/src/features/character/useCharacter";
import { useEffect, useState } from "react";
import { Character } from "rickmortyapi";

export default function ListCharacter() {
    const { getAllCharacters, characters, loading, error, message } = useCharacter();
    const [characterFocus, setCharacterFocus] = useState<Character | null>(null)

    useEffect(() => {
        getAllCharacters();
    }, [])


    useEffect(() => {
        setCharacterFocus(characters[0]);
    }, [characters])


    return (
        <article>
            {loading ? (
                <p>Cargando</p>
            ) : (
                <div>
                    {message ? (
                        <p>{message}</p>
                    ) : (

                        <div>
                            {characterFocus && (
                                <div>
                                    <img src={characterFocus.image} alt="" />
                                    <p>{characterFocus.name}</p>
                                </div>
                            )}

                            <div>
                                {characters.map((c) => (
                                    <CharacterCard
                                        key={c.id}
                                        character={c}
                                        onSelect={(character) => setCharacterFocus(character)}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>


            )}
        </article>

    )

}