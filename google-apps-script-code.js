/**
 * Google Apps Script Code
 * 
 * INSTRUCTIONS:
 * 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1v2_Y7356JyR2sPUJ77D-kCAB7C5N4I2LeOILaxGRt0A/edit
 * 2. Click Extensions > Apps Script
 * 3. Delete any existing code in the editor
 * 4. Copy and paste the code below into the editor
 * 5. Save the project (Ctrl+S or Cmd+S)
 * 6. Click Deploy > New deployment
 * 7. Click the gear icon next to "Select type" and choose "Web app"
 * 8. Set "Execute as" to "Me"
 * 9. Set "Who has access" to "Anyone"
 * 10. Click "Deploy"
 * 11. Copy the Web App URL that appears
 * 12. Paste that URL in assets/js/google-sheets-submit.js replacing 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'
 */

function doGet(e) {
  // Handle GET requests (e.g., when accessing the web app URL directly)
  return ContentService
    .createTextOutput('This web app accepts POST requests only. Please submit the form.')
    .setMimeType(ContentService.MimeType.TEXT);
}

function doPost(e) {
  try {
    // Get the active spreadsheet (change the ID if needed)
    const sheetId = '1v2_Y7356JyR2sPUJ77D-kCAB7C5N4I2LeOILaxGRt0A';
    const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
    
    // Check if sheet is empty, add headers if needed
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['name', 'contact', 'subject', 'message']);
    }
    
    // Parse form-urlencoded POST data
    const postData = e.parameter || {};
    
    // Extract form fields - matching your spreadsheet columns: name, contact, subject, message
    const name = postData.name || '';
    const contact = postData.contact || '';
    const subject = postData.subject || '';
    const message = postData.message || '';
    
    // Append the row to the sheet (data starts after header row)
    sheet.appendRow([name, contact, subject, message]);
    
    // Return success response
    return ContentService
      .createTextOutput('success')
      .setMimeType(ContentService.MimeType.TEXT);
      
  } catch (error) {
    // Return error response
    return ContentService
      .createTextOutput('error: ' + error.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// Optional: Test function to verify the script works
function testPost() {
  const mockEvent = {
    parameter: {
      name: 'Test User',
      contact: '1234567890',
      subject: 'Test Subject',
      message: 'Test Message'
    }
  };
  
  const result = doPost(mockEvent);
  Logger.log(result.getContent());
}

// Optional: Function to manually add headers if needed
function addHeaders() {
  const sheetId = '1v2_Y7356JyR2sPUJ77D-kCAB7C5N4I2LeOILaxGRt0A';
  const sheet = SpreadsheetApp.openById(sheetId).getActiveSheet();
  
  // Clear the sheet and add headers
  sheet.clear();
  sheet.appendRow(['name', 'contact', 'subject', 'message']);
  Logger.log('Headers added successfully');
}

