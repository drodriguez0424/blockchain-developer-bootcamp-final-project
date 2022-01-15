# blockchain-developer-bootcamp-final-project
Proyecto final blockchain developer 


# Final Project - HEALTH RECORDS

## Deployed version url:

https://healthrecords.netlify.app

## How to run this project locally:

### Prerequisites

- Node.js >= v16.11.1
- Truffle and Ganache


### Setup
- Clone the repository in your local machine and install the dependencies
  
  1. `git clone https://github.com/drodriguez0424/blockchain-developer-bootcamp-final-project.git`
  2. `cd blockchain-developer-bootcamp-final-project/`
  3. `npm install`
  4. `code . `-> Open VCode!
 
### Running the Test Cases
There are some test cases written in javascript. To execute them you must write de command truffle test
 
### Deploy Frontend in the local environment

1. Setup the blockhain network using ganache-cli
   
   `truffle develop` -> It creates the internal blockchain network to perform the testing
   
2. Migrate the contract to the network
   `migrate`

3. Execute the following command:
   
  `npm run dev`

4. Go to http://localhost:3000


The truffe config file is set with this parameters for the development environment:

```
  development: {
      host:"192.168.0.107",
      port: 7542,
      network_id: "*" // Match any network id
    }
```

## Screencast link



## Project description
This project was born with the idea to use decentralized apps in an important field as it is Health Records.
Currently, the dapp allows you to associate doctors from different specializations with your health record. Its pending to implement some parts more related to options for patients to update their personal information, and also, a form which will be used by doctors to register medical reports with symptoms and treatment status.

The application has two types of profiles:

Doctors: People whose information is shown in the Dapp and who could be selected for the patient. Only the doctors selected by the patient could add medical reports.

Patient: A patient is the owner of each contract. He has the possibility of selecting one or more specialists and pay for each selection using their Metamask account and will have the possibility to update his personal information.


## Simple workflow

1.	The patient selects a specialist doing click in the bottom “Add Doctor to health record”.
2.	MetaMask ask him to approve or deny the transaction
3.	If the transaction is accepted, the button will change and show “Added specialist”.
In this way, the patient will be able to add one or more doctors.


## Directory structure

- `contracts`: Smart contracts
- `migrations`: Migration files for deploying contracts in `contracts` directory.
- `test`: Tests for smart contracts.
- `src`: Project's frontend.

## TODO features
- Add the functionality to remove a doctor.
- Develop a page to update personal information (it was doing in the contract)
- Develop a page to add medical reports (it was doing in the contract)
- Improve error and warning messages in the frontEnd.

