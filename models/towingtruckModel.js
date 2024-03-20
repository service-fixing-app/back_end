module.exports = (sequelize, DataTypes) => {

    const Towingtruck = sequelize.define("towingtruck", { 
        
        towingtruck_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        management_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        tel: {
            type: DataTypes.INTEGER
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type_service: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        village: {
            type: DataTypes.STRING,
            allowNull: false
        },
        district: {
            type: DataTypes.STRING,
            allowNull: false
        },
        province: {
            type: DataTypes.STRING,
            allowNull: false
        },
        profile_image: {
            type: DataTypes.STRING,
            // allowNull: false
        },
        document_verify: {
            type: DataTypes.STRING,
            allowNull: false
        },
    
    }, {
        tableName: 'towingtruck' 
    });

    return Towingtruck;
}
