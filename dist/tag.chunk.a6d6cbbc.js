webpackJsonp([4],{615:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(299),r=n(u),s=a(303),i=n(s),l=a(304),o=n(l),f=a(308),d=n(f),c=a(331),p=n(c),m=a(30),h=n(m),v=function(e){function t(){return(0,i.default)(this,t),(0,d.default)(this,(t.__proto__||(0,r.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,o.default)(t,[{key:"formatTime",value:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,u=t.getDate();return a+"-"+n+"-"+u}},{key:"render",value:function(){var e=this.props.title,t=this.props.time;return h.default.createElement("a",{href:"#post/"+this.props.id},h.default.createElement("li",{className:"list-post"},h.default.createElement("span",{className:"date-long"},this.formatTime(t)),h.default.createElement("span",{className:"list-title"},e)))}}]),t}(m.Component);t.default=v},614:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var u=a(229),r=n(u),s=a(299),i=n(s),l=a(303),o=n(l),f=a(304),d=n(f),c=a(308),p=n(c),m=a(331),h=n(m),v=a(30),_=n(v),g=a(615),y=n(g),k=function(e){function t(){return(0,o.default)(this,t),(0,p.default)(this,(t.__proto__||(0,i.default)(t)).apply(this,arguments))}return(0,h.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){return _.default.createElement("div",null,_.default.createElement("h2",{className:"category"},this.props.title),_.default.createElement("ul",null,this.props.items.map(function(e,t){return _.default.createElement(y.default,(0,r.default)({},e,{key:t}))})))}}]),t}(v.Component);t.default=k},618:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function u(e){var t=e.postIssues,a=e.getTags,n=t||{isFetching:!0,items:[]},u=n.isFetching,r=n.items,s=a.items;return{isFetching:u,items:r,tagsArray:s}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(299),s=n(r),i=a(303),l=n(i),o=a(304),f=n(o),d=a(308),c=n(d),p=a(331),m=n(p),h=a(30),v=n(h),_=a(195),g=a(504),y=a(614),k=n(y),E=function(e){function t(){return(0,l.default)(this,t),(0,c.default)(this,(t.__proto__||(0,s.default)(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,f.default)(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){var e=this.props.dispatch;e((0,g.fetchIssuesIfNeeded)("tags",this.props.params.id,""))}},{key:"componentWillReceiveProps",value:function(e){if(e.params.id!==this.props.params.id){var t=e.dispatch;t((0,g.fetchIssuesIfNeeded)("tags",e.params.id,""))}}},{key:"render",value:function(){if(this.props.isFetching)return null;var e=void 0,t=this.props.params.id,a=this.props.tagsArray;if(a.length>0)for(var n=0;n<a.length;n++)if(a[n].id==t){e=a[n].title;break}return v.default.createElement("div",{className:"list"},v.default.createElement(k.default,{title:e,items:this.props.items}))}}]),t}(h.Component);t.default=(0,_.connect)(u)(E)}});