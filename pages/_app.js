import { UserAuthContextProvider } from "../lib/userAuthContext";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <UserAuthContextProvider>
      <Component {...pageProps} />
    </UserAuthContextProvider>
  );
}

export default MyApp;
