import { FC } from "react";
import Head from "next/head";
import { Navbar } from "../ui";

interface Props {
    title?: string;
}

const origin = (typeof window === 'undefined') ? '' : window.location.origin;

export const Layout: FC<Props> = ({ children, title }) => {
    return (
        <>
            <Head>
                <title>{title || 'Pokémon App'}</title>
                <meta name="author" content="Gregory Palacios" />
                <meta name="description" content={`Información sobre el pokémon: ${title}`} />
                <meta name="keywords" content={`${title}, pokémon, pokedex`} />
                <meta property="og:title" content={`Pokémon: ${title}`} />
                <meta property="og:description" content={`Información sobre el pokémon: ${title}`} />
                <meta property="og:image" content={`${origin}/img/banner.png`} />
            </Head>

            <Navbar></Navbar>

            <main style={{
                padding: '10px 20px'
            }}>
                {children}
            </main>
        </>
    )
}
