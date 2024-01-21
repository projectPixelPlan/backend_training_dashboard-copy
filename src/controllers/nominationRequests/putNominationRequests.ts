import { Request, Response } from 'express';
import NominationRequest from '../../models/nominationRequest';
import UserRole from '../../models/userRole';
import User from '../../models/user';
import UserTraining from '../../models/userTraining';

const putNominations = async (req: Request, res: Response): Promise<void | object> => {
    try {
        const nominations = req.body as { id: number, status: string, remarks: string }[];
        // const { ssoId } = req.body.jwt_decoded;
        // const ssoId = "9a0c17da-842d-4c7d-9a24-e2896a7a4a20"; //manager
        const ssoId = "db9f5e29-1e4c-4d6f-93cb-2d32c6a2ef65"; //L&D

        const user = await User.findOne({ //To get userId
            attributes: ['id'],
            where: { ssoId: ssoId },
        });

        const userRole = await UserRole.findOne({ //To get roleId
            where: { userId: user?.id },
            attributes: ['roleId']
        });

        const roleId = userRole?.roleId;

        for (const nomination of nominations) {
            if (!nomination.id || !nomination.status) {
                return res.status(400).json({ error: 'Invalid Request' });
            }

            if (roleId === 2) { // Manager
                if (nomination.status === "Approved") {
                    await NominationRequest.update({ status: nomination.status, remarks: "Approved By Manager", updatedBy:user?.id }, { where: { id: nomination.id, assignerId: user?.id } });
                } 
                else {
                    await NominationRequest.update({ status: nomination.status, remarks: nomination.remarks, updatedBy:user?.id }, { where: { id: nomination.id, assignerId: user?.id } });
                }
            } 
            else if (roleId === 3) { // L&D
                if (nomination.status === "Approved") {
                    await NominationRequest.update({ assignerId: user?.id, status: nomination.status, remarks: "Approved By L&D", updatedBy:user?.id }, { where: { id: nomination.id } });
                    
                    const details = await NominationRequest.findOne({ 
                        attributes: ['userId', 'trainingProgramId', ],
                        where: { id: nomination.id },
                    });

                    if (details) {
                        await UserTraining.create({
                            userId: details.userId,
                            trainingProgramId: details.trainingProgramId,
                            completionStatus: "Enrolled",
                            isActive: true,
                        });
                    } else {
                        // Handle the case where details is null
                        console.error('Details not found for nomination ID:', nomination.id);
                    }
                } 
                else {
                    await NominationRequest.update({ assignerId: user?.id, status: nomination.status, remarks: nomination.remarks, updatedBy:user?.id }, { where: { id: nomination.id } });
                    
                    const details = await NominationRequest.findOne({ 
                        attributes: ['userId', 'trainingProgramId', ],
                        where: { id: nomination.id },
                    });

                    if (details) {
                        await UserTraining.create({
                            userId: details.userId,
                            trainingProgramId: details.trainingProgramId,
                            completionStatus: "Enrolled",
                            isActive: true,
                        });
                    } else {
                        // Handle the case where details is null
                        console.error('Details not found for nomination ID:', nomination.id);
                    }
                }
            }
        }

        if (roleId === 3) {
            res.status(200).json({ message: 'L&D Updated' });
        } 
        else if (roleId === 2) {
            res.status(200).json({ message: 'Manager Updated' });
        } 
        else {
            res.status(403).json({ error: 'Access Denied' });
        }
    } 
    catch (error: any) {
        console.error('Error:', error);
        res.status(500).json({ error: error.toString() });
    }
}

export default putNominations;
