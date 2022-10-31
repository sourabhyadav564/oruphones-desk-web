import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <meta name="robots" content="noindex,nofollow" />
          {/* <meta http-equiv="Content-Security-Policy" content="upgrade-insecure-requests" />  */}
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700&display=swap"
            rel="stylesheet"
          ></link>
          <link rel="shortcut icon" href="/favicon.ico" />
        </Head>
        <body className="font-open-sans bg-m-white">
          <Main />
          <NextScript />
          <script src="/restrict.js" />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
