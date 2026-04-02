import Button from "@/src/shared/components/buttons/Button"
import { type Character } from "rickmortyapi"
import styles from "@/src/features/character/components/styles/CardCharacter.module.css"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FaSkull, FaQuestion } from "react-icons/fa"
import { type MouseEvent } from "react"
import { useFavoritesStore } from "@/src/shared/store/useFavoritesStore"

interface cardCharacterContent {
    character: Character;
    onSelect: (character: Character) => void;
    characterFocus: Character | null;
}

export default function CardCharacter({ character, onSelect, characterFocus }: cardCharacterContent) {
    const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);
    const favorited = useFavoritesStore((state) => state.isFavorite(character.id));

    const handleLike = (e: MouseEvent<HTMLButtonElement>) => {
        e.stopPropagation();
        toggleFavorite(character);
    };

    return (
        <article
            className={`${styles.card} ${characterFocus?.id === character.id ? styles.cardFocus : ""}`}
            onClick={() => onSelect(character)}
        >
            <p className={styles.name}>{character.name.split(" ")[0]}</p>
            <img className={styles.image} src={character.image} alt="image-character" />

            <button className={styles.likeButton} onClick={handleLike}>
                <span className={styles.likeButtonIconWrapper}>
                    {favorited ? (
                        <BsHeartFill size={15} className={styles.likeButtonIconFillActive} />
                    ) : (
                        <BsHeart size={15} className={styles.likeButtonIcon} />
                    )}
                </span>
                {favorited ? "Liked" : "Like"}
            </button>
        </article>
    )


}
