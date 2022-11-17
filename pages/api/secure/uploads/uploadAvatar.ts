import multer from 'multer';
import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import nc from 'next-connect';
import { v4 as uuid } from 'uuid';

let fileName: string;

const upload = multer({
  storage: multer.diskStorage({
    destination: './public/avatar',
    filename: async (req, file, cb) => {
      const session = await getSession({ req });
      if (!session) throw new Error('User is not logged in');
      const name = String(session.id).match(/[\s\S]{1,3}/g);
      if (!name) throw new Error();
      const fullName = name[0] + uuid();
      fileName = fullName;
      cb(null, `${fullName}.png`);
    }
  }),
  fileFilter: (req, file, cb) => {
    const fileSize = parseInt(req.headers['content-length'] ?? '');

    const maxFileSize = 100000;

    if (file.mimetype == 'image/png' && fileSize < maxFileSize) {
      cb(null, true);
    } else if (fileSize > maxFileSize) {
      return cb(new Error('Provided file is too big. Max allowed size is 1mb'));
    } else {
      cb(null, false);
      return cb(new Error('Only .png format allowed!'));
    }
  }
});

const apiRoute = nc<NextApiRequest, NextApiResponse>({
  onError(error, _, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` });
  },
  onNoMatch(req, res) {
    res.status(405).json({ error: `Method '${req.method}' Not Allowed` });
  }
});

apiRoute.use(upload.single('theFiles'));

apiRoute.post(async (req, res) => {
  const session = await getSession({ req });
  if (!session) return res.status(401).json({ message: 'Please log in to use this route' });
  return res
    .status(200)
    .json({ data: { message: 'Success', path: `./public/avatar/${fileName}` } });
});

export default apiRoute;

export const config = {
  api: {
    bodyParser: false
  }
};
