import { useEffect, useState } from "react";
import "./Main.css";

function Accounts({ web3, setAddress }) {
  const [provider, setProvider] = useState("None");
  const [accounts, setAccounts] = useState(null);
  const [balance, setBalance] = useState(null);
  useEffect(() => {
    async function allAccount() {
      const select = document.querySelector("#selectNumber");
      try {
        const options = await web3.eth.getAccounts();
        setProvider("Ganache");
        for (let i = 0; i < options.length; i++) {
          let opt = options[i];
          const element = document.createElement("option");
          element.textContent = opt;
          element.value = opt;
          select.appendChild(element);
        }
      } catch (error) {
        setProvider("Ganche Not connected");
      }
    }
    web3 && allAccount();
  }, [web3]);

  async function selectAccounts() {
    const selectedAccounts = document.querySelector("#selectNumber").value;
    if (selectedAccounts) {
      setAddress(selectedAccounts);
      const accountBalance = await web3.eth.getBalance(selectedAccounts);
      const bal = web3.utils.fromWei(accountBalance, "ether");
      setAccounts(selectedAccounts);
      setBalance(bal);
    }
  }

  return (
    <>
      <form className="label1" id="myForm">
        <label htmlFor="selectNumber">Select an account</label>
        <select
          className="innerBox"
          id="selectNumber"
          onChange={selectAccounts}
        ></select>
      </form>
      <span className="conAc">Connected Account: {accounts}</span>
      <br></br>
      <span className="acBal">Account Balance: {balance} ETH</span>
      <br></br>
      <span className="provider">Provider : {provider}</span>
    </>
  );
}

export default Accounts;
