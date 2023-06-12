import {Router} from 'express'

import {getInsumos} from '../controllers/Insumos.controllers.js'
const router = Router();

router.get('/insumos', getInsumos);

export default router;