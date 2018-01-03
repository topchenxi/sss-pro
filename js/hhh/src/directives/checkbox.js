// 弃用
export default {
    'checkAll': {
        twoWay: true,
        params: ['checkData'],
        bind(el, binding, vnode) {
          const vm = vnode.context
            /**
             - 如果所有的列表的checked属性都为true,则选中全选框,否则不选中全选框
             */
            console.log('vm', vm)
            vm.$watch(vm.checkData, (checkData) => {
                if (checkData.every((item) => item.checked)) {
                    this.set(true);
                } else {
                    this.set(false);
                }
            }, { deep: true });
        },
        // checkAll发生更改时
        update(el, binding, vnode, checkAll) {
            const vm = vnode.context
            console.log('vm111', vm)
            /**
             - 如果全选框被选中,则将列表的所有checked属性转为true,否则转为false
             */
            if (vm.checkAll) {
                vm.checkData.forEach((item) => {
                    item.checked = true;
                });
            } else {
                vm.checkData.forEach((item) => {
                    item.checked = false;
                });
            }
        },
    }
}
