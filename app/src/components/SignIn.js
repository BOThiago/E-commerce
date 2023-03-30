import React, { useState } from "react";
import api from "../services/api";

const SignIn = () => {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/signin", { login, password });
            alert(response.data.message);
            localStorage.setItem("token", response.data.token);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div class="container">
            <div class="content second-content">
                <div class="first-column">
                    <h2 class="title title-primary">Registre-se</h2>
                    <p class="description description-primary">
                        Enter your personal details
                    </p>
                    <p class="description description-primary">
                        and start journey with us
                    </p>
                    <button id="signup" class="btn btn-primary">
                        sign up
                    </button>
                </div>
                <div class="second-column">
                    <h2 class="title title-second">Entrar</h2>
                    <form
                        form
                        class="form"
                        method="post"
                        id="login"
                        onSubmit={handleSubmit}
                    >
                        <label class="label-input" for="">
                            <i class="far fa-envelope icon-modify"></i>
                            <input
                                type="text"
                                placeholder="Email"
                                id="emailcpf"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </label>
                        <label class="label-input" for="">
                            <i class="fas fa-lock icon-modify"></i>
                            <input
                                input
                                type="password"
                                placeholder="Senha"
                                id="passwordlogin"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <a class="password" href="change-password">
                            forgot your password?
                        </a>
                        <button
                            id="signin"
                            type="submit"
                            class="btn btn-second"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
