import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";
import CourseForm from "../../components/CourseForm";

class AdminCourse extends React.Component {
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
		const { id } = this.props.match.params;
		const title =
			id === "0" ? "Admin - nowy kurs" : "Admin - edytuj kurs " + id;

		//TODO: fetch course
		const object = {
			title: "title",
			description: "description",
			id: 1,
		};
		return (
			<Layout title={title} leftMenu={leftMenu} hideAll>
				<CourseForm {...object} />
			</Layout>
		);
	}
}

export default withRouter(AdminCourse);
