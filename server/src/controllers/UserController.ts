import { Request, Response, NextFunction } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';

class UserController {
  async getUser(_req: Request, res: Response, next: NextFunction) {
    try {

      const clientId = 'cf548fe37bec4a20b5103b1d6d19c076';
      const clientSecret = '0c6a064e16df40bd9788ca224cb9294f';
      const redirect_uri = 'http://localhost:3000/callback';
      const scopes = 'user-read-private user-read-email';

      res.redirect('https://accounts.spotify.com/authorize' +
        '?response_type=code' +
        '&client_id=' + clientId +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirect_uri));
      ).try((_res) => {

    });

      const spotifyApi = new SpotifyWebApi({
        clientId: 'cf548fe37bec4a20b5103b1d6d19c076',
        clientSecret: '0c6a064e16df40bd9788ca224cb9294f',
        redirectUri: 'http://localhost:3000/callback',
      });

      spotifyApi.getMe().then((data: any) => {
        console.log(data);
      });

      return next();
    } catch (error) {
      return next(error);
    }
  }
}

export default new UserController();
