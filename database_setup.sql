-- ==========================================
-- SUPABASE DATABASE SETUP SCRIPT
-- ==========================================

-- Tạo bảng expenses
CREATE TABLE public.expenses (
  id BIGSERIAL PRIMARY KEY,
  person VARCHAR(100) NOT NULL,
  description TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Thêm Row Level Security (RLS) để bảo mật
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- Tạo policies cho phép mọi người truy cập (phù hợp app chia sẻ)
CREATE POLICY "Enable read access for all users" 
ON public.expenses FOR SELECT USING (true);

CREATE POLICY "Enable insert access for all users" 
ON public.expenses FOR INSERT WITH CHECK (true);

CREATE POLICY "Enable delete access for all users" 
ON public.expenses FOR DELETE USING (true);

CREATE POLICY "Enable update access for all users"
ON public.expenses FOR UPDATE USING (true);

-- Thêm dữ liệu mẫu để test
INSERT INTO public.expenses (person, description, amount) VALUES 
('Trần Vương', 'Mua thịt bò', 50000),
('Hào bé  o', 'Mua rau xanh', 30000),
('Đăng H+ MP Poll', 'Mua gạo và gia vị', 120000),
('Trần Vương', 'Điện nước tháng 9', 200000),
('Hào bé  o', 'Mua đồ ăn vặt', 45000);

-- Kiểm tra dữ liệu đã được tạo
SELECT * FROM public.expenses ORDER BY created_at DESC;