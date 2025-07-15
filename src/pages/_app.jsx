import { useEffect } from 'react';

function MyApp({ Component, pageProps }) {

  useEffect(() => {
    // سكريبت Tawk.to
    var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
    (function () {
      var s1 = document.createElement("script"),
        s0 = document.getElementsByTagName("script")[0];
      s1.async = true;
      s1.src = 'https://embed.tawk.to/6874b3a9d4c4ab1908722411/1j03trmsk';
      s1.charset = 'UTF-8';
      s1.setAttribute('crossorigin', '*');
      s0.parentNode.insertBefore(s1, s0);
    })();
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;