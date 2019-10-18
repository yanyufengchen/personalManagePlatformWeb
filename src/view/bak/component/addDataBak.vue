<template>
  <div style="margin-top: 10px">
    <Card>
        <Steps :current="current" align="center" style="margin-top: 10px;">
          <Step title="备份配置"></Step>
          <Step title="主机配置"></Step>
          <Step title="数据库配置"></Step>
        </Steps>
        <br>
        <!--备份配置-->
        <div style="margin-top: 10px" v-show="current == 0">
        <Form :model="bakData" :rules="rules" ref="SqlDataBak" style="margin: 0px;padding: 0px;">
          <Row>
            <i-col span = 12>
              <div>
                <FormItem label="备份名:" prop="bak_name" align="left">
                  <Input  v-model="bakData.bak_name"  style="width: 50%"
                         placeholder="请输入备份名" clearable >
                    <template slot="append">.sql</template>
                  </Input>
                </FormItem>
              </div>
            </i-col>
            <i-col :span="12">
              <div>
                <FormItem label="备份地址:" prop="path" align="left">
                  <Input  v-model="bakData.path"  style="width: 50%"
                         placeholder="请输入备份地址" clearable></Input>
                </FormItem>
              </div>
            </i-col>
          </Row>
          <i-col>
            <i-col :span="12">
              <div>
                <FormItem label="备份库名:" prop="database_name" align="left">
                  <Input  v-model="bakData.database_name"  style="width: 47%"
                         placeholder="请选择或输入备份库名" clearable></Input>
                </FormItem>
              </div>
            </i-col>
            <i-col :span="12">
              <div>
                <FormItem label="备份表名:" prop="table_name" align="left">
                  <Input  v-model="bakData.table_name"  style="width: 50%"
                         placeholder="请选择或输入备份表名" clearable></Input>
                </FormItem>
              </div>
            </i-col>
          </i-col>
        </Form>
      </div>
        <!--主机配置-->
        <div style="margin-top: 10px" v-show="current == 1">
          <Form :model="bakData" :rules="rules" ref="SqlDataBak" style="margin: 0px;padding: 0px;">
            <Row>
              <i-col span = 12>
                <div>
                  <FormItem label="主机IP:" prop="node_ip" align="left">
                    <Input  v-model="bakData.node_ip"  style="width: 50%"
                              placeholder="请输入主机IP" clearable></Input>
                  </FormItem>
                </div>
              </i-col>
              <i-col :span="12">
                <div>
                  <FormItem label="主机端口:" prop="node_port" align="left">
                    <Input  v-model="bakData.node_port"  style="width: 50%"
                              placeholder="请输入主机端口" clearable></Input>
                  </FormItem>
                </div>
              </i-col>
            </Row>
            <Row>
              <i-col :span="12">
                <div>
                  <FormItem label="主机用户:" prop="node_user" align="left">
                    <Input clearable v-model="bakData.node_user"  style="width: 48%"
                              placeholder="请输入主机用户"></Input>
                  </FormItem>
                </div>
              </i-col>
              <i-col :span="12">
                <div>
                  <FormItem label="用户密码:" prop="node_password" align="left">
                    <Input clearable v-model="bakData.node_password"  style="width: 50%"
                              placeholder="请输入主机密码"></Input>
                  </FormItem>
                </div>
              </i-col>
            </Row>
          </Form>
      </div>
        <!--数据库配置-->
        <div style="margin-top: 10px" v-show="current == 2">
        <Form :model="bakData" :rules="rules" ref="SqlDataBak" style="margin: 0px;padding: 0px;">
          <Row>
            <i-col span = 12>
              <div>
                <FormItem label="数据库用户:" prop="mysql_user" align="left">
                  <Input clearable v-model="bakData.mysql_user" style="width: 50%"
                            placeholder="请输入数据库用户，不输入默认为root"></Input>
                </FormItem>
              </div>
            </i-col>
            <i-col :span="12">
              <div>
                <FormItem label="数据库密码:" prop="node_user" align="left">
                  <Input clearable v-model="bakData.mysql_password"  style="width: 50%"
                            placeholder="请输入数据库密码"></Input>
                </FormItem>
              </div>
            </i-col>
          </Row>
          <Row>
            <i-col :span="12">
              <div>
                <FormItem label="数据库端口:" prop="mysql_port" align="left">
                  <Input clearable v-model="bakData.mysql_port" style="width: 50%"
                            placeholder="请输入数据库端口"></Input>
                </FormItem>
              </div>
            </i-col>
          </Row>
        </Form>
      </div>
      <div align="right">
        <ButtonGroup>
          <Button type="primary" @click="back">
            <Icon type="ios-arrow-back" />
            上一步
          </Button>
          <Button  type="primary" @click="next">
            下一步
            <Icon type="ios-arrow-forward" />
          </Button>
        </ButtonGroup>
        <Button v-if="current==2" type="success" @click="dataBaseBak('SqlDataBak')" style="margin-left: 10px">确定</Button>
      </div>
    </Card>
  </div>
</template>

<script>
import { validateNormalName, validateIP } from '@/libs/validate';
import { mapMutations } from 'vuex'
import {addDataBak} from '@/api/database';
export default {
  name: "addDataBak",
  data () {
    // 验证备份名称
    const validateBakName = (rule, value, callback) => {
      if (!validateNormalName(value)) {
        callback(new Error('起始必须是小写字母，中间可以有数字和中横线,不支持大写字母和全数字'))
      } else {
        callback()
      }
    }

    // 验证主机端口
    const validatePort = (rule, value, callback) => {
      let ports = value.split(',')
      let flag = true
      for (const port of ports){
        if (!/^([0-9]*?)+$/.test(port)) {
          flag = false
        }
        if(port<1 || port > 65535){
          flag = false
        }
      }
      if(!flag){
        callback(new Error('端口范围1-65535的整数'))
      }else{
        callback()
      }
    }

    //验证主机IP
    const validateEndpointsIp = (rule, value, callback) =>{
      let ips = value.split(',')
      let flag = true
      for (const ip of ips) {
        if (!validateIP(ip)) {
          flag = false
        }
      }
      if(!flag){
        callback(new Error('IP地址不合法,格式:XXX.XXX.XXX.XXX'))
      }else{
        callback()
      }
    }
    return {
      current: 0,
      bakData: {
        bak_name: 'test24',
        database_name:'personal_master',
        table_name:'user',
        path:'/data/mjj',
        node_ip:'172.31.205.29',
        node_port:'22',
        node_user:'root',
        node_password:'Basic1.t2019!',
        mysql_user:'root',
        mysql_password:'MYSQL1.t!@#',
        hr_name:'admin',
        mysql_port:'3306'
      },
      rules: {
        bak_name: [{required: true, message: '必填', trigger: 'blur'},
          { required: true, validator: validateBakName, trigger: 'blur' },
        ],
        table_name: [{required: true, message: '必填', trigger: 'blur'}],
        path: [{required: true, message: '必填', trigger: 'blur'},{
          pattern: "^\\/?$|(\\/([-_.:0-9a-zA-Z]+)\\/?)+$",
          message:'必须以/开头,后面可跟-_.:数字英文大小写',
          trigger: 'blur'
        }],
        node_ip: [{required: true, message: '请输入ip', trigger: 'blur'},
          { required: true, validator: validateEndpointsIp, trigger: 'blur' },
        ],
        node_port: [{required: true, message: '请输入端口', trigger: 'blur'},
          { required: true, validator: validatePort, trigger: 'blur' },
        ],
        mysql_port:[{required: true, message: '请输入端口', trigger: 'blur'},
          { required: true, validator: validatePort, trigger: 'blur' },
        ],
        node_user: [{required: true, message: '必填', trigger: 'blur'}],
        node_password: [{required: true, message: '必填', trigger: 'blur'}],
        mysql_user: [{required: true, message: '必填', trigger: 'blur'}],
        mysql_password: [{required: true, message: '必填', trigger: 'blur'}],
        database_name:[{required:true,message:'必填',trigger:'blur'}]
      }
    }
  },

  methods: {
    ...mapMutations([
      'closeTag'
    ]),
    back () {
      if (this.current == 0) {
        this.current = 0;
      } else {
        this.current -= 1;
      }
    },
    next () {
      if (this.current == 2) {
        this.current = 2;
      } else {
        this.current += 1;
      }
    },
    dataBaseBak(SqlDataBak){
      this.$refs[SqlDataBak].validate((valid) => {
        if(valid) {
          addDataBak(this.bakData).then(resp => {
            if (resp && resp.status == 200) {
              if(resp.data.success) {
                this.$Message.success({content: "数据：" + this.bakData.bak_name + "备份成功！"});
                this.closeTag({
                  name: 'add_database'
                })
              }
            }
          })
        }
      })
    },
    emptyData(){
      this.bakData = {
        bak_name: '',
        database_name:'',
        table_name:'',
        path:'',
        node_ip:'',
        node_port:'',
        node_user:'',
        node_password:'',
        mysql_user:'',
        mysql_password:'',
        hr_id:'',
        mysql_port:''
      }
    }
  }
}
</script>

<style scoped>

</style>
