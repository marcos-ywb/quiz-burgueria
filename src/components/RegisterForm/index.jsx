"use client";
import { useEffect, useState } from "react";
import Cleave from 'cleave.js/react';
import 'cleave.js/dist/addons/cleave-phone.br';

import style from "./RegisterForm.module.css";

function RegisterForm() {
    const [nickname, setNickname] = useState("");
    const [errorNickname, setErrorNickname] = useState("");

    const [telefone, setTelefone] = useState("");
    const [errorTelefone, setErrorTelefone] = useState("");

    const [status, setStatus] = useState("");

    const [uuid, setUuid] = useState("");

    useEffect(() => {
        const savedData = JSON.parse(localStorage.getItem("quiz_user"));
        if (savedData?.nickname) {
            setNickname(savedData.nickname);
            console.log("Nickname carregado:", savedData.nickname);
        }
        if (savedData?.id) {
            setUuid(savedData.id);
        }
    }, [])

    const checkNickname = (nickname) => {
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        return regex.test(nickname);
    }

    const checkTelefone = (telefone) => {
        const regex = /^\(?\d{2}\)?[\s-]?\d{4,5}[\s-]?\d{4}$/
        return regex.test(telefone);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        let valid = true;

        if (!nickname.trim()) {
            setErrorNickname("Campo obrigatório!");
            valid = false;
        } else if (!checkNickname(nickname.trim())) {
            setErrorNickname("O nome deve conter apenas letras e espaços!")
            valid = false;
        } else if (nickname.trim().length < 3) {
            setErrorNickname("O nome deve conter pelo menos 3 letras!")
            valid = false;
        } else {
            setErrorNickname("");
        }
        setTimeout(() => {
            setErrorNickname("");
        }, 3000);

        if (!telefone.trim()) {
            setErrorTelefone("Campo obrigatório!");
            valid = false;
        } else if (!checkTelefone(telefone.trim())) {
            setErrorTelefone("O telefone deve conter apenas números!")
            valid = false;
        } else {
            setErrorTelefone("");
        }
        setTimeout(() => {
            setErrorTelefone("");
        }, 3000);

        if (!valid) return;

        if (!uuid) {
            setStatus("Erro: usuário não identificado.");
            return;
        }

        try {
            const response = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    nickname: nickname.trim(),
                    uuid: uuid,
                    telefone: telefone.trim().replace(/\D/g, ''),
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setStatus("Registro realizado com sucesso!");

                localStorage.setItem("quiz_user", JSON.stringify({ id: uuid, nickname }));


            } else {
                setStatus("Erro ao registrar usuário.");
            }

        } catch (error) {
            console.error(error);
            setStatus("Erro na conexão com o servidor.");
        }


    }

    return (
        <form className={style.form_container} onSubmit={handleSubmit}>
            <div className={style.form_text}>
                <h2>Registro</h2>
                <p>Preencha os campos abaixo para se cadastrar.</p>
            </div>
            {/*INPUT NOME*/}
            <div className={style.input_field}>
                <div className={style.label_wrapper}>
                    <div>
                        <label htmlFor="">Nome</label>
                        <span>(*)</span>
                    </div>
                    {
                        <p className={`${style.erro} ${!errorNickname ? style.hidden : ""}`}>
                            {errorNickname || " "}
                        </p>

                    }
                </div>
                <input
                    type="text"
                    placeholder="Digite seu nome aqui..."
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className={style.input}
                />
            </div>

            {/*INPUT TELEFONE*/}
            <div className={style.input_field}>
                <div className={style.label_wrapper}>
                    <div>
                        <label htmlFor="">Telefone</label>
                        <span>(*)</span>
                    </div>
                    {
                        <p className={`${style.erro} ${!errorTelefone ? style.hidden : ""}`}>
                            {errorTelefone || " "}
                        </p>

                    }
                </div>
                <Cleave
                    options={{ phone: true, phoneRegionCode: 'BR' }}
                    value={telefone}
                    onChange={(e) => setTelefone(e.target.value)}
                    placeholder="99 99999 9999"
                    className={style.input}
                />
            </div>
            <button type="submit" className={style.button}>Registrar-se!</button>

            {/*status && <p className={style.statusMessage}>{status}</p>*/}
        </form>
    );
}

export default RegisterForm;