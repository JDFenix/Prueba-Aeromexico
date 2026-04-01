import Button from "@/src/shared/components/buttons/Button"
import { type Character } from "rickmortyapi"
import styles from "@/src/features/character/components/styles/CardCharacter.module.css"
import { BsFillHeartPulseFill } from "react-icons/bs"
import { FaSkull, FaQuestion } from "react-icons/fa"
import { JSX } from "react"


const STATUS_STYLES: Record<string, string> = {
    Alive: styles.txtAlive,
    Dead: styles.txtDead,
    unknown: styles.txtUnknown,
};

const STATUS_ICONS: Record<string, JSX.Element> = {
    Alive: <BsFillHeartPulseFill size={16} />,
    Dead: <FaSkull size={16} />,
    unknown: <FaQuestion size={16} />,
};

export default function CardCharacter({ character }: { character: Character }) {

    const statusClass = STATUS_STYLES[character.status] || styles.txtUnknown
    const icon = STATUS_ICONS[character.status] || STATUS_ICONS.unknown;

    return (
        <article className={styles.card}>
            <img className={styles.image} src={character.image} alt="image-character" />
            <p>{character.name}</p>


            <p>{character.species}</p>
            <p>{character.gender}</p>

            <p className={`${statusClass} ${styles.txtStatus}`}>{character.status} {icon}</p>

            <p>{character.type}</p>


            <Button label="Like" type="primary" />
        </article>
    )


}