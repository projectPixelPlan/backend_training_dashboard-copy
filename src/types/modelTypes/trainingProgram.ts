import { UUID } from 'crypto';
import { Model } from 'sequelize';

class TrainingProgram extends Model {
    public id?: number;
    public title!: string;
    public trainingTypeId!: number;
    public description!: string;
    public trainingMode!: "Online" | "Offline";
    public startDate!: Date;
    public endDate!: Date;
    public duration!: number;
    public availableSeats!: number;
    public occuranceType!: "Daily" | "Weekly" | "Monthly";
    public occuranceInterval!: number;
    public status!: "Upcoming" | "Ongoing" | "Completed" | "Cancelled" | "Postponed";
    public createdBy?: UUID;
    public isActive?: Boolean;
    public readonly createdAt?: Date;
    public readonly updatedAt?: Date;
};

export default TrainingProgram ;