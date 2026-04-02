import { create } from 'zustand';
import { type Character } from 'rickmortyapi';
import { favouritesService } from '@/src/features/favourites/services/favouritesService';

const getCharacterApiId = (character: Character): number | null => {
    if (typeof character.id === 'number' && Number.isFinite(character.id)) {
        return character.id;
    }

    const urlValue = (character as { url?: unknown }).url;
    if (typeof urlValue === 'string') {
        const match = urlValue.match(/\/character\/(\d+)$/);
        if (match) {
            return Number(match[1]);
        }
    }

    const rawId = (character as { id?: unknown }).id;
    if (typeof rawId === 'string') {
        const parsed = Number(rawId);
        if (Number.isFinite(parsed)) {
            return parsed;
        }
    }

    return null;
};

const isSameCharacter = (a: Character, b: Character): boolean => {
    if (a.url && b.url && a.url === b.url) {
        return true;
    }

    const aId = getCharacterApiId(a);
    const bId = getCharacterApiId(b);
    return aId !== null && bId !== null && aId === bId;
};

const getIdentityKey = (character: Character): string => {
    if (character.url) {
        return `url:${character.url}`;
    }

    const apiId = getCharacterApiId(character);
    if (apiId !== null) {
        return `id:${apiId}`;
    }

    return `raw:${String((character as { id?: unknown }).id ?? '')}`;
};

interface FavoritesState {
    items: Character[];
    isLoading: boolean;
    fetchFavorites: () => Promise<void>;
    addFavorite: (char: Character) => Promise<void>;
    removeFavorite: (char: Character) => Promise<void>;
    toggleFavorite: (char: Character) => Promise<void>;
    isFavorite: (id: number) => boolean;
}

export const useFavoritesStore = create<FavoritesState>((set, get) => ({
    items: [],
    isLoading: false,

    fetchFavorites: async () => {
        set({ isLoading: true });
        try {
            const res = await favouritesService.getFavorites();
            const data = res.data as Character[];
            const uniqueMap = new Map<string, Character>();
            const duplicateRecordIds: Array<string | number> = [];

            data.forEach((item) => {
                const key = getIdentityKey(item);
                if (!uniqueMap.has(key)) {
                    uniqueMap.set(key, item);
                    return;
                }

                const recordId = (item as { id?: string | number }).id;
                if (typeof recordId === 'string' || typeof recordId === 'number') {
                    duplicateRecordIds.push(recordId);
                }
            });

            const uniqueItems = Array.from(uniqueMap.values());
            set({ items: uniqueItems });

            if (duplicateRecordIds.length > 0) {
                await Promise.allSettled(
                    duplicateRecordIds.map((recordId) => favouritesService.deleteFavoriteRecord(recordId))
                );
            }
        } finally {
            set({ isLoading: false });
        }
    },

    addFavorite: async (char) => {
        if (get().isFavorite(char.id)) {
            return;
        }

        try {
            const existing = await favouritesService.getFavoriteByCharacterUrl(char.url);
            if ((existing.data as Character[]).length > 0) {
                set((state) => ({
                    items: state.items.some((item) => isSameCharacter(item, char))
                        ? state.items
                        : [...state.items, existing.data[0]],
                }));
                return;
            }

            await favouritesService.addFavorite(char);
            set((state) => ({ items: [...state.items, char] }));
        } catch (error) {
            console.error('Error al guardar en db.json', error);
        }
    },

    removeFavorite: async (char) => {
        try {
            const res = await favouritesService.getFavorites();
            const records = res.data as Character[];
            const matched = records.filter((item) => isSameCharacter(item, char));

            if (matched.length > 0) {
                await Promise.allSettled(
                    matched
                        .map((item) => (item as { id?: string | number }).id)
                        .filter((id): id is string | number => typeof id === 'string' || typeof id === 'number')
                        .map((id) => favouritesService.deleteFavoriteRecord(id))
                );
            }

            set((state) => ({
                items: state.items.filter((item) => !isSameCharacter(item, char)),
            }));
        } catch (error) {
            console.error('Error al eliminar de db.json', error);
        }
    },

    toggleFavorite: async (char) => {
        if (get().isFavorite(char.id)) {
            await get().removeFavorite(char);
            return;
        }

        await get().addFavorite(char);
    },

    isFavorite: (id) => {
        return get().items.some((item) => getCharacterApiId(item) === id);
    },
}));
