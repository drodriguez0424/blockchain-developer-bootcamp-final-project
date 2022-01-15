const health_record = artifacts.require("HealthRecord");

contract("HealthRecord", function (accounts) {

  let healthRecord;
  let expectedDoctor;
  const fullName= "Daniela Rodriguez";
  const weight= "65";
  const bloodType= "O+";
  const contact= "1234654123";
  const [_owner, doctor1, doctor2] = accounts;

  before(async () => {
    healthRecord = await health_record.deployed();
  });

  describe ("assign a doctor and retieving account addresses", async() => {
    before("assign a doctor using accounts[1]", async() => {
      await healthRecord.assigneDoctor(8, {from: doctor1 });
      expectedDoctor = doctor1;
  });

 it("can fetch the collection of all doctors assigned addresses", async() => {
  const doctors = await healthRecord.getAssignedDoctors();
  assert.equal(doctors[8], expectedDoctor, "The doctor should be in the collection") ;
 });


 it("should emit a LogForDoctorAssigned event when a doctor is added", async () => {
  let eventEmitted = false;
  const tx = await healthRecord.assigneDoctor(8, {from: doctor1 });

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

describe("patient Information", () => {
  it("should update Patient Info", async () => {
    await healthRecord.updatePatientInfo( fullName, weight,  bloodType, contact,  { from: _owner });

    const result = await healthRecord.fetchPatient.call();

    assert.equal(
      result[0],
      fullName,
      "the name of the patient does not match the expected value",
    );

    assert.equal(
      result[1],
      weight,
      "the weight of the patient does not match the expected value",
    );

    assert.equal(
      result[2],
      bloodType,
      "the bloodType of the patient does not match the expected value",
    );

    assert.equal(
      result[3],
      contact,
      "the blocontactodType of the patient does not match the expected value",
    );
 
  });

});

});
