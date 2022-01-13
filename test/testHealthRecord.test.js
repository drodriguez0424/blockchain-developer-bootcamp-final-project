const emptyAddress = "0x0000000000000000000000000000000000000000";
const BN = web3.utils.BN;
const HealthRecord = artifacts.require("HealthRecord");

//
// Helper function to check error reasons
//
function checkErrorType(data, error, reason) {
  for (var n in data) {
    if (n.startsWith('0x')) {
      var errorInfo = data[n];
      assert.equal(error, errorInfo.error);
      assert.equal(reason, errorInfo.reason);
      return;
    }
  }
}

//
// Helper function to check error messages
//
async function verifyFail(fn, errorMsg) {
  try {
    await fn();
    assert.fail("Must fail");
  }
  catch (error) {
    checkErrorType(error.data, 'revert', errorMsg);
  }
}


// 
// Test main contract
//


contract("HealthRecord", (accounts) => {
 let healthRecord;
  let expectedDoctorAddress;

});