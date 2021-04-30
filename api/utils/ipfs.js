// const IPFS = require('ipfs-http-client');
const IPFS = require('ipfs-api');

const ipfs = new IPFS({
	host: process.env.IPFS_PROVIDER,
	port: 5001,
	protocol: 'https',
	apiPath: '/api/v0',
});
module.exports = ipfs;
