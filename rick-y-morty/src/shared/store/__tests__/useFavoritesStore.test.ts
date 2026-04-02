import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Character } from 'rickmortyapi';

vi.mock('@/src/features/favourites/services/favouritesService', () => ({
    favouritesService: {
        getFavorites: vi.fn(),
        addFavorite: vi.fn(),
        getFavoriteByCharacterUrl: vi.fn(),
        deleteFavoriteRecord: vi.fn(),
    },
}));

import { useFavoritesStore } from '@/src/shared/store/useFavoritesStore';
import { favouritesService } from '@/src/features/favourites/services/favouritesService';

const getFavoritesMock = vi.mocked(favouritesService.getFavorites);
const addFavoriteMock = vi.mocked(favouritesService.addFavorite);
const getFavoriteByCharacterUrlMock = vi.mocked(favouritesService.getFavoriteByCharacterUrl);
const deleteFavoriteRecordMock = vi.mocked(favouritesService.deleteFavoriteRecord);

const buildCharacter = (id: number, name = 'Rick Sanchez'): Character =>
    ({
        id,
        name,
        status: 'Alive',
        species: 'Human',
        type: '',
        gender: 'Male',
        origin: { name: 'Earth', url: '' },
        location: { name: 'Earth', url: '' },
        image: 'https://rickandmortyapi.com/api/character/avatar/1.jpeg',
        episode: [],
        url: `https://rickandmortyapi.com/api/character/${id}`,
        created: '2017-11-04T18:48:46.250Z',
    }) as Character;

describe('useFavoritesStore', () => {
    beforeEach(() => {
        vi.clearAllMocks();
        useFavoritesStore.setState({ items: [], isLoading: false });
    });

    it('deduplica favoritos al cargar y elimina duplicados en bd', async () => {
        const duplicatedA = { ...buildCharacter(1), id: 'rec-a' } as unknown as Character;
        const duplicatedB = { ...buildCharacter(1), id: 'rec-b' } as unknown as Character;

        getFavoritesMock.mockResolvedValue({ data: [duplicatedA, duplicatedB] } as never);
        deleteFavoriteRecordMock.mockResolvedValue({} as never);

        await useFavoritesStore.getState().fetchFavorites();

        expect(useFavoritesStore.getState().items).toHaveLength(1);
        expect(deleteFavoriteRecordMock).toHaveBeenCalledWith('rec-b');
    });

    it('toggleFavorite agrega cuando no existe', async () => {
        const morty = buildCharacter(2, 'Morty Smith');

        getFavoriteByCharacterUrlMock.mockResolvedValue({ data: [] } as never);
        addFavoriteMock.mockResolvedValue({} as never);

        await useFavoritesStore.getState().toggleFavorite(morty);

        expect(addFavoriteMock).toHaveBeenCalledWith(morty);
        expect(useFavoritesStore.getState().isFavorite(2)).toBe(true);
    });

    it('toggleFavorite elimina cuando ya existe', async () => {
        const beth = buildCharacter(4, 'Beth Smith');
        useFavoritesStore.setState({ items: [beth] });

        const persistedRecord = { ...beth, id: 'db-rec-4' } as unknown as Character;
        getFavoritesMock.mockResolvedValue({ data: [persistedRecord] } as never);
        deleteFavoriteRecordMock.mockResolvedValue({} as never);

        await useFavoritesStore.getState().toggleFavorite(beth);

        expect(deleteFavoriteRecordMock).toHaveBeenCalledWith('db-rec-4');
        expect(useFavoritesStore.getState().isFavorite(4)).toBe(false);
    });

    it('isFavorite detecta personajes aunque db use id string aleatorio', () => {
        const persistedRecord = {
            ...buildCharacter(7, 'Abradolf Lincler'),
            id: 'random-db-id',
            url: 'https://rickandmortyapi.com/api/character/7',
        } as unknown as Character;

        useFavoritesStore.setState({ items: [persistedRecord] });

        expect(useFavoritesStore.getState().isFavorite(7)).toBe(true);
    });
});
