"use client";

import {Payment} from "@/types/payment";
import {format} from "date-fns";
import {CreditCard} from "lucide-react";

type Props = {
    payments: Payment[];
};

export function IncomeSection({payments}: Props) {
    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "failed":
                return "bg-red-100 text-red-800";
            case "refunded":
                return "bg-orange-100 text-orange-800";
            default:
                return "bg-neutral-100 text-neutral-800";
        }
    };

    // const getMethodIcon = (method: string) => {
    //     switch (method) {
    //         case "card":
    //             return "💳";
    //         case "cash":
    //             return "💵";
    //         case "bank-transfer":
    //             return "🏦";
    //         case "online":
    //             return "💻";
    //         default:
    //             return "💰";
    //     }
    // };

    const totalIncome = payments
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.amount, 0);

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-xl font-semibold flex items-center gap-2">
                        <CreditCard className="h-6 w-6"/>
                        Income
                    </h3>
                    <p className="text-sm text-neutral-500">Total received: €{totalIncome.toLocaleString()}</p>
                </div>
            </div>

            <div className="rounded-lg border border-neutral-200 bg-white overflow-hidden overflow-x-auto">
                <table className="min-w-full text-sm text-left">
                    <thead className="bg-neutral-100 text-neutral-700">
                    <tr>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Guest</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Apartment</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Method</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Amount</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Date</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Status</th>
                        <th className="px-6 py-3 font-semibold whitespace-nowrap">Notes</th>
                    </tr>
                    </thead>
                    <tbody>
                    {payments.map((payment) => (
                        <tr key={payment.id} className="border-t hover:bg-neutral-50">
                            <td className="px-6 py-4 font-medium whitespace-nowrap">{payment.guestName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">{payment.apartmentName}</td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {/*<span className="text-lg">{getMethodIcon(payment.method)}</span>*/}
                                <span className="text-lg">{(payment.method)}</span>
                            </td>
                            <td className="px-6 py-4 font-semibold whitespace-nowrap">€{payment.amount.toFixed(2)}</td>
                            {/*<td className="px-6 py-4 whitespace-nowrap">{format(new Date(payment.paymentDate), "dd MMM yyyy")}</td>*/}
                            <td className="px-6 py-4 whitespace-nowrap">
                                {payment.paymentDate
                                    ? format(new Date(payment.paymentDate), "dd MMM yyyy")
                                    : "-"}
                            </td>

                            <td className="px-6 py-4 whitespace-nowrap">
                  <span
                      className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${getStatusColor(payment.status)}`}>
                    {payment.status}
                  </span>
                            </td>
                            <td className="px-6 py-4 text-neutral-600 text-xs whitespace-nowrap max-w-xs truncate">
                                {payment.notes || "-"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}