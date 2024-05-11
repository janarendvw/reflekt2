import React from 'react'

function Logo() {
  return (
    <div className="flex items-center gap-2">
      <svg
        className="h-6 w-6"
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
        viewBox="0 0 1069.66 1069.66"
      >
        <path
          d="M580.28 486V122.36H125.74V576.9h363.64v363.64h454.54V486H580.28zm-90.9 0H216.65V213.27h272.73V486zm363.63 363.63H580.28V576.9h272.73v272.73z"
          className="fill-foreground"
        ></path>
      </svg>
      <span className="text-2xl font-semibold">Reflekt</span>
    </div>
  )
}

export default Logo
