//config response
require('dotenv').config();

/**
 * description: handle response
 * created_by: ben
 * created_at: 03/04/2023
 */
const response = (res, data, status, message) => {
  if (status) {
    res.status(status);
  }
  res.json({
    data: data,
    status: status,
    message: message
  });
}

module.exports = {
  baby: process.env.USER_MYSQL,
  // db: {
  //   user: process.env.USER_MYSQL,
  //   password: process.env.PASSWORD_MYSQL,
  //   database: process.env.DATABASE_MYSQL,
  //   host: process.env.HOST_MYSQL,
  //   dialect: 'mysql',
  //   dialectModule: require('mysql2')
  // },
  status: {
    success: 1,
    failed: 0
  },
  httpStatus: {
    success: 200,
    created: 201,
    notfound: 404,
    badRequest: 400,
    conflict: 409
  },
  response,
}
