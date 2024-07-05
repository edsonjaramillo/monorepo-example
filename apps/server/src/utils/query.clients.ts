import { ImagesQueries, SessionsQueries, UsersQueries } from 'db';

import { cache, database } from '../server.clients';

export const imagesQueries = new ImagesQueries(database, cache);
export const sessionsQueries = new SessionsQueries(database, cache);
export const usersQueries = new UsersQueries(database, cache);
