function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = [];
  
  try {
    // Parse JSON
    var param = JSON.parse(e.postData.contents);
    
    // Header Mapping
    // [Date, Name, Email, Phone, Company, Type, Project Type, Budget, Source, Brief, Notes, Reference Link, Visual Style, Timeline, Dream Domain, Features, Voucher]
    
    data.push(new Date()); // timestamp
    data.push(param.name || '-');
    data.push(param.email || '-');
    data.push(param.phone || '-');
    data.push(param.company || '-');
    data.push(param.type || '-');
    data.push(param.project_type || '-');
    data.push(param.budget || 0);
    data.push(param.source || '-');
    data.push(param.brief || '-');
    data.push(param.notes || '-');
    data.push(param.ref_link || '-');
    data.push(param.visual_style || '-');
    data.push(param.timeline || '-');
    data.push(param.dream_domain || '-');
    data.push(param.features ? (Array.isArray(param.features) ? param.features.join(', ') : param.features) : '-');
    data.push(param.voucher || '-');

    sheet.appendRow(data);
    
    return ContentService.createTextOutput(JSON.stringify({ "result": "success", "row": sheet.getLastRow() }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ "result": "error", "error": error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
