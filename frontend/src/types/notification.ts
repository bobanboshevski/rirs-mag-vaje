export interface Notification {
    id: string;

    // Content
    title: string;
    message: string;
    type: "info" | "warning" | "success" | "error";
    category: "booking" | "payment" | "maintenance" | "system" | "message";

    // Status
    read: boolean;

    // Action
    actionUrl?: string;
    actionLabel?: string;

    // Date
    createdAt: string;
    readAt?: string;
}