import React, {Component} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./common-components/Header"
import Footer from "./common-components/Footer"
import Home from "./common-components/Home"
import Register from "./application-components/Register"
import Login from "./application-components/Login"

export default class ApplicationComponent extends Component {
    constructor(props){
        super()
    }

    render(){
        return(
            <Router>
                <div className="topdiv">
                    <Header />
                        <Routes >
                            <Route path="/" element={<Home />}/>
                            <Route path="/home" element={<Home />}/>
                            <Route path="/register" element={<Register />}/>
                            <Route path="/login" element={<Login />}/>
                        </Routes>
                    <Footer />
                </div>
            </Router>
        )
    }
}