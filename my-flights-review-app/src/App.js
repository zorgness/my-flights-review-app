import React, {Fragment } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Airlines from "./components/Airlines/Airlines";
import Airline from "./components/Airline/Airline";
import Login from "./components/Auth/Login";
import Register from "./components/Auth/Register";
import UnprotectedRoute from "./UnprotectedRoute";
import { AuthProvider } from './AutContext'

const App = () => {
    return(
            <AuthProvider>
            <Navbar />
            <Routes>
                <Route exact path="/" element={<Airlines />}></Route>
                <Route exact path="/airlines/:slug" element={<Airline />}></Route>
                <Route path="/login" element={<Login />}/>
                <Route exact path="/register" element={<Register />} />
            </Routes>
            </AuthProvider>

        
    )
}

export default App