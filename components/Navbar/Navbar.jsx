import Link from 'next/link'
import React from 'react'
import DarkMode from '../DarkMode/DarkMode'

const Navbar = () => {
  return (
    <>
        <nav>
            <ul>
                <li>
                    <Link href="/">
                    Home
                    </Link>
                </li>
                <li>
                    <Link href="/game">
                    Game
                    </Link>
                </li>
                <li>
                    <Link href="/favorites">
                    Favorites
                    </Link>
                </li>

                <li className='dark-mode-toggle'>
                    <DarkMode />
                </li>

            </ul>
        </nav>  
    </>
  )
}

export default Navbar