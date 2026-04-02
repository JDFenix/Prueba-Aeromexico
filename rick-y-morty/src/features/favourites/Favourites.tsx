import styles from "@/src/features/favourites/styles/Favourites.module.css"
import { useState } from "react"
import ListFavourites from "./ListFavourites"
import { useFavoritesStore } from "@/src/shared/store/useFavoritesStore"

export default function Favourites() {
    const [list, setList] = useState(false)
    const fetchFavorites = useFavoritesStore((state) => state.fetchFavorites)

    const handleToggleList = async () => {
        const nextState = !list
        setList(nextState)

        if (nextState) {
            await fetchFavorites()
        }
    }


    return (
        <div className={styles.favouritesContainer}>
            {list && (
                <ListFavourites />
            )}

            <button className={styles.buttonFav} onClick={handleToggleList} >FAVS</button>
        </div>
    )

}