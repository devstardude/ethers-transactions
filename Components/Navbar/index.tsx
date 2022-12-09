import { useState, useEffect } from "react";
import styles from "./style.module.css";
import truncateEthAddress from "truncate-eth-address";

declare let window: any;

interface Navbar {
  setAccount: (account: string) => void;
  account: string | null;
}

const Navbar = ({ setAccount, account }: Navbar) => {
  const connectWallet = async () => {
    if (!("ethereum" in window)) {
      alert("Please install Metamask");
      return;
    }
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    setAccount(accounts[0]);
  };

  return (
    <div className={styles.container}>
      <div className={styles.navDiv}>
        <div className={styles.desktopDiv}>
          <div className={styles.navLinks}>
            <h3 className="font-bold">Ethers TXN</h3>
          </div>
          <div>
            <button onClick={connectWallet} className={styles.button}>
              {account ? (
                <span>{truncateEthAddress(account)}</span>
              ) : (
                <span>Connect wallet</span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
