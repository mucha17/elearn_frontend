import React from "react";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

const Courses = () => {
    const leftMenu = [
        {
            id: 0,
            name: "Java",
            to: "/courses/java",
            description: 'Kursy są przeznaczone dla fanatyków programowania'
        },
        {
            id: 1,
            name: "PHP",
            to: "/courses/php",
            description: 'Kursy są przeznaczone dla fanatyków programowania'
        },
        {
            id: 2,
            name: "CSS",
            to: "/courses/css",
            description: 'Kursy są przeznaczone dla fanatyków programowania'
        },
        {
            id: 3,
            name: "HTML",
            to: "/courses/html",
            description: 'Kursy są przeznaczone dla fanatyków programowania'
        },
    ];
    const items = leftMenu;

    return (
        <Layout header={{title: 'kursy', description: "Wszystkie kursy koła naukowego IoTes"}} title={"Courses"} smallTiles leftMenu={leftMenu}>
            {items.map(item => (
                <ItemTile
                    title={item.name}
                    description={item.description}
                    url={item.to}
                    type={"course"}
                />
            ))}
        </Layout>
    );
};

export default Courses;
