import { useEffect, useState } from 'react'

/**
 * 
 * @description This custom hook will listen for changes screen size changes
 */
const UseWindowSize = (): number[] => {
  const [screenSize, setScreenSize] = useState([window.innerHeight, window.innerWidth]);

  useEffect((): () => void => {
    const handleWindowSizeChange = () => setScreenSize([window.innerHeight, window.innerWidth])
    window.addEventListener('resize', handleWindowSizeChange);
    return () => window.removeEventListener('resize', handleWindowSizeChange);
  }, [])

  return screenSize;
}

export default UseWindowSize