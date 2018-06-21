import mongoist from 'mongoist';
import { ConfigEnv } from './config.js';
//let db = mongoist('mongodb://localhost:27017/BurnDownTracker', {});
let db = mongoist(ConfigEnv.connectionString, {});

export default db;
