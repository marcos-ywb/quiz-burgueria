import { createUser } from "@/database/userModel";

export async function POST(req) {
    try {
        const { nickname, uuid, telefone } = await req.json();

        if (!nickname || !uuid || !telefone) {
            return new Response(
                "Campos obrigatórios não preenchidos!", { status: 400 }
            );
        }

        const userId = await createUser(nickname, uuid, telefone);
        return Response.json({ userId });


    } catch (err) {
        console.error("Erro ao criar usuário:", err);
        return new Response("Erro interno do servidor", { status: 500 });
    }
}