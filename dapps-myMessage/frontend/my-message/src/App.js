import logo from './logo.svg';
import './App.css';

const contractABI = require("./abi.json");
const { ethers } = require("ethers");


function App() {

  const contractAddress = '0xe0f3BB7588D69b440DeaDDF72424023Af77283d2'


  async function requestAccount() {
    await window.ethereum.request({ method: 'eth_requestAccounts' });
  }

  async function sendMessage() {
    const newMessage = document.getElementById("newMessage").value;

    if (typeof window.ethereum !== 'undefined') {    
      await requestAccount(); 
        
      const provider = new ethers.BrowserProvider(window.ethereum);    
      const signer = await provider.getSigner();    
      const contract = new ethers.Contract(contractAddress, contractABI, signer);    
  
      try {    
        const transaction = await contract.setMessage(newMessage);    
        await transaction.wait();    
        console.log('Message Sent');
  
      } catch (err) {    
        console.error('Error:', err);    
      }
  
    }
  
  }

  async function receiveMessage() {
    if (typeof window.ethereum !== 'undefined') {    
      await requestAccount(); 
        
      const provider = new ethers.BrowserProvider(window.ethereum);    
      const signer = await provider.getSigner();    
      const contract = new ethers.Contract(contractAddress, contractABI, signer);    
  
      try {    
        const transaction = await contract.getMessage();    
        await transaction.wait();    
        console.log('Message Recieved');
  
      } catch (err) {    
        console.error('Error:', err);    
      }
  
    }
  
  }

  


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={sendMessage}>Send Message</button>
        <input id="newMessage" placeholder="Enter Message"></input>
        <button onClick={receiveMessage}>View Message</button>
      </header>
    </div>
  );
}

export default App;
