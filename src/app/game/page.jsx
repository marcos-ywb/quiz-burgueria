"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

/* STYLES */
import style from "./game.module.css";

/* COMPONENTS */
import Card from "@/components/Card";

/* DATA */
import questions from "@/data/questions";

function game() {
    const router = useRouter();
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);


    useEffect(() => {
        const user = localStorage.getItem("quiz_user");

        if (!user) {
            localStorage.setItem("needs_login", "true");
            router.push("/");
        } else {
            setIsCheckingUser(false);
        }
    }, [router])

    if (isCheckingUser) return null;

    function handleAnswered(result) {
        let updatedScore = score;

        if (result === true) {
            updatedScore = score + 1;
            setScore(updatedScore);
        }

        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        } else {
            alert(`Fim do quiz! \nPontuação: ${updatedScore}`);
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

