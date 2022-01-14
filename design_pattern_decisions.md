Design patterns used
Access Control Design Patterns

The application inherits the OpenZeppelin "Ownable" contract so that the sensitive functions of the application can only be accessed by the Owner of the contract.

Ownable design pattern used in the function updatePatientInfo().
only the patient is responsible for update his personal information.


Inheritance and Interfaces
HealthRecord contract inherits the OpenZeppelin Ownable contract to enable ownership for one managing user/party.