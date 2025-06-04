"use client";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

/*COMPONENTES*/
import NicknameForm from "@/components/NicknameForm";

/*STYLES*/
import style from "./page.module.css";

export default function Home() {
  const [showForm, setShowForm] = useState(false);
  const [nickname, setNickname] = useState("");

  useEffect(() => {
    const user = localStorage.getItem("quiz_user");

    if (!user) {
      setShowForm(true);
    } else {
      try {
        const parsedUser = JSON.parse(user);
        setNickname(parsedUser.nickname);

      } catch (err) {
        console.error("Erro ao fazer parse do usuário:", error);
        setShowForm(true);
      }
    }

    console.log(user);
  }, []);

  const handleComplete = () => {
    const updatedUser = localStorage.getItem("quiz_user");

    if (updatedUser) {
      try {
        const parsedUser = JSON.parse(updatedUser);
        setNickname(parsedUser.nickname);

      } catch (e) {
        console.error("Erro ao atualizar nickname:", e);
      }
    }

    setShowForm(false);
  };


  useEffect(() => {
    const needsLogin = localStorage.getItem("needs_login");

    if (needsLogin === "true") {
      setTimeout(() => {
        toast.warn("Você precisa se identificar para jogar! 🍔", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });

      }, 200);
      localStorage.removeItem("needs_login");
    }
  }, []);


  return (
    <>
      <ToastContainer />
      <main className={style.main}>

        <h1 className="text-3xl font- ld">Hamburgueria- Bem-vindo!</h1>

        {nickname && (
          <p className="mt-2 text-lg">Seja bem-vindo(a), <strong>{nickname}</strong>!</p>
        )}

        <p className="mt-4">Explore nosso menu, participe do quiz e ganhe prêmios!</p>

        {
          showForm && (
            <div className={style.modal_backdrop}>
              <NicknameForm onComplete={handleComplete} />
            </div>
          )
        }
      </main>
    </>
  );
}