const SHEET_NAME = "참여서명";
const TIMEZONE = "Asia/Seoul";
const HEADERS = [
  "제출일시",
  "학년",
  "반",
  "자녀이름",
  "보호자성함",
  "자료확인동의",
  "개인정보동의",
  "서명이미지",
  "언어",
];

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("참여 서명 관리")
    .addItem("시트 초기 설정", "menuSetupSheet")
    .addItem("서명 시트 정렬", "menuSortSheet")
    .addToUi();
}

function menuSetupSheet() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    "시트 초기 설정",
    "참여서명 시트의 헤더, 고정 행, 열 너비를 설정합니다. 기존 제출 데이터는 삭제하지 않습니다.",
    ui.ButtonSet.OK_CANCEL
  );

  if (response !== ui.Button.OK) {
    return;
  }

  const sheet = setupSheet_();
  sortSheet_(sheet);
  ui.alert("완료되었습니다.");
}

function menuSortSheet() {
  const sheet = setupSheet_();
  sortSheet_(sheet);
  SpreadsheetApp.getUi().alert("정렬이 완료되었습니다.");
}

function doGet() {
  return ContentService
    .createTextOutput(JSON.stringify({ ok: true, app: "parent-ai-literacy-signature" }))
    .setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const sheet = setupSheet_();
    const data = parsePostData_(e);
    const row = buildSubmissionRow_(data);
    const existingRow = findExistingRow_(sheet, data);

    if (existingRow) {
      sheet.getRange(existingRow, 1, 1, HEADERS.length).setValues([row]);
    } else {
      sheet.appendRow(row);
    }

    sortSheet_(sheet);

    return ContentService
      .createTextOutput(JSON.stringify({ ok: true, updated: Boolean(existingRow) }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ ok: false, message: error.message }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    try {
      lock.releaseLock();
    } catch (error) {
      // lock 획득 전에 오류가 난 경우를 대비합니다.
    }
  }
}

function setupSheet_() {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.setFrozenRows(1);
  sheet.getRange(1, 1, 1, HEADERS.length)
    .setFontWeight("bold")
    .setBackground("#0f766e")
    .setFontColor("#ffffff")
    .setHorizontalAlignment("center");

  sheet.setColumnWidths(1, 1, 150);
  sheet.setColumnWidths(2, 2, 70);
  sheet.setColumnWidths(4, 2, 110);
  sheet.setColumnWidths(6, 2, 110);
  sheet.setColumnWidths(8, 1, 320);
  sheet.setColumnWidths(9, 1, 70);

  return sheet;
}

function parsePostData_(e) {
  if (!e || !e.postData || !e.postData.contents) {
    throw new Error("제출 데이터가 비어 있습니다.");
  }

  return JSON.parse(e.postData.contents);
}

function buildSubmissionRow_(data) {
  const grade = toIntegerInRange_(data.grade, 1, 3, "학년");
  const classNumber = toIntegerInRange_(data.classNumber, 1, 6, "반");
  const studentName = normalizeName_(data.studentName, "자녀 이름");
  const guardianName = normalizeName_(data.guardianName, "보호자 성함");

  if (data.materialConfirmed !== true) {
    throw new Error("자료 확인 동의가 필요합니다.");
  }

  if (data.privacyAgreed !== true) {
    throw new Error("개인정보 수집 동의가 필요합니다.");
  }

  if (!String(data.signatureImage || "").startsWith("data:image/png;base64,")) {
    throw new Error("보호자 서명이 필요합니다.");
  }

  return [
    Utilities.formatDate(new Date(), TIMEZONE, "yyyy-MM-dd HH:mm:ss"),
    grade,
    classNumber,
    studentName,
    guardianName,
    "Y",
    "Y",
    data.signatureImage,
    data.language === "en" ? "en" : "ko",
  ];
}

function findExistingRow_(sheet, data) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) {
    return 0;
  }

  const grade = Number(data.grade);
  const classNumber = Number(data.classNumber);
  const studentName = String(data.studentName || "").trim();
  const guardianName = String(data.guardianName || "").trim();
  const values = sheet.getRange(2, 2, lastRow - 1, 4).getValues();

  for (let index = 0; index < values.length; index += 1) {
    const row = values[index];
    if (
      Number(row[0]) === grade &&
      Number(row[1]) === classNumber &&
      String(row[2]).trim() === studentName &&
      String(row[3]).trim() === guardianName
    ) {
      return index + 2;
    }
  }

  return 0;
}

function toIntegerInRange_(value, min, max, label) {
  const number = Number(value);
  if (!Number.isInteger(number) || number < min || number > max) {
    throw new Error(`${label} 값이 올바르지 않습니다.`);
  }
  return number;
}

function normalizeName_(value, label) {
  const text = String(value || "").trim();
  if (!text) {
    throw new Error(`${label}을 입력해야 합니다.`);
  }

  if (/[0-9!@#$%^&*()_+=\[\]{};:"\\|,.<>/?`~]/.test(text)) {
    throw new Error(`${label}에는 문자만 입력할 수 있습니다.`);
  }

  return text;
}

function sortSheet_(sheet) {
  const lastRow = sheet.getLastRow();
  const lastColumn = sheet.getLastColumn();
  if (lastRow <= 2) {
    return;
  }

  sheet
    .getRange(2, 1, lastRow - 1, lastColumn)
    .sort([
      { column: 2, ascending: true },
      { column: 3, ascending: true },
      { column: 1, ascending: true },
    ]);
}
