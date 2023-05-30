var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class Organizador {
  //Busca todos os registros na tabela
  async findAll() {
    try {
      var result = await knex.select("*").table("organizador");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  //Cria um novo registro na tabela
  async create(nome, IdCartao) {
    try {
      await knex
        .insert({
          Nome: nome,
          IdCartao: IdCartao,
        })
        .table("organizador");
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  //Busca um registro pelo idCartao
  async findCartao(IdCartao) {
    try {
      var result = await knex
        .select("*")
        .from("organizador")
        .where({ IdCartao: IdCartao });

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

  //Busca um registro pelo idCartao
  async findbyCartao(IdCartao) {
    try {
      var result = await knex
        .select("*")
        .from("organizador")
        .where({ IdCartao: IdCartao });

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
  //Busca um registro pelo idOrganizador
  async findById(IdOrganizador) {
    try {
      let result = await knex
        .select(["idorganizador", "Nome", "IdCartao"])
        .where({ idOrganizador: IdOrganizador })
        .table("organizador");

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return undefined;
    }
  }
}

module.exports = new Organizador();
