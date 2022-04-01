import Document, { Html, Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <title>Zenon Scraper</title>
        <Head>
            <meta name="description" content="Explorer for Zenon Network DAG" />
            <link rel="icon" href="/favicon-16x16.png" sizes="16x16" />
            <link rel="icon" href="/favicon-32x32.png" sizes="32x32" />
            <link rel="icon" href="/favicon-96x96.png" sizes="96x96" />
            {/* Global Site Tag (gtag.js) - Google Analytics */}
            <script
                async
                src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
            />
            <script
                dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
                });
            `,
                }}
            />
        </Head>
        <body>
            <Main />
            <NextScript />
        </body>
    </Html>
    )
  }
}
