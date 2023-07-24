const config = require('../../config/config.js')
const db = require('../../config/dbConfig.js')
require('dotenv').config();

/**
 * Description: method create
 * Created: DVBen(27/03/2023)
*/
const createDocumentSale = async (req, res) => {

  const result = await db.db.DocumentSales.create(req.body)

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('document_sale.create.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('document_sale.create.failed'));
  }
}

/**
 * Description: method get list
 * Created: DVBen(27/03/2023)
*/
const getListDocumentSale = async (req, res) => {

  const result = await db.db.DocumentSales.findAll()

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('document_sale.find.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('document_sale.find.failed'));
  }
}

/**
 * Description: method get detail
 * Created: DVBen(27/03/2023)
*/
const getDetailDocumentSale = async (req, res) => {
  let id = req.params["id"]

  const result = await db.db.DocumentSales.findOne({ where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('document_sale.find.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('document_sale.find.failed'));
  }
}

/**
 * Description: method delete
 * Created: DVBen(27/03/2023)
*/
const deleteDocumentSale = async (req, res) => {
  let id = req.params["id"]

  const result = await db.db.DocumentSales.destroy({ where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('document_sale.delete.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('document_sale.delete.failed'));
  }
}

/**
 * Description: method update
 * Updated: DVBen(27/03/2023)
*/
const updateDocumentSale = async (req, res) => {
  let id = req.params["id"]
  let body = req.body

  const result = await db.db.DocumentSales.update(body, { where: { id } })

  if (result) {
    config.response(res, result, config.httpStatus.success, req.__('document_sale.update.success'));
  } else {
    config.response(res, result, config.httpStatus.badRequest, req.__('document_sale.update.failed'));
  }
}

module.exports = {
  createDocumentSale,
  getListDocumentSale,
  getDetailDocumentSale,
  updateDocumentSale,
  deleteDocumentSale
}