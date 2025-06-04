"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import confetti from "canvas-confetti";

/* STYLES */
import style from "./game.module.css";

/* COMPONENTS */
import Card from "@/components/Card";
import ScoreCard from "@/components/ScoreCard";
import RegisterForm from "@/components/RegisterForm";

/* DATA */
import questions from "@/data/questions";

function game() {
    const router = useRouter();
    const [isCheckingUser, setIsCheckingUser] = useState(true);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);

    const [quizEnded, setQuizEnded] = useState(false);
    const [showRegisterForm, setShowRegisterForm] = useState(false);

    useEffect(() => {
        if (quizEnded) {
            confetti({
                particleCount: 150,
                spread: 100,
                origin: { y: 0.6 },
            });
        }
    }, [quizEnded]);

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
            setQuizEnded(true);
        }
    }


    function onRegister() {
        setShowRegisterForm(true);
    }

    function onContinue() {
        setShowRegisterForm(false);
        location.reload();
    }

    if (showRegisterForm) {
        return (
            <div className={style.main_container}>
                <main className={`${style.main_content} ${style.modal_backdrop}`}>
                    <RegisterForm />
                </main>
            </div>
        );
    }

    if (quizEnded) {
        return (
            <div className={style.main_container}>
                <main className={`${style.main_content} ${style.modal_backdrop}`}>
                    <ScoreCard score={score} onRegister={onRegister} onContinue={onContinue} />
                </main>
            </div>
        );
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

