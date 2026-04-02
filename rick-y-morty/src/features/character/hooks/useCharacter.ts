import { useState } from "react"
import { characterService } from "@/src/features/character/services/characterService"
import { type Character } from "rickmortyapi"

export const useCharacter = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const [characters, setCharacter] = useState<Character[]>([])

    const getAllCharacters = async () => {
        try {
            const res = await characterService.getAllCharacters();
            if (res.status === 200) {
                setCharacter(res?.data?.results || []);
            }
        } catch (error) {
            setError(true)
            setMessage("Failed to load characters. Please try again.");
        } finally {
            setLoading(false);
            setTimeout(() => {
                setMessage(null)
                setError(false)
            }, 5500)
        }
    }




    return { getAllCharacters, characters, loading, error, message }
}
