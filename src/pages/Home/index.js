import React from "react";
import Tile from "../../components/Tile";
import Layout from "../../components/Layout";

const HomePage = () => {
    return (
        <Layout smallTiles header={{title: "Główna", description: "Strona główna"}}>
            <Tile title={'Witaj'}>
                Witamy na stronie KN Iotes
            </Tile>
        </Layout>
    );
};

export default HomePage;
