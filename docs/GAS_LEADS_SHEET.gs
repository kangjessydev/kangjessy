/**
 * ============================================================
 *  KANGJESSY LEADS COLLECTOR — Google Apps Script
 *  Version: 2.0 (Compatible with OrderCheckout + ProjectOrder + ContactForm)
 *  Last Updated: 2026-03-23
 * ============================================================
 *
 *  CARA INSTALL:
 *  1. Buka https://script.google.com
 *  2. Buat project baru → paste seluruh kode ini
 *  3. Simpan (Ctrl+S)
 *  4. Klik tombol RUN pada fungsi `setupSheet` SATU KALI untuk buat kolom header
 *  5. Klik Deploy → New Deployment
 *     - Type: Web App
 *     - Execute as: Me
 *     - Who has access: Anyone
 *  6. Copy URL deployment → paste ke .env sebagai VITE_GAS_WEBHOOK_URL
 * ============================================================
 */

// ── KONFIGURASI ──────────────────────────────────────────────
const SHEET_NAME = "Leads";         // Nama sheet tab
const LOG_SHEET  = "Error Logs";    // Sheet untuk log error

// Kolom header yang akan dibuat otomatis (URUTAN PENTING)
const COLUMNS = [
  "Timestamp",        // A - Waktu masuk (server time)
  "ID",               // B - Auto-generated ID dari frontend
  "Nama",             // C - name
  "Email",            // D - email
  "WhatsApp",         // E - phone
  "Perusahaan",       // F - company
  "Status",           // G - status (New, Hot, dll)
  "Tipe Inquiry",     // H - type (project_order / general_inquiry / proposal)
  "Paket / Layanan",  // I - project_type (starter-essential, dll)
  "Nama Proyek",      // J - project_name
  "Budget (Rp)",      // K - budget (angka)
  "Sumber",           // L - source (Direct Checkout, order_whatsapp, dll)
  "Brief",            // M - brief
  "Fitur Dipilih",    // N - features (array → joined string)
  "Gaya Visual",      // O - visual_style
  "Timeline",         // P - timeline
  "Domain Impian",    // Q - dream_domain
  "Link Referensi",   // R - ref_link
  "Voucher",          // S - voucher
  "Catatan",          // T - notes
  "Created At",       // U - created_at (ISO timestamp dari frontend)
];

// ── ENTRY POINT: Terima POST dari website ───────────────────
function doPost(e) {
  try {
    var rawBody = e.postData ? e.postData.contents : null;
    if (!rawBody) {
      return jsonResponse({ success: false, error: "Empty body" }, 400);
    }

    var data = JSON.parse(rawBody);
    saveLead(data);

    return jsonResponse({ success: true, message: "Lead saved!" });

  } catch (err) {
    logError("doPost", err.toString(), e ? (e.postData ? e.postData.contents : "no body") : "no event");
    return jsonResponse({ success: false, error: err.toString() }, 500);
  }
}

// ── ENTRY POINT: Terima GET (untuk test ping) ───────────────
function doGet(e) {
  return jsonResponse({ success: true, message: "KangJessy GAS Webhook is ALIVE 🟢", version: "2.0" });
}

// ── FUNGSI SIMPAN DATA ───────────────────────────────────────
function saveLead(data) {
  var ss    = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    setupHeaders(sheet);
  }

  // Pastikan header ada
  if (sheet.getLastRow() === 0) {
    setupHeaders(sheet);
  }

  // Bersihkan dan format features array
  var featuresStr = "-";
  if (data.features) {
    if (Array.isArray(data.features)) {
      // Array of strings atau array of objects
      featuresStr = data.features.map(function(f) {
        if (typeof f === "string") return f;
        if (typeof f === "object") return f.name || f.text || JSON.stringify(f);
        return String(f);
      }).filter(Boolean).join(", ") || "-";
    } else if (typeof data.features === "string") {
      featuresStr = data.features;
    }
  }

  // Format budget ke angka
  var budget = 0;
  if (data.budget) {
    budget = typeof data.budget === "number"
      ? data.budget
      : parseInt(String(data.budget).replace(/[^0-9]/g, "")) || 0;
  }

  // Susun baris sesuai urutan COLUMNS
  var row = [
    new Date(),                                       // A: Timestamp (server)
    data.id          || "lead-" + Date.now(),         // B: ID
    data.name        || "-",                          // C: Nama
    data.email       || "-",                          // D: Email
    data.phone       || "-",                          // E: WhatsApp
    data.company     || "-",                          // F: Perusahaan
    data.status      || "New",                        // G: Status
    data.type        || "project_order",              // H: Tipe Inquiry
    data.project_type || "-",                         // I: Paket / Layanan
    data.project_name || "-",                         // J: Nama Proyek
    budget,                                           // K: Budget (Rp)
    data.source      || "-",                          // L: Sumber
    data.brief       || "-",                          // M: Brief
    featuresStr,                                      // N: Fitur Dipilih
    data.visual_style || "-",                         // O: Gaya Visual
    data.timeline    || "-",                          // P: Timeline
    data.dream_domain || "-",                         // Q: Domain Impian
    data.ref_link    || "-",                          // R: Link Referensi
    data.voucher     || "-",                          // S: Voucher
    data.notes       || "-",                          // T: Catatan
    data.created_at  || new Date().toISOString(),     // U: Created At
  ];

  sheet.appendRow(row);

  // Auto-format kolom baru
  var lastRow = sheet.getLastRow();
  autoFormatRow(sheet, lastRow);

  Logger.log("Lead saved: " + (data.name || "Unknown"));
}

// ── SETUP: Buat / Reset Header ───────────────────────────────
function setupHeaders(sheet) {
  var headerRange = sheet.getRange(1, 1, 1, COLUMNS.length);
  headerRange.setValues([COLUMNS]);

  // Style header
  headerRange
    .setBackground("#1a1a2e")
    .setFontColor("#ffffff")
    .setFontWeight("bold")
    .setFontSize(10)
    .setHorizontalAlignment("center")
    .setVerticalAlignment("middle")
    .setWrap(true);

  sheet.setRowHeight(1, 40);

  // Lebar kolom optimal
  var colWidths = [130, 180, 150, 200, 130, 150, 80, 130, 160, 180, 120, 160, 250, 250, 120, 100, 150, 200, 100, 250, 160];
  for (var i = 0; i < colWidths.length; i++) {
    sheet.setColumnWidth(i + 1, colWidths[i]);
  }

  // Freeze header row
  sheet.setFrozenRows(1);

  Logger.log("Headers created on sheet: " + sheet.getName());
}

// ── FORMAT: Style baris data ─────────────────────────────────
function autoFormatRow(sheet, rowIndex) {
  var range = sheet.getRange(rowIndex, 1, 1, COLUMNS.length);

  // Alternating row colors
  if (rowIndex % 2 === 0) {
    range.setBackground("#f8f9fa");
  } else {
    range.setBackground("#ffffff");
  }

  range
    .setFontSize(10)
    .setVerticalAlignment("middle")
    .setWrap(false);

  // Kolom Budget (K) → format angka Rupiah
  var budgetCell = sheet.getRange(rowIndex, 11); // Column K = index 11
  budgetCell.setNumberFormat("\"Rp \"#,##0");
}

// ── SETUP SHEET: Jalankan sekali untuk init ──────────────────
/**
 * JALANKAN FUNGSI INI SATU KALI dari menu Apps Script Editor
 * untuk membuat sheet dengan header yang sudah diformat.
 */
function setupSheet() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();

  // Buat/reset Leads Sheet
  var leadsSheet = ss.getSheetByName(SHEET_NAME);
  if (!leadsSheet) {
    leadsSheet = ss.insertSheet(SHEET_NAME);
    Logger.log("Created new sheet: " + SHEET_NAME);
  } else {
    // Clear existing jika sudah ada (HATI-HATI: ini hapus semua data!)
    // leadsSheet.clearContents();
    Logger.log("Sheet already exists: " + SHEET_NAME);
  }

  setupHeaders(leadsSheet);

  // Buat Error Log sheet
  var logSheet = ss.getSheetByName(LOG_SHEET);
  if (!logSheet) {
    logSheet = ss.insertSheet(LOG_SHEET);
    logSheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Function", "Error", "Raw Body"]]);
    logSheet.getRange(1, 1, 1, 4).setBackground("#b91c1c").setFontColor("#ffffff").setFontWeight("bold");
    Logger.log("Created Error Log sheet");
  }

  // Tampilkan konfirmasi di UI
  SpreadsheetApp.getUi().alert(
    "✅ Setup Berhasil!\n\n" +
    "Sheet \"" + SHEET_NAME + "\" sudah siap dengan " + COLUMNS.length + " kolom.\n\n" +
    "Langkah selanjutnya:\n" +
    "1. Deploy → New Deployment → Web App\n" +
    "2. Execute as: Me\n" +
    "3. Who has access: Anyone\n" +
    "4. Copy URL → paste ke VITE_GAS_WEBHOOK_URL di .env"
  );
}

// ── HELPER: Error Logger ─────────────────────────────────────
function logError(fnName, errorMsg, rawBody) {
  try {
    var ss       = SpreadsheetApp.getActiveSpreadsheet();
    var logSheet = ss.getSheetByName(LOG_SHEET);
    if (!logSheet) {
      logSheet = ss.insertSheet(LOG_SHEET);
      logSheet.getRange(1, 1, 1, 4).setValues([["Timestamp", "Function", "Error", "Raw Body"]]);
    }
    logSheet.appendRow([new Date(), fnName, errorMsg, rawBody ? rawBody.substring(0, 500) : "-"]);
  } catch (e) {
    Logger.log("Error Logger failed: " + e.toString());
  }
}

// ── HELPER: JSON Response ────────────────────────────────────
function jsonResponse(obj, statusCode) {
  var output = ContentService.createTextOutput(JSON.stringify(obj));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}

// ── TEST MANUAL: Simulasi kiriman dari website ───────────────
/**
 * Jalankan fungsi ini untuk test tanpa harus deploy dulu.
 * Cek Google Sheet setelah run apakah baris baru masuk.
 */
function testSendLead() {
  var fakePayload = {
    id: "lead-" + Date.now(),
    name: "Budi Santoso",
    email: "budi@example.com",
    phone: "081234567890",
    company: "Toko Budi Digital",
    status: "New",
    type: "project_order",
    project_type: "business-growth",
    project_name: "Landing Page Toko Budi",
    budget: 4500000,
    source: "Direct Checkout",
    brief: "Ingin bikin landing page untuk jualan produk skincare",
    features: ["Payment Gateway", "Advanced SEO", "WhatsApp Chat Integration"],
    visual_style: "Modern Dark",
    timeline: "7-14 Hari",
    dream_domain: "tokobudi.com",
    ref_link: "https://example-ref.com",
    voucher: "PROMO2026",
    notes: "[Timeline: 7-14 Hari]\nSudah siap bayar DP",
    created_at: new Date().toISOString()
  };

  saveLead(fakePayload);

  SpreadsheetApp.getUi().alert("✅ Test berhasil! Cek sheet \"" + SHEET_NAME + "\" untuk melihat data dummy.");
  Logger.log("Test lead inserted.");
}
