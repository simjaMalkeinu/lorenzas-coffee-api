import {Router} from 'express'
import {getOrden, getOrdenes} from '../controllers/OrdenCompra.comtrollers.js'

const router = Router()

router.get('/ordenes', getOrdenes)
router.get('/orden/:id', getOrden)

export default router;