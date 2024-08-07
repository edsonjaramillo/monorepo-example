import { Hono } from 'hono';
import { deleteCookie, setCookie } from 'hono/cookie';
import { uuidv7 } from 'uuidv7';

import { zSignInSchema, zSignupSchema } from 'validation';

import { DateTZ, JSend } from 'common';

import { zValidator } from '../middlware/zValidate';
import { PasswordManager } from '../utils/PasswordManager';
import { cookieOptions } from '../utils/cookies';
import { sessionsQueries, usersQueries } from '../utils/query.clients';

export const publicAuthRouter = new Hono();

publicAuthRouter.post('/signup', zValidator(zSignupSchema, 'json'), async (c) => {
  const body = c.req.valid('json');

  const password = await PasswordManager.hash(body.password);

  await usersQueries.createUser({ ...body, password });

  return c.json(JSend.success(undefined, 'User created successfully'));
});

publicAuthRouter.post('/signin', zValidator(zSignInSchema, 'json'), async (c) => {
  const body = c.req.valid('json');

  const credentials = await usersQueries.getUserCredentials(body.email);
  if (!credentials) {
    return c.json(JSend.error('Invalid credentials'));
  }

  const isVerified = await PasswordManager.verify(credentials.password, body.password);
  if (!isVerified) {
    return c.json(JSend.error('Invalid credentials'));
  }

  const uuid = uuidv7();
  const expiresAt = DateTZ().add(1, 'month').toDate();
  await sessionsQueries.createSession({ id: uuid, userId: credentials.id, expiresAt });

  const session = await sessionsQueries.getSessionById(uuid);
  if (!session) {
    return c.json(JSend.error('Invalid credentials'));
  }

  setCookie(c, 'session', session.id, cookieOptions(false, expiresAt));
  return c.json(JSend.success(session, 'Users fetched successfully'));
});

export const userAuthRouter = new Hono();

userAuthRouter.get('/auto-signin', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json(JSend.error('Invalid session'), 400);
  }

  return c.json(JSend.success(session, 'Session refreshed successfully'));
});

userAuthRouter.get('/verify', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json(JSend.error('Invalid session'), 400);
  }

  return c.json(JSend.success(session, 'Session verified successfully'));
});

userAuthRouter.get('/signout', async (c) => {
  const session = c.get('session');
  if (!session) {
    return c.json(JSend.error('Invalid session'), 400);
  }

  await sessionsQueries.deleteSession(session.id);
  deleteCookie(c, 'session');
  return c.json(JSend.success(undefined, 'Successfully signed out'));
});
