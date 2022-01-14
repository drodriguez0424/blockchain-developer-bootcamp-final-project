module.exports = {
  networks: {
    development: {
      host:"192.168.0.107",
      port: 7546,
      network_id: "*" // Match any network id
    }
  },
  develop: {
    port: 8545
  },
  compilers: {
    solc: {
      version: "^0.8.0"
    }
  }
};