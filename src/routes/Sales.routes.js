import {Router} from 'express'
import {getSale, getSales, addSale, updateSale, deleteSale} from '../controllers/Sales.controler.js'

const router = Router()


router.get('/ventas', getSales)
router.get('/venta/:id', getSale)
router.post('/venta', addSale)
router.put('/venta/:id', updateSale)
router.delete('/venta', deleteSale)

export default router;