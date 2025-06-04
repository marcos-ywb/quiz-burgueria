import { connection } from "./connection";

export async function createUser(nickname, uuid, telefone) {
    const [result] = await connection.execute(
        "INSERT INTO users (nickname, uuid, telefone) VALUES (?, ?, ?)",
        [nickname, uuid, telefone]
    );
    return result.insertId;
}