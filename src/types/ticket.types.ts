export type TicketStatus = "open" | "in-progress" | "resolved" | "closed";
export type TicketPriority = "low" | "medium" | "high" | "urgent";

export interface Ticket {
    id :string;
    subjec:string;
    description:string;
    status: TicketStatus;
    priority: TicketPriority;
    customerId: string;
    assignedAgentId: string;
    createdAt: string;
    updatedAt: string;
}