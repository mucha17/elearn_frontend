import React from "react"
import Tile from "../Tile"
import Filter from "./Filter"
import Pagination from "./Pagination"
import {NavLink} from "react-router-dom";

class Lister extends React.Component {
    state = {
        allItems: [],
        items: [],
        filteredItems: [],
        paginatedItems: [],
        itemsPerPage: 10,
        page: 0,
    }

    componentDidMount() {
        const {items} = this.props
        this.setState({filteredItems: items, allItems: items, paginatedItems: items}, () => this.changePage())
    }

    filterItems = (items) => {
        this.setState({filteredItems: items, items}, () => this.changePage(0))
    }

    changePage = (page = -1, itemsPerPage = -1) => {
        if (page < 0) {
            page = this.state.page
        }
        if (itemsPerPage < 0) {
            itemsPerPage = this.state.itemsPerPage
        }

        let {filteredItems} = this.state

        let items = []
        try {
            items = filteredItems.slice(page * itemsPerPage, (page + 1) * itemsPerPage)
        } catch {
            items = []
        }

        this.setState({items}, () => this.forceUpdate())
    }

    render() {
        const {items, allItems, filteredItems} = this.state
        const {Component, linkSingle, actionDelete, name, filterKeys, noDelete} = this.props

        return (
            <Tile title={name}>
                {
                    allItems.length !== 0 && (
                        <Filter
                            items={allItems}
                            onlyKeys={filterKeys.only}
                            skipKeys={filterKeys.skip}
                            actionReturn={this.filterItems}
                        />
                    )}
                <div className="lister-items">
                    <h2>
                        {`Pokazuje: (${items.length}/${allItems?.length || 0})`}
                    </h2>
                    {
                        items.length === 0 ? (
                            <div className='error'>
                                Brak danych
                            </div>
                        ) : (
                            <React.Fragment>
                                {items.map((item) => (
                                    <div className="lister-outer-item-wrapper" key={item.key}>
                                        <input type="checkbox" className='hidden' name={item.key} id={item.key}/>
                                        <div className="lister-item" key={item.key}>
                                            <div className="lister-item-wrapper">
                                                <NavLink to={`/${linkSingle}/${item.id}`}>
                                                    <div className="lister-link-wrapper">
                                                        <Component {...item} />
                                                    </div>
                                                </NavLink>
                                            </div>
                                            {!noDelete && <input
                                                type="button"
                                                className="small right warn"
                                                value="Usuń"
                                                onClick={() => actionDelete(item.id)}
                                            />}
                                        </div>
                                    </div>
                                ))}
                                <Pagination itemsLength={filteredItems.length} actionReturn={this.changePage}/>
                            </React.Fragment>
                        )}
                </div>
            </Tile>
        )
    }
}

Lister.defaultProps = {
    items: [],
    Component: <div className="error">No component given</div>,
    actionDelete: (id) => console.log(id),
    linkSingle: "",
    name: "No title given",
    filterKeys: {
        skip: ["id"],
        only: [],
    },
    noDelete: false
}

export default Lister
