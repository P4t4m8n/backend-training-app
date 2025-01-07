import { encryptToken } from "../src/api/auth/auth.service";
import dotenv from "dotenv";

dotenv.config();
async function seed() {
  const token =
    "c5cebdb1e0133cb3fab84e9ac97b5af0b8da843fcf0d4df87e04b39048ef8d94";
  const x = encryptToken(token);
}

seed().then(() => {
  console.info("Seed complete");
  process.exit(0);
});
