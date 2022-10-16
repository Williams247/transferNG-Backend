const multer = require("multer");
const path = require("path");

export const multerConfig = multer({
  storage: multer.diskStorage({}),
  fileFilter: (request: any, file: any, callBack: any): false | undefined => {
    let extension = path.extname(file.originalname);
    if (extension !== ".jpg" && extension !== ".jpeg" && extension !== ".png") {
      callBack(new Error("File type is not supported"), false);
      return false;
    }
    callBack(null, true);
  },
});
