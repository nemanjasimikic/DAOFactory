import { useState } from 'react'
import styles from './styles.module.sass'

const Select = ({ selected, setSelected, options, label, onChange }) => {
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
            <div key={index}
              onClick={() => {
                setSelected(option)
                setIsActive(false)
                // console.log(label)
                let changedValue = {
                  target: {
                    /// To be expanded for other types of inputs
                    name: label === 'Type' 
                    ? 'typeValue' 
                    : 'networkValue',
                    value: option
                  } 
                }
                onChange(changedValue)
              }}
              
              className={
                selected
                  ? `${styles.optionItem} ${selected === option ? styles.selected : null}`
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