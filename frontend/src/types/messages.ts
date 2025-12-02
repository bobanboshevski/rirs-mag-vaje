export interface Message {
    id: string;

    // Participants
    guestId: string;
    guestName: string;
    guestEmail: string;

    // Related to
    reservationId?: string;
    apartmentName?: string;

    // Message
    subject: string;
    content: string;

    // Status
    status: "unread" | "read" | "replied" | "archived";
    priority: "normal" | "high" | "urgent";

    // Dates
    sentAt: string;
    readAt?: string;
    repliedAt?: string;

    // Thread
    parentMessageId?: string;
    replies: Message[];
}