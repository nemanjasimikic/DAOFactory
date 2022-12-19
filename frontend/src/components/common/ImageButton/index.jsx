import styles from './styles.module.sass'

const ImageButton = ({ image, onClickFunction, style }) => {
  let theStyle = style == 'image1' ? styles.inputIconOne : styles.inputIconTwo

  return (
    <button onClick={onClickFunction} className={styles.imageButton}>
      <img
        // onClickFunction to be placed into onClick param
        src={image}
        onError={(event) => (event.target.src = '')}
        className={theStyle}
      />
    </button>
  )
}

export default ImageButton
