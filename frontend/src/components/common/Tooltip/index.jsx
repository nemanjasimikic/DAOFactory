import styles from './styles.module.sass'
// import { useRef, useState, useCallback, useEffect } from 'react'

const Tooltip = ({ label, text, wrappedElement }) => {
  //   let tooltipRef = useRef(null)
  //   let ref
  //   let position

  //   const handleScroll = useCallback(() => {
  //     ref = tooltipRef.current.getBoundingClientRect()
  //     position = calcPosition()
  //   }, [])
  //   useEffect(() => {
  //     ref = tooltipRef.current.getBoundingClientRect()
  //     window.addEventListener('scroll', handleScroll)
  //   }, [handleScroll])

  //   function calcPosition() {
  //     if (ref?.top === undefined) {
  //       return null
  //     } else if (ref.top - ref.height > 0) {
  //       return -ref.height
  //     }
  //   }

  return (
    <div className={styles.tooltipWrapper}>
      <div>{wrappedElement}</div>
      <div
        // style={{ top: position }}
        // ref={tooltipRef}
        className={styles.tooltipContainer}
      >
        <p>{label}</p>
        <p>{text}</p>
      </div>
    </div>
  )
}

export default Tooltip
