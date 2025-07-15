import csrf from 'csurf';
import cookieParser from 'cookie-parser';

const csrfProtection = csrf({ cookie: true });

const applyCsrf = (handler) => (req, res) =>
  cookieParser()(req, res, () =>
    csrfProtection(req, res, () => handler(req, res))
  );

export default applyCsrf;