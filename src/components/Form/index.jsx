import style from "./Form.module.css";

function Form() {
    return (
        <form action="">
            <div className={style.input_field}>
                <input type="text" placeholder="Digite seu nome..." />
            </div>

            <div className={style.input_field}>
                <input type="text" placeholder="Digite seu sobrenome..." />
            </div>

            <button type="submit">Enviar!</button>
        </form>
    );
}

export default Form;

