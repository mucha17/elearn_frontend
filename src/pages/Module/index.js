import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

class Module extends React.Component {
	render() {
		const { name, module } = this.props.match.params;

		const leftMenu = [
			{
				id: 0,
				name: "Lesson 1",
				to: "/courses/java/ee/0",
			},
		];

		return (
			<Layout
				title={`${name} - ${module}`}
				smallTiles
				leftMenu={leftMenu}
			>
				<ItemTile
					title={"Wprowadzenie"}
					description={
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
					}
					url={"/courses/java/ee/0"}
					type={"lesson"}
				/>
				<ItemTile
					title={"Podsumowanie"}
					description={
						"It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like)."
					}
					url={"/courses/php/80/0"}
					type={"lesson"}
				/>
			</Layout>
		);
	}
}

export default withRouter(Module);
