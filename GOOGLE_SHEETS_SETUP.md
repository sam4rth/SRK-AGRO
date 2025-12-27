# Google Sheets Integration Setup Instructions

## Step 1: Deploy Google Apps Script

1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1v2_Y7356JyR2sPUJ77D-kCAB7C5N4I2LeOILaxGRt0A/edit

2. Click **Extensions** > **Apps Script**

3. Delete any existing code in the editor

4. Copy the code from `google-apps-script-code.js` and paste it into the Apps Script editor

5. Save the project (Press `Ctrl+S` or `Cmd+S`, or click the Save icon)

6. Click **Deploy** > **New deployment**

7. Click the gear icon (⚙️) next to "Select type" and choose **"Web app"**

8. Configure the deployment:
   - **Execute as**: "Me" (your email address)
   - **Who has access**: "Anyone" (important for public form submissions)

9. Click **"Deploy"**

10. **Copy the Web App URL** that appears (it will look like: `https://script.google.com/macros/s/...`)

## Step 2: Configure the JavaScript File

1. Open `assets/js/google-sheets-submit.js`

2. Find this line:
   ```javascript
   const SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```

3. Replace `YOUR_GOOGLE_APPS_SCRIPT_URL_HERE` with the Web App URL you copied in Step 1

4. Save the file

## Step 3: Test the Form

1. Open `contact.html` in your browser

2. Fill out the form with test data:
   - Name: Test Name
   - Contact: 1234567890
   - Subject: Test Subject
   - Message: Test Message

3. Click Submit

4. Check your Google Sheet - you should see the new row with your test data

## Troubleshooting

- **If the form shows an error**: Make sure the Web App URL is correctly pasted in `google-sheets-submit.js`
- **If data doesn't appear in the sheet**: Check that the Apps Script deployment has "Who has access" set to "Anyone"
- **If you get CORS errors**: Make sure you deployed as a Web app (not an API executable) and set access to "Anyone"

## Notes

- The script will append new rows to your sheet starting from row 2 (assuming row 1 has headers)
- Column order in the sheet should be: name, contact, subject, message
- Each form submission adds a new row to the bottom of your data

