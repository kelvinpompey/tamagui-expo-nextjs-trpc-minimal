import { HomeScreen } from 'app/features/home/screen'
import Head from 'next/head'
import { api } from 'server/routers/root'

export default function Page({ greeting }: { greeting: string }) {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <HomeScreen greeting={greeting} />
    </>
  )
}

export const getServerSideProps = async () => {
  // Pass data to the page via props
  const result = await api.greeting({ name: 'Kelvin Pompey' })

  return { props: { greeting: result.text } }
}
