import * as fs from "fs";
import { exit } from "process";

const upRev = (filePath, version) => {
  const jsonFile = JSON.parse(fs.readFileSync(filePath, "utf8"));
  jsonFile.version = version;
  fs.writeFileSync(filePath, JSON.stringify(jsonFile, null, 2));
};

// Get the version argument from the command line
const filePath = process.argv[2];
const version = process.argv[3];
if (!filePath || !version) {
  console.error(
    "FileName and Version must be specified. Use this script with `node scripts/uprev.js <filePath> <version>`"
  );
  exit(1);
}

upRev(filePath, version);
console.log(`Updated ${filePath} version to ${version}`);
