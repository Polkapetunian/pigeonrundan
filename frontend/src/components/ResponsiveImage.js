import React from 'react'

const picSmall = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_n.jpg"
const picMedium = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_z.jpg"
const picLarge = "https://live.staticflickr.com/65535/51239500401_1b095e0f6f_c.jpg"

const ResponsiveImage = () => {
  return(
    <img src={picSmall} srcSet={`${picSmall} 320w, ${picMedium} 640w, ${picLarge} 800w`} />
  )
}

export default ResponsiveImage