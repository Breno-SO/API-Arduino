var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class Curso {
  //Busca todos os registros na tabela
  async findAll() {
    try {
      var result = await knex.select("*").table("curso");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  //Cadastra curso
  async create(nome) {
    try {
      await knex
        .insert({
          nome: nome,
        })
        .table("curso");
    } catch (err) {
      return err;
      console.log(err);
    }
  }
  //Verifica se existe um curso com esse nome cadastrado
  async findCurso(nome) {
    try {
      let result = await knex.select("*").from("curso").where({ nome: nome });

      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = new Curso();
