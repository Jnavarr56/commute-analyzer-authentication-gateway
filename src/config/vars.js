import * as dotenv from "dotenv";

dotenv.config();

const {
  NODE_ENV,
  AUTH_DOMAIN: AUTH_DOMAIN_ENV,
  AUTH_AUDIENCE: AUTH_AUDIENCE_ENV,
} = process.env;

if (!AUTH_DOMAIN_ENV || !AUTH_AUDIENCE_ENV) {
  throw new Error("Missing Critical Env Vars");
}

export const IN_DEVELOPMENT = NODE_ENV === "development";
export const IN_PRODUCTION = NODE_ENV === "production";
export const IN_TEST = NODE_ENV === "TEST";

export const AUTH_DOMAIN = AUTH_DOMAIN_ENV;
export const AUTH_AUDIENCE = AUTH_AUDIENCE_ENV;
