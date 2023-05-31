import {Router} from 'express'

const router = Router();

router.get('/deployed', (req, res) => {
    res.json({messsage: 'deployed'})
})


export default router;