import { GetStaticProps, NextPage } from 'next';
import { Grid } from '@nextui-org/react';
import { pokeApi } from '../api';
import { Layout } from '../components/layouts';
import { PokemonCard } from '../components/pokemon';
import { PokemonListResponse, SmallPokemon } from '../interfaces';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {
  return (
    <Layout title='Home - Pokémon App'>
      <Grid.Container gap={2} justify='flex-start'>
        {
          pokemons.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon}></PokemonCard>
          ))
        }
      </Grid.Container>
    </Layout>
  )
}

export const getStaticProps: GetStaticProps = async () => {

  const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');

  const pokemons: SmallPokemon[] = data.results.map((poke, idx) => ({
    ...poke,
    id: idx + 1,
    img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${idx + 1}.svg`
  }));

  return {
    props: {
      pokemons: pokemons
    }
  }
}

export default HomePage;
