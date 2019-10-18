<template>
  <div style="margin-top: 10px">
    <Card>
      <p slot="title">备份记录</p>
      <div style="display: inline">
        <input
          placeholder="默认展示部分备份结果，可以通过备份名搜索更多..."
          prefix-icon="ios-search"
          size="small"
          clearable
          style="width: 400px;margin-right: 10px;margin-bottom: 10px"
          v-model="bak_name">
        </input>
        <Button size="small" type="primary" icon="md-search" @click="searchClick">搜索</Button>
        <Button size="small"  icon="md-refresh" @click="resetClick" style="margin-left: 5px">重置</Button>
      </div>
      <div style="margin-left: 5px;margin-right: 20px;display: inline">
        <Button type="primary" size="small" icon="md-add" style="margin-right: 5px" @click="dbBak">
          <i style="margin-right: 5px"></i>数据备份
        </Button>
      </div>
      <div>
        <Table
          :data="emps"
          :loading="tableLoading"
          :columns="columns"
          border
          stripe
          @selection-change="handleSelectionChange"
          style="width: 100%">
        </Table>
        <div style="margin-top: 10px;display: flex;justify-content: space-between">
          <Button type="danger"
                     @click="deleteManyBackData">批量删除
          </Button>
          <Page
            background
            @on-page-size-change="pageSizeChange"
            @on-change="pageChange"
            :current="page"
            :page-sizes="[10,20,30,40]"
            :page-size="rows"
            :total="totalRows"
            show-sizer show-elevator show-total transfer>
          </Page>
        </div>
      </div>
    </Card>
  </div>
</template>

<script>
  import { getDataBak,deleteBak,renewBak } from '@/api/database'
  export default {
    data () {
      return {
        current: 0,
        bak_name:'',
        tableLoading: false,
        multipleSelection: [],
        emps:[],
        page: 1,
        rows: 10,
        totalRows: 0,
        columns: [
          {
            type:'selection',
            align:'left',
            width:'50',
            fixed:'left'
          },
          {
            key:'bak_name',
            align:'left',
            title:'备份名',
            width:'150'
          },
          {
            key:'database_name',
            align:'left',
            title:'备份库名',
            width:'150'
          },
          {
            key:'table_name',
            align:'left',
            title:'备份表名',
            width:'150'
          },
          {
            key:'path',
            align:'left',
            title:'备份存储地址',
            width:'150'
          },
          {
            key:'node_ip',
            align:'left',
            title:'主机IP',
            width:'150'
          },
          {
            key:'node_port',
            align:'left',
            title:'主机端口',
            width:'150'
          },
          {
            key:'node_user',
            align:'left',
            title:'主机用户',
            width:'150'
          },
          {
            key:'mysql_user',
            align:'left',
            title:'数据库用户',
            width:'150'
          },
          {
            key:'mysql_port',
            align:'left',
            title:'数据库端口',
            width:'150'
          },
          {
            key:'operateDate',
            align:'left',
            title:'备份时间',
            width:'150'
          },
          {
            key:'hr_name',
            align:'left',
            title:'操作人',
            width:'150'
          },
          {
            title: '操作',
            key: '_operate',
            width: 300,
            align: 'center',
            fixed:'right',
            render: (h, params) => {
              let arr = [
                h('Button', {
                    props: {
                      type: 'default',
                      size: 'small',
                    },
                    style: {
                      padding: '3px 4px 3px 4px',
                      margin: '2px'
                    },
                    on: {
                      click: () => {
                        this.renewData(params.row)
                      }
                    }
                  },
                  '数据恢复'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'primary',
                      size: 'small'
                    },
                    style: {
                      padding: '3px 4px 3px 4px',
                      margin: '2px'
                    },
                    on: {
                      click: () => {
                        this.EditBakData(params.row)
                      }
                    }
                  },
                  '编辑'
                ),
                h(
                  'Button',
                  {
                    props: {
                      type: 'error',
                      size: 'small'
                    },
                    style: {
                      padding: '3px 4px 3px 4px',
                      margin: '2px'
                    },
                    on: {
                      click: () => {
                        this.deleteData(params.row)
                      }
                    }
                  },
                  '删除'
                )
              ]
              let ss = h('div', arr)
              return ss
            }
          }
        ]
      }
    },
    methods: {
      next () {
        if (this.current == 3) {
          this.current = 0;
        } else {
          this.current += 1;
        }
      },

      dbBak(){
        this.$router.push({replace:true,name:'add_database'});
      },

      //page页数切换
      pageChange(page){
        this.page = page;
        this.searchClick();
      },

      //pageSize页数切换
      pageSizeChange(rows){
        this.rows = rows;
        this.searchClick();
      },

      //查询条件查询指定备份数据
      searchClick(){
        this.tableLoading = true;
        let params = {};
        params.bak_name = this.bak_name;
        params.page = this.page;
        params.rows = this.rows;
        getDataBak(params).then( resp=> {
          this.tableLoading = false;
          if(resp && resp.status == 200){
            var data = resp.data.data.data;
            this.emps = data;
            this.totalRows = resp.data.data.total;
          }
        })
      },

      //重置插叙条件
      resetClick: function () {
        this.bak_name = "";
        this.searchClick();
      },

      //批量删除备份数据
      deleteManyBackData(){
        this.$Modal.confirm({
          title: '操作确认',
          content: '此操作将删除备份['+ row.bak_name + ']数据，是否继续',
        onOk: () => {
          for (var i = 0; i < this.multipleSelection.length; i++) {
            this.doDelete(this.multipleSelection[i].id);
            }
          }
        });
      },

      //备份记录编辑
      EditBakData(row){
        row.node_password = '';
        row.mysql_password = '';
        row.bak_name = row.bak_name.split(".")[0];
        this.$refs.addDataBak.init();
        this.$refs.addDataBak.bakData = row;
      },

      //备份数据恢复
      renewData(row){
        this.$Modal.confirm({
          title: '操作确认',
          content: '此操作将恢复备份['+ row.bak_name + ']数据，是否继续？',
        onOk: () => {
          let params = {};
          params.id = row.id
          this.tableLoading = true
          renewBak(params).then(resp =>{
            if (resp && resp.status == 200) {
              if(resp.data.success){
                this.$Message.success({content:"数据恢复成功！"})
                this.tableLoading = false
                this.searchClick()
              }
            }
           })
          }
        })
        this.tableLoading = false
      },

      //删除数据备份弹出提示框
      deleteData(row){
        this.$Modal.confirm({
          title: '操作确认',
          content: '此操作将永久删除[' + row.bak_name + ']数据备份, 是否继续?',
          onOk: () => {
            this.doDelete(row.id);
          }
        })
      },

      //删除备份数据
      doDelete(ids){
        let params = {};
        params.id = ids;
        this.tableLoading = true;
        var _this = this;
        deleteBak(params).then(resp=> {
          _this.tableLoading = false;
          if (resp && resp.status == 200) {
            this.$Message.success("删除成功")
            _this.searchClick();
          }
        })
      },

      handleSelectionChange(val) {
        this.multipleSelection = val;
      },
    },
    mounted: function () {
      this.searchClick();
    },
  }
</script>
