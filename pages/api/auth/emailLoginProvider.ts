import axios from 'axios';

export const emailLoginProvider = {
  id: 'credentials',
  name: 'credentials',
  credentials: {},
  async authorize(credentials: any) {
    if (!credentials) throw new Error();
    const user = await axios.post(
      'https://myapi.com/login',
      {
        user: {
          password: credentials.password,
          email: credentials.email
        }
      },
      {
        headers: {
          accept: '*/*',
          'Content-Type': 'application/json'
        }
      }
    );

    if (user) {
      return user;
    } else {
      return null;
    }
  }
};
