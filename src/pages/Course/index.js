import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

class Course extends React.Component {
	render() {
		const { name } = this.props.match.params;
		const leftMenu = [
			{
				id: 0,
				name: "Module EE",
				to: "/courses/java/ee",
			},
		];

		return (
			<Layout title={name} smallTiles leftMenu={leftMenu}>
				<ItemTile
					title={"Moduł 1"}
					description={"aaaa"}
					url={"/courses/java/ee"}
					type={"module"}
				/>
			</Layout>
		);
	}
}

export default withRouter(Course);
