const request = require('supertest');
const { API_URL } = require('../setup');

async function runTest() {
  console.log("--- RUNNING TEST: Jobs - Create Job ---");
  const testUser = {
    email: `job-c-${Date.now()}@example.com`,
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

    const jobData = {
      title: "Senior Node.js Architect",
      description: "Building high-scale standalone systems",
      requirements: "Node.js Expert, Systems Design",
      salaryRange: "$5000 - $8000",
      skills: ["Node.js", "System Architecture"],
      companyId: companyId,
    };

    console.log("2. Creating job...");
    const res = await agent.post("/jobs/jobs").send(jobData);

    console.log("Response Status:", res.status);
    console.log("Response Body:", JSON.stringify(res.body, null, 2));

    if (res.status === 201 && res.body.title === jobData.title) {
      console.log(
        "\x1b[32m%s\x1b[0m",
        "✅ TEST SUCCESS: Job created successfully"
      );
      process.exit(0);
    } else {
      console.log(
        "\x1b[31m%s\x1b[0m",
        "❌ TEST FAIL: Title mismatch or creation failed"
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
