import next from "next";

// create our application as module
const nextApp = next({
  dev: process.env.NODE_ENV !== "production",
  dir: __dirname,
});

export default nextApp;
