const health_record = artifacts.require("HealthRecord");

contract("HealthRecord", function (accounts) {

  let healthRecord;
  let expectedDoctor;

  before(async () => {
    healthRecord = await health_record.deployed();
  });

  describe ("assign a doctor and retieving account addresses", async() => {
    before("assign a doctor using accounts[0]", async() => {
      await healthRecord.assigneDoctor(8, {from: accounts[0] });
      expectedDoctor = accounts[0];
  });

 it("can fetch the collection of all doctors assigned addresses", async() => {
  const doctors = await healthRecord.getAssignedDoctors();
  assert.equal(doctors[8], expectedDoctor, "The doctor should be in the collection") ;
 });


 it("should emit a LogForDoctorAssigned event when a doctor is added", async () => {
  let eventEmitted = false;
  const tx = await healthRecord.assigneDoctor(8, {from: accounts[0] });

  if (tx.logs[0].event == "LogForDoctorAssigned") {
    eventEmitted = true;
  }

  assert.equal(
    eventEmitted,
    true,
    "adding a doctor should emit an event",
  );
  });

});
});
