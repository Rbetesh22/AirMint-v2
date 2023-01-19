import '../styles/globals.css'
import 'react-date-range/dist/styles.css'; // main style file
import 'react-date-range/dist/theme/default.css';
import { PrivyProvider } from '@privy-io/react-auth';

export default function App({ Component, pageProps }) {
  return (
      <Component {...pageProps} />
  )
}
