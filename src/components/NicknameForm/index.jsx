"use client";
import { useState } from "react";

import { v4 as uuidv4 } from "uuid";

import style from "./NicknameForm.module.css";

export default function NicknameForm({ onComplete }) {
    const [nickname, setNickname] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        const userData = {
            id: uuidv4(),
            nickname,
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
                </div>
                <input
                    type="text"
                    placeholder="Digite seu nome aqui..."
                    required
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className={style.input}
                />
            </div>
            <button type="submit" className={style.button}>Jogar!</button>
        </form>
    );
}
