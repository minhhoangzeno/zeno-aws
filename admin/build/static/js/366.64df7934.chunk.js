"use strict";(self.webpackChunkadmin=self.webpackChunkadmin||[]).push([[366],{6723:function(e,n,r){r.d(n,{J:function(){return t}});var t=function(e){return e.ADMIN="ADMIN",e.LEADER="LEADER",e.USER="USER",e}({})},6366:function(e,n,r){r.r(n),r.d(n,{default:function(){return J}});var t=r(9439),l=r(9286),i=r(2622),o=r(1752),s=r(8302),c=r(6106),a=r(7309),d=r(6e3),u=r(7027),h=r(1082),m=r(2791),f=r(1190),x=r(4740),Z=r(6708),j=r(1413),p=r(9555),E=r(7846),I=r(1990),R=r(177),y=r(6723),S=r(184),v=s.Z.Text,T=p.Z.Option;function k(e){var n=e.modalOpen,r=e.setModalOpen,l=E.Z.useForm(),i=(0,t.Z)(l,1)[0],o=(0,x.T)();(0,m.useEffect)((function(){i.setFieldValue("roleId",3)}),[i,n]);return(0,S.jsx)(S.Fragment,{children:(0,S.jsx)(I.Z,{destroyOnClose:!0,title:(0,S.jsx)(s.Z.Text,{children:"Th\xeam ng\u01b0\u1eddi d\xf9ng"}),style:{top:20},open:n,onOk:function(){return r(!1)},onCancel:function(){return r(!1)},footer:null,forceRender:!0,children:(0,S.jsxs)(E.Z,{form:i,onFinish:function(e){if(console.log("values",e),e.password!==e.confirmPassword)u.ZP.info("M\u1eadt kh\u1ea9u ch\u01b0a kh\u1edbp!");else{var n=y.J.USER;2===e.roleId&&(n=y.J.LEADER),f.f.add((0,j.Z)((0,j.Z)({},e),{},{typeRole:n})).then((function(n){f.f.changeRole(n.data.id,e.roleId).then((function(){o((0,Z.nG)((0,j.Z)((0,j.Z)({},n.data),{},{roleId:e.roleId}))),u.ZP.success("Success"),r(!1)}))})).catch((function(){u.ZP.error("Error"),r(!1)}))}},onFinishFailed:function(){u.ZP.error("Error!")},colon:!1,autoComplete:"off",children:[(0,S.jsx)(v,{children:"T\xean"}),(0,S.jsx)(E.Z.Item,{name:"name",required:!0,label:"",children:(0,S.jsx)(R.Z,{})}),(0,S.jsx)(v,{children:"Email"}),(0,S.jsx)(E.Z.Item,{name:"email",required:!0,label:"",children:(0,S.jsx)(R.Z,{})}),(0,S.jsx)(v,{children:"M\u1eadt kh\u1ea9u"}),(0,S.jsx)(E.Z.Item,{name:"password",required:!0,label:"",children:(0,S.jsx)(R.Z.Password,{})}),(0,S.jsx)(v,{children:"X\xe1c nh\u1eadn m\u1eadt kh\u1ea9u "}),(0,S.jsx)(E.Z.Item,{name:"confirmPassword",required:!0,label:"",children:(0,S.jsx)(R.Z.Password,{})}),(0,S.jsx)(v,{children:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i"}),(0,S.jsx)(E.Z.Item,{name:"phone",label:"",children:(0,S.jsx)(R.Z,{})}),(0,S.jsx)(v,{children:"Role"}),(0,S.jsx)(E.Z.Item,{name:"roleId",label:"",children:(0,S.jsxs)(p.Z,{children:[(0,S.jsx)(T,{value:2,children:y.J.LEADER}),(0,S.jsx)(T,{value:3,children:y.J.USER})]})}),(0,S.jsxs)(c.Z,{className:"justify-end",children:[(0,S.jsx)(a.ZP,{className:"mr-4",onClick:function(){return r(!1)},children:"\u0110\xf3ng"}),(0,S.jsx)(a.ZP,{type:"primary",htmlType:"submit",children:"L\u01b0u"})]})]})})})}var P=s.Z.Text,b=p.Z.Option;function g(e){var n=e.modalOpen,r=e.setModalOpen,l=e.account,i=E.Z.useForm(),o=(0,t.Z)(i,1)[0],d=(0,x.T)();(0,m.useEffect)((function(){var e=3;l.typeRole===y.J.ADMIN?e=1:l.typeRole===y.J.LEADER?e=2:l.typeRole===y.J.USER&&(e=3),o.setFieldsValue({name:l.name,email:l.email,phone:l.phone,typeRole:l.typeRole,roleId:e})}),[o,n,l]);return(0,S.jsx)(S.Fragment,{children:(0,S.jsx)(I.Z,{destroyOnClose:!0,title:(0,S.jsx)(s.Z.Text,{children:"S\u1eeda th\xf4ng tin"}),style:{top:20},open:n,onOk:function(){return r(!1)},onCancel:function(){return r(!1)},footer:null,forceRender:!0,children:(0,S.jsxs)(E.Z,{form:o,onFinish:function(e){if(l.id){var n=y.J.USER;1===e.roleId&&(n=y.J.ADMIN),2===e.roleId&&(n=y.J.LEADER),3===e.roleId&&(n=y.J.USER),f.f.update(l.id,(0,j.Z)((0,j.Z)({},e),{},{typeRole:n})).then((function(n){f.f.changeRole(n.data.id,e.roleId).then((function(){d((0,Z.rx)((0,j.Z)((0,j.Z)({},n.data),{},{roleId:e.roleId}))),u.ZP.success("Success"),r(!1)}))})).catch((function(){u.ZP.error("Error"),r(!1)}))}},onFinishFailed:function(){u.ZP.error("Error!")},colon:!1,autoComplete:"off",children:[(0,S.jsx)(P,{children:"T\xean"}),(0,S.jsx)(E.Z.Item,{name:"name",required:!0,label:"",children:(0,S.jsx)(R.Z,{})}),(0,S.jsx)(P,{children:"Email"}),(0,S.jsx)(E.Z.Item,{name:"email",required:!0,label:"",children:(0,S.jsx)(R.Z,{})}),(0,S.jsx)(P,{children:"S\u1ed1 \u0111i\u1ec7n tho\u1ea1i"}),(0,S.jsx)(E.Z.Item,{name:"phone",label:"",children:(0,S.jsx)(R.Z,{})}),(0,S.jsx)(P,{children:"Role"}),(0,S.jsx)(E.Z.Item,{name:"roleId",label:"",children:(0,S.jsxs)(p.Z,{children:[(0,S.jsx)(b,{value:1,children:y.J.ADMIN}),(0,S.jsx)(b,{value:2,children:y.J.LEADER}),(0,S.jsx)(b,{value:3,children:y.J.USER})]})}),(0,S.jsxs)(c.Z,{className:"justify-end",children:[(0,S.jsx)(a.ZP,{className:"mr-4",onClick:function(){return r(!1)},children:"\u0110\xf3ng"}),(0,S.jsx)(a.ZP,{type:"primary",htmlType:"submit",children:"L\u01b0u"})]})]})})})}function J(){var e=(0,x.C)(Z.zf),n=(0,x.T)(),r=(0,m.useState)(!1),i=(0,t.Z)(r,2),o=i[0],u=i[1];(0,m.useEffect)((function(){f.f.fetchAll().then((function(e){console.log(e.headers),n((0,Z.$i)(e.data))}))}),[n]);var h=[{title:"STT",dataIndex:"id",render:function(e,n,r){return(0,S.jsx)(s.Z.Title,{level:5,children:r+1})}},{title:"T\xean",width:"40%",dataIndex:"name"},{title:"Email",dataIndex:"email",width:"10%"},{title:"Role",width:"10%",dataIndex:"typeRole"},{title:"Thi\u1ebft l\u1eadp",render:function(e,n){return(0,S.jsx)(C,{record:n})}}];return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(c.Z,{className:"mb-4",children:(0,S.jsx)(a.ZP,{type:"primary",icon:(0,S.jsx)(l.Z,{}),onClick:function(){return u(!0)}})}),(0,S.jsx)(k,{modalOpen:o,setModalOpen:u}),(0,S.jsx)(d.Z,{columns:h,dataSource:e,bordered:!0,rowKey:"id",pagination:{pageSize:10}})]})}function C(e){var n=e.record,r=(0,x.T)(),l=(0,m.useState)(!1),c=(0,t.Z)(l,2),a=c[0],d=c[1];return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(h.Z,{title:"B\u1ea1n c\xf3 ch\u1eafc ch\u1eafn mu\u1ed1n x\xf3a kh\xf4ng?",onConfirm:function(){return function(e){e.id&&f.f.delete(e.id).then((function(){r((0,Z.aL)(e))})).catch((function(e){u.ZP.error("Error")}))}(n)},children:(0,S.jsx)(s.Z.Link,{className:"mr-4",children:(0,S.jsx)(i.Z,{style:{fontSize:"130%"}})})}),(0,S.jsx)(s.Z.Link,{className:"mr-4",onClick:function(){return d(!0)},children:(0,S.jsx)(o.Z,{style:{fontSize:"130%"}})}),(0,S.jsx)(g,{modalOpen:a,setModalOpen:d,account:n})]})}}}]);
//# sourceMappingURL=366.64df7934.chunk.js.map