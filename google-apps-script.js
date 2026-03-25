// ============================================
// FIELD DAY STUDIOS — Contact Form Handler
// Google Apps Script
//
// SETUP INSTRUCTIONS:
// 1. Go to script.google.com and create a new project
// 2. Paste this entire file in, replacing any existing code
// 3. Update the three constants below with your details
// 4. Click Deploy > New deployment > Web app
//    - Execute as: Me
//    - Who has access: Anyone
// 5. Copy the web app URL and paste it into contact.html
//    where it says YOUR_GOOGLE_APPS_SCRIPT_URL_HERE
// ============================================

const YOUR_EMAIL       = 'eli@fielddaystudios.com'; // Where YOU receive notifications
const YOUR_NAME        = 'Eli Harvey';               // Your name for the auto-reply
const SHEET_NAME       = 'Inquiries';                // Tab name inside the Google Sheet


// ---- DO NOT EDIT BELOW THIS LINE ----

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1. Log to Google Sheet
    logToSheet(data);

    // 2. Email notification to Eli
    sendNotificationEmail(data);

    // 3. Auto-reply to the person who submitted
    sendAutoReply(data);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}


function logToSheet(data) {
  const ss    = SpreadsheetApp.getActiveSpreadsheet();
  let sheet   = ss.getSheetByName(SHEET_NAME);

  // Create sheet and headers if it doesn't exist yet
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_NAME);
    sheet.appendRow([
      'Timestamp',
      'Name',
      'Company',
      'Email',
      'How They Heard',
      'Message'
    ]);

    // Style header row
    const header = sheet.getRange(1, 1, 1, 6);
    header.setFontWeight('bold');
    header.setBackground('#1e3a2f');
    header.setFontColor('#f5f0e8');
    sheet.setFrozenRows(1);
    sheet.setColumnWidth(1, 160);
    sheet.setColumnWidth(4, 200);
    sheet.setColumnWidth(5, 200);
    sheet.setColumnWidth(6, 400);
  }

  sheet.appendRow([
    new Date(),
    data.name    || '',
    data.company || '',
    data.email   || '',
    data.source  || '',
    data.message || ''
  ]);
}


function sendNotificationEmail(data) {
  const subject = `New inquiry from ${data.name}${data.company ? ' at ' + data.company : ''}`;

  const body = `
Hi ${YOUR_NAME},

You have a new inquiry from your website.

——————————————————————
Name:     ${data.name}
Company:  ${data.company || 'Not provided'}
Email:    ${data.email}
Source:   ${data.source}

Message:
${data.message}
——————————————————————

Reply directly to this email to respond to ${data.name}.

— Field Day Studios
  `.trim();

  GmailApp.sendEmail(
    YOUR_EMAIL,
    subject,
    body,
    { replyTo: data.email }
  );
}


function sendAutoReply(data) {
  const firstName = data.name.split(' ')[0];

  const subject = `Got your message — talk soon`;

  const body = `
Hi ${firstName},

Thanks so much for reaching out — I really appreciate it.

I've received your message and I'll be in touch personally within one business day. In the meantime, if anything is time-sensitive, feel free to reply directly to this email.

Looking forward to connecting.

Warmly,
${YOUR_NAME}
Field Day Studios
${YOUR_EMAIL}
  `.trim();

  const htmlBody = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <style>
    body {
      font-family: Georgia, serif;
      font-size: 16px;
      color: #2c2c28;
      line-height: 1.7;
      background: #f5f0e8;
      margin: 0;
      padding: 0;
    }
    .wrapper {
      max-width: 560px;
      margin: 40px auto;
      background: #fefefe;
      border-radius: 4px;
      overflow: hidden;
      box-shadow: 0 2px 16px rgba(30,58,47,0.08);
    }
    .header {
      background: #1e3a2f;
      padding: 32px 40px;
    }
    .header h1 {
      font-family: Georgia, serif;
      font-size: 1.3rem;
      color: #f5f0e8;
      margin: 0;
      font-weight: normal;
      letter-spacing: -0.01em;
    }
    .header span {
      color: #8aab8a;
    }
    .body {
      padding: 40px;
    }
    .body p {
      margin: 0 0 18px;
      font-size: 0.97rem;
    }
    .body p:last-child { margin-bottom: 0; }
    .sig {
      margin-top: 32px;
      padding-top: 24px;
      border-top: 1px solid #c8dcc0;
      font-size: 0.88rem;
      color: #6b4c35;
    }
    .sig strong {
      display: block;
      color: #1e3a2f;
      font-size: 0.95rem;
      margin-bottom: 2px;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Field Day <span>Studios</span></h1>
    </div>
    <div class="body">
      <p>Hi ${firstName},</p>
      <p>Thanks so much for reaching out — I really appreciate it.</p>
      <p>I've received your message and I'll be in touch personally within one business day. In the meantime, if anything is time-sensitive, feel free to reply directly to this email.</p>
      <p>Looking forward to connecting.</p>
      <div class="sig">
        <strong>${YOUR_NAME}</strong>
        Field Day Studios<br/>
        <a href="mailto:${YOUR_EMAIL}" style="color: #4a7c59;">${YOUR_EMAIL}</a>
      </div>
    </div>
  </div>
</body>
</html>
  `.trim();

  GmailApp.sendEmail(
    data.email,
    subject,
    body,
    {
      htmlBody: htmlBody,
      name:     YOUR_NAME,
      replyTo:  YOUR_EMAIL
    }
  );
}
