<template>
  <Form :model="note" ref="addNote" :rules="rules">
    <Modal v-model="visiable" width="30%">
      <p slot="header">添加备份</p>
      <FormItem label="Title:" prop="title">
      <Input v-model="note.title" placeholder="Enter something..."></Input>
    </FormItem>
      <FormItem label="Type:" prop="type">
        <RadioGroup v-model="note.type">
          <Radio label="1">待办事项</Radio>
          <Radio label="3">备份事项</Radio>
        </RadioGroup>
      </FormItem>
      <FormItem label="Content:" prop="content">
        <Input v-model="note.content" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="Enter something..."></Input>
      </FormItem>
      <div slot="footer">
        <Button  @click="cancel" icon="md-close">取 消</Button>
        <Button  type="primary"  icon="md-checkmark" :loading="accqualLoading" @click="addMote"
                 v-if="!edit_status">确 定</Button>
        <Button type="primary" icon="md-refresh" :loading="accqualLoading" @click="refreshMote"
                v-else>更 新</Button>
      </div>
    </Modal>
  </Form>
</template>

<script>
  import {addMote,ediNote,getMemoById} from "../../../api/note";
  import { getToken } from '@/libs/util'

  export default {
    data(){
      return{
        edit_status:false,
        note:{
          title:'',
          content:'',
          type:1,
          user_id:getToken()
        },
        visiable: false,
        rules: {
          title: [{required: true, message: '必填:标题', trigger: 'change'}],
          content: [{required: true, message: '必选:备份内容', trigger: 'change'}],
          type: [{required: true, message: '必选:类型', trigger: 'change'}],
        },
        accqualLoading: false
      }
    },
    methods:{
      init(){
        this.visiable = true;
      },
      cancel(){
        this.edit_status = false
        this.visiable = false;
        this.note.title =''
        this.note.content = ''
        this.note.type = '1'
        this.note.user_id=getToken()
      },
      //新增
      addMote(){
        this.$refs.addNote.validate((valid) => {
          if(valid) {
            this.accqualLoading = true
            addMote(this.note).then(resp => {
              if (resp && resp.status == 200) {
                if(resp.data.success) {
                  this.$Notice.success({
                    title:"添加成功!",
                    duration: 3
                  })
                  this.visiable = false
                  this.accqualLoading = false
                  this.$emit("on-refresh")
                  this.resetNote()
                }
              }
            })
            this.accqualLoading = false
          } else{
            this.accqualLoading = false
          }
        })
      },

      //更新
      refreshMote(){
        this.$refs.addNote.validate((valid) => {
          if(valid) {
            this.accqualLoading = true
            ediNote(this.note).then(resp => {
              if (resp && resp.status == 200) {
                if(resp.data.success) {
                  this.$Notice.success({
                    title:"更新成功!",
                    duration: 3
                  })
                  this.resetNote()
                }
                this.$emit("on-refresh")
                this.visiable = false
                this.accqualLoading = false
                this.edit_status = false
              }
              this.accqualLoading = false
            })
          } else{
            this.accqualLoading = false
          }
        })
      },

      editNote(id){
        let params = {};
        params.id = id;
        params.user_id = getToken()
        getMemoById(params).then(resp =>{
          if (resp && resp.status == 200) {
            this.note = resp.data.data[0]
          }
        })
        this.visiable = true
        this.edit_status = true
        this.refreshMote()
      },

      resetNote(){
        this.note.title =''
        this.note.content = ''
        this.note.type = '1'
        this.note.user_id = getToken()
        }
      }
  }
</script>

<style scoped>

</style>
