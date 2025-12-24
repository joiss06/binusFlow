# BinusFlow - Kanban Board Application

BinusFlow adalah aplikasi manajemen tugas berbasis web. Aplikasi ini dibangun untuk membantu pengguna mengelola tugas dengan status *To Do*, *In Progress*, dan *Done* menggunakan antarmuka *drag-and-drop* yang interaktif.

## 🚀 Teknologi yang Digunakan
Project ini dibangun menggunakan spesifikasi berikut:
- **Framework:** React + Vite
- **Language:** TypeScript
- **Styling:** CSS Modules (Custom CSS)
- **State Management:** React Hooks (useState, useEffect)
- **Local Storage:** Untuk persistensi data (tanpa database backend)
- **Library Tambahan:** `@hello-pangea/dnd` (Drag and Drop), `react-icons`, `react-router-dom`

## ✨ Fitur Utama
1.  **Kanban Board Interaktif:**
    - Drag & drop task antar kolom (To Do, In Progress, Done).
    - Create, Read, Update (Status), Delete (CRUD) Task.
2.  **Manajemen Tampilan Task:**
    - Fitur Zoom-in saat task diklik sekali.
    - Modal View Detail saat task diklik dua kali.
    - Indikator warna dinamis pada setiap task.
3.  **Halaman Konfigurasi:**
    - Menambah opsi warna baru dengan kode Hex.
    - Menghapus opsi warna (Task dengan warna terhapus akan kembali ke default).
4.  **Fitur Pencarian:** Filter task berdasarkan judul atau deskripsi secara real-time.
5.  **Sidebar Responsif:** Navigasi yang dapat diminimalisir (expand/collapse).

## 📦 Cara Menjalankan Project

Ikuti langkah-langkah ini untuk menjalankan project di lokal komputer Anda:

1.  **Clone Repository**
    ```bash
    git clone <link-repository-kamu>
    cd binusflow
    ```

2.  **Install Dependencies**
    Pastikan Node.js sudah terinstall.
    ```bash
    npm install
    ```

3.  **Jalankan Aplikasi**
    ```bash
    npm run dev
    ```

4.  **Buka di Browser**
    Aplikasi biasanya berjalan di `http://localhost:5173` (atau port lain yang muncul di terminal).

## 📷 Screenshots
### Halaman Dashboard
![Tampilan Dashboard](./assets/dashboardView.png)

### Modal Create Task
![Modal Create](./assets/createModal.png)

### Modal Delete Task
![Modal Delete](./assets/deleteModal.png)

### Halaman Konfigurasi
![Tampilan Configuration](./assets/configurationView.png)

### Modal Add Color
![Modal Add](./assets/addColorModal.png)

### Tampilan Sekali Tekan Task
![Tampilan Task](./assets/onceClickTask.png)

---
**Catatan:** Project ini dibuat sebagai bagian dari tugas Bootcamp Advanced IT Division.