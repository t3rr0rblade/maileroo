import DB from "../db/index.js";

export default async function routes(fastify, options) {
  fastify.get("/ping", async (request, reply) => {
    return "pong\n";
  });

  fastify.post("/emails", async (request, reply) => {
    const { email } = request.body;
    await DB.addEmail(email);
    return reply.status(201).send({ message: "Email added" });
  });

  fastify.get("/emails", async (request, reply) => {
    const emails = await DB.getEmails();
    return reply.status(200).send(emails);
  });

  fastify.get("/emails/delete", async (request, reply) => {
    await DB.deleteAllEmails();
    return reply.status(200).send({ message: "Emails deleted" });
  });
}
