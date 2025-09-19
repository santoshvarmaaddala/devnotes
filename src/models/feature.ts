export interface Note {
    id: string;
    content: string;
    createdAt: string;
}

export type FeatureType = "feature" | "bug" | "idea" | "task";
export type FeatureStatus = "todo" | "in-progress" | "completed";

export interface DevNotesData {
    features: {
        id: string;
        title: string;
        type: FeatureType;
        status: FeatureStatus;
        priority?: "low" | "medium" | "high";
        createdAt: string;
        updatedAt: string;
        notes: Note[]
    }[];
}