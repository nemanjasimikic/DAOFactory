import { useEffect, useState } from 'react'
import styles from './styles.module.sass'
import caretUp from 'static/svg/caretUp.svg'
import caretDown from 'static/svg/caretDown.svg'

const Select = ({ label, options, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const selectOption = (option) => {
    if (option.value !== value.value) onChange(option)
  }

  const isOptionSelected = (option) => {
    return option.value === value.value
  }

  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectWrapper}>
        <div className={styles.valueContainer} onClick={() => toggleOpen()}>
          <p>{value.name}</p>
          <img src={isOpen ? caretUp : caretDown} alt={'caret'} />
        </div>
        <ul className={isOpen ? styles.show : styles.options}>
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option.value}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ''
              } ${index === highlightedIndex ? styles.highlighted : ''}`}
            >
              {option.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
