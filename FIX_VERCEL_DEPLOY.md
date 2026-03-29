# 🔧 Fix Lỗi Deploy Vercel - CVE-2025-66478

## ✅ Đã Fix

- ✅ Next.js đã được cập nhật từ `15.5.4` → `16.1.6` (phiên bản an toàn)
- ✅ Tất cả security vulnerabilities đã được fix
- ✅ React đã được cập nhật lên `19.2.4`

## 🚀 Các Bước Tiếp Theo

### Bước 1: Commit và Push Code

```bash
git add .
git commit -m "Fix: Update Next.js to 16.1.6 to resolve CVE-2025-66478"
git push
```

Vercel sẽ tự động detect thay đổi và build lại.

### Bước 2: Đảm Bảo Environment Variables Trên Vercel

**QUAN TRỌNG**: File `.env.local` chỉ dùng cho local development. Trên Vercel, bạn PHẢI set environment variables trong dashboard.

1. Vào [Vercel Dashboard](https://vercel.com/dashboard)
2. Chọn project của bạn
3. Vào **Settings** → **Environment Variables**
4. Kiểm tra và cập nhật 2 biến sau:

   ```
   NEXT_PUBLIC_SUPABASE_URL = [URL từ Supabase]
   NEXT_PUBLIC_SUPABASE_ANON_KEY = [Key từ Supabase]
   ```

5. **Chọn tất cả environments**: 
   - ✅ Production
   - ✅ Preview  
   - ✅ Development

6. Click **Save**

### Bước 3: Redeploy (Nếu cần)

Sau khi cập nhật environment variables:

1. Vào tab **Deployments**
2. Click vào deployment mới nhất
3. Click **"..."** → **"Redeploy"**
4. ⏳ Đợi build hoàn tất (2-5 phút)

### Bước 4: Kiểm Tra

1. Mở URL của bạn: `https://your-project.vercel.app`
2. Test API endpoint: `https://your-project.vercel.app/api/expenses`
3. Nếu thấy JSON data → ✅ **THÀNH CÔNG!**

## 🔍 Kiểm Tra Logs Nếu Vẫn Lỗi

1. Vào **Deployments** → Click vào deployment mới nhất
2. Xem tab **Logs** để tìm lỗi cụ thể
3. Các lỗi thường gặp:

### ❌ "Missing Supabase environment variables"
**Giải pháp**: 
- Kiểm tra environment variables trên Vercel đã được set chưa
- Đảm bảo tên biến đúng: `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- Redeploy lại sau khi cập nhật

### ❌ "Failed to connect to Supabase"
**Giải pháp**:
- Kiểm tra Supabase project có đang hoạt động không (không bị pause)
- Kiểm tra URL và Key có đúng không
- Test kết nối local trước: `npm run check:supabase`

### ❌ "Table 'expenses' does not exist"
**Giải pháp**:
- Vào Supabase → SQL Editor
- Chạy script từ file `database_setup.sql`

## 📋 Checklist

- [ ] Code đã được commit và push lên Git
- [ ] Vercel đã tự động build lại với Next.js 16.1.6
- [ ] Environment variables đã được set trên Vercel
- [ ] Đã redeploy lại (nếu cần)
- [ ] App đã hoạt động bình thường

## 💡 Lưu Ý

- **Environment Variables**: Luôn nhớ rằng `.env.local` chỉ dùng cho local. Trên Vercel phải set trong dashboard.
- **Supabase**: Đảm bảo project không bị pause. Nếu bị pause, restore trước khi deploy.
- **Build Time**: Build có thể mất 2-5 phút, đừng lo lắng nếu thấy đang build.

## 🆘 Nếu Vẫn Không Được

1. Xem logs chi tiết trên Vercel
2. Test local trước: `npm run dev`
3. Kiểm tra Supabase project có hoạt động không
4. Xem file `KHÔI_PHỤC_DỰ_ÁN.md` để có hướng dẫn chi tiết hơn
