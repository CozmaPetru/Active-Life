// BMI Calculator
function calculateBMI() {
    const weight = parseFloat(document.getElementById('bmi-weight').value);
    const heightCm = parseFloat(document.getElementById('bmi-height').value);

    if (!weight || !heightCm || weight < 20 || weight > 300 || heightCm < 100 || heightCm > 250) {
        alert('Te rugăm să introduci valori valide.');
        return;
    }

    const h = heightCm / 100;
    const bmi = (weight / (h * h)).toFixed(1);

    let statusText, statusClass;
    if (bmi < 18.5) {
        statusText = 'Subponderal'; statusClass = 'text-blue-500';
    } else if (bmi < 25) {
        statusText = 'Greutate Normală'; statusClass = 'text-green-500';
    } else if (bmi < 30) {
        statusText = 'Supraponderal'; statusClass = 'text-yellow-500';
    } else {
        statusText = 'Obezitate'; statusClass = 'text-red-500';
    }

    const resultEl = document.getElementById('bmi-result');
    const valueEl = document.getElementById('bmi-value');
    const statusEl = document.getElementById('bmi-status');

    valueEl.textContent = bmi;
    statusEl.textContent = statusText;
    statusEl.className = `font-bold uppercase tracking-wider ${statusClass}`;
    resultEl.classList.remove('hidden');
}