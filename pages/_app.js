import Layout from "@/components/layout/layout";
import { UserProvider } from "@/store/UserContext";
import "@/styles/globals.css";
import Head from "next/head";
import {SessionProvider} from "next-auth/react"
export default function App({ Component, pageProps }) {
  return (

  <SessionProvider>
  <Layout>
    <Head>
      <title>Social Loop</title>
    </Head>

    <UserProvider>
      <Component {...pageProps} />
    </UserProvider> 
  </Layout>
  </SessionProvider>
)
  ;
}
