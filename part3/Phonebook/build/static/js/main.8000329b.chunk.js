(this.webpackJsonpthe_phonebook=this.webpackJsonpthe_phonebook||[]).push([[0],{27:function(e,t,n){'use strict';n.r(t);var r=n(3),a=n(11),o=n.n(a),c=n(10),i=n(4),u=n(29),s='/api/persons',l={getAll:function(){return u.a.get(s).then((function(e){return e.data}))},create:function(e){return u.a.post(s,e).then((function(e){return e.data}))},deleteNote:function(e){return u.a.delete(''.concat(s,'/').concat(e)).then((function(e){return e.data}))},update:function(e,t){return u.a.put(''.concat(s,'/').concat(e),t).then((function(e){return e.data}))}},d=n(2),b=function(e){var t=e.addName,n=e.handleName,r=e.newName,a=e.newNumber,o=e.handleNumber,c=e.handleFilter,i=e.filter;return Object(d.jsxs)('form',{onSubmit:t,children:[Object(d.jsxs)('div',{children:['Filter shown with: ',Object(d.jsx)('input',{value:i,onChange:c})]}),Object(d.jsxs)('div',{children:['Name: ',Object(d.jsx)('input',{value:r,onChange:n})]}),Object(d.jsxs)('div',{children:['Number: ',Object(d.jsx)('input',{value:a,onChange:o})]}),Object(d.jsx)('div',{children:Object(d.jsx)('button',{type:'submit',children:'Add'})})]})},j=function(e){var t=e.value,n=e.setPeople,r=e.people,a=e.setErrorMessage;return Object(d.jsx)('button',{onClick:function(e){window.confirm('Do you wanna remove '.concat(t.name,'? '))&&(l.deleteNote(t.id).catch((function(e){a(''.concat(t.name,' is already been removed from server')),setTimeout((function(){a(null)}),3e3)})).then((function(e){n(r.filter((function(e){return e.id!==t.id})))})),a(''.concat(t.name,' is been removed from server')),setTimeout((function(){a(null)}),3e3))},children:'Delete'})},f=function(e){var t=e.people,n=e.filter,r=e.setPeople,a=e.setErrorMessage;return 0!==n.length?Object(d.jsx)('ul',{children:n.map((function(e){return Object(d.jsxs)('li',{children:[e.name,' ',e.number,' ',Object(d.jsx)(j,{value:e,setPeople:r,people:t,setErrorMessage:a}),' ']},e.id)}))}):0===n.length?Object(d.jsx)('p',{children:'Contact not found'}):Object(d.jsx)('ul',{children:t.map((function(e){return Object(d.jsxs)('li',{children:[e.name,' ',e.number,' ',Object(d.jsx)(j,{value:e,setPeople:r,people:t,setErrorMessage:a}),' ']},e.id)}))})},m=function(e){var t=e.message,n=e.errorMessage;return null===t&&null===n?null:null!=t?Object(d.jsx)('div',{style:{color:'green',background:'white',fontsize:20,borderstyle:'solid',borderradius:5,padding:10,marginbottom:10},children:t}):null!=n?Object(d.jsx)('div',{style:{color:'red',background:'white',fontsize:20,borderstyle:'solid',borderradius:5,padding:10,marginbottom:10},children:n}):void 0},h=function(){var e=Object(r.useState)([]),t=Object(i.a)(e,2),n=t[0],a=t[1];Object(r.useEffect)((function(){l.getAll().then((function(e){a(e)}))}),[]);var o=Object(r.useState)(''),u=Object(i.a)(o,2),s=u[0],j=u[1],h=Object(r.useState)(''),p=Object(i.a)(h,2),O=p[0],v=p[1],g=Object(r.useState)(''),x=Object(i.a)(g,2),w=x[0],N=x[1],y=Object(r.useState)(null),S=Object(i.a)(y,2),k=S[0],E=S[1],M=Object(r.useState)(null),C=Object(i.a)(M,2),P=C[0],J=C[1],T=n.filter((function(e){return!!e.name.toLowerCase().includes(w)&&e}));return Object(d.jsxs)('div',{children:[Object(d.jsx)(m,{errorMessage:P,message:k}),Object(d.jsx)(b,{handleName:function(e){j(e.target.value)},handleNumber:function(e){v(e.target.value)},handleFilter:function(e){N(e.target.value)},filter:w,newName:s,newNumber:O,addName:function(e){e.preventDefault();var t={name:s,number:O};if(n.map((function(e){return JSON.stringify(e.name)})).includes(JSON.stringify(t.name))){if(window.confirm(''.concat(t.name,' is already added to phonebook, replace the old number with a new one?'))){var r=n.find((function(e){return e.name===t.name})),o=Object(c.a)(Object(c.a)({},r),{},{number:t.number});l.update(r.id,o).then((function(e){a(n.map((function(e){return e.id!==r.id?e:o})))})),E(''.concat(t.name,' is been added')),setTimeout((function(){E(null)}),3e3)}}else l.create(t).then((function(e){a(n.concat(e)),j(''),v('')})),E(''.concat(t.name,' is been added')),setTimeout((function(){E(null)}),3e3)}}),Object(d.jsx)(f,{filter:T,people:n,setPeople:a,setErrorMessage:J})]})};o.a.createRoot(document.getElementById('root')).render(Object(d.jsx)(h,{}))}},[[27,1,2]]])
//# sourceMappingURL=main.8000329b.chunk.js.map