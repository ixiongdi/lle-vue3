<template>
    <div>
        <el-form class="breads-query" :inline="true" :model="query" size="mini">
            <el-form-item label="菜单名称：">
                <el-input v-model="query.nameLike" placeholder="菜单名称" clearable></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSearch">查询</el-button>
                <el-button @click="resetQueryForm">重置</el-button>
            </el-form-item>
        </el-form>

        <div class="breads-toolbar">
            <el-button size="mini" type="primary" icon="el-icon-plus" @click="onAdd">添加</el-button>
            <el-button size="mini" type="primary" icon="el-icon-delete" @click="onDelete">删除</el-button>
        </div>

        <el-table
                border
                size="mini"
                :data="page.records"
                @row-dblclick="onRead"
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
            <el-table-column prop="parentId" label="父ID" width="100"></el-table-column>
            <el-table-column prop="name" label="名称" width="100"></el-table-column>
            <el-table-column prop="url" label="地址" width="100"></el-table-column>
            <el-table-column prop="type" label="类型" width="100"></el-table-column>
            <el-table-column prop="icon" label="图标" width="100"></el-table-column>
            <el-table-column prop="orderNum" label="序号" width="100"></el-table-column>
            <el-table-column prop="perms" label="权限" width="100"></el-table-column>
            <el-table-column prop="createTime" label="创建时间" width="150">
                <template #default="scope">
                    {{ scope.row.createTime }}
                </template>
            </el-table-column>
            <el-table-column prop="updateTime" label="修改时间" width="200"></el-table-column>
            <el-table-column
                    fixed="right"
                    label="操作"
                    min-width="200">
                <template #default="scope">
                    <el-row>
                        <el-button type="text" size="mini" @click="onRead(scope.row)">查看</el-button>
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

        <el-dialog :title="form.id ? '修改' : '新增'" v-model="editDialogVisible">
            <el-form :model="form" size="mini" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="父ID">
                            <el-input v-model="form.parentId" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="名称">
                            <el-input v-model="form.name" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址">
                            <el-input v-model="form.url" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型">
                            <el-input v-model="form.type" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图标">
                            <el-input v-model="form.icon" placeholder="请输入内容"></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="序号">
                            <el-input v-model="form.orderNum" placeholder="请输入内容"></el-input>
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

        <el-dialog title="查看" v-model="readDialogVisible">
            <el-form :model="form" size="mini" label-width="100px">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="父ID">
                            {{ form.parentId }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="名称">
                            {{ form.name }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="地址">
                            {{ form.url }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="类型">
                            {{ form.type }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="图标">
                            {{ form.icon }}
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="序号">
                            {{ form.orderNum }}
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
        </el-dialog>
    </div>

</template>

<script>
import Breads from '../../components/common/Breads'

export default {
    name: "SysMenu",
    extends: Breads,
    data() {
        return {
            package: 'sys',
            class: 'sys_menu',
            form: {
                id: "",
                parentId: "",
                name: "",
                url: "",
                type: "",
                icon: "",
                orderNum: "",
                perms: ""
            }
        }
    },
    created() {
        this.onBrowse()
    },
    methods: {}
}
</script>

<style lang="scss">
.breads-query {
  .el-form-item {
    width: 25%;
  }
}

.breads-toolbar {
  height: 40px;
}
</style>