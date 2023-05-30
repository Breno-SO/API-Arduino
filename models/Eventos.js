var knex = require("../database/connection");
var bcrypt = require("bcrypt");
const PasswordToken = require("./PasswordToken");
const dayjs = require("dayjs");

class Evento {
  //Busca todos os registros na tabela de eventos
  async findAll() {
    try {
      var result = await knex
        .select([
          "IdEvento",
          "Nome",
          "Inicio",
          "Fim",
          "Organizador_idOrganizador",
        ])
        .table("evento");
      return result;
    } catch (err) {
      console.log(err);
      return [];
    }
  }
  //Cria Eventos
  async create(nome, Inicio, Fim, IdOrganizador) {
    try {
      await knex
        .insert({
          Nome: nome,
          Inicio: Inicio,
          Fim: Fim,
          Organizador_idOrganizador: IdOrganizador,
        })
        .table("evento");
    } catch (err) {
      return err;
      console.log(err);
    }
  }
  //Busca eventos por data e Id
  async findEventos(IdOrganizador, data) {
    try {
      let dataInicio = data + " 00:00:00";
      let dataFim = data + " 23:59:00";
      let result = await knex("evento")
        .where("Organizador_idOrganizador", IdOrganizador)
        .where((whereBuilder) =>
          whereBuilder.whereBetween("Inicio", [dataInicio, dataFim])
        );
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
  //Busca evento por ID
  async findById(IdEvento) {
    try {
      let result = await knex
        .select("*")
        .where({ IdEvento: IdEvento })
        .table("evento");

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
  //Registra presença de alunos
  async register(matricula, IdEvento) {
    try {
      let data = dayjs().format("YYYY-MM-DD HH:mm:ss");
      await knex
        .insert({
          entrada: data,
          Aluno_Matricula: matricula,
          Evento_IdEvento: IdEvento,
        })
        .table("eventoaluno");
    } catch (err) {
      console.log(err);
      return err;
    }
  }
  //Busca Aluno na tabela de registro de presença
  async findAluno(matricula, IdEvento) {
    try {
      let result = await knex
        .select("*")
        .from("eventoaluno")
        .where({ Aluno_Matricula: matricula, Evento_IdEvento: IdEvento });
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

  //Verifica se o organizador tem um evento marcado em determinado horario
  async checkSchedule(IdOrganizador, dataDia) {
    try {
      let dataInicio = dataDia + " 00:00:00";
      let dataFim = dataDia + " 23:59:59";

      let result = await knex("evento")
        .where("Organizador_idOrganizador", IdOrganizador)
        .where((whereBuilder) =>
          whereBuilder.whereBetween("Inicio", [dataInicio, dataFim])
        );

      // let result = await knex('evento').where(function() {
      //     this.whereBetween('Inicio', [Inicio, Fim]).orWhereBetween('Fim', [Inicio, Fim])
      //   })
      //   .andWhere('Organizador_idOrganizador', IdOrganizador)
      if (result.length > 0) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.log(err);
      return [];
    }
  }
}

module.exports = new Evento();
