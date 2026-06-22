// Datele tabelului
const days = ["Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă", "Duminică"];

const scheduleData = [
    { id: 1, time: "08:00 - 09:00", name: "Vinyasa Yoga", trainer: "Ilinca Bucur", type: "flexibilitate", available: true, day: "Luni" },
    { id: 2, time: "10:00 - 11:00", name: "HIT Blast", trainer: "Marius Radu", type: "cardio", available: false, day: "Luni" },
    { id: 3, time: "18:00 - 19:00", name: "Power Lifting", trainer: "Maxim Popa", type: "forță", available: true, day: "Luni" },
    { id: 4, time: "09:00 - 10:00", name: "Spinning", trainer: "Gheorghe Vasiliu", type: "cardio", available: true, day: "Marți" },
    { id: 5, time: "17:00 - 18:00", name: "Power Yoga", trainer: "Mihai Popa", type: "yoga", available: true, day: "Marți" },
    { id: 6, time: "19:00 - 20:00", name: "CrossFit Elite", trainer: "Ștefan Mincescu", type: "forță", available: false, day: "Marți" },
    { id: 7, time: "08:00 - 09:00", name: "Morning Yoga", trainer: "Ilinca Bucur", type: "flexibilitate", available: true, day: "Miercuri" },
    { id: 8, time: "18:00 - 19:00", name: "Body Strength", trainer: "Maxim Popa", type: "forță", available: true, day: "Miercuri" },
    { id: 9, time: "14:00 - 16:00", name: "Zumba Dance", trainer: "Ilinca Bucur", type: "grup", available: true, day: "Joi"},
    { id: 10, time: "19:00 - 20:00", name: "HIT Blast", trainer: "Marius Radu", type: "cardio", available: true, day: "Joi" },
    { id: 11, time: "18:00 - 19:00", name: "Relaxing Yoga", trainer: "Mihai Popa", type: "flexibilitate", available: true, day: "Vineri" },
    { id: 12, time: "10:00 - 11:00", name: "CrossFit Elite", trainer: "Ștefan Mincescu", type: "forță", available: true, day: "Sâmbătă" },
    { id: 13, time: "11:00 - 12:00", name: "Spinning", trainer: "Gheorghe Vasiliu", type: "cardio", available: true, day: "Duminică" },
    { id: 14, time: "17:00 - 18:00", name: "Body Pump", trainer: "Ștefan Mincescu", type: "grup", available: false, day: "Sâmbătă"}
];

// stare (retine starea curenta a interfetel ) 
let state = {
    activeDay: days[0],  //ziua selectata din tabel
    filterType: "Toate", //tipul clasei default este "Toate"
    filterTrainer: "Toți" //tipul antrenorilor default este "Toți" 
};

// stocare referinte catre elemente din DOM pentru performanta
const DOM = {
    tabsContainer: document.getElementById("tabsContainer"),
    scheduleContent: document.getElementById("scheduleContent"),
    filterTypeSelect: document.getElementById("filterType"),
    filterTrainerSelect: document.getElementById("filterTrainer")
};


// Randarea tab-urilor de navigare (zilele săptămânii).
function renderTabs() {
    //variabila constanta care adauga toate butoanele si le inlocuieste pe cele vechi
    const fragment = document.createDocumentFragment();
    
    //verifica daca ziua este activa
    days.forEach(day => {
        const isActive = state.activeDay === day;
        const btn = document.createElement("button");
        
        // Am setat clase CSS pentru stiluri de baza si daca butonul este activ sau inactiv 
        btn.className = `px-6 py-4 font-bold uppercase text-sm tracking-wider whitespace-nowrap transition-colors relative ${
            isActive ? "text-[#E53935]" : "text-neutral-500 hover:text-[#212121]"
        }`;
        btn.textContent = day;

        // daca butonul este activ se afiseaza un indicator
        if (isActive) {
            const indicator = document.createElement("div");
            indicator.className = "absolute bottom-0 left-0 w-full h-1 bg-[#E53935] rounded-t-md";
            btn.appendChild(indicator);
        }
        // Un addEventListener care la apasarea unui click se actualizeaza si se afiseaza tab-urile tabelului
        btn.addEventListener("click", () => {
            state.activeDay = day;
            renderTabs();  //Randeaza tab-urile pentru a actualiza indicatorul activ
            renderSchedule(); //Randeaza tab-urile pentru ziua selectata
        });

        fragment.appendChild(btn);
    });
    // inlocuieste continutul cu unul nou
    DOM.tabsContainer.replaceChildren(fragment); 
}

//Creare mark-up pentru un rand de tabel be baza obiectului clasei
function createRowMarkup(cls, idx) {
    // modifica culoarea de fundal a randurilor pentru lizibilitate
    const rowBg = idx % 2 === 0 ? "bg-white" : "bg-neutral-50/50";
    // generare statut *Disponibil sau nu
    const statusBadge = cls.available
        ? `<span class="inline-block px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">Locuri Disponibile</span>`
        : `<span class="inline-block px-3 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">Clasă Plină</span>`;
        

    const buttonClasses = cls.available
        ? "bg-[#212121] text-white hover:bg-[#E53935]"
        : "bg-neutral-200 text-neutral-400 cursor-not-allowed";

    return `
        <tr class="border-b border-neutral-100 hover:bg-neutral-50 ${rowBg}">
            <td class="p-4 font-bold text-neutral-700 whitespace-nowrap">${cls.time}</td>
            <td class="p-4">
                <div class="font-bold text-lg">${cls.name}</div>
                <div class="text-xs text-[#E53935] uppercase font-bold tracking-wider">${cls.type}</div>
            </td>
            <td class="p-4 text-neutral-600">${cls.trainer}</td>
            <td class="p-4 text-center">${statusBadge}</td>
            <td class="p-4 text-center">
                <button
                    ${cls.available ? "" : "disabled"}
                    class="px-4 py-2 rounded text-sm font-bold uppercase tracking-wider transition-colors ${buttonClasses}"
                    data-id="${cls.id}"
                >
                    ${cls.available ? "Rezervă" : "Complet"}
                </button>
            </td>
        </tr>`;
}

//Randarea tabelului cu clasele pentru ziua activă și filtrul selectat.
function renderSchedule() { 

    // filtrare date (pastrare doar clasele din ziua activa si tipul selectat sau "Toate")
    const filtered = scheduleData.filter(
        cls => cls.day === state.activeDay && (state.filterType === "Toate" || cls.type === state.filterType) && (state.filterTrainer === "Toți" || cls.trainer ===state.filterTrainer)
    );
    // Daca nu exista rezultate se afiseaza eroare
    if (filtered.length === 0) {
        DOM.scheduleContent.innerHTML = `
            <div class="p-12 text-center text-neutral-500">
                Nu există clase de tipul "${state.filterType}" planificate pentru ${state.activeDay}.
            </div>`;
        return;
    }

    //generare randuri HTML pentru fiecare clasa filtrata 
    const rowsHtml = filtered.map((cls, idx) => createRowMarkup(cls, idx)).join("");

    // Creare tabel si inserare in container
    DOM.scheduleContent.innerHTML = `
        <div class="overflow-x-auto">
            <table class="w-full text-left border-collapse">
                <thead>
                    <tr class="bg-[#212121] text-white">
                        <th class="p-4 font-bold uppercase text-sm">Ora</th>
                        <th class="p-4 font-bold uppercase text-sm">Clasa</th>
                        <th class="p-4 font-bold uppercase text-sm">Antrenor</th>
                        <th class="p-4 font-bold uppercase text-sm text-center">Status</th>
                        <th class="p-4 font-bold uppercase text-sm text-center">Acțiune</th>
                    </tr>
                </thead>
                <tbody>
                    ${rowsHtml}
                </tbody>
            </table>
        </div>
    `;
}

// Asculta schimbarea filtrului si actualieaza tabel
DOM.filterTypeSelect.addEventListener("change", (e) => {
    state.filterType = e.target.value;
    renderSchedule();
});

DOM.filterTrainerSelect.addEventListener("change", (e) => {
    state.filterTrainer = e.target.value;
    renderSchedule();
})

// EventListener pentru butoanele de rezervare
DOM.scheduleContent.addEventListener("click", (e) => {
    const targetButton = e.target.closest("button[data-id]");
    if (targetButton && !targetButton.disabled) {
        const classId = targetButton.dataset.id;
        handleBooking(classId);
    }
});


// Initializare
function initApp() {
    
    renderTabs();
    renderSchedule();
}
initApp();