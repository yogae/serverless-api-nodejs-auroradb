module.exports = (sequelize, DataTypes) => {
    return sequelize.define('image', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
    }, {
        timestamps: false,
    });
}