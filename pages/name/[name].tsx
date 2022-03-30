import { useState } from 'react';
import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Image from 'next/image';
import { Button, Card, Container, Grid, Text } from '@nextui-org/react';
import confetti from 'canvas-confetti';
import { pokeApi } from '../../api';
import { Layout } from "../../components/layouts";
import { Pokemon, PokemonListResponse } from "../../interfaces";
import { getPokemonInfo, localFavorites } from '../../utils';

interface Props {
    pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

    const [isInFavorites, setIsInFavorites] = useState(localFavorites.existInFavorites(pokemon.id));

    const onToogleFavorite = () => {
        localFavorites.toogleFavorite(pokemon.id);
        setIsInFavorites(!isInFavorites);

        if (isInFavorites) return;

        confetti({
            zIndex: 999,
            particleCount: 100,
            spread: 160,
            angle: -100,
            origin: {
                x: 1,
                y: 0
            }
        });
    }

    return (
        <Layout title={capitalize(pokemon.name) + ' - Pokémon App'}>
            <Grid.Container css={{ marginTop: '5px' }} gap={2}>
                <Grid xs={12} sm={4}>
                    <Card hoverable css={{ padding: '30px' }}>
                        <Card.Body>
                            <Card.Image src={pokemon.sprites.other?.dream_world.front_default || '/no-image.pmg'}
                                alt={pokemon.name} width="100%" height={200}></Card.Image>
                        </Card.Body>
                    </Card>
                </Grid>

                <Grid xs={12} sm={8}>
                    <Card>
                        <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
                            <Text h1 transform='capitalize'>{pokemon.name}</Text>

                            <Button color="gradient"
                                ghost={!isInFavorites}
                                onClick={onToogleFavorite}>
                                {isInFavorites ? 'En Favoritos' : 'Guardar en Favoritos'}
                            </Button>
                        </Card.Header>
                        <Card.Body>
                            <Text size={30}>Sprites:</Text>
                            <Container direction='row'>
                                <Image src={pokemon.sprites.front_default} alt={pokemon.name} width={100} height={100}></Image>
                                <Image src={pokemon.sprites.back_default} alt={pokemon.name} width={100} height={100}></Image>
                                <Image src={pokemon.sprites.front_shiny} alt={pokemon.name} width={100} height={100}></Image>
                                <Image src={pokemon.sprites.back_shiny} alt={pokemon.name} width={100} height={100}></Image>
                            </Container>
                        </Card.Body>
                    </Card>
                </Grid>
            </Grid.Container>
        </Layout>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {

    const { data } = await pokeApi.get<PokemonListResponse>('/pokemon?limit=151');
    const pokemonNames: string[] = data.results.map(pokemon => pokemon.name);

    return {
        paths: pokemonNames.map(name => ({
            params: { name }
        })),
        fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {

    const { name } = params as { name: string };
    const pokemon = await getPokemonInfo(name);

    if (!pokemon) {
        return {
            redirect: {
                destination: '/',
                permanent: false
            }
        }
    }

    return {
        props: {
            pokemon
        },
        revalidate: 86400,
    }
}

const capitalize = (str: string) => {
    const lower = str.toLowerCase();
    return str.charAt(0).toUpperCase() + lower.slice(1);
}

export default PokemonByNamePage;
