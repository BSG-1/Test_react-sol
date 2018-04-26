import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Web3 from 'web3';
import config from './config';

class App extends Component {
  render() {
    const web3 = new Web3('http://localhost:8545');

    const mycontract = new web3.eth.Contract(config.contractAbi, config.contractAddress, {
      from: '0x042ce78410c4038220f53152e3f2627d4c0e66c7',
      gasPrice: '200000000000'
    })
    console.log(mycontract);
    console.log('-----------------------------------------------------------------------------------------')




    // get test accounts 


    const getaccounts = async () => {
      const accounts = await web3.eth.getAccounts()
      return console.log(accounts);
    }


    console.log('-----------------------------------------------------------------------------------------')
    // get contract balance
    const bal = async () => {
      const b = await web3.eth.getBalance(config.contractAddress)
      console.log('Seva Balance in wei: ', b);
    }

    // get donors from contract

    const donors = async () => {
      const donor = await mycontract.methods.getDonors().call()
      console.log('donors babe :', donor);
    }



    const $fundIt = async () => {
      var val = web3.utils.toWei('1', 'ether');
      const fundit = await mycontract.methods.fundIt().send({
        from: '0x042ce78410c4038220f53152e3f2627d4c0e66c7',
        value: val,
        gas: 2000000,

      }, (err, res) => {
        if (!err) {
          console.log('Success', res);
        }
        console.log(err);
      })

    }

    const target = async () => {
      const tar = await mycontract.methods.goal().call();
      return console.log('target amount ', tar);
    }




    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to SevaFund Contract</h1>
        </header>
        <div>
          <button onClick={$fundIt}> FundIt</button>
          <button onClick={getaccounts}>Accounts</button>
          <button onClick={bal}> Balance</button>
          <button onClick={donors}> Donors</button>
          <button onClick={target}> Project goal</button>
        </div>
      </div>
    );
  }
}

export default App;
