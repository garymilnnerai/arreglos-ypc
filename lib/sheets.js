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
    const res = await sheets.spreadsheets.values.get({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:F`,
    });
    const rows = res.data.values || [];
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
    return assignments;
  } catch (e) {
    console.error('readAssignments error:', e);
    return {};
  }
}

export async function writeAssignments(assignments) {
  try {
    const auth = getAuth();
    const sheets = google.sheets({ version: 'v4', auth });

    // Clear existing data
    await sheets.spreadsheets.values.clear({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2:F`,
    });

    const rows = Object.entries(assignments).map(([date, a]) => {
      if (a.asamblea) return [date, '', '', '', '', 'true'];
      return [date, a.bqNum || '', a.name || '', a.cong || '', a.tel || '', 'false'];
    });

    if (rows.length === 0) return true;

    await sheets.spreadsheets.values.update({
      spreadsheetId: SHEET_ID,
      range: `${SHEET_NAME}!A2`,
      valueInputOption: 'RAW',
      requestBody: { values: rows },
    });

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
