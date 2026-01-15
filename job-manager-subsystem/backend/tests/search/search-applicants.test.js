const request = require('supertest');
const { API_URL } = require('../setup');

async function runTest() {
  console.log("--- RUNNING TEST: Search - Applicants ---");
  const keyword = "React";

  try {
    console.log("1. Searching for keyword:", keyword);
    const res = await request(API_URL).get(`/search/applicants?q=${keyword}`);

    console.log("Response Status:", res.status);
    console.log(
      "Results Count:",
      Array.isArray(res.body) ? res.body.length : "NOT ARRAY"
    );

    if (res.status === 200 && Array.isArray(res.body)) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "✅ TEST SUCCESS: Search performed correctly"
      );
    } else {
      console.log("\x1b[31m%s\x1b[0m", "❌ TEST FAIL: Search failed");
      process.exit(1);
    }

    console.log("2. Testing non-matching search...");
    const failRes = await request(API_URL).get(
      "/search/applicants?q=XylophoneXYZ-999"
    );

    console.log("Fail Result Status:", failRes.status);
    if (failRes.status === 200 && failRes.body.length === 0) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "✅ TEST SUCCESS: Negative search returned empty"
      );
      process.exit(0);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "❌ TEST FAIL: Should have returned empty array"
      );
      process.exit(1);
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "❌ TEST FAIL: Error during execution");
    console.error(error);
    process.exit(1);
  }
}

runTest();
