import { Request, Response, NextFunction } from 'express';
import axios from 'axios';
import querystring from 'querystring';
import SpotifyWebApi from 'spotify-web-api-node';

const clientId = 'cf548fe37bec4a20b5103b1d6d19c076';
const clientSecret = '0c6a064e16df40bd9788ca224cb9294f';
const redirect_uri1 = 'http://localhost:3000/callback/';
const redirect_uri2 = 'http://localhost:3000/callback/user';
const scope = 'user-read-private user-read-email';
let authorizationCode: any;

class UserController {
  async generateAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      res.redirect(`https://accounts.spotify.com/authorize?${
        querystring.stringify({
          response_type: 'code',
          client_id: clientId,
          scope,
          redirect_uri: redirect_uri1,
        })}`);

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getAccessToken(req: Request, res: Response, next: NextFunction) {
    try {
      authorizationCode = req.query.code;

      const authOptions = {
        url: 'https://accounts.spotify.com/api/token',
        form: {
          code: authorizationCode,
          redirect_uri: redirect_uri2,
          grant_type: 'authorization_code',
        },
        Headers: {
          Authorization: `Basic${Buffer.from(`${clientId}:${clientSecret}`).toString('base64')}`,
        },
        json: true,
      };

      console.log('oi');
      axios.post(authOptions.url, authOptions).then(async (body) => {
        const accessToken = body.data.access_token;
        const refreshToken = body.data.refresh_token;

        const options = {
          url: 'https://api.spotify.com/v1/me',
          headers: { Authorization: `Bearer ${accessToken}` },
          json: true,
        };

        await axios.get(options.url, options).then((resData) => {
          console.log('ou');
          console.log(resData);
        });
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getUser(req: Request, res: Response, next: NextFunction) {
    try {
      const spotifyAPi = new SpotifyWebApi({
        clientId,
        clientSecret,
        redirectUri: redirect_uri2,
      });

      spotifyAPi
        .authorizationCodeGrant(authorizationCode)
        .then((data) => {
          console.log(data);
        });

      return next();
    } catch (error) {
      return next(error);
    }
  }

  async getData(req: Request, res: Response, next: NextFunction) {
    try {
      console.log(req);

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
