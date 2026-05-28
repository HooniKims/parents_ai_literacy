# Google Sheets 및 Apps Script 연결 가이드

이 웹페이지는 정적 사이트이므로 참여 서명 데이터를 저장하려면 Google Sheets와 Apps Script 웹앱을 연결해야 합니다.
교육 자료는 Canva 링크가 아니라 `assets/slides/` 폴더의 이미지 파일을 직접 보여주는 방식으로 사용합니다.

Netlify 같은 정적 호스팅에서 Apps Script로 제출할 때는 브라우저 CORS 제한을 피하기 위해 `no-cors` 방식으로 전송합니다. 따라서 화면의 완료 메시지는 "요청 전송 완료" 기준이며, 실제 저장 여부는 Google Sheets에서 최종 확인합니다.

## 1. Google Sheets 만들기

1. Google Drive에서 새 스프레드시트를 만듭니다.
2. 시트 이름을 `참여서명`으로 바꿉니다.
3. 첫 행에는 아래 헤더를 넣습니다.

```text
제출일시 | 학년 | 반 | 자녀이름 | 보호자성함 | 자료확인동의 | 개인정보동의 | 서명이미지 | 언어
```

시트와 헤더는 Apps Script의 `시트 초기 설정` 메뉴로도 자동 생성할 수 있습니다.

## 2. Apps Script 코드 붙여넣기

1. Google Sheets 상단 메뉴에서 `확장 프로그램`을 누릅니다.
2. `Apps Script`를 선택합니다.
3. 기본 코드를 모두 지웁니다.
4. 이 프로젝트의 `apps-script-code.gs` 파일 내용을 전체 복사해서 붙여넣습니다.
5. 저장한 뒤 함수 목록에서 `menuSetupSheet`를 한 번 실행합니다.
6. 권한 승인 창이 나오면 승인합니다.

`apps-script-code.gs`에는 이 프로젝트의 제출 필드에 맞춘 서버 코드가 들어 있습니다.

- 제출 시트 자동 생성
- 헤더, 고정 행, 열 너비 설정
- 학년, 반, 이름, 동의 여부, 서명 이미지 서버 검증
- 같은 `학년 + 반 + 자녀이름 + 보호자성함` 조합은 기존 행 갱신
- `Asia/Seoul` 기준 제출일시 저장
- 학년, 반, 제출일시 순서로 자동 정렬

## 3. 웹앱으로 배포하기

1. Apps Script 우측 상단의 `배포`를 누릅니다.
2. `새 배포`를 선택합니다.
3. 유형은 `웹 앱`을 선택합니다.
4. 실행 권한은 `나`로 둡니다.
5. 액세스 권한은 `모든 사용자`로 설정합니다.
6. 배포 후 표시되는 웹앱 URL을 복사합니다.

코드를 수정한 뒤에는 기존 웹앱 URL이 자동으로 최신 코드가 되지 않을 수 있습니다. 그때는 `배포 > 배포 관리 > 수정 > 새 버전`으로 다시 배포합니다.

## 4. 웹페이지에 Apps Script URL 넣기

`script.js` 상단의 `APPS_SCRIPT_URL`에 복사한 웹앱 URL을 넣습니다.

```javascript
const CONFIG = {
  CANVA_EMBED_URL: "",
  CANVA_SHARE_URL: "",
  APPS_SCRIPT_URL: "여기에_Apps_Script_웹앱_URL",
  SLIDE_IMAGES: {
    ko: makeSlideImages("ko", "ko-slide", "슬라이드", "AI 윤리, 리터러시 교육 슬라이드"),
    en: makeSlideImages("en", "en-slide", "Slide", "AI ethics and literacy education slide"),
  },
};
```

`CANVA_EMBED_URL`과 `CANVA_SHARE_URL`은 빈 문자열로 둡니다. 직접 이미지 슬라이드를 쓰는 경우 Canva 링크는 넣지 않습니다.

## 5. 교육 자료 이미지를 직접 넣기

현재 `script.js`는 한국어 12장, 영어 12장을 아래 파일명 규칙으로 자동 불러오도록 설정되어 있습니다.

```text
assets/slides/ko/ko-slide-01-960.webp
assets/slides/ko/ko-slide-01-1920.webp
assets/slides/ko/ko-slide-02-960.webp
assets/slides/ko/ko-slide-02-1920.webp
...
assets/slides/ko/ko-slide-12-960.webp
assets/slides/ko/ko-slide-12-1920.webp

assets/slides/en/en-slide-01-960.webp
assets/slides/en/en-slide-01-1920.webp
...
assets/slides/en/en-slide-12-960.webp
assets/slides/en/en-slide-12-1920.webp
```

각 슬라이드는 모바일/미리보기용 `960.webp`와 전체화면용 `1920.webp` 두 가지 크기로 넣는 것을 권장합니다.

영어 자료를 사용하지 않을 경우에도 영어 전환 버튼을 유지하려면 `assets/slides/en/`에도 이미지가 있어야 합니다. 영어 이미지를 준비하지 않을 계획이면 `script.js`에서 영어 전환 버튼 또는 `SLIDE_IMAGES.en` 설정을 별도로 정리해야 합니다.

## 6. 서명 복원하기

1. Google Sheets에서 `서명이미지` 셀 값을 복사합니다.
2. Netlify 배포 주소 뒤에 `/signature-viewer.html`을 붙여 접속합니다.
3. 복사한 값을 붙여넣고 `이미지 복원`을 누릅니다.
4. 필요한 경우 `PNG 다운로드`를 누릅니다.

예시:

```text
https://배포주소.netlify.app/signature-viewer.html
```
