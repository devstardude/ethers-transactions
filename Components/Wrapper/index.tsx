import styles from "./style.module.css";
interface Wrapper {
  children: React.ReactNode;
}
const Wrapper = ({ children }: Wrapper) => {
  return <div className={styles.container}>{children}</div>;
};

export default Wrapper;
