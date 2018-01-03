<template>
  <section>
    <div class="tab-wrap y-tab">
      <el-tabs v-model="$route.name" type="card" class="tabs-container">
        <!-- <el-tab-pane></el-tab-pane> -->
        <el-tab-pane v-for="item in tabsOptions" :name="item.name" :key="item.name">
          <router-link :to="{name: item.name}" slot="label" tag="a">
            <p></p>
            <p>{{item.label}}</p>
          </router-link>
        </el-tab-pane>
      </el-tabs>
      <keep-alive>
        <router-view>
        </router-view>
      </keep-alive>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      tabsOptions: [{
          label: '待提交',
          name: 'guiderMoneWaitSubmit',
        }
        // {
        //   label: '已提交',
        //   name: 'guiderMoneyFinshSubmit',
        // },
        // {
        //   label: '已对账',
        //   name: 'guiderMoneyFinshAccount',
        // },
      ],
      activeName: this.$route.name
    }
  },
  mounted() {
    this.activeName = this.$route.name
  }
}

</script>
