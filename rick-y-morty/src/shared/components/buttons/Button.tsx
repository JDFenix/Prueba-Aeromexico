import { ReactNode } from "react";
import styles from "@/src/shared/components/buttons/styles/Button.module.css"
import { IconType } from "react-icons"

interface ButtonContent {
    label: string;
    className?: string;
    onClick?: () => void;
    type: "primary" | "secondary" | "cancel";
    icon?: IconType;
    iconSize?: number
}

export default function Button({ label, onClick, className = '', icon: Icon, type = "primary", iconSize = 20 }: ButtonContent) {

    const buttonStyle = styles[type];

    return (
        <button className={`${className} ${styles.baseButton} ${buttonStyle}`} onClick={onClick} >
            {Icon && <Icon size={iconSize} className={styles.icon} />}
            <span>{label}</span>
        </button>
    )

}