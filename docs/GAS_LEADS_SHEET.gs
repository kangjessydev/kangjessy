/**
 * ============================================================
 *  KANGJESSY CRM STRUCTURED (Ironclad Loop Guard)
 *  Version: 19.2 (Zero Loop Guarantee)
 *  Last Updated: 2026-03-24
 * ============================================================
 */

const LEADS_SHEET_NAME       = "Leads";
const TRANSACTIONS_SHEET_NAME = "Transactions";
const SETTINGS_SHEET_NAME     = "Settings";

const COLUMN = {
  TIMESTAMP: 1, ID: 2, NAMA: 3, EMAIL: 4, WA: 5, PERUSAHAAN: 6,
  STATUS_LEAD: 7, TIPE_INQUIRY: 8, PAKET: 9, BUDGET: 10,
  SUMBER: 11, BRIEF: 12, PROYEK: 13, VISUAL_STYLE: 14, TIMELINE: 15,
  FITUR_PROYEK: 16, DOMAIN: 17, REFERAL_LINK: 18, INFO_PROMO: 19, CATATAN: 20,
  INTERNAL_CREATED: 21
};

const TRX_COLUMN = {
  TANGGAL: 1, LEAD_ID: 2, NAMA: 3, TIPE_BAYAR: 4, JUMLAH: 5, METODE: 6, KETERANGAN: 7
};

// ── TRIGGER ──────────────────────────────────────────────────
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🚀 CRM ULTIMATE")
    .addItem("⚙️ Setup Sistem", "setupStructuredSystem")
    .addItem("🔄 Sync Semua Dropdown", "syncAllSettings")
    .addToUi();
}

function onEdit(event) {
  var activeSheet = event.source.getActiveSheet();
  var sheetName = activeSheet.getName();
  var row = event.range.getRow();
  var col = event.range.getColumn();
  if (row < 2) return;

  // 🛡️ GUARD UTAMA: Jika mengedit kolom sistem di sheet Leads, BERHENTI (Anti-Loop)
  if (sheetName === LEADS_SHEET_NAME) {
    if ([COLUMN.TIMESTAMP, COLUMN.ID, COLUMN.INTERNAL_CREATED].includes(col)) return;

    // 1. Jika Input Nama Client
    if (col === COLUMN.NAMA && event.value && !event.oldValue) {
      if (!activeSheet.getRange(row, COLUMN.ID).getValue()) {
        activeSheet.getRange(row, COLUMN.TIMESTAMP).setValue(new Date()).setNumberFormat("dd/mm/yyyy HH:mm");
        activeSheet.getRange(row, COLUMN.ID).setValue("KJ-" + new Date().getTime());
        activeSheet.getRange(row, COLUMN.INTERNAL_CREATED).setValue(new Date().toISOString());
        activeSheet.getRange(row, 1, 1, 21).setBackground(row % 2 === 0 ? "#f8fafc" : "#ffffff");
        activeSheet.getRange(row, COLUMN.BUDGET) .setNumberFormat('"Rp "#,##0');
      }
    }
    
    // 2. Jika Klik Kolom Fitur Proyek
    if (col === COLUMN.FITUR_PROYEK) {
      showFiturMultipleChoice();
    }
  }
}

// ── FITUR PICKER (MULTIPLE CHOICE) ──────────────────────────
function showFiturMultipleChoice() {
  var html = HtmlService.createHtmlOutput(
    '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/tailwindcss/2.2.19/tailwind.min.css">' +
    '<div class="p-6 font-sans"><h3 class="font-bold mb-4 text-blue-900">Pilih Fitur Proyek:</h3>' +
    '<div id="container" class="space-y-1 mb-6 text-sm overflow-y-auto max-h-48 border p-3 rounded-xl bg-gray-50 uppercase tracking-tighter"></div>' +
    '<button onclick="save()" class="w-full bg-blue-800 text-white p-3 rounded-xl font-black shadow-xl">SIMPAN</button></div>' +
    '<script>' +
    ' google.script.run.withSuccessHandler(options => {' +
    '   const c = document.getElementById("container");' +
    '   options.forEach(opt => c.innerHTML += `<label class="flex items-center gap-3 p-1 hover:bg-white rounded cursor-pointer border-b border-gray-100 last:border-0"><input type="checkbox" class="w-4 h-4 text-blue-800" value="${opt}"> <span class="text-xs font-bold leading-none">${opt}</span></label>`);' +
    ' }).getFiturOptionsFromSettings();' +
    ' function save() {' +
    '   const sel = Array.from(document.querySelectorAll("input:checked")).map(i => i.value).join(", ");' +
    '   google.script.run.withSuccessHandler(() => google.script.host.close()).saveFiturToActiveCell(sel);' +
    ' }' +
    '</script>'
  ).setWidth(350).setHeight(400);
  SpreadsheetApp.getUi().showModalDialog(html, "📊 Multiple Choice Fitur");
}

function getFiturOptionsFromSettings() {
  var ss = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SETTINGS_SHEET_NAME);
  if (!ss || ss.getLastRow() < 2) return ["Opsi Belum Diatur"];
  return ss.getRange(2, 8, ss.getLastRow() - 1, 1).getValues().flat().filter(function(v) { return v !== ""; });
}

function saveFiturToActiveCell(val) {
  SpreadsheetApp.getActiveSpreadsheet().getActiveSheet().getActiveCell().setValue(val);
}

// ── SYNC SETTINGS ───────────────────────────────────────────
function syncAllSettings() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheetSettings = spreadsheet.getSheetByName(SETTINGS_SHEET_NAME);
  var sheetLeads    = spreadsheet.getSheetByName(LEADS_SHEET_NAME);
  var sheetTrx      = spreadsheet.getSheetByName(TRANSACTIONS_SHEET_NAME);
  
  if (!sheetSettings || !sheetLeads || !sheetTrx) return;
  if (sheetSettings.getLastRow() < 2) return;

  var settingsData = sheetSettings.getRange(2, 1, sheetSettings.getLastRow() - 1, 8).getValues();
  var config = { status:[], tipe:[], paket:[], visual:[], timeline:[], metode:[], sumber:[] };
  
  settingsData.forEach(function(row) {
    if(row[0]) config.status.push(row[0]); if(row[1]) config.tipe.push(row[1]); if(row[2]) config.paket.push(row[2]);
    if(row[3]) config.visual.push(row[3]); if(row[4]) config.timeline.push(row[4]); if(row[5]) config.metode.push(row[5]);
    if(row[6]) config.sumber.push(row[6]);
  });

  const applyV = (sheet, col, list) => {
    if (!list || list.length === 0) return;
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(list).setAllowInvalid(false).build();
    sheet.getRange(2, col, sheet.getMaxRows() - 1, 1).setDataValidation(rule);
  };

  applyV(sheetLeads, COLUMN.STATUS_LEAD, config.status);
  applyV(sheetLeads, COLUMN.TIPE_INQUIRY, config.tipe);
  applyV(sheetLeads, COLUMN.PAKET, config.paket);
  applyV(sheetLeads, COLUMN.VISUAL_STYLE, config.visual);
  applyV(sheetLeads, COLUMN.TIMELINE, config.timeline);
  applyV(sheetLeads, COLUMN.SUMBER, config.sumber);
  applyV(sheetTrx, TRX_COLUMN.METODE, config.metode);
  applyV(sheetTrx, TRX_COLUMN.TIPE_BAYAR, ["DP", "Lunas", "Diskon"]);

  syncLeadsDataToTransactions(sheetLeads, sheetTrx);
}

function syncLeadsDataToTransactions(sheetLeads, sheetTrx) {
  if (sheetLeads.getLastRow() < 2) return;
  var leadsData = sheetLeads.getRange(2, COLUMN.ID, sheetLeads.getLastRow() - 1, 2).getValues();
  var clientList = leadsData.map(function(row) { return row[1] + " (" + row[0] + ")"; }).filter(function(v) { return v !== " ()"; });
  
  if (clientList.length > 0) {
    var rule = SpreadsheetApp.newDataValidation().requireValueInList(clientList).setAllowInvalid(false).build();
    sheetTrx.getRange(2, TRX_COLUMN.NAMA, sheetTrx.getMaxRows() - 1, 1).setDataValidation(rule);
  }
}

// ── SETUP ────────────────────────────────────────────────────
function setupStructuredSystem() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  
  var sheetLeads = spreadsheet.getSheetByName(LEADS_SHEET_NAME) || spreadsheet.insertSheet(LEADS_SHEET_NAME);
  var leadsHeaders = [['Timestamp','ID','Nama Client','Email','WhatsApp','Perusahaan','Status Lead','Tipe Inquiry','Paket','Budget','Sumber','Brief','Proyek','Visual Style','Timeline','Fitur Proyek','Domain','Referal Link','Info Promo','Catatan','Internal Created']];
  sheetLeads.clear().getRange(1, 1, 1, 21).setValues(leadsHeaders).setBackground('#0f172a').setFontColor('#fff').setFontWeight('bold');
  sheetLeads.setFrozenRows(1);
  
  var sheetTrx = spreadsheet.getSheetByName(TRANSACTIONS_SHEET_NAME) || spreadsheet.insertSheet(TRANSACTIONS_SHEET_NAME);
  var trxHeaders = [['Tanggal','ID Lead','Nama Client (Dropdown)','Tipe Bayar','Jumlah','Metode Bayar','Keterangan']];
  sheetTrx.clear().getRange(1, 1, 1, 7).setValues(trxHeaders).setBackground('#1e40af').setFontColor('#fff').setFontWeight('bold');
  sheetTrx.setFrozenRows(1);
  sheetTrx.getRange("A2:A").setNumberFormat("dd/mm/yyyy");
  sheetTrx.getRange("E2:E").setNumberFormat('"Rp "#,##0');

  var sheetSettings = spreadsheet.getSheetByName(SETTINGS_SHEET_NAME) || spreadsheet.insertSheet(SETTINGS_SHEET_NAME);
  var settingsHeaders = [['Status Lead','Tipe Inquiry','Daftar Paket','Visual Style','Timeline','Metode Bayar','Sumber','Daftar Fitur']];
  sheetSettings.clear().getRange(1, 1, 1, 8).setValues(settingsHeaders).setBackground('#4f46e5').setFontColor('#fff');
  sheetSettings.getRange(2, 1, 3, 8).setValues([["New","Project","Starter","Modern","1 Minggu","BCA","IG","SEO"],["Won ✅","Proposal","Elite","Bold","2-4 Minggu","QRIS","Referral","CMS"],["Lost ❌","Inquiry","Custom","Minimalist","1 Bulan","Cash","Web","Shop"]]);
  
  syncAllSettings();
  SpreadsheetApp.getUi().alert("✅ Sistem Structured 19.2 FIXED BERHASIL! Looping telah dimatikan selamanya.");
}
