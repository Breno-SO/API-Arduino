let Organizador = require("../models/Organizador");
let Evento = require("../models/Eventos");
let PasswordToken = require("../models/PasswordToken");
let jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

let secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

let bcrypt = require("bcrypt");

class EventoController {
  //Cadastra Evento
  async create(req, res) {
    let IdOrganizador = req.body.idOrganizador;
    let nome = req.body.nome;
    let Inicio = req.body.inicio;
    let Fim = req.body.fim;

    if (
      IdOrganizador == undefined ||
      nome == undefined ||
      Inicio == undefined ||
      Fim == undefined ||
      IdOrganizador == undefined
    ) {
      res.status(400);
      res.json({
        err: "Falha no cadastro, nem todos os dados obrigatorios foram fornecidos",
      });
      return;
    } else {
      let organizadorCheck = await Organizador.findById(IdOrganizador);
      //Verifica se Organizador existe no banco
      if (organizadorCheck) {
        let dataDia = dayjs(Inicio).format("YYYY-MM-DD");
        let eventoCheck = await Evento.checkSchedule(IdOrganizador, dataDia);
        //Verifica se organizador já tem evento no dia cadastrado
        if (eventoCheck) {
          res.status(400);
          res.json({
            err: "Falha no cadastro, O organizador está vinculado a outro evento nessa data",
          });
        } else {
          try {
            let erro = await Evento.create(nome, Inicio, Fim, IdOrganizador);
            if (erro) {
              res.status(500);
              res.send("Falha ao cadastrar evento tente novamente mais tarde");
            } else {
              res.status(201);
              res.send("Evento cadastrado");
              return;
            }
          } catch (error) {
            res.status(500);
            res.send("Falha ao cadastrar evento tente novamente mais tarde");
          }
        }
      } else {
        res.status(400);
        res.json({
          err: "Falha no cadastro, O organizador informado não foi encontrado",
        });
      }
    }
  }
}

module.exports = new EventoController();
