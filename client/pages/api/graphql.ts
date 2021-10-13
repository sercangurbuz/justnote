import {
  withApiAuthRequired,
  getAccessToken,
  getSession,
} from '@auth0/nextjs-auth0';
import { createProxyMiddleware } from 'http-proxy-middleware';
import { NextApiResponse, NextApiRequest } from 'next';
import nc, { Middleware } from 'next-connect';

declare module 'next' {
  interface NextApiRequest {
    accessToken: string;
  }
}

export const config = {
  api: {
    bodyParser: false,
  },
};

function onError(err: Error) {
  console.log(err);
}

const handler = nc<NextApiRequest, NextApiResponse>({ onError })
  .use((req, res, next) => {
    const session = getSession(req, res);
    if (!session || !session.user) {
      res.status(401).end({
        error: 'not_authenticated',
        description:
          'The user does not have an active session or is not authenticated',
      });
      return;
    }

    req.accessToken = session.accessToken!;
    next();
  })
  .use(
    createProxyMiddleware({
      target: process.env.API_URL,
      ws: true, // proxy websockets
      changeOrigin: true,
      pathRewrite: { '^/api/': '/' },
      logLevel: 'error',
      onProxyReq(proxyReq, req) {
        proxyReq.setHeader(
          'Authorization',
          `bearer ${(req as NextApiRequest).accessToken}`
        );
      },
    }) as Middleware<NextApiRequest, NextApiResponse>
  );

export default handler;
