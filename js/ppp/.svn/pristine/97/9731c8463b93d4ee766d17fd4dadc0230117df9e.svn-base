<template>
  <header>
    <div class="logo">搜芽订单跟踪系统</div>
    <div class="sy-user-handle">
      <el-dropdown trigger="click"
                   @command="handleCommand">
        <span class="el-dropdown-link">
                {{user.realName || user.nickName}}<i class="el-icon-caret-bottom el-icon--right"></i>
              </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="exit">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>
<script>
import getCache from '@/utils/getCache'
export default {
  data() {
    const auth = JSON.parse(getCache({
      key: 'currentUser'
    }))
    return {
      user: auth.user
    }
  },
  methods: {
    handleCommand(command) {
      sessionStorage.clear()
      localStorage.clear()
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>
<style lang="scss">
header {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  align-items: center;
  box-sizing: border-box;
}

.logo {
  color: #36ac70;
  font-size: 24px;
}

.sy-user-handle {
  cursor: pointer;
  display: flex;
  align-items: center;
}
</style>
