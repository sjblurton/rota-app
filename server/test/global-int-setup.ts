import dotenv from "dotenv";
import { execa } from "execa";

dotenv.config({ path: ".env.test", quiet: true });

export default async () => {
  await execa("npm", ["run", "db:reset:force"], {
    cwd: process.cwd(),
    stdio: "inherit",
  });

  return async () => {
    await execa("npm", ["run", "db:reset:force"], {
      cwd: process.cwd(),
      stdio: "inherit",
    });
  };
};
