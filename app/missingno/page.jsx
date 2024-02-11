import React from 'react'
import Link from 'next/link'

const page = () => {
  return (
    <section className='pokemon-details missingno-page'>
        <h2>Missingno 👾👻</h2>
        <p>ID: ¿¿¿???</p>
        <p>Altura: ¿¿¿???</p>
        <p>Peso: ¿¿¿???</p>
        <p>Experiencia base: ¿¿¿???</p>
        <p>Tipo: ¿¿¿???</p>
        <p>Estadisticas: ¿¿¿???</p>
        <img src='/images/missingnoIdle.gif' alt='missingno gif' />

        <audio autoPlay controls className='missingno_audio'>
          <source src='/images/lavander.mp3' type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>

        <Link href="/" className='back'>¡Vuelve al inicio!</Link>



    </section>
  )
}

export default page