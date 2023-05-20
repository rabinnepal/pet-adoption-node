// const multer = require("multer");

// var storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./uploads/");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + file.originalname);
//   },
// });

// module.exports = {
//   multer,
//   storage,
// };
const multer = require("multer");
const path = require("path");

const imgExt = [
  ".png",
  ".PNG",
  ".jpg",
  ".JPG",
  ".jpeg",
  ".JPEG",
  ".webp",
  ".WEBP",
];

// Multer config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (imgExt.includes(ext) == false) {
      cb(new Error("File type is not supported."), false);
      return;
    }
    cb(null, true);
  },
});
