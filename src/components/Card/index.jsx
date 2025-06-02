"use client";
import { useState } from "react";

/*STYLES*/
import style from "./Card.module.css";

/*COMPONENTES*/
import ProgressBar from "@/components/ProgressBar";

function Card({ question, answers, correct, onAnswered, currentQuestionIndex, totalQuestions }) {
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

    const groupedAnswers = [];
    for (let i = 0; i < answers.length; i += 2) {
        groupedAnswers.push(answers.slice(i, i + 2));
    }

    return (
        <div className={style.card_container}>
            <div className={style.card_content}>

                <ProgressBar
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={totalQuestions}
                />

                <div className={style.card_question}>
                    <h2>{question}</h2>
                </div>

                <div className={style.card_answers}>
                    <div className={style.answer_field}>
                        {groupedAnswers.map((group, rowIndex) => (
                            <div key={rowIndex} className={style.button_row}>
                                {group.map((answer, index) => {
                                    const absoluteIndex = rowIndex * 2 + index;
                                    return (
                                        <div key={absoluteIndex} className={style.button_field}>
                                            <button
                                                onClick={() => handleAnswerClick(absoluteIndex)}
                                                className={
                                                    selected !== null
                                                        ? absoluteIndex === correct
                                                            ? style.correct
                                                            : selected === absoluteIndex
                                                                ? style.incorrect
                                                                : ""
                                                        : ""
                                                }

                                                disabled={selected !== null}
                                            >
                                                {answer}
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        ))}

                    </div>
                </div>


                {/* */}


            </div>
        </div>
    );
}

export default Card;
