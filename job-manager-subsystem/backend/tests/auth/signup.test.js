const request = require('supertest');
const { API_URL } = require('../setup');

async function runTest() {
  console.log("--- RUNNING TEST: Auth - Signup ---");
  const testUser = {
    email: `test-${Date.now()}@example.com`,
    password: "Password123!",
    role: "company",
    country: "Vietnam",
    address: "123 Test St",
    city: "Test City",
    companyName: "Test Company",
  };

  try {
    const res = await request(API_URL).post("/auth/signup").send(testUser);

    console.log("Response Status:", res.status);
    console.log("Response Body:", JSON.stringify(res.body, null, 2));

    if (res.status === 201 && res.body.user.email === testUser.email) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "✅ TEST SUCCESS: User registered successfully"
      );
      process.exit(0);
    } else {
      console.log("\x1b[31m%s\x1b[0m", "❌ TEST FAIL: Unexpected response");
      process.exit(1);
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "❌ TEST FAIL: Error during request");
    console.error(error);
    process.exit(1);
  }
}

runTest();
