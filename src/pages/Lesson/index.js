import React from "react";
import { withRouter } from "react-router-dom";
import Layout from "../../components/Layout";

class Course extends React.Component {
	render() {
		const { name } = this.props.match.params;
		const leftMenu = [
			{
				id: 0,
				name: "Java",
				to: "/courses/java",
			},
		];

		return <Layout title={name} smallTiles leftMenu={leftMenu}></Layout>;
	}
}

export default withRouter(Course);
