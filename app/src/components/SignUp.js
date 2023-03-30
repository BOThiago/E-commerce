import React, { useState } from "react";
import api from "../services/api";

const SignUp = () => {
    const [nome, setNome] = useState("");
    const [cpf, setCpf] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await api.post("/signup", {
                nome,
                cpf,
                email,
                password,
            });
            alert(response.data.message);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div class="container">
            <div class="content first-content">
                <div class="first-column">
                    <h2 class="title title-primary">Entre</h2>
                    <p class="description description-primary">
                        Já tem uma conta ?
                    </p>
                    <p class="description description-primary">
                        Comece a jornada conosco !
                    </p>
                    <div>
                        <button
                            id="signin"
                            type="submit"
                            class="btn btn-primary"
                        >
                            Entrar
                        </button>
                    </div>
                </div>
                <div class="second-column">
                    <form
                        class="form"
                        method="post"
                        id="registro"
                        onSubmit={handleSubmit}
                    >
                        <h2 class="title title-second">Criar conta</h2>
                        <label class="label-input" for="">
                            <i class="fas fa-lock icon-modify"></i>
                            <input
                                type="text"
                                placeholder="Nome"
                                id="username"
                                value={nome}
                                onChange={(e) => setNome(e.target.value)}
                            />
                        </label>
                        <label class="label-input" for="">
                            <i class="far fa-envelope icon-modify"></i>
                            <input
                                type="text"
                                placeholder="CPF"
                                id="cpf"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                            />
                        </label>
                        <label class="label-input" for="">
                            <i class="far fa-envelope icon-modify"></i>
                            <input
                                type="email"
                                placeholder="Email"
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </label>
                        <label class="label-input" for="">
                            <i class="fas fa-lock icon-modify"></i>
                            <input
                                type="password"
                                placeholder="Senha"
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </label>
                        <button type="submit" class="btn btn-second">
                            Registrar
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
