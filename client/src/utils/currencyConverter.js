// utils/currencyConverter.js

/**
 * Fetches the latest EUR → NGN exchange rate from Frankfurter API (free, no key needed).
 * Falls back to a hardcoded rate if the request fails.
 */

const FALLBACK_RATE = 1650; // update this occasionally as a safety net

let cachedRate = null;
let cacheTimestamp = null;
const CACHE_DURATION_MS = 1000 * 60 * 30; // cache for 30 minutes

export const getEURtoNGNRate = async () => {
  const now = Date.now();

  // Return cached rate if it's still fresh
  if (
    cachedRate &&
    cacheTimestamp &&
    now - cacheTimestamp < CACHE_DURATION_MS
  ) {
    return cachedRate;
  }

  try {
    const response = await fetch(
      "https://api.frankfurter.app/latest?from=EUR&to=NGN",
    );

    if (!response.ok) throw new Error("Failed to fetch exchange rate");

    const data = await response.json();
    const rate = data.rates?.NGN;

    if (!rate) throw new Error("NGN rate not found in response");

    // Cache the result
    cachedRate = rate;
    cacheTimestamp = now;

    return rate;
  } catch (error) {
    console.warn(
      "Exchange rate fetch failed, using fallback rate:",
      error.message,
    );
    return FALLBACK_RATE;
  }
};

/**
 * Converts a EUR amount to NGN.
 * @param {number} amountInEUR
 * @returns {Promise<string>} formatted NGN string e.g. "₦1,234,567.00"
 */
export const convertEURtoNGN = async (amountInEUR) => {
  const numeric = Number(amountInEUR);
  if (amountInEUR === null || amountInEUR === undefined || isNaN(numeric))
    return "₦0.00";

  const rate = await getEURtoNGNRate();
  const amountInNGN = numeric * rate;

  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(amountInNGN);
};
