import React from 'react'
import LoadingGif from './images/loading.gif'

function Loading() {
  return (
    <div className='loading'>
      <img src={LoadingGif} alt="loading" />
    </div>
  )
}

export default Loading
