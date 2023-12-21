const { Storage } = require("@google-cloud/storage");
const util = require("util");
const multer = require("multer");


const multerConfig = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024, 
  },
}).single("file");

let processFileConfig = util.promisify(multerConfig);

const storage = new Storage({
  keyFilename : require('../../key.json'),
  projectId: "finalproject-408706",
});
const bucket = storage.bucket("test_image01");

module.exports = { multerConfig, storage, bucket, processFileConfig };