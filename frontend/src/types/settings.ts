export interface SystemSettings {
    // Business Info
    businessName: string;
    businessAddress: string;
    businessPhone: string;
    businessEmail: string;
    taxId: string;

    // Pricing
    defaultCurrency: string;
    taxRate: number;

    // Booking Rules
    minimumStay: number;
    maximumStay: number;
    checkInTime: string;
    checkOutTime: string;
    cancellationPolicy: string;

    // Payment
    acceptedPaymentMethods: string[];
    depositPercentage: number;

    // Notifications
    emailNotifications: boolean;
    smsNotifications: boolean;

    // Integrations
    bookingChannels: BookingChannel[];
}

export interface BookingChannel {
    id: string;
    name: string;
    enabled: boolean;
    apiKey?: string;
    commission: number;
}