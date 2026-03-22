-- ============================================================
-- SUPABASE SECURE RLS POLICIES
-- ============================================================
-- Jalankan script ini di Supabase SQL Editor untuk mengamankan database.
-- 
-- PENTING: Pastikan kamu sudah login sebagai admin sebelum menjalankan ini,
-- karena setelah dijalankan, hanya user terautentikasi yang bisa akses data.
-- ============================================================

-- ============================================================
-- STEP 1: Pastikan tabel profiles punya kolom role
-- ============================================================
-- Cek apakah kolom role sudah ada, jika belum tambahkan
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'profiles' AND column_name = 'role'
    ) THEN
        ALTER TABLE profiles ADD COLUMN role TEXT DEFAULT 'client';
    END IF;
END $$;

-- ============================================================
-- STEP 2: Buat helper function untuk cek admin
-- ============================================================
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles 
        WHERE id = auth.uid() 
        AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================
-- STEP 3: Enable RLS untuk semua tabel
-- ============================================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE clients ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE transactions ENABLE ROW LEVEL SECURITY;
-- Uncomment jika tabel products ada di Supabase (bukan Sanity)
-- ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- STEP 4: Hapus policy lama yang tidak aman
-- ============================================================
-- Drop old insecure policies
DROP POLICY IF EXISTS "Allow All Actions" ON clients;
DROP POLICY IF EXISTS "Allow All Deletes" ON clients;
DROP POLICY IF EXISTS "Allow All Actions" ON projects;
DROP POLICY IF EXISTS "Allow All Deletes" ON projects;
DROP POLICY IF EXISTS "Allow All Actions" ON tasks;
DROP POLICY IF EXISTS "Allow All Deletes" ON tasks;
DROP POLICY IF EXISTS "Allow All Actions" ON transactions;
DROP POLICY IF EXISTS "Allow All Deletes" ON transactions;
DROP POLICY IF EXISTS "Allow All Actions" ON profiles;
DROP POLICY IF EXISTS "Allow All Deletes" ON profiles;

-- Drop new policies if they exist (untuk bisa re-run script)
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
DROP POLICY IF EXISTS "Admins can do all on clients" ON clients;
DROP POLICY IF EXISTS "Admins can do all on projects" ON projects;
DROP POLICY IF EXISTS "Admins can do all on tasks" ON tasks;
DROP POLICY IF EXISTS "Admins can do all on transactions" ON transactions;

-- ============================================================
-- STEP 5: PROFILES - User bisa lihat & update profile sendiri
-- ============================================================
CREATE POLICY "Users can view own profile"
ON profiles FOR SELECT
USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
ON profiles FOR UPDATE
USING (auth.uid() = id);

-- Admin bisa lihat semua profile
CREATE POLICY "Admins can view all profiles"
ON profiles FOR SELECT
USING (is_admin());

-- ============================================================
-- STEP 6: CLIENTS - Hanya Admin yang bisa akses
-- ============================================================
CREATE POLICY "Admins can do all on clients"
ON clients FOR ALL
USING (is_admin());

-- ============================================================
-- STEP 7: PROJECTS - Admin full access, Client bisa lihat miliknya
-- ============================================================
-- Admin full access
CREATE POLICY "Admins can do all on projects"
ON projects FOR ALL
USING (is_admin());

-- Client bisa lihat project miliknya (berdasarkan client_id)
-- Uncomment jika projects punya kolom client_id yang terhubung ke user
-- CREATE POLICY "Clients can view own projects"
-- ON projects FOR SELECT
-- USING (
--     client_id IN (
--         SELECT id FROM clients WHERE email = auth.jwt()->>'email'
--     )
-- );

-- ============================================================
-- STEP 8: TASKS - Admin full access
-- ============================================================
CREATE POLICY "Admins can do all on tasks"
ON tasks FOR ALL
USING (is_admin());

-- ============================================================
-- STEP 9: TRANSACTIONS - Admin full access
-- ============================================================
CREATE POLICY "Admins can do all on transactions"
ON transactions FOR ALL
USING (is_admin());

-- Client bisa lihat transaksi miliknya
-- Uncomment jika transactions punya kolom client_id
-- CREATE POLICY "Clients can view own transactions"
-- ON transactions FOR SELECT
-- USING (
--     client_id IN (
--         SELECT id FROM clients WHERE email = auth.jwt()->>'email'
--     )
-- );

-- ============================================================
-- STEP 10: PUBLIC READ untuk data tertentu (Opsional)
-- ============================================================
-- Jika ada data yang memang harus bisa dibaca publik (tanpa login),
-- tambahkan policy seperti ini:

-- Contoh: Testimonials/Reviews yang approved bisa dibaca publik
-- CREATE POLICY "Public can read approved testimonials"
-- ON testimonials FOR SELECT
-- USING (status = 'approved');

-- ============================================================
-- CATATAN PENTING
-- ============================================================
-- 1. Setelah menjalankan script ini, pastikan kamu sudah login
--    sebagai admin di aplikasi untuk bisa akses dashboard.
--
-- 2. Untuk membuat user pertama sebagai admin, jalankan:
--    a. Cari user ID: SELECT id, email FROM auth.users;
--    b. Update role:  UPDATE profiles SET role = 'admin' WHERE id = 'USER_ID_HERE';
--
-- 3. Jika ada error "permission denied", kemungkinan kamu belum login
--    atau role profile belum di-set ke 'admin'.
-- ============================================================
