const request = require('supertest');
const { API_URL } = require('../setup');

async function runTest() {
  console.log("--- RUNNING TEST: Auth - Signin ---");
  const testUser = {
    email: `signin-${Date.now()}@example.com`,
    password: "Password123!",
    role: "company",
    country: "Vietnam",
  };

  try {
    console.log("1. Registering test user...");
    await request(API_URL).post("/auth/signup").send(testUser);

    console.log("2. Attempting signin...");
    const res = await request(API_URL).post("/auth/signin").send({
      email: testUser.email,
      password: testUser.password,
    });

    console.log("Response Status:", res.status);
    console.log("Response Body:", JSON.stringify(res.body, null, 2));

    if (res.status === 200 && res.body.user.email === testUser.email) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "✅ TEST SUCCESS: Authentication passed"
      );
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "❌ TEST FAIL: Signin failed with valid credentials"
      );
      process.exit(1);
    }

    console.log("3. Testing invalid password...");
    const failRes = await request(API_URL).post("/auth/signin").send({
      email: testUser.email,
      password: "wrong-password",
    });

    console.log("Fail Response Status:", failRes.status);
    if (failRes.status === 400) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "✅ TEST SUCCESS: Brute-force/Invalid guard working"
      );
      process.exit(0);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "❌ TEST FAIL: Should have failed with 400"
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
