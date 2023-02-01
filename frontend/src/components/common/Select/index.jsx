import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import styles from './styles.module.sass'
import caretUp from 'static/svg/caretUp.svg'
import caretDown from 'static/svg/caretDown.svg'

const Select = ({ label, options, value, onChange, registerSelect }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(0)

  // console.log('OPTION')

  useEffect(() => {
    if (isOpen) setHighlightedIndex(0)
  }, [isOpen])

  const toggleOpen = () => {
    setIsOpen(!isOpen)
  }

  const selectOption = (option) => {
    if (option !== value) onChange(option)
  }

  const isOptionSelected = (option) => {
    return option === value
  }
  const { register } = useForm()
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectWrapper}>
        <div className={styles.valueContainer} onClick={() => toggleOpen()}>
          <p>{value}</p>
          <img src={isOpen ? caretUp : caretDown} alt={'caret'} />
        </div>
        <ul
          className={isOpen ? styles.show : styles.options}
          id={registerSelect}
          {...register(registerSelect)}
        >
          {options.map((option, index) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setIsOpen(false)
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              key={option}
              className={`${styles.option} ${
                isOptionSelected(option) ? styles.selected : ''
              } ${index === highlightedIndex ? styles.highlighted : ''}`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
