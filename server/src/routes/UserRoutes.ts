import {
  Router, Request, Response, NextFunction,
} from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

const router = Router();

const clientId = 'cf548fe37bec4a20b5103b1d6d19c076';
const clientSecret = '0c6a064e16df40bd9788ca224cb9294f';
const redirectUri = 'http://localhost:3000/callback';

const SpotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

router.get('/user', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const data = await SpotifyApi.authorizationCodeGrant(code);
    const { access_token, refresh_token } = data.body;
    SpotifyApi.setAccessToken(access_token);
    SpotifyApi.setRefreshToken(refresh_token);

    res.redirect('http://localhost:3000/');
  } catch (error) {
    return next(error);
  }
});

export default router;
