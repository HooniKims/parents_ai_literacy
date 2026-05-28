# 등촌중학교 학부모 AI 윤리, 리터러시 교육 웹페이지

등촌중학교 학부모 대상 AI 윤리, 리터러시 교육 자료를 Canva 슬라이드로 보여주고, 학부모 참여 확인 서명을 받는 정적 웹페이지입니다.

## 파일 구조

```text
index.html
styles.css
script.js
signature-viewer.html
signature-viewer.css
signature-viewer.js
apps-script-guide.md
assets/images/school-logo.png
check.json
```

## Canva 링크 연결

`script.js` 상단의 `CONFIG` 값을 수정합니다.

```javascript
const CONFIG = {
  CANVA_EMBED_URL: "",
  CANVA_SHARE_URL: "",
  APPS_SCRIPT_URL: "",
  SLIDE_IMAGES: {
    ko: [],
    en: [],
  },
};
```

- `CANVA_EMBED_URL`: Canva 임베드 iframe 주소
- `CANVA_SHARE_URL`: 새 창에서 열 Canva 공유 링크
- `APPS_SCRIPT_URL`: Google Apps Script 웹앱 URL
- `SLIDE_IMAGES.ko`: 한국어 이미지 슬라이드 파일 목록
- `SLIDE_IMAGES.en`: 영어 이미지 슬라이드 파일 목록

Canva 링크가 비어 있으면 메인 페이지에는 준비 중 안내가 표시됩니다.

## 이미지 슬라이드로 보여주기

Canva 대신 슬라이드 이미지를 직접 보여줄 수 있습니다. 이미지는 아래 폴더에 넣습니다.

```text
assets/slides/
```

예시 파일명:

```text
assets/slides/ko/ko-slide-01-960.webp
assets/slides/ko/ko-slide-01-1920.webp
assets/slides/en/en-slide-01-960.webp
assets/slides/en/en-slide-01-1920.webp
```

그다음 `script.js` 상단의 `SLIDE_IMAGES`에 파일을 등록합니다.

```javascript
const CONFIG = {
  CANVA_EMBED_URL: "",
  CANVA_SHARE_URL: "",
  APPS_SCRIPT_URL: "",
  SLIDE_IMAGES: {
    ko: [
      {
        src: "assets/slides/ko/ko-slide-01-960.webp",
        srcset: "assets/slides/ko/ko-slide-01-960.webp 960w, assets/slides/ko/ko-slide-01-1920.webp 1920w",
        sizes: "(max-width: 840px) calc(100vw - 3rem), min(100vw - 5rem, 1120px)",
        fullSrc: "assets/slides/ko/ko-slide-01-1920.webp",
        title: "슬라이드 1",
        alt: "AI 윤리, 리터러시 교육 1번 슬라이드",
      },
    ],
    en: [
      {
        src: "assets/slides/en/en-slide-01-960.webp",
        srcset: "assets/slides/en/en-slide-01-960.webp 960w, assets/slides/en/en-slide-01-1920.webp 1920w",
        sizes: "(max-width: 840px) calc(100vw - 3rem), min(100vw - 5rem, 1120px)",
        fullSrc: "assets/slides/en/en-slide-01-1920.webp",
        title: "Slide 1",
        alt: "AI ethics and literacy education slide 1",
      },
    ],
  },
};
```

이미지 슬라이드가 1장 이상 등록되면 Canva 영역 대신 자체 슬라이드 뷰어가 표시됩니다. 모바일에서는 첫 진입 시 슬라이드가 살짝 움직이며 전체화면과 좌우 넘김을 안내합니다.

## 영어 보기 버튼

상단 우측의 `English` 버튼을 누르면 페이지 문구가 영어로 바뀝니다. 다시 `한국어` 버튼을 누르면 한국어로 돌아옵니다.

영어 이미지 슬라이드는 `SLIDE_IMAGES.en`에, 한국어 이미지 슬라이드는 `SLIDE_IMAGES.ko`에 등록합니다.

## 제출 데이터

Google Sheets에는 아래 항목이 저장되도록 설계했습니다.

```text
제출일시
학년
반
자녀이름
보호자성함
자료확인동의
개인정보동의
서명이미지
언어
```

학년과 반은 Apps Script에서 `학년 → 반 → 제출일시` 순으로 정렬합니다.

## 관리자용 서명 복원 페이지

관리자용 도구는 메인 페이지에 노출하지 않습니다.

```text
signature-viewer.html
```

Netlify 배포 후에는 아래 주소처럼 직접 접속합니다.

```text
https://배포주소.netlify.app/signature-viewer.html
```

Google Sheets의 `서명이미지` 셀 값을 붙여넣으면 이미지로 복원하고 PNG로 다운로드할 수 있습니다.

## Netlify 배포

별도 빌드 과정이 없는 정적 사이트입니다.

1. Netlify에서 새 사이트를 만듭니다.
2. 이 폴더를 업로드하거나 Git 저장소를 연결합니다.
3. 빌드 명령은 비워 둡니다.
4. 배포 폴더는 루트 폴더로 둡니다.

Netlify에서 필요한 설정은 없습니다. 단, Apps Script URL을 연결한 뒤 실제 제출이 Google Sheets에 저장되는지 한 번 테스트해야 합니다.

## 로컬 확인

```powershell
python -m http.server 8000
```

브라우저에서 아래 주소를 엽니다.

```text
http://localhost:8000/
```
