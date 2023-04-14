// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;

/*
Create two functions in the following ways:
1) Create a function that takes in an array of unsigned integers called “arr1” 
that returns the values of “arr1” immediately. Note: You will need to utilize the “memory” data location 
2) Create a function that takes in an array of unsigned integers called “arr2” that returns the values 
of “arr2” immediately but with one difference being that it should avoid copying the values in memory
within the function. 
*/
contract Exercise {

  /* TODO: Function 1: Create a function that takes in an array of unsigned integers 
  called “arr1” that returns the values of “arr1” immediately. 
  Note: You will need to utilize the “memory” data location
  */
  // You may need to modify the below code. Think about 
  function func1(uint[] memory arr1) pure public returns(uint[] memory) {
    //uint[] memory aux = arr1;
    return arr1;
  }

  /* TODO: Create a function that takes in an array of unsigned integers called “arr2” that 
  returns the values of “arr2” immediately but with one difference being that it should 
  avoid copying the values in memory within the function. 
  */
  // You may need to modify the below code 
  function func2(uint[] calldata arr2) pure public returns(uint[] calldata) {
    return arr2;

  }

}