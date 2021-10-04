import Header from '../components/Header'
import '../styles/globals.css'
import { Provider } from 'next-auth/client'

function MyApp({ Component, pageProps }) {
  return (<>
    <Provider session={pageProps.session}>
      <Header />
      <main className="container">
        <Component {...pageProps} />
      </main>
    </Provider>
  </>);
}

export default MyApp
