import { useState } from "react"
import { type Character } from "rickmortyapi"
import { favouritesService } from "../services/favouritesService"

export const useFavourite = () => {
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(false)
    const [message, setMessage] = useState<string | null>(null)

    const [characters, setCharacter] = useState<Character[]>([])



    const addFavorite = async (character: Character) => {
        return await favouritesService.addFavorite(character)
    }

    const getFavorites = async () => {
        return await favouritesService.getFavorites()
    }


    return { addFavorite, getFavorites, characters, loading, error, message }
}
