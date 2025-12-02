

"use client";

import { Expense } from "@/types/payment";
import { format } from "date-fns";
import { AlertTriangle, DollarSign } from "lucide-react";

type Props = {
    expenses: Expense[];
};

export function ExpensesSection({ expenses }: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "paid":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "overdue":
                return "bg-red-100 text-red-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

    const getCategoryEmoji = (category: string) => {
        const map: Record<string, string> = {
            salaries: "👤",
            utilities: "⚡",
            maintenance: "🔧",
            cleaning: "🧹",
            supplies: "📦",
            insurance: "🛡️",
            taxes: "📊",
            other: "📌",
        };
        return map[category] || "💰";
    };

    const totalExpenses = expenses
        .filter((e) => e.status === "paid")
        .reduce((sum, e) => sum + e.amount, 0);

    const overdueExpenses = expenses.filter((e) => e.status === "overdue");

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <DollarSign className="h-6 w-6" />
                        Expenses
                    </h3>
                    <p className="text-sm text-neutral-500">Total paid: €{totalExpenses.toLocaleString()}</p>
                </div>
                {overdueExpenses.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-red-50 rounded-lg border border-red-200">
                        <AlertTriangle className="h-5 w-5 text-red-600" />
                        <span className="text-sm font-medium text-red-800">{overdueExpenses.length} overdue</span>
                    </div>
                )}
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-neutral-100 text-neutral-700">
                    <tr>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Category</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Description</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Recipient</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Amount</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Date</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Status</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Apartment</th>
                    </tr>
                    </thead>
                    <tbody>
                    {expenses.map((expense) => (
                        <tr key={expense.id} className="border-t hover:bg-neutral-50">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <span className="text-lg">{getCategoryEmoji(expense.category)}</span>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap font-medium">{expense.description}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-neutral-600">{expense.recipient}</td>
                            <td className="px-6 py-4 font-semibold whitespace-nowrap">€{expense.amount.toFixed(2)}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {expense.paidDate
                                    ? format(new Date(expense.paidDate), "dd MMM yyyy")
                                    : format(new Date(expense.dueDate!), "dd MMM yyyy")}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(expense.status)}`}>
                    {expense.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-neutral-600 text-xs whitespace-nowrap">{expense.apartment || "General"}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            {/* Expense Summary by Category */}
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-2">
                {Array.from(new Set(expenses.map((e) => e.category))).map((category) => {
                    const categoryExpenses = expenses.filter((e) => e.category === category && e.status === "paid");
                    const total = categoryExpenses.reduce((sum, e) => sum + e.amount, 0);

                    return (
                        <div key={category} className="bg-white p-3 rounded-lg border border-neutral-200 text-center">
                            <div className="text-2xl mb-1">{getCategoryEmoji(category)}</div>
                            <p className="text-xs font-medium text-neutral-600 mb-1 capitalize">{category}</p>
                            <p className="text-sm font-bold text-neutral-900">€{total.toFixed(0)}</p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}