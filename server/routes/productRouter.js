const express = require("express");
const productController = require("../controllers/productController");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images/");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

router.post("/", upload.single("image"), productController.save);
router.get("/", productController.getAll);
router.delete("/:productId", productController.deleteById);
router.put("/:productId", productController.edit);

module.exports = router;
