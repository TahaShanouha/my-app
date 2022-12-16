import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import BlogFeed from '../components/BlogFeed'


import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 
 const queryClient = new QueryClient()
 
 export default function App() {
   return (
     <QueryClientProvider client={queryClient}>
       <Home />
     </QueryClientProvider>
   )
 }

function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Blog Posts</title>
        <meta name="description" content="Blog posts retreived dynamically" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div> 
          <BlogFeed />
        </div>
      </main>
    </div>
  )
}
