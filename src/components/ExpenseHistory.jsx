import React from 'react';

const ExpenseHistory = ({ expenses, onDeleteExpense }) => {
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + ' VNĐ';
  };

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">Lịch Sử Chi Tiêu</h2>
        <div className="text-center py-8 text-gray-500">
          <p className="text-lg">Chưa có giao dịch nào</p>
          <p className="text-sm">Hãy thêm chi tiêu đầu tiên của bạn!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Lịch Sử Chi Tiêu</h2>
      
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Desktop Table View */}
          <div className="hidden md:block">
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Ngày
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Người mua
                  </th>
                  <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 border-b">
                    Mô tả
                  </th>
                  <th className="px-4 py-3 text-right text-sm font-medium text-gray-700 border-b">
                    Số tiền
                  </th>
                  <th className="px-4 py-3 text-center text-sm font-medium text-gray-700 border-b">
                    Hành động
                  </th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice().reverse().map((expense, index) => (
                  <tr 
                    key={expense.id} 
                    className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}
                  >
                    <td className="px-4 py-3 text-sm text-gray-600 border-b">
                      {expense.date}
                    </td>
                    <td className="px-4 py-3 text-sm font-medium text-gray-900 border-b">
                      {expense.person}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-700 border-b">
                      {expense.description}
                    </td>
                    <td className="px-4 py-3 text-sm font-bold text-green-600 text-right border-b">
                      {formatCurrency(expense.amount)}
                    </td>
                    <td className="px-4 py-3 text-center border-b">
                      <button
                        onClick={() => onDeleteExpense(expense.id)}
                        className="text-red-600 hover:text-red-800 hover:bg-red-50 p-1 rounded-full transition-colors duration-150"
                        title="Xóa giao dịch"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
            {expenses.slice().reverse().map((expense) => (
              <div key={expense.id} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="font-semibold text-gray-900">{expense.person}</div>
                    <div className="text-sm text-gray-600">{expense.date}</div>
                  </div>
                  <button
                    onClick={() => onDeleteExpense(expense.id)}
                    className="text-red-600 hover:text-red-800 hover:bg-red-100 p-2 rounded-full transition-colors duration-150"
                    title="Xóa giao dịch"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" 
                      />
                    </svg>
                  </button>
                </div>
                <div className="text-sm text-gray-700 mb-2">{expense.description}</div>
                <div className="text-lg font-bold text-green-600">
                  {formatCurrency(expense.amount)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <span>Tổng cộng {expenses.length} giao dịch</span>
        <span>
          Tổng chi tiêu: <strong className="text-gray-900">
            {formatCurrency(expenses.reduce((sum, expense) => sum + expense.amount, 0))}
          </strong>
        </span>
      </div>
    </div>
  );
};

export default ExpenseHistory;