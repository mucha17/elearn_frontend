import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";

class AdminCourses extends React.Component {
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

		const newCourse = {
			id: 0,
			title: "Nowy",
			description: "Przejdź tutaj aby utworzyć nowy kurs.",
			url: "/admin/courses/0",
		};
		const courses = [
			{
				id: 1,
				title: "Edytuj",
				description: "Edytuj.",
				url: "/admin/courses/1",
			},
		];
		// Add creating new item as first
		courses.unshift(newCourse);

		return (
			<Layout
				header={{title: "Admin - kursy", description:"Strona admina ze wszystkimi kursami"}}
				title="Admin - kursy"
				smallTiles
				leftMenu={leftMenu}
				hideAll
			>
				{courses.map((course) => (
					<ItemTile
						key={course.id}
						title={course.title}
						description={course.description}
						url={course.url}
						type={course.id === 0 ? "default" : "edit"}
					/>
				))}
			</Layout>
		);
	}
}

export default withRouter(AdminCourses);
