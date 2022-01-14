<h1> Design Pattern Decisions</h1>
  <h2> Access Control Design Patternss</h2>

  The application inherits the OpenZeppelin "Ownable" contract so that the sensitive functions of the application can only be accessed by the Owner of the contract.
  Ownable design pattern used in the function updatePatientInfo().
  
  Only the patient is responsible for update his personal information.

 <h2> Inheritance and Interfaces </h2> 
  HealthRecord contract inherits the OpenZeppelin Ownable contract to enable ownership for one managing user/party.
