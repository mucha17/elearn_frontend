import React from "react";
import strings from "./strings";
import Tile from "../../components/Tile";
import {NavLink} from "react-router-dom";
import Layout from "../../components/Layout";

const HomePage = () => {
    const selectedLanguage =
        localStorage.getItem("selectedLanguage")?.toString() ?? "pl";
    strings.setLanguage(selectedLanguage ?? "pl");

    const lastLessons = [
        {
            id: 'lesson-1',
            name: 'Lekcja 1',
            path: "/courses/java/ee/0",
            courseName: "Java"
        },
        {
            id: 'lesson-2',
            name: 'Lekcja 2',
            path: "/courses/java/ee/1",
            courseName: "Java"
        }
    ];
    const lastCourses = [
        {
            id: 'course-1',
            name: 'PeHaPe',
            path: "/courses/php/"
        },
        {
            id: 'course-2',
            name: 'JAVA',
            path: "/courses/java/"
        }
    ]

    return (
        <Layout smallTiles>
            <Tile title={'Witaj'}>
                Witamy na stronie KN Iotes
            </Tile>
            <Tile title={'Ostatnio dodane lekcje'} list>
                <div className={'tags-wrapper'}>
                    {lastLessons.map(lesson =>
                        (
                            <div className={"link list"} key={lesson.id}>
                                <NavLink to={lesson.path}>
                                    {lesson.courseName} - {lesson.name}
                                </NavLink>
                            </div>
                        ))}
                </div>
            </Tile>
            <Tile title={'Ostatnio dodane kursy'} list>
                <div className={'tags-wrapper'}>
                    {lastCourses.map(course =>
                        (
                            <div className={"link list"} key={course.id}>
                                <NavLink to={course.path}>
                                    {course.name}
                                </NavLink>
                            </div>

                        ))}
                </div>
            </Tile>
        </Layout>
    );
};

export default HomePage;
