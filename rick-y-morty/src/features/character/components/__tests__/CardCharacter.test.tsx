import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { type Character } from 'rickmortyapi';
import CardCharacter from '@/src/features/character/components/CardCharacter';

type FavoritesStoreMockState = {
    toggleFavorite: ReturnType<typeof vi.fn>;
    isFavorite: (id: number) => boolean;
};

let storeState: FavoritesStoreMockState;

vi.mock('@/src/shared/store/useFavoritesStore', () => ({
    useFavoritesStore: (selector: (state: FavoritesStoreMockState) => unknown) => selector(storeState),
}));

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

describe('CardCharacter', () => {
    beforeEach(() => {
        storeState = {
            toggleFavorite: vi.fn(),
            isFavorite: () => false,
        };
    });

    it('muestra Like cuando no es favorito', () => {
        const character = buildCharacter(1);

        render(
            <CardCharacter
                character={character}
                onSelect={vi.fn()}
                characterFocus={null}
            />
        );

        expect(screen.getByRole('button', { name: /like/i })).toBeInTheDocument();
    });

    it('muestra Liked cuando si es favorito', () => {
        const character = buildCharacter(2, 'Morty Smith');
        storeState.isFavorite = (id) => id === character.id;

        render(
            <CardCharacter
                character={character}
                onSelect={vi.fn()}
                characterFocus={null}
            />
        );

        expect(screen.getByRole('button', { name: /liked/i })).toBeInTheDocument();
    });

    it('click en boton llama toggleFavorite y no dispara onSelect', async () => {
        const user = userEvent.setup();
        const character = buildCharacter(3, 'Summer Smith');
        const onSelect = vi.fn();

        render(
            <CardCharacter
                character={character}
                onSelect={onSelect}
                characterFocus={null}
            />
        );

        await user.click(screen.getByRole('button', { name: /like/i }));

        expect(storeState.toggleFavorite).toHaveBeenCalledWith(character);
        expect(onSelect).not.toHaveBeenCalled();
    });
});
