import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const client = new MongoClient(
		`mongodb://root:${process.env.NEXT_PUBLIC_DATABASE_PASSWORD}@mongo:27017/fence`,
	);

	await client.connect();

	const db = client.db();
	const posts = await db
		.collection(req.query.collection as string)
		.find()
		.toArray();

	client.close();

	res.status(200).json(JSON.parse(JSON.stringify(posts)));
}
