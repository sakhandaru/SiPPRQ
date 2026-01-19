# SiPPRQ v2.0 - Sistem Informasi Pembayaran Pondok

Sistem Pembayaran & Monitoring Berbasis Web untuk Pondok Pesantren.

![Laravel](https://img.shields.io/badge/Laravel-11-red) ![React](https://img.shields.io/badge/React-18-blue) ![Inertia](https://img.shields.io/badge/Inertia-2.0-purple)

## Fitur Utama

### Role: SANTRI (User)

- **Dashboard**: Melihat info tunggakan dan tagihan bulan berjalan dengan jelas.
- **Pembayaran Borongan (Bulk Payment)**: Bayar banyak bulan sekaligus cukup dengan satu kali upload bukti transfer.
- **Request Tagihan (Self-Service)**: Membuat tagihan untuk bulan depan (Bayar di Muka) secara mandiri.
- **Riwayat Pembayaran**: Memantau status pembayaran yang sudah diajukan.

### Role: ADMIN

- **Dashboard Overview**: Ringkasan data Santri, Pembayaran Terbaru, dan Arus Kas.
- **Payment Tracker**: Memantau santri yang BELUM BAYAR vs SUDAH BAYAR per bulan.
- **Verifikasi Borongan**: Verifikasi pembayaran yang mencakup banyak tagihan sekaligus.
- **Penagihan Otomatis**: Sistem otomatis membuat tagihan setiap **tanggal 1** awal bulan.
- **Laporan Keuangan**: Export laporan Arus Kas (Cashflow) dan Pembayaran.

## Instalasi & Setup

1. **Clone & Install**

    ```bash
    git clone ...
    composer install
    npm install
    ```

2. **Environment**

    ```bash
    cp .env.example .env
    php artisan key:generate
    ```

3. **Database**
   Atur koneksi database di file `.env`, lalu jalankan:

    ```bash
    php artisan migrate --seed
    ```

4. **Penjadwal Tagihan (Scheduler)**
   Agar tagihan otomatis muncul tiap bulan, pastikan scheduler aktif di server:

    ```bash
    * * * * * cd /path-to-your-project && php artisan schedule:run >> /dev/null 2>&1
    ```

5. **Jalankan Lokal**
    ```bash
    npm run dev
    php artisan serve
    ```

## Alur Kerja Utama

### 1. Pembuatan Tagihan Otomatis

Berjalan otomatis setiap tanggal 1. Sistem akan membuatkan tagihan untuk semua santri aktif yang belum memiliki tagihan di bulan tersebut.

### 2. Buat Tagihan Manual (Admin Backup)

Jika perlu, Admin bisa memaksa pembuatan tagihan untuk bulan tertentu lewat menu **Admin Tracker > Generate Bill**.

### 3. Pembayaran Borongan

Santri bisa memilih banyak tagihan di dashboard dan mengupload satu bukti bayar. Admin cukup validasi sekali, dan semua tagihan yang dipilih akan lunas.
