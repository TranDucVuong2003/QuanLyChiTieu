/**
 * Script kiểm tra kết nối Supabase
 * Chạy: node scripts/check-connection.js
 */

require('dotenv').config({ path: '.env.local' });

const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

console.log('🔍 Đang kiểm tra kết nối Supabase...\n');

// Kiểm tra environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('❌ LỖI: Thiếu environment variables!');
  console.log('\nVui lòng tạo file .env.local với nội dung:');
  console.log('NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co');
  console.log('NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key');
  process.exit(1);
}

console.log('✅ Environment variables đã được tìm thấy');
console.log(`   URL: ${supabaseUrl}`);
console.log(`   Key: ${supabaseAnonKey.substring(0, 20)}...\n`);

// Tạo Supabase client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Test kết nối
async function testConnection() {
  try {
    console.log('🔄 Đang test kết nối đến Supabase...');
    
    // Test 1: Kiểm tra bảng expenses
    const { data, error } = await supabase
      .from('expenses')
      .select('count')
      .limit(1);

    if (error) {
      if (error.code === 'PGRST116') {
        console.error('❌ LỖI: Bảng "expenses" không tồn tại!');
        console.log('\nVui lòng chạy script SQL từ file database_setup.sql hoặc SUPABASE_SETUP.md');
      } else if (error.message.includes('JWT')) {
        console.error('❌ LỖI: Supabase Anon Key không hợp lệ!');
        console.log('\nVui lòng kiểm tra lại anon key trong Supabase Dashboard → Settings → API');
      } else if (error.message.includes('connect') || error.message.includes('timeout')) {
        console.error('❌ LỖI: Không thể kết nối đến Supabase!');
        console.log('\nCó thể Supabase project đã bị pause. Vui lòng:');
        console.log('1. Vào Supabase Dashboard');
        console.log('2. Restore project nếu bị pause');
        console.log('3. Đợi 2-5 phút để project được khôi phục');
      } else {
        console.error('❌ LỖI:', error.message);
      }
      process.exit(1);
    }

    console.log('✅ Kết nối thành công!');
    console.log('✅ Bảng "expenses" đã tồn tại\n');

    // Test 2: Đếm số records
    const { count, error: countError } = await supabase
      .from('expenses')
      .select('*', { count: 'exact', head: true });

    if (countError) {
      console.warn('⚠️  Không thể đếm số records:', countError.message);
    } else {
      console.log(`📊 Số lượng chi tiêu trong database: ${count || 0}`);
    }

    console.log('\n🎉 Tất cả kiểm tra đều thành công!');
    console.log('✅ Bạn có thể deploy lên Vercel hoặc chạy local với: npm run dev');

  } catch (err) {
    console.error('❌ LỖI KHÔNG XÁC ĐỊNH:', err.message);
    process.exit(1);
  }
}

testConnection();
