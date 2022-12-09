import styles from "./style.module.css";

interface GetBalance {
  data: { address: string; balance: string };
  fetch: () => void;
}
const GetBalance = ({ data, fetch }: GetBalance) => {
  return (
    <div className={styles.container}>
      <button onClick={fetch}>GET BALANCE</button>
      <div className="w-full overflow-x-auto">
        <table>
          <thead>
            <tr>
              <td>Address</td>
              <td>Balance</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.address}</td>
              <td>{data.balance}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetBalance;
