const { execSync } = require("node:child_process");
const path = require("node:path");
const dotenv = require("dotenv");

const env = dotenv.config({ path: path.join(__dirname, ".env") }).parsed || {};
const baseUrl = env.BASE_URL || env.baseURL;

if (!baseUrl) {
  console.error("Missing BASE_URL in .env");
  process.exit(1);
}

const collectionPath = path.join(
  __dirname,
  "collection.postman_collection.json",
);
const command =
  process.platform === "win32"
    ? `cd /d "${__dirname}" && npx newman run "${collectionPath}" --env-var baseURL=${baseUrl}`
    : `cd "${__dirname}" && npx newman run "${collectionPath}" --env-var baseURL=${baseUrl}`;

try {
  execSync(command, {
    stdio: "inherit",
    shell: process.platform === "win32" ? "cmd.exe" : "/bin/bash",
    env: { ...process.env, BASE_URL: baseUrl },
  });
} catch (error) {
  process.exit(error.status || 1);
}
