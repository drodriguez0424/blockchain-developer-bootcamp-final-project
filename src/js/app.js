App = {
  web3Provider: null,
  contracts: {},

  init: async function() {
    // Load doctors.
    $.getJSON('../healthRecords.json', function(data) {
      var healthRecordsRow = $('#healthRecordsRow');
      var healthRecordsTemplate = $('#healthRecordsTemplate');

      for (i = 0; i < data.length; i ++) {
        healthRecordsTemplate.find('.panel-title').text(data[i].name);
        healthRecordsTemplate.find('.healthRecords-medicalSpeciality').text(data[i].medicalSpecialty);
        healthRecordsTemplate.find('.btn-healthRecord').attr('data-id', data[i].id);

        healthRecordsRow.append(healthRecordsTemplate.html());
      }
    });

    return await App.initWeb3();
  },

  initWeb3: async function() {
    // Modern dapp browsers...
    if (window.ethereum) {
      App.web3Provider = window.ethereum;
      try {
        // Request account access
        await window.ethereum.request({ method: "eth_requestAccounts" });;
      } catch (error) {
        // User denied account access...
        console.error("User denied account access")
      }
    }
    // Legacy dapp browsers...
    else if (window.web3) {
      App.web3Provider = window.web3.currentProvider;
    }
    // If no injected web3 instance is detected, fall back to Ganache
    else {
      App.web3Provider = new Web3.providers.HttpProvider('http://localhost:7545');
    }
    web3 = new Web3(App.web3Provider);

        return App.initContract();
      },

  initContract: function() {
    $.getJSON('HealthRecord.json', function(data) {
      // Get the necessary contract artifact file and instantiate it with @truffle/contract
      var HealthRecordArtifact = data;
      App.contracts.HealthRecord = TruffleContract(HealthRecordArtifact);
    
      // Set the provider for our contract
      App.contracts.HealthRecord.setProvider(App.web3Provider);
    
      // Use our contract to retrieve and mark the assign specialist
      return App.addSpecialist();
    });

    return App.bindEvents();
  },

  bindEvents: function() {
    $(document).on('click', '.btn-healthRecord', App.handleAdd);
  },

  addSpecialist: function() {
    var healthRecordInstance;

App.contracts.HealthRecord.deployed().then(function(instance) {
  healthRecordInstance = instance;

  return healthRecordInstance.getAssignedDoctors.call();
}).then(function(assignedDoctors) {
  for (i = 0; i < assignedDoctors.length; i++) {
    if (assignedDoctors[i] !== '0x0000000000000000000000000000000000000000') {
      $('.panel-doctor').eq(i).find('button').text('Added Specialist').attr('disabled', true);
    }
  }
}).catch(function(err) {
  console.log(err.message);
});
  },

  handleAdd: function(event) {
    event.preventDefault();

    var doctorID = parseInt($(event.target).data('id'));

    var hrInstance;

web3.eth.getAccounts(function(error, accounts) {
  if (error) {
    console.log(error);
  }

  var account = accounts[0];

  App.contracts.HealthRecord.deployed().then(function(instance) {
    hrInstance = instance;

    // Execute add as a transaction by sending account
    return hrInstance.assigneDoctor(doctorID, {from: account});
  }).then(function(result) {
    return App.addSpecialist();
  }).catch(function(err) {
    console.log(err.message);
  });
});
  }

};

$(function() {
  $(window).load(function() {
    App.init();
  });
});
