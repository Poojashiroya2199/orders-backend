const express = require('express');
const router = express.Router();
const buyOrderController = require("../controllers/buyOrderController");

router.post('/orderCreate', buyOrderController.createOrder);
router.post('/orderUpdate', buyOrderController.updateOrder);
router.delete("/orderRemove", buyOrderController.removeOrder);
router.get('/:id', buyOrderController.getOrder);
router.get('/orders/:email', buyOrderController.getOrders );
module.exports = router;