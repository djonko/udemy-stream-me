import App from 'next/app';
import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { themeDark, themeLight } from 'lib/theme';

export default function MyApp({ Component, pageProps }) {
    useEffect(() => {
        // remove server-side inject css
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles && jssStyles.parentNode) {
            jssStyles.parentNode.removeChild(jssStyles);
        }
    }, []);
    return (
        <ThemeProvider theme={false ? themeDark : themeLight}>
            <CssBaseline />
            <Component {...pageProps} />
        </ThemeProvider>
    )
}