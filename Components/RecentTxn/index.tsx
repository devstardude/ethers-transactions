import { ethers } from "ethers";
import erc20abi from "../../utils/ABI.json";
import { useState, useEffect } from "react";
import BoxDiv from "../BoxDiv";
declare let window: any;
interface RecentTxn {
  contract: string;
}
const RecentTxn = ({ contract }: RecentTxn) => {
  const [txs, setTxs] = useState<any>([]);
  const [contractListened, setContractListened] = useState<any>();

  useEffect(() => {
    const EventListener = async () => {
      if (contract !== "") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const erc20 = new ethers.Contract(contract, erc20abi, provider);
        erc20.on("Transfer", (from, to, amount, event) => {
          console.log({ from, to, amount, event });

          setTxs((currentTxs: any) => [
            ...currentTxs,
            {
              txHash: event.transactionHash,
              from,
              to,
              amount: String(amount),
            },
          ]);
        });
        setContractListened(erc20);

        return () => {
          if (contract !== "") {
            contractListened.removeAllListeners();
          }
        };
      }
    };
    EventListener();
  }, [contract]);

  console.log(txs);
  return (
    <BoxDiv>
      <h2 className="text-center text-[24px] font-bold pb-[1rem]">
        Recent Transactions
      </h2>
      <div className="h-[30rem] flex flex-col gap-4 mt-[1rem] overflow-y-auto">
        {txs &&
          txs.length !== 0 &&
          txs.map((item: any) => (
            <BoxDiv>
              <p>From: {item.from}</p>
              <p>To: {item.to}</p>
              <p>Amount: {item.amount}</p>
              <a href={`https://mumbai.polygonscan.com/tx/${item.txHash}`}>
                Check in block explorer
              </a>
            </BoxDiv>
          ))}
      </div>
    </BoxDiv>
  );
};

export default RecentTxn;
