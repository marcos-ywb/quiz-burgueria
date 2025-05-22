"use client";
import { useState } from "react";

/*STYLES*/
import style from "./Card.module.css";

function Card({ counter, question, answers, correct, onAnswered }) {
    const [selected, setSelected] = useState(null);
    const [isCorrect, setIsCorrect] = useState(null);

    function handleAnswerClick(index) {
        setSelected(index);
        const result = index === correct;
        setIsCorrect(result);

        setTimeout(() => {
            onAnswered(result);
            setSelected(null);
            setIsCorrect(null);
        }, 2000);
    }

    return (
        <div className={style.card_container}>
            <div className={style.card_content}>
                <div className={style.card_question}>
                    <span>#{counter}</span>
                    <h2>{question}</h2>
                </div>

                <div className={style.card_answers}>
                    <div className={style.answer_field}>
                        {answers.map((answer, index) => (
                            <div key={index} className={style.button_field}>
                                <button
                                    onClick={() => handleAnswerClick(index)}
                                    className={
                                        selected === index
                                            ? isCorrect
                                                ? style.correct
                                                : style.incorrect
                                            : ""
                                    }
                                    disabled={selected !== null} // impede múltiplos cliques
                                >
                                    {answer}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {selected !== null && (
                    <div className={style.feedback}>
                        {isCorrect ? "✅ Resposta correta!" : "❌ Resposta incorreta."}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Card;
