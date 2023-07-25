const config = require('../../config/config.js')
const db = require('../../config/dbConfig.js')
const categoryService = require("./services.js")
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
  try {
    let result = await categoryService.getAllCategory()

    if (result) {
      res.json({
        categories: result,
        status: config.httpStatus.success,
        message: req.__('category.find.success')
      });
    } else {
      config.response(res, result, config.httpStatus.badRequest, req.__('category.find.failed'));
    }

  } catch (error) {
    config.response(res, error, config.httpStatus.badRequest, req.__('system.error'));
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
  try {
    let id = req.params["id"]
    let body = req.body
    body.id = id

    if (body.sort_number_category) {
      //update position
      await handleUpdatePosition(body)
    }

    //update category
    const result = await db.db.Category.update(body, { where: { id } })

    //return result
    if (result && result.length) {
      config.response(res, result, config.httpStatus.success, req.__('category.update.success'));
    } else {
      config.response(res, result, config.httpStatus.badRequest, req.__('category.update.failed'));
    }

  } catch (error) {
    config.response(res, error, config.httpStatus.badRequest, req.__('system.error'));
  }
}

const handleUpdatePosition = async (body) => {
  let isSuccess = true
  //get list categories
  let listCategories = await db.db.Category.findAll({ raw: true })
  let currentCategory = await db.db.Category.findOne({where: {id: body.id}, raw: true })

  if (listCategories && listCategories) {
    for (let itemCategory of listCategories) {
      //check sort_number_category and increase sort_number_category of other item
      //nếu số hiện tại > số truyền vào
      if (currentCategory.sort_number_category > body.sort_number_category) {
        //thì tăng giá trị của bản ghi có sort number >= số truyền vào và < số hiện tại
        if (body.sort_number_category <= itemCategory.sort_number_category && itemCategory.sort_number_category < currentCategory.sort_number_category) {
          await db.db.Category.update({ sort_number_category: itemCategory.sort_number_category + 1 }, { where: { id: itemCategory.id } })
        }
      } else {
        //nếu số hiện tại < số truyền vào
        //thì giảm giá trị của bản ghi có sort number <= số truyền vào và > số hiện tại
        if (currentCategory.sort_number_category < itemCategory.sort_number_category && itemCategory.sort_number_category <= body.sort_number_category) {
          await db.db.Category.update({ sort_number_category: itemCategory.sort_number_category - 1 }, { where: { id: itemCategory.id } })
        }
      }
    }
  }

  //return
  return isSuccess
}



module.exports = {
  createCategory,
  getListCategory,
  getDetailCategory,
  updateCategory,
  deleteCategory
}