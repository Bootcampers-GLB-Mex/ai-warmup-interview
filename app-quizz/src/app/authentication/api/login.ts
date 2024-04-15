import type { NextApiRequest, NextApiResponse } from 'next'
import { login } from '../lib'
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await login(req.body)
  res.redirect(307, `/warmup`)
}
