export interface MaintenanceRequest {
    id: string;
    apartmentId: string;
    apartmentName: string;

    // Issue details
    title: string;
    description: string;
    category: "plumbing" | "electrical" | "appliance" | "hvac" | "general" | "emergency";
    priority: "low" | "medium" | "high" | "urgent";

    // Status
    status: "pending" | "in-progress" | "completed" | "cancelled";

    // Assignment
    assignedTo?: string;
    estimatedCost?: number;
    actualCost?: number;

    // Dates
    reportedDate: string;
    scheduledDate?: string;
    completedDate?: string;

    // Media
    images?: string[];
    notes?: string;
}

export interface MaintenanceAlert {
    id: string;
    apartmentName: string;
    issue: string;
    priority: "low" | "medium" | "high" | "urgent";
    reportedDate: string;
}