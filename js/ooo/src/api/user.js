export default {
  User: {
    userList: '/crm/user/User/userList', // 获取用户列表
    addUser: '/crm/user/User/addUser', // 新增用户
    editUser: '/crm/user/User/editUser', // 编辑用户
    modifyPwd: '/crm/user/User/modifyPwd', // 重设密码
    getUserDetail: '/crm/user/User/getUserDetail', // 获取用户详情
    disableUser: '/crm/user/User/disableUser', // 禁用用户
    departmentTree: '/crm/user/Department/departmentTree', // 获取部门树
    updateDepartment: '/crm/user/Department/updateDepartment', // 改部门名
    addDepartment: '/crm/user/Department/addDepartment', // 新增部门
    deleteDepartment: '/crm/user/Department/deleteDepartment', // 删除部门
    getDepartmentList: '/crm/user/Department/getDepartmentList', // 获取所有的3级部门
    allRedRole: '/crm/user/Role/allRedRole', // 获取所有的redwood角色
    listRedSeedByCodes: '/crm/user/User/listRedSeedByCodes'
  }
}
