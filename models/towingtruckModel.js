module.exports = (sequelize, DataTypes) => {

    const Towingtruck = sequelize.define("towingtruck", { 
        
        shop_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        manager_name: {
            type: DataTypes.STRING,
            allowNull: true
        },
        tel: {
            type: DataTypes.INTEGER,
            allowNull: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: true
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false
        },
        birthdate: {
            type: DataTypes.STRING,
            allowNull: false
        },
        village: {
            type: DataTypes.STRING,
            allowNull: true
        },
        district: {
            type: DataTypes.STRING,
            allowNull: true
        },
        province: {
            type: DataTypes.STRING,
            allowNull: true
        },
        type_service: {
            type: DataTypes.STRING,
            allowNull: true
        },
        profile_image: {
            type: DataTypes.STRING,
            allowNull: true
        },
        document_verify: {
            type: DataTypes.STRING,
            allowNull: true
        },
        role: {
            type: DataTypes.STRING,
            allowNull: true
        },
    
    }, {
        tableName: 'towingshop' 
    });

    return Towingtruck;
}
