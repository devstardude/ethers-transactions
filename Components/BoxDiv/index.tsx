import styles from "./style.module.css";
interface BoxDiv {
  children: React.ReactNode;
}
const BoxDiv = ({ children }: BoxDiv) => {
  return <div className={styles.container}>{children}</div>;
};

export default BoxDiv;
