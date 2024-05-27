import React from 'react'
import styles from './Loader.module.css'
type LoaderProps = {}

function Loader({}: LoaderProps) {
  const loaderSize = 20
  const strokeWidth = 3
  const adjustedSize = loaderSize - strokeWidth // Adjust for stroke width

  return (
    <svg
      className={styles.container}
      viewBox={`0 0 ${adjustedSize} ${adjustedSize}`}
      height={loaderSize}
      width={loaderSize}
    >
      <rect
        className={styles.track}
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        fill="none"
        strokeWidth={`${strokeWidth}px`}
        width={adjustedSize - strokeWidth}
        height={adjustedSize - strokeWidth}
      />
      <rect
        className={styles.car}
        x={strokeWidth / 2}
        y={strokeWidth / 2}
        fill="none"
        strokeWidth={`${strokeWidth}px`}
        width={adjustedSize - strokeWidth}
        height={adjustedSize - strokeWidth}
        pathLength="100"
      />
    </svg>
  )
}

export default Loader
