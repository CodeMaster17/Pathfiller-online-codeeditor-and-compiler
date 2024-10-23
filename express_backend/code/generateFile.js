const fs = require("fs");
const path = require("path");
const { v4: uuid } = require("uuid");

const dirCodes = path.join(__dirname, "generated_codes");

if (!fs.existsSync(dirCodes)) {
  fs.mkdirSync(dirCodes, { recursive: true });
}

const generateFile = async (format, content) => {

  // generating random id
  const jobId = uuid();

  // generating name of the file
  const filename = `${jobId}.${format}`;

  // fetching file name
  const filepath = path.join(dirCodes, filename);

  // write incoming on the file
  fs.writeFileSync(filepath, content);

  return filepath;
};

module.exports = {
  generateFile,
};
