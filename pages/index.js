import { useState, useEffect } from 'react'
import Head from 'next/head'
import ExpenseForm from '../src/components/ExpenseForm'
import ExpenseHistory from '../src/components/ExpenseHistory'
import BalanceSummary from '../src/components/BalanceSummary'

export default function Home() {
  const [expenses, setExpenses] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_URL = '/api/expenses'

  // Load expenses from API
  const loadExpenses = async () => {
    try {
      setLoading(true)
      const response = await fetch(API_URL)
      if (!response.ok) {
        throw new Error('Không thể tải dữ liệu')
      }
      const data = await response.json()
      setExpenses(data)
      setError(null)
    } catch (err) {
      console.error('Load expenses error:', err)
      setError(err.message)
      // Fallback to localStorage if API fails
      const savedExpenses = localStorage.getItem('roommate-expenses')
      if (savedExpenses) {
        setExpenses(JSON.parse(savedExpenses))
      }
    } finally {
      setLoading(false)
    }
  }

  // Add expense
  const addExpense = async (expenseData) => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(expenseData),
      })

      if (!response.ok) {
        throw new Error('Không thể thêm chi tiêu')
      }

      const newExpense = await response.json()
      setExpenses(prev => [newExpense, ...prev])
      return true
    } catch (err) {
      console.error('Add expense error:', err)
      alert('Không thể thêm chi tiêu: ' + err.message)
      return false
    }
  }

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      const response = await fetch(`${API_URL}?id=${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Không thể xóa chi tiêu')
      }

      setExpenses(prev => prev.filter(expense => expense.id !== id))
    } catch (err) {
      console.error('Delete expense error:', err)
      alert('Không thể xóa chi tiêu: ' + err.message)
    }
  }

  // Clear all expenses
  const clearAllExpenses = async () => {
    if (!confirm('Bạn có chắc chắn muốn xóa tất cả chi tiêu?')) {
      return
    }

    try {
      const response = await fetch(`${API_URL}?id=all`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Không thể xóa dữ liệu')
      }

      setExpenses([])
    } catch (err) {
      console.error('Clear all error:', err)
      alert('Không thể xóa tất cả: ' + err.message)
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(expenses, null, 2);
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `chi-tieu-chung-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const importData = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const importedExpenses = JSON.parse(e.target.result);
          if (Array.isArray(importedExpenses) && window.confirm('Bạn có muốn thay thế dữ liệu hiện tại không?')) {
            setExpenses(importedExpenses);
          }
        } catch {
          alert('File không hợp lệ!');
        }
      };
      reader.readAsText(file);
    }
  };

  useEffect(() => {
    loadExpenses()
  }, [])

  // Auto backup to localStorage
  useEffect(() => {
    localStorage.setItem('roommate-expenses', JSON.stringify(expenses))
  }, [expenses])

  return (
    <>
      <Head>
        <title>Quản Lý Chi Tiêu Chung - Trọ 3 Người</title>
        <meta name="description" content="Ứng dụng chia tiền chi tiêu chung cho 3 người cùng trọ" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="container mx-auto px-4 py-8 max-w-6xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
              💰 Quản Lý Chi Tiêu Chung
            </h1>
            <p className="text-gray-600 text-lg">
              Ứng dụng chia tiền thông minh cho 3 người cùng trọ
            </p>
            
            {/* Connection Status */}
            <div className="mt-4 flex justify-center">
              <button 
                onClick={loadExpenses}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg text-blue-700 text-sm font-medium transition-colors duration-200"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                <span>🌐 Đồng bộ dữ liệu</span>
              </button>
            </div>
            
            {error && (
              <div className="mt-4 p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
                <p className="font-medium">⚠️ {error}</p>
                <p className="text-sm mt-1">Đang sử dụng dữ liệu cục bộ</p>
              </div>
            )}
          </div>

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
              <span className="ml-3 text-gray-600">Đang tải dữ liệu...</span>
            </div>
          ) : (
            <>
              {/* Balance Summary */}
              <BalanceSummary expenses={expenses} />

              {/* Main Content Grid */}
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {/* Left Column: Form */}
                <div className="xl:order-1 order-2">
                  <ExpenseForm onAddExpense={addExpense} />
                </div>

                {/* Right Column: History */}
                <div className="xl:order-2 order-1">
                  <ExpenseHistory 
                    expenses={expenses} 
                    onDeleteExpense={deleteExpense} 
                  />
                  
                  {/* Action Buttons */}
                  {expenses.length > 0 && (
                    <div className="mt-4 space-y-2">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <button
                          onClick={exportData}
                          className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                        >
                          📥 Xuất Dữ Liệu
                        </button>
                        
                        <label className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium cursor-pointer text-center">
                          📤 Nhập Dữ Liệu
                          <input
                            type="file"
                            accept=".json"
                            onChange={importData}
                            className="hidden"
                          />
                        </label>
                      </div>
                      
                      <button
                        onClick={clearAllExpenses}
                        className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors duration-200 text-sm font-medium"
                      >
                        🗑️ Xóa Tất Cả Giao Dịch
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {/* Footer */}
          <footer className="mt-12 text-center text-gray-500 text-sm">
            <p>© 2025 - Ứng dụng quản lý chi tiêu chung cho người cùng trọ</p>
            <p className="mt-1">🌐 Dữ liệu được đồng bộ qua Supabase • Chạy 24/7 trên Vercel</p>
          </footer>
        </div>
      </div>
    </>
  )
}