import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Main from "~/components/Main";
import Stage from "~/components/Stage";
import { api } from "~/utils/api";

export default function Home() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined },
  );

  return (
    <>
      <Head>
        <title>Adaptive Learning</title>
        <meta name="description" content="Apaptive Learning Web App" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      { sessionData ? <Main /> : <Auth /> }
    </>
  );
}

function Auth() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c]">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Adaptive</span> Learning
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <button
              className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
              onClick={() => void signIn()}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
