const express = require('express');
const router = express.Router();
const categoryController = require('./controller.js')

/**
 * Description: method create category
 * Created: DVBen(27/03/2023)
*/
router.post('/categories', (req,res,next) => {
    return categoryController.createCategory(req,res)
})

/**
 * Description: method get list category
 * Created: DVBen(27/03/2023)
*/
router.get('/categories', (req,res,next) => {
    return categoryController.getListCategory(req,res)
})

/**
 * Description: method get detail category
 * Created: DVBen(27/03/2023)
*/
router.get('/categories/:id', (req,res,next) => {
    return categoryController.getDetailCategory(req,res)
})

/**
 * Description: method update
 * Created: DVBen(27/03/2023)
*/
router.put('/categories/:id', (req,res,next) => {
    return categoryController.updateCategory(req,res)
})

/**
 * Description: method update
 * Created: DVBen(27/03/2023)
*/
router.delete('/categories/:id', (req,res,next) => {
    return categoryController.deleteCategory(req,res)
})

module.exports = router