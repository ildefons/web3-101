// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

struct Wallet {
    address addr;
    uint amount;
}

struct CrowdFunding {
  address payable benefiaciary;
  uint numFunders;
  Wallet[] wallets;
}

/*
Define a struct within a struct.
*/
contract Exercise {


  /* Todo: Create a struct called "CrowdFunding" that defines the following variables:
    Field 1: address of type payable called "beneficiary"
    Field 2: unsigned integer called "numFunders"
    Field 3: Array of structs of type "Wallet" called "wallets"
  */

}