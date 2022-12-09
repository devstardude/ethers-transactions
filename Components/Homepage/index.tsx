import ReadContract from "../ReadContract";
import Wrapper from "../Wrapper";
import WriteContract from "../WriteContract";
import styles from "./style.module.css";
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
      <div className={styles.container}>
        <ReadContract
          contract={contract}
          setContract={(contract) => setContract(contract)}
        />
        <WriteContract contract={contract} account={account} />
      </div>
      <div className={styles.container}>
        <RecentTxn contract={contract} />
        <CustomTsx contract={contract} />
      </div>
    </Wrapper>
  );
};

export default HomePage;
