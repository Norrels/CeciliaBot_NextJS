// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios'
import type { NextApiRequest, NextApiResponse } from 'next'

interface TwitterTrendsProps {
  trends: [{
      name: string
    }]
}

const TWITTER_TOKEN = process.env.TWITTER_TOKEN

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<String[]>
) {
  const respon = await axios.get('https://api.twitter.com/1.1/trends/place.json?id=23424768', {
    headers: { authorization: `Bearer ${TWITTER_TOKEN}` }
  })

  const resp: TwitterTrendsProps = respon.data[0]
  const response = resp.trends.slice(0, 5).map((trend) => { return trend.name })

  res.status(200).json(response)
}
