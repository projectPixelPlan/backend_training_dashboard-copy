// import { Request, Response } from 'express';
// import nominationRequest from '../../models/nominationRequest';
// import user from '../../models/user';
// import userRoleDepartment from '../../models/userRoleDepartment';

// const getNominationRequests = async (req: Request, res: Response): Promise<void> => {
//     try {
//         const { ssoid } = req.body.jwt_decoded;

//         if (!ssoid) {
//             res.status(422).json({ message: "Bad Request" });
//             return;
//         }

//         const roleId = async (ssoid) => {
//               // Find the user with the given ssoid
//               const role = await user.findOne({
//                 where: { ssoid },
//                 include: [
//                   {
//                     model: userRoleDepartment,
//                     attributes: ['roleid'],
//                   },
//                 ],
//               });
          
//               if (role && role.userRoleDepartment) {
//                 // If a user is found and has an associated role mapping, return the roleid
//                 return user.UserRoleDepartmentMapping.roleid;
//               } else {
//                 // No user found or no role mapping
//                 return null;
//               }
//             }

//         if (roleId === 3) {
//             const appliedNominations = await nominationRequest.findAll({ where: { userid: ssoid } });
//             res.json({ message: appliedNominations });
//         } else if (roleId === 2) {
//             const appliedNominations = await NominationRequests.findAll({ where: { userId: ssoid } });
//             const assignedNominations = await NominationRequests.findAll({ where: { AssignerId: UserId } });
//             res.json({ appliedNominations, assignedNominations });
//         } else if (Role === "L&D") {
//             const allNominations = await NominationRequests.findAll();
//             res.json({ message: allNominations });
//         } else {
//             res.status(400).json({ message: "Invalid Role" });
//         }
//     } catch (error: any) {
//         res.status(500).json({ error: error.toString() });
//     }
// };

// export default getNominationRequests;
