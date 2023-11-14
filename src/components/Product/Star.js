import React from 'react'

export default function Star() {
    
  return (
    <div>
        {
            [...Array(5)].map((element, index)=><p>&#9733;</p>)
            
        }
    </div>
  )
}
