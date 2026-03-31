/**
 * ============================================================
 *  E-BOOK LEADS WEBHOOK (KANGJESSY) - EXCLUSIVE EMAIL DELIVERY
 *  Berfungsi mencatat downloader dan mengirim link Ebook 
 *  MURNI melalui email (User tidak bisa auto-download di web).
 * ============================================================
 */

const SHEET_NAME = "Ebook_Leads";
const EBOOK_LINK = "https://drive.google.com/uc?export=download&id=1QBhluermMwukc3ODBJAPOABNT4B_fPO4";
const MAX_PROMO_DOWNLOADS = 100;

function setupEbookSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_NAME);
  
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    const headers = [["ID", "Waktu", "Sumber", "Email", "Status Email"]];
    sheet.getRange(1, 1, 1, headers[0].length)
         .setValues(headers)
         .setBackground("#3b82f6")
         .setFontColor("#ffffff")
         .setFontWeight("bold");
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(2, 160);
    sheet.setColumnWidth(4, 250);
  }
  return sheet;
}

function doPost(e) {
  try {
    const sheet = setupEbookSheet();
    const data = JSON.parse(e.postData.contents);
    const email = data.email ? data.email.trim().toLowerCase() : "";
    const source = data.info || "Web Ebook Form";
    const timestamp = new Date();

    if (!email) {
      return ContentService.createTextOutput(JSON.stringify({ status: "error", message: "Email required" })).setMimeType(ContentService.MimeType.JSON);
    }

    const lastRow = sheet.getLastRow();
    
    // -----------------------------------------------------------------
    // 1. CEK DUPLIKAT EMAIL & AMBIL ID LAMA
    // -----------------------------------------------------------------
    let isDuplicate = false;
    let assignedId = "";
    let downloadNumber = 0;

    if (lastRow > 1) {
      const existingData = sheet.getRange(2, 1, lastRow - 1, 4).getValues(); // [ID, Waktu, Sumber, Email]
      for (let i = 0; i < existingData.length; i++) {
        if (String(existingData[i][3]).toLowerCase() === email) {
          isDuplicate = true;
          assignedId = existingData[i][0]; // Ambil ID aslinya
          const idNumStr = assignedId.toString().replace(/\D/g, '');
          downloadNumber = parseInt(idNumStr) || 0;
          break;
        }
      }
    }

    // -----------------------------------------------------------------
    // 2. GENERATE ID BARU & MASUKKAN KE SPREADSHEET (JIKA BUKAN DUPLIKAT)
    // -----------------------------------------------------------------
    let insertedRow = -1;

    if (!isDuplicate) {
      if (lastRow > 1) {
        const lastIdStr = sheet.getRange(lastRow, 1).getValue().toString();
        const lastNumMth = lastIdStr.replace(/\D/g, ''); 
        if (lastNumMth) {
          downloadNumber = parseInt(lastNumMth) + 1;
        } else {
          downloadNumber = 1;
        }
      } else {
        downloadNumber = 1;
      }

      assignedId = "EV-" + ("0000" + downloadNumber).slice(-4);
      
      // Catat ke Database Admin
      sheet.appendRow([assignedId, timestamp, source, email, "Sending..."]);
      insertedRow = sheet.getLastRow();
      sheet.getRange(insertedRow, 2).setNumberFormat("dd/MM/yyyy HH:mm:ss");
    }


    // -----------------------------------------------------------------
    // 3. KIRIM EMAIL BALASAN BERISI LINK (SELALU DIKIRIM)
    // -----------------------------------------------------------------
    const sisaKuota = MAX_PROMO_DOWNLOADS - downloadNumber;
    let teksPromo = "";
    if (sisaKuota > 0) {
      teksPromo = `<p>🎉 Selamat! Kamu masuk sebagai 1 dari 100 pengunduh beruntung (Kuota tersisa: <b>${sisaKuota} orang</b>).</p>`;
    } else {
      teksPromo = `<p>Terima kasih telah bergabung menjadi pembaca setia kami. Kamu adalah pengunduh ke-${downloadNumber}.</p>`;
    }

    const subject = `Akses E-Book Anda: Vibe Coding Masterclass [${assignedId}]`;
    
    let promoText = "";
    if (sisaKuota > 0 && !isDuplicate) {
      promoText = `<p style="font-size: 13px; color: #94a3b8; text-align: center; margin-bottom: 0;">Promo eksklusif: Tersisa ${sisaKuota} slot gratis untuk edisi pertama ini.</p>`;
    }
    
    let duplicateText = "";
    if (isDuplicate) {
      duplicateText = `<p style="font-size: 13px; color: #fbbf24; background: rgba(251, 191, 36, 0.1); padding: 12px; border-radius: 6px; border: 1px solid rgba(251, 191, 36, 0.3);">Pemberitahuan: Sistem kami mendeteksi Anda telah memiliki akses ke dokumen ini sebelumnya. Tautan ini dikirim ulang untuk memudahkan akses Anda.</p>`;
    }

    let htmlBody = `
      <div style="background-color: #0f172a; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; color: #cbd5e1;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #1e293b; border-radius: 12px; overflow: hidden; border: 1px solid #334155;">
          
          <!-- Header -->
          <div style="padding: 30px; border-bottom: 1px solid #334155; text-align: center;">
            <h2 style="color: #ffffff; margin: 0; font-size: 24px; letter-spacing: -0.5px;">VIBE CODING MASTERCLASS</h2>
            <p style="color: #3b82f6; font-size: 12px; letter-spacing: 2px; text-transform: uppercase; margin-top: 5px; font-weight: bold;">FREE EDITION</p>
          </div>

          <!-- Body Content -->
          <div style="padding: 30px;">
            <h3 style="color: #ffffff; font-size: 18px; margin-top: 0;">Halo Rekan Developer,</h3>
            <p style="line-height: 1.6; font-size: 15px;">Akses E-book Vibe Coding Anda sudah siap. Anda adalah pengunduh ke-${downloadNumber} yang tergabung dalam ruang lingkup pengembangan web berbasis otomatisasi AI.</p>
            
            <div style="text-align: center; margin: 35px 0;">
              <a href="${EBOOK_LINK}" style="background-color: #3b82f6; color: #ffffff; padding: 14px 28px; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 16px; display: inline-block;">
                Download E-Book Sekarang
              </a>
            </div>

            <!-- Duplicate Info or Quota Info -->
            ${promoText}
            ${duplicateText}
            
          </div>

          <!-- Upsell Section -->
          <div style="background-color: #0f172a; padding: 30px; border-top: 1px solid #334155;">
            <div style="background: linear-gradient(145deg, rgba(59,130,246,0.1) 0%, rgba(139,92,246,0.1) 100%); border: 1px solid rgba(59,130,246,0.2); border-radius: 10px; padding: 25px;">
              <span style="background-color: rgba(59,130,246,0.2); color: #60a5fa; font-size: 11px; font-weight: bold; padding: 4px 8px; border-radius: 4px; text-transform: uppercase; letter-spacing: 1px;">Rekomendasi Upgrade</span>
              <h3 style="color: #ffffff; margin: 15px 0 10px; font-size: 20px;">Vibe Coding: Premium Complete Bundle</h3>
              <p style="font-size: 14px; line-height: 1.6; margin-bottom: 20px;">Edisi gratis di atas berfokus pada fundamental dasar. Di versi Premium, Anda akan dipandu end-to-end membangun sistem kompleks layaknya Software House profesional beserta seluruh Source Code.</p>
              
              <p style="color: #ffffff; font-weight: 600; font-size: 14px; margin-bottom: 12px;">Materi Eksklusif Premium:</p>
              <ul style="font-size: 14px; line-height: 1.6; padding-left: 20px; color: #cbd5e1; margin-bottom: 25px;">
                <li style="margin-bottom: 8px;">Integrasi Payment Gateway (Midtrans & Stripe) mutakhir.</li>
                <li style="margin-bottom: 8px;">Logika pengembangan AI Agent & fungsi Chat RAG internal.</li>
                <li style="margin-bottom: 8px;">Penerapan Arsitektur Monorepo & Sistem Autentikasi ketat.</li>
                <li style="margin-bottom: 8px;">Folder lengkap Source Code Proyek nyata siap dirilis.</li>
              </ul>

              <div style="margin-bottom: 20px; display: table; width: 100%;">
                <div style="display: table-cell; vertical-align: middle;">
                   <span style="color: #94a3b8; text-decoration: line-through; font-size: 14px;">Rp 499.000</span><br>
                   <span style="color: #ffffff; font-size: 24px; font-weight: bold;">Rp 349.000</span>
                </div>
                <div style="display: table-cell; vertical-align: middle; text-align: right;">
                   <span style="background-color: #1e293b; color: #cbd5e1; border: 1px dashed #475569; padding: 6px 12px; border-radius: 6px; font-size: 13px; font-weight: bold;">Voucher: VIBE30</span>
                </div>
              </div>

              <a href="https://kangjessy.com" style="display: block; text-align: center; background-color: #ffffff; color: #0f172a; padding: 14px; text-decoration: none; border-radius: 8px; font-weight: bold; font-size: 15px; margin-top: 10px;">
                Pelajari Versi Premium
              </a>
            </div>
          </div>

          <!-- Footer -->
          <div style="padding: 20px 30px; text-align: center; border-top: 1px solid #334155;">
            <p style="color: #64748b; font-size: 12px; line-height: 1.5; margin: 0;">
              Otomasi ini diproses oleh sistem <strong>KangJessy Developer Ecosystem</strong>.<br>
              <a href="https://kangjessy.com" style="color: #3b82f6; text-decoration: none;">www.kangjessy.com</a> | Copyright &copy; 2026
            </p>
          </div>
          
        </div>
      </div>
    `;

    // Eksekusi pengiriman email
    MailApp.sendEmail({
      to: email,
      subject: subject,
      htmlBody: htmlBody
    });

    // Perbarui status pengiriman jika itu data baru
    if (!isDuplicate && insertedRow > -1) {
      sheet.getRange(insertedRow, 5).setValue("Pesan Terkirim ✅");
    }

    return ContentService.createTextOutput(JSON.stringify({ 
      status: "success", 
      message: "Berhasil dicatat dan email terkirim!" 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ 
      status: "error", 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function doOptions(e) {
  return ContentService.createTextOutput("OK").setMimeType(ContentService.MimeType.TEXT);
}
