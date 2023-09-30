import "./Main.css";
import { useState } from "react";

function SendEther({ web3, accounts }) {
  const [toggle, setToggle] = useState(false);
  const [receipt, setReciept] = useState({});

  function sendEther(e) {
    e.preventDefault();
    const _to = document.querySelector("#to").value;
    const _value = document.querySelector("#value").value;
    const valueinEth = web3.utils.toWei(_value, "ether");

    web3.eth
      .sendTransaction({
        from: accounts,
        to: _to,
        value: valueinEth,
      })
      .then(function (receipt) {
        setReciept(receipt);
        setToggle(true);
      });
  }
  return (
    <>
      <form className="box" onSubmit={sendEther}>
        <p className="label">
          <label htmlFor="">Enter Receiver's Address</label>
          <input className="receiver" type="text" id="to"></input>
        </p>

        <p className="label">
          <label htmlFor="">Enter Amount to Send (Ether)</label>
          <input className="receiver" type="text" id="value"></input>
        </p>
        <button className="btn" type="submit">
          Send
        </button>
      </form>
      <div className="box">
        <pre className="json">
          <h3>(Json Response)</h3>
          <code>
            {toggle &&
              JSON.stringify(receipt, [
                "transactionHash",
                "blockHash",
                "blockNumber",
              ])}
          </code>
        </pre>
      </div>
    </>
  );
}

export default SendEther;
