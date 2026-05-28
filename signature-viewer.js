(function () {
  const source = document.querySelector("[data-signature-source]");
  const renderButton = document.querySelector("[data-render]");
  const clearButton = document.querySelector("[data-clear]");
  const downloadLink = document.querySelector("[data-download]");
  const preview = document.querySelector("[data-preview]");
  const empty = document.querySelector("[data-empty]");
  const message = document.querySelector("[data-message]");

  function setMessage(text, type) {
    message.textContent = text;
    message.classList.toggle("is-error", type === "error");
    message.classList.toggle("is-success", type === "success");
  }

  function normalizeImageData(value) {
    const trimmed = value.trim();
    if (!trimmed) {
      return "";
    }

    if (trimmed.startsWith("data:image/png;base64,")) {
      return trimmed;
    }

    if (/^[A-Za-z0-9+/=\s]+$/.test(trimmed)) {
      return `data:image/png;base64,${trimmed.replace(/\s/g, "")}`;
    }

    return "";
  }

  function renderSignature() {
    const imageData = normalizeImageData(source.value);
    if (!imageData) {
      preview.hidden = true;
      empty.hidden = false;
      downloadLink.classList.add("is-disabled");
      downloadLink.removeAttribute("href");
      setMessage("올바른 PNG base64 서명 데이터를 붙여넣어 주세요.", "error");
      return;
    }

    preview.onload = () => {
      preview.hidden = false;
      empty.hidden = true;
      downloadLink.href = imageData;
      downloadLink.classList.remove("is-disabled");
      setMessage("서명 이미지를 복원했습니다.", "success");
    };
    preview.onerror = () => {
      preview.hidden = true;
      empty.hidden = false;
      downloadLink.classList.add("is-disabled");
      downloadLink.removeAttribute("href");
      setMessage("이미지로 읽을 수 없는 데이터입니다.", "error");
    };
    preview.src = imageData;
  }

  function clearAll() {
    source.value = "";
    preview.hidden = true;
    preview.removeAttribute("src");
    empty.hidden = false;
    downloadLink.classList.add("is-disabled");
    downloadLink.removeAttribute("href");
    setMessage("", "");
  }

  renderButton.addEventListener("click", renderSignature);
  clearButton.addEventListener("click", clearAll);
})();
