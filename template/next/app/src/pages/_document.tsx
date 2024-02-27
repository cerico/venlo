
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link href='https://unpkg.com/maplibre-gl@1.14.0-rc.1/dist/maplibre-gl.css' rel='stylesheet' />
            <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Belleza&family=Krona+One&family=IBM+Plex+Mono&family=IBM+Plex+Sans:wght@400;700&display=swap" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default MyDocument