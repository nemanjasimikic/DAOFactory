import { useState } from 'react'
import styles from './styles.module.sass'

const Select = ({ selected, setSelected, options, label }) => {
  const [isActive, setIsActive] = useState(false)
  return (
    <div className={styles.select}>
      <label className={styles.label}>{label}</label>
      <div
        className={styles.selectField}
        onClick={() => setIsActive(!isActive)}
      >
        {selected}
      </div>

      {isActive && (
        <div className={styles.selectContent}>
          {options.map((option, index) => (
            <div
              onClick={() => {
                setSelected(option)
                setIsActive(false)
              }}
              className={
                selected
                  ? `${styles.optionItem} ${styles.selected}`
                  : styles.optionItem
              }
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Select