# PRAKTIKUM 7 — HARDENING RESTFUL API (Web Service Engineering)

### Nama  : Nor Hayati  
### NIM   : 230104040203
### Kelas : TI23A  
### Mata Kuliah : Web Service Engineering  
### Dosen Pengampu : MUHAYAT, S.Ag, MIT

---

# 📌 Tujuan Praktikum
Praktikum 7 bertujuan untuk menerapkan konsep **API Hardening** pada RESTful API menggunakan Express.js dengan menambahkan komponen keamanan, monitoring, dan error handling, seperti:

- Helmet → Security Headers  
- CORS → Pembatasan origin akses  
- Rate Limiting → Pencegahan spam & brute force  
- Morgan → Logging HTTP request  
- Error Handler → Standarisasi pesan error  
- Discoverability → `/api/info`  
- Observability → `/api/health` dan `/api/metrics`

Dengan implementasi ini, API menjadi lebih aman, stabil, dan mudah di-*maintain*.

---

# 📁 Struktur Direktori Project

```


P7-Hardening-230104040203
 ├── screenshots
 │     ├── 1.png
 │     ├── 2.png
 │     ├── 3.png
 │     ├── 4.png
 │     ├── 5.png
 │     ├── 6.png
 │     ├── 7.png
 │     ├── 8.png
 │     ├── 9.png
 ├── src
 │     ├── data
 │     │     └── products.data.js
 │     ├── middlewares
 │     │     └── errorHandler.js
 │     ├── routes
 │     │     └── products.routes.js
 │     ├── utils
 │     │     └── apiResponse.js
 │     └── app.js
 ├── .env
 ├── .env.example
 ├── package.json
 ├── package-lock.json
 └── README.md

```


---

# ⚙️ Dependency yang Digunakan

| Library | Fungsi |
|--------|--------|
| express | Web framework |
| helmet | Security headers |
| cors | Cross-Origin Resource Sharing |
| express-rate-limit | Membatasi jumlah request |
| morgan | HTTP request logger |
| dotenv | Manajemen environment variables |
| nodemon | Development auto-restart |

---

# 🚀 Cara Menjalankan API

## 1️⃣ Install dependency:
```
npm install
```

## 2️⃣ Jalankan server mode development:
```
npm run dev
```

## 3️⃣ Jalankan server mode production:
```
npm start
```

Server berjalan di:
http://localhost:3000/

---

# 📡 Endpoint API

## 📌 Daftar Endpoint API

| Method | Endpoint | Deskripsi | Autentikasi | Status Code | Keterangan |
|--------|----------|-----------|--------------|--------------|------------|
| GET | `/api/products` | Mendapatkan semua data | Tidak | 200 | Respon berasal dari dataset |
| GET | `/api/products/:id` | Mendapatkan data berdasarkan ID | Tidak | 200 / 404 | 404 jika ID tidak ditemukan |
| POST | `/api/products` | Menambah data baru | Tidak | 201 / 400 | Validasi data diperlukan |
| PUT | `/api/products/:id` | Memperbarui data berdasarkan ID | Tidak | 200 / 404 | Konsisten dengan kaidah RESTful |
| DELETE | `/api/products/:id` | Menghapus data berdasarkan ID | Tidak | 200 / 404 | Hapus berdasarkan ID |
| GET | `/api/info` | Metadata API | Tidak | 200 | Informasi API |
| GET | `/api/health` | Menampilkan status API | Tidak | 200 | Monitoring uptime & status |
| ANY | Endpoint tidak dikenal | Handler 404 | Tidak | 404 | Ditangani middleware |
| ERROR | Internal server error | Global Error Handler | Tidak | 500 | JSON error handler |

## Observability & Discoverability

| Endpoint | Deskripsi | Output |
|----------|-----------|--------|
| `/api/info` | Metadata API | JSON |
| `/api/health` | Cek status server | JSON |
| `/api/metrics` | Penggunaan memori & uptime | JSON |

## Error Handling

| Jenis Error | Keterangan |
|-------------|------------|
| 404 Not Found | Route tidak dikenal |
| 500 Internal Server Error | Crash test atau kesalahan sistem |

---

# 📸 **Screenshot Hasil Uji Postman (Versi Tabel)**  
> 📌 Catatan:  
> Upload screenshot ke folder:  
> Lalu pastikan nama file sesuai.

## 📌 Daftar Screenshot Hasil Uji Endpoint

| No | Endpoint & Deskripsi | Method | Status Code | Keterangan | Screenshot |
|----|----------------------|--------|-------------|------------|------------|
| 1 | **GET Semua Data** (`/api/products`) | GET | **200** | Response berasal dari dataset UTS | ![GET All](screenshots/1.png) |
| 2 | **GET by ID** (`/api/products/:id`) | GET | **200 / 404** | Jika ID ada → 200, jika tidak ditemukan → 404 | ![GET by ID](screenshots/2.png) |
| 3 | **POST Data Baru** (`/api/products`) | POST | **201 / 400** | Validasi input wajib. Jika valid → 201, jika error → 400 | ![POST](screenshots/3.png) |
| 4 | **PUT Update Data** (`/api/products/:id`) | PUT | **200 / 404** | Konsisten dengan kaidah RESTful. ID tidak ada → 404 | ![PUT](screenshots/4.png) |
| 5 | **DELETE Data** (`/api/products/:id`) | DELETE | **200 / 404** | Hapus berdasarkan ID. Jika ID tidak ada → 404 | ![DELETE](screenshots/5.png) |
| 6 | **Metadata API** (`/api/info`) | GET | **200** | Metadata API & identitas | ![API Info](screenshots/6.png) |
| 7 | **Health Check** (`/api/health`) | GET | **200** | Monitoring uptime & status sistem | ![Health](screenshots/7.png) |
| 8 | **404 Not Found Test** (Route tidak dikenal) | ANY | **404** | Ditangani oleh middleware | ![404 Test](screenshots/8.png) |
| 9 | **500 Error Handler Test** (Simulasi crash) | ERROR | **500** | Response error JSON dari Global Error Handler | ![Error Handler](screenshots/9.png) |

---

# 🧾 **Contoh Output JSON**

## `/api/info`
```json
{
  "service": "Product API Hardening",
  "version": "1.0.0",
  "author": "NIM ANDA",
  "description": "API untuk praktikum Web Service Engineering (WSE) Week 7"
}
```
## `/api/health`
```json
{
  "status": "ok",
  "uptime": 102.5,
  "timestamp": "2025-11-22T12:00:00Z"
}
```

---

## 🧩 Rubrik Penilaian (Total 100)
| No | Aspek | Bobot |
|----|--------|-------|
| 1 | Penerapan 7 RESTful Principles | 20 |
| 2 | CRUD + PATCH Endpoint Lengkap | 15 |
| 3 | Konsistensi Response JSON | 10 |
| 4 | Validasi Input | 10 |
| 5 | Error Handling (500 Handler) | 10 |
| 6 | Status Code Tepat | 10 |
| 7 | Struktur Project Modular | 10 |
| 8 | Dokumentasi README.md Lengkap | 10 |
| 9 | Uji Postman Lengkap | 5 |
| 10 | Laporan Praktikum Rapi | 10 |
| **TOTAL** |  | **100** |

---

## 📊 Rubrik Penilaian (Total 100)

| Aspek | Bobot | Kriteria |
|-------|--------|-----------|
| Keamanan (Helmet, CORS, Rate Limit) | **25%** | Berfungsi & dikonfigurasi benar |
| Logging (Morgan/Winston) | **20%** | Menampilkan request log / simpan ke file |
| Global Error Handling | **20%** | Menangani error & response rapi |
| Monitoring & Health Endpoint | **15%** | Endpoint `/api/health` berjalan |
| Dokumentasi & Evidence | **10%** | README + Screenshot lengkap |
| Kerapian & Struktur | **10%** | Folder & kode modular, `.env` digunakan |

---

✔️ Kesimpulan Praktikum

Dari praktikum ini, dapat disimpulkan bahwa:

## 📝 Kesimpulan Praktikum (Checklist)

- ✔ API berhasil diperkuat menggunakan middleware keamanan (Helmet, CORS, Rate Limit).   
- ✔ Logging sistematis diterapkan menggunakan Morgan/Winston untuk mencatat setiap request.   
- ✔ Global Error Handler berfungsi baik dan menghasilkan respons error yang konsisten.   
- ✔ Endpoint `/api/health` berjalan dan mampu menampilkan status serta uptime server.   
- ✔ Observability meningkat melalui monitoring sederhana dan struktur respons yang rapi.   
- ✔ Konfigurasi sensitif berhasil dipisahkan menggunakan environment variable (`.env`).   
- ✔ Struktur project dibuat lebih modular, rapi, dan mudah dikelola.
- ✔ Dokumentasi README beserta screenshot Postman sudah lengkap sebagai evidence.   
- ✔ API lebih aman, terstruktur, dan mendekati standar production-level minimal.   


Praktikum berhasil dilakukan dan seluruh endpoint berfungsi sesuai standar.

-----

🧑‍💻 *Dikembangkan untuk mata kuliah Web Service Engineering - Prodi S1 Teknologi Informasi - UIN Antasari Banjarmasin*  
📆 *Praktikum 7 – Meningkatkan Keamanan, Logging, dan Monitoring pada 
RESTful API Express.js *  
✍️ *Dosen Pengampu: Muhayat, M.IT*
