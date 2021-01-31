import React from "react"
import TextInput from "../inputs/TextInput"
import Tile from "../Tile"

class Filter extends React.Component {
    state = {
        allItems: [],
        items: [],
        skipKeys: [],
        onlyKeys: [],
        keys: [],
        filters: [],
    }

    retreiveAllKeys = (item, depth = 0) => {
        // Skip values
        if (typeof item !== "object" || !item) {
            return
        }

        const {keys} = this.state

        if (Array.isArray(item)) {
            for (const index in item) {
                this.retreiveAllKeys(item[index], depth)
            }
        } else if (depth < 1) {
            const tempKeys = Object.keys(item)

            for (const subKey in tempKeys) {
                this.retreiveAllKeys(item[tempKeys[subKey]], depth++)

                if (keys.indexOf(tempKeys[subKey]) === -1 && !Array.isArray(item[tempKeys[subKey]])) {
                    keys.push(tempKeys[subKey])
                }
            }

            this.setState({keys})
        }
    }

    getKeys = (items, skipKeys) => {
        this.retreiveAllKeys(items)
        let {keys} = this.state

        // Filter skipable keys
        for (const index in keys) {
            for (const skipIndex in skipKeys) {
                if (keys[index] === skipKeys[skipIndex]) {
                    keys.splice(index, 1)
                }
            }
        }

        // Sort keys
        keys = keys.sort((keyA, keyB) => {
            if (keyA < keyB) {
                return -1
            }
            if (keyA > keyB) {
                return 1
            }
        })

        this.setState({keys})
    }

    componentDidMount() {
        const {items, skipKeys, onlyKeys} = this.props


        if (onlyKeys.length === 0) {
            this.getKeys(items, skipKeys)
        } else {
            this.setState({keys: onlyKeys})
        }

        this.setState({allItems: items, items, skipKeys, onlyKeys})
    }

    transformKeyName = (key) => {
        return key.replaceAll("_", " ")
    }

    setFilters = (data) => {
        let {filters} = this.state

        filters[data.name] = {
            key: Math.random(),
            value: data.value,
        }

        if (filters[data.name].value.length === 0) {
            delete (filters[data.name])
        }

        this.setState({filters}, () => this.filterItems())
    }

    filterItems = () => {
        let {filters} = this.state
        const {allItems} = this.state
        let items = []

        for (const index in allItems) {
            let addItem = true

            for (const field in filters) {
                const value = filters[field].value

                if (!allItems[index][field].toString().toLowerCase().includes(value.toString().toLowerCase())) {
                    addItem = false
                }
            }

            if (addItem) {
                items.push(allItems[index])
            }
        }

        this.props.actionReturn(items)
    }

    render() {
        let {keys, filters} = this.state

        return (
            <Tile title={`Filtry`}>
                {
                    keys.map(key => (
                        <TextInput
                            key={`object-key-${key}`}
                            title={`Filtruj po ${this.transformKeyName(key)}`}
                            name={key}
                            actionReturn={(data) => this.setFilters(data)}
                            small
                        />
                    ))}
                {
                    Object.keys(filters).length !== 0 && (
                        <div className='lister-filters-wrapper'>
                            <h4>
                                {`Aktualne filtry`}
                            </h4>
                            {Object.keys(filters).map(key => (
                                <div key={filters[key].key} className='lister-filter-item-wrapper'>
                                    <div className='lister-filter-item key'>
                                        {key}:
                                    </div>
                                    <div className='lister-filter-item value'>
                                        {filters[key].value}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
            </Tile>
        )
    }
}

Filter.defaultProps = {
    items: [],
    skipKeys: ["key, is_full"],
    onlyKeys: [],
    actionReturn: () => console.log("no return action"),
}

export default Filter