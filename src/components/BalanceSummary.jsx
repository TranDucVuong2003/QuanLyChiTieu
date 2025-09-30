import React from 'react';

const BalanceSummary = ({ expenses }) => {
  const people = ['Trần Vương', 'Hào bé  o', 'Đăng H+ MP Poll'];
  
  const calculateBalances = () => {
    if (expenses.length === 0) {
      return people.map(person => ({ person, balance: 0, spent: 0 }));
    }

    // Tính tổng chi tiêu của mỗi người
    const spentByPerson = people.reduce((acc, person) => {
      acc[person] = expenses
        .filter(expense => expense.person === person)
        .reduce((sum, expense) => sum + expense.amount, 0);
      return acc;
    }, {});

    // Tổng chi tiêu chung
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    
    // Mỗi người cần trả
    const averagePerPerson = totalExpenses / 3;

    // Tính balance cho mỗi người
    return people.map(person => {
      const spent = spentByPerson[person] || 0;
      const balance = spent - averagePerPerson;
      return {
        person,
        spent,
        balance,
        shouldPay: balance < 0 ? Math.abs(balance) : 0,
        shouldReceive: balance > 0 ? balance : 0
      };
    });
  };

  const balances = calculateBalances();
  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', {
      maximumFractionDigits: 0,
      minimumFractionDigits: 0
    }).format(Math.abs(Math.round(amount))) + ' VNĐ';
  };

  const getBalanceColor = (balance) => {
    if (balance > 0) return 'text-green-600';
    if (balance < 0) return 'text-red-600';
    return 'text-gray-600';
  };

  const getBalanceStatus = (balance) => {
    if (balance > 0) return 'Được nhận';
    if (balance < 0) return 'Cần trả';
    return 'Hòa vốn';
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Tình Hình Tài Chính</h2>
      
      <div className="mb-6 p-4 bg-blue-50 rounded-lg">
        <div className="text-center">
          <h3 className="text-lg font-semibold text-gray-700">Tổng Chi Tiêu</h3>
          <p className="text-3xl font-bold text-blue-600">
            {formatCurrency(totalExpenses)}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Trung bình mỗi người: <span className="font-semibold">
              {formatCurrency(totalExpenses / 3)}
            </span>
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {balances.map(({ person, spent, balance, shouldPay, shouldReceive }) => (
          <div 
            key={person} 
            className={`p-4 rounded-lg border-2 ${
              balance > 0 
                ? 'border-green-200 bg-green-50' 
                : balance < 0 
                  ? 'border-red-200 bg-red-50' 
                  : 'border-gray-200 bg-gray-50'
            }`}
          >
            <h3 className="font-bold text-lg mb-2 text-gray-800">{person}</h3>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm text-gray-600">Đã chi:</span>
                <span className="font-semibold text-gray-800">
                  {formatCurrency(spent)}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Trạng thái:</span>
                <span className={`font-bold ${getBalanceColor(balance)}`}>
                  {getBalanceStatus(balance)}
                </span>
              </div>
              
              {balance !== 0 && (
                <div className="mt-3 p-2 rounded-md bg-white">
                  <div className="text-center">
                    {balance > 0 ? (
                      <div>
                        <p className="text-xs text-gray-600">Sẽ nhận lại:</p>
                        <p className="font-bold text-green-600 text-lg">
                          +{formatCurrency(shouldReceive)}
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="text-xs text-gray-600">Cần trả thêm:</p>
                        <p className="font-bold text-red-600 text-lg">
                          -{formatCurrency(shouldPay)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {totalExpenses > 0 && (
        <div className="mt-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-md">
          <h4 className="font-semibold text-yellow-800 mb-2">Cách thanh toán:</h4>
          <div className="text-sm text-yellow-700 space-y-1">
            {balances
              .filter(b => b.balance < 0)
              .map(debtor => {
                const creditors = balances.filter(c => c.balance > 0);
                return creditors.map(creditor => (
                  <p key={`${debtor.person}-${creditor.person}`}>
                    • <strong>{debtor.person}</strong> chuyển{' '}
                    <strong>{formatCurrency(Math.min(Math.abs(debtor.balance), creditor.balance))}</strong>{' '}
                    cho <strong>{creditor.person}</strong>
                  </p>
                ));
              })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BalanceSummary;