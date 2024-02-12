import Navbar from "../components/Navbar"
import './global.css'
export const metadata = {
  title: 'Pokedex',
  description: 'Pokedex with nextJS',
  keywords: 'pokedex, nextjs, pokemon, pokeapi, api, react, javascript, maizo21',
}

export default function RootLayout({ children }) {

 return (
    <html lang="es">
      <body>
        <header>
          <Navbar />
        </header>
        <main>
        {children}
        </main>
        
        <footer>
          <p>made with ❤️ by <a href="https://github.com/Maizo21">Maizo21</a></p>
        </footer>
        </body>
    </html>
  )
}
