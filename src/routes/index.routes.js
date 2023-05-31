import {Router} from 'express'

const router = Router();

router.get('/', (req, res) => {
    res.send("API FOR LORENZA'S COFFEE SYSTEM")
})

router.get('/creator', (req, res) => {
    res.send("CREATED BY YORK-AM")
})


export default router;