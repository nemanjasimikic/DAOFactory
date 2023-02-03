import { useState } from 'react'
import { useOutsideClick } from 'helpers/useOutsideClick'
import styles from './styles.module.sass'

const Select = ({ selected, setSelected, options, label, onChange }) => {
  const [isActive, setIsActive] = useState(false)
  const handleClickOutside = () => {
    setIsActive(false)
  }
  const handleClickInside = () => {
    setIsActive(true)
  }
  const ref = useOutsideClick(handleClickOutside)

  return (
    <div className={styles.select}>
      <label className={styles.label}>{label}</label>
      <div ref={ref} onClick={handleClickInside}
        className={styles.selectField}
      >
        {selected ? selected : options[0]}
      </div>

      {isActive && 
      // Commented out container for making
      // a scrollable container to hold dropdown items
      // <div className={styles.scrollable}>
        (<div className={styles.selectContent}>
          {options.map((option, index) => (
            <div key={index}
              onClick={() => {
                setSelected(option)
                handleClickOutside()
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
                  ? `${styles.optionItem} 
                  ${selected === option 
                    ? styles.selected 
                    : null}`
                  : styles.optionItem
              }
            >
              {option}
            </div>
          ))}
        </div>)}
      {/* </div> */}   
    </div>
  )
}

export default Select