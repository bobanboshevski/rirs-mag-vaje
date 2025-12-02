"use client";

import {PaymentStats as PaymentStatsType} from "@/types/payment";
import {TrendingUp, TrendingDown, DollarSign, AlertCircle} from "lucide-react";

type Props = {
    stats: PaymentStatsType;
};

export function PaymentStats({stats}: Props) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">Total Income</p>
                    <TrendingUp className="h-5 w-5 text-green-600"/>
                </div>
                <p className="text-3xl font-bold text-neutral-900">€{stats.totalIncome.toLocaleString()}</p>
                <p className="text-xs text-green-600 mt-2">{stats.completedPayments} completed payments</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">Total Expenses</p>
                    <TrendingDown className="h-5 w-5 text-red-600"/>
                </div>
                <p className="text-3xl font-bold text-neutral-900">€{stats.totalExpenses.toLocaleString()}</p>
                <p className="text-xs text-neutral-600 mt-2">Operational costs</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">Net Profit</p>
                    <DollarSign className="h-5 w-5 text-blue-600"/>
                </div>
                <p className={`text-3xl font-bold ${stats.netProfit >= 0 ? "text-green-600" : "text-red-600"}`}>
                    €{stats.netProfit.toLocaleString()}
                </p>
                <p className="text-xs text-neutral-600 mt-2">{stats.overallProfitMargin.toFixed(1)}% margin</p>
            </div>

            <div className="bg-white p-6 rounded-lg border border-neutral-200">
                <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-neutral-600">Pending</p>
                    <AlertCircle className="h-5 w-5 text-yellow-600"/>
                </div>
                <p className="text-3xl font-bold text-neutral-900">{stats.pendingPayments}</p>
                <p className="text-xs text-yellow-600 mt-2">Awaiting payment</p>
            </div>
        </div>
    );
}