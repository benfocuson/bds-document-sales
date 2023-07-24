const express = require('express');
const router = express.Router();
const documentSalesController = require('./controller.js')

/**
 * Description: method create 
 * Created: DVBen(27/03/2023)
*/
router.post('/document-sales', (req,res,next) => {
    return documentSalesController.createDocumentSale(req,res)
})

/**
 * Description: method get list
 * Created: DVBen(27/03/2023)
*/
router.get('/document-sales', (req,res,next) => {
    return documentSalesController.getListDocumentSale(req,res)
})

/**
 * Description: method get detail
 * Created: DVBen(27/03/2023)
*/
router.get('/document-sales/:id', (req,res,next) => {
    return documentSalesController.getDetailDocumentSale(req,res)
})

/**
 * Description: method update
 * Created: DVBen(27/03/2023)
*/
router.put('/document-sales/:id', (req,res,next) => {
    return documentSalesController.updateDocumentSale(req,res)
})

/**
 * Description: method update
 * Created: DVBen(27/03/2023)
*/
router.delete('/document-sales/:id', (req,res,next) => {
    return documentSalesController.deleteDocumentSale(req,res)
})

module.exports = router