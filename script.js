// Toggle FAB Menu visibility
function toggleFabMenu() {
  const menu = document.getElementById("fabMenu");
  menu.classList.toggle("hidden");
}

// Trigger PDF file open (without saving)
function triggerFileOpen() {
  const input = document.createElement("input");
  input.type = "file";
  input.accept = "application/pdf";
  input.onchange = () => {
    const file = input.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      window.open(url, "_blank");
    }
  };
  input.click();
}

// Handle FAB menu navigation buttons
function navigateTo(page) {
  alert(`Feature "${page}" will be added soon!`);
}

// Switch between tabs (Recent, Starred, Device)
function switchTab(tab) {
  document.querySelectorAll(".tabs button").forEach(btn =>
    btn.classList.remove("active")
  );
  document.querySelector(`.tabs button[onclick="switchTab('${tab}')"]`)
    .classList.add("active");

  loadMyFiles(); // Optional: Add tab-based filter later
}

// Load PDF files from user and save in localStorage
function loadFiles(event) {
  const files = event.target.files;
  Array.from(files).forEach(file => {
    const reader = new FileReader();
    reader.onload = () => {
      localStorage.setItem(file.name, reader.result);
      loadMyFiles();
    };
    reader.readAsDataURL(file);
  });
}

// Show saved PDF files in file list
function loadMyFiles() {
  const list = document.getElementById("fileList");
  list.innerHTML = "";

  const keys = Object.keys(localStorage).filter(key =>
    key.endsWith(".pdf")
  );

  keys.forEach(key => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = key;

    const open = document.createElement("button");
    open.textContent = "Open";
    open.onclick = () => {
      const dataUrl = localStorage.getItem(key);
      const blob = dataURLToBlob(dataUrl);
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
    };

    const del = document.createElement("button");
    del.textContent = "Delete";
    del.onclick = () => {
      localStorage.removeItem(key);
      loadMyFiles();
    };

    li.appendChild(span);
    li.appendChild(open);
    li.appendChild(del);
    list.appendChild(li);
  });
}

// Convert DataURL to Blob for file opening
function dataURLToBlob(dataURL) {
  const parts = dataURL.split(";base64,");
  const byteString = atob(parts[1]);
  const mimeString = parts[0].split(":")[1];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

// Load saved files on page load
window.onload = loadMyFiles;
