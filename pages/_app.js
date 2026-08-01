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
            body { margin: 0; }
            .no-print { display: none !important; }
            .print-only { display: block !important; }
            #programa-doc {
              width: 210mm;
              min-height: 297mm;
              margin: 0 auto;
              padding: 18mm 18mm;
              font-family: Georgia, serif;
              color: #000 !important;
              background: #fff !important;
              font-size: 11pt;
            }
            @page {
              size: A4 portrait;
              margin: 0;
            }
          }
        `}</style>
      </Head>
      <Component {...pageProps} />
    </>
  );
}