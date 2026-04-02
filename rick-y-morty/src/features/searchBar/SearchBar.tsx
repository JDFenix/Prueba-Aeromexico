import styles from "@/src/features/searchBar/SearchBar.module.css";

type SearchBarProps = {
    placeholder?: string;
};

export default function SearchBar({ placeholder = "Find your character..." }: SearchBarProps) {
    return (
        <div className={styles.wrapper}>
            <input
                className={styles.searchBar}
                type="text"
                placeholder={placeholder}
                aria-label="Search character"
            />
        </div>
    );
}
