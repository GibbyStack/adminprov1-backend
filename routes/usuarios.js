//Ruta api/usuarios

const Router = require('express');
const {
    check
} = require('express-validator');
const {
    getUsuarios,
    addUsuario,
    updateUsuario,
    deleteUsuario,
    getUsuario
} = require('../controllers/usuarios');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

//Get all
router.get('/', getUsuarios);
//Get by id
router.get('/:id', getUsuario);
//Add
router.post('/', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    addUsuario
);
//Update
router.put('/:id', [
        check('nombre', 'El nombre es requerido').not().isEmpty(),
        check('email', 'El email es requerido').not().isEmpty(),
        check('password', 'El password es requerido').not().isEmpty(),
        validarCampos
    ],
    updateUsuario
);
//Delete
router.delete('/:id', deleteUsuario);

module.exports = router;