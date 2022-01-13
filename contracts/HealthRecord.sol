pragma solidity ^0.8.0;

contract HealthRecord {

  address[90] public assignedDoctors;

	function assigneDoctor(uint _doctorID) public returns (uint) {
  	 require(_doctorID >= 0 && _doctorID <= 89);
  	assignedDoctors[_doctorID] = msg.sender;
  	return _doctorID;
	}

  
    function getAssignedDoctors() public view returns (address[90] memory) {
    return assignedDoctors;
    }


}

