// Configuration loader that validates required environment variables.
// In development it will load a local .env file.

function loadDotenvIfDev() {
  try {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line @typescript-eslint/no-var-requires
      require("dotenv").config();
    }
  } catch (e) {
    // ignore if dotenv is not installed; environment may already be provided by Next.js
  }
}

loadDotenvIfDev();

function buildAuth() {
  if (process.env.ECARUP_AUTH) return process.env.ECARUP_AUTH;

  const user = process.env.ECARUP_USERNAME;
  const pw = process.env.ECARUP_PASSWORD;
  if (user && pw) {
    const encoded = Buffer.from(`${user}:${pw}`).toString("base64");
    return `Basic ${encoded}`;
  }

  return null;
}

function getConfig() {
  const dataUrl = process.env.DATA_URL;
  const auth = buildAuth();
  const price =
    process.env.KWH_PRICE || process.env.NEXT_PUBLIC_KWH_PRICE || null;

  const missing = [];
  if (!dataUrl) missing.push("DATA_URL");
  if (!auth) missing.push("ECARUP_AUTH or (ECARUP_USERNAME + ECARUP_PASSWORD)");

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variables: ${missing.join(", ")}`
    );
  }

  return {
    DATA_URL: dataUrl,
    AUTH: auth,
    PRICE: price,
  };
}

module.exports = { getConfig, buildAuth };
