import { Model } from 'sequelize';

class TrainingPrograms extends Model {
    public Id?: number;
    public Title!: string;
    public TrainingTypeId!: number;
    public Description!: string;
    public TrainingMode!: "Online" | "Offline";
    public StartDate!: Date;
    public EndDate!: Date;
    public Duration!: number;
    public AvailableSeats!: number;
    public OccuranceType!: "Daily" | "Weekly" | "Monthly";
    public OccuranceInterval!: number;
    public Status!: "Upcoming" | "Ongoing" | "Completed" | "Cancelled" | "Postponed";
    public CreatedBy?: string;
    public IsActive?: Boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
};

export { TrainingPrograms };