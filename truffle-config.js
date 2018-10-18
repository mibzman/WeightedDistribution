require("dotenv").config();

const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  networks: {
    // development: {
    //   host: "localhost",
    //   port: 8545,
    //   network_id: "*" // Match any network id
    // },
    ropsten: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://ropsten.infura.io/v3/${process.env.INFURA_KEY}`,
          0
        ),
      network_id: 3, // Ropsten's id
      gas: 5500000, // Ropsten has a lower block limit than mainnet
      // confirmations: 2, // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200 // # of blocks before a deployment times out  (minimum/default: 50)
      // skipDryRun: true // Skip dry run before migrations? (default: false for public nets )
    }
  }
};
