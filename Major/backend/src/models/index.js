import User from "./User.js";
import Task from "./Task.js";
import Session from "./Session.js";


// User → Tasks
User.hasMany(Task, {
    foreignKey: "userId",
    as: "tasks"
});

Task.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});


// User → Sessions
User.hasMany(Session, {
    foreignKey: "userId",
    as: "sessions"
});

Session.belongsTo(User, {
    foreignKey: "userId",
    as: "user"
});


export {
    User,
    Task,
    Session
};
