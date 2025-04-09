let logs = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    logs.push(req.body);
    return res.status(200).json({ status: 'ok' });
  } else if (req.method === 'GET') {
    return res.status(200).json(logs);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
