const config = require('../../config/config.js')
const db = require('../../config/dbConfig.js')
require('dotenv').config();

/**
 * Description: method create
 * Created: DVBen(27/03/2023)
*/
const createCategory = async (req, res) => {

  const result = await db.db.Category.create(req.body)

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category.create.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category.create.failed'));
  }
}

/**
 * Description: method get list
 * Created: DVBen(27/03/2023)
*/
const getListCategory = async (req, res) => {

  const result = await db.db.Category.findAll()

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category.find.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category.find.failed'));
  }
}

/**
 * Description: method get detail
 * Created: DVBen(27/03/2023)
*/
const getDetailCategory = async (req, res) => {
  let id = req.params["id"]

  const result = await db.db.Category.findOne({ where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category.find.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category.find.failed'));
  }
}

/**
 * Description: method delete
 * Created: DVBen(27/03/2023)
*/
const deleteCategory = async (req, res) => {
  let id = req.params["id"]

  const result = await db.db.Category.destroy({ where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category.delete.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category.delete.failed'));
  }
}

/**
 * Description: method update category
 * Updated: DVBen(27/03/2023)
*/
const updateCategory = async (req, res) => {
  let id = req.params["id"]
  let body = req.body

  const result = await db.db.Category.update(body, { where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category.update.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category.update.failed'));
  }
}



module.exports = {
  createCategory,
  getListCategory,
  getDetailCategory,
  updateCategory,
  deleteCategory
}