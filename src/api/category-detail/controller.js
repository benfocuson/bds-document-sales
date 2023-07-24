const config = require('../../config/config.js')
const db = require('../../config/dbConfig.js')
require('dotenv').config();

/**
 * Description: method create
 * Created: DVBen(27/03/2023)
*/
const createCategoryDetail = async (req, res) => {

  const result = await db.db.CategoryDetails.create(req.body)

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category_detail.create.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category_detail.create.failed'));
  }
}

/**
 * Description: method get list
 * Created: DVBen(27/03/2023)
*/
const getListCategoryDetail = async (req, res) => {

  const result = await db.db.CategoryDetails.findAll()

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category_detail.find.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category_detail.find.failed'));
  }
}

/**
 * Description: method get detail
 * Created: DVBen(27/03/2023)
*/
const getDetailCategoryDetail = async (req, res) => {
  let id = req.params["id"]

  const result = await db.db.CategoryDetails.findOne({ where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category_detail.find.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category_detail.find.failed'));
  }
}

/**
 * Description: method delete
 * Created: DVBen(27/03/2023)
*/
const deleteCategoryDetail = async (req, res) => {
  let id = req.params["id"]

  const result = await db.db.CategoryDetails.destroy({ where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category_detail.delete.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category_detail.delete.failed'));
  }
}

/**
 * Description: method update
 * Updated: DVBen(27/03/2023)
*/
const updateCategoryDetail = async (req, res) => {
  let id = req.params["id"]
  let body = req.body

  const result = await db.db.CategoryDetails.update(body, { where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('category_detail.update.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('category_detail.update.failed'));
  }
}

module.exports = {
  createCategoryDetail,
  getListCategoryDetail,
  getDetailCategoryDetail,
  updateCategoryDetail,
  deleteCategoryDetail
}