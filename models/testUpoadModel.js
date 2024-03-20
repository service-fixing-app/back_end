module.exports = (sequelize, DataTypes) => {
    const Upload = sequelize.define("upload", {     
        image: {
            type: DataTypes.STRING,
            allowNull: true
        },
    
    }, {
        tableName: 'upload' 
    });

    return Upload;
}
