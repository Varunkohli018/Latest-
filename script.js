// script.js

// Store selected images let selectedImages = [];

// Handle file selection document.getElementById("imageInput").addEventListener("change", (event) => { selectedImages = Array.from(event.target.files); displaySelectedImages(); });

function displaySelectedImages() { const preview = document.getElementById("preview"); preview.innerHTML = ""; selectedImages.forEach((file) => { const reader = new FileReader(); reader.onload = function (e) { const img = document.createElement("img"); img.src = e.target.result; img.className = "preview-image"; preview.appendChild(img); }; reader.readAsDataURL(file); }); }

// Convert images to PDF using jsPDF function convertToPDF() { if (selectedImages.length === 0) { alert("Please select images first."); return; }

const { jsPDF } = window.jspdf; const pdf = new jsPDF();

let count = 0;

function addImageToPDF(index) { const reader = new FileReader(); reader.onload = function (e) { const img = new Image(); img.onload = function () { const imgWidth = pdf.internal.pageSize.getWidth(); const imgHeight = (img.height * imgWidth) / img.width;

if (index > 0) pdf.addPage();
    pdf.addImage(img, "JPEG", 0, 0, imgWidth, imgHeight);

    count++;
    if (count === selectedImages.length) {
      pdf.save("converted.pdf");
    } else {
      addImageToPDF(count);
    }
  };
  img.src = e.target.result;
};
reader.readAsDataURL(selectedImages[index]);

}

addImageToPDF(0); }
