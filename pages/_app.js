import '../styles/globals.css';
import Head from 'next/head';
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Arreglos de Conferencias</title>
        <meta name="description" content="Coordinación de arreglos de conferencias — Congregación Ypacaraí Guaraní" />
        <link rel="icon" type="image/png" href="/favicon.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#141416" />
        <meta name="apple-mobile-web-app-title" content="Arreglos" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta property="og:title" content="Arreglos de Conferencias" />
        <meta property="og:description" content="Coordinación de arreglos de conferencias — Congregación Ypacaraí Guaraní" />
        <meta property="og:image" content="https://arreglos-ypc.vercel.app/og-image.svg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://arreglos-ypc.vercel.app" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arreglos de Conferencias" />
        <meta name="twitter:image" content="https://arreglos-ypc.vercel.app/og-image.svg" />
        <style>{`
          @media print {
            body > * { display: none !important; }
            #programa-doc { display: block !important; }
            #programa-doc {
              position: fixed;
              top: 0; left: 0;
              width: 100%;
              margin: 0;
              padding: 20mm 20mm;
              font-family: Georgia, serif;
              color: #000;
              background: #fff;
            }
            @page {
              size: A4;
              margin: 0;
            }
          }
          @media screen {
            #programa-doc { display: block; }
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}