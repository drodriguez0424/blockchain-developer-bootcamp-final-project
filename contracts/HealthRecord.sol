pragma solidity ^0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";

contract HealthRecord is Ownable{

  address[10] public assignedDoctors;
  address ownerAddres;

  uint reportsCount;
 
  enum TreatmentStatus{Started, InProcess, Finished}

  struct Patient {
	  address patientID;
	  string fullName;
	  uint256 weight;
	  string bloodType;
	  string contact;
  }

  Patient patient;

  struct DoctorsReport{
	  address doctor;
	  uint timestamp;
	  TreatmentStatus treatmentStatus;
	  string treatment;
	  string medication;
  }

   /* 
   * Events
   */
   event LogForDoctorAssigned(address doctorAddress);
   event LogForupdatePatientInfo(Patient patient);

   mapping (uint => DoctorsReport) public doctorReports;

   constructor() {
    ownerAddres = msg.sender;
	reportsCount= 0;
    }

  
	function assigneDoctor(uint _doctorID) public returns (uint) {
  	require(_doctorID >= 0 && _doctorID <= 19);
  	assignedDoctors[_doctorID] = msg.sender;
	emit LogForDoctorAssigned(msg.sender);
  	return _doctorID;
	}

  
    function getAssignedDoctors() public view returns (address[10] memory) {
    return assignedDoctors;
    }

	function updatePatientInfo(string memory _fullName, uint256 _weight,  string memory _bloodType, string memory _contact) public onlyOwner returns (bool) {

		patient= Patient({
		  patientID: msg.sender,
		  fullName: _fullName,
		  weight: _weight,
		  bloodType: _bloodType,
		  contact: _contact
	   });
	   
	   emit LogForupdatePatientInfo(patient);
	   return true;
	 }

	 

	 function addDoctorReport(string memory _treatment, string memory _medication) public{

		doctorReports[reportsCount] = DoctorsReport({
			doctor: msg.sender,
			timestamp: block.timestamp,
			treatmentStatus: TreatmentStatus.Started,
			treatment: _treatment,
			medication: _medication
		});
		reportsCount+= 1;
	 }

	 function removeAsigneedDoctor(uint _doctorID) public{
		// TODO:
	}

	function updateDoctorReport(uint _reportsCount) public{
		// TODO:
	}




}

