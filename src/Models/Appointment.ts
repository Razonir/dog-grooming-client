import { User } from "./User";

export interface Appointment {
    appointmentId?: number;
    appointmentDate?: Date;
    registerDate?: Date;
    UserId?: number;
    user?: User;
}