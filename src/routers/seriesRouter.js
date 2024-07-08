const router = require('express').Router();
const seriesController = require('../controllers/seriesController');

router.post("/", seriesController.seriesAdd);
router.get("/:seriesName", seriesController.getCharactersInSeries);

module.exports = router;
