import React, { useState, useEffect } from "react";
import "./App.css";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";

function App() {
    const [animationClass, setAnimationClass] = useState("");

    const handleSignInClick = () => {
        setAnimationClass("sign-in-js");
    };

    const handleSignUpClick = () => {
        setAnimationClass("sign-up-js");
    };

    // Adiciona a classe de animação ao elemento <body>
    useEffect(() => {
        document.body.className = animationClass;
    }, [animationClass]);

    return (
        <div className="App">
            {/* Renderiza os componentes SignIn e SignUp */}
            <SignIn onSignInClick={handleSignInClick} />
            <SignUp onSignUpClick={handleSignUpClick} />
        </div>
    );
}

export default App;
