"use client"
import React, {useState, useEffect} from 'react'


const DarkMode = () => {

    const [theme, setTheme] = useState('light');

    const changeTheme = () => {
        if (theme === 'light') {
            setTheme('dark');

        } else {
            setTheme('light');
        }
    }

    useEffect(() => {
        if (theme === 'light') {
            document.body.classList.remove('dark');
        } else {
            document.body.classList.add('dark');
        }
    }, [theme])

  return (
    <>
    <div className='dark-mode'>
        <input type="checkbox" id="switch" name="theme" onClick={changeTheme}/>
        <label htmlFor="switch">{ theme === 'light' ? '🌚' : '🌞' }</label>
    </div>

    </>
  )
}

export default DarkMode