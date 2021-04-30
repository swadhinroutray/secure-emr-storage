var SimpleStorage = artifacts.require('./SimpleStorage.sol');
var Records = artifacts.require('./Records.sol');
module.exports = function (deployer) {
	deployer.deploy(SimpleStorage);
	deployer.deploy(Records);
};
