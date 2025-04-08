import { writeFile, readFile } from 'fs/promises';
import { join } from 'path';

const logPath = join(process.cwd(), 'data', 'logs.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { lat, lon, timestamp } = req.body;
    const ip =
      req.headers['x-forwarded-for']?.split(',')[0] ||
      req.socket?.remoteAddress;
    const device = req.headers['user-agent'];

    let logs = [];
    try {
      const data = await readFile(logPath, 'utf-8');
      logs = JSON.parse(data);
    } catch (e) {
      logs = [];
    }

    logs.push({ lat, lon, timestamp, ip, device });

    await writeFile(logPath, JSON.stringify(logs, null, 2));
    return res.status(200).json({ status: 'ok' });
  } else {
    try {
      const data = await readFile(logPath, 'utf-8');
      const logs = JSON.parse(data);
      return res.status(200).json(logs);
    } catch {
      return res.status(200).json([]);
    }
  }
}
