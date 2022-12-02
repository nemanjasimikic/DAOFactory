pragma ever-solidity >= 0.59.0;

pragma AbiHeader expire;
pragma AbiHeader pubkey;

import "./DaoRoot.sol";
import "./Structures/ProposalConfigurationStructure.sol";

contract DaoFactory {

    uint32 public randomNonce =0;
    uint32 public static _nonce;
    mapping(uint32=>address[]) public deployedAccounts;
    address daoRoot;
    constructor(TvmCell newCode) public {
        require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), 1001);
        tvm.accept();
        tvm.setcode(newCode);
    }

    function deploy(TvmCell platformCode_, ProposalConfigurationStructure.ProposalConfiguration proposalConfiguration_) external returns(address) {
        tvm.accept();
	//randomNonce = _nonce;
        daoRoot = new DaoRoot {
            code: platformCode_,
            value: 1 ever,
            pubkey: 0,
            varInit: {
            	_nonce: randomNonce
            }
        }(platformCode_, proposalConfiguration_, address(this));
        deployedAccounts[randomNonce].push(daoRoot);
        ++randomNonce;
        
        return daoRoot;
    }

	function getDeployedDAOs() public view returns(mapping(uint32=>address[]) daoAddr)
	{
		return deployedAccounts;
	}


    function withdrawGas(address gasTo) external onlyOwner {
        tvm.accept();
        gasTo.transfer({value: 0, flag: 128});
    }

    modifier onlyOwner {
        require(tvm.pubkey() != 0 && tvm.pubkey() == msg.pubkey(), 1001, "Only the owner can operate!");
        tvm.accept();
        _;
    }




}
