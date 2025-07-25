import React from "react"
import * as ReactDOM from "react-dom/client"
import {Provider} from "react-redux"
import './index.css';
import Store from "./app/state/Store"
import ApplicationComponent from "./app/Application"

const root = ReactDOM.createRoot(document.getElementById("root"))

root.render(
    <Provider store={Store}>
        <ApplicationComponent />
    </Provider>
)