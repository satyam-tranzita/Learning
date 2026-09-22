import {
    getUserSessions,
    revokeOtherSessions,
    revokeSession
} from "../services/session.service.js";


//get all sessions of single user
export const getSessions = async (
    req,
    res,
    next
) => {
    try {
        const sessions =
            await getUserSessions(
                req.user.id
            );

        const result = sessions.map(
            (session) => ({
                id: session.id,
                deviceName:
                    session.deviceName,
                userAgent:
                    session.userAgent,
                ipAddress:
                    session.ipAddress,
                lastActiveAt:
                    session.lastActiveAt,
                createdAt:
                    session.createdAt,
                revokedAt:
                    session.revokedAt,
                current:
                    String(session.id) ===
                    String(req.user.sessionId)
            })
        );

        return res.status(200).json({
            success: true,
            data: {
                sessions: result
            }
        });
    } catch (error) {
        next(error);
    }
};


export const revoke = async (
    req,
    res,
    next
) => {
    try {
        const sessionId =
            req.params.sessionId;

        await revokeSession(
            req.user.id,
            sessionId
        );

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};


export const revokeOthers = async (
    req,
    res,
    next
) => {
    try {
        await revokeOtherSessions(
            req.user.id,
            req.user.sessionId
        );

        return res.status(204).send();
    } catch (error) {
        next(error);
    }
};