const request = require('supertest');
const { API_URL } = require('../setup');

async function runTest() {
  console.log("--- RUNNING TEST: Jobs - List Jobs ---");

  // Using a known seeded email or creating a new one
  const testUser = {
    email: `job-list-${Date.now()}@example.com`,
    password: "Password123!",
    role: "company",
    country: "Vietnam",
  };

  const agent = request.agent(API_URL);

  try {
    console.log("1. Registering/Logging in to get companyId...");
    await agent.post("/auth/signup").send(testUser);
    const loginRes = await agent.post("/auth/signin").send({
      email: testUser.email,
      password: testUser.password,
    });

    const companyId = loginRes.body.user._id || loginRes.body.user.id;
    console.log("Company ID:", companyId);

    console.log("2. Posting a test job...");
    await agent.post("/jobs/jobs").send({
      title: "List Test Job",
      description: "Test job for listing",
      requirements: "None",
      salaryRange: "Negotiable",
      skills: ["Test"],
      companyId: companyId,
    });

    console.log("3. Requesting job list...");
    const res = await agent.get(`/jobs/jobs/company/${companyId}`);

    console.log("Response Status:", res.status);
    console.log("Items Count:", res.body.length);
    if (res.body.length > 0) {
      console.log("First Item Snippet:", JSON.stringify(res.body[0], null, 2));
    }

    if (res.status === 200 && Array.isArray(res.body) && res.body.length > 0) {
      console.log("\x1b[32m%s\x1b[0m", "[SUCCESS]: Jobs listed successfully");
      process.exit(0);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "[FAIL]: Unexpected response or empty list"
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
