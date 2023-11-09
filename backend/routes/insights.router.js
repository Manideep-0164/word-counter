const insightsRouter = require("express").Router();
const {
  getInsights,
  updateInsights,
  deleteInsights,
  getAllInsights,
} = require("../controllers/insights.controller");

insightsRouter.post("/insights", getInsights);
insightsRouter.patch("/insights/:id", updateInsights);
insightsRouter.delete("/insights/:id", deleteInsights);
insightsRouter.post("/insights-history", getAllInsights);

module.exports = insightsRouter;
