import Document, { Head, Main, NextScript } from 'next/document'

export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
          <script src="//tonejs.github.io/build/Tone.min.js"/>
          <link
            rel='stylesheet'
            href='/_next/static/style.css'
          />
          <link rel="stylesheet" href="https://unpkg.com/react-rangeslider/umd/rangeslider.min.css" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}
