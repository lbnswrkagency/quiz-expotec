const express = require("express");
const logoController = require("../controllers/logoController");
const router = express.Router();

router.post("/", logoController.uploadLogo);
router.get("/:quizId?/:type?", logoController.getLogo);
router.delete("/:logoId", logoController.deleteLogo);
router.put("/:logoId/position", logoController.updateLogoPosition);

module.exports = router;
