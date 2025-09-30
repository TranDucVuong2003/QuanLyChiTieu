# 📋 Hướng dẫn Setup Supabase Database

## Bước 1: Tạo bảng expenses

1. Vào **SQL Editor** trong Supabase Dashboard
2. Chạy script SQL sau:

```sql
-- Tạo bảng expenses
CREATE TABLE expenses (
  id SERIAL PRIMARY KEY,
  person VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm Row Level Security (RLS) - Bảo mật
ALTER TABLE expenses ENABLE ROW LEVEL SECURITY;

-- Tạo policies cho phép tất cả mọi người đọc/ghi (cho app chia sẻ)
CREATE POLICY "Enable read access for all users" 
ON expenses FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" 
ON expenses FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" 
ON expenses FOR DELETE USING (true);

-- Thêm dữ liệu mẫu (tùy chọn)
INSERT INTO expenses (person, description, amount) VALUES 
('Trần Vương', 'Mua thịt bò', 50000),
('Hào bé  o', 'Mua rau xanh', 30000),
('Đăng H+ MP Poll', 'Mua gạo và gia vị', 120000);
```

## Bước 2: Lấy thông tin kết nối

1. Vào **Settings** → **API**
2. Copy các thông tin sau:
   - **Project URL**: https://xxx.supabase.co
   - **anon public key**: eyJhbGciOiJIUzI1NiIs...

## Bước 3: Cập nhật .env.local

Thay thế thông tin trong file .env.local:
```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

**Lưu ý:** 
- Không chia sẻ anon key với người khác
- File .env.local sẽ không được commit lên git (đã có trong .gitignore)