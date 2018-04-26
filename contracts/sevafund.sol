pragma solidity ^0.4.17;

contract Sevafund {
 //the address of the contract creator
        address public charity;
        address beneficiary;
        address[] public donors;
        uint public goal;
        uint public amount;
        
        
        
        constructor (address _payTo, uint _target) public {
            charity = msg.sender;
            beneficiary = _payTo;
            goal = _target * 1 ether;
        }
        
        function fundIt() public payable {
            require(msg.value > .01 ether);
            address addr = this;
            donors.push(msg.sender);
            amount = addr.balance;
            // bank += msg.value; 
        }
        
        function sendTo() public restricted {
            
            address myaddress = this;
            require(goal <= myaddress.balance);
            beneficiary.transfer(myaddress.balance);
        }
        
        //modifier adds some admin access
        modifier restricted() {
            require(msg.sender == charity);
            _;
        }
       
        function getDonors() public view returns (address[]) {
           return donors;
        }
        
        
    
}