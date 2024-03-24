import { MongoClient } from 'mongodb';
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse,
) {
	// check for secret key password
	if (req.headers.authorization !== process.env.SECRET_KEY) {
		return res.status(401).json({ message: 'Not Authorized' });
	}

	const client = new MongoClient((process.env.MONGODB_URI as string) || '');

	await client.connect();

	const db = client.db();

	// insert new post into the collection
	const result = await db
		.collection(req.query.collection as string)
		.insertOne(req.body);

	await client.close();
	res.status(200).json(result.acknowledged);
}
