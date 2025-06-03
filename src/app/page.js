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

  useEffect(() => {
    const user = localStorage.getItem("quiz_user");
    if (!user) {
      setShowForm(true);
    }
    console.log(user);
  }, []);

  const handleComplete = () => {
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

        <h1 className="text-3xl font- ld">Hamburgueria X - Bem-vindo!</h1>
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