import { Pool } from 'pg';
import sql from 'sql-template-strings';
import faker from 'faker';
import addMinutes from 'date-fns/addMinutes';
import { resetDb as envResetDb, fakedDb } from './env';

export type User = {
	id: string;
	name: string;
	username: string;
	password: string;
};

export type Message = {
	id: string;
	content: string;
	created_at: Date;
	chat_id: string;
	sender_user_id: string;
};

export type Chat = {
	id: string;
};

export const dbConfig = {
	host: 'localhost',
	port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
	user: 'testuser',
	password: 'testpassword',
	database: 'login',
};

export let pool: Pool = new Pool(dbConfig);

export async function initDb(): Promise<void> {
	// Clear tables
	await pool.query(sql`DROP TABLE IF EXISTS messages;`);
	await pool.query(sql`DROP TABLE IF EXISTS chats_users;`);
	await pool.query(sql`DROP TABLE IF EXISTS users;`);
	await pool.query(sql`DROP TABLE IF EXISTS chats;`);

	// Create tables
	await pool.query(sql`CREATE TABLE chats(
    id SERIAL PRIMARY KEY
  );`);
	await pool.query(sql`CREATE TABLE users(
    id SERIAL PRIMARY KEY,
    username VARCHAR (50) UNIQUE NOT NULL,
    name VARCHAR (50) NOT NULL,
    password VARCHAR (255) NOT NULL
  );`);
	await pool.query(sql`CREATE TABLE chats_users(
    chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );`);

	await pool.query(sql`CREATE TABLE messages(
    id SERIAL PRIMARY KEY,
    content VARCHAR (355) NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    chat_id INTEGER NOT NULL REFERENCES chats(id) ON DELETE CASCADE,
    sender_user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE
  );`);

	// Privileges
	await pool.query(
		sql`GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO testuser;`
	);
}

export const resetDb = async () => {
	await initDb();

	const sampleUsers = [
		{
			id: '1',
			name: 'Ray Edwards',
			username: 'ray',
			password: '$2a$08$NO9tkFLCoSqX1c5wk3s7z.JfxaVMKA.m7zUDdDwEquo4rvzimQeJm', // 111
		},
		{
			id: '2',
			name: 'Ethan Gonzalez',
			username: 'ethan',
			password: '$2a$08$xE4FuCi/ifxjL2S8CzKAmuKLwv18ktksSN.F3XYEnpmcKtpbpeZgO', // 222
		},
		{
			id: '3',
			name: 'Bryan Wallace',
			username: 'bryan',
			password: '$2a$08$UHgH7J8G6z1mGQn2qx2kdeWv0jvgHItyAsL9hpEUI3KJmhVW5Q1d.', // 333
		},
		{
			id: '4',
			name: 'Avery Stewart',
			username: 'avery',
			password: '$2a$08$wR1k5Q3T9FC7fUgB7Gdb9Os/GV7dGBBf4PLlWT7HERMFhmFDt47xi', // 444
		},
		{
			id: '5',
			name: 'Katie Peterson',
			username: 'katie',
			password: '$2a$08$6.mbXqsDX82ZZ7q5d8Osb..JrGSsNp4R3IKj7mxgF6YGT0OmMw242', // 555
		},
	];

	for (const sampleUser of sampleUsers) {
		await pool.query(sql`
      INSERT INTO users(id, name, username, password)
      VALUES(${sampleUser.id}, ${sampleUser.name}, ${sampleUser.username}, ${sampleUser.password})
    `);
	}

	await pool.query(
		sql`SELECT setval('users_id_seq', (SELECT max(id) FROM users))`
	);

	await pool.query(
		sql`SELECT setval('users_id_seq', (SELECT max(id) FROM users))`
	);
};

if (envResetDb) {
	resetDb();
}
