const config = require('../../config/config.js')
const db = require('../../config/dbConfig.js')
require('dotenv').config();
const { getStorage, ref, uploadBytes } = require("firebase/storage");
const { uploadFile } = require("../../middlewares/uploadFirebase.js")

/**
 * Description: method create
 * Created: DVBen(27/03/2023)
*/
const createDocumentSale = async (req, res) => {

  //upload img
  const dataImg = await uploadFile(req)

  //data create
  let dataCreate = {
    image_name: dataImg.name,
    image_url: dataImg.downloadURL,
    ...req.body
  }

  //create data
  const result = await db.db.DocumentSales.create(dataCreate)

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
  try {
    let id = req.params["id"]
    let body = req.body
    body.id = id

    if (body.sort_number_document_sale) {
      //update position
      await handleUpdatePosition(body)
    }

    //update category
    const result = await db.db.DocumentSales.update(body, { where: { id } })

    //return result
    if (result && result.length) {
      config.response(res, result, config.httpStatus.success, req.__('document_sale.update.success'));
    } else {
      config.response(res, result, config.httpStatus.badRequest, req.__('document_sale.update.failed'));
    }

  } catch (error) {
    config.response(res, error, config.httpStatus.badRequest, req.__('system.error'));
  }
}

/**
 * Description: update position by sort number
 * Updated: DVBen(27/03/2023)
*/
const handleUpdatePosition = async (body) => {
  let isSuccess = true
  //get list categories
  let listDocumentSales = await db.db.DocumentSales.findAll({ raw: true })
  let currentDocumentSale = await db.db.DocumentSales.findOne({where: {id: body.id}, raw: true })

  if (listDocumentSales && listDocumentSales) {
    for (let itemDocumentSale of listDocumentSales) {
      //check sort_number_document_sale and increase sort_number_document_sale of other item
      //nếu số hiện tại > số truyền vào
      if (currentDocumentSale.sort_number_document_sale > body.sort_number_document_sale) {
        //thì tăng giá trị của bản ghi có sort number >= số truyền vào và < số hiện tại
        if (body.sort_number_document_sale <= itemDocumentSale.sort_number_document_sale && itemDocumentSale.sort_number_document_sale < currentDocumentSale.sort_number_document_sale) {
          await db.db.DocumentSales.update({ sort_number_document_sale: itemDocumentSale.sort_number_document_sale + 1 }, { where: { id: itemDocumentSale.id } })
        }
      } else {
        //nếu số hiện tại < số truyền vào
        //thì giảm giá trị của bản ghi có sort number <= số truyền vào và > số hiện tại
        if (currentDocumentSale.sort_number_document_sale < itemDocumentSale.sort_number_document_sale && itemDocumentSale.sort_number_document_sale <= body.sort_number_document_sale) {
          await db.db.DocumentSales.update({ sort_number_document_sale: itemDocumentSale.sort_number_document_sale - 1 }, { where: { id: itemDocumentSale.id } })
        }
      }
    }
  }

  //return
  return isSuccess
}



module.exports = {
  createDocumentSale,
  getListDocumentSale,
  getDetailDocumentSale,
  updateDocumentSale,
  deleteDocumentSale
}