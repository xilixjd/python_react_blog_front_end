webpackJsonp([4],{672:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(299),s=n(r),u=a(303),i=n(u),l=a(304),o=n(l),f=a(308),d=n(f),c=a(331),p=n(c),m=a(30),h=n(m),v=function(e){function t(){return(0,i.default)(this,t),(0,d.default)(this,(t.__proto__||(0,s.default)(t)).apply(this,arguments))}return(0,p.default)(t,e),(0,o.default)(t,[{key:"formatTime",value:function(e){var t=new Date(e),a=t.getFullYear(),n=t.getMonth()+1,r=t.getDate();return a+"-"+n+"-"+r}},{key:"render",value:function(){var e=this.props.title,t=this.props.time;return h.default.createElement("a",{href:"#post/"+this.props.id},h.default.createElement("li",{className:"list-post"},h.default.createElement("span",{className:"date-long"},this.formatTime(t)),h.default.createElement("span",{className:"list-title"},e)))}}]),t}(m.Component);t.default=v},671:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(229),s=n(r),u=a(299),i=n(u),l=a(303),o=n(l),f=a(304),d=n(f),c=a(308),p=n(c),m=a(331),h=n(m),v=a(30),_=n(v),g=a(672),y=n(g),E=function(e){function t(){return(0,o.default)(this,t),(0,p.default)(this,(t.__proto__||(0,i.default)(t)).apply(this,arguments))}return(0,h.default)(t,e),(0,d.default)(t,[{key:"render",value:function(){return _.default.createElement("div",null,_.default.createElement("h2",{className:"category"},this.props.title),_.default.createElement("ul",null,this.props.items.map(function(e,t){return _.default.createElement(y.default,(0,s.default)({},e,{key:t}))})))}}]),t}(v.Component);t.default=E},675:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}function r(e){var t=e.postIssues,a=e.getTags,n=t||{isFetching:!0,items:[]},r=n.isFetching,s=n.items,u=a.items;return{isFetching:r,items:s,tagsArray:u}}Object.defineProperty(t,"__esModule",{value:!0});var s=(a(536),a(539)),u=n(s),i=a(299),l=n(i),o=a(303),f=n(o),d=a(304),c=n(d),p=a(308),m=n(p),h=a(331),v=n(h),_=a(30),g=n(_),y=a(195),E=a(504),k=a(671),I=n(k),M=a(267),N=function(e){function t(){return(0,f.default)(this,t),(0,m.default)(this,(t.__proto__||(0,l.default)(t)).apply(this,arguments))}return(0,v.default)(t,e),(0,c.default)(t,[{key:"componentWillMount",value:function(){}},{key:"componentDidMount",value:function(){var e=this.props.dispatch;e((0,E.fetchIssuesIfNeeded)("tags",this.props.params.id,""))}},{key:"componentWillReceiveProps",value:function(e){if(e.params.id!==this.props.params.id){var t=e.dispatch;t((0,E.fetchIssuesIfNeeded)("tags",e.params.id,""))}}},{key:"componentWillUnmount",value:function(){var e=this.props.dispatch;e((0,E.receiveIssues)(M.INIT_ISSUES,""))}},{key:"render",value:function(){if(this.props.isFetching)return g.default.createElement("div",{style:{textAlign:"center"}},g.default.createElement(u.default,{size:"large"}));var e=void 0,t=this.props.params.id,a=this.props.tagsArray;if(a.length>0)for(var n=0;n<a.length;n++)if(a[n].id==t){e=a[n].title;break}return g.default.createElement("div",{className:"list"},g.default.createElement(I.default,{title:e,items:this.props.items}))}}]),t}(_.Component);t.default=(0,y.connect)(r)(N)}});