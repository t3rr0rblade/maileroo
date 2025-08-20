import knex from "knex";

const knexInstance = knex({
  client: "sqlite3",
  connection: {
    filename: "./dev.sqlite3",
  },
});

class DB {
  static async addEmail(data) {
    return knexInstance("emails").insert(data);
  }

  static async getEmails() {
    return knexInstance("emails").select("*");
  }

  static async deleteAllEmails() {
    return knexInstance("emails").delete();
  }
}

export default DB;
