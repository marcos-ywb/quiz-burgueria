"use client";
import { useState } from "react";

/* STYLES */
import style from "./game.module.css";

/* COMPONENTS */
import Card from "@/components/Card";

/* DATA */
import questions from "@/data/questions";

function game() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    function handleAnswered(result) {
        if (result === true) {
            setScore((prevScore) => prevScore + 1);
        }
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            alert(`Fim do quiz! \nPontuação: ${score}`);
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div className={style.main_container}>
            <main className={style.main_content}>
                <Card
                    question={currentQuestion.question}
                    answers={currentQuestion.answers}
                    correct={currentQuestion.correct}
                    onAnswered={handleAnswered}
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={questions.length}
                />
            </main>
        </div>
    );
}

export default game;

