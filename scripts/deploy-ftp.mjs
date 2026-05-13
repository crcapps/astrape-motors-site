import { access } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Client } from "basic-ftp";
import dotenv from "dotenv";

dotenv.config();

const required = ["FTP_HOST", "FTP_USER", "FTP_PASSWORD"];
const missing = required.filter((key) => !process.env[key]);

if (missing.length > 0) {
  console.error(`Missing required env vars: ${missing.join(", ")}`);
  process.exit(1);
}

const distDir = path.resolve(process.cwd(), "dist");

try {
  await access(distDir);
} catch {
  console.error("Missing dist/ directory. Run `npm run build` first.");
  process.exit(1);
}

const client = new Client();
client.ftp.verbose = false;

try {
  await client.access({
    host: process.env.FTP_HOST,
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
    secure: process.env.FTP_SECURE === "true"
  });

  const remoteDir = process.env.FTP_REMOTE_DIR || "/";
  await client.ensureDir(remoteDir);
  await client.clearWorkingDir();
  await client.uploadFromDir(distDir);
  console.log(`Deployed dist/ to ${remoteDir} on ${process.env.FTP_HOST}`);
} catch (error) {
  console.error("FTP deploy failed:", error.message);
  process.exit(1);
} finally {
  client.close();
}
