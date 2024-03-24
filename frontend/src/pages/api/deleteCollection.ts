import { MongoClient, ObjectId, type Condition } from 'mongodb';
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

	// delete the collection document
	const result = await db.dropCollection(req.query.collection as string);

	await client.close();
	res.status(200).json(result);
}
