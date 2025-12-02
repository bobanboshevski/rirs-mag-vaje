import {Payment, Expense, PaymentStats} from "@/types/payment";

export async function getPayments(): Promise<Payment[]> {
    // return await fetchFromApi("/api/dashboard/payments", {
    // method: "GET",
    // })

    return [
        {
            id: "pay_001",
            reservationId: "res_101",
            guestName: "Sophie Laurent",
            apartmentName: "Lakeview Apartment",
            amount: 525,
            currency: "EUR",
            method: "card",
            status: "completed",
            paymentDate: "2025-10-10T14:30:00Z",
            dueDate: "2025-10-15T00:00:00Z",
            notes: "Full payment received",
        },
        {
            id: "pay_002",
            reservationId: "res_102",
            guestName: "Marco Rossi",
            apartmentName: "Central City Loft",
            amount: 791.31,
            currency: "EUR",
            method: "bank-transfer",
            status: "completed",
            paymentDate: "2025-10-05T10:00:00Z",
            dueDate: "2025-10-18T00:00:00Z",
            notes: "Transferred from Italy",
        },
        {
            id: "pay_003",
            reservationId: "res_103",
            guestName: "Anna Kowalski",
            apartmentName: "Sunset Studio",
            amount: 250,
            currency: "EUR",
            method: "online",
            status: "pending",
            paymentDate: "2025-10-12T00:00:00Z",
            dueDate: "2025-10-22T00:00:00Z",
            notes: "Awaiting payment confirmation",
        },
        {
            id: "pay_004",
            reservationId: "res_104",
            guestName: "David Chen",
            apartmentName: "Garden View Suite",
            amount: 420,
            currency: "EUR",
            method: "card",
            status: "refunded",
            paymentDate: "2025-09-20T15:45:00Z",
            dueDate: "2025-11-01T00:00:00Z",
            notes: "Refunded due to cancellation",
        },
        {
            id: "pay_005",
            reservationId: "res_105",
            guestName: "Lisa Anderson",
            apartmentName: "Mountain View Retreat",
            amount: 360,
            currency: "EUR",
            method: "cash",
            status: "completed",
            paymentDate: "2025-10-08T11:20:00Z",
            dueDate: "2025-10-20T00:00:00Z",
        },
    ];
}


export async function getExpenses(): Promise<Expense[]> {
    // TODO: Replace with API call
    // return await fetchFromApi("/expenses", { method: "GET" });

    return [
        {
            id: "exp_001",
            category: "salaries",
            description: "Monthly salary - Cleaning staff",
            amount: 1500,
            currency: "EUR",
            paidDate: "2025-10-05T09:00:00Z",
            recipient: "John Doe",
            status: "paid",
            notes: "October salary",
        },
        {
            id: "exp_002",
            category: "utilities",
            description: "Electricity bill",
            amount: 320,
            currency: "EUR",
            paidDate: "2025-10-03T14:30:00Z",
            recipient: "Local Utility Company",
            status: "paid",
            apartment: "All apartments",
            notes: "Monthly electricity",
        },
        {
            id: "exp_003",
            category: "utilities",
            description: "Water and sewage",
            amount: 150,
            currency: "EUR",
            paidDate: "2025-10-03T14:30:00Z",
            recipient: "Local Utility Company",
            status: "paid",
            apartment: "All apartments",
        },
        {
            id: "exp_004",
            category: "maintenance",
            description: "AC unit repair - Sunset Studio",
            amount: 280,
            currency: "EUR",
            paidDate: "2025-10-08T10:15:00Z",
            recipient: "ABC Maintenance Services",
            status: "paid",
            apartment: "Sunset Studio",
            notes: "Emergency repair completed",
        },
        {
            id: "exp_005",
            category: "cleaning",
            description: "Professional cleaning supplies",
            amount: 85,
            currency: "EUR",
            paidDate: "2025-10-10T15:45:00Z",
            recipient: "CleanCo Supplies",
            status: "paid",
        },
        {
            id: "exp_006",
            category: "supplies",
            description: "Bedding and linens replacement",
            amount: 420,
            currency: "EUR",
            dueDate: "2025-10-20T00:00:00Z",
            recipient: "Textile Suppliers Ltd",
            status: "pending",
            apartment: "All apartments",
            notes: "Order pending delivery",
        },
        {
            id: "exp_007",
            category: "insurance",
            description: "Property insurance - October",
            amount: 450,
            currency: "EUR",
            dueDate: "2025-10-15T00:00:00Z",
            recipient: "Insurance Company",
            status: "pending",
            apartment: "All apartments",
        },
        {
            id: "exp_008",
            category: "salaries",
            description: "Monthly salary - Manager",
            amount: 2000,
            currency: "EUR",
            dueDate: "2025-10-12T00:00:00Z",
            recipient: "Jane Smith",
            status: "overdue",
            notes: "Payment overdue - needs attention",
        },
    ];
}

export async function getPaymentStats(): Promise<PaymentStats> {
    const payments = await getPayments();
    const expenses = await getExpenses();

    const totalIncome = payments
        .filter((p) => p.status === "completed")
        .reduce((sum, p) => sum + p.amount, 0);

    const totalExpenses = expenses
        .filter((e) => e.status === "paid")
        .reduce((sum, e) => sum + e.amount, 0);

    const netProfit = totalIncome - totalExpenses;
    const profitMargin = (netProfit / totalIncome) * 100;

    return {
        totalIncome,
        totalExpenses,
        netProfit,
        pendingPayments: payments.filter((p) => p.status === "pending").length,
        completedPayments: payments.filter((p) => p.status === "completed").length,
        overallProfitMargin: profitMargin,
    };
}