(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2e7fffed"],{"079a":function(e,t,r){"use strict";r.r(t),r.d(t,"FilesystemWeb",(function(){return f}));var n=r("b85c"),a=r("2909"),i=r("c7eb"),c=r("1da1"),s=r("d4ec"),u=r("bee2"),o=r("262e"),h=r("2caf"),d=(r("4de4"),r("d3b7"),r("ac1f"),r("1276"),r("159b"),r("c975"),r("5319"),r("d9e2"),r("baa5"),r("466d"),r("99af"),r("d81d"),r("1547"));function p(e){var t=e.split("/").filter((function(e){return"."!==e})),r=[];return t.forEach((function(e){".."===e&&r.length>0&&".."!==r[r.length-1]?r.pop():r.push(e)})),r.join("/")}function b(e,t){e=p(e),t=p(t);var r=e.split("/"),n=t.split("/");return e!==t&&r.every((function(e,t){return e===n[t]}))}var f=function(e){Object(o["a"])(r,e);var t=Object(h["a"])(r);function r(){var e;return Object(s["a"])(this,r),e=t.apply(this,arguments),e.DB_VERSION=1,e.DB_NAME="Disc",e._writeCmds=["add","put","delete"],e}return Object(u["a"])(r,[{key:"initDb",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(){var t=this;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(void 0===this._db){e.next=2;break}return e.abrupt("return",this._db);case 2:if("indexedDB"in window){e.next=4;break}throw this.unavailable("This browser doesn't support IndexedDB");case 4:return e.abrupt("return",new Promise((function(e,n){var a=indexedDB.open(t.DB_NAME,t.DB_VERSION);a.onupgradeneeded=r.doUpgrade,a.onsuccess=function(){t._db=a.result,e(a.result)},a.onerror=function(){return n(a.error)},a.onblocked=function(){console.warn("db blocked")}})));case 5:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"dbRequest",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t,r){var n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return n=-1!==this._writeCmds.indexOf(t)?"readwrite":"readonly",e.abrupt("return",this.initDb().then((function(e){return new Promise((function(i,c){var s=e.transaction(["FileStorage"],n),u=s.objectStore("FileStorage"),o=u[t].apply(u,Object(a["a"])(r));o.onsuccess=function(){return i(o.result)},o.onerror=function(){return c(o.error)}}))})));case 2:case"end":return e.stop()}}),e,this)})));function t(t,r){return e.apply(this,arguments)}return t}()},{key:"dbIndexRequest",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t,r,n){var c;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c=-1!==this._writeCmds.indexOf(r)?"readwrite":"readonly",e.abrupt("return",this.initDb().then((function(e){return new Promise((function(i,s){var u=e.transaction(["FileStorage"],c),o=u.objectStore("FileStorage"),h=o.index(t),d=h[r].apply(h,Object(a["a"])(n));d.onsuccess=function(){return i(d.result)},d.onerror=function(){return s(d.error)}}))})));case 2:case"end":return e.stop()}}),e,this)})));function t(t,r,n){return e.apply(this,arguments)}return t}()},{key:"getPath",value:function(e,t){var r=void 0!==t?t.replace(/^[/]+|[/]+$/g,""):"",n="";return void 0!==e&&(n+="/"+e),""!==t&&(n+="/"+r),n}},{key:"clear",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(){var t,r,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.initDb();case 2:t=e.sent,r=t.transaction(["FileStorage"],"readwrite"),n=r.objectStore("FileStorage"),n.clear();case 6:case"end":return e.stop()}}),e,this)})));function t(){return e.apply(this,arguments)}return t}()},{key:"readFile",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),e.next=3,this.dbRequest("get",[r]);case 3:if(n=e.sent,void 0!==n){e.next=6;break}throw Error("File does not exist.");case 6:return e.abrupt("return",{data:n.content?n.content:""});case 7:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"writeFile",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n,a,c,s,u,o,h,d,p,b;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),n=t.data,a=t.recursive,e.next=5,this.dbRequest("get",[r]);case 5:if(c=e.sent,!c||"directory"!==c.type){e.next=8;break}throw Error("The supplied path is a directory.");case 8:return s=t.encoding,u=r.substr(0,r.lastIndexOf("/")),e.next=12,this.dbRequest("get",[u]);case 12:if(o=e.sent,void 0!==o){e.next=19;break}if(h=u.indexOf("/",1),-1===h){e.next=19;break}return d=u.substr(h),e.next=19,this.mkdir({path:d,directory:t.directory,recursive:a});case 19:return p=Date.now(),b={path:r,folder:u,type:"file",size:n.length,ctime:p,mtime:p,content:!s&&n.indexOf(",")>=0?n.split(",")[1]:n},e.next=23,this.dbRequest("put",[b]);case 23:return e.abrupt("return",{uri:b.path});case 24:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"appendFile",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n,a,c,s,u,o,h,d,p;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),n=t.data,a=r.substr(0,r.lastIndexOf("/")),c=Date.now(),s=c,e.next=7,this.dbRequest("get",[r]);case 7:if(u=e.sent,!u||"directory"!==u.type){e.next=10;break}throw Error("The supplied path is a directory.");case 10:return e.next=12,this.dbRequest("get",[a]);case 12:if(o=e.sent,void 0!==o){e.next=19;break}if(h=a.indexOf("/",1),-1===h){e.next=19;break}return d=a.substr(h),e.next=19,this.mkdir({path:d,directory:t.directory,recursive:!0});case 19:return void 0!==u&&(n=u.content+n,s=u.ctime),p={path:r,folder:a,type:"file",size:n.length,ctime:s,mtime:c,content:n},e.next=23,this.dbRequest("put",[p]);case 23:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteFile",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n,a;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),e.next=3,this.dbRequest("get",[r]);case 3:if(n=e.sent,void 0!==n){e.next=6;break}throw Error("File does not exist.");case 6:return e.next=8,this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(r)]);case 8:if(a=e.sent,0===a.length){e.next=11;break}throw Error("Folder is not empty.");case 11:return e.next=13,this.dbRequest("delete",[r]);case 13:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"mkdir",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n,a,c,s,u,o,h,d;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),n=t.recursive,a=r.substr(0,r.lastIndexOf("/")),c=(r.match(/\//g)||[]).length,e.next=6,this.dbRequest("get",[a]);case 6:return s=e.sent,e.next=9,this.dbRequest("get",[r]);case 9:if(u=e.sent,1!==c){e.next=12;break}throw Error("Cannot create Root directory");case 12:if(void 0===u){e.next=14;break}throw Error("Current directory does already exist.");case 14:if(n||2===c||void 0!==s){e.next=16;break}throw Error("Parent directory must exist");case 16:if(!n||2===c||void 0!==s){e.next=20;break}return o=a.substr(a.indexOf("/",1)),e.next=20,this.mkdir({path:o,directory:t.directory,recursive:n});case 20:return h=Date.now(),d={path:r,folder:a,type:"directory",size:0,ctime:h,mtime:h},e.next=24,this.dbRequest("put",[d]);case 24:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"rmdir",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,a,c,s,u,o,h,d,p,b,f;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=t.path,a=t.directory,c=t.recursive,s=this.getPath(a,r),e.next=4,this.dbRequest("get",[s]);case 4:if(u=e.sent,void 0!==u){e.next=7;break}throw Error("Folder does not exist.");case 7:if("directory"===u.type){e.next=9;break}throw Error("Requested path is not a directory");case 9:return e.next=11,this.readdir({path:r,directory:a});case 11:if(o=e.sent,0===o.files.length||c){e.next=14;break}throw Error("Folder is not empty");case 14:h=Object(n["a"])(o.files),e.prev=15,h.s();case 17:if((d=h.n()).done){e.next=32;break}return p=d.value,b="".concat(r,"/").concat(p),e.next=22,this.stat({path:b,directory:a});case 22:if(f=e.sent,"file"!==f.type){e.next=28;break}return e.next=26,this.deleteFile({path:b,directory:a});case 26:e.next=30;break;case 28:return e.next=30,this.rmdir({path:b,directory:a,recursive:c});case 30:e.next=17;break;case 32:e.next=37;break;case 34:e.prev=34,e.t0=e["catch"](15),h.e(e.t0);case 37:return e.prev=37,h.f(),e.finish(37);case 40:return e.next=42,this.dbRequest("delete",[s]);case 42:case"end":return e.stop()}}),e,this,[[15,34,37,40]])})));function t(t){return e.apply(this,arguments)}return t}()},{key:"readdir",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n,a,c;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),e.next=3,this.dbRequest("get",[r]);case 3:if(n=e.sent,""===t.path||void 0!==n){e.next=6;break}throw Error("Folder does not exist.");case 6:return e.next=8,this.dbIndexRequest("by_folder","getAllKeys",[IDBKeyRange.only(r)]);case 8:return a=e.sent,c=a.map((function(e){return e.substring(r.length+1)})),e.abrupt("return",{files:c});case 11:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"getUri",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),e.next=3,this.dbRequest("get",[r]);case 3:if(n=e.sent,void 0!==n){e.next=8;break}return e.next=7,this.dbRequest("get",[r+"/"]);case 7:n=e.sent;case 8:return e.abrupt("return",{uri:(null===n||void 0===n?void 0:n.path)||r});case 9:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"stat",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,n;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return r=this.getPath(t.directory,t.path),e.next=3,this.dbRequest("get",[r]);case 3:if(n=e.sent,void 0!==n){e.next=8;break}return e.next=7,this.dbRequest("get",[r+"/"]);case 7:n=e.sent;case 8:if(void 0!==n){e.next=10;break}throw Error("Entry does not exist.");case 10:return e.abrupt("return",{type:n.type,size:n.size,ctime:n.ctime,mtime:n.mtime,uri:n.path});case 11:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"rename",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this._copy(t,!0));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"copy",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",this._copy(t,!1));case 1:case"end":return e.stop()}}),e,this)})));function t(t){return e.apply(this,arguments)}return t}()},{key:"requestPermissions",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",{publicStorage:"granted"});case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"checkPermissions",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(){return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",{publicStorage:"granted"});case 1:case"end":return e.stop()}}),e)})));function t(){return e.apply(this,arguments)}return t}()},{key:"_copy",value:function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t){var r,a,s,u,o,h,d,p,f,l,x,v,y,w,k,O,j,m,g,R=this,q=arguments;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:if(r=q.length>1&&void 0!==q[1]&&q[1],a=t.toDirectory,s=t.to,u=t.from,o=t.directory,s&&u){e.next=5;break}throw Error("Both to and from must be provided");case 5:if(a||(a=o),h=this.getPath(o,u),d=this.getPath(a,s),h!==d){e.next=10;break}return e.abrupt("return");case 10:if(!b(h,d)){e.next=12;break}throw Error("To path cannot contain the from path");case 12:return e.prev=12,e.next=15,this.stat({path:s,directory:a});case 15:p=e.sent,e.next=29;break;case 18:if(e.prev=18,e.t0=e["catch"](12),f=s.split("/"),f.pop(),l=f.join("/"),!(f.length>0)){e.next=29;break}return e.next=26,this.stat({path:l,directory:a});case 26:if(x=e.sent,"directory"===x.type){e.next=29;break}throw new Error("Parent directory of the to path is a file");case 29:if(!p||"directory"!==p.type){e.next=31;break}throw new Error("Cannot overwrite a directory with a file");case 31:return e.next=33,this.stat({path:u,directory:o});case 33:v=e.sent,y=function(){var e=Object(c["a"])(Object(i["a"])().mark((function e(t,r,n){var c,s;return Object(i["a"])().wrap((function(e){while(1)switch(e.prev=e.next){case 0:return c=R.getPath(a,t),e.next=3,R.dbRequest("get",[c]);case 3:return s=e.sent,s.ctime=r,s.mtime=n,e.next=8,R.dbRequest("put",[s]);case 8:case"end":return e.stop()}}),e)})));return function(t,r,n){return e.apply(this,arguments)}}(),w=v.ctime?v.ctime:Date.now(),e.t1=v.type,e.next="file"===e.t1?39:"directory"===e.t1?51:86;break;case 39:return e.next=41,this.readFile({path:u,directory:o});case 41:if(k=e.sent,!r){e.next=45;break}return e.next=45,this.deleteFile({path:u,directory:o});case 45:return e.next=47,this.writeFile({path:s,directory:a,data:k.data});case 47:if(!r){e.next=50;break}return e.next=50,y(s,w,v.mtime);case 50:return e.abrupt("return");case 51:if(!p){e.next=53;break}throw Error("Cannot move a directory over an existing object");case 53:return e.prev=53,e.next=56,this.mkdir({path:s,directory:a,recursive:!1});case 56:if(!r){e.next=59;break}return e.next=59,y(s,w,v.mtime);case 59:e.next=63;break;case 61:e.prev=61,e.t2=e["catch"](53);case 63:return e.next=65,this.readdir({path:u,directory:o});case 65:O=e.sent.files,j=Object(n["a"])(O),e.prev=67,j.s();case 69:if((m=j.n()).done){e.next=75;break}return g=m.value,e.next=73,this._copy({from:"".concat(u,"/").concat(g),to:"".concat(s,"/").concat(g),directory:o,toDirectory:a},r);case 73:e.next=69;break;case 75:e.next=80;break;case 77:e.prev=77,e.t3=e["catch"](67),j.e(e.t3);case 80:return e.prev=80,j.f(),e.finish(80);case 83:if(!r){e.next=86;break}return e.next=86,this.rmdir({path:u,directory:o});case 86:case"end":return e.stop()}}),e,this,[[12,18],[53,61],[67,77,80,83]])})));function t(t){return e.apply(this,arguments)}return t}()}],[{key:"doUpgrade",value:function(e){var t=e.target,r=t.result;switch(e.oldVersion){case 0:case 1:default:r.objectStoreNames.contains("FileStorage")&&r.deleteObjectStore("FileStorage");var n=r.createObjectStore("FileStorage",{keyPath:"path"});n.createIndex("by_folder","folder")}}}]),r}(d["a"]);f._debug=!0},baa5:function(e,t,r){var n=r("23e7"),a=r("e58c");n({target:"Array",proto:!0,forced:a!==[].lastIndexOf},{lastIndexOf:a})}}]);
//# sourceMappingURL=chunk-2e7fffed.eefc9161.js.map