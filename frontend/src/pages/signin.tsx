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
        <form
            className="login"
            method="post"
            id="login"
            onSubmit={handleSubmit}
        >
            <h2>Fazer login</h2>
            <div className="box-user">
                <input
                    type="text"
                    name=""
                    placeholder="CPF ou E-mail"
                    id="emailcpf"
                    autoComplete="off"
                    value={login}
                    onChange={(e) => setLogin(e.target.value)}
                />
                <label>Usuário</label>
            </div>
            <div className="box-user">
                <input
                    type="password"
                    placeholder="Senha"
                    id="passwordlogin"
                    autoComplete="off"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Senha</label>
            </div>
            <div className="questions">
                <div>
                    <a href="/signup" className="cadastrar">
                        Não possui cadastro?
                    </a>
                </div>
                <div>
                    <a href="/change-password" className="cadastrar">
                        Esqueceu a senha?
                    </a>
                </div>
            </div>
            <button type="submit" className="btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Entrar
            </button>
        </form>
    );
}
