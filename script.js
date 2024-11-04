const currencies = {
    "INR": "Indian Rupee",
    "USD": "United States Dollar",
    "EUR": "Euro",
    "GBP": "British Pound Sterling",
    "AUD": "Australian Dollar",
    "CAD": "Canadian Dollar",
    "JPY": "Japanese Yen",
    "CHF": "Swiss Franc",
    "CNY": "Chinese Yuan",
    "SEK": "Swedish Krona",
    "NZD": "New Zealand Dollar",
    "MXN": "Mexican Peso",
    "SGD": "Singapore Dollar",
    "HKD": "Hong Kong Dollar",
    "NOK": "Norwegian Krone",
    "KRW": "South Korean Won",
    "TRY": "Turkish Lira",
    "RUB": "Russian Ruble",
    "ZAR": "South African Rand",
    "BRL": "Brazilian Real"
};
const apiKey = 'a8e58df06701f04037b5c5e2'; // Use a currency conversion API key

document.addEventListener("DOMContentLoaded", () => {
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");

    for (const [code, name] of Object.entries(currencies)) {
        let option = document.createElement("option");
        option.value = code;
        option.textContent = `${name} (${code})`;
        fromCurrency.appendChild(option.cloneNode(true));
        toCurrency.appendChild(option.cloneNode(true));
    }

    document.getElementById("convert-btn").addEventListener("click", () => {
        const amount = document.getElementById("amount").value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === "" || isNaN(amount)) {
            alert("Please enter a valid amount");
            return;
        }

        convertCurrency(amount, from, to);
    });
});

async function convertCurrency(amount, fromCurrency, toCurrency) {
    try {
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
        const data = await response.json();
        const rate = data.rates[toCurrency];
        const result = (amount * rate).toFixed(2);
        document.getElementById("result-text").textContent = `${amount} ${fromCurrency} = ${result} ${toCurrency}`;
    } catch (error) {
        console.error("Error fetching exchange rate:", error);
        document.getElementById("result-text").textContent = "Error fetching exchange rate.";
    }
}
