import React from "react";
import Layout from "../../components/Layout";
import ItemTile from "../../components/ItemTile";
import Loader from "../../components/Loader";

class Courses extends React.Component {
    state = {
        courses: []
    }

    async componentDidMount() {
        let {courses} = this.state;

        courses = await fetch('http://localhost:8080/api/courses')
            .then(res => res.json())
            .then(data => {
                return data || [];
            })
            .catch((err) => {
                console.log(err);
                return [];
            });

        this.setState({courses});
    }

    render() {
        const {courses} = this.state;

        if (courses.length === 0) {
            return <Layout header={{title: 'kursy'}}
                           title={"Courses"}
                           smallTiles>
                <Loader/>
            </Layout>
        }
        return (
            <Layout header={{title: 'kursy', description: "Wszystkie kursy koła naukowego IoTes"}} title={"Courses"}
                    smallTiles leftMenu={courses}>
                {courses.map(course => (
                    <ItemTile
                        title={course.name}
                        description={course.description}
                        url={course.to}
                        type={"course"}
                    />
                ))}
            </Layout>
        );
    }
};

export default Courses;
