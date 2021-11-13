import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document';
import { ServerStyleSheets } from '@material-ui/styles';
import React from 'react';


class Mydocument extends Document {

    static async getInitialProps(ctx: DocumentContext) {

        // render the app and get the context of the page with collected side effects
        const sheet = new ServerStyleSheets();
        const originalRenderPage = ctx.renderPage;

        ctx.renderPage = () =>
            originalRenderPage({ enhanceApp: (App) => (props) => sheet.collect(<App {...props} />) });
        const initialProps = await Document.getInitialProps(ctx);

        return { ...initialProps, styles: [React.Children.toArray(initialProps.styles), sheet.getStyleElement()] };
    }
    render() {
        return (
            <Html>
                <Head />
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}
export default Mydocument