import React, { Component } from 'react'
import './login.less'
import logo from './images/logo.png'
import {
    Form,
    Icon,
    Input,
    Button
} from 'antd';
const Item = Form.Item //不能写在import之前

/**
 * 登录的路由组建
 */
class Login extends Component {

    handleSubmit = (event) =>{
        //阻止事件的默认行为
        event.preventDefault()

        //对所有表单字段进行检验
        this.props.form.validateFields((err,values)=>{
            //检验成功
            if(!err){
                console.log('提交登录的ajax请求:',values)
            }else{
                console.log('检验失败')
            }
        })
    }
    /**
     * 对密码进行自定义验证
     */
    validatorPwd = (rule,value,callback) => {
        console.log('validatorPwd()',rule,value)
        if(!value){
            callback('密码必须输入')
        }else if(value.length<4){
            callback('密码长度不能小于4')
        }else if(value.length>12){
            callback('密码长度不能大于12')
        }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
            callback('密码必须是英文、数字或下划线组成')
        }else{
            callback() //验证通过
        }
    }

    render () {
        //得到具有强大功能的form对象
        const form = this.props.form
 
        const { getFieldDecorator } = form
        return (
            <div className="login">
                <header className="login-header">
                    <img src={logo} alt="logo" />
                    <h1>后台管理系统</h1>
                </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                    <Form onSubmit={this.handleSubmit} className="login-form">
                        <Item>
                            {getFieldDecorator('username',{ //配置对象:属性名是特定的一些名称 
                                //声明式验证:直接使用别人定义好的验证规则进行验证
                                rules: [
                                    {required:true,whitespace:true,message:'用户名必须输入'},
                                    {min:4,message:'用户名至少4位'},
                                    {max:12,message:'用户名最多12位'},
                                    {pattern:/^[a-zA-Z0-9_]+$/,message:'用户名必须是英文、数字或下划线组成'},
                                ],
                            })(
                                <Input
                                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="用户名"
                                />
                            )}
                            
                        </Item>
                        <Item>
                            {getFieldDecorator('password',{
                                rules:[
                                    {
                                        validator: this.validatorPwd
                                    }
                                ]
                            })(
                                <Input
                                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    type="password"
                                    placeholder="密码"
                                />
                            )}
                        </Item>
                        <Item>
                            <Button type="primary" htmlType="submit" className="login-form-button">
                                登录
                            </Button>
                        </Item>
                    </Form>
                </section>
            </div>
        )
    }
}
/**
 * 1、高阶函数
 *    1).一类特别的函数
 *       a.接收函数类型的参数
 *       b.返回值是函数
 *    2).常见
 *       a. 定时器:setTimeout()/setInterval()
 *       b. Promise:Promise(()=>{}) then(value=>{},reason=>{})
 *       c. 数据遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
 *       d. 函数对象的bind()
 *       e. Form.creact()() / getFieldDecorator()()
 *    3).高阶函数更加动态,更具有扩展性
 *          
 * 2、高阶组件
 *       1).本质就是一个函数
 *       2).接受一个组件,返回一个新的组件(包装组件),包装组件会向被包装组件传入特定属性
 *       3).作用:扩展组件的功能
 *       4).高阶组件也是高阶函数:接收一个组件函数,返回是一个新的组件函数
 */
/**
 * 包装Form组件生成一个新的组件:Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性:form
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin;

/**
 * 1、前台表单验证
 * 2、收集表单输入数据 
 */