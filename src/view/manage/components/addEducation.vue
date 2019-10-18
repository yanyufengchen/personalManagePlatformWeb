<template>
  <Form :model="education" :rules="rules" ref="addEduForm" style="margin: 0px;padding: 0px;">
    <div style="text-align: center">
      <Modal v-model="visiable" width="77%">
        <p slot="header">添加教育经历</p>
        <Row>
          <i-col :span="6">
            <div>
              <FormItem label="姓名:" prop="name">
                <Input  :model="education.name" style="width: 200px"
                          placeholder="请输入姓名"></Input>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="性别:" prop="sex">
                <RadioGroup v-model="education.sex">
                  <Radio label="男">男</Radio>
                  <Radio style="margin-left: 15px" label="女">女</Radio>
                </RadioGroup>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="出生日期:" prop="birthday">
                <DatePicker
                  v-model="education.birthday"
                  show-week-numbers
                  style="width: 200px"
                  type="date"
                  placeholder="出生日期">
                </DatePicker>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="名族:" prop="nation">
                <Input  v-model="education.nation" style="width: 200px"
                        placeholder="请输入姓名"></Input>
              </FormItem>
            </div>
          </i-col>
        </Row>
        <Row>
          <i-col :span="6">
            <div>
              <FormItem label="学校名称:" prop="school">
                <Input  v-model="education.school"  style="width: 200px"
                       placeholder="学校名称"></Input>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="学历类别:" prop="education_category">
                <Select v-model="education.education_category" style="width: 200px" placeholder="学历类别">
                  <Option
                    v-for="item in education_categorys"
                    :key="item.value"
                    :value="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="学院名称:" prop="college">
                <Input  v-model="education.college"  style="width: 200px"
                        placeholder="学院名称"></Input>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="专业名称:" prop="major">
                <Input  v-model="education.major"  style="width: 200px"
                        placeholder="专业名称"></Input>
              </FormItem>
            </div>
          </i-col>
        </Row>
        <Row>
          <i-col :span="6">
            <div>
              <FormItem label="入学日期">
                <DatePicker type="date" placeholder="Select date" v-model="education.start_time"></DatePicker>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="层次:" prop="level">
                <Select v-model="education.level" style="width: 200px"  placeholder="层次">
                  <Option
                    v-for="item in degrees"
                    :key="item.value"
                    :value="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="学制(年):" prop="educational_system">
                <Select v-model="education.educational_system" style="width: 200px"  placeholder="学制">
                  <Option
                    v-for="item in educational_systems"
                    :key="item.value"
                    :value="item.value">{{item.label}}
                  </Option>
                </Select>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="学习形式:" prop="modality">
                <Select v-model="education.modality" style="width: 200px"  placeholder="学习形式">
                  <Option value="全日制">全日制</Option>
                  <Option value="非全日制">非全日制</Option>
                  <Option value="在职">在职</Option>
                </Select>
              </FormItem>
            </div>
          </i-col>
        </Row>
        <Row>
          <i-col :span="6">
            <div>
              <FormItem label="校(院)长:" prop="schoolmaster">
                <Input  v-model="education.schoolmaster"  style="width: 200px"
                        placeholder="校(院)长"></Input>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6">
            <div>
              <FormItem label="是否毕业:" prop="graduate">
                <RadioGroup v-model="education.graduate">
                  <Radio label="是">是</Radio>
                  <Radio style="margin-left: 15px" label="否">否</Radio>
                </RadioGroup>
              </FormItem>
            </div>
          </i-col>
          <i-col span="6" v-if="education.graduate == '是'">
            <div>
              <FormItem label="毕(结)业日期:">
                <DatePicker
                  v-model="education.end_time"
                  show-week-numbers
                  style="width: 200px"
                  type="date"
                  placeholder="毕(结)业日期">
                </DatePicker>
              </FormItem>
            </div>
          </i-col>
          <i-col :span="6" v-if="education.graduate == '是'">
            <div>
              <FormItem label="证书编号:">
                <Input  v-model="education.certificate"  style="width: 200px"
                        placeholder="请输入证书编号..."></Input>
              </FormItem>
            </div>
          </i-col>
        </Row>
        <div slot="footer">
          <Button  @click="cancelEidt" icon="md-close">取 消</Button>
          <Button  type="primary"  icon="md-checkmark" :loading="accqualLoading" @click="addEdu"
                   v-if="!edit_status">确 定</Button>
          <Button type="primary" icon="md-refresh" :loading="accqualLoading" @click="refreshEdu"
                  v-else>更 新</Button>
        </div>
      </Modal>
    </div>
  </Form>
</template>

<script>
  import {addEducation,editEducation,getEduById} from '@/api/manage'
    export default {
        name: "addEducation",
      data(){
          return{
            edit_status:false,
            education:{
              name:'',
              sex:'',
              school:'',
              major:'',
              education_category:'',
              educational_system:'',
              level:'',
              graduate:'',
              modality:'',
              college:'',
              schoolmaster:'',
              certificate:'',
              start_time: '',
              end_time:'',
              birthday:'',
              nation:''
            },
            education_categorys:[{label:'普通高等教育',value:'普通高等教育'},{label:'普通专升本',value:'普通专升本'},
                                 {label:'成人高考',value:'成人高考'}, {label:'自考',value:'自考'},
                                 {label:'电大',value:'电大'},{label:'网络教育',value:'网络教育'}],
            degrees:[{label:'博士后',value:'博士后'},{label:'博士',value:'博士'},{label:'硕士',value:'硕士'},
                      {label:'本科',value:'本科'},{label:'专科',value:'专科'},{label:'高中',value:'高中'},
                      {label:'初中',value:'初中'},{label:'小学',value:'小学'},{label:'幼儿园',value:'幼儿园'}],
            educational_systems:[{label:'1',value:'1'},{label:'2',value:'2'},{label:'3',value:'3'},{label:'4',value:'4'},
                      {label:'5',value:'5'},{label:'6',value:'6'},{label:'7',value:'7'},
                      {label:'8',value:'8'},{label:'9',value:'9'},{label:'10',value:'10'}],
            visiable: false,
            rules: {
              name: [{required: true, message: '必填:姓名', trigger: 'blur'}],
              sex: [{required: true, message: '必填:性别', trigger: 'blur'}],
              graduate: [{required: true, message: '必选:是否毕业', trigger: 'blur'}],
              educational_system: [{required: true, message: '必填:学制', trigger: 'change'}],
              nation: [{required: true, message: '必填:民族', trigger: 'blur'}],
              modality: [{required: true, message: '必填:学习形式', trigger: 'change'}],
              school: [{required: true, message: '必填:学校', trigger: 'blur'}],
              level: [{required: true, message: '必填:层次', trigger: 'change'}],
            },
            accqualLoading: false
          }
      },
      methods:{
        init(){
          this.visiable = true;
        },
        cancelEidt(){
          this.edit_status = false
          this.visiable = false;
        },
        //新增
        addEdu(){
          this.$refs.addEduForm.validate((valid) => {
            if(valid) {
              this.accqualLoading = true
              addEducation(this.education).then(resp => {
                if (resp && resp.status == 200) {
                  if(resp.data.success) {
                    this.$Notice.success({
                      title:"添加成功!",
                      duration: 3
                    })
                    this.visiable = false
                    this.accqualLoading = false
                    this.$emit("on-change")
                  }
                }
                this.accqualLoading = false
              })
            } else{
              this.accqualLoading = false
            }
          })
        },
        //更新
        refreshEdu(){
          this.$refs.addEduForm.validate((valid) => {
            if(valid) {
              this.accqualLoading = true
              editEducation(this.education).then(resp => {
                if (resp && resp.status == 200) {
                  if(resp.data.success) {
                    this.$Notice.success({
                      title:"更新成功!",
                      duration: 3
                    })
                  }
                  this.visiable = false
                  this.accqualLoading = false
                  this.edit_status = false
                  this.$emit("on-change")
                }
                this.accqualLoading = false
              })
            } else{
              this.accqualLoading = false
            }
          })
        },

        editEdu(id){
          let params = {};
          params.id = id;
          getEduById(params).then(resp =>{
            if (resp && resp.status == 200) {
              this.education = resp.data.data[0]
            }
          })
          this.visiable = true
          this.edit_status = true
          this.refreshEdu()
        },
      },
    }
</script>

<style scoped>

</style>
