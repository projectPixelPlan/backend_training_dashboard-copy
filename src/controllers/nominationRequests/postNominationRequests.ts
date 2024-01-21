import { Request, Response } from 'express';
import NominationRequest from '../../models/nominationRequest';
import User from '../../models/user';
import UserManager from '../../models/userManager';
import { UUID } from 'crypto';

const postNominationRequests = async (req: Request, res: Response): Promise<void | Response<any, Record<string, any>>> => {
  try {
    const nominations = req.body as { userId: UUID, trainingProgramId: number }[] || [];

    if (!nominations.length) {
      return res.status(422).json({ error: "Invalid nominations data" });
    }
   
    // const { ssoid } = req.body.jwt_decoded;
    // const ssoId = "9a0c17da-842d-4c7d-9a24-e2896a7a4a20"; //employee ssoid
    const ssoId = "9a0c17da-842d-4c7d-9a24-e2896a7a4a20"; //manager ssoid

    if (!ssoId) {
      return res.status(422).json({ error: "Invalid user data" });
    }

    for (const nomination of nominations) {
      if (!nomination.userId || !nomination.trainingProgramId) {
        return res.status(422).json({ error: "Bad Request" });
      }

      const existingNomination = await NominationRequest.findOne({
        where: { userId: nomination.userId, trainingProgramId: nomination.trainingProgramId },
      });

      if (existingNomination) {
        return res.status(422).json({ error: "Nomination already exists" });
      }

      const manager = await UserManager.findOne({ //userId of manager
        where: { userId: nomination.userId },
        attributes: ['managerId'],
      });

      const managerId = manager ? manager.managerId : null;

      const createdBy = await User.findOne({ //userId of person created the nomination (manager/employee)
        attributes: ['id'],
        where: { ssoId: ssoId },
      });

      if (createdBy?.id === nomination.userId) { // self-nomination
        await NominationRequest.create({
          userId: nomination.userId,
          trainingProgramId: nomination.trainingProgramId,
          assignerId: managerId,
          status: "Pending",
          remarks: "Manager Approval Pending",
          createdBy: createdBy?.id,
          isActive: true,
        });
      } else { // manager nomination
        await NominationRequest.create({
          userId: nomination.userId,
          trainingProgramId: nomination.trainingProgramId,
          assignerId: managerId,
          status: "Approved",
          remarks: "Manager Approved",
          createdBy: createdBy?.id,
          isActive: true,
        });
      }
    }

    res.status(200).json({ status: "success", message: 'Nomination added successfully' });
  } catch (error: any) {
    console.error("Error in postNominationRequests:", error);
    return res.status(500).json({ error: error.toString() });
  }
};

export default postNominationRequests;
