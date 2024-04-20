
const cvApi = require('./api/cv');

async function testFunctions() {
  try {
    console.log("Fetching all CVs...");
    const cvs = await cvApi.getAllCVs();
    console.log(cvs);

    console.log("Fetching a single CV by ID...");
    const cv = await cvApi.getCVById(1);  
    console.log(cv);

    console.log("Creating a new CV...");
    const newCV = await cvApi.createCV({
      name: "John Doe CV",
      age: "30",
      job: "Developer",
      userId: 1, 
      skillIds: [1, 2]  
    });
    console.log(newCV);

    console.log("Updating a CV...");
    const updatedCV = await cvApi.updateCV(1, { 
      name: "Updated Name",
      age: "31",
      job: "Senior Developer",
      skillIds: [1]  
    });
    console.log(updatedCV);

    console.log("Deleting a CV...");
    const deletedCV = await cvApi.deleteCV(1); 
    console.log(deletedCV);
  } catch (error) {
    console.error("Error during tests:", error);
  }
}

testFunctions();
