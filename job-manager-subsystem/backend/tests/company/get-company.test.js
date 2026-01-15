const request = require('supertest');
const { API_URL } = require('../setup');

async function runTest() {
  console.log("--- RUNNING TEST: Company - Get Profile ---");
  const testUser = {
    email: `company-get-${Date.now()}@example.com`,
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

    console.log("2. Fetching company profile for IDs:", companyId);
    const res = await agent.get(`/companies/${companyId}`);

    console.log("Response Status:", res.status);
    console.log("Response Body:", JSON.stringify(res.body, null, 2));

    if (
      res.status === 200 &&
      (res.body.companyId === companyId || res.body.id === companyId)
    ) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "[SUCCESS]: Profile retrieved correctly"
      );
      process.exit(0);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "[FAIL]: Profile mismatch or fetch failed"
      );
      process.exit(1);
    }
  } catch (error) {
    console.error("\x1b[31m%s\x1b[0m", "[FAIL]: Error during execution");
    console.error(error);
    process.exit(1);
  }
}

runTest();
