import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Character } from 'rickmortyapi';
import ListFavourites from '@/src/features/favourites/ListFavourites';

type FavoritesStoreMockState = {
    items: Character[];
    isLoading: boolean;
};

let storeState: FavoritesStoreMockState;

vi.mock('@/src/shared/store/useFavoritesStore', () => ({
    useFavoritesStore: (selector: (state: FavoritesStoreMockState) => unknown) => selector(storeState),
}));

const buildCharacter = (id: number, name: string): Character =>
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

describe('ListFavourites', () => {
    beforeEach(() => {
        storeState = {
            items: [],
            isLoading: false,
        };
    });

    it('muestra loading cuando el store esta cargando', () => {
        storeState.isLoading = true;

        render(<ListFavourites />);

        expect(screen.getByText('Loading favourites...')).toBeInTheDocument();
    });

    it('muestra empty state cuando no hay favoritos', () => {
        render(<ListFavourites />);

        expect(screen.getByText('No favourites yet')).toBeInTheDocument();
    });

    it('muestra solo los nombres de los favoritos', () => {
        storeState.items = [
            buildCharacter(1, 'Rick Sanchez'),
            buildCharacter(2, 'Morty Smith'),
        ];

        render(<ListFavourites />);

        expect(screen.getByText('Rick Sanchez')).toBeInTheDocument();
        expect(screen.getByText('Morty Smith')).toBeInTheDocument();
    });
});
