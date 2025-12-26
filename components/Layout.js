import Head from "next/head";
import ThemeToggle from "./ThemeToggle";
import styles from "styles/layout.module.css";

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>Victor | Software Engineer</title>

        <meta
          name="description"
          content="Software Engineer focado em backend, Kotlin, PostgreSQL, AWS, arquitetura e segurança."
        />

        <link rel="canonical" href="https://victorscavazin.com.br" />

        {/* Open Graph */}
        <meta property="og:title" content="Victor | Software Engineer" />
        <meta
          property="og:description"
          content="Portfólio pessoal de Victor, Software Engineer focado em backend, arquitetura e segurança."
        />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/profile_picture.jpg" />
        <meta property="og:url" content="https://victorscavazin.com.br" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Victor | Software Engineer" />
        <meta
          name="twitter:description"
          content="Portfólio pessoal de Victor, Software Engineer."
        />
        <meta name="twitter:image" content="/profile_picture.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.container}>
        <div className={styles.topBar}>
          <ThemeToggle />
        </div>
        {children}
      </div>
    </>
  );
}
