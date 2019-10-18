<template>
  <div style="margin-top: 10px;">
    <Card dis-hover>
      <p slot="title">
        <Icon type="ios-film-outline"></Icon>
        备忘录
      </p>
      <a slot="extra" @click.prevent="query">
        <Icon type="md-refresh" style="margin-right: 5px"></Icon>刷新
      </a>
      <a slot="extra" @click.prevent="addNotice" style="margin-left: 20px">
        <Icon type="md-add" style="margin-right: 5px"></Icon>
        添加
      </a>
      <Row>
        <Card dis-hover>
          <Row>
            <i-col :span="10" offset="1" style="height: 500px">
              <p style="text-align: center"><b>待办事项</b></p>
              <Divider/>
              <draggable v-if="unTreatedlist.length == 0" style="text-align: center;color: #BFBFBF;height: 320px"
                         class="list-group" :list="unTreatedlist" group="people">暂无数据</draggable>
                <draggable class="list-group" :list="unTreatedlist" group="people" style="display: flex;flex-wrap: wrap;height: 320px" v-else>
                  <Card dis-hover v-for="(element) in unTreatedlist"
                        :key="element.id" style="width: 200px;height: 80px">
                    <a slot="extra" @click.prevent="momeUpdate(element.id)">
                      <Icon type="md-refresh"></Icon>
                    </a>
                    <a slot="extra" @click.prevent="delNote(element.id)" style="margin-left: 5px">
                      <Icon type="md-close"></Icon>
                    </a>
                    <Poptip :title="element.title" :content="element.content"  placement="bottom-start" trigger="hover">
                      <div style="width: 130px">
                        <b v-if="element.title.length > 5" >Title: {{element.title.substring(0,4) + "..."}}</b>
                        <b v-else>Title: {{element.title}}</b>
                      </div>
                      <div style="width: 130px">
                        <b>Content: </b>
                        <span v-if="element.content.length > 10">{{element.content.substring(0,9) + "..."}}</span>
                        <span v-else>{{element.content}}</span>
                      </div>
                    </Poptip>
                  </Card>
                </draggable>
              <Divider />
              <div align="right">
                <Page
                  @on-change="untreatPageChange"
                  :current="untreatPage"
                  :page-size="rows"
                  :page-size-opts = "pagesize"
                  :total="untreatedtotalRows"
                  show-elevator show-total transfer>
                </Page>
              </div>
            </i-col>
            <i-col :span="2" align="center">
              <Divider type="vertical" style="height: 500px;background: #348EED"/>
            </i-col>
            <i-col :span="10" >
              <p style="text-align: center"><b>已办事项</b></p>
              <Divider />
              <draggable v-if="treatedlist.length == 0" style="text-align: center;color: #BFBFBF;height: 320px"
                         class="list-group" :list="treatedlist" group="people">暂无数据</draggable>
              <draggable class="list-group" :list="treatedlist" group="people" style="display: flex;flex-wrap: wrap;height: 320px" v-else>
                <Card dis-hover v-for="(element) in treatedlist"
                      :key="element.id" style="width: 200px;height: 80px">
                  <Poptip :title="element.title" :content="element.content"  placement="bottom-start" trigger="hover">
                    <div style="width: 130px">
                      <b v-if="element.title.length > 5">Title: {{element.title.substring(0,4) + "..."}}</b>
                      <b v-else>Title: {{element.title}}</b>
                    </div>
                    <div style="width: 130px">
                      <b>Content: </b>
                      <span v-if="element.content.length > 10">{{element.content.substring(0,9) + "..."}}</span>
                      <span v-else>{{element.content}}</span>
                    </div>
                  </Poptip>
                </Card>
              </draggable>
              <Divider />
              <div style="float: right">
                <Page
                  @on-change="treatedageChange"
                  :current="treatedPage"
                  :page-size="rows"
                  :page-size-opts = "pagesize"
                  :total="treatedtotalRows"
                  show-elevator show-total transfer>
                </Page>
              </div>
            </i-col>
          </Row>
          </Card>
      </Row>

      <Row style="margin-top: 10px">
        <Card dis-hover>
          <p slot="title">备忘事项</p>
          <div v-if="momeList.length == 0" style="text-align: center;color: #BFBFBF">暂无数据</div>
          <div style="display:flex;flex-wrap: wrap;justify-content: flex-start;" v-else>
            <Card dis-hover v-for="(element) in momeList"
                  :key="element.id" style="width: 32%;margin-right: 1%;margin-top: 1%;height: 80px">
              <a slot="extra" @click.prevent="momeUpdate(element.id)">
                <Icon type="md-refresh"></Icon>
              </a>
              <a slot="extra" @click.prevent="delNote(element.id)" style="margin-left: 5px">
                <Icon type="md-close"></Icon>
              </a>
              <Poptip :title="element.title" :content="element.content"  placement="bottom-start" trigger="hover">
                <div style="width: 400px">
                  <b v-if="element.title.length > 10">Title: {{element.title.substring(0,9) + "..."}}</b>
                  <b v-else>Title: {{element.title}}</b>
                </div>
                <div style="width: 400px">
                  <b>Content: </b>
                  <span v-if="element.content.length > 20">{{element.content.substring(0,19) + "..."}}</span>
                  <span v-else>{{element.content}}</span>
                </div>
              </Poptip>
            </Card>
          </div>
          <Divider />
          <div align="right">
            <Page
              @on-change="momePageChange"
              :current="momePage"
              :page-size="rows"
              :page-size-opts = "pagesize"
              :total="momeTotalRows"
              show-elevator show-total transfer>
            </Page>
          </div>
        </Card>
      </Row>
    </Card>
    <add-note ref="addNote" @on-refresh="query"></add-note>
  </div>
</template>

<script>
import draggable from "@/vuedraggable";
import addNote from './component/addNote'
import TagsNav from "../../components/main/components/tags-nav/tags-nav";
import {getMemo,getUntreat,getTreated,delNote,updateTreatedToUntreat,updateUntreatToTreated} from "../../api/note";
import { getToken } from '@/libs/util'

export default {
  order: 1,
  inject:['reload'],
  components: {
    TagsNav,
    draggable,
    addNote
  },
  data() {
    return {
      pagesize:[12],
      untreatPage:1,
      treatedPage:1,
      momePage:1,
      rows: 12,
      untreatedtotalRows: 0,
      treatedtotalRows:0,
      momeTotalRows:0,
      content:'',
      unTreatedlist: [],
      treatedlist: [],
      momeList:[],
      params:{}
    };
  },
  mounted(){
   this.getMomeList();
   this.getTreatedList();
   this.getUntreatList();
  },

  methods: {

    //删除事项
    delNote(id){
      let delParams = {}
      delParams.id = id
      delParams.user_id = getToken()
      this.$Modal.confirm({
        title: '操作确认',
        content: '确定删除该待办事项？',
        onOk: () => {
          delNote(delParams).then(resp =>{
            if (resp && resp.status == 200) {
              if(resp.data.success) {
                this.$Notice.success({
                  title:"删除成功!",
                  duration: 3
                })
              }
              this.getUntreatList()
              this.getMomeList()
            }
          })
        }
      });
    },
    query(){
      this.reload()
    },
    //page页数切换
    untreatPageChange(page){
      this.untreatPage = page;
      this.getUntreatList()
    },
    treatedageChange(page){
      this.treatedPage = page
      this.getTreatedList()
    },
    momePageChange(page){
      this.momePage = page
      this.getMomeList()
    },

    addNotice(){
      this.$refs.addNote.init();
    },

    //更新事项type:待办->已办
    updateUntreatToTreated(params){
      updateUntreatToTreated(params).then(resp =>{
        if (resp && resp.status == 200) {
          if (resp.data.success) {
          }
        }
      })
    },

    //更新事项type:已办->待办
    updateTreatedToUntreat(newVal){
      let arrayID = []
      let arrayType = []
      let i = 0;
      for(;i<newVal.length;++i){
        arrayID.push(newVal[i].id)
        arrayType.push(newVal[i].type)
      }
      let params = {}
      params.id = arrayID
      params.user_id = getToken()
      updateTreatedToUntreat(params).then(resp =>{
        if (resp && resp.status == 200) {
          if (resp.data.success) {
          }
        }
      })
    },

    //备忘更新
    momeUpdate(id){
      this.$refs.addNote.editNote(id);
    },

    //获取待办事项列表
    getUntreatList(){
      let user_id = getToken()
      this.params.rows = this.rows
      this.params.page = this.untreatPage
      this.params.user_id = user_id
      this.params.type = 1
      getUntreat(this.params).then(resp =>{
        if(resp && resp.status == 200){
          let data = resp.data.data.data;
          this.unTreatedlist = data;
          this.untreatedtotalRows = resp.data.data.total;
        }
      })
      this.params = {}
    },
    //获取已办事项列表
    getTreatedList(){
      let user_id = getToken()
      this.params.rows = this.rows
      this.params.page = this.treatedPage
      this.params.user_id = user_id
      this.params.type = 2
      getTreated(this.params).then(resp =>{
        if(resp && resp.status == 200){
          let data = resp.data.data.data;
          this.treatedlist = data;
          this.treatedtotalRows = resp.data.data.total;
        }
      })
      this.params = {}
    },
    //获取备忘事项列表
    getMomeList(){
      let user_id = getToken()
      this.params.rows = this.rows
      this.params.page = this.momePage
      this.params.user_id = user_id
      this.params.type = 3
      getMemo(this.params).then(resp =>{
        if(resp && resp.status == 200){
          let data = resp.data.data.data;
          this.momeList = data;
          this.momeTotalRows = resp.data.data.total;
        }
      })
      this.params = {}
    }
  },
  watch:{
    treatedlist:{
      handler(newVal,oldVal) {
        let arrayID = []
        let arrayType = []
        let i = 0;
        for(;i<newVal.length;++i){
          arrayID.push(newVal[i].id)
          arrayType.push(newVal[i].type)
        }
        let params = {}
        params.id = arrayID
        params.user_id = getToken()
        this.updateUntreatToTreated(params)
      }
    },
    unTreatedlist:{
      handler(newVal){
        this.updateTreatedToUntreat(newVal)
      }
    }
  }
};
</script>
