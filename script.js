(function () {
  function makeSlideImages(folder, prefix, titlePrefix, altPrefix) {
    return Array.from({ length: 12 }, (_, index) => {
      const number = index + 1;
      const fileNumber = String(number).padStart(2, "0");
      const basePath = `assets/slides/${folder}/${prefix}-${fileNumber}`;
      return {
        src: `${basePath}-960.webp`,
        srcset: `${basePath}-960.webp 960w, ${basePath}-1920.webp 1920w`,
        sizes: "(max-width: 840px) calc(100vw - 3rem), min(100vw - 5rem, 1120px)",
        fullSrc: `${basePath}-1920.webp`,
        title: `${titlePrefix} ${number}`,
        alt: `${altPrefix} ${number}`,
      };
    });
  }

  const CONFIG = {
    CANVA_EMBED_URL: "",
    CANVA_SHARE_URL: "",
    APPS_SCRIPT_URL:
      "https://script.google.com/macros/s/AKfycbwYKXA_dPOpVhEtgur0EzNdFEymzBAT1_Ik04ioyHfyv3JC_kYK2mCfQIqrO11vKgWv/exec",
    SLIDE_IMAGES: {
      ko: makeSlideImages("ko", "ko-slide", "슬라이드", "AI 윤리, 리터러시 교육 슬라이드"),
      en: makeSlideImages("en", "en-slide", "Slide", "AI ethics and literacy education slide"),
    },
    ...(window.PARENT_AI_PAGE_CONFIG || {}),
  };

  const TRANSLATIONS = {
    ko: {
      languageButton: "English",
      htmlLang: "ko",
      pageTitle: "등촌중학교 학부모 AI 윤리, 리터러시 교육",
      schoolMark: "등촌중",
      navBrand: "학부모 AI 교육",
      navSlides: "교육 자료",
      navSignature: "참여 서명",
      heroEyebrow: "AI Ethics & Literacy",
      heroTitleLine1: "등촌중학교",
      heroTitleLine2: "학부모 AI 윤리, 리터러시 교육",
      heroLead:
        "학부모님께서는 아래의 AI 윤리, 리터러시 교육 자료를 확인하신 후, 페이지 하단에서 참여 확인 서명을 완료해 주시기 바랍니다.",
      heroPrimary: "자료 확인하기",
      heroSecondary: "서명하러 가기",
      schoolName: "등촌중학교",
      todayKicker: "Today",
      todayItem1: "AI 윤리, 리터러시 교육 자료 확인",
      todayItem2: "자녀 정보 및 보호자 성함 입력",
      todayItem3: "보호자 서명 제출",
      slidesKicker: "Education Material",
      slidesTitle: "AI 윤리, 리터러시 교육 자료",
      slidesDescriptionCanva: "Canva 슬라이드가 연결되면 아래 영역에서 바로 확인하실 수 있습니다.",
      slidesDescriptionImages:
        "슬라이드를 탭하면 전체화면으로 크게 볼 수 있고, 좌우로 넘겨 다음 자료를 확인할 수 있습니다.",
      placeholderKicker: "Canva slide",
      placeholderTitle: "교육 자료 연결 준비 중",
      placeholderBody: "Canva 링크가 준비되면 이 영역에서 슬라이드를 바로 확인하실 수 있습니다.",
      openCanva: "새 창에서 슬라이드 보기",
      slidePreviewFallback: "교육 자료 슬라이드",
      slideAlt: "AI 윤리, 리터러시 교육 자료 {number}번 슬라이드",
      slideTitle: "슬라이드 {number}",
      slideHintTitle: "탭해서 크게 보기",
      slideHintBody: "좌우로 넘겨 다음 자료 보기",
      previous: "이전",
      next: "다음",
      dotLabel: "{number}번 슬라이드 보기",
      viewerCaptionSwipe: "좌우로 넘겨보세요",
      viewerCaptionSingle: "탭한 자료를 크게 보는 중입니다",
      viewerClose: "닫기",
      viewerTipReady: "가능한 기기에서는 자동으로 가로보기로 전환됩니다",
      viewerTipLocked: "가로보기로 전환되었습니다",
      viewerTipLimited: "이 기기에서는 자동 회전이 제한됩니다",
      formKicker: "Confirmation",
      formTitle: "참여 확인 및 보호자 서명",
      formDescription: "교육 자료 확인 후 아래 정보를 입력하고 서명해 주세요.",
      gradeLabel: "자녀 학년",
      classLabel: "자녀 반",
      selectPlaceholder: "선택",
      grade1: "1학년",
      grade2: "2학년",
      grade3: "3학년",
      class1: "1반",
      class2: "2반",
      class3: "3반",
      class4: "4반",
      class5: "5반",
      class6: "6반",
      studentNameLabel: "자녀 이름",
      guardianNameLabel: "보호자 성함",
      materialConfirmed: "AI 윤리, 리터러시 교육 자료를 확인했습니다.",
      privacyAgreed:
        "위 정보는 등촌중학교 학부모 AI 윤리, 리터러시 교육 참여 확인을 위해 수집되며, 교육 참여 확인 목적 외에는 사용되지 않습니다.",
      signatureKicker: "Signature",
      signatureTitle: "보호자 서명",
      clearSignature: "서명 지우기",
      submitButton: "참여 확인 서명 제출",
      resubmitButton: "다시 제출하기",
      footerTitle: "등촌중학교 학부모 AI 윤리, 리터러시 교육",
      toTop: "맨 위로 이동",
      msgSignatureCleared: "서명을 지웠습니다.",
      msgMissingClass: "자녀의 학년과 반을 선택해 주세요.",
      msgMissingNames: "자녀 이름과 보호자 성함을 입력해 주세요.",
      msgTextOnly: "이름은 문자만 입력해 주세요.",
      msgMissingChecks: "자료 확인 및 개인정보 수집 이용 항목에 체크해 주세요.",
      msgMissingSignature: "보호자 서명을 입력해 주세요.",
      msgSubmitting: "제출 중입니다.",
      msgAppsMissing: "Apps Script URL이 아직 연결되지 않았습니다. 연결 후 실제 저장이 가능합니다.",
      msgSubmitted: "참여 확인 서명이 제출되었습니다. 감사합니다.",
      msgSubmitError: "제출 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.",
      msgResubmit: "내용을 수정한 뒤 다시 제출할 수 있습니다.",
    },
    en: {
      languageButton: "한국어",
      htmlLang: "en",
      pageTitle: "Deungchon Middle School Parent AI Ethics and Literacy Education",
      schoolMark: "DCMS",
      navBrand: "Parent AI Education",
      navSlides: "Materials",
      navSignature: "Sign",
      heroEyebrow: "AI Ethics & Literacy",
      heroTitleLine1: "Deungchon Middle School",
      heroTitleLine2: "Parent AI Ethics and Literacy Education",
      heroLead:
        "Please review the AI ethics and literacy materials below, then complete the participation confirmation and guardian signature at the bottom of the page.",
      heroPrimary: "View Materials",
      heroSecondary: "Go to Signature",
      schoolName: "Deungchon Middle School",
      todayKicker: "Today",
      todayItem1: "Review the AI ethics and literacy materials",
      todayItem2: "Enter student and guardian information",
      todayItem3: "Submit the guardian signature",
      slidesKicker: "Education Material",
      slidesTitle: "AI Ethics and Literacy Materials",
      slidesDescriptionCanva: "Once the Canva slides are connected, you can view them directly below.",
      slidesDescriptionImages:
        "Tap a slide to view it fullscreen, then swipe left or right to move through the materials.",
      placeholderKicker: "Canva slide",
      placeholderTitle: "Education materials will be added soon",
      placeholderBody: "Once the Canva link is ready, the slides will appear in this area.",
      openCanva: "Open Slides in a New Window",
      slidePreviewFallback: "Education material slide",
      slideAlt: "AI ethics and literacy education slide {number}",
      slideTitle: "Slide {number}",
      slideHintTitle: "Tap to enlarge",
      slideHintBody: "Swipe left or right for more slides",
      previous: "Previous",
      next: "Next",
      dotLabel: "View slide {number}",
      viewerCaptionSwipe: "Swipe left or right",
      viewerCaptionSingle: "Viewing the selected material fullscreen",
      viewerClose: "Close",
      viewerTipReady: "Supported devices will switch to landscape automatically",
      viewerTipLocked: "Landscape view enabled",
      viewerTipLimited: "Automatic rotation is limited on this device",
      formKicker: "Confirmation",
      formTitle: "Participation Confirmation and Guardian Signature",
      formDescription: "After reviewing the materials, enter the information below and sign.",
      gradeLabel: "Student Grade",
      classLabel: "Student Class",
      selectPlaceholder: "Select",
      grade1: "Grade 1",
      grade2: "Grade 2",
      grade3: "Grade 3",
      class1: "Class 1",
      class2: "Class 2",
      class3: "Class 3",
      class4: "Class 4",
      class5: "Class 5",
      class6: "Class 6",
      studentNameLabel: "Student Name",
      guardianNameLabel: "Guardian Name",
      materialConfirmed: "I have reviewed the AI ethics and literacy education materials.",
      privacyAgreed:
        "This information will be collected only to confirm participation in Deungchon Middle School's parent AI ethics and literacy education, and will not be used for any other purpose.",
      signatureKicker: "Signature",
      signatureTitle: "Guardian Signature",
      clearSignature: "Clear Signature",
      submitButton: "Submit Participation Signature",
      resubmitButton: "Submit Again",
      footerTitle: "Deungchon Middle School Parent AI Ethics and Literacy Education",
      toTop: "Back to Top",
      msgSignatureCleared: "The signature has been cleared.",
      msgMissingClass: "Please select the student's grade and class.",
      msgMissingNames: "Please enter the student name and guardian name.",
      msgTextOnly: "Names can contain letters only.",
      msgMissingChecks: "Please keep the material confirmation and privacy consent checked.",
      msgMissingSignature: "Please enter the guardian signature.",
      msgSubmitting: "Submitting.",
      msgAppsMissing: "The Apps Script URL has not been connected yet. Data can be saved after it is connected.",
      msgSubmitted: "The participation signature has been submitted. Thank you.",
      msgSubmitError: "An error occurred while submitting. Please try again later.",
      msgResubmit: "You can edit the information and submit again.",
    },
  };

  const canvaStage = document.querySelector("[data-canva-stage]");
  const canvaPlaceholder = document.querySelector("[data-canva-placeholder]");
  const canvaShare = document.querySelector("[data-canva-share]");
  const canvaActions = document.querySelector("[data-canva-actions]");
  const slideDescription = document.querySelector("[data-slide-description]");
  const imageSlider = document.querySelector("[data-image-slider]");
  const slidePreview = document.querySelector("[data-open-slide-viewer]");
  const slidePreviewImage = document.querySelector("[data-slide-preview-image]");
  const slidePeekImage = document.querySelector("[data-slide-peek-image]");
  const slidePreviewTitle = document.querySelector("[data-slide-preview-title]");
  const slidePreviewCount = document.querySelector("[data-slide-preview-count]");
  const slideDots = document.querySelector("[data-slide-dots]");
  const previewPrev = document.querySelector("[data-preview-prev]");
  const previewNext = document.querySelector("[data-preview-next]");
  const slideViewer = document.querySelector("[data-slide-viewer]");
  const viewerImage = document.querySelector("[data-viewer-image]");
  const viewerCounter = document.querySelector("[data-viewer-counter]");
  const viewerCaption = document.querySelector("[data-viewer-caption]");
  const viewerTip = document.querySelector("[data-viewer-tip]");
  const viewerPrev = document.querySelector("[data-viewer-prev]");
  const viewerNext = document.querySelector("[data-viewer-next]");
  const closeSlideViewer = document.querySelector("[data-close-slide-viewer]");
  const languageToggle = document.querySelector("[data-language-toggle]");
  const i18nNodes = document.querySelectorAll("[data-i18n]");
  const progressBar = document.querySelector("[data-progress]");
  const form = document.querySelector("[data-signature-form]");
  const textOnlyInputs = document.querySelectorAll("[data-text-only]");
  const canvas = document.querySelector("[data-signature-pad]");
  const clearButton = document.querySelector("[data-clear-signature]");
  const message = document.querySelector("[data-form-message]");
  const submitButton = document.querySelector("[data-submit-button]");
  const resubmitButton = document.querySelector("[data-resubmit-button]");

  const textOnlyPattern = /[^\p{L}\s]/gu;
  let drawing = false;
  let hasSignature = false;
  let lastPoint = null;
  let composingText = false;
  let currentLanguage = "ko";
  let currentSlideIndex = 0;
  let slideViewerOpen = false;
  let slideScrollY = 0;
  let swipeStart = null;
  let previewSwipeStart = null;
  let suppressPreviewClick = false;
  let viewerTipTimer = 0;
  let viewerScale = 1;
  let viewerTranslateX = 0;
  let viewerTranslateY = 0;
  let viewerPointers = new Map();
  let viewerPanStart = null;
  let viewerPinchStart = null;
  let viewerLastTapAt = 0;
  let viewerLastZoomToggleAt = 0;

  function t(key, replacements = {}) {
    const dictionary = TRANSLATIONS[currentLanguage] || TRANSLATIONS.ko;
    const fallback = TRANSLATIONS.ko[key] || key;
    return String(dictionary[key] || fallback).replace(/\{(\w+)\}/g, (_, token) =>
      replacements[token] === undefined ? "" : replacements[token]
    );
  }

  function slideSourceForLanguage() {
    if (Array.isArray(CONFIG.SLIDE_IMAGES)) {
      return CONFIG.SLIDE_IMAGES;
    }

    return CONFIG.SLIDE_IMAGES[currentLanguage] || CONFIG.SLIDE_IMAGES.ko || [];
  }

  function normalizedSlides() {
    return slideSourceForLanguage().map((slide, index) => {
    if (typeof slide === "string") {
      return {
        src: slide,
        srcset: "",
        sizes: "",
        fullSrc: slide,
        alt: t("slideAlt", { number: index + 1 }),
        title: t("slideTitle", { number: index + 1 }),
      };
    }

    return {
      src: slide.src,
      srcset: slide.srcset || "",
      sizes: slide.sizes || "",
      fullSrc: slide.fullSrc || slide.src,
      alt: slide.alt || t("slideAlt", { number: index + 1 }),
      title: slide.title || t("slideTitle", { number: index + 1 }),
    };
    }).filter((slide) => slide.src);
  }

  let slides = normalizedSlides();

  function applyLanguage(language) {
    currentLanguage = language;
    document.documentElement.lang = t("htmlLang");
    document.title = t("pageTitle");
    languageToggle.textContent = t("languageButton");
    languageToggle.setAttribute("aria-label", t("languageButton"));

    i18nNodes.forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });

    const title = document.querySelector(".hero-title");
    if (title) {
      title.setAttribute("aria-label", `${t("heroTitleLine1")} ${t("heroTitleLine2")}`);
    }

    const hintTitle = document.querySelector("[data-slide-hint] span");
    const hintBody = document.querySelector("[data-slide-hint] small");
    if (hintTitle) {
      hintTitle.textContent = t("slideHintTitle");
    }
    if (hintBody) {
      hintBody.textContent = t("slideHintBody");
    }

    previewPrev.textContent = t("previous");
    previewNext.textContent = t("next");
    viewerPrev.setAttribute("aria-label", t("previous"));
    viewerNext.setAttribute("aria-label", t("next"));
    previewPrev.setAttribute("aria-label", t("previous"));
    previewNext.setAttribute("aria-label", t("next"));
    closeSlideViewer.setAttribute("aria-label", t("viewerClose"));

    slides = normalizedSlides();
    currentSlideIndex = Math.min(currentSlideIndex, Math.max(slides.length - 1, 0));
    setupSlideMode();
    updateSlideUi();
  }

  function showMessage(text, type) {
    message.textContent = text;
    message.classList.toggle("is-error", type === "error");
    message.classList.toggle("is-success", type === "success");
  }

  function updateProgress() {
    if (!progressBar) {
      return;
    }

    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const progress = scrollable <= 0 ? 0 : window.scrollY / scrollable;
    progressBar.style.width = `${Math.min(Math.max(progress, 0), 1) * 100}%`;
  }

  function setupCanva() {
    if (CONFIG.CANVA_EMBED_URL && canvaStage) {
      const iframe = document.createElement("iframe");
      iframe.src = CONFIG.CANVA_EMBED_URL;
      iframe.title = `${t("pageTitle")} Canva slide`;
      iframe.loading = "lazy";
      iframe.allowFullscreen = true;
      iframe.setAttribute("allow", "fullscreen");
      canvaPlaceholder?.remove();
      canvaStage.appendChild(iframe);
    }

    if (CONFIG.CANVA_SHARE_URL && canvaShare) {
      canvaShare.href = CONFIG.CANVA_SHARE_URL;
      canvaShare.classList.remove("is-disabled");
      canvaShare.removeAttribute("aria-disabled");
    } else if (canvaShare) {
      canvaShare.href = "#slides";
      canvaShare.setAttribute("aria-disabled", "true");
    }
  }

  function setupSlideMode() {
    const hasSlides = slides.length > 0;
    if (imageSlider) {
      imageSlider.hidden = !hasSlides;
    }
    if (canvaStage) {
      canvaStage.hidden = hasSlides;
    }
    if (canvaActions) {
      canvaActions.hidden = hasSlides;
    }
    if (slideDescription) {
      slideDescription.textContent = hasSlides
        ? t("slidesDescriptionImages")
        : t("slidesDescriptionCanva");
    }
  }

  function updateSlideUi() {
    if (!slides.length) {
      setupSlideMode();
      return;
    }

    const slide = slides[currentSlideIndex];
    const nextSlide = slides[(currentSlideIndex + 1) % slides.length];
    const count = `${currentSlideIndex + 1} / ${slides.length}`;

    slidePreviewImage.src = slide.src;
    slidePreviewImage.srcset = slide.srcset;
    slidePreviewImage.sizes = slide.sizes;
    slidePreviewImage.alt = slide.alt;
    slidePeekImage.src = nextSlide.src;
    slidePeekImage.srcset = nextSlide.srcset;
    slidePeekImage.sizes = nextSlide.sizes;
    slidePeekImage.alt = "";
    slidePreviewTitle.textContent = slide.title;
    slidePreviewCount.textContent = count;
    viewerImage.src = slide.fullSrc || slide.src;
    viewerImage.srcset = slide.srcset;
    viewerImage.sizes = "100vw";
    viewerImage.alt = slide.alt;
    resetViewerZoom();
    viewerCounter.textContent = count;
    viewerCaption.textContent =
      slides.length > 1 ? t("viewerCaptionSwipe") : t("viewerCaptionSingle");

    imageSlider.classList.toggle("has-multiple", slides.length > 1);
    previewPrev.disabled = slides.length <= 1;
    previewNext.disabled = slides.length <= 1;
    viewerPrev.hidden = slides.length <= 1;
    viewerNext.hidden = slides.length <= 1;

    slideDots.innerHTML = slides
      .map(
        (_, index) => `
          <button
            class="slide-dot"
            type="button"
            data-slide-dot="${index}"
            aria-label="${t("dotLabel", { number: index + 1 })}"
          ></button>
        `
      )
      .join("");

    Array.from(slideDots.children).forEach((dot, index) => {
      dot.classList.toggle("is-active", index === currentSlideIndex);
      dot.setAttribute("aria-current", index === currentSlideIndex ? "true" : "false");
    });
  }

  function showSlide(index) {
    if (!slides.length) {
      return;
    }

    currentSlideIndex = (index + slides.length) % slides.length;
    updateSlideUi();
  }

  function setupImageSlider() {
    if (!imageSlider) {
      return;
    }

    slidePreview.classList.add("has-hint");

    slideDots.addEventListener("click", (event) => {
      const dot = event.target.closest("[data-slide-dot]");
      if (!dot) {
        return;
      }
      showSlide(Number(dot.dataset.slideDot));
    });

    slidePreview.addEventListener("animationend", (event) => {
      if (event.animationName === "slide-nudge") {
        slidePreview.classList.remove("has-hint");
      }
    });
    slidePreview.addEventListener("click", (event) => {
      if (suppressPreviewClick) {
        event.preventDefault();
        suppressPreviewClick = false;
        return;
      }
      openSlideViewer();
    });
    slidePreview.addEventListener("pointerdown", handlePreviewPointerDown);
    slidePreview.addEventListener("pointerup", handlePreviewPointerUp);
    slidePreview.addEventListener("pointercancel", clearPreviewSwipe);
    previewPrev.addEventListener("click", () => showSlide(currentSlideIndex - 1));
    previewNext.addEventListener("click", () => showSlide(currentSlideIndex + 1));
    viewerPrev.addEventListener("click", () => showSlide(currentSlideIndex - 1));
    viewerNext.addEventListener("click", () => showSlide(currentSlideIndex + 1));
    closeSlideViewer.addEventListener("click", closeViewer);
    slideViewer.addEventListener("pointerdown", handleViewerPointerDown);
    slideViewer.addEventListener("pointermove", handleViewerPointerMove);
    slideViewer.addEventListener("pointerup", handleViewerPointerUp);
    slideViewer.addEventListener("pointercancel", handleViewerPointerCancel);
    slideViewer.addEventListener("wheel", handleViewerWheel, { passive: false });
    slideViewer.addEventListener("click", handleViewerClick);
    slideViewer.addEventListener("dblclick", handleViewerDoubleClick);
    window.addEventListener("keydown", handleViewerKeydown);
    document.addEventListener("fullscreenchange", handleFullscreenChange);
  }

  function showViewerTip(text, duration = 0) {
    window.clearTimeout(viewerTipTimer);
    viewerTip.hidden = false;
    viewerTip.textContent = text;

    if (duration > 0) {
      viewerTipTimer = window.setTimeout(() => {
        if (slideViewerOpen) {
          viewerTip.hidden = true;
        }
      }, duration);
    }
  }

  async function openSlideViewer() {
    if (!slides.length || slideViewerOpen) {
      return;
    }

    slideScrollY = window.scrollY;
    slideViewerOpen = true;
    slideViewer.hidden = false;
    document.body.classList.add("slide-viewer-open");
    showViewerTip(t("viewerTipReady"));
    resetViewerZoom();
    updateSlideUi();

    let orientationLocked = false;

    try {
      if (slideViewer.requestFullscreen) {
        await slideViewer.requestFullscreen();
      }
      if (screen.orientation && screen.orientation.lock) {
        await screen.orientation.lock("landscape");
        orientationLocked = true;
      }
    } catch (error) {
      orientationLocked = false;
    }

    if (orientationLocked) {
      showViewerTip(t("viewerTipLocked"), 1600);
    } else {
      showViewerTip(t("viewerTipLimited"), 3000);
    }
  }

  async function closeViewer() {
    if (!slideViewerOpen) {
      return;
    }

    slideViewerOpen = false;
    slideViewer.hidden = true;
    document.body.classList.remove("slide-viewer-open");
    viewerTip.hidden = false;
    window.clearTimeout(viewerTipTimer);
    clearSwipe();
    resetViewerZoom();

    try {
      if (screen.orientation && screen.orientation.unlock) {
        screen.orientation.unlock();
      }
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      }
    } catch (error) {
      // Some mobile browsers do not expose orientation or fullscreen controls.
    }

    window.scrollTo({ top: slideScrollY, behavior: "instant" });
  }

  function handleFullscreenChange() {
    if (!document.fullscreenElement && slideViewerOpen) {
      closeViewer();
    }
  }

  function handleViewerKeydown(event) {
    if (!slideViewerOpen) {
      return;
    }

    if (event.key === "Escape") {
      closeViewer();
    } else if (event.key === "ArrowLeft") {
      showSlide(currentSlideIndex - 1);
    } else if (event.key === "ArrowRight") {
      showSlide(currentSlideIndex + 1);
    }
  }

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function applyViewerZoom() {
    viewerImage.style.transform = `translate3d(${viewerTranslateX}px, ${viewerTranslateY}px, 0) scale(${viewerScale})`;
    slideViewer.classList.toggle("is-zoomed", viewerScale > 1.01);
  }

  function resetViewerZoom() {
    viewerScale = 1;
    viewerTranslateX = 0;
    viewerTranslateY = 0;
    viewerPointers.clear();
    viewerPanStart = null;
    viewerPinchStart = null;
    applyViewerZoom();
  }

  function viewerPointDistance(points) {
    const [first, second] = points;
    return Math.hypot(second.x - first.x, second.y - first.y);
  }

  function updateViewerPointer(event) {
    viewerPointers.set(event.pointerId, {
      x: event.clientX,
      y: event.clientY,
    });
  }

  function isViewerImageInteraction(event) {
    return slideViewer.contains(event.target) && !event.target.closest("button");
  }

  function handleViewerPointerDown(event) {
    if (!isViewerImageInteraction(event)) {
      return;
    }

    event.preventDefault();
    updateViewerPointer(event);
    slideViewer.setPointerCapture?.(event.pointerId);

    if (viewerPointers.size === 2) {
      const points = Array.from(viewerPointers.values());
      viewerPinchStart = {
        distance: viewerPointDistance(points),
        scale: viewerScale,
      };
      viewerPanStart = null;
      swipeStart = null;
      return;
    }

    if (viewerScale > 1.01) {
      viewerPanStart = {
        x: event.clientX,
        y: event.clientY,
        translateX: viewerTranslateX,
        translateY: viewerTranslateY,
      };
      swipeStart = null;
      return;
    }

    swipeStart = {
      x: event.clientX,
      y: event.clientY,
    };
  }

  function handleViewerPointerMove(event) {
    if (!viewerPointers.has(event.pointerId)) {
      return;
    }

    event.preventDefault();
    updateViewerPointer(event);

    if (viewerPointers.size >= 2 && viewerPinchStart) {
      const points = Array.from(viewerPointers.values()).slice(0, 2);
      const distance = viewerPointDistance(points);
      if (viewerPinchStart.distance > 0) {
        viewerScale = clamp(viewerPinchStart.scale * (distance / viewerPinchStart.distance), 1, 4);
        if (viewerScale <= 1.01) {
          viewerTranslateX = 0;
          viewerTranslateY = 0;
        }
        applyViewerZoom();
      }
      return;
    }

    if (viewerPanStart && viewerScale > 1.01) {
      viewerTranslateX = viewerPanStart.translateX + event.clientX - viewerPanStart.x;
      viewerTranslateY = viewerPanStart.translateY + event.clientY - viewerPanStart.y;
      applyViewerZoom();
    }
  }

  function handleViewerPointerUp(event) {
    if (viewerPointers.has(event.pointerId)) {
      event.preventDefault();
      viewerPointers.delete(event.pointerId);
    }

    if (event.pointerId && slideViewer.hasPointerCapture?.(event.pointerId)) {
      slideViewer.releasePointerCapture(event.pointerId);
    }

    if (viewerPointers.size < 2) {
      viewerPinchStart = null;
    }

    if (viewerPanStart) {
      viewerPanStart = null;
      return;
    }

    if (viewerScale > 1.01) {
      clearSwipe();
      return;
    }

    if (!swipeStart || slides.length <= 1) {
      clearSwipe();
      return;
    }

    const deltaX = event.clientX - swipeStart.x;
    const deltaY = event.clientY - swipeStart.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 48 && Math.abs(deltaX) > Math.abs(deltaY) * 1.3;
    if (isHorizontalSwipe) {
      showSlide(deltaX < 0 ? currentSlideIndex + 1 : currentSlideIndex - 1);
    }
    clearSwipe();
  }

  function handleViewerPointerCancel(event) {
    viewerPointers.delete(event.pointerId);
    if (event.pointerId && slideViewer.hasPointerCapture?.(event.pointerId)) {
      slideViewer.releasePointerCapture(event.pointerId);
    }
    if (viewerPointers.size === 0) {
      viewerPanStart = null;
      viewerPinchStart = null;
      clearSwipe();
    }
  }

  function handleViewerWheel(event) {
    if (!slideViewerOpen || !isViewerImageInteraction(event)) {
      return;
    }

    event.preventDefault();
    const delta = event.deltaY < 0 ? 0.18 : -0.18;
    viewerScale = clamp(viewerScale + delta, 1, 4);
    if (viewerScale <= 1.01) {
      viewerTranslateX = 0;
      viewerTranslateY = 0;
    }
    applyViewerZoom();
  }

  function handleViewerClick(event) {
    if (!isViewerImageInteraction(event)) {
      return;
    }

    const now = Date.now();
    if (now - viewerLastTapAt <= 320) {
      event.preventDefault();
      toggleViewerZoom();
      viewerLastTapAt = 0;
      return;
    }

    viewerLastTapAt = now;
  }

  function handleViewerDoubleClick(event) {
    if (!isViewerImageInteraction(event)) {
      return;
    }

    event.preventDefault();
    if (Date.now() - viewerLastZoomToggleAt < 180) {
      return;
    }
    toggleViewerZoom();
  }

  function toggleViewerZoom() {
    viewerLastZoomToggleAt = Date.now();
    if (viewerScale > 1.01) {
      resetViewerZoom();
      return;
    }

    viewerScale = 2.4;
    viewerTranslateX = 0;
    viewerTranslateY = 0;
    applyViewerZoom();
  }

  function clearSwipe() {
    swipeStart = null;
  }

  function handlePreviewPointerDown(event) {
    previewSwipeStart = {
      x: event.clientX,
      y: event.clientY,
    };
    if (event.pointerId && slidePreview.setPointerCapture) {
      slidePreview.setPointerCapture(event.pointerId);
    }
  }

  function handlePreviewPointerUp(event) {
    if (!previewSwipeStart || slides.length <= 1) {
      clearPreviewSwipe();
      return;
    }

    const deltaX = event.clientX - previewSwipeStart.x;
    const deltaY = event.clientY - previewSwipeStart.y;
    const isHorizontalSwipe = Math.abs(deltaX) > 42 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25;
    if (isHorizontalSwipe) {
      suppressPreviewClick = true;
      showSlide(deltaX < 0 ? currentSlideIndex + 1 : currentSlideIndex - 1);
    }
    if (event.pointerId && slidePreview.hasPointerCapture?.(event.pointerId)) {
      slidePreview.releasePointerCapture(event.pointerId);
    }
    clearPreviewSwipe();
  }

  function clearPreviewSwipe() {
    previewSwipeStart = null;
  }

  function setupTextOnlyInputs() {
    textOnlyInputs.forEach((input) => {
      input.addEventListener("compositionstart", () => {
        composingText = true;
      });
      input.addEventListener("compositionend", () => {
        composingText = false;
        input.value = input.value.replace(textOnlyPattern, "");
      });
      input.addEventListener("input", () => {
        if (composingText) {
          return;
        }

        const cursor = input.selectionStart;
        const before = input.value;
        input.value = before.replace(textOnlyPattern, "");
        if (cursor !== null && before !== input.value) {
          input.setSelectionRange(Math.max(cursor - 1, 0), Math.max(cursor - 1, 0));
        }
      });
    });
  }

  function getCanvasContext() {
    return canvas.getContext("2d");
  }

  function resizeCanvas() {
    if (!canvas) {
      return;
    }

    const previousImage = hasSignature ? canvas.toDataURL("image/png") : "";
    const ratio = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(Math.floor(rect.width * ratio), 1);
    canvas.height = Math.max(Math.floor(rect.height * ratio), 1);

    const ctx = getCanvasContext();
    ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 3.2;
    ctx.strokeStyle = "#142033";

    if (previousImage) {
      const image = new Image();
      image.onload = () => {
        ctx.drawImage(image, 0, 0, rect.width, rect.height);
      };
      image.src = previousImage;
    }
  }

  function clearSignature() {
    const ctx = getCanvasContext();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    hasSignature = false;
    lastPoint = null;
  }

  function eventPoint(event) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
  }

  function startDrawing(event) {
    event.preventDefault();
    drawing = true;
    hasSignature = true;
    lastPoint = eventPoint(event);
    canvas.setPointerCapture(event.pointerId);
  }

  function draw(event) {
    if (!drawing || !lastPoint) {
      return;
    }

    event.preventDefault();
    const point = eventPoint(event);
    const ctx = getCanvasContext();
    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(point.x, point.y);
    ctx.stroke();
    lastPoint = point;
  }

  function stopDrawing(event) {
    event.preventDefault();
    drawing = false;
    lastPoint = null;
    if (event.pointerId && canvas.hasPointerCapture(event.pointerId)) {
      canvas.releasePointerCapture(event.pointerId);
    }
  }

  function setupSignaturePad() {
    if (!canvas) {
      return;
    }

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);
    canvas.addEventListener("pointerdown", startDrawing);
    canvas.addEventListener("pointermove", draw);
    canvas.addEventListener("pointerup", stopDrawing);
    canvas.addEventListener("pointercancel", stopDrawing);
    clearButton?.addEventListener("click", () => {
      clearSignature();
      showMessage(t("msgSignatureCleared"), "");
    });
  }

  function collectPayload() {
    const formData = new FormData(form);
    return {
      submittedAt: new Date().toISOString(),
      grade: formData.get("grade"),
      classNumber: formData.get("classNumber"),
      studentName: String(formData.get("studentName") || "").trim(),
      guardianName: String(formData.get("guardianName") || "").trim(),
      materialConfirmed: formData.get("materialConfirmed") === "on",
      privacyAgreed: formData.get("privacyAgreed") === "on",
      language: currentLanguage,
      signatureImage: canvas.toDataURL("image/png"),
    };
  }

  function validatePayload(payload) {
    if (!payload.grade || !payload.classNumber) {
      return t("msgMissingClass");
    }

    if (!payload.studentName || !payload.guardianName) {
      return t("msgMissingNames");
    }

    textOnlyPattern.lastIndex = 0;
    const invalidStudentName = textOnlyPattern.test(payload.studentName);
    textOnlyPattern.lastIndex = 0;
    const invalidGuardianName = textOnlyPattern.test(payload.guardianName);
    textOnlyPattern.lastIndex = 0;

    if (invalidStudentName || invalidGuardianName) {
      return t("msgTextOnly");
    }

    if (!payload.materialConfirmed || !payload.privacyAgreed) {
      return t("msgMissingChecks");
    }

    if (!hasSignature) {
      return t("msgMissingSignature");
    }

    return "";
  }

  async function submitPayload(payload) {
    if (!CONFIG.APPS_SCRIPT_URL) {
      await new Promise((resolve) => window.setTimeout(resolve, 350));
      return {
        ok: false,
        localOnly: true,
      };
    }

    const response = await fetch(CONFIG.APPS_SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    if (response.type === "opaque") {
      return { ok: true };
    }

    if (!response.ok) {
      throw new Error(`제출 실패: ${response.status}`);
    }

    return response.json().catch(() => ({ ok: true }));
  }

  function lockSubmittedState() {
    submitButton.disabled = true;
    resubmitButton.hidden = false;
    Array.from(form.elements).forEach((element) => {
      if (element !== resubmitButton) {
        element.disabled = true;
      }
    });
    canvas.style.pointerEvents = "none";
  }

  function unlockSubmittedState() {
    Array.from(form.elements).forEach((element) => {
      element.disabled = false;
    });
    submitButton.disabled = false;
    resubmitButton.hidden = true;
    canvas.style.pointerEvents = "";
    showMessage(t("msgResubmit"), "");
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const payload = collectPayload();
    const error = validatePayload(payload);
    if (error) {
      showMessage(error, "error");
      return;
    }

    submitButton.disabled = true;
    showMessage(t("msgSubmitting"), "");

    try {
      const result = await submitPayload(payload);
      if (result.localOnly) {
        showMessage(t("msgAppsMissing"), "error");
        submitButton.disabled = false;
        return;
      }

      showMessage(t("msgSubmitted"), "success");
      lockSubmittedState();
    } catch (errorMessage) {
      showMessage(t("msgSubmitError"), "error");
      submitButton.disabled = false;
    }
  }

  function setupForm() {
    form.addEventListener("submit", handleSubmit);
    resubmitButton.addEventListener("click", unlockSubmittedState);
  }

  function setupLanguageToggle() {
    languageToggle.addEventListener("click", () => {
      applyLanguage(currentLanguage === "ko" ? "en" : "ko");
    });
  }

  setupCanva();
  setupImageSlider();
  setupLanguageToggle();
  applyLanguage("ko");
  setupTextOnlyInputs();
  setupSignaturePad();
  setupForm();
  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
})();
