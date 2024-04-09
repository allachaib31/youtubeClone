import React from 'react'

function Circle({left,top}) {
  return (
    <div style={{
      left: left,
      top: top,
    }} className='z-[-1] bg-primary fixed w-[400px] h-[400px] rounded-[100%] opacity-[1.5] blur-[9.25rem] '></div>
  )
}

export default Circle