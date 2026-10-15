document.addEventListener("DOMContentLoaded", function () {
    // 1. HAMBURGER MENU TOGGLE
    const menuBtn = document.getElementById("menu-btn");
    const sidebar = document.getElementById("sidebar");
    if (menuBtn && sidebar) {
        menuBtn.addEventListener("click", function () {
            sidebar.classList.toggle("nav-open");
        });
    }

    // 2. REAL-TIME TABLE FILTER (initTableFilter)
    const searchInputs = document.querySelectorAll(".search-input");
    searchInputs.forEach(input => {
        input.addEventListener("keyup", function () {
            const keyword = this.value.toLowerCase();
            const targetTableId = this.dataset.table;
            const rows = document.querySelectorAll(`#${targetTableId} tbody tr`);

            rows.forEach(row => {
                const text = row.textContent.toLowerCase();
                row.style.display = text.includes(keyword) ? "" : "none";
            });
        });
    });

    // 3. TOMBOL HAPUS DENGAN CONFIRM() (.btn-hapus)
    document.addEventListener("click", function (e) {
        if (e.target.closest(".btn-hapus")) {
            const btn = e.target.closest(".btn-hapus");
            const row = btn.closest("tr");
            if (confirm("Apakah Anda yakin ingin menghapus data ini?")) {
                row.remove();
                alert("Data berhasil dihapus dari tampilan.");
            }
        }
    });

    // 4. VALIDASI FORM CLIENT-SIDE (initValidasiForm)
    const forms = document.querySelectorAll(".needs-validation");
    forms.forEach(form => {
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            let isValid = true;

            // Hapus pesan error sebelumnya
            form.querySelectorAll(".error-inline-msg").forEach(el => el.remove());

            // Validasi field wajib
            const requiredFields = form.querySelectorAll("[required]");
            requiredFields.forEach(field => {
                if (!field.value.trim()) {
                    isValid = false;
                    showError(field, "Field ini wajib diisi!");
                }
            });

            // Validasi stok / angka non-negatif
            const stokFields = form.querySelectorAll("input[type='number']");
            stokFields.forEach(field => {
                if (field.value !== "" && Number(field.value) < 0) {
                    isValid = false;
                    showError(field, "Nilai tidak boleh negatif!");
                }
            });

            // Jika validasi lolos
            if (isValid) {
                alert("Data berhasil divalidasi dan disimpan (Simulasi Front-End)!");
                form.reset();
            }
        });
    });

    function showError(inputElement, message) {
        const errorDiv = document.createElement("div");
        errorDiv.className = "error-inline-msg text-rose-400 text-xs mt-1 font-medium";
        errorDiv.textContent = message;
        inputElement.insertAdjacentElement("afterend", errorDiv);
    }
});