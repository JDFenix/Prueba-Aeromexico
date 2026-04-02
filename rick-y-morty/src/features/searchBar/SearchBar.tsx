import styles from "@/src/features/searchBar/SearchBar.module.css";

type SearchBarProps = {
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
};

export default function SearchBar({
    placeholder = "Find your character...",
    value = "",
    onChange,
}: SearchBarProps) {
    return (
        <div className={styles.wrapper}>
            <input
                value={value}
                onChange={(event) => onChange?.(event.target.value)}
                className={styles.searchBar}
                type="text"
                placeholder={placeholder}
                aria-label="Search character"
            />
        </div>
    );
}
