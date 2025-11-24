import path from "path";
import fs, { readFileSync } from "fs";


const filePath = path.join(process.cwd(), './src/data/users.json');

export function readUsers() {
  const data = readFileSync(filePath, 'utf-8');
  return JSON.parse(data);
}

export function writeUsers(users: any[]) {
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2), 'utf-8');
}