import styles from "./style.module.css";

interface GetTokenInfo {
  data: { name: string; symbol: string; totalSupply: string };
  fetch: () => void;
}
const GetTokenInfo = ({ data, fetch }: GetTokenInfo) => {
  return (
    <div className={styles.container}>
      <button onClick={fetch}>GET TOKEN INFO</button>
      <div className={styles.tableContainer}>
        <table>
          <thead>
            <tr>
              <td>Name</td>
              <td>Symbol</td>
              <td>Total Supply</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{data.name}</td>
              <td>{data.symbol}</td>
              <td>{data.totalSupply}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default GetTokenInfo;
