/*! For license information please see main.c9cebcac.chunk.js.LICENSE.txt */
(this.webpackJsonpinstagram=this.webpackJsonpinstagram||[]).push([[0],{45:function(e,t,a){e.exports=a(70)},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},67:function(e,t,a){},70:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(13),r=a.n(o),i=(a(50),a(6)),s=(a(51),a(52),a(97),a(14)),l=a.n(s),u=l.a.initializeApp({apiKey:"AIzaSyDd8KSUe2F6AS2WXSqwKKIXLKDxKFfjtm4",authDomain:"https://elir-mahad.github.io/instagram/",databaseURL:"https://instagram-a3c9d.firebaseio.com",projectId:"instagram-a3c9d",storageBucket:"instagram-a3c9d.appspot.com",messagingSenderId:"729329518783",appId:"1:729329518783:web:0154d95c1eb23d02429e0a",measurementId:"G-Z3NXSRWP0Q"}).firestore(),m=(l.a.auth(),l.a.storage());var p=a(93),d=a(94),g=a(96),f=a(95);a(67);var h=function(e){var t=e.username,a=Object(n.useState)(null),o=Object(i.a)(a,2),r=o[0],s=o[1],p=Object(n.useState)(0),d=Object(i.a)(p,2),g=d[0],h=d[1],b=Object(n.useState)(""),v=Object(i.a)(b,2),E=v[0],j=v[1];return c.a.createElement("div",{className:"imageupload"},c.a.createElement("progress",{className:"imageupload_progress",value:g,max:"100"}),c.a.createElement("input",{type:"text",placeholder:"Enter a caption ...",onChange:function(e){return j(e.target.value)},value:E}),c.a.createElement("input",{type:"file",onChange:function(e){e.target.files[0]&&s(e.target.files[0])}}),c.a.createElement(f.a,{className:"imageupload_button",onClick:function(){m.ref("images/".concat(r.name)).put(r).on("state_changed",(function(e){var t=Math.round(e.bytesTransferred/e.totalBytes*100);h(t)}),(function(e){console.log(e)}),(function(){m.ref("images").child(r.name).getDownloadURL().then((function(e){u.collection("posts").add({timestamp:l.a.firestore.FieldValue.serverTimestamp(),caption:E,imageUrl:e,username:t}),h(0),j(""),s(null)}))}))}},"Upload"))},b=a(40);function v(){return{top:"".concat(50,"%"),left:"".concat(50,"%"),transform:"translate(-".concat(50,"%, -").concat(50,"%)")}}var E=Object(p.a)((function(e){return{paper:{position:"absolute",width:400,backgroundColor:e.palette.background.paper,border:"2px solid #000",boxShadow:e.shadows[5],padding:e.spacing(2,4,3)}}}));var j=function(){var e=E(),t=Object(n.useState)([]),a=Object(i.a)(t,2),o=a[0],r=a[1],l=Object(n.useState)(v),m=Object(i.a)(l,1)[0],p=Object(n.useState)(!1),j=Object(i.a)(p,2),w=j[0],O=j[1],S=Object(n.useState)(!1),y=Object(i.a)(S,2),_=y[0],N=y[1],C=Object(n.useState)(""),k=Object(i.a)(C,2),x=k[0],I=k[1],A=Object(n.useState)(""),W=Object(i.a)(A,2),D=W[0],K=W[1],L=Object(n.useState)(""),U=Object(i.a)(L,2),B=U[0],R=U[1],F=Object(n.useState)(null),P=Object(i.a)(F,2),T=P[0],X=P[1];return Object(n.useEffect)((function(){var e=Object(s.auth)().onAuthStateChanged((function(e){e?(console.log(e),X(e)):X(null)}));return function(){e()}}),[T,x]),Object(n.useEffect)((function(){u.collection("posts").orderBy("timestamp","desc").onSnapshot((function(e){r(e.docs.map((function(e){return{id:e.id,post:e.data()}})))}))}),[]),c.a.createElement("div",{className:"app"},c.a.createElement(d.a,{open:w,onClose:function(){return O(!1)}},c.a.createElement("div",{style:m,className:e.paper},c.a.createElement("form",null,c.a.createElement("center",{className:"app_signup"},c.a.createElement("img",{className:"app_headerImage",src:"https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png",alt:""}),c.a.createElement(g.a,{type:"text",placeholder:"username",value:x,onChange:function(e){return I(e.target.value)}}),c.a.createElement(g.a,{type:"text",placeholder:"email",value:D,onChange:function(e){return K(e.target.value)}}),c.a.createElement(g.a,{type:"text",placeholder:"password",value:B,onChange:function(e){return R(e.target.value)}}),c.a.createElement(f.a,{type:"submit",onClick:function(e){e.preventDefault(),Object(s.auth)().createUserWithEmailAndPassword(D,B).then((function(e){e.user.updateProfile({displayName:x})})).catch((function(e){return alert(e.message)}))}},"Sign up"))))),c.a.createElement(d.a,{open:_,onClose:function(){return N(!1)}},c.a.createElement("div",{style:m,className:e.paper},c.a.createElement("form",null,c.a.createElement("center",{className:"app_signup"},c.a.createElement("img",{className:"app_headerImage",src:"https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png",alt:""}),c.a.createElement(g.a,{type:"text",placeholder:"email",value:D,onChange:function(e){return K(e.target.value)}}),c.a.createElement(g.a,{type:"text",placeholder:"password",value:B,onChange:function(e){return R(e.target.value)}}),c.a.createElement(f.a,{type:"submit",onClick:function(e){e.preventDefault(),Object(s.auth)().signInWithEmailAndPassword(D,B).catch((function(e){return alert(e.message)})),N(!1)}},"Sign In"))))),c.a.createElement("div",{className:"app_header"},c.a.createElement("img",{className:"app_headerImage",src:"https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png",alt:""}),T?c.a.createElement(f.a,{onClick:function(){return Object(s.auth)().signOut()}}," Sign out "):c.a.createElement("div",{className:"app_loginContainer"},c.a.createElement(f.a,{onClick:function(){return N(!0)}}," Sign in "),c.a.createElement(f.a,{onClick:function(){return O(!0)}}," Sign up "))),c.a.createElement("div",{className:"app_posts"},c.a.createElement("div",{className:"app_postsLeft"},o.map((function(e){e.id,e.post}))),c.a.createElement("div",{className:"app_postsRight"},c.a.createElement(b.a,{url:"https://instagr.am/p/Zw9o4/",maxWidth:320,hideCaption:!1,containerTagName:"div",protocol:"",injectScript:!0,onLoading:function(){},onSuccess:function(){},onAfterRender:function(){},onFailure:function(){}}))),(null===T||void 0===T?void 0:T.displayName)?c.a.createElement(h,{username:T.displayName}):c.a.createElement("h3",null," Login to upload"))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(c.a.StrictMode,null,c.a.createElement(j,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.c9cebcac.chunk.js.map