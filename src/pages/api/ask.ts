import { NextApiRequest, NextApiResponse } from 'next';
import { Message } from '~/hooks/useChat';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // todo -> query gpt
  const message: Message = { role: "assistant", content: "Hello from bot" }
  res.status(200).json(message);
}
