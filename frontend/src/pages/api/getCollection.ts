import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	const client = new MongoClient(process.env.MONGODB_URI || '');

	await client.connect();

	const db = client.db();
	const posts = await db
		.collection(req.query.collection as string)
		.find()
		.toArray();

	client.close();

	res.status(200).json(JSON.parse(JSON.stringify(posts)));
}
