import { User } from "./user.model.js";
import { RefreshToken } from "./refresh-token.model.js";
import { Session } from "./session.model.js";
import { EmailVerificationToken } from "./email-verification-token.model.js";

User.hasMany(RefreshToken, {
    foreignKey: "userId",
    as: "refreshTokens",
    onDelete: "CASCADE"
});

RefreshToken.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});

User.hasMany(Session, {
    foreignKey: "userId",
    as: "sessions",
    onDelete: "CASCADE"
});

Session.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});


Session.hasMany(RefreshToken, {
    foreignKey: "sessionId",
    as: "refreshTokens",
    onDelete: "CASCADE"
});

RefreshToken.belongsTo(Session, {
    foreignKey: "sessionId",
    as: "session"
});


User.hasMany(
    EmailVerificationToken,
    {
        foreignKey: "userId",
        as: "emailVerificationTokens",
        onDelete: "CASCADE"
    }
);

EmailVerificationToken.belongsTo(
    User,
    {
        foreignKey: "userId",
        as: "user"
    }
);


export {
    User,
    RefreshToken,
    Session,
    EmailVerificationToken
};