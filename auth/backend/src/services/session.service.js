import { Op } from "sequelize";

import { Session,RefreshToken} from "../models/index.js";
import { ApiError } from "../utils/api-error.js";

export const getUserSessions = async (userId) => {
    return Session.findAll({
        where: {
            userId
        },
        order: [
            ["lastActiveAt", "DESC"]
        ]
    });
};

export const revokeSession = async (
    userId,
    sessionId
) => {

    const session = await Session.findOne({
        where: {
            id: sessionId,
            userId
        }
    });

    if (!session) {
        throw new ApiError(
            404,
            "Session not found"
        );
    }

    if (!session.revokedAt) {
        session.revokedAt = new Date();
        await session.save();
    }
};

export const revokeOtherSessions = async (
    userId,
    currentSessionId
) => {
    const now = new Date();

    const sessions =
        await Session.findAll({
            where: {
                userId,
                revokedAt: null,
                id: {
                    [Op.ne]: currentSessionId
                }
            },
            attributes: ["id"]
        });

    const sessionIds = sessions.map(
        (session) => session.id
    );

    if (sessionIds.length === 0) {
        return;
    }

    await Session.update(
        {
            revokedAt: now
        },
        {
            where: {
                id: sessionIds
            }
        }
    );

    await RefreshToken.update(
        {
            revokedAt: now
        },
        {
            where: {
                sessionId: sessionIds,
                revokedAt: null
            }
        }
    );
};