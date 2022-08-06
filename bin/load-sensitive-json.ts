import dotenv from "dotenv";
import fs from 'fs';

// ensure that .env file has been created
if (!fs.existsSync('.env')) {
  throw new Error('.env file not found');
}

dotenv.config();

const getNextPlaceholder = (body: string) => {
  let result = body.match(/{{([^}]+)}}/);
  return result && result[1];
};

const loadSensitiveJson = (path: string) => {
  let obj = fs.readFileSync(path, 'utf8');
  // while there are more placeholders
  for (let match = getNextPlaceholder(obj); match; match = getNextPlaceholder(obj)) {
    obj = obj.replace(`{{${match}}}`, process.env[match] || '');
  }
  return JSON.parse(obj);
};

export default loadSensitiveJson;