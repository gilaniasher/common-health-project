(this["webpackJsonpadmin-interface"]=this["webpackJsonpadmin-interface"]||[]).push([[0],{59:function(e,n,t){e.exports=t(73)},64:function(e,n,t){},68:function(e,n,t){},73:function(e,n,t){"use strict";t.r(n);var a=t(0),l=t.n(a),r=t(7),u=t.n(r),i=(t(64),t(30)),c=t(12),o=t(14),s=t(116),d=t(110),f=t(117),m=t(45),g=t.n(m),p=(t(68),"https://obxbkf8dsb.execute-api.us-east-2.amazonaws.com/Prod"),h=t(47),v=t.n(h),b=t(31);function E(){var e=Object(c.a)(["\n  margin-top: 3%;\n  margin-right: 100px;\n"]);return E=function(){return e},e}function D(){var e=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  padding: 3%;\n  align-items: center;\n"]);return D=function(){return e},e}function k(){var e=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  padding: 4%;\n"]);return k=function(){return e},e}var O=o.a.div(k()),R=o.a.div(D()),y=Object(b.css)(E()),j=function(e){var n={username:Object(a.useRef)(""),password:Object(a.useRef)("")};return l.a.createElement(O,null,l.a.createElement("span",null,"Login to CHP Admin Interface"),l.a.createElement(R,null,l.a.createElement(s.a,{label:"Username",variant:"filled",inputRef:n.username}),l.a.createElement(s.a,{label:"Password",variant:"filled",type:"password",inputRef:n.password})),l.a.createElement(d.a,{size:"large",color:"primary",onClick:function(){""===n.username.current.value||""===n.password.current.value?console.log("Username or password is empty"):(e.setLoading(!0),function(e,n,t,a){var l="".concat(p,"/AdminLogin?")+new URLSearchParams({username:e,password:n});fetch(l,{method:"POST"}).then((function(e){200===e.status?(console.log("Logging in"),t(!0),a(!1)):(console.log("Failed to log in"),t(!1),a(!1))})).catch((function(){console.log("Log in request failed"),t(!1),a(!1)}))}(n.username.current.value,n.password.current.value,e.setLoggedIn,e.setLoading))}},"Login"),l.a.createElement(v.a,{css:y,size:30,color:"#123abc",loading:e.loading}))},S=t(111),x=t(112),K=t(115),w=t(113),N=t(114);function P(){var e=Object(c.a)(["\n  display: flex;\n  align-items: flex-start;\n  width: 100%;\n"]);return P=function(){return e},e}function L(){var e=Object(c.a)(["\n  display: flex;\n  padding-top: 2%;\n  padding-bottom: 2%;\n"]);return L=function(){return e},e}function A(){var e=Object(c.a)(["\n  align-self: flex-start;\n  font-size: 20px;\n  padding-bottom: 2%;\n"]);return A=function(){return e},e}function C(){var e=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  padding: 5%;\n  width: 100%;\n  align-items: center;\n"]);return C=function(){return e},e}function U(){var e=Object(c.a)(["\n  display: flex;\n  flex: 1;\n  flex-direction: column;\n  align-items: center;\n  padding: 4%;\n"]);return U=function(){return e},e}var z=o.a.div(U()),I=o.a.div(C()),J=o.a.span(A()),V=o.a.div(L()),M=o.a.div(P()),T=["Morris","Bergen","Middlesex","Essex/Passaic","Union"],B=function(){var e=Object(a.useState)(!1),n=Object(i.a)(e,2),t=n[0],r=n[1],u=Object(a.useState)(!1),c=Object(i.a)(u,2),o=c[0],m=c[1],h=Object(a.useState)(!1),v=Object(i.a)(h,2),b=v[0],E=v[1],D=Object(a.useState)([]),k=Object(i.a)(D,2),O=k[0],R=k[1],y={scheduleRounds:{roundNum:Object(a.useRef)(),startDate:Object(a.useRef)(),endDate:Object(a.useRef)()},scheduleKitDates:{roundNum:Object(a.useRef)(),county:Object(a.useRef)(),kitDropoff:Object(a.useRef)(),kitPickup:Object(a.useRef)()},assignKits:{}};return Object(a.useEffect)((function(){t&&(E(!0),fetch("".concat(p,"/GetUnassignedUsers")).then((function(e){return e.json()})).then((function(e){return e.unassignedUsers})).catch((function(){return console.log("Failed to load in unassigned users"),[]})).then((function(e){var n=e.map((function(e){return n=e[0],t=e[1],a=e[2],{id:n,name:t,kitsDesired:a};var n,t,a}));y.assignKits={},R(n),E(!1)})))}),[t]),t?l.a.createElement(z,null,l.a.createElement("span",null,"CHP Admin Interface"),l.a.createElement(I,null,l.a.createElement(J,null,"Schedule Rounds"),l.a.createElement(V,null,l.a.createElement(s.a,{label:"Round #",variant:"filled",inputRef:y.scheduleRounds.roundNum}),l.a.createElement(s.a,{label:"Start Date",variant:"filled",type:"date",defaultValue:"2020-07-25",inputRef:y.scheduleRounds.startDate}),l.a.createElement(s.a,{label:"End Date",variant:"filled",type:"date",defaultValue:"2020-07-25",inputRef:y.scheduleRounds.endDate})),l.a.createElement(d.a,{size:"large",color:"primary",onClick:function(){var e={roundNum:y.scheduleRounds.roundNum.current.value,startDate:y.scheduleRounds.startDate.current.value,endDate:y.scheduleRounds.endDate.current.value};console.log("scheduling rounds",JSON.stringify(e,null,2)),function(e){var n=e.roundNum,t=e.startDate,a=e.endDate,l="".concat(p,"/AddRound?")+new URLSearchParams({roundNum:n,startDate:t,endDate:a});fetch(l,{method:"POST"}).then((function(){return console.log("Round added")})).catch((function(e){return console.log("Could not add new round: ".concat(e))}))}(e)}},"Submit")),l.a.createElement(I,null,l.a.createElement(J,null,"Schedule Kit Dropoff/Pickup Dates"),l.a.createElement(V,null,l.a.createElement(s.a,{label:"Round #",variant:"filled",inputRef:y.scheduleKitDates.roundNum}),l.a.createElement(s.a,{label:"County",select:!0,variant:"filled",defaultValue:"Morris",inputRef:y.scheduleKitDates.county},T.map((function(e){return l.a.createElement(f.a,{key:e,value:e},e)}))),l.a.createElement(s.a,{label:"Kit Dropoff Date",variant:"filled",type:"date",defaultValue:"2020-07-25",inputRef:y.scheduleKitDates.kitDropoff}),l.a.createElement(s.a,{label:"Kit Pickup Date",variant:"filled",type:"date",defaultValue:"2020-07-25",inputRef:y.scheduleKitDates.kitPickup})),l.a.createElement(d.a,{size:"large",color:"primary",onClick:function(){var e={roundNum:y.scheduleKitDates.roundNum.current.value,county:y.scheduleKitDates.county.current.value,kitDropoffDate:y.scheduleKitDates.kitDropoff.current.value,kitPickupDate:y.scheduleKitDates.kitPickup.current.value};console.log("scheduling kit dates",JSON.stringify(e,null,2)),function(e){var n=e.roundNum,t=e.county,a=e.kitDropoffDate,l=e.kitPickupDate,r="".concat(p,"/ScheduleDates?")+new URLSearchParams({roundNum:n,county:t,kitDropoffDate:a,kitPickupDate:l});fetch(r,{method:"POST"}).then((function(){return console.log("Scheduled Dates")})).catch((function(e){return console.log("Could not schedule dates: ".concat(e))}))}(e)}},"Submit")),l.a.createElement(I,null,l.a.createElement(M,null,l.a.createElement(J,null,"Assign Kits for Next Round"),l.a.createElement(g.a,{size:20,color:"#123abc",loading:b})),l.a.createElement(S.a,null,l.a.createElement(x.a,null,l.a.createElement(w.a,null,l.a.createElement(N.a,null,"ID"),l.a.createElement(N.a,null,"Name"),l.a.createElement(N.a,null,"Kits Desired"),l.a.createElement(N.a,null,"Num Kits to Assign (Entries can be left blank)"))),l.a.createElement(K.a,null,O.map((function(e){return l.a.createElement(w.a,null,l.a.createElement(N.a,null,e.id),l.a.createElement(N.a,null,e.name),l.a.createElement(N.a,null,e.kitsDesired),l.a.createElement(N.a,null,l.a.createElement(s.a,{label:"Num Kits to Assign",inputRef:function(n){y.assignKits[e.id]=n}})))})))),l.a.createElement(d.a,{size:"large",color:"primary",onClick:function(){console.log("Assigning kits");var e,n={};for(var t in y.assignKits)""!==y.assignKits[t].value&&(n[t]=y.assignKits[t].value+"0");console.log(JSON.stringify(n,null,2)),0!==Object.keys(n).length&&(e=n,fetch("".concat(p,"/AssignKits"),{method:"POST",body:JSON.stringify(e)}).then((function(e){200===e.status?console.log("Succesfully updated kit assignment"):console.log("Failed to submit kit assignment")})).catch((function(){console.log("Kit assignment request failed")})))}},"Submit"))):l.a.createElement(j,{setLoggedIn:r,loading:o,setLoading:m})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(l.a.createElement(l.a.StrictMode,null,l.a.createElement(B,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[59,1,2]]]);
//# sourceMappingURL=main.49ad5325.chunk.js.map