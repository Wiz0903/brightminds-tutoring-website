const receiptNumber = new URLSearchParams(window.location.search).get("receiptNumber");
const payments = JSON.parse(localStorage.getItem("payments")) || [];

const payment = payments.find(p => p.receiptNumber === receiptNumber);

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-GB', options);
}

if (payment) {
    document.querySelector(".receipt-number").textContent = payment.receiptNumber;
    document.querySelector(".learner-name").textContent = payment.learnerName;
    document.querySelector(".parent-name").textContent = payment.parentName;
    document.querySelector(".parent-phone").textContent = payment.parentPhone;
    document.querySelector(".amount-paid").textContent = `R${parseFloat(payment.amount).toFixed(2)}`;
    document.querySelector(".receipt-date").textContent = payment.date ? formatDate(payment.date) : "N/A";
    document.querySelector(".payment-notes").textContent = payment.notes || "N/A";
    document.querySelector(".payment-method").textContent = payment.paymentMethod;
} else {
    console.error("Payment not found for receipt number:", receiptNumber);
}

const downloadPdfButton = document.getElementById("download-pdf");
const shareReceiptButton = document.getElementById("share-receipt");

async function generateReceiptPDF() {
    const receiptElement = document.querySelector(".receipt");
    const logo = document.querySelector(".receipt-header img");

    const originalSrc = logo.src;

    try {
        const response = await fetch(
            `${window.location.origin}/images/BrightMinds_logo.jpg`
        );

        if (!response.ok) {
            throw new Error("Could not load the BrightMinds logo.");
        }

        const blob = await response.blob();

        const reader = new FileReader();

        const logoDataURL = await new Promise((resolve, reject) => {
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject(reader.error);

            reader.readAsDataURL(blob);
        });

        logo.src = logoDataURL;

        await new Promise((resolve, reject) => {
            logo.onload = resolve;
            logo.onerror = reject;
        });

        const canvas = await html2canvas(receiptElement);

        const imgData = canvas.toDataURL("image/png");

        const pdf = new jspdf.jsPDF();

        const imgProps = pdf.getImageProperties(imgData);

        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight =
            (imgProps.height * pdfWidth) / imgProps.width;

        pdf.addImage(
            imgData,
            "PNG",
            0,
            0,
            pdfWidth,
            pdfHeight
        );

        // Return the PDF instead of immediately downloading it
        return pdf;

    } finally {
        logo.src = originalSrc;
    }
}

downloadPdfButton.addEventListener("click", async () => {
    try {
        const pdf = await generateReceiptPDF();

        pdf.save(`${receiptNumber}.pdf`);

    } catch (error) {
        console.error("PDF generation failed:", error);
    }
});

shareReceiptButton.addEventListener("click", async () => {
    try {
        const pdf = await generateReceiptPDF();

        const pdfBlob = pdf.output("blob");

        const pdfFile = new File(
            [pdfBlob],
            `${receiptNumber}.pdf`,
            {
                type: "application/pdf"
            }
        );

        if (navigator.share && navigator.canShare({ files: [pdfFile] })) {
            await navigator.share({
                title: "BrightMinds Payment Receipt",
                text: `Payment receipt ${receiptNumber}`,
                files: [pdfFile]
            });
        } else {
            console.log("File sharing is not supported on this device/browser.");
        }

    } catch (error) {
        console.error("Share generation failed:", error);
    }
});