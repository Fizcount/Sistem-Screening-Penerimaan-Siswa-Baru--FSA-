document.addEventListener('DOMContentLoaded', function() {
 const hasUjianSelect = document.getElementById('hasUjian');
 const ujianScoreSection = document.getElementById('ujianScoreSection');
 const hasPrestasiSelect = document.getElementById('hasPrestasi');
 const prestasiScoreSection = document.getElementById('prestasiScoreSection');

 // Event listeners to toggle score input visibility
 hasUjianSelect.addEventListener('change', function() {
     if (this.value === 'yes') {
         ujianScoreSection.style.display = 'block';
     } else {
         ujianScoreSection.style.display = 'none';
         document.getElementById('ujianScore').value = ''; // Clear value when hidden
     }
 });

 hasPrestasiSelect.addEventListener('change', function() {
     if (this.value === 'yes') {
         prestasiScoreSection.style.display = 'block';
     } else {
         prestasiScoreSection.style.display = 'none';
         document.getElementById('prestasiScore').value = ''; // Clear value when hidden
     }
 });
});

// Function to perform the screening, mapping directly to the pseudocode logic
function performScreening() {
 const studentName = document.getElementById('studentName').value;
 const hasUjian = document.getElementById('hasUjian').value === 'yes';
 const ujianScore = hasUjian ? parseFloat(document.getElementById('ujianScore').value) : null;
 const hasPrestasi = document.getElementById('hasPrestasi').value === 'yes';
 const prestasiScore = hasPrestasi ? parseFloat(document.getElementById('prestasiScore').value) : null;

 // Output elements
 const statusUjianEl = document.getElementById('statusUjian');
 const statusPrestasiEl = document.getElementById('statusPrestasi');
 const finalStatusEl = document.getElementById('finalStatus');
 const finalResultDiv = finalStatusEl.closest('.final-result'); // Get parent div to add class

 // --- Core FSA Logic (as per pseudocode) ---
 let status_evaluasi_ujian = "Belum Diproses";
 let status_evaluasi_prestasi = "Belum Diproses";
 let ada_jalur_kelulusan_terpenuhi = false;

 // Tahap q2: Proses Pengecekan Jalur Nilai Ujian
 if (ujianScore !== null && !isNaN(ujianScore)) {
     if (ujianScore >= 80) { // q3: Nilai Ujian >= 80
         status_evaluasi_ujian = "Memenuhi Syarat via Ujian";
         ada_jalur_kelulusan_terpenuhi = true;
     } else { // q4: Nilai Ujian < 80
         status_evaluasi_ujian = "Tidak Memenuhi Syarat via Ujian";
     }
 } else {
     status_evaluasi_ujian = "Data Nilai Ujian Tidak Tersedia";
 }

 // Tahap q5: Proses Pengecekan Jalur Nilai Prestasi
 if (prestasiScore !== null && !isNaN(prestasiScore)) {
     if (prestasiScore >= 80) { // q6: Nilai Prestasi >= 80
         status_evaluasi_prestasi = "Memenuhi Syarat via Prestasi";
         ada_jalur_kelulusan_terpenuhi = true;
     } else { // q7: Nilai Prestasi < 80
         status_evaluasi_prestasi = "Tidak Memenuhi Syarat via Prestasi";
     }
 } else {
     status_evaluasi_prestasi = "Data Nilai Prestasi Tidak Tersedia";
 }

 // Tahap q8: Pengumuman Hasil Screening
 let hasil_akhir;
 if (status_evaluasi_ujian === "Data Nilai Ujian Tidak Tersedia" &&
     status_evaluasi_prestasi === "Data Nilai Prestasi Tidak Tersedia") {
     hasil_akhir = "Data Tidak Lengkap";
 } else if (ada_jalur_kelulusan_terpenuhi) {
     hasil_akhir = "Diterima";
 } else {
     hasil_akhir = "Tidak Diterima";
 }

 // --- Update UI with Results ---
 statusUjianEl.textContent = status_evaluasi_ujian;
 statusPrestasiEl.textContent = status_evaluasi_prestasi;
 finalStatusEl.textContent = hasil_akhir;

 // Add class for styling based on result
 finalResultDiv.classList.remove('diterima', 'tidak-diterima', 'data-tidak-lengkap');
 if (hasil_akhir === "Diterima") {
     finalResultDiv.classList.add('diterima');
 } else if (hasil_akhir === "Tidak Diterima") {
     finalResultDiv.classList.add('tidak-diterima');
 } else {
     finalResultDiv.classList.add('data-tidak-lengkap');
 }
}