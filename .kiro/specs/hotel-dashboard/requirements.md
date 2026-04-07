# Dokumen Persyaratan

## Pendahuluan

Hotel Dashboard adalah sistem internal operasional berbasis web yang dirancang untuk owner dan admin dalam mengelola properti/hotel secara terpusat. Sistem ini menyediakan visibilitas real-time terhadap pendapatan, reservasi, tingkat hunian, dan pengeluaran, serta memastikan konsistensi data antar modul melalui sinkronisasi transaksional. Sistem ini bukan merupakan website pemesanan publik dan seluruh fiturnya ditujukan untuk kebutuhan internal tim operasional.

---

## Glosarium

- **System**: Hotel Dashboard secara keseluruhan
- **Dashboard**: Halaman ringkasan operasional utama
- **Owner**: Pengguna dengan hak akses tertinggi, pemilik bisnis
- **Admin**: Pengguna operasional harian dengan hak akses terbatas
- **Staff Operasional**: Pengguna operasional lapangan dengan akses baca/tulis terbatas (update status kamar, lihat kalender dan reservasi)
- **Finance/Accounting**: Pengguna keuangan dengan akses lihat dan input transaksi keuangan, ekspor laporan
- **Auditor**: Pengguna opsional dengan hak akses baca saja
- **Property**: Entitas lokasi fisik hotel/properti
- **Room**: Unit kamar yang dapat dihuni dalam suatu Property
- **Guest**: Tamu yang terdaftar dalam sistem
- **Reservation**: Catatan pemesanan kamar oleh Guest untuk rentang tanggal tertentu
- **Stay**: Catatan hunian aktual yang terhubung dengan Reservation
- **Income_Transaction**: Catatan transaksi pendapatan yang terhubung dengan Reservation atau input manual
- **Expense_Transaction**: Catatan transaksi pengeluaran per Property
- **Occupancy_Record**: Catatan status hunian per kamar per tanggal
- **Audit_Log**: Catatan perubahan data yang dilakukan oleh pengguna
- **Calendar**: Tampilan grid kalender hunian kamar
- **Occupancy_Rate**: Persentase tingkat hunian dihitung dari (room-nights terisi / room-nights tersedia) × 100%
- **RBAC**: Role-Based Access Control, sistem kontrol akses berbasis peran
- **Reversal**: Transaksi pembatalan yang mengurangi total pendapatan
- **Swap**: Perpindahan kamar dalam satu Reservation yang sama
- **Check-in_Date**: Tanggal mulai hunian, bersifat inklusif
- **Check-out_Date**: Tanggal akhir hunian, bersifat eksklusif
- **UTC**: Coordinated Universal Time, zona waktu penyimpanan data
- **Asia/Jakarta**: Zona waktu tampilan operasional (WIB, UTC+7)
- **IDR**: Indonesian Rupiah, mata uang utama sistem

---

## Persyaratan

### Persyaratan 1: Autentikasi dan Manajemen Sesi

**User Story:** Sebagai pengguna sistem, saya ingin dapat masuk dan keluar dari sistem dengan aman, sehingga data operasional terlindungi dari akses tidak sah.

#### Kriteria Penerimaan

1. WHEN pengguna mengirimkan kredensial yang valid, THE System SHALL mengautentikasi pengguna dan membuat sesi aktif
2. WHEN pengguna mengirimkan kredensial yang tidak valid, THE System SHALL menolak akses dan menampilkan pesan kesalahan autentikasi
3. WHILE sesi pengguna aktif melampaui batas waktu yang ditentukan tanpa aktivitas, THE System SHALL mengakhiri sesi dan mengarahkan pengguna ke halaman login
4. WHEN pengguna memilih logout, THE System SHALL mengakhiri sesi aktif dan menghapus token sesi
5. THE System SHALL menyimpan password pengguna dalam bentuk hash menggunakan algoritma yang aman
6. THE System SHALL menerapkan proteksi CSRF pada seluruh endpoint yang menerima perubahan data
7. THE System SHALL hanya dapat diakses melalui koneksi HTTPS

---

### Persyaratan 2: Role-Based Access Control (RBAC)

**User Story:** Sebagai Owner, saya ingin setiap pengguna hanya dapat mengakses fitur sesuai perannya, sehingga keamanan dan integritas data operasional terjaga.

#### Kriteria Penerimaan

1. THE System SHALL mendefinisikan lima peran pengguna: Owner, Admin, Staff Operasional, Finance/Accounting, dan Auditor
2. WHEN pengguna dengan peran Admin mencoba mengakses modul User & Role Management, THE System SHALL menolak akses dan menampilkan pesan tidak diizinkan
3. WHEN pengguna dengan peran Staff Operasional mencoba mengakses modul selain Room Management, Calendar, dan Reservations, THE System SHALL menolak akses dan menampilkan pesan tidak diizinkan
4. WHEN pengguna dengan peran Finance/Accounting mencoba mengakses modul selain Income, Expenses, Reports, dan Dashboard, THE System SHALL menolak akses dan menampilkan pesan tidak diizinkan
5. WHEN pengguna dengan peran Auditor mencoba melakukan operasi tulis pada modul apapun, THE System SHALL menolak operasi dan menampilkan pesan tidak diizinkan
6. THE System SHALL menerapkan pemeriksaan RBAC di lapisan backend untuk setiap permintaan API
7. THE System SHALL menerapkan pemeriksaan RBAC di lapisan frontend untuk menyembunyikan elemen UI yang tidak diizinkan sesuai peran pengguna
8. WHEN Owner membuat atau mengubah akun pengguna, THE System SHALL menyimpan perubahan dan mencatat aksi ke Audit_Log

---

### Persyaratan 3: Manajemen Property

**User Story:** Sebagai Owner, saya ingin dapat mengelola data property, sehingga setiap lokasi bisnis terdaftar dan dapat digunakan di seluruh modul sistem.

#### Kriteria Penerimaan

1. WHEN Owner mengirimkan data property baru yang valid, THE System SHALL menyimpan property dan menjadikannya tersedia untuk dipilih di seluruh modul
2. WHEN Owner mengirimkan data property dengan kode property yang sudah ada, THE System SHALL menolak penyimpanan dan menampilkan pesan duplikasi kode
3. WHEN Owner memperbarui data property, THE System SHALL menyimpan perubahan dan mencatat aksi ke Audit_Log
4. WHEN Owner menonaktifkan property, THE System SHALL memastikan tidak ada Reservation aktif pada property tersebut sebelum menonaktifkan
5. IF property yang akan dinonaktifkan memiliki Reservation dengan status confirmed atau checked_in, THEN THE System SHALL menolak penonaktifan dan menampilkan daftar Reservation aktif yang menghalangi
6. THE System SHALL menampilkan daftar property dengan filter berdasarkan status aktif/nonaktif

---

### Persyaratan 4: Manajemen Room

**User Story:** Sebagai Owner atau Admin, saya ingin dapat mengelola data kamar dalam setiap property, sehingga unit yang tersedia tercatat dengan akurat.

#### Kriteria Penerimaan

1. WHEN Owner atau Admin mengirimkan data room baru yang valid untuk suatu property, THE System SHALL menyimpan room dan mengaitkannya dengan property tersebut
2. WHEN Owner atau Admin mengirimkan data room dengan nomor kamar yang sudah ada dalam property yang sama, THE System SHALL menolak penyimpanan dan menampilkan pesan duplikasi nomor kamar
3. THE System SHALL memastikan keunikan room_code dalam lingkup satu property yang sama
4. WHEN Owner atau Admin memperbarui data room, THE System SHALL menyimpan perubahan dan mencatat aksi ke Audit_Log
5. THE System SHALL mendukung status room: active, maintenance, blocked, dan inactive
6. WHEN Admin atau Staff Operasional mengubah status room menjadi maintenance atau blocked, THE System SHALL memperbarui RoomAvailabilityCalendar untuk rentang tanggal yang ditentukan dan mencatat aksi ke Audit_Log
7. IF room berstatus maintenance atau blocked, THEN THE System SHALL mencegah pembuatan Reservation baru pada room tersebut untuk rentang tanggal yang terblokir
8. WHEN Owner mencoba merelokasi room ke property lain, THE System SHALL memverifikasi tidak ada Occupancy_Record aktif pada room tersebut sebelum memproses relokasi
9. IF room yang akan direlokasi memiliki Occupancy_Record dengan status aktif, THEN THE System SHALL menolak relokasi dan menampilkan informasi hunian yang menghalangi

---

### Persyaratan 5: Manajemen Guest

**User Story:** Sebagai Admin, saya ingin dapat mencatat dan mengelola data tamu, sehingga informasi tamu tersedia saat membuat atau mengelola reservasi.

#### Kriteria Penerimaan

1. WHEN Admin mengirimkan data guest baru yang valid, THE System SHALL menyimpan data guest dan menjadikannya tersedia untuk dipilih saat membuat Reservation
2. WHEN Admin memperbarui data guest, THE System SHALL menyimpan perubahan dan mencatat aksi ke Audit_Log
3. THE System SHALL memungkinkan pencarian guest berdasarkan nama, nomor telepon, atau nomor dokumen identitas

---

### Persyaratan 6: Manajemen Reservasi

**User Story:** Sebagai Admin, saya ingin dapat membuat, mengedit, dan mengelola reservasi tamu, sehingga seluruh pemesanan kamar tercatat secara akurat dan terpusat.

#### Kriteria Penerimaan

1. WHEN Admin mengirimkan data Reservation baru yang valid, THE System SHALL menyimpan Reservation dengan status awal draft dan membuat Occupancy_Record yang sesuai secara atomik
2. WHEN Admin mengkonfirmasi Reservation berstatus draft, THE System SHALL mengubah status menjadi confirmed dan memperbarui Occupancy_Record secara atomik
3. WHEN Admin melakukan check-in pada Reservation berstatus confirmed, THE System SHALL mengubah status menjadi checked_in dan memperbarui Occupancy_Record menjadi occupied secara atomik
4. WHEN Admin melakukan check-out pada Reservation berstatus checked_in, THE System SHALL mengubah status menjadi checked_out dan memperbarui Occupancy_Record menjadi past secara atomik
5. IF Admin mencoba membuat Reservation dengan rentang tanggal yang overlap dengan Reservation aktif lain pada room yang sama, THEN THE System SHALL menolak transaksi dan menampilkan informasi konflik
6. THE System SHALL menghitung overlap berdasarkan aturan check-in inklusif dan check-out eksklusif
7. WHEN Admin membatalkan Reservation yang belum berstatus checked_out, THE System SHALL mengubah status menjadi cancelled, memperbarui Occupancy_Record, dan mencatat alasan pembatalan ke Audit_Log secara atomik
8. IF Reservation yang dibatalkan memiliki Income_Transaction berstatus posted, THEN THE System SHALL membuat transaksi Reversal secara otomatis
9. THE System SHALL menampilkan Reservation dalam tiga kategori: Current Guest (status checked_in), Future Reservation (status confirmed atau pending_assignment dengan check-in di masa depan), dan Past Guest (status checked_out)
10. THE System SHALL mendukung transisi status Reservation sesuai alur: draft → confirmed → checked_in → checked_out → completed, dengan jalur alternatif ke cancelled atau no_show dari status yang diizinkan
11. THE System SHALL memperlakukan booking_price sebagai harga per stay (total keseluruhan masa menginap), bukan per malam, kecuali dinyatakan lain secara eksplisit

---

### Persyaratan 7: Swap Room

**User Story:** Sebagai Admin, saya ingin dapat memindahkan tamu ke kamar lain dalam reservasi yang sama, sehingga perubahan penempatan kamar dapat dilakukan tanpa membuat reservasi baru.

#### Kriteria Penerimaan

1. WHEN Admin mengajukan permintaan swap room untuk Reservation aktif, THE System SHALL memverifikasi bahwa room tujuan tersedia penuh untuk seluruh rentang tanggal Reservation tersebut
2. IF room tujuan tidak tersedia untuk seluruh rentang tanggal Reservation, THEN THE System SHALL menolak swap dan menampilkan informasi konflik ketersediaan
3. WHEN room tujuan valid dan tersedia, THE System SHALL memindahkan Reservation ke room tujuan, memperbarui seluruh Occupancy_Record terkait, dan mencatat perubahan ke Audit_Log secara atomik
4. THE System SHALL menetapkan room tujuan default dalam property yang sama dengan Reservation saat ini
5. WHEN swap room berhasil, THE System SHALL memastikan tidak ada Occupancy_Record overlap baru yang terbentuk pada room asal maupun room tujuan

---

### Persyaratan 8: Kalender Hunian (Room Calendar)

**User Story:** Sebagai Admin atau Owner, saya ingin melihat status hunian seluruh kamar dalam tampilan kalender, sehingga ketersediaan kamar dapat dipantau secara visual dan cepat.

#### Kriteria Penerimaan

1. THE System SHALL menampilkan Calendar dalam format grid dengan baris mewakili room dan kolom mewakili tanggal
2. THE System SHALL menampilkan status setiap slot kalender dengan warna berbeda untuk status: Available, Booked, Occupied, Blocked/Maintenance, Cancelled, No-show, dan Past
3. WHEN Admin membuat booking langsung dari Calendar, THE System SHALL membuat Reservation baru dan memperbarui slot kalender secara atomik
4. WHEN Reservation dibatalkan, THE System SHALL memperbarui slot Calendar sehingga room kembali menampilkan status Available
5. THE System SHALL menyinkronkan tampilan Calendar dengan data Reservation dan Occupancy_Record secara real-time
6. THE System SHALL mendukung filter Calendar berdasarkan property

---

### Persyaratan 9: Manajemen Income

**User Story:** Sebagai Admin, saya ingin dapat mencatat dan mengelola transaksi pendapatan, sehingga seluruh pemasukan properti terdokumentasi dengan akurat.

#### Kriteria Penerimaan

1. WHEN Admin membuat Income_Transaction berstatus posted, THE System SHALL menyimpan transaksi dan menambahkan amount ke total pendapatan property yang bersangkutan
2. THE System SHALL mendukung tipe Income_Transaction: booking_income, manual_income, refund, dan adjustment
3. THE System SHALL mendukung status Income_Transaction: draft, posted, void, dan reversed
4. WHEN Admin memposting Income_Transaction berstatus draft, THE System SHALL mengubah status menjadi posted dan memperbarui total pendapatan secara atomik
5. IF harga Reservation diubah setelah Income_Transaction berstatus posted, THEN THE System SHALL membuat transaksi adjustment secara otomatis untuk mencerminkan selisih harga
6. WHEN transaksi Reversal dibuat untuk Income_Transaction yang posted, THE System SHALL mengurangi total pendapatan sesuai nilai Reversal
7. THE System SHALL menampilkan ringkasan pendapatan dalam tiga periode: monthly income, yearly income, dan total income
8. THE System SHALL menampilkan tabel transaksi income dengan filter berdasarkan property, bulan, tahun, tipe, dan status
9. THE System SHALL menghitung total income sebagai jumlah seluruh Income_Transaction berstatus posted dikurangi nilai refund dan reversal

---

### Persyaratan 10: Manajemen Expenses

**User Story:** Sebagai Admin, saya ingin dapat mencatat pengeluaran operasional per property, sehingga biaya bisnis terdokumentasi dan dapat dievaluasi.

#### Kriteria Penerimaan

1. WHEN Admin mengirimkan data Expense_Transaction baru dengan property dan kategori yang valid, THE System SHALL menyimpan transaksi dan menampilkannya pada daftar dan laporan expenses
2. IF Admin mengirimkan Expense_Transaction dengan amount yang tidak valid (bukan angka positif), THEN THE System SHALL menolak penyimpanan dan menampilkan pesan validasi
3. THE System SHALL mendukung kategori Expense_Transaction: maintenance expenses dan operational expenses
4. THE System SHALL mendukung field Expense_Transaction: tanggal, property, kategori, amount, dan deskripsi
5. WHEN Admin memperbarui Expense_Transaction, THE System SHALL menyimpan perubahan dan mencatat aksi ke Audit_Log
6. WHEN Owner melakukan soft-delete pada Expense_Transaction, THE System SHALL menandai transaksi sebagai dihapus tanpa menghapus data dari database dan mencatat aksi ke Audit_Log
7. THE System SHALL menampilkan daftar Expense_Transaction dengan filter berdasarkan property, bulan, tahun, dan kategori
8. THE System SHALL menampilkan ringkasan total pengeluaran per property dan per kategori

---

### Persyaratan 11: Dashboard Operasional

**User Story:** Sebagai Owner atau Admin, saya ingin melihat ringkasan performa operasional secara sekilas, sehingga keputusan bisnis dapat diambil dengan cepat berdasarkan data terkini.

#### Kriteria Penerimaan

1. WHEN pengguna membuka Dashboard, THE System SHALL menampilkan KPI utama: total income, monthly revenue, total booking aktif, dan occupancy insight dalam waktu kurang dari 3 detik
2. THE System SHALL menampilkan grafik tren revenue bulanan dan tahunan pada Dashboard
3. THE System SHALL menampilkan ringkasan income per property pada Dashboard
4. THE System SHALL menampilkan ringkasan expenses pada Dashboard
5. THE System SHALL menampilkan daftar property dengan performa tertinggi dan terendah berdasarkan revenue pada Dashboard
6. WHEN filter property diterapkan pada Dashboard, THE System SHALL memperbarui seluruh KPI dan grafik untuk menampilkan data property yang dipilih saja
7. WHEN filter bulan atau tahun diterapkan pada Dashboard, THE System SHALL memperbarui seluruh KPI dan grafik sesuai periode yang dipilih
8. WHEN Dashboard dibuka dan tidak ada data untuk periode yang dipilih, THE System SHALL menampilkan zero state tanpa error
9. THE System SHALL menyediakan tautan drill-down dari setiap KPI Dashboard ke modul terkait

---

### Persyaratan 12: Occupancy Performance

**User Story:** Sebagai Owner atau Admin, saya ingin melihat laporan tingkat hunian per kamar, sehingga performa setiap kamar dapat dievaluasi dan dioptimalkan.

#### Kriteria Penerimaan

1. WHEN pengguna membuka halaman Occupancy Performance, THE System SHALL menampilkan Occupancy_Rate per room berdasarkan formula: (room-nights terisi / room-nights tersedia) × 100%
2. THE System SHALL menampilkan ranking room dari Occupancy_Rate tertinggi hingga terendah
3. WHEN filter property diterapkan, THE System SHALL memperbarui tampilan Occupancy_Rate dan ranking untuk menampilkan data property yang dipilih saja
4. WHEN filter bulan atau tahun diubah, THE System SHALL memperbarui chart dan ranking sesuai periode yang dipilih
5. THE System SHALL menampilkan Occupancy_Rate dalam format persentase dengan dua angka desimal

---

### Persyaratan 13: Audit Log

**User Story:** Sebagai Owner, saya ingin dapat melihat seluruh riwayat perubahan data, sehingga akuntabilitas operasional terjaga dan investigasi dapat dilakukan bila diperlukan.

#### Kriteria Penerimaan

1. THE System SHALL mencatat setiap operasi tulis (create, update, delete, status change) ke Audit_Log dengan informasi: actor_user_id, entity_type, entity_id, action, before_data, after_data, dan created_at
2. THE System SHALL menyimpan timestamp Audit_Log dalam format UTC
3. WHEN Owner mengakses halaman Audit Log, THE System SHALL menampilkan seluruh riwayat perubahan data
4. WHEN Admin mengakses halaman Audit Log, THE System SHALL menampilkan hanya riwayat perubahan yang dilakukan oleh Admin tersebut
5. THE System SHALL mendukung filter Audit Log berdasarkan entity_type, action, dan rentang tanggal

---

### Persyaratan 14: Ekspor Laporan Dasar

**User Story:** Sebagai Owner atau Finance, saya ingin dapat mengekspor data laporan ke format CSV atau Excel, sehingga data operasional dapat dianalisis lebih lanjut di luar sistem.

#### Kriteria Penerimaan

1. THE System SHALL menyediakan fitur ekspor laporan untuk modul Income dan Expenses dalam format CSV dan Excel (.xlsx)
2. WHEN pengguna mengajukan permintaan ekspor dengan filter property, bulan, dan tahun, THE System SHALL menghasilkan file yang berisi seluruh transaksi sesuai filter tersebut
3. THE System SHALL menyertakan kolom: tanggal, kode transaksi, deskripsi, kategori/tipe, amount, dan status pada file ekspor
4. WHEN file ekspor berhasil dibuat, THE System SHALL mengunduh file secara otomatis ke browser pengguna
5. THE System SHALL membatasi akses fitur ekspor hanya untuk peran Owner, Admin, dan Finance/Accounting

---

### Persyaratan 15: Konsistensi dan Sinkronisasi Data

**User Story:** Sebagai Owner, saya ingin setiap perubahan pada reservasi otomatis tercermin di kalender dan income, sehingga tidak ada inkonsistensi data antar modul.

#### Kriteria Penerimaan

1. THE System SHALL memastikan setiap operasi yang melibatkan Reservation, Occupancy_Record, dan Income_Transaction dieksekusi secara atomik dalam satu transaksi database
2. IF salah satu bagian dari operasi atomik gagal, THEN THE System SHALL melakukan rollback seluruh operasi dan mengembalikan data ke kondisi sebelumnya
3. THE System SHALL menerapkan optimistic locking untuk mencegah konflik pada pengeditan data secara bersamaan oleh lebih dari satu pengguna
4. IF terjadi konflik optimistic locking, THEN THE System SHALL menolak operasi yang lebih lambat dan menginformasikan pengguna untuk memuat ulang data terbaru

---

### Persyaratan 16: Zona Waktu dan Format Data

**User Story:** Sebagai pengguna sistem, saya ingin seluruh data waktu ditampilkan dalam zona waktu operasional yang benar, sehingga tidak terjadi kesalahan interpretasi tanggal dan waktu.

#### Kriteria Penerimaan

1. THE System SHALL menyimpan seluruh data timestamp dalam format UTC di database
2. WHEN System menampilkan data waktu kepada pengguna, THE System SHALL mengkonversi timestamp UTC ke zona waktu Asia/Jakarta (WIB, UTC+7)
3. THE System SHALL menggunakan IDR sebagai mata uang default untuk seluruh tampilan nilai finansial
4. THE System SHALL menampilkan nilai finansial dalam format angka IDR yang konsisten di seluruh modul

---

### Persyaratan 17: Validasi Input

**User Story:** Sebagai pengguna sistem, saya ingin sistem memvalidasi seluruh input sebelum disimpan, sehingga data yang tersimpan selalu valid dan konsisten.

#### Kriteria Penerimaan

1. IF pengguna mengirimkan form dengan field wajib yang kosong, THEN THE System SHALL menolak penyimpanan dan menampilkan pesan validasi untuk setiap field yang tidak valid
2. IF pengguna mengirimkan nilai amount yang bukan angka positif pada form Income_Transaction atau Expense_Transaction, THEN THE System SHALL menolak penyimpanan dan menampilkan pesan validasi
3. IF pengguna mengirimkan check-out_date yang sama dengan atau lebih awal dari check-in_date pada form Reservation, THEN THE System SHALL menolak penyimpanan dan menampilkan pesan validasi
4. THE System SHALL menerapkan validasi input di lapisan backend untuk seluruh endpoint API
