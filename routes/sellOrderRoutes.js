const express = require('express');
const router = express.Router();
const sellOrderController = require("../controllers/sellOrderController");

router.post('/orderCreate', sellOrderController.createOrder);
router.post('/orderUpdate', sellOrderController.updateOrder);
router.delete("/orderRemove", sellOrderController.removeOrder);
router.get('/:id', sellOrderController.getOrder);
router.get('/orders/:email',sellOrderController.getOrders);

module.exports = router;