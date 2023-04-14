import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/form'
import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import EtherWallet from "./artifacts/contracts/EtherWallet.sol/EtherWallet.json"

import './App.css';
import { getContractAddress } from 'ethers/lib/utils';
import { FormGroup } from 'react-bootstrap';

function App() {
  const etherWalletAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512"

  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShoulldDisable] = useState(false) // should disable connect button while connecting to Metamask

  // EtherWallet Smart contract handling
  const [scBalance, setSetBalance] = useState(0)
  const [ethToUseForDeposit, setEthToUseForDeposit] = useState(0)

  useEffect(() => {
    // Get balance of smart contract
    async function getEtherWalletBalance() {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        const contract = new ethers.Contract(
          etherWalletAddress,
          EtherWallet.abi,
          provider
        )
        let balance = await contract.balanceOf()
        balance = ethers.utils.formatEther(balance)
        console.log("SC balance: ", balance)
        setSetBalance(balance)
      } catch(err) {
        console.log("Error while connecting to EtherWallet smart contract:", err)
      }
    }
    getEtherWalletBalance()
  }, [])
  //

  // Connect to Metamask wallet
  const connectToMetamask = async() => {
    console.log("Connecting to Metamask...")
    setShoulldDisable(true)
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      await provider.send('eth_requestAccounts', [])

      const signer = provider.getSigner()
      const account = await signer.getAddress()
      let balance = await signer.getBalance()

      balance = ethers.utils.formatEther(balance)
      console.log("account: ",account)
      console.log("balance: ",balance)
      setAccount(account)
      setBalance(balance)
      setIsActive(true)
      setShoulldDisable(false)    
    } catch(error) {
      console.log('Error on connecting: ', error)
    }
  }

  const disconnectFromMetamask = async() => {
    console.log("disconnecting wallet from App...")
    try {
      setAccount('')
      setBalance(0)
      setIsActive(false)
    } catch(error) {
      console.log("Error on disconnect: ", error)
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        {!isActive ? (
          <>
            <Button variant="secondary" onClick={connectToMetamask} disabled={shouldDisable}>
            <img src="images/metamask.svg" alt="metamask" width="50" height="50" />Connect to Metamask          
            </Button>
          </>
        ) : (
          <>
            <Button variant="danger" onClick={disconnectFromMetamask}>
            Disconnect Metamask{' '}     
            <img src="images/noun_waving_3666509.svg" alt="disconnect" width="50" height="50" />
            </Button>
            <div className="mt-2 mb-2">Connected Account: {account}</div>
            <div className="mt-2 mb-2">Balance: {balance}</div>
            <Form>
              <FormGroup className='mb-3' controlId="numberInEth">
                <Form.Control
                  type="text"
                  placeholder="Enter the amount in ETH"
                  onChange={(e) => setEthToUseForDeposit(e.target.value)}
                  />
                <Button variant="primary" onClick={depositToEtherWalletContract}>
                  Deposit to EtherWallet Smart Contract
                </Button>
              </FormGroup>
            </Form>
          </>
        )}
        <div> EtherWallet smart Contract Address: {etherWalletAddress}</div>
        <div> EtherWallet smart Contract Balance: {scBalance}</div>
      </header>
    </div>
  );
}

export default App;
