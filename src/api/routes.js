let categoryRouter = require('./category/routes.js');
let categoryDetailRouter = require('./category-detail/routes.js');
let documentSaleRouter = require('./document-sale/routes.js');

module.exports = (app) => {
  app.get("/", (req, res) => {res.json({ message: "Welcome to ben's application!" })});
  app.use("/api", categoryRouter);
  app.use("/api", categoryDetailRouter);
  app.use("/api", documentSaleRouter);
}

