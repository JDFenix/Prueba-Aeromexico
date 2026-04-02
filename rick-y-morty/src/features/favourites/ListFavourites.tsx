import styles from "@/src/features/favourites/styles/ListFavourites.module.css"
import { useFavoritesStore } from "@/src/shared/store/useFavoritesStore"

export default function ListFavourites() {
    const items = useFavoritesStore((state) => state.items)
    const isLoading = useFavoritesStore((state) => state.isLoading)

    if (isLoading) {
        return <p className={styles.feedback}>Loading favourites...</p>
    }

    if (items.length === 0) {
        return <p className={styles.feedback}>No favourites yet</p>
    }

    return (
        <ul className={styles.list}>
            {items.map((character) => (
                <li
                    key={`${character.url ?? character.id}-${character.name}`}
                    className={styles.item}
                >
                    {character.name}
                </li>
            ))}
        </ul>
    )
}