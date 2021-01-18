import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

class AdminLessons extends React.Component {
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

		const newLesson = {
			id: 0,
			title: "Nowy",
			description: "Przejdź tutaj aby utworzyć nową lekcję.",
			url: "/admin/lessons/0",
		};
		const lessons = [
			{
				id: 1,
				title: "Edytuj",
				description: "Przejdź tutaj aby utworzyć nową lekcję.",
				url: "/admin/lessons/1",
			},
		];
		// Add creating new item as first
		lessons.unshift(newLesson);

		return (
			<Layout
				title="Admin - lekcje"
				smallTiles
				leftMenu={leftMenu}
				hideAll
			>
				{lessons.map((lesson) => (
					<ItemTile
						key={lesson.id}
						title={lesson.title}
						description={lesson.description}
						url={lesson.url}
						type={lesson.id === 0 ? "default" : "edit"}
					/>
				))}
			</Layout>
		);
	}
}

export default withRouter(AdminLessons);
