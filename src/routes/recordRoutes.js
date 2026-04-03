const router = require("express").Router();

const ctrl = require('../controllers/recordController');
const auth = require('../middlewares/auth');


router.post("/", auth, ctrl.create);
router.get("/", auth, ctrl.getAll);
router.put("/:id", auth, ctrl.update);
router.delete("/:id", auth, ctrl.delete);

module.exports = router;