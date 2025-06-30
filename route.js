import e from "express";
import express from "express";
import multer from "multer";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads");
  },
  filename: (req, res, cb) => {
    cb(null, Date.now() + ".jpg");
  },
});

const upload = multer({ storage: storage });

router.route("/addimage").post(upload.single("img"), (req, res) => {
  try {
    res.json({ path: req.file.filename });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error uploading image" });
  }
});

export default router;
