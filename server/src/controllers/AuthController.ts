import {
  Request, Response, NextFunction,
} from 'express';

import SpotifyWebApi from 'spotify-web-api-node';

import authenticate from '../helpers/authenticate';

const clientId = 'cf548fe37bec4a20b5103b1d6d19c076';
const clientSecret = '0c6a064e16df40bd9788ca224cb9294f';
const redirectUri = 'http://localhost:3000/auth/callback';

const SpotifyApi = new SpotifyWebApi({
  clientId,
  clientSecret,
  redirectUri,
});

const generateRandomString = (lenght: number) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < lenght; i += 1) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

class AuthController {
  async authenticate(req: Request, res: Response, next: NextFunction) {
    try {
      const state = generateRandomString(16);
      const scopes = ['user-read-private', 'user-read-email', 'playlist-modify-public', 'playlist-modify-private'];
      const url = SpotifyApi.createAuthorizeURL(scopes, state);

      await authenticate(res, url);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async callback(req: Request, res: Response, next: NextFunction) {
    try {
      const { code } = req.query;
      if (!code) {
        res.locals.status = 400;
        res.locals.message = 'An error ocurred. Try again';
      }

      res.locals.status = 200;
      res.locals.message = 'Your connection was authenticated with success';
      res.locals.data = code;

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new AuthController();
