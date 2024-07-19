import React from 'react';
import './App.css';
import coverPhoto from "./assets/wen.png"

function App() {
    return (
        <div className="container">
            <div className="header">
                <button className="btn left-btn">Left Button</button>
                <button className="btn right-btn">Right Button</button>
            </div>
            <div className="image-container">
                <img src={coverPhoto} alt="Landing Page" />
            </div>
        </div>
    );
}

export default App;
