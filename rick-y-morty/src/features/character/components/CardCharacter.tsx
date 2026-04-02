import Button from "@/src/shared/components/buttons/Button"
import { type Character } from "rickmortyapi"
import styles from "@/src/features/character/components/styles/CardCharacter.module.css"
import { BsHeart, BsHeartFill } from "react-icons/bs"
import { FaSkull, FaQuestion } from "react-icons/fa"
import { JSX } from "react"


interface cardCharacterContent {
    character: Character;
    onSelect: (character: Character) => void;
    characterFocus: Character | null;
}

export default function CardCharacter({ character, onSelect, characterFocus }: cardCharacterContent) {

    

    return (
        <article
            className={`${styles.card} ${characterFocus?.id === character.id ? styles.cardFocus : ""}`}
            onClick={() => onSelect(character)}
        >
            <p className={styles.name}>{character.name.split(" ")[0]}</p>
            <img className={styles.image} src={character.image} alt="image-character" />

            <button className={styles.likeButton}>
                <span className={styles.likeButtonIconWrapper}>
                    <BsHeart size={15} className={styles.likeButtonIcon} />
                    <BsHeartFill size={15} className={styles.likeButtonIconFill} />
                </span>
                Like
            </button>
        </article>
    )


}