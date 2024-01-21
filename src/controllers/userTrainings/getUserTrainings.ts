import { Request, Response } from 'express';
import User from '../../models/user';
import UserRole from '../../models/userRole';
import UserTraining from '../../models/userTraining';

const getUserTrainings = async (req: Request, res: Response): Promise<void> => {
    try {
        // const { ssoId } = req.body.jwt_decoded;
        // const ssoId="73a4feb0-7c36-4acc-a35b-4bdb1da72fa0" //employee
        const ssoId="db9f5e29-1e4c-4d6f-93cb-2d32c6a2ef65" //L&D

        if (!ssoId) {
            res.status(422).json({ message: "Bad Request" });
            return;
        }

        const user = await User.findOne({
            attributes: ['id'],
            where: { ssoId: ssoId },
        });

        const userRole = await UserRole.findOne({
            where: { userId: user?.id },
            attributes: ['roleId'],
        });

        const roleId = userRole?.roleId;

        if (roleId === 1 || roleId === 2) {
            // Roles 1 and 2 have specific user filtering
            const trainingDetails = await UserTraining.findAll({ attributes: ['trainingProgramId', 'completionStatus'], where: { userId: user?.id } });
            res.status(200).json({ Trainings: trainingDetails });
        } else if (roleId === 3) {
            // Role 3 has access to all user trainings
            const trainingDetails = await UserTraining.findAll();
            res.status(200).json({ Trainings: trainingDetails });
        } else {
            // Handle other roles or no role scenario
            res.status(403).json({ error: 'Access Denied' });
        }
    } catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: error.toString() });
    }
};

export default getUserTrainings;
