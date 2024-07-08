const router = require("express").Router();
const characterController = require("../controllers/characterConrtroller");

router.post("/char", characterController.charAdd);
router.get("/char",characterController.charGetAll);
router.get("/char/:id",characterController.charGetOne);


module.exports = router;
