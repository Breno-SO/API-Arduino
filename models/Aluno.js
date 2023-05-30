var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");

class Aluno {
  //Busca todos os alunos
  async findAll() {
    try {
      var result = await knex
        .select(["Matricula", "Nome", "IdCartao", "Curso_IdCurso"])
        .table("aluno");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  //Cadastra aluno
  async create(matricula, nome, IdCartao, IdCurso) {
    try {
      await knex
        .insert({
          Matricula: matricula,
          Nome: nome,
          IdCartao: IdCartao,
          Curso_IdCurso: IdCurso,
        })
        .table("aluno");
    } catch (err) {
      return err;
      console.log(err);
    }
  }
  //Busca o curso por ID
  async findCurso(curso) {
    try {
      var result = await knex
        .select("*")
        .from("curso")
        .where({ IdCurso: curso });

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
  //Busca todos os cursos
  async findAllCurso() {
    try {
      let result = await knex.select("*").table("curso");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  //Busca o aluno por cartao id
  async findCartao(IdCartao) {
    try {
      var result = await knex
        .select("*")
        .from("aluno")
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
  //Busca o aluno por cartao id
  async findbyCartao(IdCartao) {
    try {
      let result = await knex
        .select("*")
        .from("aluno")
        .where({ IdCartao: IdCartao });

      if (result.length > 0) {
        return result[0];
      } else {
        return undefined;
      }
    } catch (err) {
      console.log(err);
      return false;
    }
  }
}

module.exports = new Aluno();
