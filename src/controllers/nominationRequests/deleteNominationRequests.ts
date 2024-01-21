import { Request, Response } from 'express';
import NominationRequest from '../../models/nominationRequest';
import User from '../../models/user';
import sequelize from '../../config/sequelize';

const deleteNominationRequests = async (req: Request, res: Response): Promise<void | object> => {
    const transaction = await sequelize.transaction();

    try {
        const nominations = req.body as { id: number }[];
        // const { ssoId } = req.body.jwt_decoded;
        const ssoId = "9a0c17da-842d-4c7d-9a24-e2896a7a4a20";

        if (!nominations || !Array.isArray(nominations)) {
            await transaction.rollback();
            return res.status(422).json({ error: 'Bad request' });
        }

        for (const nomination of nominations) {
            if (!nomination.id) {
                await transaction.rollback();
                return res.status(404).json({ error: 'Invalid Request' });
            }

            const userId = await User.findOne({
                attributes: ['id'],
                where: { ssoId: ssoId },
            });

            await NominationRequest.update({ isActive: false, status: 'Removed' }, { where: { id: nomination.id }, transaction });
        }

        await transaction.commit();
        res.status(200).json({ message: 'Nomination(s) Removed' });
    } catch (error: any) {
        await transaction.rollback();
        res.status(500).json({ error: error.toString() });
    }
};

export default deleteNominationRequests;
