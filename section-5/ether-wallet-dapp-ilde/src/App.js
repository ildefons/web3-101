import Button from 'react-bootstrap/Button'
import { useState } from 'react';
import { ethers } from 'ethers';

import './App.css';

function App() {
  const [account, setAccount] = useState('')
  const [balance, setBalance] = useState(0)
  const [isActive, setIsActive] = useState(false)
  const [shouldDisable, setShoulldDisable] = useState(false) // should disable connect button while connecting to Metamask

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
          </>
        )
      }
      </header>
    </div>
  );
}

export default App;
