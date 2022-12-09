import { useState } from "react";
import BoxDiv from "../BoxDiv";
import { ethers } from "ethers";
import erc20abi from "../../utils/ABI.json";
import GetTokenInfo from "./GetTokenInfo";
import GetBalance from "./GetBalance";

declare let window: any;
interface ReadContract {
  setContract: (contract: string) => void;
  contract: string;
}

const ReadContract = ({ contract, setContract }: ReadContract) => {
  const [contractInfo, setContractInfo] = useState({
    name: "-",
    symbol: "-",
    totalSupply: "-",
  });
  const [balance, setBalance] = useState({
    address: "-",
    balance: "-",
  });
  const getContractInfo = async () => {
    if (contract !== "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(contract, erc20abi, provider);
      const tokenName = await erc20.name();
      const tokenSymbol = await erc20.symbol();
      const totalSupply = await erc20.totalSupply();
      setContractInfo({
        name: tokenName,
        symbol: tokenSymbol,
        totalSupply: BigInt(totalSupply).toLocaleString(),
      });
      return;
    }
    if (contract === "") alert("Please enter contract address");
  };

  const getMyBalance = async () => {
    if (contract !== "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const erc20 = new ethers.Contract(contract, erc20abi, provider);
      const signer = await provider.getSigner();
      const signerAddress = await signer.getAddress();
      const balance = await erc20.balanceOf(signerAddress);

      setBalance({
        address: signerAddress,
        balance: String(balance),
      });
      return;
    }
    if (contract === "") alert("Please enter contract address");
  };
  return (
    <BoxDiv>
      <h2 className="text-center text-[24px] font-bold pb-[1rem]">
        Read from Contract
      </h2>
      <label>Enter contract address</label>
      <input
        name="contractAddress"
        value={contract}
        onChange={(e) => {
          setContract(e.target.value);
        }}
      />
      <GetTokenInfo data={contractInfo} fetch={getContractInfo} />
      <GetBalance data={balance} fetch={getMyBalance} />
    </BoxDiv>
  );
};

export default ReadContract;
