import styles from './styles.module.sass'

const Button = ({ onClick, text, type, leftArrow, rightArrow, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={styles[type]}>
      <img
        src={leftArrow}
        className={styles.leftArrow}
        onError={(event) => (event.target.src = '')}
      />
      {text}
      <img
        src={rightArrow}
        className={styles.rightArrow}
        onError={(event) => (event.target.src = '')}
      />
    </button>
  )
}

export default Button
