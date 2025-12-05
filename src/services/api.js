const API_KEY = `0f7ade538b798260c4f1cade`
const URL_BASE = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

export async function exchangeRateApi(fromCurrency) {

    try {
        const response = await fetch(`${URL_BASE}/${fromCurrency}`);
        const data = await response.json();
        return data;
    }
    catch(error){
        console.log(error);
    }
}

export function convertCurrency(amount, rate){
    return (parseFloat(amount) * rate).toFixed(2);
}