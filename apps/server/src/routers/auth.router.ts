import { Hono } from 'hono';
import { deleteCookie, getCookie, setCookie } from 'hono/cookie';
import { uuidv7 } from 'uuidv7';

import { SessionsQueries, UsersQueries } from 'db';

import { type SignInSchema, type SignupSchema, zSignInSchema, zSignupSchema } from 'validation';

import { DateTZ, JSend } from 'common';

import { cache, database } from '../db';
import { validate } from '../middlware/validate';
import { passwordManager } from '../utils/PasswordManager';
import { cookieOptions } from '../utils/cookies';

export const authRouter = new Hono();

const usersQueries = new UsersQueries(database, cache);
const sessionsQueries = new SessionsQueries(database, cache);

authRouter.post('/signin', validate(zSignInSchema), async (c) => {
  const body = await c.req.json<SignInSchema>();

  const credentials = await usersQueries.getUserCredentials(body.email);
  if (!credentials) {
    return c.json(JSend.error('Invalid credentials'));
  }

  const isVerified = await passwordManager.verify(credentials.password, body.password);
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

authRouter.post('/signup', validate(zSignupSchema), async (c) => {
  const body = await c.req.json<SignupSchema>();

  const password = await passwordManager.hash(body.password);

  await usersQueries.createUser({ ...body, password });

  return c.json(JSend.success(undefined, 'User created successfully'));
});

authRouter.get('/signout', async (c) => {
  const sessionId = getCookie(c, 'session');
  if (!sessionId) {
    return c.json(JSend.error('Invalid session'));
  }

  await sessionsQueries.deleteSession(sessionId);
  deleteCookie(c, 'session');
});
