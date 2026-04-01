import { api } from "@/src/shared/store/clientApi"

export const characterService = {

    getAllCharacters: async () => {
        const response = await api.get("/character");
        return response;
    },

    createCharacter: () => {

    }

}