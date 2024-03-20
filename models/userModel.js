module.exports = (sequelize, DataTypes) => {

    const User = sequelize.define("User", { // Change "User" to your desired table name
        image: {
            type: DataTypes.STRING
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER
        },
        gender: {
            type: DataTypes.STRING
        },
        tel: {
            type: DataTypes.INTEGER
        }
    
    }, {
        tableName: 'Users' 
    });

    return User;
}
