export interface Invoice {
    id: string;
    invoiceNumber: string;
    reservationId: string;

    // Customer
    guestName: string;
    guestEmail: string;
    guestAddress?: string;

    // Items
    items: InvoiceItem[];

    // Amounts
    subtotal: number;
    tax: number;
    discount: number;
    total: number;

    // Status
    status: "draft" | "sent" | "paid" | "overdue" | "cancelled";

    // Dates
    issueDate: string;
    dueDate: string;
    paidDate?: string;

    // Notes
    notes?: string;
    termsAndConditions?: string;
}

export interface InvoiceItem {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
}