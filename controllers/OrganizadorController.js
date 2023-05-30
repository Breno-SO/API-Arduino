let Aluno = require("../models/Aluno");
let Organizador = require("../models/Organizador");
let PasswordToken = require("../models/PasswordToken");
let jwt = require("jsonwebtoken");
const dayjs = require("dayjs");

let secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

let bcrypt = require("bcrypt");

class OrganizadorController {
  //Busca todos os organizadores
  async findAll(req, res) {
    let organizadores = await Organizador.findAll();
    res.json(organizadores);
  }
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
