pragma solidity 0.5.16;

contract Records {
	struct Record {
		string recordNum;
		string IPFShash;
	}

	Record[] public records;

	function createRecord(string memory _recordNum, string memory _IPFShash)
		public
	{
		records.push(Record({recordNum: _recordNum, IPFShash: _IPFShash}));
	}

	function getRecord(string memory _recordNum)
		public
		view
		returns (string memory, string memory)
	{
		for (uint256 i = 0; i < records.length; i++) {
			if (
				keccak256(bytes(records[i].recordNum)) ==
				keccak256(bytes(_recordNum))
			) {
				return (records[i].recordNum, records[i].IPFShash);
			}
		}
	}
}
