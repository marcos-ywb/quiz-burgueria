/*STYLES*/
import style from "./ProgressBar.module.css";

function ProgressBar({ currentQuestionIndex, totalQuestions }) {
    const progressPercentage = ((currentQuestionIndex + 1) / totalQuestions) * 100;
    return (
        <div className={style.card_progress_container}>
            <div className={style.card_progress_info}>
                <span>{currentQuestionIndex + 1}/{totalQuestions}</span>
            </div>
            <div className={style.card_progress}>
                <div className={style.progress_bar} style={{ width: `${progressPercentage}%` }}></div>
            </div>
        </div>
    );
}

export default ProgressBar;