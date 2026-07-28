import { readAssignments, writeAssignments, initSheet } from '../../lib/sheets';

const ADMIN_PWD = process.env.ADMIN_PWD || 'YPC-620';
const COLAB_PWD = process.env.COLAB_PWD || 'conf-ypc';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const pwd = req.headers['x-password'] || '';
  const isAdmin = pwd === ADMIN_PWD;
  const isColab = pwd === COLAB_PWD;

  if (!isAdmin && !isColab) {
    return res.status(401).json({ error: 'No autorizado' });
  }

  if (req.method === 'GET') {
    const data = await readAssignments();
    return res.status(200).json({ assignments: data.assignments, monthContacts: data.monthContacts, role: isAdmin ? 'admin' : 'colab' });
  }

  if (req.method === 'POST') {
    const { assignments, monthContacts } = req.body;
    if (!assignments) return res.status(400).json({ error: 'Sin datos' });
    const ok = await writeAssignments(assignments, monthContacts || {});
    if (ok) return res.status(200).json({ success: true });
    return res.status(500).json({ error: 'Error al guardar' });
  }

  return res.status(405).json({ error: 'Método no permitido' });
}