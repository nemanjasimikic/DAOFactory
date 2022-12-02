import styles from './styles.module.sass'

const ContentHeader = ({ title, children }) => {
  return (
    <div className={styles.contentHeader}>
      <h3 className={styles.contentTitle}>{title}</h3>
      {children}
    </div>
  )
}

export default ContentHeader
