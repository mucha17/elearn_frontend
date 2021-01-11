import React, { useState } from "react";
import { NavLink, withRouter } from "react-router-dom";
import Mobile from "./Mobile";
import { top as items, top as items_top } from "../data/menu";
import MenuLeftItem from "./MenuLeftItem";

const MenuLeft = ({ items, match }) => {
	const { name } = match.params;
	const [showMenu, switchMenu] = useState(false);

	return (
		<>
			<Mobile>
				<div
					className={`menu-show ${showMenu ? "active" : null}`}
					onClick={() => switchMenu(!showMenu)}
				>
					<div className={"menu-show-row first"} />
					<div className={"menu-show-row second"} />
					<div className={"menu-show-row third"} />
				</div>
			</Mobile>
			<nav className={`menu-left ${showMenu ? "show" : "hide"}`}>
				<Mobile>
					{items_top.map((item) => (
						<MenuLeftItem
							key={item.id}
							name={item.name}
							to={item.to}
							action={item.action}
							condition={item.condition}
						/>
					))}
				</Mobile>
				<NavLink to={"/courses"}>
					<div className={"menu-left-item"}>Wszystkie kursy</div>
				</NavLink>
				{name && (
					<NavLink to={`/courses/${name}`}>
						<div className={"menu-left-item"}>Moduły ({name})</div>
					</NavLink>
				)}
				{items &&
					items.map((item) => (
						<MenuLeftItem
							key={item.id}
							name={item.name}
							to={item.to}
							action={item.action}
							condition={item.condition}
						/>
					))}
			</nav>
		</>
	);
};

export default withRouter(MenuLeft);
