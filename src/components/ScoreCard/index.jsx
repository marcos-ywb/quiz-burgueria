import style from "./ScoreCard.module.css";

function ScoreCard({ score, onRegister, onContinue }) {
    return (
        <div className={style.card_container}>
            <div className={style.card_content}>

                <div className={style.card_text}>
                    <h2>Fim do Quiz!</h2>
                    <p>Sua pontuação:</p>
                    <p>{score}</p>
                </div>

                <div className={style.card_button}>
                    <button onClick={onRegister} className={style.button}>Registrar-se!</button>
                    <button onClick={onContinue} className={style.button}>Continuar!</button>
                </div>

            </div>
        </div>
    );
}

export default ScoreCard;