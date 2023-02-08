import styles from './styles.module.sass'

const Tabs = ({ titles, active, setActive }) => {
  return (
    <div className={styles.tabsWrapper}>
      {titles.map((title) => (
        <div
          key={title}
          active={active === title}
          onClick={() => setActive(title)}
          className={active === title ? styles.active : styles.tab}
        >
          {title}
        </div>
      ))}
    </div>
  )
}

export default Tabs
