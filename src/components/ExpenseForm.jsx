import React, { useState } from 'react';

const ExpenseForm = ({ onAddExpense }) => {
  const [formData, setFormData] = useState({
    person: '',
    description: '',
    amount: ''
  });

  const people = ['Trần Vương', 'Hào bé  o', 'Đăng H+ MP Poll'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.person || !formData.description || !formData.amount) {
      alert('Vui lòng điền đầy đủ thông tin');
      return;
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount) <= 0) {
      alert('Số tiền phải là số dương');
      return;
    }

    const expense = {
      id: Date.now(),
      person: formData.person,
      description: formData.description,
      amount: parseFloat(formData.amount),
      date: new Date().toLocaleDateString('vi-VN')
    };

    onAddExpense(expense);
    
    // Reset form
    setFormData({
      person: '',
      description: '',
      amount: ''
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Thêm Chi Tiêu Mới</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="person" className="block text-sm font-medium text-gray-700 mb-2">
            Người mua hàng
          </label>
          <select
            id="person"
            name="person"
            value={formData.person}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">-- Chọn người --</option>
            {people.map((person) => (
              <option key={person} value={person}>
                {person}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Mô tả hành động
          </label>
          <input
            type="text"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Ví dụ: Mua thịt, rau, cơm..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-2">
            Số tiền (VNĐ)
          </label>
          <input
            type="number"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="30000"
            min="0"
            step="1000"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200"
        >
          Thêm Chi Tiêu
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;