let Curso = require("../models/Curso");
let PasswordToken = require("../models/PasswordToken");
let jwt = require("jsonwebtoken");

let secret = "adsuasgdhjasgdhjdgahjsg12hj3eg12hj3g12hj3g12hj3g123";

let bcrypt = require("bcrypt");
const { findCurso } = require("../models/Aluno");

class CursoController {
  //Encontra todos os cursos
  async findAll(req, res) {
    let cursos = await Curso.findAll();
    res.json(cursos);
  }
  //Cadastra Curso
  async create(req, res) {
    let nome = req.body.nome;
    if (nome == undefined) {
      res.status(400);
      res.json({
        err: "Falha no cadastro, nem todos os dados obrigatorios foram fornecidos",
      });
      return;
    } else {
      let cursoCheck = await Curso.findCurso(nome);
      if (cursoCheck) {
        res.status(400);
        res.json({
          err: "Falha no cadastro, o curso informado já esta cadastrado",
        });
        return;
      } else {
        try {
          let erro = await Curso.create(nome);
          if (erro) {
            res.status(500);
            res.send("Falha ao cadastrar curso tente novamente mais tarde");
          } else {
            res.status(201);
            res.send("Curso cadastrado");
            return;
          }
        } catch (error) {
          res.status(500);
          res.send("Falha ao cadastrar curso tente novamente mais tarde");
        }
      }
    }
  }
}

module.exports = new CursoController();
