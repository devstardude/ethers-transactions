import Head from "next/head";
import Navbar from "../Components/Navbar";
import { useState } from "react";
import HomePage from "../Components/Homepage";
export default function Home() {
  const [account, setAccount] = useState<null | string>(null);
  const setAccountHandler = (account: string) => {
    setAccount(account);
  };
  return (
    <div>
      <Head>
        <title>Ether Tsx</title>
        <meta name="description" content="Ether.js demonstration" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar account={account} setAccount={setAccountHandler} />
      <HomePage account={account} />
    </div>
  );
}
