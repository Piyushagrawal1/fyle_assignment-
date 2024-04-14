document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("taxForm");
    const modal = document.getElementById("modal");
    const result = document.getElementById("result");

    form.addEventListener("submit", function (event) {
        event.preventDefault();
        hideErrorIcons();

        const age = document.getElementById("age").value;
        const income = parseFloat(document.getElementById("income").value);
        const extraIncome = parseFloat(document.getElementById("extraIncome").value);
        const deductions = parseFloat(document.getElementById("deductions").value);

        if (!age) {
            showErrorIcon("ageErrorIcon");
            return;
        }

        if (isNaN(income)) {
            showErrorIcon("incomeErrorIcon");
            return;
        }

        if (isNaN(extraIncome)) {
            showErrorIcon("extraIncomeErrorIcon");
            return;
        }

        if (isNaN(deductions)) {
            showErrorIcon("deductionsErrorIcon");
            return;
        }

        const taxRate = getTaxRate(age);
        const taxableIncome = Math.max(0, income + extraIncome - deductions - 8);
        const taxAmount = taxRate * taxableIncome;

        result.textContent = `Tax Amount: ${taxAmount.toFixed(2)} Lakhs`;

        modal.style.display = "block";
    });

    modal.querySelector(".close").addEventListener("click", function () {
        modal.style.display = "none";
    });

    window.addEventListener("click", function (event) {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });

    function showErrorIcon(elementId) {
        const errorIcon = document.getElementById(elementId);
        errorIcon.style.display = "inline-block";
    }

    function hideErrorIcons() {
        const errorIcons = document.querySelectorAll(".error-icon");
        errorIcons.forEach(icon => {
            icon.style.display = "none";
        });
    }

    function getTaxRate(age) {
        switch (age) {
            case "<40":
                return 0.3;
            case "40-60":
                return 0.4;
            case "≥60":
                return 0.1;
            default:
                return 0;
        }
    }
});
