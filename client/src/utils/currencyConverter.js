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

  // add a short timeout so the UI doesn't hang waiting for the remote API
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 8000); // 8s timeout

  try {
    const response = await fetch(
      "https://api.frankfurter.app/latest?from=EUR&to=NGN",
      { signal: controller.signal },
    );

    if (!response.ok) {
      let body = "<unavailable>";
      try {
        body = await response.text();
      } catch (e) {}
      console.warn(
        "Exchange rate fetch failed (non-OK response):",
        response.status,
        response.statusText,
        body,
      );
      throw new Error(`HTTP ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    const rate = data.rates?.NGN;

    if (!rate) {
      console.warn("Exchange rate fetch returned unexpected data:", data);
      throw new Error("NGN rate not found in response");
    }

    // Cache the result
    cachedRate = rate;
    cacheTimestamp = now;

    return rate;
  } catch (error) {
    if (error.name === "AbortError") {
      console.warn(
        "Exchange rate fetch aborted (timeout). Using fallback rate.",
      );
    } else {
      console.warn("Exchange rate fetch failed, using fallback rate:", error);
    }
    return FALLBACK_RATE;
  } finally {
    clearTimeout(timeoutId);
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
