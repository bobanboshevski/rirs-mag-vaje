export interface Payment {
    id: string;
    reservationId: string;
    guestName: string;
    apartmentName: string;

    // Amount
    amount: number;
    currency: string;

    // Payment details
    method: "cash" | "card" | "bank-transfer" | "online";
    status: "pending" | "completed" | "failed" | "refunded";

    // Dates
    dueDate: string;
    paymentDate?: string;

    // Transaction
    transactionId?: string;
    receipt?: string;

    // Notes
    notes?: string;
}


export interface Expense {
    id: string;
    category: "salaries" | "utilities" | "maintenance" | "cleaning" | "supplies" | "insurance" | "taxes" | "other";
    description: string;
    amount: number;
    currency: string;
    paidDate?: string;
    dueDate?: string;
    recipient: string;
    status: "paid" | "pending" | "overdue";
    apartment?: string; // Which apartment(s) this expense is for
    attachments?: string[];
    notes?: string;
}

export interface PaymentStats {
    totalIncome: number;
    totalExpenses: number;
    netProfit: number;
    pendingPayments: number;
    completedPayments: number;
    overallProfitMargin: number;
}