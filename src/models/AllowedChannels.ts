export default (sequelize: any, Sequelize: any) =>
    sequelize.define("allowed_channel", {
        channel_id: {
            type: Sequelize.STRING,
            unique: true,
        },
    });
