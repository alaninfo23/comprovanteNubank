let logs = [];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    logs.push(req.body);
    return res.status(200).json({ status: 'ok' });
  } else {
    return res.status(200).json(logs);
  }
}