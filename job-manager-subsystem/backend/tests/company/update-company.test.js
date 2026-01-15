const request = require('supertest');
const { API_URL } = require('../setup');

async function runTest() {
  console.log("--- RUNNING TEST: Company - Update Profile ---");
  const testUser = {
    email: `company-upd-${Date.now()}@example.com`,
    password: "Password123!",
    role: "company",
    country: "Vietnam",
  };

  const agent = request.agent(API_URL);

  try {
    console.log("1. Authenticating...");
    await agent.post("/auth/signup").send(testUser);
    const loginRes = await agent.post("/auth/signin").send({
      email: testUser.email,
      password: testUser.password,
    });
    const companyId = loginRes.body.user._id || loginRes.body.user.id;

    const updateData = {
      name: "Refactored Tech Corp",
      country: "Vietnam",
      city: "Ho Chi Minh",
      address: "District 1",
    };

    console.log("2. Updating profile...");
    const res = await agent.put(`/companies/${companyId}`).send(updateData);

    console.log("Response Status:", res.status);
    console.log("Response Body:", JSON.stringify(res.body, null, 2));

    if (res.status === 200 && res.body.name === updateData.name) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "✅ TEST SUCCESS: Profile updated correctly"
      );
      process.exit(0);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "❌ TEST FAIL: Name mismatch or update failed"
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
