let Organizador = require("../models/Organizador");
let Evento = require("../models/Eventos");
let PasswordToken = require("../models/PasswordToken");
let jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

let secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

let bcrypt = require("bcrypt");
const Aluno = require("../models/Aluno");

class ArduinoController {
  //Função que é executada quando um cartão é passado no leitor com o arduino em iniciar evento
  async ArduinoCheckOrganizador(req, res) {
    let IdCartao = req.params.idcartao;
    if (IdCartao == undefined) {
      res.status(400);
      res.json({ err: "Erro, Dados do cartão não encontrados" });
      return;
    } else {
      let cartaoOrganizadorCheck = await Organizador.findCartao(IdCartao);
      let dadosOrganizador = await Organizador.findbyCartao(IdCartao);
      //Verifica se o cartão do organizador existe no banco
      if (cartaoOrganizadorCheck) {
        let dataDia = dayjs().format("YYYY-MM-DD");
        let eventoOrganizadorCheck = await Evento.findEventos(
          dadosOrganizador.idOrganizador,
          dataDia
        );
        //Verifica e encontra evento do organizador
        if (eventoOrganizadorCheck) {
          res.status(200);
          res.send(eventoOrganizadorCheck);
        } else {
          res.status(400);
          res.json({ err: "Erro, Nenhum evento encontrado" });
          return;
        }
      } else {
        res.status(400);
        res.json({ err: "Erro, Nenhum evento encontrado" });
        return;
      }
    }
  }
  //Função executada quando um aluno tenta registrar presença em eventos
  async register(req, res) {
    let IdCartao = req.body.idCartao;
    let IdEvento = req.body.idEvento;

    if (IdCartao == undefined || IdEvento == undefined) {
      res.status(400);
      res.json({
        err: "Falha no cadastro, nem todos os dados obrigatorios foram fornecidos",
      });
      return;
    } else {
      let cartaoAlunoCheck = await Aluno.findbyCartao(IdCartao);
      let eventoCheck = await Evento.findById(IdEvento);
      //Verifica se aluno e evento existem
      if (cartaoAlunoCheck && eventoCheck) {
        let eventoAlunoCheck = await Evento.findAluno(
          cartaoAlunoCheck.Matricula,
          IdEvento
        );
        //Verifica se aluno já possui registro em evento
        if (!eventoAlunoCheck) {
          try {
            let erro = await Evento.register(
              cartaoAlunoCheck.Matricula,
              IdEvento
            );
            if (erro) {
              res.status(500);
              res.send({
                err: "Falha ao registrar presença tente novamente mais tarde",
              });
              return;
            } else {
              res.status(201);
              res.send("Presença registrada");
              return;
            }
          } catch (error) {
            res.status(500);
            res.send({
              err: "Falha ao registrar presença tente novamente mais tarde",
            });
            return;
          }
        } else {
          res.status(500);
          res.send({ err: "Presença de aluno já registrada" });
          return;
        }
      } else {
        res.status(500);
        res.send({
          err: "Falha ao registrar presença tente novamente mais tarde",
        });
        return;
      }
    }
  }
}

module.exports = new ArduinoController();
