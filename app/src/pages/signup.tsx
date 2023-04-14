import React, { useState } from "react";
import api from "./services/api";
import { useRouter } from "next/router";

export default function Signup() {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const response = await api.post("/signup", {
                nome,
                cpf,
                email,
                password,
            });

            if (response.status === 200) {
                router.push("/signin");
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form
            className="login"
            method="post"
            id="registro"
            onSubmit={handleSubmit}
        >
            <h2>Criar conta</h2>
            <div className="box-user">
                <input
                    type="text"
                    placeholder="Nome"
                    id="username"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <label>Nome</label>
            </div> 
            <div className="box-user">
                <input
                    type="text"
                    placeholder="CPF"
                    id="cpf"
                    value={cpf}
                    onChange={(e) => setCpf(e.target.value)}
                />
                <label>CPF</label>
            </div>
            <div className="box-user">
                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <label>E-mail</label>
            </div>
            <div className="box-user">
                <input
                    type="password"
                    placeholder="Senha"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <label>Senha</label>
            </div>
            <div>
                <a href="/signin" className="cadastrar">
                    Já possui cadastro? Clique aqui!
                </a>
            </div>
            <button type="submit" className="btn">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                Registrar
            </button>
        </form>
    );
}
