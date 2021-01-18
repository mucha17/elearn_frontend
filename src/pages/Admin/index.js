import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

class Admin extends React.Component {
	render() {
		const leftMenu = [
			{
				id: 0,
				name: "Kursy",
				to: "/admin/courses/",
			},
			{
				id: 1,
				name: "Moduły",
				to: "/admin/modules/",
			},
			{
				id: 2,
				name: "Lekcje",
				to: "/admin/lessons/",
			},
		];

		return (
			<Layout title="Admin" smallTiles leftMenu={leftMenu} hideAll>
				<ItemTile
					title={"Kursy"}
					description={
						"Przejdź tutaj aby utworzyć lub edytować kursy."
					}
					url={"/admin/courses"}
				/>
				<ItemTile
					title={"Moduły"}
					description={
						"Przejdź tutaj aby utworzyć lub edytować moduły."
					}
					url={"/admin/modules"}
				/>
				<ItemTile
					title={"Lekcje"}
					description={
						"Przejdź tutaj aby utworzyć lub edytować lekcje."
					}
					url={"/admin/lessons"}
				/>
			</Layout>
		);
	}
}

export default withRouter(Admin);
