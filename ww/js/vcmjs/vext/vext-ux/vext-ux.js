vExt.namespace("vExt.ux.menu");
vExt.ux.menu.EditableItem=vExt.extend(vExt.menu.BaseItem,{itemCls:"x-menu-item",hideOnClick:false,initComponent:function(){
this.addEvents({keyup:true});
this.editor=this.editor||new vExt.form.TextField();
if(this.text){
this.editor.setValue(this.text);
}
},onRender:function(_1){
var s=_1.createChild({cls:this.itemCls,html:"<img src=\""+(this.icon||vExt.BLANK_IMAGE_URL)+"\" class=\"x-menu-item-icon"+(this.iconCls?" "+this.iconCls:"")+"\" style=\"margin: 3px 7px 2px 2px;\" />"});
vExt.apply(this.config,{width:125});
this.editor.render(s);
this.el=s;
this.relayEvents(this.editor.el,["keyup"]);
this.el.swallowEvent(["keydown","keypress"]);
vExt.each(["keydown","keypress"],function(_3){
this.el.on(_3,function(e){
if(e.isNavKeyPress()){
e.stopPropagation();
}
},this);
},this);
if(vExt.isGecko){
s.setOverflow("auto");
var _5=_1.getSize();
this.editor.getEl().setStyle("position","fixed");
_1.setSize(_5);
}
vExt.ux.menu.EditableItem.superclass.onRender.apply(this,arguments);
},getValue:function(){
return this.editor.getValue();
},setValue:function(_6){
this.editor.setValue(_6);
},isValid:function(_7){
return this.editor.isValid(_7);
}});
vExt.namespace("vExt.ux.menu");
vExt.ux.menu.ListMenu=function(_8){
this.addEvents("checkchanged");
vExt.ux.menu.ListMenu.superclass.constructor.call(this,_8=_8||{});
if(!_8.store&&_8.options){
var _9=[];
for(var i=0,_b=_8.options.length;i<_b;i++){
var _c=_8.options[i];
switch(vExt.type(_c)){
case "array":
_9.push(_c);
break;
case "object":
_9.push([_c.id,_c[this.labelField]]);
break;
case "string":
_9.push([_c,_c]);
break;
}
}
this.store=new vExt.data.Store({reader:new vExt.data.ArrayReader({id:0},["id",this.labelField]),data:_9,listeners:{"load":this.onLoad,scope:this}});
this.loaded=true;
}else{
this.add({text:this.loadingText,iconCls:"loading-indicator"});
this.store.on("load",this.onLoad,this);
}
};
vExt.extend(vExt.ux.menu.ListMenu,vExt.menu.Menu,{labelField:"text",loadingText:"Loading...",loadOnShow:true,single:false,selected:[],show:function(){
var _d=null;
return function(){
if(arguments.length==0){
vExt.ux.menu.ListMenu.superclass.show.apply(this,_d);
}else{
_d=arguments;
if(this.loadOnShow&&!this.loaded){
this.store.load();
}
vExt.ux.menu.ListMenu.superclass.show.apply(this,arguments);
}
};
}(),onLoad:function(_e,_f){
var _10=this.isVisible();
this.hide(false);
this.removeAll();
var gid=this.single?vExt.id():null;
for(var i=0,len=_f.length;i<len;i++){
var _14=new vExt.menu.CheckItem({text:_f[i].get(this.labelField),group:gid,checked:this.selected.indexOf(_f[i].id)>-1,hideOnClick:false});
_14.itemId=_f[i].id;
_14.on("checkchange",this.checkChange,this);
this.add(_14);
}
this.loaded=true;
if(_10){
this.show();
}
this.fireEvent("load",this,_f);
},setSelected:function(_15){
var _15=this.selected=[].concat(_15);
if(this.loaded){
this.items.each(function(_16){
_16.setChecked(false,true);
for(var i=0,len=_15.length;i<len;i++){
if(_16.itemId==_15[i]){
_16.setChecked(true,true);
}
}
},this);
}
},checkChange:function(_19,_1a){
var _1b=[];
this.items.each(function(_1c){
if(_1c.checked){
_1b.push(_1c.itemId);
}
},this);
this.selected=_1b;
this.fireEvent("checkchange",_19,_1a);
},getSelected:function(){
return this.selected;
}});
vExt.namespace("vExt.ux.menu");
vExt.ux.menu.RangeMenu=function(){
vExt.ux.menu.RangeMenu.superclass.constructor.apply(this,arguments);
this.updateTask=new vExt.util.DelayedTask(this.fireUpdate,this);
var cfg=this.fieldCfg;
var cls=this.fieldCls;
var _1f=this.fields=vExt.applyIf(this.fields||{},{"gt":new vExt.ux.menu.EditableItem({iconCls:this.icons.gt,editor:new cls(typeof cfg=="object"?cfg.gt||"":cfg)}),"lt":new vExt.ux.menu.EditableItem({iconCls:this.icons.lt,editor:new cls(typeof cfg=="object"?cfg.lt||"":cfg)}),"eq":new vExt.ux.menu.EditableItem({iconCls:this.icons.eq,editor:new cls(typeof cfg=="object"?cfg.gt||"":cfg)})});
this.add(_1f.gt,_1f.lt,"-",_1f.eq);
for(var key in _1f){
_1f[key].on("keyup",function(_21,_22,_23,_24){
if(_21.getKey()==_21.ENTER&&_24.isValid()){
this.hide(true);
return;
}
if(_24==_1f.eq){
_1f.gt.setValue(null);
_1f.lt.setValue(null);
}else{
_1f.eq.setValue(null);
}
this.updateTask.delay(this.updateBuffer);
}.createDelegate(this,[_1f[key]],true));
}
this.addEvents({"update":true});
};
vExt.extend(vExt.ux.menu.RangeMenu,vExt.menu.Menu,{fieldCls:vExt.form.NumberField,fieldCfg:"",updateBuffer:500,icons:{gt:"ux-rangemenu-gt",lt:"ux-rangemenu-lt",eq:"ux-rangemenu-eq"},fireUpdate:function(){
this.fireEvent("update",this);
},setValue:function(_25){
for(var key in this.fields){
this.fields[key].setValue(_25[key]!==undefined?_25[key]:"");
}
this.fireEvent("update",this);
},getValue:function(){
var _27={};
for(var key in this.fields){
var _29=this.fields[key];
if(_29.isValid()&&String(_29.getValue()).length>0){
_27[key]=_29.getValue();
}
}
return _27;
}});
vExt.namespace("vExt.ux.menu");
vExt.ux.menu.TreeMenu=function(cfg){
vExt.ux.menu.TreeMenu.superclass.constructor.call(this,{plain:false,items:[new vExt.ux.menu.TreeMenuItem(cfg)],cls:"ux-tree-menu"});
this.relayEvents(this.items.get(0),["select","search"]);
this.tree=cfg.tree;
};
vExt.extend(vExt.ux.menu.TreeMenu,vExt.menu.Menu);
vExt.ux.menu.TreeMenuItem=function(cfg){
this.addEvents({select:true,search:true});
vExt.ux.menu.TreeMenu.superclass.constructor.call(this,cfg);
this.qTask=new vExt.util.DelayedTask(this.doQuery,this);
this.searchBox=new vExt.form.TextField({cls:"ux-tree-menu-search",emptyText:this.emptyText});
this.tree.getSelectionModel().on("selectionchange",this.onSelect,this);
};
vExt.extend(vExt.ux.menu.TreeMenuItem,vExt.menu.BaseItem,{minHeight:240,minWidth:200,hideOnClick:false,searchDelay:500,tree:undefined,searchFn:undefined,emptyText:"Search...",handelOffset:3,onRender:function(_2c){
var el=this.el=_2c.createChild({cls:"ux-tree-menu-wrap",children:[{cls:"ux-tree-menu-search-icon"}]});
if(this.searchFn){
this.searchBox.render(el);
this.searchBox.getEl().setStyle("margin-bottom","3px");
this.searchBox.el.on("keyup",function(){
this.qTask.delay(this.searchDelay);
},this);
}
this.tree.autoScroll=true;
this.tree.render(el);
var _2e=new vExt.Resizable(el,{pinned:true,handles:"se",listeners:{"resize":function(rsz,w,h){
this.resize(w,h);
this.parentMenu.autoWidth();
this.parentMenu.el.show();
},scope:this}});
this.resize(this.minWidth,this.minHeight);
if(this.searchFn){
this.doQuery();
}
},onSelect:function(_32,_33){
this.fireEvent("select",_33.id,_33);
},doQuery:function(_34){
var _35=this.searchBox.getValue();
this.searchFn(_35.length>0?_35:null,_34);
this.fireEvent("search",_35);
},resize:function(w,h){
var _38=this.searchBox.getEl();
padding=this.el.getFrameWidth("tb"),searchOff=0;
if(_38){
_38.setWidth(w-this.el.getFrameWidth("lr"));
searchOff=_38.getHeight();
}
this.tree.setWidth(w);
this.tree.setHeight(h-searchOff-padding-this.handelOffset);
}});
vExt.namespace("vExt.ux.grid");
vExt.ux.grid.GridFilters=function(_39){
this.filters=new vExt.util.MixedCollection();
this.filters.getKey=function(o){
return o?o.dataIndex:null;
};
for(var i=0,len=_39.filters.length;i<len;i++){
this.addFilter(_39.filters[i]);
}
this.deferredUpdate=new vExt.util.DelayedTask(this.reload,this);
delete _39.filters;
vExt.apply(this,_39);
};
vExt.extend(vExt.ux.grid.GridFilters,vExt.util.Observable,{updateBuffer:500,paramPrefix:"filter",filterCls:"ux-filtered-column",local:false,autoReload:true,stateId:undefined,showMenu:true,menuFilterText:"Filters",init:function(_3d){
if(_3d instanceof vExt.grid.GridPanel){
this.grid=_3d;
this.store=this.grid.getStore();
if(this.local){
this.store.on("load",function(_3e){
_3e.filterBy(this.getRecordFilter());
},this);
}else{
this.store.on("beforeload",this.onBeforeLoad,this);
}
this.grid.filters=this;
this.grid.addEvents({"filterupdate":true});
_3d.on("render",this.onRender,this);
_3d.on("beforestaterestore",this.applyState,this);
_3d.on("beforestatesave",this.saveState,this);
}else{
if(_3d instanceof vExt.PagingToolbar){
this.toolbar=_3d;
}
}
},applyState:function(_3f,_40){
this.suspendStateStore=true;
this.clearFilters();
if(_40.filters){
for(var key in _40.filters){
var _42=this.filters.get(key);
if(_42){
_42.setValue(_40.filters[key]);
_42.setActive(true);
}
}
}
this.deferredUpdate.cancel();
if(this.local){
this.reload();
}
this.suspendStateStore=false;
},saveState:function(_43,_44){
var _45={};
this.filters.each(function(_46){
if(_46.active){
_45[_46.dataIndex]=_46.getValue();
}
});
return _44.filters=_45;
},onRender:function(){
var _47;
if(this.showMenu){
_47=this.grid.getView().hmenu;
this.sep=_47.addSeparator();
this.menu=_47.add(new vExt.menu.CheckItem({itemId:this.menuFilterText,text:this.menuFilterText,menu:new vExt.menu.Menu()}));
this.menu.on("checkchange",this.onCheckChange,this);
this.menu.on("beforecheckchange",this.onBeforeCheck,this);
_47.on("beforeshow",this.onMenu,this);
}
this.grid.getView().on("refresh",this.onRefresh,this);
this.updateColumnHeadings(this.grid.getView());
},onMenu:function(_48){
var _49=this.getMenuFilter();
if(_49){
this.menu.menu=_49.menu;
this.menu.setChecked(_49.active,false);
}
this.menu.setVisible(_49!==undefined);
this.sep.setVisible(_49!==undefined);
},onCheckChange:function(_4a,_4b){
this.getMenuFilter().setActive(_4b);
},onBeforeCheck:function(_4c,_4d){
return !_4d||this.getMenuFilter().isActivatable();
},onStateChange:function(_4e,_4f){
if(_4e=="serialize"){
return;
}
if(_4f==this.getMenuFilter()){
this.menu.setChecked(_4f.active,false);
}
if(this.autoReload||this.local){
this.deferredUpdate.delay(this.updateBuffer);
}
var _50=this.grid.getView();
this.updateColumnHeadings(_50);
this.grid.saveState();
this.grid.fireEvent("filterupdate",this,_4f);
},onBeforeLoad:function(_51,_52){
_52.params=_52.params||{};
this.cleanParams(_52.params);
var _53=this.buildQuery(this.getFilterData());
vExt.apply(_52.params,_53);
},onRefresh:function(_54){
this.updateColumnHeadings(_54);
},getMenuFilter:function(){
var _55=this.grid.getView();
if(!_55||_55.hdCtxIndex===undefined){
return null;
}
return this.filters.get(_55.cm.config[_55.hdCtxIndex].dataIndex);
},updateColumnHeadings:function(_56){
if(!_56||!_56.mainHd){
return;
}
var hds=_56.mainHd.select("td").removeClass(this.filterCls);
for(var i=0,len=_56.cm.config.length;i<len;i++){
var _5a=this.getFilter(_56.cm.config[i].dataIndex);
if(_5a&&_5a.active){
hds.item(i).addClass(this.filterCls);
}
}
},reload:function(){
if(this.local){
this.grid.store.clearFilter(true);
this.grid.store.filterBy(this.getRecordFilter());
}else{
this.deferredUpdate.cancel();
var _5b=this.grid.store;
if(this.toolbar){
var _5c=this.toolbar.paramNames.start;
if(_5b.lastOptions&&_5b.lastOptions.params&&_5b.lastOptions.params[_5c]){
_5b.lastOptions.params[_5c]=0;
}
}
_5b.reload();
}
},getRecordFilter:function(){
var f=[];
this.filters.each(function(_5e){
if(_5e.active){
f.push(_5e);
}
});
var len=f.length;
return function(_60){
for(var i=0;i<len;i++){
if(!f[i].validateRecord(_60)){
return false;
}
}
return true;
};
},addFilter:function(_62){
var _63=_62.menu?_62:new (this.getFilterClass(_62.type))(_62);
this.filters.add(_63);
vExt.util.Observable.capture(_63,this.onStateChange,this);
return _63;
},getFilter:function(_64){
return this.filters.get(_64);
},clearFilters:function(){
this.filters.each(function(_65){
_65.setActive(false);
});
},getFilterData:function(){
var _66=[],_67=this.grid.getStore().fields;
this.filters.each(function(f){
if(f.active){
var d=[].concat(f.serialize());
for(var i=0,len=d.length;i<len;i++){
_66.push({field:f.dataIndex,data:d[i]});
}
}
});
return _66;
},buildQuery:function(_6c){
var p={};
for(var i=0,len=_6c.length;i<len;i++){
var f=_6c[i];
var _71=[this.paramPrefix,"[",i,"]"].join("");
p[_71+"[field]"]=f.field;
var _72=_71+"[data]";
for(var key in f.data){
p[[_72,"[",key,"]"].join("")]=f.data[key];
}
}
return p;
},cleanParams:function(p){
var _75=new RegExp("^"+this.paramPrefix+"[[0-9]+]");
for(var key in p){
if(_75.test(key)){
delete p[key];
}
}
},getFilterClass:function(_77){
return vExt.ux.grid.filter[_77.substr(0,1).toUpperCase()+_77.substr(1)+"Filter"];
}});
vExt.namespace("vExt.ux.grid.filter");
vExt.ux.grid.filter.Filter=function(_78){
vExt.apply(this,_78);
this.events={"activate":true,"deactivate":true,"update":true,"serialize":true};
vExt.ux.grid.filter.Filter.superclass.constructor.call(this);
this.menu=new vExt.menu.Menu();
this.init(_78);
if(_78&&_78.value){
this.setValue(_78.value);
this.setActive(_78.active!==false,true);
delete _78.value;
}
};
vExt.extend(vExt.ux.grid.filter.Filter,vExt.util.Observable,{active:false,dataIndex:null,menu:null,updateBuffer:500,init:vExt.emptyFn,fireUpdate:function(){
if(this.active){
this.fireEvent("update",this);
}
this.setActive(this.isActivatable());
},isActivatable:function(){
return true;
},setActive:function(_79,_7a){
if(this.active!=_79){
this.active=_79;
if(_7a!==true){
this.fireEvent(_79?"activate":"deactivate",this);
}
}
},getValue:vExt.emptyFn,setValue:vExt.emptyFn,serialize:vExt.emptyFn,validateRecord:function(){
return true;
}});
vExt.ux.grid.filter.BooleanFilter=vExt.extend(vExt.ux.grid.filter.Filter,{defaultValue:false,yesText:"Yes",noText:"No",init:function(){
var gId=vExt.id();
this.options=[new vExt.menu.CheckItem({text:this.yesText,group:gId,checked:this.defaultValue===true}),new vExt.menu.CheckItem({text:this.noText,group:gId,checked:this.defaultValue===false})];
this.menu.add(this.options[0],this.options[1]);
for(var i=0;i<this.options.length;i++){
this.options[i].on("click",this.fireUpdate,this);
this.options[i].on("checkchange",this.fireUpdate,this);
}
},isActivatable:function(){
return true;
},fireUpdate:function(){
this.fireEvent("update",this);
this.setActive(true);
},setValue:function(_7d){
this.options[_7d?0:1].setChecked(true);
},getValue:function(){
return this.options[0].checked;
},serialize:function(){
var _7e={type:"boolean",value:this.getValue()};
this.fireEvent("serialize",_7e,this);
return _7e;
},validateRecord:function(_7f){
return _7f.get(this.dataIndex)==this.getValue();
}});
vExt.ux.grid.filter.DateFilter=vExt.extend(vExt.ux.grid.filter.Filter,{dateFormat:"m/d/Y",pickerOpts:{},beforeText:"Before",afterText:"After",onText:"On",init:function(){
var _80=vExt.apply(this.pickerOpts,{minDate:this.minDate,maxDate:this.maxDate,format:this.dateFormat});
var _81=this.dates={"before":new vExt.menu.CheckItem({text:this.beforeText,menu:new vExt.menu.DateMenu(_80)}),"after":new vExt.menu.CheckItem({text:this.afterText,menu:new vExt.menu.DateMenu(_80)}),"on":new vExt.menu.CheckItem({text:this.onText,menu:new vExt.menu.DateMenu(_80)})};
this.menu.add(_81.before,_81.after,"-",_81.on);
for(var key in _81){
var _83=_81[key];
_83.menu.on("select",function(_84,_85,_86,_87){
_84.setChecked(true);
if(_84==_81.on){
_81.before.setChecked(false,true);
_81.after.setChecked(false,true);
}else{
_81.on.setChecked(false,true);
if(_84==_81.after&&_81.before.menu.picker.value<_86){
_81.before.setChecked(false,true);
}else{
if(_84==_81.before&&_81.after.menu.picker.value>_86){
_81.after.setChecked(false,true);
}
}
}
this.fireEvent("update",this);
}.createDelegate(this,[_83],0));
_83.on("checkchange",function(){
this.setActive(this.isActivatable());
},this);
}
},getFieldValue:function(_88){
return this.dates[_88].menu.picker.getValue();
},getPicker:function(_89){
return this.dates[_89].menu.picker;
},isActivatable:function(){
return this.dates.on.checked||this.dates.after.checked||this.dates.before.checked;
},setValue:function(_8a){
for(var key in this.dates){
if(_8a[key]){
this.dates[key].menu.picker.setValue(_8a[key]);
this.dates[key].setChecked(true);
}else{
this.dates[key].setChecked(false);
}
}
},getValue:function(){
var _8c={};
for(var key in this.dates){
if(this.dates[key].checked){
_8c[key]=this.dates[key].menu.picker.getValue();
}
}
return _8c;
},serialize:function(){
var _8e=[];
if(this.dates.before.checked){
_8e=[{type:"date",comparison:"lt",value:this.getFieldValue("before").format(this.dateFormat)}];
}
if(this.dates.after.checked){
_8e.push({type:"date",comparison:"gt",value:this.getFieldValue("after").format(this.dateFormat)});
}
if(this.dates.on.checked){
_8e={type:"date",comparison:"eq",value:this.getFieldValue("on").format(this.dateFormat)};
}
this.fireEvent("serialize",_8e,this);
return _8e;
},validateRecord:function(_8f){
var val=_8f.get(this.dataIndex).clearTime(true).getTime();
if(this.dates.on.checked&&val!=this.getFieldValue("on").clearTime(true).getTime()){
return false;
}
if(this.dates.before.checked&&val>=this.getFieldValue("before").clearTime(true).getTime()){
return false;
}
if(this.dates.after.checked&&val<=this.getFieldValue("after").clearTime(true).getTime()){
return false;
}
return true;
}});
vExt.ux.grid.filter.ListFilter=vExt.extend(vExt.ux.grid.filter.Filter,{phpMode:false,init:function(_91){
this.dt=new vExt.util.DelayedTask(this.fireUpdate,this);
this.menu=new vExt.ux.menu.ListMenu(_91);
this.menu.on("checkchange",this.onCheckChange,this);
},onCheckChange:function(){
this.dt.delay(this.updateBuffer);
},isActivatable:function(){
return this.menu.getSelected().length>0;
},setValue:function(_92){
this.menu.setSelected(_92);
this.fireEvent("update",this);
},getValue:function(){
return this.menu.getSelected();
},serialize:function(){
var _93={type:"list",value:this.phpMode?this.getValue().join(","):this.getValue()};
this.fireEvent("serialize",_93,this);
return _93;
},validateRecord:function(_94){
return this.getValue().indexOf(_94.get(this.dataIndex))>-1;
}});
vExt.ux.grid.filter.NumericFilter=vExt.extend(vExt.ux.grid.filter.Filter,{init:function(){
this.menu=new vExt.ux.menu.RangeMenu({updateBuffer:this.updateBuffer});
this.menu.on("update",this.fireUpdate,this);
},fireUpdate:function(){
this.setActive(this.isActivatable());
this.fireEvent("update",this);
},isActivatable:function(){
var _95=this.menu.getValue();
return _95.eq!==undefined||_95.gt!==undefined||_95.lt!==undefined;
},setValue:function(_96){
this.menu.setValue(_96);
},getValue:function(){
return this.menu.getValue();
},serialize:function(){
var _97=[];
var _98=this.menu.getValue();
for(var key in _98){
_97.push({type:"numeric",comparison:key,value:_98[key]});
}
this.fireEvent("serialize",_97,this);
return _97;
},validateRecord:function(_9a){
var val=_9a.get(this.dataIndex),_9c=this.menu.getValue();
if(_9c.eq!=undefined&&val!=_9c.eq){
return false;
}
if(_9c.lt!=undefined&&val>=_9c.lt){
return false;
}
if(_9c.gt!=undefined&&val<=_9c.gt){
return false;
}
return true;
}});
vExt.ux.grid.filter.StringFilter=vExt.extend(vExt.ux.grid.filter.Filter,{icon:"ux-gridfilter-text-icon",init:function(){
var _9d=this.value=new vExt.ux.menu.EditableItem({iconCls:this.icon});
_9d.on("keyup",this.onKeyUp,this);
this.menu.add(_9d);
this.updateTask=new vExt.util.DelayedTask(this.fireUpdate,this);
},onKeyUp:function(_9e){
if(_9e.getKey()==_9e.ENTER){
this.menu.hide(true);
return;
}
this.updateTask.delay(this.updateBuffer);
},isActivatable:function(){
return this.value.getValue().length>0;
},fireUpdate:function(){
if(this.active){
this.fireEvent("update",this);
}
this.setActive(this.isActivatable());
},setValue:function(_9f){
this.value.setValue(_9f);
this.fireEvent("update",this);
},getValue:function(){
return this.value.getValue();
},serialize:function(){
var _a0={type:"string",value:this.getValue()};
this.fireEvent("serialize",_a0,this);
return _a0;
},validateRecord:function(_a1){
var val=_a1.get(this.dataIndex);
if(typeof val!="string"){
return this.getValue().length==0;
}
return val.toLowerCase().indexOf(this.getValue().toLowerCase())>-1;
}});
vExt.ux.Multiselect=vExt.extend(vExt.form.Field,{appendOnly:false,dataFields:[],data:[],width:100,height:100,displayField:0,valueField:1,allowBlank:true,minLength:0,maxLength:Number.MAX_VALUE,blankText:vExt.form.TextField.prototype.blankText,minLengthText:"Minimum {0} item(s) required",maxLengthText:"Maximum {0} item(s) allowed",delimiter:",",copy:false,allowDup:false,allowTrash:false,focusClass:undefined,sortDir:"ASC",defaultAutoCreate:{tag:"div"},initComponent:function(){
vExt.ux.Multiselect.superclass.initComponent.call(this);
this.addEvents({"dblclick":true,"click":true,"change":true,"drop":true});
},onRender:function(ct,_a4){
vExt.ux.Multiselect.superclass.onRender.call(this,ct,_a4);
var cls="ux-mselect";
var fs=new vExt.form.FieldSet({renderTo:this.el,title:this.legend,height:this.height,width:this.width,style:"padding:0;",tbar:this.tbar});
fs.body.addClass(cls);
var tpl="<tpl for=\".\"><div class=\""+cls+"-item";
if(vExt.isIE||vExt.isIE7){
tpl+="\" unselectable=on";
}else{
tpl+=" x-unselectable\"";
}
tpl+=">{"+this.displayField+"}</div></tpl>";
if(!this.store){
this.store=new vExt.data.SimpleStore({fields:this.dataFields,data:this.data});
}
this.view=new vExt.ux.DDView({multiSelect:true,store:this.store,selectedClass:cls+"-selected",tpl:tpl,allowDup:this.allowDup,copy:this.copy,allowTrash:this.allowTrash,dragGroup:this.dragGroup,dropGroup:this.dropGroup,itemSelector:"."+cls+"-item",isFormField:false,applyTo:fs.body,appendOnly:this.appendOnly,sortField:this.sortField,sortDir:this.sortDir});
fs.add(this.view);
this.view.on("click",this.onViewClick,this);
this.view.on("beforeClick",this.onViewBeforeClick,this);
this.view.on("dblclick",this.onViewDblClick,this);
this.view.on("drop",function(_a8,n,dd,e,_ac){
return this.fireEvent("drop",_a8,n,dd,e,_ac);
},this);
this.hiddenName=this.name;
var _ad={tag:"input",type:"hidden",value:"",name:this.name};
if(this.isFormField){
this.hiddenField=this.el.createChild(_ad);
}else{
this.hiddenField=vExt.get(document.body).createChild(_ad);
}
fs.doLayout();
},initValue:vExt.emptyFn,onViewClick:function(vw,_af,_b0,e){
var _b2=this.preClickSelections.indexOf(_af);
if(_b2!=-1){
this.preClickSelections.splice(_b2,1);
this.view.clearSelections(true);
this.view.select(this.preClickSelections);
}
this.fireEvent("change",this,this.getValue(),this.hiddenField.dom.value);
this.hiddenField.dom.value=this.getValue();
this.fireEvent("click",this,e);
this.validate();
},onViewBeforeClick:function(vw,_b4,_b5,e){
this.preClickSelections=this.view.getSelectedIndexes();
if(this.disabled){
return false;
}
},onViewDblClick:function(vw,_b8,_b9,e){
return this.fireEvent("dblclick",vw,_b8,_b9,e);
},getValue:function(_bb){
var _bc=[];
var _bd=this.view.getSelectedIndexes();
if(_bd.length==0){
return "";
}
for(var i=0;i<_bd.length;i++){
_bc.push(this.store.getAt(_bd[i]).get(((_bb!=null)?_bb:this.valueField)));
}
return _bc.join(this.delimiter);
},setValue:function(_bf){
var _c0;
var _c1=[];
this.view.clearSelections();
this.hiddenField.dom.value="";
if(!_bf||(_bf=="")){
return;
}
if(!(_bf instanceof Array)){
_bf=_bf.split(this.delimiter);
}
for(var i=0;i<_bf.length;i++){
_c0=this.view.store.indexOf(this.view.store.query(this.valueField,new RegExp("^"+_bf[i]+"$","i")).itemAt(0));
_c1.push(_c0);
}
this.view.select(_c1);
this.hiddenField.dom.value=this.getValue();
this.validate();
},reset:function(){
this.setValue("");
},getRawValue:function(_c3){
var tmp=this.getValue(_c3);
if(tmp.length){
tmp=tmp.split(this.delimiter);
}else{
tmp=[];
}
return tmp;
},setRawValue:function(_c5){
setValue(_c5);
},validateValue:function(_c6){
if(_c6.length<1){
if(this.allowBlank){
this.clearInvalid();
return true;
}else{
this.markInvalid(this.blankText);
return false;
}
}
if(_c6.length<this.minLength){
this.markInvalid(String.format(this.minLengthText,this.minLength));
return false;
}
if(_c6.length>this.maxLength){
this.markInvalid(String.format(this.maxLengthText,this.maxLength));
return false;
}
return true;
}});
vExt.reg("multiselect",vExt.ux.Multiselect);
vExt.ux.ItemSelector=vExt.extend(vExt.form.Field,{msWidth:200,msHeight:300,hideNavIcons:false,imagePath:"",iconUp:"up2.gif",iconDown:"down2.gif",iconLeft:"left2.gif",iconRight:"right2.gif",iconTop:"top2.gif",iconBottom:"bottom2.gif",drawUpIcon:true,drawDownIcon:true,drawLeftIcon:true,drawRightIcon:true,drawTopIcon:true,drawBotIcon:true,fromStore:null,toStore:null,fromData:null,toData:null,displayField:0,valueField:1,switchToFrom:false,allowDup:false,focusClass:undefined,delimiter:",",readOnly:false,toLegend:null,fromLegend:null,toSortField:null,fromSortField:null,toSortDir:"ASC",fromSortDir:"ASC",toTBar:null,fromTBar:null,bodyStyle:null,border:false,defaultAutoCreate:{tag:"div"},initComponent:function(){
vExt.ux.ItemSelector.superclass.initComponent.call(this);
this.addEvents({"rowdblclick":true,"change":true});
},onRender:function(ct,_c8){
vExt.ux.ItemSelector.superclass.onRender.call(this,ct,_c8);
this.fromMultiselect=new vExt.ux.Multiselect({legend:this.fromLegend,delimiter:this.delimiter,allowDup:this.allowDup,copy:this.allowDup,allowTrash:this.allowDup,dragGroup:this.readOnly?null:"drop2-"+this.el.dom.id,dropGroup:this.readOnly?null:"drop1-"+this.el.dom.id,width:this.msWidth,height:this.msHeight,dataFields:this.dataFields,data:this.fromData,displayField:this.displayField,valueField:this.valueField,store:this.fromStore,isFormField:false,tbar:this.fromTBar,appendOnly:true,sortField:this.fromSortField,sortDir:this.fromSortDir});
this.fromMultiselect.on("dblclick",this.onRowDblClick,this);
if(!this.toStore){
this.toStore=new vExt.data.SimpleStore({fields:this.dataFields,data:this.toData});
}
this.toStore.on("add",this.valueChanged,this);
this.toStore.on("remove",this.valueChanged,this);
this.toStore.on("load",this.valueChanged,this);
this.toMultiselect=new vExt.ux.Multiselect({legend:this.toLegend,delimiter:this.delimiter,allowDup:this.allowDup,dragGroup:this.readOnly?null:"drop1-"+this.el.dom.id,dropGroup:this.readOnly?null:"drop2-"+this.el.dom.id+",drop1-"+this.el.dom.id,width:this.msWidth,height:this.msHeight,displayField:this.displayField,valueField:this.valueField,store:this.toStore,isFormField:false,tbar:this.toTBar,sortField:this.toSortField,sortDir:this.toSortDir});
this.toMultiselect.on("dblclick",this.onRowDblClick,this);
var p=new vExt.Panel({bodyStyle:this.bodyStyle,border:this.border,layout:"table",layoutConfig:{columns:3}});
p.add(this.switchToFrom?this.toMultiselect:this.fromMultiselect);
var _ca=new vExt.Panel({header:false});
p.add(_ca);
p.add(this.switchToFrom?this.fromMultiselect:this.toMultiselect);
p.render(this.el);
_ca.el.down("."+_ca.bwrapCls).remove();
if(this.imagePath!=""&&this.imagePath.charAt(this.imagePath.length-1)!="/"){
this.imagePath+="/";
}
this.iconUp=this.imagePath+(this.iconUp||"up2.gif");
this.iconDown=this.imagePath+(this.iconDown||"down2.gif");
this.iconLeft=this.imagePath+(this.iconLeft||"left2.gif");
this.iconRight=this.imagePath+(this.iconRight||"right2.gif");
this.iconTop=this.imagePath+(this.iconTop||"top2.gif");
this.iconBottom=this.imagePath+(this.iconBottom||"bottom2.gif");
var el=_ca.getEl();
if(!this.toSortField){
this.toTopIcon=el.createChild({tag:"img",src:this.iconTop,style:{cursor:"pointer",margin:"2px"}});
el.createChild({tag:"br"});
this.upIcon=el.createChild({tag:"img",src:this.iconUp,style:{cursor:"pointer",margin:"2px"}});
el.createChild({tag:"br"});
}
this.addIcon=el.createChild({tag:"img",src:this.switchToFrom?this.iconLeft:this.iconRight,style:{cursor:"pointer",margin:"2px"}});
el.createChild({tag:"br"});
this.removeIcon=el.createChild({tag:"img",src:this.switchToFrom?this.iconRight:this.iconLeft,style:{cursor:"pointer",margin:"2px"}});
el.createChild({tag:"br"});
if(!this.toSortField){
this.downIcon=el.createChild({tag:"img",src:this.iconDown,style:{cursor:"pointer",margin:"2px"}});
el.createChild({tag:"br"});
this.toBottomIcon=el.createChild({tag:"img",src:this.iconBottom,style:{cursor:"pointer",margin:"2px"}});
}
if(!this.readOnly){
if(!this.toSortField){
this.toTopIcon.on("click",this.toTop,this);
this.upIcon.on("click",this.up,this);
this.downIcon.on("click",this.down,this);
this.toBottomIcon.on("click",this.toBottom,this);
}
this.addIcon.on("click",this.fromTo,this);
this.removeIcon.on("click",this.toFrom,this);
}
if(!this.drawUpIcon||this.hideNavIcons){
this.upIcon.dom.style.display="none";
}
if(!this.drawDownIcon||this.hideNavIcons){
this.downIcon.dom.style.display="none";
}
if(!this.drawLeftIcon||this.hideNavIcons){
this.addIcon.dom.style.display="none";
}
if(!this.drawRightIcon||this.hideNavIcons){
this.removeIcon.dom.style.display="none";
}
if(!this.drawTopIcon||this.hideNavIcons){
this.toTopIcon.dom.style.display="none";
}
if(!this.drawBotIcon||this.hideNavIcons){
this.toBottomIcon.dom.style.display="none";
}
var tb=p.body.first();
this.el.setWidth(p.body.first().getWidth());
p.body.removeClass();
this.hiddenName=this.name;
var _cd={tag:"input",type:"hidden",value:"",name:this.name};
this.hiddenField=this.el.createChild(_cd);
this.valueChanged(this.toStore);
},initValue:vExt.emptyFn,toTop:function(){
var _ce=this.toMultiselect.view.getSelectedIndexes();
var _cf=[];
if(_ce.length>0){
_ce.sort();
for(var i=0;i<_ce.length;i++){
record=this.toMultiselect.view.store.getAt(_ce[i]);
_cf.push(record);
}
_ce=[];
for(var i=_cf.length-1;i>-1;i--){
record=_cf[i];
this.toMultiselect.view.store.remove(record);
this.toMultiselect.view.store.insert(0,record);
_ce.push(((_cf.length-1)-i));
}
}
this.toMultiselect.view.refresh();
this.toMultiselect.view.select(_ce);
},toBottom:function(){
var _d1=this.toMultiselect.view.getSelectedIndexes();
var _d2=[];
if(_d1.length>0){
_d1.sort();
for(var i=0;i<_d1.length;i++){
record=this.toMultiselect.view.store.getAt(_d1[i]);
_d2.push(record);
}
_d1=[];
for(var i=0;i<_d2.length;i++){
record=_d2[i];
this.toMultiselect.view.store.remove(record);
this.toMultiselect.view.store.add(record);
_d1.push((this.toMultiselect.view.store.getCount())-(_d2.length-i));
}
}
this.toMultiselect.view.refresh();
this.toMultiselect.view.select(_d1);
},up:function(){
var _d4=null;
var _d5=this.toMultiselect.view.getSelectedIndexes();
_d5.sort();
var _d6=[];
if(_d5.length>0){
for(var i=0;i<_d5.length;i++){
_d4=this.toMultiselect.view.store.getAt(_d5[i]);
if((_d5[i]-1)>=0){
this.toMultiselect.view.store.remove(_d4);
this.toMultiselect.view.store.insert(_d5[i]-1,_d4);
_d6.push(_d5[i]-1);
}
}
this.toMultiselect.view.refresh();
this.toMultiselect.view.select(_d6);
}
},down:function(){
var _d8=null;
var _d9=this.toMultiselect.view.getSelectedIndexes();
_d9.sort();
_d9.reverse();
var _da=[];
if(_d9.length>0){
for(var i=0;i<_d9.length;i++){
_d8=this.toMultiselect.view.store.getAt(_d9[i]);
if((_d9[i]+1)<this.toMultiselect.view.store.getCount()){
this.toMultiselect.view.store.remove(_d8);
this.toMultiselect.view.store.insert(_d9[i]+1,_d8);
_da.push(_d9[i]+1);
}
}
this.toMultiselect.view.refresh();
this.toMultiselect.view.select(_da);
}
},fromTo:function(){
var _dc=this.fromMultiselect.view.getSelectedIndexes();
var _dd=[];
if(_dc.length>0){
for(var i=0;i<_dc.length;i++){
record=this.fromMultiselect.view.store.getAt(_dc[i]);
_dd.push(record);
}
if(!this.allowDup){
_dc=[];
}
for(var i=0;i<_dd.length;i++){
record=_dd[i];
if(this.allowDup){
var x=new vExt.data.Record();
record.id=x.id;
delete x;
this.toMultiselect.view.store.add(record);
}else{
this.fromMultiselect.view.store.remove(record);
this.toMultiselect.view.store.add(record);
_dc.push((this.toMultiselect.view.store.getCount()-1));
}
}
}
this.toMultiselect.view.refresh();
this.fromMultiselect.view.refresh();
if(this.toSortField){
this.toMultiselect.store.sort(this.toSortField,this.toSortDir);
}
if(this.allowDup){
this.fromMultiselect.view.select(_dc);
}else{
this.toMultiselect.view.select(_dc);
}
},toFrom:function(){
var _e0=this.toMultiselect.view.getSelectedIndexes();
var _e1=[];
if(_e0.length>0){
for(var i=0;i<_e0.length;i++){
record=this.toMultiselect.view.store.getAt(_e0[i]);
_e1.push(record);
}
_e0=[];
for(var i=0;i<_e1.length;i++){
record=_e1[i];
this.toMultiselect.view.store.remove(record);
if(!this.allowDup){
this.fromMultiselect.view.store.add(record);
_e0.push((this.fromMultiselect.view.store.getCount()-1));
}
}
}
this.fromMultiselect.view.refresh();
this.toMultiselect.view.refresh();
if(this.fromSortField){
this.fromMultiselect.store.sort(this.fromSortField,this.fromSortDir);
}
this.fromMultiselect.view.select(_e0);
},valueChanged:function(_e3){
var _e4=null;
var _e5=[];
for(var i=0;i<_e3.getCount();i++){
_e4=_e3.getAt(i);
_e5.push(_e4.get(this.valueField));
}
this.hiddenField.dom.value=_e5.join(this.delimiter);
this.fireEvent("change",this,this.getValue(),this.hiddenField.dom.value);
},getValue:function(){
return this.hiddenField.dom.value;
},onRowDblClick:function(vw,_e8,_e9,e){
return this.fireEvent("rowdblclick",vw,_e8,_e9,e);
},reset:function(){
range=this.toMultiselect.store.getRange();
this.toMultiselect.store.removeAll();
if(!this.allowDup){
this.fromMultiselect.store.add(range);
this.fromMultiselect.store.sort(this.displayField,"ASC");
}
this.valueChanged(this.toMultiselect.store);
}});
vExt.reg("itemselector",vExt.ux.ItemSelector);
vExt.ux.DDView=function(_eb){
if(!_eb.itemSelector){
var tpl=_eb.tpl;
if(this.classRe.test(tpl)){
_eb.tpl=tpl.replace(this.classRe,"class=$1x-combo-list-item $2$1");
}else{
_eb.tpl=tpl.replace(this.tagRe,"$1 class=\"x-combo-list-item\" $2");
}
_eb.itemSelector=".x-combo-list-item";
}
vExt.ux.DDView.superclass.constructor.call(this,vExt.apply(_eb,{border:false}));
};
vExt.extend(vExt.ux.DDView,vExt.DataView,{sortDir:"ASC",isFormField:true,classRe:/class=(['"])(.*)\1/,tagRe:/(<\w*)(.*?>)/,reset:vExt.emptyFn,clearInvalid:vExt.form.Field.prototype.clearInvalid,afterRender:function(){
vExt.ux.DDView.superclass.afterRender.call(this);
if(this.dragGroup){
this.setDraggable(this.dragGroup.split(","));
}
if(this.dropGroup){
this.setDroppable(this.dropGroup.split(","));
}
if(this.deletable){
this.setDeletable();
}
this.isDirtyFlag=false;
this.addEvents("drop");
},validate:function(){
return true;
},destroy:function(){
this.purgeListeners();
this.getEl().removeAllListeners();
this.getEl().remove();
if(this.dragZone){
if(this.dragZone.destroy){
this.dragZone.destroy();
}
}
if(this.dropZone){
if(this.dropZone.destroy){
this.dropZone.destroy();
}
}
},getName:function(){
return this.name;
},setValue:function(v){
if(!this.store){
throw "DDView.setValue(). DDView must be constructed with a valid Store";
}
var _ee={};
_ee[this.store.reader.meta.root]=v?[].concat(v):[];
this.store.proxy=new vExt.data.MemoryProxy(_ee);
this.store.load();
},getValue:function(){
var _ef="(";
this.store.each(function(rec){
_ef+=rec.id+",";
});
return _ef.substr(0,_ef.length-1)+")";
},getIds:function(){
var i=0,_f2=new Array(this.store.getCount());
this.store.each(function(rec){
_f2[i++]=rec.id;
});
return _f2;
},isDirty:function(){
return this.isDirtyFlag;
},getTargetFromEvent:function(e){
var _f5=e.getTarget();
while((_f5!==null)&&(_f5.parentNode!=this.el.dom)){
_f5=_f5.parentNode;
}
if(!_f5){
_f5=this.el.dom.lastChild||this.el.dom;
}
return _f5;
},getDragData:function(e){
var _f7=this.findItemFromChild(e.getTarget());
if(_f7){
if(!this.isSelected(_f7)){
delete this.ignoreNextClick;
this.onItemClick(_f7,this.indexOf(_f7),e);
this.ignoreNextClick=true;
}
var _f8={sourceView:this,viewNodes:[],records:[],copy:this.copy||(this.allowCopy&&e.ctrlKey)};
if(this.getSelectionCount()==1){
var i=this.getSelectedIndexes()[0];
var n=this.getNode(i);
_f8.viewNodes.push(_f8.ddel=n);
_f8.records.push(this.store.getAt(i));
_f8.repairXY=vExt.fly(n).getXY();
}else{
_f8.ddel=document.createElement("div");
_f8.ddel.className="multi-proxy";
this.collectSelection(_f8);
}
return _f8;
}
return false;
},getRepairXY:function(e){
return this.dragData.repairXY;
},collectSelection:function(_fc){
_fc.repairXY=vExt.fly(this.getSelectedNodes()[0]).getXY();
if(this.preserveSelectionOrder===true){
vExt.each(this.getSelectedIndexes(),function(i){
var n=this.getNode(i);
var _ff=n.cloneNode(true);
_ff.id=vExt.id();
_fc.ddel.appendChild(_ff);
_fc.records.push(this.store.getAt(i));
_fc.viewNodes.push(n);
},this);
}else{
var i=0;
this.store.each(function(rec){
if(this.isSelected(i)){
var n=this.getNode(i);
var _103=n.cloneNode(true);
_103.id=vExt.id();
_fc.ddel.appendChild(_103);
_fc.records.push(this.store.getAt(i));
_fc.viewNodes.push(n);
}
i++;
},this);
}
},setDraggable:function(_104){
if(_104 instanceof Array){
vExt.each(_104,this.setDraggable,this);
return;
}
if(this.dragZone){
this.dragZone.addToGroup(_104);
}else{
this.dragZone=new vExt.dd.DragZone(this.getEl(),{containerScroll:true,ddGroup:_104});
if(!this.multiSelect){
this.singleSelect=true;
}
this.dragZone.getDragData=this.getDragData.createDelegate(this);
this.dragZone.getRepairXY=this.getRepairXY;
this.dragZone.onEndDrag=this.onEndDrag;
}
},setDroppable:function(_105){
if(_105 instanceof Array){
vExt.each(_105,this.setDroppable,this);
return;
}
if(this.dropZone){
this.dropZone.addToGroup(_105);
}else{
this.dropZone=new vExt.dd.DropZone(this.getEl(),{owningView:this,containerScroll:true,ddGroup:_105});
this.dropZone.getTargetFromEvent=this.getTargetFromEvent.createDelegate(this);
this.dropZone.onNodeEnter=this.onNodeEnter.createDelegate(this);
this.dropZone.onNodeOver=this.onNodeOver.createDelegate(this);
this.dropZone.onNodeOut=this.onNodeOut.createDelegate(this);
this.dropZone.onNodeDrop=this.onNodeDrop.createDelegate(this);
}
},getDropPoint:function(e,n,dd){
if(n==this.el.dom){
return "above";
}
var t=vExt.lib.Dom.getY(n),b=t+n.offsetHeight;
var c=t+(b-t)/2;
var y=vExt.lib.Event.getPageY(e);
if(y<=c){
return "above";
}else{
return "below";
}
},isValidDropPoint:function(pt,n,data){
if(!data.viewNodes||(data.viewNodes.length!=1)){
return true;
}
var d=data.viewNodes[0];
if(d==n){
return false;
}
if((pt=="below")&&(n.nextSibling==d)){
return false;
}
if((pt=="above")&&(n.previousSibling==d)){
return false;
}
return true;
},onNodeEnter:function(n,dd,e,data){
if(this.highlightColor&&(data.sourceView!=this)){
this.el.highlight(this.highlightColor);
}
return false;
},onNodeOver:function(n,dd,e,data){
var _119=this.dropNotAllowed;
var pt=this.getDropPoint(e,n,dd);
if(this.isValidDropPoint(pt,n,data)){
if(this.appendOnly||this.sortField){
return "x-tree-drop-ok-below";
}
if(pt){
var _11b;
if(pt=="above"){
_119=n.previousSibling?"x-tree-drop-ok-between":"x-tree-drop-ok-above";
_11b="x-view-drag-insert-above";
}else{
_119=n.nextSibling?"x-tree-drop-ok-between":"x-tree-drop-ok-below";
_11b="x-view-drag-insert-below";
}
if(this.lastInsertClass!=_11b){
vExt.fly(n).replaceClass(this.lastInsertClass,_11b);
this.lastInsertClass=_11b;
}
}
}
return _119;
},onNodeOut:function(n,dd,e,data){
this.removeDropIndicators(n);
},onNodeDrop:function(n,dd,e,data){
if(this.fireEvent("drop",this,n,dd,e,data)===false){
return false;
}
var pt=this.getDropPoint(e,n,dd);
var _125=(this.appendOnly||(n==this.el.dom))?this.store.getCount():n.viewIndex;
if(pt=="below"){
_125++;
}
if(data.sourceView==this){
if(pt=="below"){
if(data.viewNodes[0]==n){
data.viewNodes.shift();
}
}else{
if(data.viewNodes[data.viewNodes.length-1]==n){
data.viewNodes.pop();
}
}
if(!data.viewNodes.length){
return false;
}
if(_125>this.store.indexOf(data.records[0])){
_125--;
}
}
if(data.node instanceof vExt.tree.TreeNode){
var r=data.node.getOwnerTree().recordFromNode(data.node);
if(r){
data.records=[r];
}
}
if(!data.records){
alert("Programming problem. Drag data contained no Records");
return false;
}
for(var i=0;i<data.records.length;i++){
var r=data.records[i];
var dup=this.store.getById(r.id);
if(dup&&(dd!=this.dragZone)){
if(!this.allowDup&&!this.allowTrash){
vExt.fly(this.getNode(this.store.indexOf(dup))).frame("red",1);
return true;
}
var x=new vExt.data.Record();
r.id=x.id;
delete x;
}
if(data.copy){
this.store.insert(_125++,r.copy());
}else{
if(data.sourceView){
data.sourceView.isDirtyFlag=true;
data.sourceView.store.remove(r);
}
if(!this.allowTrash){
this.store.insert(_125++,r);
}
}
if(this.sortField){
this.store.sort(this.sortField,this.sortDir);
}
this.isDirtyFlag=true;
}
this.dragZone.cachedTarget=null;
return true;
},onEndDrag:function(data,e){
var d=vExt.get(this.dragData.ddel);
if(d&&d.hasClass("multi-proxy")){
d.remove();
}
},removeDropIndicators:function(n){
if(n){
vExt.fly(n).removeClass(["x-view-drag-insert-above","x-view-drag-insert-left","x-view-drag-insert-right","x-view-drag-insert-below"]);
this.lastInsertClass="_noclass";
}
},setDeletable:function(_12e){
if(!this.singleSelect&&!this.multiSelect){
this.singleSelect=true;
}
var c=this.getContextMenu();
this.contextMenu.on("itemclick",function(item){
switch(item.id){
case "delete":
this.remove(this.getSelectedIndexes());
break;
}
},this);
this.contextMenu.add({icon:_12e||AU.resolveUrl("/images/delete.gif"),id:"delete",text:AU.getMessage("deleteItem")});
},getContextMenu:function(){
if(!this.contextMenu){
this.contextMenu=new vExt.menu.Menu({id:this.id+"-contextmenu"});
this.el.on("contextmenu",this.showContextMenu,this);
}
return this.contextMenu;
},disableContextMenu:function(){
if(this.contextMenu){
this.el.un("contextmenu",this.showContextMenu,this);
}
},showContextMenu:function(e,item){
item=this.findItemFromChild(e.getTarget());
if(item){
e.stopEvent();
this.select(this.getNode(item),this.multiSelect&&e.ctrlKey,true);
this.contextMenu.showAt(e.getXY());
}
},remove:function(_133){
_133=[].concat(_133);
for(var i=0;i<_133.length;i++){
var rec=this.store.getAt(_133[i]);
this.store.remove(rec);
}
},onDblClick:function(e){
var item=this.findItemFromChild(e.getTarget());
if(item){
if(this.fireEvent("dblclick",this,this.indexOf(item),item,e)===false){
return false;
}
if(this.dragGroup){
var _138=vExt.dd.DragDropMgr.getRelated(this.dragZone,true);
while(_138.indexOf(this.dropZone)!==-1){
_138.remove(this.dropZone);
}
if((_138.length==1)&&(_138[0].owningView)){
this.dragZone.cachedTarget=null;
var el=vExt.get(_138[0].getEl());
var box=el.getBox(true);
_138[0].onNodeDrop(el.dom,{target:el.dom,xy:[box.x,box.y+box.height-1]},null,this.getDragData(e));
}
}
}
},onItemClick:function(item,_13c,e){
if(this.ignoreNextClick){
delete this.ignoreNextClick;
return;
}
if(this.fireEvent("beforeclick",this,_13c,item,e)===false){
return false;
}
if(this.multiSelect||this.singleSelect){
if(this.multiSelect&&e.shiftKey&&this.lastSelection){
this.select(this.getNodes(this.indexOf(this.lastSelection),_13c),false);
}else{
if(this.isSelected(item)&&e.ctrlKey){
this.deselect(item);
}else{
this.deselect(item);
this.select(item,this.multiSelect&&e.ctrlKey);
this.lastSelection=item;
}
}
e.preventDefault();
}
return true;
}});
vExt.ns("vExt.ux");
vExt.ux.Carousel=vExt.extend(vExt.util.Observable,{interval:3,transitionDuration:1,transitionType:"carousel",transitionEasing:"easeOut",itemSelector:"img",activeSlide:0,autoPlay:false,showPlayButton:false,pauseOnNavigate:false,wrap:false,freezeOnHover:false,navigationOnHover:false,hideNavigation:false,constructor:function(elId,_13f){
_13f=_13f||{};
vExt.apply(this,_13f);
vExt.ux.Carousel.superclass.constructor.call(this,_13f);
this.addEvents("beforeprev","prev","beforenext","next","change","play","pause","freeze","unfreeze");
this.el=vExt.get(elId);
this.slides=this.els=[];
if(this.autoPlay||this.showPlayButton){
this.wrap=true;
}
if(this.autoPlay&&_13f.showPlayButton===undefined){
this.showPlayButton=true;
}
this.initMarkup();
this.initEvents();
if(this.carouselSize>0){
this.refresh();
}
},initMarkup:function(){
var dh=vExt.DomHelper;
this.carouselSize=0;
this.els.container=dh.append(this.el,{cls:"ux-carousel-container"},true);
this.els.slidesWrap=dh.append(this.els.container,{cls:"ux-carousel-slides-wrap"},true);
this.els.navigation=dh.append(this.els.container,{cls:"ux-carousel-nav"},true).hide();
this.els.caption=dh.append(this.els.navigation,{tag:"h2",cls:"ux-carousel-caption"},true);
this.els.navNext=dh.append(this.els.navigation,{tag:"a",href:"#",cls:"ux-carousel-nav-next"},true);
if(this.showPlayButton){
this.els.navPlay=dh.append(this.els.navigation,{tag:"a",href:"#",cls:"ux-carousel-nav-play"},true);
}
this.els.navPrev=dh.append(this.els.navigation,{tag:"a",href:"#",cls:"ux-carousel-nav-prev"},true);
this.slideWidth=this.el.getWidth(true);
this.slideHeight=this.el.getHeight(true);
this.els.container.setStyle({width:this.slideWidth+"px",height:this.slideHeight+"px"});
this.els.caption.setWidth((this.slideWidth-(this.els.navNext.getWidth()*2)-(this.showPlayButton?this.els.navPlay.getWidth():0)-20)+"px");
this.el.select(this.itemSelector).appendTo(this.els.slidesWrap).each(function(item){
item=item.wrap({cls:"ux-carousel-slide"});
this.slides.push(item);
item.setWidth(this.slideWidth+"px").setHeight(this.slideHeight+"px");
},this);
this.carouselSize=this.slides.length;
if(this.navigationOnHover){
this.els.navigation.setStyle("top",(-1*this.els.navigation.getHeight())+"px");
}
this.el.clip();
},initEvents:function(){
this.els.navPrev.on("click",function(ev){
ev.preventDefault();
var _143=ev.getTarget();
_143.blur();
if(vExt.fly(_143).hasClass("ux-carousel-nav-disabled")){
return;
}
this.prev();
},this);
this.els.navNext.on("click",function(ev){
ev.preventDefault();
var _145=ev.getTarget();
_145.blur();
if(vExt.fly(_145).hasClass("ux-carousel-nav-disabled")){
return;
}
this.next();
},this);
if(this.showPlayButton){
this.els.navPlay.on("click",function(ev){
ev.preventDefault();
ev.getTarget().blur();
if(this.playing){
this.pause();
}else{
this.play();
}
},this);
}
if(this.freezeOnHover){
this.els.container.on("mouseenter",function(){
if(this.playing){
this.fireEvent("freeze",this.slides[this.activeSlide]);
vExt.TaskMgr.stop(this.playTask);
}
},this);
this.els.container.on("mouseleave",function(){
if(this.playing){
this.fireEvent("unfreeze",this.slides[this.activeSlide]);
vExt.TaskMgr.start(this.playTask);
}
},this,{buffer:(this.interval/2)*1000});
}
if(this.navigationOnHover){
this.els.container.on("mouseenter",function(){
if(!this.navigationShown){
this.navigationShown=true;
this.els.navigation.stopFx(false).shift({y:this.els.container.getY(),duration:this.transitionDuration});
}
},this);
this.els.container.on("mouseleave",function(){
if(this.navigationShown){
this.navigationShown=false;
this.els.navigation.stopFx(false).shift({y:this.els.navigation.getHeight()-this.els.container.getY(),duration:this.transitionDuration});
}
},this);
}
if(this.interval&&this.autoPlay){
this.play();
}
},prev:function(){
if(this.fireEvent("beforeprev")===false){
return;
}
if(this.pauseOnNavigate){
this.pause();
}
this.setSlide(this.activeSlide-1);
this.fireEvent("prev",this.activeSlide);
return this;
},next:function(){
if(this.fireEvent("beforenext")===false){
return;
}
if(this.pauseOnNavigate){
this.pause();
}
this.setSlide(this.activeSlide+1);
this.fireEvent("next",this.activeSlide);
return this;
},play:function(){
if(!this.playing){
this.playTask=this.playTask||{run:function(){
this.playing=true;
this.setSlide(this.activeSlide+1);
},interval:this.interval*1000,scope:this};
this.playTaskBuffer=this.playTaskBuffer||new vExt.util.DelayedTask(function(){
vExt.TaskMgr.start(this.playTask);
},this);
this.playTaskBuffer.delay(this.interval*1000);
this.playing=true;
this.els.navPlay.addClass("ux-carousel-playing");
this.fireEvent("play");
}
return this;
},pause:function(){
if(this.playing){
vExt.TaskMgr.stop(this.playTask);
this.playTaskBuffer.cancel();
this.playing=false;
this.els.navPlay.removeClass("ux-carousel-playing");
this.fireEvent("pause");
}
return this;
},clear:function(){
this.els.slidesWrap.update("");
this.slides=[];
this.carouselSize=0;
this.pause();
return this;
},add:function(el,_148){
var item=vExt.fly(el).appendTo(this.els.slidesWrap).wrap({cls:"ux-carousel-slide"});
item.setWidth(this.slideWidth+"px").setHeight(this.slideHeight+"px");
this.slides.push(item);
if(_148){
this.refresh();
}
return this;
},refresh:function(){
this.carouselSize=this.slides.length;
this.els.slidesWrap.setWidth((this.slideWidth*this.carouselSize)+"px");
if(this.carouselSize>0){
if(!this.hideNavigation){
this.els.navigation.show();
}
this.activeSlide=0;
this.setSlide(0,true);
}
return this;
},setSlide:function(_14a,_14b){
if(!this.wrap&&!this.slides[_14a]){
return;
}else{
if(this.wrap){
if(_14a<0){
_14a=this.carouselSize-1;
}else{
if(_14a>this.carouselSize-1){
_14a=0;
}
}
}
}
if(!this.slides[_14a]){
return;
}
this.els.caption.update(this.slides[_14a].child(":first-child",true).title||"");
var _14c=_14a*this.slideWidth;
if(!_14b){
switch(this.transitionType){
case "fade":
this.slides[_14a].setOpacity(0);
this.slides[this.activeSlide].stopFx(false).fadeOut({duration:this.transitionDuration/2,callback:function(){
this.els.slidesWrap.setStyle("left",(-1*_14c)+"px");
this.slides[this.activeSlide].setOpacity(1);
this.slides[_14a].fadeIn({duration:this.transitionDuration/2});
},scope:this});
break;
default:
var xNew=(-1*_14c)+this.els.container.getX();
this.els.slidesWrap.stopFx(false);
this.els.slidesWrap.shift({duration:this.transitionDuration,x:xNew,easing:this.transitionEasing});
break;
}
}else{
this.els.slidesWrap.setStyle("left","0");
}
this.activeSlide=_14a;
this.updateNav();
this.fireEvent("change",this.slides[_14a],_14a);
},updateNav:function(){
this.els.navPrev.removeClass("ux-carousel-nav-disabled");
this.els.navNext.removeClass("ux-carousel-nav-disabled");
if(!this.wrap){
if(this.activeSlide===0){
this.els.navPrev.addClass("ux-carousel-nav-disabled");
}
if(this.activeSlide===this.carouselSize-1){
this.els.navNext.addClass("ux-carousel-nav-disabled");
}
}
}});

