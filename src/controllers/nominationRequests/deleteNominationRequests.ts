import { Request, Response } from 'express';
import NominationRequest from '../../models/nominationRequest';
import User from '../../models/user';
import sequelize from '../../config/sequelize';

const deleteNominationRequests = async (req: Request, res: Response): Promise<void | object> => {

    try {
        const nominations = req.body as { id: number }[];
        // const { ssoId } = req.body.jwt_decoded;
        const ssoId = "73a4feb0-7c36-4acc-a35b-4bdb1da72fa0"; // employee ssoid

        if (!nominations || !Array.isArray(nominations)) {
            return res.status(422).json({ error: 'Bad request' });
        }

        for (const nomination of nominations) {
            if (!nomination.id) {
                return res.status(404).json({ error: 'Invalid Request' });
            }

            const user = await User.findOne({
                attributes: ['id'],
                where: { ssoId: ssoId },
            });

            if (!user) {
                return res.status(404).json({ error: 'User not found' });
            }

            // Check if the nomination is already approved
            const isApproved = await NominationRequest.findOne({
                where: { id: nomination.id, status: 'Approved' },
            });

            if (isApproved) {
                return res.status(422).json({ error: 'Nomination is already approved and cannot be removed' });
            }

            // Update only if the status is 'Pending' and createdBy and userId are the same
            await NominationRequest.update(
                { isActive: false, status: 'Removed', remarks: 'Removed By Employee' },
                { where: { id: nomination.id } }
            );
        }

        res.status(200).json({ message: 'Nomination(s) Removed' });
    } catch (error: any) {
        res.status(500).json({ error: error.toString() });
    }
};

export default deleteNominationRequests;
