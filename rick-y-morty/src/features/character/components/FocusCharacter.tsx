import { Character } from "rickmortyapi";
import styles from "@/src/features/character/components/styles/FocusCharacter.module.css"

export default function FocusCharacter({ characterFocus }: { characterFocus: Character }) {

    return (
        <section className={styles.focusSection}>
            <div className={styles.imageContainer}>
                <img className={styles.focusImage} src={characterFocus.image} alt={characterFocus.name} />
                <div className={styles.liveBadge}>
                    <span className={styles.liveDot}></span>
                    {characterFocus.status}
                </div>
            </div>

            <div className={styles.infoOverlay}>
                <h2 className={styles.characterName}>{characterFocus.name}</h2>
                <p className={styles.characterMeta}>{characterFocus.species}</p>

                <div className={styles.statsGrid}>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Origin</span>
                        <span className={styles.statValue}>{characterFocus.origin?.name || "Unknown"}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Location</span>
                        <span className={styles.statValue}>{characterFocus.location?.name || "Unknown"}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Gender</span>
                        <span className={styles.statValue}>{characterFocus.gender}</span>
                    </div>
                    <div className={styles.statItem}>
                        <span className={styles.statLabel}>Episodes</span>
                        <span className={styles.statValue}>{characterFocus.episode?.length || 0}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}
