"use client";
import { useState } from "react";

/*STYLES*/
import style from "./page.module.css";

/*COMPONENTES*/
import Form from "@/components/Form";
import Card from "@/components/Card";

/*DATA*/
import questions from "@/data/questions";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  function handleAnswered(result) {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      alert("Fim do quiz!");
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    }
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <main className={style.main_container}>
      <Card
        counter={currentQuestionIndex + 1}
        question={currentQuestion.question}
        answers={currentQuestion.answers}
        correct={currentQuestion.correct}
        onAnswered={handleAnswered}
      />
    </main>
  );
}
