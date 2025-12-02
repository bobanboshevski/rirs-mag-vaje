export interface CleaningTask {
    id: string;
    apartmentId: string;
    apartmentName: string;

    // Schedule
    scheduledDate: string;
    scheduledTime: string;
    type: "checkout" | "checkin" | "deep" | "routine";

    // Status
    status: "scheduled" | "in-progress" | "completed" | "skipped";

    // Assignment
    cleanerId?: string;
    cleanerName?: string;

    // Details
    estimatedDuration: number; // minutes
    actualDuration?: number;
    checklist: CleaningChecklistItem[];

    // Quality control
    inspected: boolean;
    inspectionPassed?: boolean;
    inspectionNotes?: string;

    completedAt?: string;
}

export interface CleaningChecklistItem {
    id: string;
    task: string;
    completed: boolean;
}