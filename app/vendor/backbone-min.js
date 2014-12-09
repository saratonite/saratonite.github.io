(function(i,g){if(typeof define==="function"&&define.amd)define(["underscore","jquery","exports"],function(e,v,l){i.Backbone=g(i,l,e,v)});else if(typeof exports!=="undefined"){var e=require("underscore");g(i,exports,e)}else i.Backbone=g(i,{},i._,i.jQuery||i.Zepto||i.ender||i.$)})(this,function(i,g,e,s){var v=i.Backbone,l=[].slice;g.VERSION="1.1.2";g.$=s;g.noConflict=function(){i.Backbone=v;return this};g.emulateHTTP=!1;g.emulateJSON=!1;var j=g.Events={on:function(a,b,c){if(!o(this,"on",a,[b,c])||
!b)return this;this._events||(this._events={});(this._events[a]||(this._events[a]=[])).push({callback:b,context:c,ctx:c||this});return this},once:function(a,b,c){if(!o(this,"once",a,[b,c])||!b)return this;var d=this,f=e.once(function(){d.off(a,f);b.apply(this,arguments)});f._callback=b;return this.on(a,f,c)},off:function(a,b,c){var d,f,t,h,g,y,k,i;if(!this._events||!o(this,"off",a,[b,c]))return this;if(!a&&!b&&!c)return this._events=void 0,this;h=a?[a]:e.keys(this._events);g=0;for(y=h.length;g<y;g++)if(a=
h[g],t=this._events[a]){this._events[a]=d=[];if(b||c){k=0;for(i=t.length;k<i;k++)f=t[k],(b&&b!==f.callback&&b!==f.callback._callback||c&&c!==f.context)&&d.push(f)}d.length||delete this._events[a]}return this},trigger:function(a){if(!this._events)return this;var b=l.call(arguments,1);if(!o(this,"trigger",a,b))return this;var c=this._events[a],d=this._events.all;c&&z(c,b);d&&z(d,arguments);return this},stopListening:function(a,b,c){var d=this._listeningTo;if(!d)return this;var f=!b&&!c;!c&&typeof b===
"object"&&(c=this);a&&((d={})[a._listenId]=a);for(var t in d)a=d[t],a.off(b,c,this),(f||e.isEmpty(a._events))&&delete this._listeningTo[t];return this}},A=/\s+/,o=function(a,b,c,d){if(!c)return!0;if(typeof c==="object"){for(var f in c)a[b].apply(a,[f,c[f]].concat(d));return!1}if(A.test(c)){c=c.split(A);f=0;for(var e=c.length;f<e;f++)a[b].apply(a,[c[f]].concat(d));return!1}return!0},z=function(a,b){var c,d=-1,f=a.length,e=b[0],h=b[1],g=b[2];switch(b.length){case 0:for(;++d<f;)(c=a[d]).callback.call(c.ctx);
break;case 1:for(;++d<f;)(c=a[d]).callback.call(c.ctx,e);break;case 2:for(;++d<f;)(c=a[d]).callback.call(c.ctx,e,h);break;case 3:for(;++d<f;)(c=a[d]).callback.call(c.ctx,e,h,g);break;default:for(;++d<f;)(c=a[d]).callback.apply(c.ctx,b)}};e.each({listenTo:"on",listenToOnce:"once"},function(a,b){j[b]=function(b,d,f){var g=this._listeningTo||(this._listeningTo={}),h=b._listenId||(b._listenId=e.uniqueId("l"));g[h]=b;!f&&typeof d==="object"&&(f=this);b[a](d,f,this);return this}});j.bind=j.on;j.unbind=
j.off;e.extend(g,j);var u=g.Model=function(a,b){var c=a||{};b||(b={});this.cid=e.uniqueId("c");this.attributes={};if(b.collection)this.collection=b.collection;b.parse&&(c=this.parse(c,b)||{});c=e.defaults({},c,e.result(this,"defaults"));this.set(c,b);this.changed={};this.initialize.apply(this,arguments)};e.extend(u.prototype,j,{changed:null,validationError:null,idAttribute:"id",initialize:function(){},toJSON:function(){return e.clone(this.attributes)},sync:function(){return g.sync.apply(this,arguments)},
get:function(a){return this.attributes[a]},escape:function(a){return e.escape(this.get(a))},has:function(a){return this.get(a)!=null},set:function(a,b,c){var d,f,g,h,w,i,k;if(a==null)return this;typeof a==="object"?(f=a,c=b):(f={})[a]=b;c||(c={});if(!this._validate(f,c))return!1;g=c.unset;h=c.silent;a=[];w=this._changing;this._changing=!0;if(!w)this._previousAttributes=e.clone(this.attributes),this.changed={};k=this.attributes;i=this._previousAttributes;if(this.idAttribute in f)this.id=f[this.idAttribute];
for(d in f)b=f[d],e.isEqual(k[d],b)||a.push(d),e.isEqual(i[d],b)?delete this.changed[d]:this.changed[d]=b,g?delete k[d]:k[d]=b;if(!h){if(a.length)this._pending=c;b=0;for(d=a.length;b<d;b++)this.trigger("change:"+a[b],this,k[a[b]],c)}if(w)return this;if(!h)for(;this._pending;)c=this._pending,this._pending=!1,this.trigger("change",this,c);this._changing=this._pending=!1;return this},unset:function(a,b){return this.set(a,void 0,e.extend({},b,{unset:!0}))},clear:function(a){var b={},c;for(c in this.attributes)b[c]=
void 0;return this.set(b,e.extend({},a,{unset:!0}))},hasChanged:function(a){if(a==null)return!e.isEmpty(this.changed);return e.has(this.changed,a)},changedAttributes:function(a){if(!a)return this.hasChanged()?e.clone(this.changed):!1;var b,c=!1,d=this._changing?this._previousAttributes:this.attributes,f;for(f in a)if(!e.isEqual(d[f],b=a[f]))(c||(c={}))[f]=b;return c},previous:function(a){if(a==null||!this._previousAttributes)return null;return this._previousAttributes[a]},previousAttributes:function(){return e.clone(this._previousAttributes)},
fetch:function(a){a=a?e.clone(a):{};if(a.parse===void 0)a.parse=!0;var b=this,c=a.success;a.success=function(d){if(!b.set(b.parse(d,a),a))return!1;c&&c(b,d,a);b.trigger("sync",b,d,a)};n(this,a);return this.sync("read",this,a)},save:function(a,b,c){var d,f=this.attributes;a==null||typeof a==="object"?(d=a,c=b):(d={})[a]=b;c=e.extend({validate:!0},c);if(d&&!c.wait){if(!this.set(d,c))return!1}else if(!this._validate(d,c))return!1;if(d&&c.wait)this.attributes=e.extend({},f,d);if(c.parse===void 0)c.parse=
!0;var g=this,h=c.success;c.success=function(a){g.attributes=f;var b=g.parse(a,c);c.wait&&(b=e.extend(d||{},b));if(e.isObject(b)&&!g.set(b,c))return!1;h&&h(g,a,c);g.trigger("sync",g,a,c)};n(this,c);a=this.isNew()?"create":c.patch?"patch":"update";if(a==="patch")c.attrs=d;a=this.sync(a,this,c);if(d&&c.wait)this.attributes=f;return a},destroy:function(a){var a=a?e.clone(a):{},b=this,c=a.success,d=function(){b.trigger("destroy",b,b.collection,a)};a.success=function(e){(a.wait||b.isNew())&&d();c&&c(b,
e,a);b.isNew()||b.trigger("sync",b,e,a)};if(this.isNew())return a.success(),!1;n(this,a);var f=this.sync("delete",this,a);a.wait||d();return f},url:function(){var a=e.result(this,"urlRoot")||e.result(this.collection,"url")||B();if(this.isNew())return a;return a.replace(/([^\/])$/,"$1/")+encodeURIComponent(this.id)},parse:function(a){return a},clone:function(){return new this.constructor(this.attributes)},isNew:function(){return!this.has(this.idAttribute)},isValid:function(a){return this._validate({},
e.extend(a||{},{validate:!0}))},_validate:function(a,b){if(!b.validate||!this.validate)return!0;var a=e.extend({},this.attributes,a),c=this.validationError=this.validate(a,b)||null;if(!c)return!0;this.trigger("invalid",this,c,e.extend(b,{validationError:c}));return!1}});e.each(["keys","values","pairs","invert","pick","omit"],function(a){u.prototype[a]=function(){var b=l.call(arguments);b.unshift(this.attributes);return e[a].apply(e,b)}});var r=g.Collection=function(a,b){b||(b={});if(b.model)this.model=
b.model;if(b.comparator!==void 0)this.comparator=b.comparator;this._reset();this.initialize.apply(this,arguments);a&&this.reset(a,e.extend({silent:!0},b))},E={add:!0,remove:!0,merge:!0},F={add:!0,remove:!1};e.extend(r.prototype,j,{model:u,initialize:function(){},toJSON:function(a){return this.map(function(b){return b.toJSON(a)})},sync:function(){return g.sync.apply(this,arguments)},add:function(a,b){return this.set(a,e.extend({merge:!1},b,F))},remove:function(a,b){var c=!e.isArray(a),a=c?[a]:e.clone(a);
b||(b={});var d,f,g,h;d=0;for(f=a.length;d<f;d++)if(h=a[d]=this.get(a[d])){delete this._byId[h.id];delete this._byId[h.cid];g=this.indexOf(h);this.models.splice(g,1);this.length--;if(!b.silent)b.index=g,h.trigger("remove",h,this,b);this._removeReference(h,b)}return c?a[0]:a},set:function(a,b){b=e.defaults({},b,E);b.parse&&(a=this.parse(a,b));var c=!e.isArray(a),a=c?a?[a]:[]:e.clone(a),d,f,g,h,i,j,k=b.at,m=this.model,l=this.comparator&&k==null&&b.sort!==!1,s=e.isString(this.comparator)?this.comparator:
null,p=[],o=[],n={},r=b.add,v=b.merge,x=b.remove,q=!l&&r&&x?[]:!1;d=0;for(f=a.length;d<f;d++){i=a[d]||{};g=i instanceof u?h=i:i[m.prototype.idAttribute||"id"];if(g=this.get(g))x&&(n[g.cid]=!0),v&&(i=i===h?h.attributes:i,b.parse&&(i=g.parse(i,b)),g.set(i,b),l&&!j&&g.hasChanged(s)&&(j=!0)),a[d]=g;else if(r){h=a[d]=this._prepareModel(i,b);if(!h)continue;p.push(h);this._addReference(h,b)}h=g||h;q&&(h.isNew()||!n[h.id])&&q.push(h);n[h.id]=!0}if(x){d=0;for(f=this.length;d<f;++d)n[(h=this.models[d]).cid]||
o.push(h);o.length&&this.remove(o,b)}if(p.length||q&&q.length)if(l&&(j=!0),this.length+=p.length,k!=null){d=0;for(f=p.length;d<f;d++)this.models.splice(k+d,0,p[d])}else{if(q)this.models.length=0;i=q||p;d=0;for(f=i.length;d<f;d++)this.models.push(i[d])}j&&this.sort({silent:!0});if(!b.silent){d=0;for(f=p.length;d<f;d++)(h=p[d]).trigger("add",h,this,b);(j||q&&q.length)&&this.trigger("sort",this,b)}return c?a[0]:a},reset:function(a,b){b||(b={});for(var c=0,d=this.models.length;c<d;c++)this._removeReference(this.models[c],
b);b.previousModels=this.models;this._reset();a=this.add(a,e.extend({silent:!0},b));b.silent||this.trigger("reset",this,b);return a},push:function(a,b){return this.add(a,e.extend({at:this.length},b))},pop:function(a){var b=this.at(this.length-1);this.remove(b,a);return b},unshift:function(a,b){return this.add(a,e.extend({at:0},b))},shift:function(a){var b=this.at(0);this.remove(b,a);return b},slice:function(){return l.apply(this.models,arguments)},get:function(a){if(a!=null)return this._byId[a]||
this._byId[a.id]||this._byId[a.cid]},at:function(a){return this.models[a]},where:function(a,b){if(e.isEmpty(a))return b?void 0:[];return this[b?"find":"filter"](function(b){for(var d in a)if(a[d]!==b.get(d))return!1;return!0})},findWhere:function(a){return this.where(a,!0)},sort:function(a){if(!this.comparator)throw Error("Cannot sort a set without a comparator");a||(a={});e.isString(this.comparator)||this.comparator.length===1?this.models=this.sortBy(this.comparator,this):this.models.sort(e.bind(this.comparator,
this));a.silent||this.trigger("sort",this,a);return this},pluck:function(a){return e.invoke(this.models,"get",a)},fetch:function(a){a=a?e.clone(a):{};if(a.parse===void 0)a.parse=!0;var b=a.success,c=this;a.success=function(d){c[a.reset?"reset":"set"](d,a);b&&b(c,d,a);c.trigger("sync",c,d,a)};n(this,a);return this.sync("read",this,a)},create:function(a,b){b=b?e.clone(b):{};if(!(a=this._prepareModel(a,b)))return!1;b.wait||this.add(a,b);var c=this,d=b.success;b.success=function(a,e){b.wait&&c.add(a,
b);d&&d(a,e,b)};a.save(null,b);return a},parse:function(a){return a},clone:function(){return new this.constructor(this.models)},_reset:function(){this.length=0;this.models=[];this._byId={}},_prepareModel:function(a,b){if(a instanceof u)return a;b=b?e.clone(b):{};b.collection=this;var c=new this.model(a,b);if(!c.validationError)return c;this.trigger("invalid",this,c.validationError,b);return!1},_addReference:function(a){this._byId[a.cid]=a;a.id!=null&&(this._byId[a.id]=a);if(!a.collection)a.collection=
this;a.on("all",this._onModelEvent,this)},_removeReference:function(a){this===a.collection&&delete a.collection;a.off("all",this._onModelEvent,this)},_onModelEvent:function(a,b,c,d){(a==="add"||a==="remove")&&c!==this||(a==="destroy"&&this.remove(b,d),b&&a==="change:"+b.idAttribute&&(delete this._byId[b.previous(b.idAttribute)],b.id!=null&&(this._byId[b.id]=b)),this.trigger.apply(this,arguments))}});e.each(["forEach","each","map","collect","reduce","foldl","inject","reduceRight","foldr","find","detect",
"filter","select","reject","every","all","some","any","include","contains","invoke","max","min","toArray","size","first","head","take","initial","rest","tail","drop","last","without","difference","indexOf","shuffle","lastIndexOf","isEmpty","chain","sample"],function(a){r.prototype[a]=function(){var b=l.call(arguments);b.unshift(this.models);return e[a].apply(e,b)}});e.each(["groupBy","countBy","sortBy","indexBy"],function(a){r.prototype[a]=function(b,c){var d=e.isFunction(b)?b:function(a){return a.get(b)};
return e[a](this.models,d,c)}});var s=g.View=function(a){this.cid=e.uniqueId("view");a||(a={});e.extend(this,e.pick(a,G));this._ensureElement();this.initialize.apply(this,arguments);this.delegateEvents()},H=/^(\S+)\s*(.*)$/,G=["model","collection","el","id","attributes","className","tagName","events"];e.extend(s.prototype,j,{tagName:"div",$:function(a){return this.$el.find(a)},initialize:function(){},render:function(){return this},remove:function(){this.$el.remove();this.stopListening();return this},
setElement:function(a,b){this.$el&&this.undelegateEvents();this.$el=a instanceof g.$?a:g.$(a);this.el=this.$el[0];b!==!1&&this.delegateEvents();return this},delegateEvents:function(a){if(!a&&!(a=e.result(this,"events")))return this;this.undelegateEvents();for(var b in a){var c=a[b];e.isFunction(c)||(c=this[a[b]]);if(c){var d=b.match(H),f=d[1],d=d[2],c=e.bind(c,this);f+=".delegateEvents"+this.cid;if(d==="")this.$el.on(f,c);else this.$el.on(f,d,c)}}return this},undelegateEvents:function(){this.$el.off(".delegateEvents"+
this.cid);return this},_ensureElement:function(){if(this.el)this.setElement(e.result(this,"el"),!1);else{var a=e.extend({},e.result(this,"attributes"));if(this.id)a.id=e.result(this,"id");this.className&&(a["class"]=e.result(this,"className"));this.setElement(g.$("<"+e.result(this,"tagName")+">").attr(a),!1)}}});g.sync=function(a,b,c){var d=I[a];e.defaults(c||(c={}),{emulateHTTP:g.emulateHTTP,emulateJSON:g.emulateJSON});var f={type:d,dataType:"json"};if(!c.url)f.url=e.result(b,"url")||B();if(c.data==
null&&b&&(a==="create"||a==="update"||a==="patch"))f.contentType="application/json",f.data=JSON.stringify(c.attrs||b.toJSON(c));if(c.emulateJSON)f.contentType="application/x-www-form-urlencoded",f.data=f.data?{model:f.data}:{};if(c.emulateHTTP&&(d==="PUT"||d==="DELETE"||d==="PATCH")){f.type="POST";if(c.emulateJSON)f.data._method=d;var i=c.beforeSend;c.beforeSend=function(a){a.setRequestHeader("X-HTTP-Method-Override",d);if(i)return i.apply(this,arguments)}}if(f.type!=="GET"&&!c.emulateJSON)f.processData=
!1;if(f.type==="PATCH"&&J)f.xhr=function(){return new ActiveXObject("Microsoft.XMLHTTP")};a=c.xhr=g.ajax(e.extend(f,c));b.trigger("request",b,a,c);return a};var J=typeof window!=="undefined"&&!!window.ActiveXObject&&!(window.XMLHttpRequest&&(new XMLHttpRequest).dispatchEvent),I={create:"POST",update:"PUT",patch:"PATCH","delete":"DELETE",read:"GET"};g.ajax=function(){return g.$.ajax.apply(g.$,arguments)};var C=g.Router=function(a){a||(a={});if(a.routes)this.routes=a.routes;this._bindRoutes();this.initialize.apply(this,
arguments)},K=/\((.*?)\)/g,L=/(\(\?)?:\w+/g,M=/\*\w+/g,N=/[\-{}\[\]+?.,\\\^$|#\s]/g;e.extend(C.prototype,j,{initialize:function(){},route:function(a,b,c){e.isRegExp(a)||(a=this._routeToRegExp(a));e.isFunction(b)&&(c=b,b="");c||(c=this[b]);var d=this;g.history.route(a,function(e){e=d._extractParameters(a,e);d.execute(c,e);d.trigger.apply(d,["route:"+b].concat(e));d.trigger("route",b,e);g.history.trigger("route",d,b,e)});return this},execute:function(a,b){a&&a.apply(this,b)},navigate:function(a,b){g.history.navigate(a,
b);return this},_bindRoutes:function(){if(this.routes){this.routes=e.result(this,"routes");for(var a,b=e.keys(this.routes);(a=b.pop())!=null;)this.route(a,this.routes[a])}},_routeToRegExp:function(a){a=a.replace(N,"\\$&").replace(K,"(?:$1)?").replace(L,function(a,c){return c?a:"([^/?]+)"}).replace(M,"([^?]*?)");return RegExp("^"+a+"(?:\\?([\\s\\S]*))?$")},_extractParameters:function(a,b){var c=a.exec(b).slice(1);return e.map(c,function(a,b){if(b===c.length-1)return a||null;return a?decodeURIComponent(a):
null})}});var m=g.History=function(){this.handlers=[];e.bindAll(this,"checkUrl");if(typeof window!=="undefined")this.location=window.location,this.history=window.history},D=/^[#\/]|\s+$/g,O=/^\/+|\/+$/g,P=/msie [\w.]+/,Q=/\/$/,R=/#.*$/;m.started=!1;e.extend(m.prototype,j,{interval:50,atRoot:function(){return this.location.pathname.replace(/[^\/]$/,"$&/")===this.root},getHash:function(a){return(a=(a||this).location.href.match(/#(.*)$/))?a[1]:""},getFragment:function(a,b){if(a==null)if(this._hasPushState||
!this._wantsHashChange||b){var a=decodeURI(this.location.pathname+this.location.search),c=this.root.replace(Q,"");a.indexOf(c)||(a=a.slice(c.length))}else a=this.getHash();return a.replace(D,"")},start:function(a){if(m.started)throw Error("Backbone.history has already been started");m.started=!0;this.options=e.extend({root:"/"},this.options,a);this.root=this.options.root;this._wantsHashChange=this.options.hashChange!==!1;this._wantsPushState=!!this.options.pushState;this._hasPushState=!(!this.options.pushState||
!this.history||!this.history.pushState);var a=this.getFragment(),b=document.documentMode,b=P.exec(navigator.userAgent.toLowerCase())&&(!b||b<=7);this.root=("/"+this.root+"/").replace(O,"/");if(b&&this._wantsHashChange)this.iframe=g.$('<iframe src="javascript:0" tabindex="-1">').hide().appendTo("body")[0].contentWindow,this.navigate(a);if(this._hasPushState)g.$(window).on("popstate",this.checkUrl);else if(this._wantsHashChange&&"onhashchange"in window&&!b)g.$(window).on("hashchange",this.checkUrl);
else if(this._wantsHashChange)this._checkUrlInterval=setInterval(this.checkUrl,this.interval);this.fragment=a;a=this.location;if(this._wantsHashChange&&this._wantsPushState)if(!this._hasPushState&&!this.atRoot())return this.fragment=this.getFragment(null,!0),this.location.replace(this.root+"#"+this.fragment),!0;else if(this._hasPushState&&this.atRoot()&&a.hash)this.fragment=this.getHash().replace(D,""),this.history.replaceState({},document.title,this.root+this.fragment);if(!this.options.silent)return this.loadUrl()},
stop:function(){g.$(window).off("popstate",this.checkUrl).off("hashchange",this.checkUrl);this._checkUrlInterval&&clearInterval(this._checkUrlInterval);m.started=!1},route:function(a,b){this.handlers.unshift({route:a,callback:b})},checkUrl:function(){var a=this.getFragment();a===this.fragment&&this.iframe&&(a=this.getFragment(this.getHash(this.iframe)));if(a===this.fragment)return!1;this.iframe&&this.navigate(a);this.loadUrl()},loadUrl:function(a){a=this.fragment=this.getFragment(a);return e.any(this.handlers,
function(b){if(b.route.test(a))return b.callback(a),!0})},navigate:function(a,b){if(!m.started)return!1;if(!b||b===!0)b={trigger:!!b};var c=this.root+(a=this.getFragment(a||"")),a=a.replace(R,"");if(this.fragment!==a){this.fragment=a;a===""&&c!=="/"&&(c=c.slice(0,-1));if(this._hasPushState)this.history[b.replace?"replaceState":"pushState"]({},document.title,c);else if(this._wantsHashChange)this._updateHash(this.location,a,b.replace),this.iframe&&a!==this.getFragment(this.getHash(this.iframe))&&(b.replace||
this.iframe.document.open().close(),this._updateHash(this.iframe.location,a,b.replace));else return this.location.assign(c);if(b.trigger)return this.loadUrl(a)}},_updateHash:function(a,b,c){c?(c=a.href.replace(/(javascript:|#).*$/,""),a.replace(c+"#"+b)):a.hash="#"+b}});g.history=new m;u.extend=r.extend=C.extend=s.extend=m.extend=function(a,b){var c=this,d;d=a&&e.has(a,"constructor")?a.constructor:function(){return c.apply(this,arguments)};e.extend(d,c,b);var f=function(){this.constructor=d};f.prototype=
c.prototype;d.prototype=new f;a&&e.extend(d.prototype,a);d.__super__=c.prototype;return d};var B=function(){throw Error('A "url" property or function must be specified');},n=function(a,b){var c=b.error;b.error=function(d){c&&c(a,d,b);a.trigger("error",a,d,b)}};return g});