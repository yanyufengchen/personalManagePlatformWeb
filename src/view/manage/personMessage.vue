<template>
  <div >
    <Card>
      <div slot="title" align="right">
        <i-col align="left" style="margin-top: 5px" span="12"><p>个人学历信息</p></i-col>
        <Button  icon="md-refresh" style="margin-right: 10px" @click="show">刷新</Button>
        <Button type="primary" icon="md-add" @click="addEducation">添加学历信息</Button>
      </div>
      <div  style="display:flex;flex-wrap: wrap;justify-content: flex-start;">
        <Card style="width: 48%;height: 330px;overflow: hidden;margin-top: 10px;margin-left: 20px" :padding="0" dis-hover
              v-for="item in education" :key="item.id" >
          <Row style="margin-top: 10px;">
           <i-col  style="background: #63ffdb;text-align: center;padding: 10px;"  span="11">
             <div style="font-family:华文琥珀;font-size: 17px;
                height:20px;width:100%;overflow: hidden;">{{item.level}}-{{item.school}}-{{item.major}}</div>
           </i-col>
            <i-col span="13" style="text-align: right">
              <Button type="text" icon="md-close" style="margin-right: 5px" onmousemove="this.style.backgroundColor='#b4070d'"
                      onmouseout="this.style.backgroundColor=''" @click="deleteEdu(item.id)">删除</Button>
              <Button type="text" icon="md-refresh" style="margin-right: 10px" onmousemove="this.style.backgroundColor='#284ab4'"
                         onmouseout="this.style.backgroundColor=''" @click="refreshEdu(item)">更新</Button>
            </i-col>
          </Row>
          <Row style="margin-top: 20px;overflow: hidden">
            <i-col span="5" style="position:relative;
                justify-content: center;display: flex;flex-direction: column;overflow: hidden" >
              <img :src="headSculpture"
                   style="width: 150px; height: 220px;margin-left: 15%">
            </i-col>
            <i-col span="18">
              <Row style="text-align: right">
              <i-col span="6">
                <span style="color: #92e7bf">姓名:</span>
              </i-col>
              <i-col span="5" offset="1" style="text-align: left">
                <span>{{item.name}}</span>
              </i-col>
              <i-col span="5">
                <span style="color: #92e7bf">性别:</span>
              </i-col>
              <i-col span="6" offset="1" style="text-align: left">
                <span>{{item.sex}}</span>
              </i-col>
            </Row>
              <Row style="margin-top:15px;text-align: right">
              <i-col span="6">
                <span style="color: #92e7bf">出生日期:</span>
              </i-col>
              <i-col span="5" offset="1" style="text-align: left">{{item.birthday}}</i-col>
              <i-col span="5">
                <span style="color: #92e7bf">入学日期:</span>
              </i-col>
              <i-col span="6" offset="1" style="text-align: left">{{item.start_time}}</i-col>
            </Row>
              <Row style="margin-top:15px;text-align: right">
                <i-col span="6">
                  <span style="color: #92e7bf">毕(结)业日期:</span>
                </i-col>
                <i-col span="5" offset="1" style="text-align: left">{{item.end_time}}</i-col>
                <i-col span="5">
                  <span style="color: #92e7bf">学校名称:</span>
                </i-col>
                <i-col span="6" offset="1" style="text-align: left">{{item.school}}</i-col>
              </Row>
              <Row style="margin-top:15px;text-align: right">
                <i-col span="6">
                  <span style="color: #92e7bf">专业:</span>
                </i-col>
                <i-col span="5" offset="1" style="text-align: left;overflow: hidden">{{item.major}}</i-col>
                <i-col span="5">
                  <span style="color: #92e7bf">学历类别:</span>
                </i-col>
                <i-col span="6" offset="1" style="text-align: left">{{item.education_category}}</i-col>
              </Row>
              <Row style="margin-top:15px;text-align: right">
                <i-col span="6">
                  <span style="color: #92e7bf">学制:</span>
                </i-col>
                <i-col span="5" offset="1" style="text-align: left">{{item.educational_system}}年</i-col>
                <i-col span="5">
                  <span style="color: #92e7bf">学习形式:</span>
                </i-col>
                <i-col span="6" offset="1" style="text-align: left">{{item.modality}}</i-col>
              </Row>
              <Row style="margin-top:15px;text-align: right">
                <i-col span="6">
                  <span style="color: #92e7bf">层次:</span>
                </i-col>
                <i-col span="5" offset="1" style="text-align: left">{{item.level}}</i-col>
                <i-col span="5">
                  <span style="color: #92e7bf">毕(结)业:</span>
                </i-col>
                <i-col span="6" offset="1" style="text-align: left">毕业</i-col>
              </Row>
              <Row style="margin-top:15px;text-align: right;margin-bottom: 20px">
                <i-col span="6">
                  <span style="color: #92e7bf">校(院)长姓名:</span>
                </i-col>
                <i-col span="5" offset="1" style="text-align: left">{{item.schoolmaster}}</i-col>
                <i-col span="5">
                  <span style="color: #92e7bf">证书编号:</span>
                </i-col>
                <i-col span="6" offset="1" style="text-align: left">{{item.certificate}}</i-col>
              </Row>
            </i-col>
          </Row>
        </Card>
      </div>
    </Card>
    <add-edu-form ref="addEduForm" @on-change="query"></add-edu-form>
  </div>
</template>

<script>
  import { personMessage,delEducation } from '@/api/manage';
  import addEduForm from './components/addEducation'

  export default {
      name: "personMessage",
    components:{addEduForm},
    data(){
        return {
          headSculpture:'https://fuss10.elemecdn.com/3/28/bbf893f792f03a54408b3b7a7ebf0jpeg.jpeg',
          education:[],
          education1:{
            name:'',
            sex:'',
            school:'',
            major:'',
            education_category:'',
            educational_system:'',
            level:'',
            graduate:'',
            modality:'',
            schoolmaster:'',
            certificate:'',
            start_time:'',
            end_time:'',
            birthday:''
          },
        }
      },

    mounted(){
      this.show();
    },

    methods:{
      query(){
        this.show()
      },
      show(){
        personMessage().then( resp => {
          if(resp && resp.status == 200){
            if(resp.data.success){
              this.education = resp.data.data
            }
          }
        })
      },
      addEducation(){
        this.$refs.addEduForm.init();
      },

      deleteEdu(edu_id){
        let params = {};
        params.id = edu_id;
        this.$Modal.confirm({
          title: '操作确认',
          content: '此操作将永久删除该条数据, 是否继续?',
          onOk: () => {
            delEducation(params).then(resp =>{
              if(resp && resp.status == 200){
                if(resp.data.success){
                  this.$Notice.success({
                    title:"删除成功",
                    duration: 3
                  })
                  this.show()
                }
              }
            })
          }
        })
      },

      refreshEdu(item){
        this.$refs.addEduForm.editEdu(item.id);
      }
    },
  }
</script>

<style scoped>
</style>
