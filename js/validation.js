// Validare formular folosind Formspree
const FORMSPREE_URL = "https://formspree.io/f/mlgyrkea";

document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const successBox = document.getElementById("formSuccess");
    const submitBtn = form.querySelector("button[type='submit']");

    form.addEventListener("submit", async function (e) {
        e.preventDefault(); //opreste trimiterea

        //Curata erori anterioare
        clearErrors();

        //Preluare valori
        const name = document.getElementById("contactName").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const program = document.getElementById("contactProgram").value;
        const message = document.getElementById("contactMessage").value.trim();

        // Validare
        let isValid = true;
        if (name.length < 3) {
            showError("contactName", "Numele trebuie să aibă cel puțin 3 caractere.");
            isValid = false;
        }
        if (!isValidEmail(email)) {
            showError("contactEmail", "Introduceți o adresă de email validă.");
            isValid = false;
        }
        if (!isValidPhone(phone)) {
            showError("contactPhone", "Introduceți un număr de telefon valid (+373 XX XXX XXX).");
            isValid = false;
        }
        if (program === "") {
            showError("contactProgram", "Selectați un program de interes.");
            isValid = false;
        }

        // oprește dacă există erori
        if (!isValid) return;

        // Loading butom
        submitBtn.disabled = true;
        submitBtn.textContent = "Se trimite...";

        // Trimitere catre formspree
        try {
            const phoneInput = document.getElementById("contactPhone");
            if (!phoneInput.value.trim().startsWith('+')) {
            phoneInput.value = '+373 ' + phoneInput.value.trim();
}

            const response = await fetch(FORMSPREE_URL, {
                method: "POST",
                headers: { "Accept": "application/json" },
                body: new FormData(form),
            });

            if (response.ok) {
                // Succes
                form.reset();
                successBox.classList.remove("hidden");
                successBox.classList.add("flex");
                successBox.scrollIntoView({ behavior: "smooth", block: "nearest" });
            } else {
                const data = await response.json();
                alert("Eroare la trimitere: " + (data?.errors?.[0]?.message || "Încearcă din nou."));
            }
        } catch (error) {
            alert("Nu s-a putut trimite mesajul. Verificați conexiunea la internet.");
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Trimite Mesajul";
        }
    });


    // Functii de ajutor
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }

    function isValidPhone(phone) {
        // Acceptă format: 060000000 etc.
        const numarComplet = phone.startsWith('+') ? phone : '+373' + phone.replace(/\s+/g, '');
        return /^\+373[0-9]{8}$/.test(numarComplet.replace(/[-\s.]/g, ''));
    }

    function showError(fieldId, message) {
        const field = document.getElementById(fieldId);
        field.classList.add("border-red-500", "focus:border-red-500");

        const errorEl = document.createElement("p");
        errorEl.className = "field-error text-xs text-red-500 mt-1";
        errorEl.textContent = message;

        field.parentElement.appendChild(errorEl);
    }

    function clearErrors() {
        // Sterge mesajele de eroare
        document.querySelectorAll(".field-error").forEach(el => el.remove());

        // Resetează bordurile rosii
        ["contactName", "contactEmail", "contactPhone", "contactProgram"].forEach(id => {
            document.getElementById(id).classList.remove("border-red-500");
        });

        // Ascunde mesajul de succes daca era vizibil
        successBox.classList.add("hidden");
        successBox.classList.remove("flex");
    }
});
