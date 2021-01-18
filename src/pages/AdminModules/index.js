import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

class AdminModules extends React.Component {
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

		const newModule = {
			id: 0,
			title: "Nowy",
			description: "Przejdź tutaj aby utworzyć nowy moduł dla kursu.",
			url: "/admin/modules/0",
		};
		const modules = [
			{
				id: 1,
				title: "Edytuj",
				description: "Przejdź tutaj aby utworzyć nowy moduł dla kursu.",
				url: "/admin/modules/1",
			},
		];
		// Add creating new item as first
		modules.unshift(newModule);

		return (
			<Layout
				header={{title: "Admin - moduły", description:"Strona admina do edycji i tworzenia modułów"}}
				title="Admin - moduły"
				smallTiles
				leftMenu={leftMenu}
				hideAll
			>
				{modules.map((module) => (
					<ItemTile
						key={module.id}
						title={module.title}
						description={module.description}
						url={module.url}
						type={module.id === 0 ? "default" : "edit"}
					/>
				))}
			</Layout>
		);
	}
}

export default withRouter(AdminModules);
