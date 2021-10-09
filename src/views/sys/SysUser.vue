<template>
    <div>
        <el-form :inline="true" :model="query" size="mini">
            <el-form-item label="用户名">
                <el-input v-model="query.usernameLike" placeholder="菜单名称"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
            </el-form-item>
        </el-form>

        <div>
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="onAdd">添加</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="onDelete">删除</el-button>
        </div>

        <el-table
                border
                size="mini"
                :data="page.records"
                @dblclick="onRead"
                @selection-change="onSelectionChange"
                max-height="768">
            <el-table-column
                    type="selection">
            </el-table-column>
            <el-table-column
                    type="index"
                    label="序号">
            </el-table-column>
            <el-table-column prop="id" label="ID" width="100">
                <template #default="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>
            <el-table-column prop="username" label="用户名" width="100"></el-table-column>
            <el-table-column prop="password" label="密码" width="300"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150">
                <template #default="scope">
                    {{ scope.row.createTime }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="200"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="100">
                <template #default="scope">
                    <el-row>
                        <el-button type="text" size="mini" @click="onEdit(scope.row)">修改</el-button>
                        <el-button type="text" size="mini" @click="onDelete(scope.row)">删除</el-button>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>

        <el-pagination
                background
                @size-change="onSizeChange"
                @current-change="onCurrentChange"
                :current-page="page.current"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="page.size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="page.total">
        </el-pagination>

        <el-dialog title="修改" v-model="editDialogVisible">
            <el-form :model="form" size="mini" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="用户名">
                            <el-input v-model="form.username" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="密码">
                            <el-input v-model="form.password" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="onSubmit">确 定</el-button>
                </span>
            </template>
        </el-dialog>
    </div>

</template>

<script>
import Breads from '../../components/common/Breads'

export default {
    name: "SysUser",
    extends: Breads,
    data() {
        return {
            package: 'sys',
            class: 'sys_user',
            form: {
                id: "",
                username: "",
                password: ""
            }
        }
    },
    created() {
        this.onBrowse()
    },
    methods: {}
}
</script>