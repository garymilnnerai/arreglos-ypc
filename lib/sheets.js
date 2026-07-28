import { google } from 'googleapis';

const SHEET_ID = process.env.SHEET_ID;
const SHEET_NAME = 'Asignaciones';

function getAuth() {
  const credentials = JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON);
  return new google.auth.GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });
}

export async function readAssignments() {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    const [res1, res2] = await Promise.all([
      sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `${SHEET_NAME}!A2:F` }),
      sheets.spreadsheets.values.get({ spreadsheetId: SHEET_ID, range: `Contactos!A2:D` }).catch(() => ({ data: { values: [] } })),
    ]);
    const rows = res1.data.values || [];
    const assignments = {};
    rows.forEach(([date, bqNum, name, cong, tel, asamblea]) => {
      if (!date) return;
      if (asamblea === 'true') {
        assignments[date] = { asamblea: true };
      } else {
        assignments[date] = {
          bqNum: bqNum ? parseInt(bqNum) : null,
          name: name || '',
          cong: cong || '',
          tel: tel || '',
        };
      }
    });
    const contactRows = res2.data.values || [];
    const monthContacts = {};
    contactRows.forEach(([mcKey, name, cong, tel]) => {
      if (!mcKey) return;
      if (!monthContacts[mcKey]) monthContacts[mcKey] = [];
      monthContacts[mcKey].push({ name: name || '', cong: cong || '', tel: tel || '' });
    });
    return { assignments, monthContacts };
  } catch (e) {
    console.error('readAssignments error:', e);
    return { assignments: {}, monthContacts: {} };
  }
}

export async function writeAssignments(assignments, monthContacts = {}) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Write assignments
    await sheets.spreadsheets.values.clear({ spreadsheetId: SHEET_ID, range: `${SHEET_NAME}!A2:F` });
    const rows = Object.entries(assignments).map(([date, a]) => {
      if (a.asamblea) return [date, '', '', '', '', 'true'];
      return [date, a.bqNum || '', a.name || '', a.cong || '', a.tel || '', 'false'];
    });
    if (rows.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID, range: `${SHEET_NAME}!A2`,
        valueInputOption: 'RAW', requestBody: { values: rows },
      });
    }

    // Write contacts - try to create sheet if needed
    try {
      await sheets.spreadsheets.values.clear({ spreadsheetId: SHEET_ID, range: `Contactos!A2:D` });
    } catch {
      try {
        await sheets.spreadsheets.batchUpdate({
          spreadsheetId: SHEET_ID,
          requestBody: { requests: [{ addSheet: { properties: { title: 'Contactos' } } }] },
        });
        await sheets.spreadsheets.values.update({
          spreadsheetId: SHEET_ID, range: 'Contactos!A1:D1',
          valueInputOption: 'RAW', requestBody: { values: [['Mes', 'Nombre', 'Congregación', 'Teléfono']] },
        });
      } catch {}
    }
    const contactRows = [];
    Object.entries(monthContacts).forEach(([mcKey, contacts]) => {
      contacts.forEach(c => {
        if (c.name || c.cong || c.tel) contactRows.push([mcKey, c.name || '', c.cong || '', c.tel || '']);
      });
    });
    if (contactRows.length > 0) {
      await sheets.spreadsheets.values.update({
        spreadsheetId: SHEET_ID, range: 'Contactos!A2',
        valueInputOption: 'RAW', requestBody: { values: contactRows },
      });
    }

    return true;
  } catch (e) {
    console.error('writeAssignments error:', e);
    return false;
  }
}

export async function initSheet() {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });
    // Write headers
    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A1:F1`,
      valueInputOption: 'RAW',
      requestBody: {
        values: [['Fecha', 'Bosquejo Nro', 'Conferenciante', 'Congregación', 'Teléfono', 'Asamblea']],
      },
    });
    return true;
  } catch (e) {
    // Sheet tab might not exist yet — create it
    try {
      await sheets.spreadsheets.batchUpdate({
        spreadsheetId: SHEET_ID,
        requestBody: {
          requests: [{ addSheet: { properties: { title: SHEET_NAME } } }],
        },
      });
    } catch (_) {}
    return false;
  }
}