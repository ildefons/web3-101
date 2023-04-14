// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/*
Create a modifier function that checks that the address passed in is not the zero address.
*/
contract Exercise {
  address myaddress;
  // TODO: Create a function modifier called "validAddress"
  // Takes in one argument of type address

  function setAddress(address ad) external only0address(ad) {
        myaddress = ad;
    }

  modifier only0address(address ad) {
        require(ad == address(0), "Only 0 address allowed");
        _;
    }

}