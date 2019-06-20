const UsersServices = {
  getUserByUsername(dbInstance, username) {
    return dbInstance
            .from('users')
            .select('*')
            .where({'username': Username})
  },
  createUser(dbInstance, userInfo) {
    return dbInstance
            .from('users')
            .insert(userInfo)
            .returning('*');
  }
}

module.exports = UsersServices;