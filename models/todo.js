module.exports = (sequelize, DataTypes) => {
    const Todo = sequelize.define('Todo', {
      title: {
        type: DataTypes.STRING,
        allowNull: false
      },
      deletedAt: {
        type: DataTypes.DATE
      }
    }, {
      paranoid: true // Enables soft delete
    });
    
    return Todo;
  };
  