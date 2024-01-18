import { NextFunction, Request, Response } from "express";
import axios from "axios";
import User from "../../models/user";

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
 /**
   * get user data of authenticated user
   */
const getUser = async (req: Request, res: Response) => {
    try {
        const { sso_id } = req.body.token_decoded;


        try {
            const user = await User.findOne({ where: { ssoId: sso_id } });

            if (!user) {
                return res.status(404).json({
                    success: false,
                    message: "User not found",
                });
            }

            return res.status(200).json({
                success: true,
                result: user,
                message: "User data fetched successfully",
            });
        } catch (error) {
            console.error('Error fetching user:', error);
            return res.status(500).json({
                success: false,
                error: 'Internal Server Error',
            });
        }
    } catch (error) {
        console.error('Token verification failed:', error);
        return res.status(401).json({
            valid: false,
            error: 'Invalid token',
        });
    }
};

export default getUser;
