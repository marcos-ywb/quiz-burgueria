import mysql from "mysql2/promise";

export const connection = await mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "quiz_burgueria",
});