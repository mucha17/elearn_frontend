import {useState} from "react";

const Loader = () => {
    const [text, setText] = useState("Wczytywanie");

    setTimeout(() => {
        setText("Brak danych")
    }, 3000)

    return <div className={'loader-wrapper top'}>
        <div className={'loader'}>
            {text}
        </div>
    </div>
}

export default Loader;