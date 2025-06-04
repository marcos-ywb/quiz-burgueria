"use client";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import style from "./NicknameForm.module.css";

export default function NicknameForm({ onComplete }) {
    const [nickname, setNickname] = useState("");
    const [errorNickname, setErrorNickname] = useState("");

    const checkNickname = (nickname) => {
        const regex = /^[A-Za-zÀ-ÿ\s]+$/;
        return regex.test(nickname);
    }

    const handleSubmit = (e) => {
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

        if (!valid) return;

        const userData = {
            id: uuidv4(),
            nickname: nickname.trim(),
        };

        console.log(userData);

        localStorage.setItem("quiz_user", JSON.stringify(userData));
        onComplete();
    };

    return (
        <form className={style.form_container} onSubmit={handleSubmit}>
            <div className={style.form_text}>
                <h2>Seja bem-vindo(a)!</h2>
                <p>Preencha o campo abaixo com seu nome para começar a jogar!</p>
            </div>
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
            <button type="submit" className={style.button}>Jogar!</button>
        </form>
    );
}
