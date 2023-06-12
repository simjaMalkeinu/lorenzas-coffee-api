import { Router } from "express";
import { getProducts, getProduct, addProduct, delteProduct } from "../controllers/Product.controllers.js";

const router = Router();

router.get("/products", getProducts);
router.get("/product/:id", getProduct);
router.post("/newProduct", addProduct);
router.delete("/deleteProduct", delteProduct);

export default router;
