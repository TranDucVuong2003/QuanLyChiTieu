import React, { useState, useEffect } from "react";
import ExpenseForm from './components/ExpenseForm';
import ExpenseHistory from './components/ExpenseHistory';
import BalanceSummary from './components/BalanceSummary';

function App() {
  const [expenses, setExpenses] = useState([]);

  // Load expenses from localStorage on app start
  useEffect(() => {
    const savedExpenses = localStorage.getItem('roommate-expenses');
    if (savedExpenses) {
      setExpenses(JSON.parse(savedExpenses));
    }
  }, []);

  // Save expenses to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem('roommate-expenses', JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
  };

  const deleteExpense = (expenseId) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa giao dịch này?')) {
      setExpenses(prev => prev.filter(expense => expense.id !== expenseId));
    }
  };

  const clearAllExpenses = () => {
    if (window.confirm('Bạn có chắc chắn muốn xóa tất cả giao dịch? Hành động này không thể hoàn tác!')) {
      setExpenses([]);
    }
  };

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

  return (
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
        </div>

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

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2025 - Ứng dụng quản lý chi tiêu chung cho người cùng trọ</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
