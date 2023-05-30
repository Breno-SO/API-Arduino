var Aluno = require("../models/Aluno");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");

var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

var bcrypt = require("bcrypt");

class AlunoController {
  //Cadastra aluno
  async create(req, res) {
    let matricula = req.body.matricula;
    let nome = req.body.nome;
    let IdCartao = req.body.IdCartao;
    let IdCurso = req.body.IdCurso;

    if (
      matricula == undefined ||
      nome == undefined ||
      IdCartao == undefined ||
      IdCurso == undefined
    ) {
      res.status(400);
      res.json({
        err: "Falha no cadastro, nem todos os dados obrigatorios foram fornecidos",
      });
      return;
    } else {
      let cursoCheck = await Aluno.findCurso(IdCurso);

      if (cursoCheck) {
        try {
          let erro = await Aluno.create(matricula, nome, IdCartao, IdCurso);
          if (erro) {
            res.status(500);
            res.send("Falha ao cadastrar aluno tente novamente mais tarde");
          } else {
            res.status(201);
            res.send("Aluno cadastrado");
            return;
          }
        } catch (error) {
          res.status(500);
          res.send("Falha ao cadastrar aluno tente novamente mais tarde");
        }
      } else {
        res.status(400);
        res.json({ err: "Falha no cadastro, O curso informado não existe" });
      }
    }
  }
}

module.exports = new AlunoController();
