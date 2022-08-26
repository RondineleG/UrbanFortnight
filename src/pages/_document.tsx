import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }
  render() {
    const setInitialTheme = `
    function getUserPreference() {
      if(window.localStorage.getItem('theme')) {
        return window.localStorage.getItem('theme')
      }
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light'
    }
    document.body.dataset.theme = getUserPreference();
  `;

    return (
      <Html>
        <Head>
          <head>
            <meta charSet="utf-8" />
            <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
            <title>Urban Fortnight | Dashboard</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <script type="module" src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.esm.js"></script>
            <script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons/ionicons.js"></script>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/themes/prism-tomorrow.min.css"></link>
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/prism/1.19.0/plugins/line-numbers/prism-line-numbers.min.css"></link>

            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
              integrity="sha512-iBBXm8fW90+nuLcSKlbmrPcLa0OT92xO1BIsZ+ywDWZCvqsWgccV3gFoRBv0z+8dLJgyAHIhR35VZc2oM/gI1w==" crossOrigin="anonymous" />
            <link rel="stylesheet" href="css/adminlte.css" />
            <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons"></link>
            <script
              src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js"
              integrity="sha512-894YE6QWD5I59HgZOGReFYm4dnWc1Qt5NtvYSaNcOP+u1T9qYdvdihz0PPSiiqn/+/3e7Jo4EaG7TubfWGUrMQ=="
              crossOrigin="anonymous"
            ></script>
            <script src="js/adminlte.js"></script>
          </head>
        </Head>
        <body className="sidebar-mini layout-fixed layout-navbar-fixed vsc-initialized custom-theme">
          <script dangerouslySetInnerHTML={{ __html: setInitialTheme }} />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument
