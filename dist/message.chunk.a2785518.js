webpackJsonp([7],{957:function(e,t,a){var n=a(958);"string"==typeof n&&(n=[[e.id,n,""]]);a(415)(n,{});n.locals&&(e.exports=n.locals)},958:function(e,t,a){t=e.exports=a(414)(),t.push([e.id,".messageDiv{margin:auto;max-width:650px}.messageDiv li{list-style:none;border-bottom:1px dashed #eee;padding:10px}.unchecked{background-color:azure}.messageDiv li span a{color:rgba(0,0,0,.65);word-wrap:break-word;word-break:break-all}.messageDiv li span a:hover{text-decoration:underline}.messageType{color:#ffce3d;font-size:larger}@media only screen and (-webkit-min-device-pixel-ratio:1.5),only screen and (min--moz-device-pixel-ratio:1.5),only screen and (min-resolution:2dppx),only screen and (min-resolution:240dpi){.messageDiv{max-width:320px}}",""])},956:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=e.messages;return{messages:t}}Object.defineProperty(t,"__esModule",{value:!0});var s=(a(540),a(543)),l=n(s),i=a(280),o=n(i),u=a(285),c=n(u),d=a(286),m=n(d),f=a(290),p=n(f),h=a(325),g=n(h),v=a(32),y=n(v),k=a(197),E=a(516),_=a(269);a(957);var x=function(e){function t(e){(0,c.default)(this,t);var a=(0,p.default)(this,(t.__proto__||(0,o.default)(t)).call(this,e));return a.strLength=function(e){for(var t=0,a=0;a<e.length;a++){var n=e.charCodeAt(a);n>=1&&n<=126||65376<=n&&n<=65439?t++:t+=2}return t},a.timeFromNowLittleThan2Hour=function(e){var t=(new Date).getTime(),a=t-parseInt(e);return a<=36e5},a}return(0,g.default)(t,e),(0,m.default)(t,[{key:"componentDidMount",value:function(){var e=this.props.dispatch;e((0,E.fetchIssues)("getMessages",""))}},{key:"componentWillUnmount",value:function(){var e=this.props.dispatch;e((0,E.getMessages)(_.INIT_MESSAGES,""))}},{key:"formatTime",value:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate();return a+"-"+n+"-"+r}},{key:"formatMessages",value:function(e){for(var t={},a=0;a<e.length;a++){var n=this.formatTime(e[a].time);t[n]?t[n].push(e[a]):(t[n]=[],t[n].push(e[a]))}return t}},{key:"render",value:function(){var e=this.props.messages.messages,t=this.props.messages.isMessageFetching,a=this.formatMessages(e),n=[];for(var r in a){n.push(y.default.createElement("h2",{key:r,className:"category"},r));for(var s=0;s<a[r].length;s++)n.push(y.default.createElement("li",{key:a[r][s].id,className:this.timeFromNowLittleThan2Hour(a[r][s].time)?"unchecked":""},y.default.createElement("span",{className:"messageType"},a[r][s].message_type,"  "),y.default.createElement("a",{href:"JavaScript:void(0)"},"@",a[r][s].sender),y.default.createElement("span",null,":",this.strLength(a[r][s].content)<=120?y.default.createElement("a",{href:"/#"+a[r][s].href}," ",a[r][s].content):y.default.createElement("a",{href:"/#"+a[r][s].href}," ",a[r][s].content.substring(0,62)+"..."))))}return y.default.createElement("div",{className:"messageDiv"},t?y.default.createElement("div",{style:{textAlign:"center"}},y.default.createElement(l.default,{size:"large"})):n)}}]),t}(v.Component);t.default=(0,k.connect)(r)(x);(function(e){function t(){return(0,c.default)(this,t),(0,p.default)(this,(t.__proto__||(0,o.default)(t)).apply(this,arguments))}return(0,g.default)(t,e),(0,m.default)(t,[{key:"render",value:function(){return y.default.createElement("div",null,y.default.createElement("h2",{className:"messageTime"},this.props.time),y.default.createElement("ul",null,this.props.items.map(function(e,t){return y.default.createElement("li",{key:t})})))}}]),t})(v.Component)}});