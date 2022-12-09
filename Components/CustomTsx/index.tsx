import { ethers } from "ethers";
import erc20abi from "../../utils/ABI.json";
import { useState, useEffect } from "react";
import styles from "./style.module.css";
import BoxDiv from "../BoxDiv";
declare let window: any;
interface CustomTsx {
  contract: string;
}
const CustomTsx = ({ contract }: CustomTsx) => {
  const [txs, setTxs] = useState<any>([]);
  const [startBlock, setStartBlock] = useState<number>(0);
  const setTsxHandler = async () => {
    if (contract !== "") {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const erc20 = new ethers.Contract(contract, erc20abi, provider);
      const latestBlock: number = await provider.getBlockNumber();
      const preBlock: number = latestBlock - startBlock;
      console.log(latestBlock, preBlock);
      const events = await erc20.queryFilter("Transfer", preBlock, latestBlock);
      console.log("events", events[0]);
      setTxs(events);
    }
  };

  return (
    <BoxDiv>
      <h2 className="text-center text-[24px] font-bold pb-[1rem]">
        Custom Transactions
      </h2>
      <label>Blocks subtracted from current block</label>
      <input
        type="number"
        value={startBlock}
        onChange={(e) => {
          setStartBlock(parseInt(e.target.value));
        }}
      />
      <button onClick={setTsxHandler} className="mt-[1rem]">
        See emitted events
      </button>
      <div className="h-[20rem] flex flex-col gap-4 mt-[1rem] overflow-y-auto">
        {txs &&
          txs.length !== 0 &&
          txs.map((item: any) => (
            <BoxDiv>
              <p>From: {item.args[0]}</p>
              <p>To: {item.args[1]}</p>
              <p>Amount: {BigInt(item.args[2]).toLocaleString()}</p>
              <a href={`https://mumbai.polygonscan.com/tx/${item.txHash}`}>
                Check in block explorer
              </a>
            </BoxDiv>
          ))}
      </div>
    </BoxDiv>
  );
};

export default CustomTsx;
