let express = require("express");
let app = express();
let router = express.Router();
let AdminAuth = require("../middleware/AdminAuth");
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

//Busca todos os organizadores
router.get("/findOrganizadores", OrganizadorController.findAll);

module.exports = router;
