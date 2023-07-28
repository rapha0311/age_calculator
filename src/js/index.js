const form = document.getElementById("calculator-box");
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const dayTitle = document.getElementById("dayTitle");
const monthTitle = document.getElementById("monthTitle");
const yearTitle = document.getElementById("yearTitle");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (validateFields()) {
        const day = dayInput.value;
        const month = monthInput.value;
        const year = yearInput.value;
        calculateAge(day, month, year);
    } else {
        clearResults();
    }
});

function validateFields() {
    const day = dayInput.value;
    const month = monthInput.value;
    const year = yearInput.value;

    const dayError = document.getElementById("dayError");
    const monthError = document.getElementById("monthError");
    const yearError = document.getElementById("yearError");

    let hasErrors = false;

    if (!day) {
        dayError.textContent = "This field is required";
        dayInput.classList.add("error-border");
        dayTitle.classList.add("error");
        hasErrors = true;
    } else if (day < 1 || day > 31) {
        dayError.textContent = "Must be a valid day";
        dayInput.classList.add("error-border");
        dayTitle.classList.add("error");
        hasErrors = true;
    } else {
        const maxDays = new Date(year, month, 0).getDate();

        if (day > maxDays) {
            dayError.textContent = `Must be a valid date`;
            dayInput.classList.add("error-border");
            dayTitle.classList.add("error");
            hasErrors = true;
        } else {
            dayError.textContent = "";
            dayInput.classList.remove("error-border");
            dayTitle.classList.remove("error");
        }
    }
    if (!month) {
        monthError.textContent = "This field is required";
        monthInput.classList.add("error-border");
        monthTitle.classList.add("error");
        hasErrors = true;
    } else if (month < 1 || month > 12) {
        monthError.textContent = "Must be a valid month";
        monthInput.classList.add("error-border");
        monthTitle.classList.add("error");
        hasErrors = true;
    } else {
        monthError.textContent = "";
        monthInput.classList.remove("error-border");
        monthTitle.classList.remove("error");
    }
    if (!year) {
        yearError.textContent = "This field is required";
        yearInput.classList.add("error-border");
        yearTitle.classList.add("error");
        hasErrors = true;
    } else if (year < 1900 || year > 2099) {
        yearError.textContent = "Must be a valid year between 1900 and 2099";
        yearInput.classList.add("error-border");
        yearTitle.classList.add("error");
        hasErrors = true;
    } else {
        yearError.textContent = "";
        yearInput.classList.remove("error-border");
        yearTitle.classList.remove("error");
    }
    return !hasErrors;
}

function calculateAge(day, month, year) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    let ageYear = currentYear - year;
    let ageMonth = currentMonth - month;
    let ageDay = currentDay - day;

    if (ageMonth < 0 || (ageMonth === 0 && ageDay < 0)) {
        ageYear--;
    }

    ageMonth = ageMonth < 0 ? ageMonth + 12 : ageMonth;
    ageDay = ageDay < 0 ? ageDay + new Date(year + ageYear, month, 0).getDate() : ageDay;

    const isValid = day && month && year && day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= 1900 && year <= 2099;

    if (isValid) {
        const yearsElement = document.querySelector(".years span");
        const monthsElement = document.querySelector(".months span");
        const daysElement = document.querySelector(".days span");

        yearsElement.textContent = ageYear;
        monthsElement.textContent = ageMonth;
        daysElement.textContent = ageDay;
    } else {
        clearResults();
    }
}

function clearResults() {

    const yearsElement = document.querySelector(".years span");
    const monthsElement = document.querySelector(".months span");
    const daysElement = document.querySelector(".days span");

    yearsElement.textContent = "--";
    monthsElement.textContent = "--";
    daysElement.textContent = "--";

    dayInput.classList.add("error-border");
    monthInput.classList.add("error-border");
    yearInput.classList.add("error-border");

    dayTitle.classList.add("error");
    monthTitle.classList.add("error");
    yearTitle.classList.add("error");
}
