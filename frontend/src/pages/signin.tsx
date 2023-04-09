import React, { useState } from "react";
import api from "./services/api";
import { useRouter } from "next/router";

export default function Signin() {

    const router = useRouter();

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await api.post("/signin", { login, password });
            localStorage.setItem("token", response.data.token);
            if (response.status === 200) {
                router.push("/home");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="container">
            <div className="content second-content">
                <div className="first-column">
                    <h2 className="title title-primary">Registre-se</h2>
                    <p className="description description-primary">
                        Enter your personal details
                    </p>
                    <p className="description description-primary">
                        and start journey with us
                    </p>
                    <a id="signup" href="/signup" className="btn btn-primary">
                        sign up
                    </a>
                </div>
                <div className="second-column">
                    <h2 className="title title-second">Entrar</h2>
                    <form
                        className="form"
                        method="post"
                        id="login"
                        onSubmit={handleSubmit}
                    >
                        <label className="label-input">
                            <i className="far fa-envelope icon-modify"></i>
                            <input
                                type="text"
                                placeholder="Email"
                                id="emailcpf"
                                value={login}
                                onChange={(e) => setLogin(e.target.value)}
                            />
                        </label>
                        <label className="label-input">
                            <i className="fas fa-lock icon-modify"></i>
                            <input
                                type="password"
                                placeholder="Senha"
                                id="passwordlogin"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <a className="password" href="change-password">
                            forgot your password?
                        </a>
                        <button
                            id="signin"
                            type="submit"
                            className="btn btn-second"
                        >
                            Entrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}