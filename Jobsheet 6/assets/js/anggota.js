document.addEventListener("DOMContentLoaded", async function () {
    const tbody = document.querySelector("#tabel-anggota tbody");
    const loadingIndicator = document.getElementById("loading-indicator");
    
    if (!tbody) return;

    try {
        if (loadingIndicator) loadingIndicator.classList.remove("hidden");

        await new Promise(resolve => setTimeout(resolve, 600));

        const response = await fetch("../data/anggota.json");
        if (!response.ok) throw new Error("Gagal mengambil data anggota dari server.");

        const members = await response.json();

        if (loadingIndicator) loadingIndicator.classList.add("hidden");

        if (members.length === 0) {
            tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-slate-400">Tidak ada data anggota.</td></tr>`;
            return;
        }

        tbody.innerHTML = "";
        members.forEach((member, index) => {
            const tr = document.createElement("tr");
            tr.className = "hover:bg-white/5 transition";
            tr.innerHTML = `
                <td class="py-4 px-4 font-medium">${index + 1}</td>
                <td class="py-4 px-4 text-indigo-300 font-semibold">${member.nama}</td>
                <td class="py-4 px-4 text-slate-300">${member.nim}</td>
                <td class="py-4 px-4 text-slate-300">${member.prodi}</td>
                <td class="py-4 px-4 text-center space-x-2">
                    <button class="btn-hapus p-2 rounded-lg bg-rose-500/20 text-rose-400 hover:bg-rose-500/30 transition" title="Hapus"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tbody.appendChild(tr);
        });

    } catch (error) {
        if (loadingIndicator) loadingIndicator.classList.add("hidden");
        tbody.innerHTML = `<tr><td colspan="5" class="py-6 text-center text-rose-400 font-medium"><i class="fa-solid fa-triangle-exclamation mr-2"></i> Error: ${error.message}</td></tr>`;
    }
});