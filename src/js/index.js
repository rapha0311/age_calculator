const form = document.getElementById("calculator-box");
const dayInput = document.getElementById("dayInput");
const monthInput = document.getElementById("monthInput");
const yearInput = document.getElementById("yearInput");
const dayTitle = document.getElementById("dayTitle");
const monthTitle = document.getElementById("monthTitle");
const yearTitle = document.getElementById("yearTitle");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Chama a função de validação para exibir os erros
    if (validateFields()) {
        // Se não houver erros, calcular a idade
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

    // Verificar campos vazios e exibir mensagens de erro
    if (!day) {
        dayError.textContent = "This field is required";
        dayInput.classList.add("error-border"); // Adiciona a classe 'error-border' ao input
        hasErrors = true;
    } else if (day < 1 || day > 31) {
        dayError.textContent = "Must be a valid day";
        dayInput.classList.add("error-border"); // Adiciona a classe 'error-border' ao input
        hasErrors = true;
    } else {
        dayError.textContent = "";
        dayInput.classList.remove("error-border"); // Remove a classe 'error-border' do input
    }

    if (!month) {
        monthError.textContent = "This field is required";
        monthInput.classList.add("error-border"); // Adiciona a classe 'error-border' ao input
        hasErrors = true;
    } else if (month < 1 || month > 12) {
        monthError.textContent = "Must be a valid month";
        monthInput.classList.add("error-border"); // Adiciona a classe 'error-border' ao input
        hasErrors = true;
    } else {
        monthError.textContent = "";
        monthInput.classList.remove("error-border"); // Remove a classe 'error-border' do input
    }

    if (!year) {
        yearError.textContent = "This field is required";
        yearInput.classList.add("error-border"); // Adiciona a classe 'error-border' ao input
        hasErrors = true;
    } else if (year < 1900 || year > 2099) {
        yearError.textContent = "Must be in the past";
        yearInput.classList.add("error-border"); // Adiciona a classe 'error-border' ao input
        hasErrors = true;
    } else {
        yearError.textContent = "";
        yearInput.classList.remove("error-border"); // Remove a classe 'error-border' do input
    }

    return !hasErrors;
}

function calculateAge(day, month, year) {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1;
    const currentDay = today.getDate();

    // Calcular a idade
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
    // Limpar resultados exibindo "--" em todos os elementos de resultado
    const yearsElement = document.querySelector(".years span");
    const monthsElement = document.querySelector(".months span");
    const daysElement = document.querySelector(".days span");

    yearsElement.textContent = "--";
    monthsElement.textContent = "--";
    daysElement.textContent = "--";
}
