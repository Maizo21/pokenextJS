import Navbar from "../components/Navbar/Navbar"
import Footer from "../components/Footer/Footer"
import './global.css'
import ClientProvider from './ClientProvider';
import DarkMode from "../components/DarkMode/DarkMode";
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

          <ClientProvider>
            <main>
              {children}
            </main>
          </ClientProvider>

          <footer>
            <Footer />
          </footer>
      </body>
    </html>
  )
}
