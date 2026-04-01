import CharacterCard from "@/src/features/character/components/CardCharacter";
import { useCharacter } from "@/src/features/character/useCharacter";
import { useEffect } from "react";

export default function ListCharacter() {
    const { getAllCharacters, characters, loading, error, message } = useCharacter();

    useEffect(() => {
        getAllCharacters()
    }, [])


    return (
        <article>
            {loading ? (
                <p>Cargando</p>
            ) : (
                <div>
                    {message ? (
                        <p>{message}</p>
                    ) : (
                        characters.map((c) => (
                            <CharacterCard key={c.id} character={c} />
                        ))
                    )}
                </div>


            )}
        </article>

    )

}