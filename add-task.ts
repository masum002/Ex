
import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../lib/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { userId, postUrl, reactionType, targetCount, cost } = req.body;
    const client = await clientPromise;
    const db = client.db('fb_exchange');

    // 1. Check user balance
    const user = await db.collection('users').findOne({ _id: userId });
    if (!user || user.coins < cost) {
      return res.status(400).json({ message: 'Insufficient coins' });
    }

    // 2. Deduct coins and add task in a transaction or atomic update
    await db.collection('users').updateOne(
      { _id: userId },
      { $inc: { coins: -cost } }
    );

    const newTask = {
      userId,
      postUrl,
      reactionType,
      targetCount,
      completedCount: 0,
      createdAt: new Date(),
      status: 'active'
    };

    const result = await db.collection('tasks').insertOne(newTask);

    return res.status(200).json({ success: true, taskId: result.insertedId });
  } catch (error) {
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
