import React from "react";
import Layout from "../../components/Layout";
import Tile from "../../components/Tile";

const Course = ({ title }) => {
	return (
		<Layout title={title} smallTiles>
			<Tile title={"EE"}>aa</Tile>
		</Layout>
	);
};

export default Course;
