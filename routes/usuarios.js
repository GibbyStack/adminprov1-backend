//Ruta api/usuarios

const Router = require('express');
const router = Router();

router.get('/', getUsuarios);
router.post('/', addUsuario);

module.exports = router;