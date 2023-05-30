var express = require("express");
var app = express();
var router = express.Router();
// var HomeController = require("../controllers/HomeController");
// var UserController = require("../controllers/UserController");
var AdminAuth = require("../middleware/AdminAuth");
const AlunoController = require("../controllers/AlunoController");
const OrganizadorController = require("../controllers/OrganizadorController");
const EventoController = require("../controllers/EventoController");
const ArduinoController = require("../controllers/ArduinoController");
const CursoController = require("../controllers/CursoController");

//Cadastra aluno no banco de dados
router.post("/createAluno", AlunoController.create);
//Cadastra organizador no banco de dados
router.post("/createOrganizador", OrganizadorController.create);
//Cadastra evento no banco de dados
router.post("/createEvento", EventoController.create);
//Registra Presença em evento
router.post("/registerAluno", ArduinoController.register);
//Verifica se organizador tem evento para iniciar
router.get(
  "/organizadorCheck/:idcartao",
  ArduinoController.ArduinoCheckOrganizador
);
//Busca todos os cursos
router.get("/findCursos", CursoController.findAll);
//Cadastra curso
router.post("/createCurso", CursoController.create);

// router.post("/user", UserController.create);
// router.get("/user", AdminAuth, UserController.index);
// router.get("/user/:id", AdminAuth, UserController.findUser);
// router.put("/user", AdminAuth, UserController.edit);
// router.delete("/user/:id", AdminAuth, UserController.remove);
// router.post("/recoverpassword", UserController.recoverPassword);
// router.post("/changepassword", UserController.changePassword);
// router.post("/login", UserController.login);

module.exports = router;
