import { useState } from 'react'
import styles from './styles.module.sass'
import checkmark from 'static/svg/checkmark.svg'

const Select = ({ label, options, value, onChange }) => {
  const [open, setOpen] = useState(false)

  const toggleOpen = () => {
    setOpen(!open)
  }

  const selectOption = (option) => {
    onChange(option)
  }
  return (
    <div className={styles.selectContainer}>
      <label className={styles.label}>{label}</label>
      <div className={styles.selectWrapper}>
        {/*{value}*/}
        <div className={styles.valueContainer} onClick={() => toggleOpen()}>
          <p>{value.name}</p>
          <p>xd</p>
        </div>
        <ul className={open ? styles.show : styles.options}>
          {options.map((option) => (
            <li
              onClick={(e) => {
                e.stopPropagation()
                selectOption(option)
                setOpen(false)
              }}
              className={styles.option}
              key={option.name}
            >
              {option.name}
              <img src={checkmark} alt={'checkmark'} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Select
