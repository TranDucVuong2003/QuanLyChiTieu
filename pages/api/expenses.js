import { supabase } from '../../lib/supabase'

export default async function handler(req, res) {
  // Thêm CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') {
    res.status(200).end()
    return
  }

  try {
    switch (req.method) {
      case 'GET': {
        const { data: expenses, error: getError } = await supabase
          .from('expenses')
          .select('*')
          .order('created_at', { ascending: false })

        if (getError) throw getError
        
        // Format dữ liệu cho frontend
        const formattedExpenses = expenses.map(expense => ({
          id: expense.id,
          person: expense.person,
          description: expense.description,
          amount: parseFloat(expense.amount),
          date: new Date(expense.created_at).toLocaleDateString('vi-VN')
        }))
        
        res.status(200).json(formattedExpenses)
        break
      }

      case 'POST': {
        const { person, description, amount } = req.body

        if (!person || !description || !amount) {
          return res.status(400).json({ error: 'Thiếu thông tin bắt buộc' })
        }

        const { data: newExpense, error: postError } = await supabase
          .from('expenses')
          .insert([{
            person: person.trim(),
            description: description.trim(),
            amount: parseFloat(amount)
          }])
          .select()

        if (postError) throw postError
        
        // Format dữ liệu trả về
        const formatted = {
          id: newExpense[0].id,
          person: newExpense[0].person,
          description: newExpense[0].description,
          amount: parseFloat(newExpense[0].amount),
          date: new Date(newExpense[0].created_at).toLocaleDateString('vi-VN')
        }
        
        res.status(201).json(formatted)
        break
      }

      case 'DELETE': {
        const { id } = req.query

        if (id === 'all') {
          const { error: deleteAllError } = await supabase
            .from('expenses')
            .delete()
            .neq('id', 0) // Delete all records

          if (deleteAllError) throw deleteAllError
          res.status(200).json({ success: true, message: 'Đã xóa tất cả chi tiêu' })
        } else {
          const { error: deleteError } = await supabase
            .from('expenses')
            .delete()
            .eq('id', id)

          if (deleteError) throw deleteError
          res.status(200).json({ success: true, message: 'Đã xóa chi tiêu' })
        }
        break
      }

      default:
        res.setHeader('Allow', ['GET', 'POST', 'DELETE'])
        res.status(405).end(`Method ${req.method} Not Allowed`)
    }
  } catch (error) {
    console.error('API Error:', error)
    res.status(500).json({ 
      error: 'Lỗi server',
      details: error.message 
    })
  }
}