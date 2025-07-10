import React, {Component} from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import {Navigate} from "react-router-dom"
import Header from "./common-components/Header"
import Footer from "./common-components/Footer"
import Home from "./common-components/Home"
import Register from "./application-components/Register"
import Login from "./application-components/Login"
import Vaccine from "./application-components/vaccine/Vaccine"
import Hospital from "./application-components/hospital/Hospital"
import Appointment from "./application-components/appointment/Appointment"

export default class ApplicationComponent extends Component {
    constructor(props){
        super()
    }

    render(){
        return(
            <Router>
                <div className="font-sans">
                    <Header/>
                        <div className="px-5">
                            <Routes >
                                <Route path="/" element={<Navigate to="/home" replace />}/>
                                <Route path="/home" element={<Home />}/>
                                <Route path="/register" element={<Register />}/>
                                <Route path="/login" element={<Login />}/>
                                <Route path="/vaccines" element={<Vaccine />}/>
                                <Route path="/hospital" element={<Hospital />}/>
                                <Route path="/appointments" element={<Appointment/>}/>
                            </Routes>
                        </div>
                    <Footer />
                </div>
            </Router>
        )
    }
}