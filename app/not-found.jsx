import React from 'react'
import Link from 'next/link'

const notFound = () => {
  return (
    <>
        <h1>Parece que te perdiste</h1>
        <Link href="/"> Volver al inicio</Link>
    </>

  )
}

export default notFound