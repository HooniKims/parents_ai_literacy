const { test, expect } = require("@playwright/test");

test("메인 페이지가 교육 자료와 서명 폼을 표시한다", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "등촌중학교 학부모 AI 윤리, 리터러시 교육" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "AI 윤리, 리터러시 교육 자료" })).toBeVisible();
  await expect(page.locator("[data-image-slider]")).toBeVisible();
  await expect(page.getByText("슬라이드 1")).toBeVisible();
  await expect(page.getByText("1 / 12").first()).toBeVisible();
  await expect(page.getByRole("heading", { name: "참여 확인 및 보호자 서명" })).toBeVisible();
  await expect(page.getByRole("button", { name: "다시 제출하기" })).toBeHidden();
});

test("폼은 필수 입력과 서명을 검증한다", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "참여 확인 서명 제출" }).click();
  await expect(page.getByText("자녀의 학년과 반을 선택해 주세요.")).toBeVisible();

  await page.locator('select[name="grade"]').selectOption("1");
  await page.locator('select[name="classNumber"]').selectOption("2");
  await page.locator('input[name="studentName"]').fill("홍길동1");
  await expect(page.locator('input[name="studentName"]')).toHaveValue("홍길동");
  await page.locator('input[name="guardianName"]').fill("김보호");
  await page.getByRole("button", { name: "참여 확인 서명 제출" }).click();
  await expect(page.getByText("보호자 서명을 입력해 주세요.")).toBeVisible();
});

test("이미지 슬라이드가 있으면 자체 뷰어로 전체화면 흐름을 제공한다", async ({ page }) => {
  const slideOne =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%23f7fbff'/%3E%3Ctext x='800' y='470' text-anchor='middle' font-size='96' fill='%23142033'%3E1%3C/text%3E%3C/svg%3E";
  const slideTwo =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 900'%3E%3Crect width='1600' height='900' fill='%23eefaf7'/%3E%3Ctext x='800' y='470' text-anchor='middle' font-size='96' fill='%23142033'%3E2%3C/text%3E%3C/svg%3E";

  await page.addInitScript(([first, second]) => {
    window.PARENT_AI_PAGE_CONFIG = {
      SLIDE_IMAGES: [
        { src: first, title: "첫 번째 슬라이드", alt: "첫 번째 테스트 슬라이드" },
        { src: second, title: "두 번째 슬라이드", alt: "두 번째 테스트 슬라이드" },
      ],
    };
  }, [slideOne, slideTwo]);

  await page.goto("/");

  await expect(page.locator("[data-image-slider]")).toBeVisible();
  await expect(page.locator("[data-canva-stage]")).toBeHidden();
  await expect(page.locator("[data-canva-actions]")).toBeHidden();
  await expect(page.getByText("슬라이드를 탭하면 전체화면으로 크게 볼 수 있고")).toBeVisible();
  await expect(page.getByText("첫 번째 슬라이드")).toBeVisible();
  await expect(page.getByText("1 / 2").first()).toBeVisible();

  await page.locator("[data-preview-next]").click();
  await expect(page.getByText("두 번째 슬라이드")).toBeVisible();
  await expect(page.getByText("2 / 2").first()).toBeVisible();

  await page.locator("[data-open-slide-viewer]").click();
  await expect(page.locator("[data-slide-viewer]")).toBeVisible();
  await expect(page.locator("[data-viewer-counter]")).toHaveText("2 / 2");

  await page.getByRole("button", { name: "닫기" }).click();
  await expect(page.locator("[data-slide-viewer]")).toBeHidden();
});

test("모바일 미리보기 슬라이드는 가로 페이지 밀림 없이 스와이프로 넘긴다", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto("/");

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator("[data-slide-preview-image]")).toHaveAttribute("srcset", /960\.webp 960w/);
  await expect(page.getByText("1 / 12").first()).toBeVisible();

  await page.locator("[data-open-slide-viewer]").scrollIntoViewIfNeeded();
  await page.locator("[data-open-slide-viewer]").dispatchEvent("pointerdown", {
    clientX: 320,
    clientY: 400,
    pointerId: 1,
    pointerType: "touch",
    bubbles: true,
  });
  await page.locator("[data-open-slide-viewer]").dispatchEvent("pointerup", {
    clientX: 80,
    clientY: 400,
    pointerId: 1,
    pointerType: "touch",
    bubbles: true,
  });

  await expect(page.getByText("2 / 12").first()).toBeVisible();
  await expect(page.locator("[data-slide-viewer]")).toBeHidden();
});

test("전체화면 자동 회전 제한 메시지는 3초 뒤 사라진다", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(screen, "orientation", {
      configurable: true,
      value: {
        lock: () => Promise.reject(new Error("orientation locked by device")),
        unlock: () => {},
      },
    });
  });

  await page.goto("/");
  await page.locator("[data-open-slide-viewer]").click();

  await expect(page.locator("[data-viewer-tip]")).toHaveText("이 기기에서는 자동 회전이 제한됩니다");
  await expect(page.locator("[data-viewer-tip]")).toBeHidden({ timeout: 4200 });
});

test("전체화면 이미지에서 핀치 확대가 적용된다", async ({ page }) => {
  await page.addInitScript(() => {
    HTMLElement.prototype.setPointerCapture = function noopSetPointerCapture() {};
    HTMLElement.prototype.hasPointerCapture = function noopHasPointerCapture() {
      return false;
    };
  });

  await page.goto("/");
  await page.locator("[data-open-slide-viewer]").click();

  const transform = await page.locator("[data-viewer-image]").evaluate((image) => {
    const first = {
      bubbles: true,
      cancelable: true,
      clientX: 160,
      clientY: 220,
      pointerId: 1,
      pointerType: "touch",
    };
    const second = {
      bubbles: true,
      cancelable: true,
      clientX: 220,
      clientY: 220,
      pointerId: 2,
      pointerType: "touch",
    };

    image.dispatchEvent(new PointerEvent("pointerdown", first));
    image.dispatchEvent(new PointerEvent("pointerdown", second));
    image.dispatchEvent(new PointerEvent("pointermove", { ...second, clientX: 340 }));

    return image.style.transform;
  });

  expect(transform).toContain("scale(");
  expect(transform).not.toContain("scale(1)");
});

test("전체화면 확대 이미지는 더블탭으로 원래 크기로 돌아간다", async ({ page }) => {
  await page.goto("/");
  await page.locator("[data-open-slide-viewer]").click();

  const image = page.locator("[data-viewer-image]");
  await image.dblclick();
  await expect(image).toHaveCSS("transform", /matrix\((?!1, 0, 0, 1, 0, 0)/);

  await image.dblclick();
  await expect(image).toHaveCSS("transform", "matrix(1, 0, 0, 1, 0, 0)");
});

test("영어 전환 시 영어 슬라이드 이미지를 사용한다", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: "English" }).click();

  await expect(page.locator("[data-slide-preview-image]")).toHaveAttribute(
    "src",
    "assets/slides/en/en-slide-01-960.webp"
  );
  await expect(page.getByText("1 / 12").first()).toBeVisible();
});

test("상단 언어 버튼으로 주요 문구를 영어와 한국어로 전환한다", async ({ page }) => {
  await page.goto("/");

  await page.getByRole("button", { name: "English" }).click();
  await expect(
    page.getByRole("heading", {
      name: "Deungchon Middle School Parent AI Ethics and Literacy Education",
    })
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "View Materials" })).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Participation Confirmation and Guardian Signature" })
  ).toBeVisible();
  await expect(page.locator('select[name="grade"] option[value="1"]')).toHaveText("Grade 1");

  await page.getByRole("button", { name: "한국어" }).click();
  await expect(page.getByRole("heading", { name: "등촌중학교 학부모 AI 윤리, 리터러시 교육" })).toBeVisible();
  await expect(page.getByRole("link", { name: "자료 확인하기" })).toBeVisible();
});

test("관리자 서명 복원 페이지가 base64 이미지를 복원한다", async ({ page }) => {
  const onePixelPng =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+/p9sAAAAASUVORK5CYII=";

  await page.goto("/signature-viewer.html");
  await page.locator("[data-signature-source]").fill(onePixelPng);
  await page.getByRole("button", { name: "이미지 복원" }).click();

  await expect(page.getByText("서명 이미지를 복원했습니다.")).toBeVisible();
  await expect(page.locator("[data-preview]")).toBeVisible();
  await expect(page.locator("[data-download]")).toHaveAttribute("href", onePixelPng);
});

test("signature pad blocks pointer default action while drawing", async ({ page }) => {
  await page.addInitScript(() => {
    window.__signaturePreventedEvents = [];

    const originalPreventDefault = Event.prototype.preventDefault;
    Event.prototype.preventDefault = function patchedPreventDefault() {
      if (this.target?.matches?.("[data-signature-pad]")) {
        window.__signaturePreventedEvents.push(this.type);
      }
      return originalPreventDefault.call(this);
    };

    HTMLCanvasElement.prototype.setPointerCapture = function noopSetPointerCapture() {};
    HTMLCanvasElement.prototype.hasPointerCapture = function noopHasPointerCapture() {
      return false;
    };
  });

  await page.goto("/");

  const preventedEvents = await page.locator("[data-signature-pad]").evaluate((canvas) => {
    const options = {
      bubbles: true,
      cancelable: true,
      clientX: 20,
      clientY: 20,
      pointerId: 1,
      pointerType: "touch",
    };

    canvas.dispatchEvent(new PointerEvent("pointerdown", options));
    canvas.dispatchEvent(new PointerEvent("pointermove", { ...options, clientY: 160 }));
    canvas.dispatchEvent(new PointerEvent("pointerup", { ...options, clientY: 160 }));

    return window.__signaturePreventedEvents;
  });

  expect(preventedEvents).toEqual(["pointerdown", "pointermove", "pointerup"]);
});

test("signature form posts to the configured Apps Script endpoint", async ({ page }) => {
  const appsScriptUrl =
    "https://script.google.com/macros/s/AKfycbwYKXA_dPOpVhEtgur0EzNdFEymzBAT1_Ik04ioyHfyv3JC_kYK2mCfQIqrO11vKgWv/exec";
  let submittedBody = "";

  await page.route(appsScriptUrl, async (route) => {
    submittedBody = route.request().postData() || "";
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true }),
    });
  });

  await page.goto("/");
  await page.locator('select[name="grade"]').selectOption("1");
  await page.locator('select[name="classNumber"]').selectOption("2");
  await page.locator('input[name="studentName"]').fill("Student");
  await page.locator('input[name="guardianName"]').fill("Guardian");

  const signaturePad = page.locator("[data-signature-pad]");
  await signaturePad.scrollIntoViewIfNeeded();
  const box = await signaturePad.boundingBox();
  expect(box).not.toBeNull();
  await page.mouse.move(box.x + 30, box.y + 30);
  await page.mouse.down();
  await page.mouse.move(box.x + 150, box.y + 90);
  await page.mouse.up();

  await page.locator("[data-submit-button]").click();
  await expect(page.locator("[data-resubmit-button]")).toBeVisible();

  const submitted = JSON.parse(submittedBody);
  expect(submitted.grade).toBe("1");
  expect(submitted.classNumber).toBe("2");
  expect(submitted.studentName).toBe("Student");
  expect(submitted.guardianName).toBe("Guardian");
  expect(submitted.signatureImage).toMatch(/^data:image\/png;base64,/);
});
