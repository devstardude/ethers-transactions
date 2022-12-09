import BoxDiv from "../BoxDiv";
import { useState } from "react";
import { ethers } from "ethers";
import erc20abi from "../../utils/ABI.json";

declare let window: any;

interface WriteContract {
  account: string | null;
  contract: string;
}

const WriteContract = ({ account, contract }: WriteContract) => {
  const [address, setAddress] = useState("");
  const [amount, setAmount] = useState("");

  const handleTransfer = async () => {
    if (account && contract !== "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = await provider.getSigner();
      const erc20 = new ethers.Contract(contract, erc20abi, signer);
      await erc20.transfer(address, amount);
      return;
    }
    if (!account) alert("Please connect wallet");
    if (contract === "") alert("Please enter wallet address");
  };
  return (
    <BoxDiv>
      <h2 className="text-center text-[24px] font-bold pb-[1rem]">
        Write to Contract
      </h2>
      <label>Enter Recipient address</label>
      <input
        name="contractAddress"
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />{" "}
      <label>Enter amount to transfer</label>
      <input
        name="contractAddress"
        value={amount}
        onChange={(e) => {
          setAmount(e.target.value);
        }}
      />
      <button onClick={handleTransfer} className="mt-4">
        Send
      </button>
    </BoxDiv>
  );
};

export default WriteContract;
