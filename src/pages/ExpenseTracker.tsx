import React, { useState } from 'react';
import { IndianRupee, Plus, Trash2, PieChart } from 'lucide-react';

interface Expense {
  id: number;
  category: string;
  amount: number;
  date: string;
  description: string;
}

const categories = [
  'Accommodation',
  'Food',
  'Transportation',
  'Activities',
  'Shopping',
  'Others'
];

function ExpenseTracker() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [newExpense, setNewExpense] = useState({
    category: 'Accommodation',
    amount: '',
    date: new Date().toISOString().split('T')[0],
    description: ''
  });

  const addExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newExpense.amount || !newExpense.date) return;

    setExpenses([
      ...expenses,
      {
        id: Date.now(),
        category: newExpense.category,
        amount: Number(newExpense.amount),
        date: newExpense.date,
        description: newExpense.description
      }
    ]);

    setNewExpense({
      category: 'Accommodation',
      amount: '',
      date: new Date().toISOString().split('T')[0],
      description: ''
    });
  };

  const deleteExpense = (id: number) => {
    setExpenses(expenses.filter(expense => expense.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);

  const expensesByCategory = categories.map(category => ({
    category,
    amount: expenses
      .filter(expense => expense.category === category)
      .reduce((sum, expense) => sum + expense.amount, 0)
  }));

  return (
    <div className="py-12 px-6 bg-gray-50 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Travel Expense Tracker</h1>
        <p className="text-gray-600 text-center mb-12">
          Keep track of your expenses during your Uttarakhand journey
        </p>

        {/* Add Expense Form */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add New Expense</h2>
          <form onSubmit={addExpense} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  value={newExpense.category}
                  onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                <input
                  type="number"
                  value={newExpense.amount}
                  onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter amount"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense({ ...newExpense, date: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <input
                  type="text"
                  value={newExpense.description}
                  onChange={(e) => setNewExpense({ ...newExpense, description: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2"
                  placeholder="Enter description"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-yellow-400 text-gray-900 py-2 rounded-lg font-semibold hover:bg-yellow-500 transition flex items-center justify-center"
            >
              <Plus className="h-5 w-5 mr-2" />
              Add Expense
            </button>
          </form>
        </div>

        {/* Expense Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Total Expenses</h2>
            <div className="flex items-center justify-center text-3xl font-bold text-yellow-600">
              <IndianRupee className="h-8 w-8 mr-2" />
              {totalExpenses}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Expenses by Category</h2>
            <div className="space-y-2">
              {expensesByCategory.map(({ category, amount }) => (
                amount > 0 && (
                  <div key={category} className="flex justify-between items-center">
                    <span className="text-gray-600">{category}</span>
                    <span className="font-semibold">₹{amount}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        </div>

        {/* Expense List */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Recent Expenses</h2>
          <div className="space-y-4">
            {expenses.length === 0 ? (
              <p className="text-center text-gray-500">No expenses recorded yet</p>
            ) : (
              expenses.map(expense => (
                <div
                  key={expense.id}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{expense.category}</div>
                    <div className="text-sm text-gray-600">{expense.description}</div>
                    <div className="text-sm text-gray-500">{expense.date}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold">₹{expense.amount}</span>
                    <button
                      onClick={() => deleteExpense(expense.id)}
                      className="text-red-500 hover:text-red-600"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExpenseTracker;