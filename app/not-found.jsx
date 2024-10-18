import React from 'react'
import Link from 'next/link'

const notFound = () => {
  return (
    <>
        <h1> 404 - You are lost</h1>
        <Link href="/"> Go back to home</Link>
    </>

  )
}

export default notFound