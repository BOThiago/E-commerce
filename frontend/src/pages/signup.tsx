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
        <div className="container">
            <div className="content first-content">
                <div className="first-column">
                    <h2 className="title title-primary">Entre</h2>
                    <p className="description description-primary">
                        Já tem uma conta ?
                    </p>
                    <p className="description description-primary">
                        Comece a jornada conosco !
                    </p>
                    <div>
                        <a
                            id="signin"
                            href="/signin"
                            type="submit"
                            className="btn btn-primary"
                        >
                            Entrar
                        </a>
                    </div>
                </div>
                <div className="second-column">
                    <form
                        className="form"
                        method="post"
                        id="registro"
                        onSubmit={handleSubmit}
                    >
                        <h2 className="title title-second">Criar conta</h2>
                        <label className="label-input">
                            <i className="fas fa-lock icon-modify"></i>
                            <input
                                type="text"
                                placeholder="Nome"
                                id="username"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label className="label-input">
                            <i className="far fa-envelope icon-modify"></i>
                            <input
                                type="text"
                                placeholder="CPF"
                                id="cpf"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </label>
                        <label className="label-input">
                            <i className="far fa-envelope icon-modify"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label className="label-input">
                            <i className="fas fa-lock icon-modify"></i>
                            <input
                                type="password"
                                placeholder="Senha"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit" className="btn btn-second">
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}