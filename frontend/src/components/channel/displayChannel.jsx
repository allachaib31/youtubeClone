import React, { useEffect } from 'react'
import ChannelInformation from './channelInformation'
import Circle from '../circle/circle'
import { Outlet } from 'react-router-dom'

function DisplayChannel() {
  return (
    <div className='sm:mx-auto w-screen relative sm:container'>
        <ChannelInformation />
        <Circle left="5%" top="100%"/>
        <Circle left="90%" top="50%"/>
        <Outlet />
    </div>
  )
}

export default DisplayChannel