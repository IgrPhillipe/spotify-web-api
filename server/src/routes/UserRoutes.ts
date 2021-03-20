import {
  Router, Request, Response, NextFunction,
} from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = Router();

const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];

const clientId = 'cf548fe37bec4a20b5103b1d6d19c076';
const clientSecret = '0c6a064e16df40bd9788ca224cb9294f';
const redirectUri = 'http://localhost:3000/callback';

const SpotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

const generateRandomString = (lenght) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < lenght; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.send('Index');

  next();
});

router.get('/login', (req: Request, res: Response, next: NextFunction) => {
  const state = generateRandomString(16);
  const html = SpotifyApi.createAuthorizeURL(scopes, state);

  // console.log(html);
  // res.send(`${html}&show_dialog=true`);

  res.redirect(html);

  return next();
});

router.get('/callback', async (req: Request, res: Response, next: NextFunction) => {
  const { code } = req.query;

  try {
    const data = await SpotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    SpotifyApi.setAccessToken(access_token);
    SpotifyApi.setRefreshToken(refresh_token);

    SpotifyApi.getMe().then((user) => {
      console.log(user);
    });

    res.redirect('http://localhost:3000/');

    return next();
  } catch (error) {
    return next(error);
  }
});

export default router;
