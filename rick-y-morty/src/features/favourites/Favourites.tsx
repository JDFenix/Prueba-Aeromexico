import styles from "@/src/features/favourites/styles/Favourites.module.css"
import { useState } from "react"
import ListFavourites from "./ListFavourites"

export default function Favourites() {
    const [list, setList] = useState(false)


    return (
        <div>
            {list && (
                <ListFavourites />
            )}

            <button className={styles.buttonFav} onClick={() => setList(!list)} >FAVS</button>
        </div>
    )

}