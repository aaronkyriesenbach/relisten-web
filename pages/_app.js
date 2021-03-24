import withRedux from 'next-redux-wrapper';
import App from 'next/app';
import Head from 'next/head';
import Raven from 'raven-js';
import React from 'react';
import { Provider } from 'react-redux';
import { initStore } from '../redux';

require('@fortawesome/fontawesome-free/css/all.css');

const SENTRY_PUBLIC_DSN = 'https://d8fe64a30ead43e2ac70c750bc79a806@sentry.io/1261843';

class MyApp extends App {
  constructor(...args) {
    super(...args);

    Raven.config(SENTRY_PUBLIC_DSN).install();
  }

  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx);
    }

    return { pageProps };
  }

  componentDidCatch(error, errorInfo) {
    Raven.captureException(error, { extra: errorInfo });

    // This is needed to render errors correctly in development / production
    super.componentDidCatch(error, errorInfo);
  }

  render() {
    const { Component, pageProps, store } = this.props;

    const fullPath = this.props.router.asPath;
    const content = 'app-id=715886886, app-argument=https://relisten.net' + fullPath;

    return (
      <div>
        <Head>
          <title>Relisten</title>
          <meta name="apple-itunes-app" content={content} />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        </Head>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </div>
    );
  }
}

export default withRedux(initStore)(MyApp);
