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
  try {
    let id = req.params["id"]
    let body = req.body
    body.id = id

    if (body.sort_number_category_detail) {
      //update position
      await handleUpdatePosition(body)
    }

    //update category
    const result = await db.db.CategoryDetails.update(body, { where: { id } })

    //return result
    if (result && result.length) {
      config.response(res, result, config.httpStatus.success, req.__('category_detail.update.success'));
    } else {
      config.response(res, result, config.httpStatus.badRequest, req.__('category_detail.update.failed'));
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
  let listCategoryDetails = await db.db.CategoryDetails.findAll({ raw: true })
  let currentCategoryDetail = await db.db.CategoryDetails.findOne({where: {id: body.id}, raw: true })

  if (listCategoryDetails && listCategoryDetails) {
    for (let itemCategory of listCategoryDetails) {
      //check sort_number_category_detail and increase sort_number_category_detail of other item
      //nếu số hiện tại > số truyền vào
      if (currentCategoryDetail.sort_number_category_detail > body.sort_number_category_detail) {
        //thì tăng giá trị của bản ghi có sort number >= số truyền vào và < số hiện tại
        if (body.sort_number_category_detail <= itemCategory.sort_number_category_detail && itemCategory.sort_number_category_detail < currentCategoryDetail.sort_number_category_detail) {
          await db.db.CategoryDetails.update({ sort_number_category_detail: itemCategory.sort_number_category_detail + 1 }, { where: { id: itemCategory.id } })
        }
      } else {
        //nếu số hiện tại < số truyền vào
        //thì giảm giá trị của bản ghi có sort number <= số truyền vào và > số hiện tại
        if (currentCategoryDetail.sort_number_category_detail < itemCategory.sort_number_category_detail && itemCategory.sort_number_category_detail <= body.sort_number_category_detail) {
          await db.db.CategoryDetails.update({ sort_number_category_detail: itemCategory.sort_number_category_detail - 1 }, { where: { id: itemCategory.id } })
        }
      }
    }
  }

  //return
  return isSuccess
}

module.exports = {
  createCategoryDetail,
  getListCategoryDetail,
  getDetailCategoryDetail,
  updateCategoryDetail,
  deleteCategoryDetail
}