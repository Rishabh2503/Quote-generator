import Head from 'next/head'

import styles from '@/styles/Home.module.css'
import { GradientBackgroundColor } from '@/Components/QuoteGenerator/QuoteGenerator'



export default function Home() {
  return (
    <>
      <Head>
        <title>Quote Generator</title>
        <meta name="description" content="Get Inspired by quotes" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Background */}
      <GradientBackgroundColor />
    </>
  )
}
