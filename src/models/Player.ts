export default (sequelize: any, Sequelize: any) =>
    sequelize.define("player", {
        id: {
            primaryKey: true,
            type: Sequelize.STRING,
            unique: true,
        },
        level: {
            type: Sequelize.INTEGER,
        },
        experience: {
            type: Sequelize.INTEGER,
        },
    });
