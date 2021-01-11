import React from "react";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

const Courses = () => {
	const leftMenu = [
		{
			id: 0,
			name: "Java",
			to: "/courses/java",
		},
		{
			id: 1,
			name: "PHP",
			to: "/courses/php",
		},
		{
			id: 2,
			name: "CSS",
			to: "/courses/css",
		},
		{
			id: 3,
			name: "HTML",
			to: "/courses/html",
		},
	];

	return (
		<Layout title={"Courses"} smallTiles leftMenu={leftMenu}>
			<ItemTile
				title={"Java"}
				description={"java"}
				url={"/courses/java"}
				type={"course"}
			/>
			<ItemTile
				title={"PHP"}
				description={"php"}
				url={"/courses/php"}
				type={"course"}
			/>
			<ItemTile
				title={"HTML"}
				description={"HTML"}
				url={"/courses/html"}
				type={"course"}
			/>
			<ItemTile
				title={"CSS"}
				description={"CSS"}
				url={"/courses/css"}
				type={"course"}
			/>
		</Layout>
	);
};

export default Courses;
