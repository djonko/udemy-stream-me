import { connect } from "mongoose";
import "process";
import "reflect-metadata";
import "server/env";

export default async function createSession() {
  const MONGO_URL = process.env.MONGO_URL || "";

  if (!MONGO_URL) {
    throw new Error("Missing Mongo_url");
  }

  await connect(MONGO_URL);
}
