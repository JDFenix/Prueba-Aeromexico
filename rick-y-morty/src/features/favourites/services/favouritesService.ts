import { api_json_server } from "@/src/shared/store/clientApi"
import { type Character } from "rickmortyapi"

export const favouritesService = {

  

    addFavorite: async (character: Character) => {
        const response = await api_json_server.post("/favorites", character)
        return response
    },

    getFavorites: async () => {
        const response = await api_json_server.get("/favorites")
        return response
    },

    getFavoriteByCharacterId: async (id: number) => {
        const response = await api_json_server.get("/favorites", {
            params: { id },
        })
        return response
    },

    getFavoriteByCharacterUrl: async (url: string) => {
        const response = await api_json_server.get("/favorites", {
            params: { url },
        })
        return response
    },

    deleteFavoriteRecord: async (recordId: string | number) => {
        const response = await api_json_server.delete(`/favorites/${recordId}`)
        return response
    },


}