import BoxDiv from "../BoxDiv";
import ReadContract from "../ReadContract";
import Wrapper from "../Wrapper";
import WriteContract from "../WriteContract";
import { useState } from "react";
import RecentTxn from "../RecentTxn";
import CustomTsx from "../CustomTsx";
interface HomePage {
  account: string | null;
}

const HomePage = ({ account }: HomePage) => {
  const [contract, setContract] = useState("");
  return (
    <Wrapper>
      <div className=" w-full lg:w-[50%] flex flex-col gap-8">
        <ReadContract
          contract={contract}
          setContract={(contract) => setContract(contract)}
        />
        <WriteContract contract={contract} account={account} />
      </div>
      <div className="w-full lg:w-[50%] flex flex-col gap-8">
        <RecentTxn contract={contract} />
        <CustomTsx contract={contract} />
      </div>
    </Wrapper>
  );
};

export default HomePage;
