import morgan from "morgan";
import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import { IN_DEVELOPMENT, AUTH_DOMAIN, AUTH_AUDIENCE } from "config/vars";

const logging = morgan(IN_DEVELOPMENT ? "dev" : "combined");

const authentication = jwt({
  // Dynamically provide a signing key
  // based on the kid in the header and
  // the signing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    cacheMaxAge: 600000,
    jwksUri: `https://${AUTH_DOMAIN}/.well-known/jwks.json`,
  }),
  // Validate the audience and the issuer.
  audience: AUTH_AUDIENCE,
  issuer: `https://${AUTH_DOMAIN}/`,
  algorithms: ["RS256"],
});

const userMetaData = (req, res, next) => {
  req.headers["x-authenticated-user-id"] = req.user.sub;
  next();
};

const errorFormatting = (error, req, res, next) => {
  if (error.name === "UnauthorizedError") {
    res.sendStatus(401);
  }
};

export default [logging, authentication, userMetaData, errorFormatting];
