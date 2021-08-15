import React from 'react';
import './App.css';
import {Cinema} from "./components/Cinema";
import CinemaContextProvider from "./contexts/CinemaContext";
import {SelectedSits} from "./components/SelectedSits";

function App() {
    return (
        <div className="App">
            <CinemaContextProvider>
                <Cinema/>
                <SelectedSits/>
            </CinemaContextProvider>
        </div>
    );
}

export default App;
