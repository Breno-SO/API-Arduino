var Aluno = require("../models/Aluno");
var Organizador = require("../models/Organizador");
var PasswordToken = require("../models/PasswordToken");
var jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

var secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

var bcrypt = require("bcrypt");

class OrganizadorController {
  //Cadastra Organizador
  async create(req, res) {
    let nome = req.body.nome;
    let IdCartao = req.body.IdCartao;
    //Checa se dados foram fornecidos
    if (nome == undefined || IdCartao == undefined) {
      res.status(400);
      res.json({
        error:
          "Falha no cadastro, nem todos os dados obrigatorios foram fornecidos",
      });
      return;
    } else {
      let cartaoAlunoCheck = await Aluno.findCartao(IdCartao);
      let cartaoOrganizadorCheck = await Organizador.findCartao(IdCartao);
      //Checa se cartão existe no banco
      if (!cartaoAlunoCheck && !cartaoOrganizadorCheck) {
        try {
          let erro = await Organizador.create(nome, IdCartao);
          if (erro) {
            res.status(500);
            res.send(
              "Falha ao cadastrar organizador tente novamente mais tarde"
            );
          } else {
            res.status(201);
            res.send("Organizador cadastrado");
            return;
          }
        } catch (error) {
          res.status(500);
          res.send("Falha ao cadastrar organizador tente novamente mais tarde");
        }
      } else {
        res.status(400);
        res.json({
          error:
            "Falha no cadastro, o Cartão informado esta vinculado a um usuario existente",
        });
        return;
      }
    }
  }
}

module.exports = new OrganizadorController();
