import React, {Component} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common-components/Header"
import Footer from "./common-components/Footer"

export default class ApplicationComponent extends Component {
    constructor(props){
        super()
    }

    render(){
        return(
            <Router>
                <div classname="topdiv">
                    <Header />
                    {/* routes */}
                    <Footer />
                </div>
            </Router>
        )
    }
}