<template>
    <div class="layout-aside">
        <div class="header">
            LLE-VUE管理系统
        </div>
        <el-menu>
            <el-submenu v-for="level1 in menus" :index="level1.id.toString()" :key="level1.id">
                <template #title>
                    <i :class="level1.icon"></i>
                    <span>{{ level1.name }}</span>
                </template>
                <el-menu-item v-for="level2 in level1.children" :index="level2.id.toString()" :key="level2.id"
                              @click="onClick(level2)">
                    <template #title>
                        <i :class="level2.icon"></i>
                        <span>{{ level2.name }}</span>
                    </template>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "LayoutAside",
    data() {
        return {
            menus: []
        }
    },
    // computed: {
    //     menus: function () {
    //         return this.$store.state.menus;
    //     }
    // },
    created() {
        axios.get('/api/sys/sys_menu/tree', {}).then(res => {
            // this.$store.commit('setMenus', response.data.data)

            const {code, data, message} = res.data

            this.menus = data;
        })

        // const router = this.menus.flat().map(e => {
        //     return    {
        //         path: e.url,
        //         name: e.name,
        //         component: () => import('../views/sys/SysMenu')
        //     }
        // })
        // this.$router.addRoutes();
    },
    methods: {
        onClick(e) {
            this.$router.push(e.url);
        }
    }
}
</script>

<style lang="scss">
.layout-aside {
  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background: #aaa;
  }
}
</style>