# Design Pattern Decisions
 ## Access Control Design Patternss

  The application inherits the OpenZeppelin "Ownable" contract so that the sensitive functions of the application can only be accessed by the Owner of the contract.
  Ownable design pattern used in the function updatePatientInfo().
  
  Only the patient is responsible for update his personal information.

 ## Inheritance and Interfaces 
  HealthRecord contract inherits the OpenZeppelin Ownable contract to enable ownership for one managing user/party.
#