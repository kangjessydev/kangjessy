// ============================================================
//  KANGJESSY AGENCY - Google Apps Script Backend
//  Copy-paste seluruh file ini ke Apps Script editor
//  Jalankan fungsi setupSheets() SATU KALI untuk inisialisasi
//  Lalu Deploy sebagai Web App (Access: Anyone)
// ============================================================

// ---- KONFIGURASI ----
var SPREADSHEET_ID = ''; // Kosongkan jika script ditaruh di dalam spreadsheet itu sendiri
var SHEET_ORDERS_NAME = 'Orders';
var SHEET_CONSULTATIONS_NAME = 'Consultations';

var ORDERS_HEADERS = [
  'Timestamp',
  'Nama',
  'Email',
  'Telepon',
  'Perusahaan',
  'Status',
  'Tipe Klien',
  'Tipe Proyek',
  'Budget (Rp)',
  'Fitur Dipilih',
  'Timeline',
  'Visual Style',
  'Domain Impian',
  'Voucher',
  'Brief',
  'Ref Link',
  'Source',
  'Notes'
];

var CONSULTATIONS_HEADERS = [
  'Timestamp',
  'Nama',
  'Telepon',
  'Layanan Diminati',
  'Pesan / Brief',
  'Metode Submit',
  'Source'
];

// ---- SETUP: Jalankan ini SATU KALI untuk membuat sheet & header ----
function setupSheets() {
  var ss = SPREADSHEET_ID
    ? SpreadsheetApp.openById(SPREADSHEET_ID)
    : SpreadsheetApp.getActiveSpreadsheet();

  // --- Orders Sheet ---
  var ordersSheet = ss.getSheetByName(SHEET_ORDERS_NAME);
  if (!ordersSheet) {
    ordersSheet = ss.insertSheet(SHEET_ORDERS_NAME);
  }
  if (ordersSheet.getLastRow() === 0) {
    ordersSheet.appendRow(ORDERS_HEADERS);
    ordersSheet.getRange(1, 1, 1, ORDERS_HEADERS.length)
      .setBackground('#1a73e8')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
    ordersSheet.setFrozenRows(1);
    ordersSheet.autoResizeColumns(1, ORDERS_HEADERS.length);
  }

  // --- Consultations Sheet ---
  var consultSheet = ss.getSheetByName(SHEET_CONSULTATIONS_NAME);
  if (!consultSheet) {
    consultSheet = ss.insertSheet(SHEET_CONSULTATIONS_NAME);
  }
  if (consultSheet.getLastRow() === 0) {
    consultSheet.appendRow(CONSULTATIONS_HEADERS);
    consultSheet.getRange(1, 1, 1, CONSULTATIONS_HEADERS.length)
      .setBackground('#0f9d58')
      .setFontColor('#ffffff')
      .setFontWeight('bold');
    consultSheet.setFrozenRows(1);
    consultSheet.autoResizeColumns(1, CONSULTATIONS_HEADERS.length);
  }

  Logger.log('✅ Setup selesai! Sheet Orders dan Consultations siap digunakan.');
}

// ---- MAIN: Handle POST Request dari website ----
function doPost(e) {
  try {
    var param = JSON.parse(e.postData.contents);

    // Tentukan tipe submission: order atau consultation
    var type = param.type || 'general_inquiry';
    var isOrder = (type === 'project_order');

    var ss = SPREADSHEET_ID
      ? SpreadsheetApp.openById(SPREADSHEET_ID)
      : SpreadsheetApp.getActiveSpreadsheet();

    // Auto-setup jika sheet belum ada
    setupSheets();

    var now = new Date();
    var row = [];

    if (isOrder) {
      // --- ORDERS TAB ---
      var sheet = ss.getSheetByName(SHEET_ORDERS_NAME);
      var features = param.features
        ? (Array.isArray(param.features) ? param.features.join(', ') : String(param.features))
        : '-';

      row = [
        now,
        param.name         || '-',
        param.email        || '-',
        param.phone        || '-',
        param.company      || '-',
        param.status       || 'New',
        param.type         || '-',
        param.project_type || '-',
        param.budget       || 0,
        features,
        param.timeline     || '-',
        param.visual_style || '-',
        param.dream_domain || '-',
        param.voucher      || '-',
        param.brief        || '-',
        param.ref_link     || '-',
        param.source       || 'web_order',
        param.notes        || '-'
      ];
      sheet.appendRow(row);

    } else {
      // --- CONSULTATIONS TAB ---
      var sheet = ss.getSheetByName(SHEET_CONSULTATIONS_NAME);

      row = [
        now,
        param.name         || '-',
        param.phone        || '-',
        param.project_type || '-',
        param.brief        || param.notes || '-',
        param.source       || '-',
        'web_contact'
      ];
      sheet.appendRow(row);
    }

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success', timestamp: now }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', error: err.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// ---- GET: Health check (opsional) ----
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', message: 'KangJessy GAS Backend is running!' }))
    .setMimeType(ContentService.MimeType.JSON);
}
