import { describe, expect, it, vi } from 'vitest';
import { type Character } from 'rickmortyapi';

vi.mock('@/src/shared/store/clientApi', () => ({
    api_json_server: {
        post: vi.fn(),
        get: vi.fn(),
        delete: vi.fn(),
    },
}));

import { favouritesService } from '@/src/features/favourites/services/favouritesService';
import { api_json_server } from '@/src/shared/store/clientApi';

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

describe('favouritesService', () => {
    it('addFavorite hace post al endpoint de favoritos', async () => {
        const character = buildCharacter(1);

        await favouritesService.addFavorite(character);

        expect(api_json_server.post).toHaveBeenCalledWith('/favorites', character);
    });

    it('getFavorites consulta todos los favoritos', async () => {
        await favouritesService.getFavorites();

        expect(api_json_server.get).toHaveBeenCalledWith('/favorites');
    });

    it('getFavoriteByCharacterId consulta por id', async () => {
        await favouritesService.getFavoriteByCharacterId(4);

        expect(api_json_server.get).toHaveBeenCalledWith('/favorites', {
            params: { id: 4 },
        });
    });

    it('getFavoriteByCharacterUrl consulta por url', async () => {
        const url = 'https://rickandmortyapi.com/api/character/2';

        await favouritesService.getFavoriteByCharacterUrl(url);

        expect(api_json_server.get).toHaveBeenCalledWith('/favorites', {
            params: { url },
        });
    });

    it('deleteFavoriteRecord elimina por id de registro', async () => {
        await favouritesService.deleteFavoriteRecord('abc123');

        expect(api_json_server.delete).toHaveBeenCalledWith('/favorites/abc123');
    });
});
