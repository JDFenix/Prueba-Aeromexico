import { api } from "@/src/shared/store/clientApi"
import { api_json_server } from "@/src/shared/store/clientApi"
import { type Character } from "rickmortyapi"

export const characterService = {

    getAllCharacters: async () => {
        const response = await api.get("/character");
        return response;
    },


}