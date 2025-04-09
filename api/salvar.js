import { promises as fs } from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'data', 'logs.json');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    try {
      const newLog = req.body;
      const fileData = await fs.readFile(filePath, 'utf-8');
      const logs = JSON.parse(fileData);
      logs.push(newLog);
      await fs.writeFile(filePath, JSON.stringify(logs, null, 2));
      return res.status(200).json({ status: 'ok' });
    } catch (err) {
      console.error('Erro ao salvar:', err);
      return res.status(500).json({ error: 'Erro ao salvar os dados.' });
    }
  } else if (req.method === 'GET') {
    try {
      const fileData = await fs.readFile(filePath, 'utf-8');
      const logs = JSON.parse(fileData);
      return res.status(200).json(logs);
    } catch (err) {
      console.error('Erro ao ler:', err);
      return res.status(500).json({ error: 'Erro ao ler os dados.' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}