import React, {useState} from "react";
import store from "../redux/store";
import {addNotification} from "../redux/actions/notification";

const Loader = () => {
    const [text, setText] = useState("loading");

    setTimeout(() => {
        setText("fail")
    }, 5000)

    store.dispatch(addNotification({status: "uknown", title: "Wykryto syfiasty loader", message: "Usun go"}));

    if (text === "loading") {
        store.dispatch(addNotification({status: "processing", title: "Wczytywanie danych"}));
    } else {
        store.dispatch(addNotification({status: "failure", title: "Brak danych"}));
    }

    return <React.Fragment/>
}

export default Loader;