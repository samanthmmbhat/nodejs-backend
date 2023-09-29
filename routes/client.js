const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { verifyToken } = require('./middleware');

// Client CRUD routes
router.post('/create', verifyToken,clientController.createClient);
router.get('/', verifyToken,clientController.getAllClients);
router.get('/:id', verifyToken,clientController.getClientById);
router.put('/:id', verifyToken,clientController.updateClient);
router.delete('/:id', verifyToken,clientController.deleteClient);
router.post('/createAgencyClient', verifyToken, clientController.createAgencyClient);

module.exports = router;
