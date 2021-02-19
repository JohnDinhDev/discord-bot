export default (sequelize: any, Sequelize: any) =>
    sequelize.define("online_players", {
        user_id: {
            primaryKey: true,
            type: Sequelize.STRING,
            unique: true,
        },
        method: {
            type: Sequelize.STRING,
        },
        input: {
            type: Sequelize.STRING
        },
    });
