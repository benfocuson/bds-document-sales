const express = require('express');
const router = express.Router();
const categoryDetailController = require('./controller.js')

/**
 * Description: method create category detail
 * Created: DVBen(27/03/2023)
*/
router.post('/category-details', (req,res,next) => {
    return categoryDetailController.createCategoryDetail(req,res)
})

/**
 * Description: method get list category
 * Created: DVBen(27/03/2023)
*/
router.get('/category-details', (req,res,next) => {
    return categoryDetailController.getListCategoryDetail(req,res)
})

/**
 * Description: method get detail category
 * Created: DVBen(27/03/2023)
*/
router.get('/category-details/:id', (req,res,next) => {
    return categoryDetailController.getDetailCategoryDetail(req,res)
})

/**
 * Description: method update
 * Created: DVBen(27/03/2023)
*/
router.put('/category-details/:id', (req,res,next) => {
    return categoryDetailController.updateCategoryDetail(req,res)
})

/**
 * Description: method update
 * Created: DVBen(27/03/2023)
*/
router.delete('/category-details/:id', (req,res,next) => {
    return categoryDetailController.deleteCategoryDetail(req,res)
})

module.exports = router