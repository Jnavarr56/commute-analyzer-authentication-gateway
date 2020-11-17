// import cors from "cors";
import express from "express";
import gateway from "fast-gateway";
import middlewares from "middlewares";
import routes from "services";

const PORT = process.env.PORT || 3000;

const server = express();

gateway({
  server,
  middlewares,
  routes,
}).listen(PORT, () => {
  console.log(`Authentication service listening on port: ${PORT}!`);
});
