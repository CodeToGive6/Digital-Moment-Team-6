import Head from 'next/head'
import styles from '../../styles/Home.module.scss'

export default function Post() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Title</title>
        <meta name="description" content="Post" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Post</h1>
      </main>
    </div>
  )
}
