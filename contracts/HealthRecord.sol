// SPDX-License-Identifier: MIT
pragma solidity 0.8.0;

import "@openzeppelin/contracts/access/Ownable.sol";


/// @title Contract for healthRecord app
/// @author Daniela Rodríguez
/// @notice Allows a user to select different medical specialists, save personal patient's personal information and update medical reports


contract HealthRecord is Ownable{

  // List of addresses of the doctors available in the app 
  address[10] public assignedDoctors;

  // Address of the patient 
  address public ownerAddres;

  // Used as a counter of medical reports
   uint public reportsCount;
 
   // <enum TreatmentStatus: Started, InProcess, Finished>
    // 0 = Started    - The patient was diagnosed and is going to start the treatment recommended
    // 1 = InProcess  - The patient is in treatment
    // 2 = Finished   - The patient finished the medical treatment. 
   enum TreatmentStatus{Started, InProcess, Finished}

   /// Patient Information
  struct Patient {
	  address patientID;
	  string fullName;
	  uint256 weight;
	  string bloodType;
	  string contact;
  }

  /// Doctor Report Information
   struct DoctorsReport{
	  address doctor;
	  uint timestamp;
	  TreatmentStatus treatmentStatus;
	  string treatment;
	  string medication;
  }

  // Patient owner of the Health Record
  Patient private patient;

   /* 
   * Events
   */
   /// @notice Emitted when a doctor is assigned 
   /// @param doctorAddress Doctor assigned address
   event LogForDoctorAssigned(address doctorAddress);

   /// @notice Emitted when a patient update his personal information 
   /// @param patient Patient which information is updated
   event LogForupdatePatientInfo(Patient patient);

   mapping (uint => DoctorsReport) public doctorReports;

   /// @notice HealthRecord constructor called at deploy time
   constructor() {
    ownerAddres = msg.sender;
	reportsCount= 0;
    }

  
	/// @notice Returns de doctorID assigned in the App
    /// @param _doctorID doctorAssigned in the app
    /// @dev updates the assigned doctor list with the doctorAddress
	function assigneDoctor(uint _doctorID) public returns (uint) {
  	require(_doctorID >= 0 && _doctorID <= 19);
  	assignedDoctors[_doctorID] = msg.sender;
	emit LogForDoctorAssigned(msg.sender);
  	return _doctorID;
	}

    /// @notice Returns de assigned doctor for a patient
    function getAssignedDoctors() public view returns (address[10] memory) {
    return assignedDoctors;
    }

	/// @notice Update patient information
    /// @param _fullName Patient's name
	/// @param _weight   Patient's weight
	/// @param _bloodType Patient's _bloodType
	/// @param _contact   Patient's contactNumber
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

	 
	 /// @notice Add a doctor report with a tratment state.
	 /// @param _treatment    Patient's name
	 /// @param _medication   Patient's weight
	 function addDoctorReport(string memory _treatment, string memory _medication )  public{

		doctorReports[reportsCount] = DoctorsReport({
			doctor: msg.sender,
			timestamp: block.timestamp,
			treatmentStatus: TreatmentStatus.Started,
			treatment: _treatment,
			medication: _medication
		});
		reportsCount+= 1;
	 }

	 /// @notice Return patient information
	 function fetchPatient() public view 
     returns (string memory fullName, uint256 weight,  string memory bloodType, string memory contact)
  { 
    fullName = patient.fullName; 
    weight = patient.weight; 
    bloodType = patient.bloodType; 
    contact = patient.contact; 
    return (fullName, weight, bloodType, contact); 
   } 

    /// @notice Return a a doctor report
	 function fetchReport(uint reportNumber) public view 
     returns (address doctor, string memory treatment, string memory medication,  uint state)
  { 
	doctor= doctorReports[reportNumber].doctor;
    treatment= doctorReports[reportNumber].treatment;
	medication= doctorReports[reportNumber].medication;
	state= uint(doctorReports[reportNumber].treatmentStatus);
    return (doctor, treatment, medication, state); 
   } 

	 function removeAsigneedDoctor(uint _doctorID) public{
		// TODO:
	}

	function updateDoctorReport(uint _reportsCount) public{
		// TODO:
	}




}

