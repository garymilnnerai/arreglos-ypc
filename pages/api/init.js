import { initSheet } from '../../lib/sheets';

export default async function handler(req, res) {
  const pwd = req.headers['x-password'] || '';
  if (pwd !== (process.env.ADMIN_PWD || 'YPC-620')) {
    return res.status(401).json({ error: 'No autorizado' });
  }
  await initSheet();
  return res.status(200).json({ success: true });
}
