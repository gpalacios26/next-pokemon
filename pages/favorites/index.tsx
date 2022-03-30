import { useEffect, useState } from 'react';
import { NextPage } from "next";
import { Layout } from "../../components/layouts";
import { NoFavorites } from "../../components/ui";
import { FavoritePokemons } from '../../components/pokemon';
import { localFavorites } from '../../utils';

const FavoritesPage: NextPage = () => {

    const [favoritePokemons, setFavoritePokemons] = useState<number[]>([]);

    useEffect(() => {
        setFavoritePokemons(localFavorites.pokemons());
    }, []);

    return (
        <Layout title='Favoritos - Pokémon App'>
            {
                favoritePokemons.length === 0
                    ? (<NoFavorites />)
                    : (
                        <FavoritePokemons favoritePokemons={favoritePokemons} />
                    )
            }


        </Layout>
    )
}

export default FavoritesPage;
