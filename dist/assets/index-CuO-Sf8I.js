var ul=Object.defineProperty;var dl=(s,t,e)=>t in s?ul(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var rt=(s,t,e)=>dl(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Mr="164",di={ROTATE:0,DOLLY:1,PAN:2},fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},fl=0,Ur=1,pl=2,Sc=1,wc=2,Sn=3,hn=0,Ae=1,Ve=2,kn=0,Fi=1,Nr=2,zr=3,Or=4,ml=5,Qn=100,gl=101,_l=102,xl=103,vl=104,Ml=200,yl=201,Sl=202,wl=203,lr=204,hr=205,El=206,bl=207,Tl=208,Al=209,Cl=210,Rl=211,Pl=212,Ll=213,Dl=214,Il=0,Ul=1,Nl=2,$s=3,zl=4,Ol=5,Fl=6,Bl=7,Ec=0,kl=1,Hl=2,Hn=0,Gl=1,Vl=2,Wl=3,bc=4,Xl=5,Yl=6,ql=7,Tc=300,Gi=301,Vi=302,ur=303,dr=304,co=306,un=1e3,wn=1001,fr=1002,Ze=1003,jl=1004,Ms=1005,je=1006,wo=1007,ei=1008,Gn=1009,Zl=1010,Kl=1011,Ac=1012,Cc=1013,Wi=1014,Fn=1015,lo=1016,Rc=1017,Pc=1018,gs=1020,Jl=35902,$l=1021,Ql=1022,cn=1023,th=1024,eh=1025,Bi=1026,us=1027,nh=1028,Lc=1029,ih=1030,Dc=1031,Ic=1033,Eo=33776,bo=33777,To=33778,Ao=33779,Fr=35840,Br=35841,kr=35842,Hr=35843,Gr=36196,Vr=37492,Wr=37496,Xr=37808,Yr=37809,qr=37810,jr=37811,Zr=37812,Kr=37813,Jr=37814,$r=37815,Qr=37816,ta=37817,ea=37818,na=37819,ia=37820,sa=37821,Co=36492,oa=36494,ra=36495,sh=36283,aa=36284,ca=36285,la=36286,oh=3200,rh=3201,Uc=0,ah=1,zn="",ke="srgb",Vn="srgb-linear",yr="display-p3",ho="display-p3-linear",Qs="linear",he="srgb",to="rec709",eo="p3",pi=7680,ha=519,ch=512,lh=513,hh=514,Nc=515,uh=516,dh=517,fh=518,ph=519,ua=35044,da="300 es",En=2e3,no=2001;class li{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const Le=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let fa=1234567;const rs=Math.PI/180,ds=180/Math.PI;function hi(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Le[s&255]+Le[s>>8&255]+Le[s>>16&255]+Le[s>>24&255]+"-"+Le[t&255]+Le[t>>8&255]+"-"+Le[t>>16&15|64]+Le[t>>24&255]+"-"+Le[e&63|128]+Le[e>>8&255]+"-"+Le[e>>16&255]+Le[e>>24&255]+Le[n&255]+Le[n>>8&255]+Le[n>>16&255]+Le[n>>24&255]).toLowerCase()}function Me(s,t,e){return Math.max(t,Math.min(e,s))}function Sr(s,t){return(s%t+t)%t}function mh(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function gh(s,t,e){return s!==t?(e-s)/(t-s):0}function as(s,t,e){return(1-e)*s+e*t}function _h(s,t,e,n){return as(s,t,1-Math.exp(-e*n))}function xh(s,t=1){return t-Math.abs(Sr(s,t*2)-t)}function vh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Mh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function yh(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Sh(s,t){return s+Math.random()*(t-s)}function wh(s){return s*(.5-Math.random())}function Eh(s){s!==void 0&&(fa=s);let t=fa+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function bh(s){return s*rs}function Th(s){return s*ds}function Ah(s){return(s&s-1)===0&&s!==0}function Ch(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Rh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ph(s,t,e,n,i){const o=Math.cos,r=Math.sin,a=o(e/2),c=r(e/2),l=o((t+n)/2),h=r((t+n)/2),u=o((t-n)/2),d=r((t-n)/2),f=o((n-t)/2),g=r((n-t)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ii(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ie(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const uo={DEG2RAD:rs,RAD2DEG:ds,generateUUID:hi,clamp:Me,euclideanModulo:Sr,mapLinear:mh,inverseLerp:gh,lerp:as,damp:_h,pingpong:xh,smoothstep:vh,smootherstep:Mh,randInt:yh,randFloat:Sh,randFloatSpread:wh,seededRandom:Eh,degToRad:bh,radToDeg:Th,isPowerOfTwo:Ah,ceilPowerOfTwo:Ch,floorPowerOfTwo:Rh,setQuaternionFromProperEuler:Ph,normalize:Ie,denormalize:Ii};class ft{constructor(t=0,e=0){ft.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,i,o,r,a,c,l){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l)}set(t,e,n,i,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],S=i[1],x=i[4],w=i[7],P=i[2],R=i[5],A=i[8];return o[0]=r*_+a*S+c*P,o[3]=r*m+a*x+c*R,o[6]=r*p+a*w+c*A,o[1]=l*_+h*S+u*P,o[4]=l*m+h*x+u*R,o[7]=l*p+h*w+u*A,o[2]=d*_+f*S+g*P,o[5]=d*m+f*x+g*R,o[8]=d*p+f*w+g*A,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*o*h+n*a*c+i*o*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*r-a*l,d=a*c-h*o,f=l*o-r*c,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(a*n-i*r)*_,t[3]=d*_,t[4]=(h*e-i*c)*_,t[5]=(i*o-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(r*e-n*o)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ro.makeScale(t,e)),this}rotate(t){return this.premultiply(Ro.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ro=new $t;function zc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function io(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Lh(){const s=io("canvas");return s.style.display="block",s}const pa={};function Dh(s){s in pa||(pa[s]=!0,console.warn(s))}const ma=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),ga=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),ys={[Vn]:{transfer:Qs,primaries:to,toReference:s=>s,fromReference:s=>s},[ke]:{transfer:he,primaries:to,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[ho]:{transfer:Qs,primaries:eo,toReference:s=>s.applyMatrix3(ga),fromReference:s=>s.applyMatrix3(ma)},[yr]:{transfer:he,primaries:eo,toReference:s=>s.convertSRGBToLinear().applyMatrix3(ga),fromReference:s=>s.applyMatrix3(ma).convertLinearToSRGB()}},Ih=new Set([Vn,ho]),re={enabled:!0,_workingColorSpace:Vn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Ih.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=ys[t].toReference,i=ys[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return ys[s].primaries},getTransfer:function(s){return s===zn?Qs:ys[s].transfer}};function ki(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Po(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let mi;class Uh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{mi===void 0&&(mi=io("canvas")),mi.width=t.width,mi.height=t.height;const n=mi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=mi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=io("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=ki(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ki(e[n]/255)*255):e[n]=ki(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Nh=0;class Oc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Nh++}),this.uuid=hi(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(Lo(i[r].image)):o.push(Lo(i[r]))}else o=Lo(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function Lo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Uh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let zh=0;class ye extends li{constructor(t=ye.DEFAULT_IMAGE,e=ye.DEFAULT_MAPPING,n=wn,i=wn,o=je,r=ei,a=cn,c=Gn,l=ye.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:zh++}),this.uuid=hi(),this.name="",this.source=new Oc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ft(0,0),this.repeat=new ft(1,1),this.center=new ft(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Tc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case un:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case fr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case un:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case fr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}ye.DEFAULT_IMAGE=null;ye.DEFAULT_MAPPING=Tc;ye.DEFAULT_ANISOTROPY=1;class fe{constructor(t=0,e=0,n=0,i=1){fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,w=(f+1)/2,P=(p+1)/2,R=(h+d)/4,A=(u+_)/4,I=(g+m)/4;return x>w&&x>P?x<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(x),i=R/n,o=A/n):w>P?w<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(w),n=R/i,o=I/i):P<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(P),n=A/o,i=I/o),this.set(n,i,o,e),this}let S=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(S)<.001&&(S=1),this.x=(m-g)/S,this.y=(u-_)/S,this.z=(d-h)/S,this.w=Math.acos((l+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Oh extends li{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new fe(0,0,t,e),this.scissorTest=!1,this.viewport=new fe(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new ye(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Oc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class oi extends Oh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Fc extends ye{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Fh extends ye{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ze,this.minFilter=Ze,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ri{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=o[r+0],f=o[r+1],g=o[r+2],_=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*_,S=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const P=Math.sqrt(x),R=Math.atan2(P,p*S);m=Math.sin(m*R)/P,a=Math.sin(a*R)/P}const w=a*S;if(c=c*m+d*w,l=l*m+f*w,h=h*m+g*w,u=u*m+_*w,m===1-a){const P=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=P,l*=P,h*=P,u*=P}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=o[r],d=o[r+1],f=o[r+2],g=o[r+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(o/2),d=c(n/2),f=c(i/2),g=c(o/2);switch(r){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(o-l)*f,this._z=(r-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(o+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(o-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-i)/f,this._x=(o+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Me(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+i*l-o*c,this._y=i*h+r*c+o*a-n*l,this._z=o*h+r*l+n*c-i*a,this._w=r*h-n*a-i*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=o*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class C{constructor(t=0,e=0,n=0){C.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(_a.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(_a.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),h=2*(a*e-o*i),u=2*(o*n-r*e);return this.x=e+c*l+r*u-a*h,this.y=n+c*h+a*l-o*u,this.z=i+c*u+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-o*a,this.y=o*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Do.copy(this).projectOnVector(t),this.sub(Do)}reflect(t){return this.sub(Do.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Me(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Do=new C,_a=new ri;class _s{constructor(t=new C(1/0,1/0,1/0),e=new C(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(Qe.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(Qe.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=Qe.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,Qe):Qe.fromBufferAttribute(o,r),Qe.applyMatrix4(t.matrixWorld),this.expandByPoint(Qe);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ss.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ss.copy(n.boundingBox)),Ss.applyMatrix4(t.matrixWorld),this.union(Ss)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,Qe),Qe.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(Ji),ws.subVectors(this.max,Ji),gi.subVectors(t.a,Ji),_i.subVectors(t.b,Ji),xi.subVectors(t.c,Ji),An.subVectors(_i,gi),Cn.subVectors(xi,_i),Xn.subVectors(gi,xi);let e=[0,-An.z,An.y,0,-Cn.z,Cn.y,0,-Xn.z,Xn.y,An.z,0,-An.x,Cn.z,0,-Cn.x,Xn.z,0,-Xn.x,-An.y,An.x,0,-Cn.y,Cn.x,0,-Xn.y,Xn.x,0];return!Io(e,gi,_i,xi,ws)||(e=[1,0,0,0,1,0,0,0,1],!Io(e,gi,_i,xi,ws))?!1:(Es.crossVectors(An,Cn),e=[Es.x,Es.y,Es.z],Io(e,gi,_i,xi,ws))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,Qe).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(Qe).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _n=[new C,new C,new C,new C,new C,new C,new C,new C],Qe=new C,Ss=new _s,gi=new C,_i=new C,xi=new C,An=new C,Cn=new C,Xn=new C,Ji=new C,ws=new C,Es=new C,Yn=new C;function Io(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){Yn.fromArray(s,o);const a=i.x*Math.abs(Yn.x)+i.y*Math.abs(Yn.y)+i.z*Math.abs(Yn.z),c=t.dot(Yn),l=e.dot(Yn),h=n.dot(Yn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Bh=new _s,$i=new C,Uo=new C;class fo{constructor(t=new C,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Bh.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;$i.subVectors(t,this.center);const e=$i.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector($i,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Uo.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint($i.copy(t.center).add(Uo)),this.expandByPoint($i.copy(t.center).sub(Uo))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new C,No=new C,bs=new C,Rn=new C,zo=new C,Ts=new C,Oo=new C;class po{constructor(t=new C,e=new C(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){No.copy(t).add(e).multiplyScalar(.5),bs.copy(e).sub(t).normalize(),Rn.copy(this.origin).sub(No);const o=t.distanceTo(e)*.5,r=-this.direction.dot(bs),a=Rn.dot(this.direction),c=-Rn.dot(bs),l=Rn.lengthSq(),h=Math.abs(1-r*r);let u,d,f,g;if(h>0)if(u=r*c-a,d=r*a-c,g=o*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+r*d+2*a)+d*(r*u+d+2*c)+l}else d=o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d=-o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-r*o+a)),d=u>0?-o:Math.min(Math.max(-o,-c),o),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-o,-c),o),f=d*(d+2*c)+l):(u=Math.max(0,-(r*o+a)),d=u>0?o:Math.min(Math.max(-o,-c),o),f=-u*u+d*(d+2*c)+l);else d=r>0?-o:o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(No).addScaledVector(bs,d),f}intersectSphere(t,e){xn.subVectors(t.center,this.origin);const n=xn.dot(this.direction),i=xn.dot(xn)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(o=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(o=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,n,i,o){zo.subVectors(e,t),Ts.subVectors(n,t),Oo.crossVectors(zo,Ts);let r=this.direction.dot(Oo),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Rn.subVectors(this.origin,t);const c=a*this.direction.dot(Ts.crossVectors(Rn,Ts));if(c<0)return null;const l=a*this.direction.dot(zo.cross(Rn));if(l<0||c+l>r)return null;const h=-a*Rn.dot(Oo);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class ue{constructor(t,e,n,i,o,r,a,c,l,h,u,d,f,g,_,m){ue.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l,h,u,d,f,g,_,m)}set(t,e,n,i,o,r,a,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=o,p[5]=r,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ue().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/vi.setFromMatrixColumn(t,0).length(),o=1/vi.setFromMatrixColumn(t,1).length(),r=1/vi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(o),u=Math.sin(o);if(t.order==="XYZ"){const d=r*h,f=r*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=r*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=r*l,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=r*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*a,e[4]=-r*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=r*h,e[9]=_-d*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const d=r*h,f=r*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const d=r*c,f=r*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=r*c,f=r*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=r*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(kh,t,Hh)}lookAt(t,e,n){const i=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),Pn.crossVectors(n,Fe),Pn.lengthSq()===0&&(Math.abs(n.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),Pn.crossVectors(n,Fe)),Pn.normalize(),As.crossVectors(Fe,Pn),i[0]=Pn.x,i[4]=As.x,i[8]=Fe.x,i[1]=Pn.y,i[5]=As.y,i[9]=Fe.y,i[2]=Pn.z,i[6]=As.z,i[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],S=n[3],x=n[7],w=n[11],P=n[15],R=i[0],A=i[4],I=i[8],E=i[12],M=i[1],D=i[5],k=i[9],L=i[13],Y=i[2],z=i[6],Z=i[10],it=i[14],B=i[3],Q=i[7],st=i[11],gt=i[15];return o[0]=r*R+a*M+c*Y+l*B,o[4]=r*A+a*D+c*z+l*Q,o[8]=r*I+a*k+c*Z+l*st,o[12]=r*E+a*L+c*it+l*gt,o[1]=h*R+u*M+d*Y+f*B,o[5]=h*A+u*D+d*z+f*Q,o[9]=h*I+u*k+d*Z+f*st,o[13]=h*E+u*L+d*it+f*gt,o[2]=g*R+_*M+m*Y+p*B,o[6]=g*A+_*D+m*z+p*Q,o[10]=g*I+_*k+m*Z+p*st,o[14]=g*E+_*L+m*it+p*gt,o[3]=S*R+x*M+w*Y+P*B,o[7]=S*A+x*D+w*z+P*Q,o[11]=S*I+x*k+w*Z+P*st,o[15]=S*E+x*L+w*it+P*gt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+o*c*u-i*l*u-o*a*d+n*l*d+i*a*f-n*c*f)+_*(+e*c*f-e*l*d+o*r*d-i*r*f+i*l*h-o*c*h)+m*(+e*l*u-e*a*f-o*r*u+n*r*f+o*a*h-n*l*h)+p*(-i*a*h-e*c*u+e*a*d+i*r*u-n*r*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],S=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,x=g*d*l-h*m*l-g*c*f+r*m*f+h*c*p-r*d*p,w=h*_*l-g*u*l+g*a*f-r*_*f-h*a*p+r*u*p,P=g*u*c-h*_*c-g*a*d+r*_*d+h*a*m-r*u*m,R=e*S+n*x+i*w+o*P;if(R===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const A=1/R;return t[0]=S*A,t[1]=(_*d*o-u*m*o-_*i*f+n*m*f+u*i*p-n*d*p)*A,t[2]=(a*m*o-_*c*o+_*i*l-n*m*l-a*i*p+n*c*p)*A,t[3]=(u*c*o-a*d*o-u*i*l+n*d*l+a*i*f-n*c*f)*A,t[4]=x*A,t[5]=(h*m*o-g*d*o+g*i*f-e*m*f-h*i*p+e*d*p)*A,t[6]=(g*c*o-r*m*o-g*i*l+e*m*l+r*i*p-e*c*p)*A,t[7]=(r*d*o-h*c*o+h*i*l-e*d*l-r*i*f+e*c*f)*A,t[8]=w*A,t[9]=(g*u*o-h*_*o-g*n*f+e*_*f+h*n*p-e*u*p)*A,t[10]=(r*_*o-g*a*o+g*n*l-e*_*l-r*n*p+e*a*p)*A,t[11]=(h*a*o-r*u*o-h*n*l+e*u*l+r*n*f-e*a*f)*A,t[12]=P*A,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*m+e*u*m)*A,t[14]=(g*a*i-r*_*i-g*n*c+e*_*c+r*n*m-e*a*m)*A,t[15]=(r*u*i-h*a*i+h*n*c-e*u*c-r*n*d+e*a*d)*A,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*r,0,l*c-i*a,h*c+i*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,u=a+a,d=o*l,f=o*h,g=o*u,_=r*h,m=r*u,p=a*u,S=c*l,x=c*h,w=c*u,P=n.x,R=n.y,A=n.z;return i[0]=(1-(_+p))*P,i[1]=(f+w)*P,i[2]=(g-x)*P,i[3]=0,i[4]=(f-w)*R,i[5]=(1-(d+p))*R,i[6]=(m+S)*R,i[7]=0,i[8]=(g+x)*A,i[9]=(m-S)*A,i[10]=(1-(d+_))*A,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=vi.set(i[0],i[1],i[2]).length();const r=vi.set(i[4],i[5],i[6]).length(),a=vi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],tn.copy(this);const l=1/o,h=1/r,u=1/a;return tn.elements[0]*=l,tn.elements[1]*=l,tn.elements[2]*=l,tn.elements[4]*=h,tn.elements[5]*=h,tn.elements[6]*=h,tn.elements[8]*=u,tn.elements[9]*=u,tn.elements[10]*=u,e.setFromRotationMatrix(tn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=En){const c=this.elements,l=2*o/(e-t),h=2*o/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(a===En)f=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===no)f=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=En){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(r-o),d=(e+t)*l,f=(n+i)*h;let g,_;if(a===En)g=(r+o)*u,_=-2*u;else if(a===no)g=o*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const vi=new C,tn=new ue,kh=new C(0,0,0),Hh=new C(1,1,1),Pn=new C,As=new C,Fe=new C,xa=new ue,va=new ri;class dn{constructor(t=0,e=0,n=0,i=dn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Me(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Me(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(Me(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Me(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Me(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Me(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return xa.makeRotationFromQuaternion(t),this.setFromRotationMatrix(xa,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return va.setFromEuler(this),this.setFromQuaternion(va,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dn.DEFAULT_ORDER="XYZ";class wr{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Gh=0;const Ma=new C,Mi=new ri,vn=new ue,Cs=new C,Qi=new C,Vh=new C,Wh=new ri,ya=new C(1,0,0),Sa=new C(0,1,0),wa=new C(0,0,1),Ea={type:"added"},Xh={type:"removed"},yi={type:"childadded",child:null},Fo={type:"childremoved",child:null};class Ce extends li{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=hi(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ce.DEFAULT_UP.clone();const t=new C,e=new dn,n=new ri,i=new C(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ue},normalMatrix:{value:new $t}}),this.matrix=new ue,this.matrixWorld=new ue,this.matrixAutoUpdate=Ce.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new wr,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.multiply(Mi),this}rotateOnWorldAxis(t,e){return Mi.setFromAxisAngle(t,e),this.quaternion.premultiply(Mi),this}rotateX(t){return this.rotateOnAxis(ya,t)}rotateY(t){return this.rotateOnAxis(Sa,t)}rotateZ(t){return this.rotateOnAxis(wa,t)}translateOnAxis(t,e){return Ma.copy(t).applyQuaternion(this.quaternion),this.position.add(Ma.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(ya,t)}translateY(t){return this.translateOnAxis(Sa,t)}translateZ(t){return this.translateOnAxis(wa,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Cs.copy(t):Cs.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),Qi.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(Qi,Cs,this.up):vn.lookAt(Cs,Qi,this.up),this.quaternion.setFromRotationMatrix(vn),i&&(vn.extractRotation(i.matrixWorld),Mi.setFromRotationMatrix(vn),this.quaternion.premultiply(Mi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ea),yi.child=t,this.dispatchEvent(yi),yi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Xh),Fo.child=t,this.dispatchEvent(Fo),Fo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ea),yi.child=t,this.dispatchEvent(yi),yi.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,t,Vh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(Qi,Wh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++){const a=i[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];o(t.shapes,u)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),f=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ce.DEFAULT_UP=new C(0,1,0);Ce.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ce.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const en=new C,Mn=new C,Bo=new C,yn=new C,Si=new C,wi=new C,ba=new C,ko=new C,Ho=new C,Go=new C;class an{constructor(t=new C,e=new C,n=new C){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),en.subVectors(t,e),i.cross(en);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){en.subVectors(i,e),Mn.subVectors(n,e),Bo.subVectors(t,e);const r=en.dot(en),a=en.dot(Mn),c=en.dot(Bo),l=Mn.dot(Mn),h=Mn.dot(Bo),u=r*l-a*a;if(u===0)return o.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(r*h-a*c)*d;return o.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,i,o,r,a,c){return this.getBarycoord(t,e,n,i,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,yn.x),c.addScaledVector(r,yn.y),c.addScaledVector(a,yn.z),c)}static isFrontFacing(t,e,n,i){return en.subVectors(n,e),Mn.subVectors(t,e),en.cross(Mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return en.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),en.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return an.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return an.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,o){return an.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return an.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return an.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;Si.subVectors(i,n),wi.subVectors(o,n),ko.subVectors(t,n);const c=Si.dot(ko),l=wi.dot(ko);if(c<=0&&l<=0)return e.copy(n);Ho.subVectors(t,i);const h=Si.dot(Ho),u=wi.dot(Ho);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(Si,r);Go.subVectors(t,o);const f=Si.dot(Go),g=wi.dot(Go);if(g>=0&&f<=g)return e.copy(o);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(wi,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return ba.subVectors(o,i),a=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(ba,a);const p=1/(m+_+d);return r=_*p,a=d*p,e.copy(n).addScaledVector(Si,r).addScaledVector(wi,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Bc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function Vo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Zt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,re.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=re.workingColorSpace){return this.r=t,this.g=e,this.b=n,re.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=re.workingColorSpace){if(t=Sr(t,1),e=Me(e,0,1),n=Me(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=Vo(r,o,t+1/3),this.g=Vo(r,o,t),this.b=Vo(r,o,t-1/3)}return re.toWorkingColorSpace(this,i),this}setStyle(t,e=ke){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=Bc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ki(t.r),this.g=ki(t.g),this.b=ki(t.b),this}copyLinearToSRGB(t){return this.r=Po(t.r),this.g=Po(t.g),this.b=Po(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return re.fromWorkingColorSpace(De.copy(this),t),Math.round(Me(De.r*255,0,255))*65536+Math.round(Me(De.g*255,0,255))*256+Math.round(Me(De.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=re.workingColorSpace){re.fromWorkingColorSpace(De.copy(this),e);const n=De.r,i=De.g,o=De.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const u=r-a;switch(l=h<=.5?u/(r+a):u/(2-r-a),r){case n:c=(i-o)/u+(i<o?6:0);break;case i:c=(o-n)/u+2;break;case o:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=re.workingColorSpace){return re.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=ke){re.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,i=De.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ln),this.setHSL(Ln.h+t,Ln.s+e,Ln.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ln),t.getHSL(Rs);const n=as(Ln.h,Rs.h,e),i=as(Ln.s,Rs.s,e),o=as(Ln.l,Rs.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new Zt;Zt.NAMES=Bc;let Yh=0;class qi extends li{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Yh++}),this.uuid=hi(),this.name="",this.type="Material",this.blending=Fi,this.side=hn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=lr,this.blendDst=hr,this.blendEquation=Qn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Zt(0,0,0),this.blendAlpha=0,this.depthFunc=$s,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ha,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=pi,this.stencilZFail=pi,this.stencilZPass=pi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Fi&&(n.blending=this.blending),this.side!==hn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==lr&&(n.blendSrc=this.blendSrc),this.blendDst!==hr&&(n.blendDst=this.blendDst),this.blendEquation!==Qn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==$s&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ha&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==pi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==pi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==pi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class He extends qi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Zt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=Ec,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new C,Ps=new ft;class ln{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ua,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Dh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ps.fromBufferAttribute(this,e),Ps.applyMatrix3(t),this.setXY(e,Ps.x,Ps.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ii(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ie(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ii(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ii(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ii(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ii(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ie(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ie(e,this.array),n=Ie(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ie(e,this.array),n=Ie(n,this.array),i=Ie(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=Ie(e,this.array),n=Ie(n,this.array),i=Ie(i,this.array),o=Ie(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ua&&(t.usage=this.usage),t}}class kc extends ln{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Hc extends ln{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends ln{constructor(t,e,n){super(new Float32Array(t),e,n)}}let qh=0;const qe=new ue,Wo=new Ce,Ei=new C,Be=new _s,ts=new _s,Te=new C;class pe extends li{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:qh++}),this.uuid=hi(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(zc(t)?Hc:kc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new $t().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,n){return qe.makeTranslation(t,e,n),this.applyMatrix4(qe),this}scale(t,e,n){return qe.makeScale(t,e,n),this.applyMatrix4(qe),this}lookAt(t){return Wo.lookAt(t),Wo.updateMatrix(),this.applyMatrix4(Wo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ei).negate(),this.translate(Ei.x,Ei.y,Ei.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new oe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new _s);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new C(-1/0,-1/0,-1/0),new C(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];Be.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Be.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Be.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Be.min),this.boundingBox.expandByPoint(Be.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new fo);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new C,1/0);return}if(t){const n=this.boundingSphere.center;if(Be.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];ts.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Be.min,ts.min),Be.expandByPoint(Te),Te.addVectors(Be.max,ts.max),Be.expandByPoint(Te)):(Be.expandByPoint(ts.min),Be.expandByPoint(ts.max))}Be.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)Te.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(Te));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Te.fromBufferAttribute(a,l),c&&(Ei.fromBufferAttribute(t,l),Te.add(Ei)),i=Math.max(i,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ln(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let I=0;I<n.count;I++)a[I]=new C,c[I]=new C;const l=new C,h=new C,u=new C,d=new ft,f=new ft,g=new ft,_=new C,m=new C;function p(I,E,M){l.fromBufferAttribute(n,I),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),d.fromBufferAttribute(o,I),f.fromBufferAttribute(o,E),g.fromBufferAttribute(o,M),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const D=1/(f.x*g.y-g.x*f.y);isFinite(D)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(D),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(D),a[I].add(_),a[E].add(_),a[M].add(_),c[I].add(m),c[E].add(m),c[M].add(m))}let S=this.groups;S.length===0&&(S=[{start:0,count:t.count}]);for(let I=0,E=S.length;I<E;++I){const M=S[I],D=M.start,k=M.count;for(let L=D,Y=D+k;L<Y;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const x=new C,w=new C,P=new C,R=new C;function A(I){P.fromBufferAttribute(i,I),R.copy(P);const E=a[I];x.copy(E),x.sub(P.multiplyScalar(P.dot(E))).normalize(),w.crossVectors(R,E);const D=w.dot(c[I])<0?-1:1;r.setXYZW(I,x.x,x.y,x.z,D)}for(let I=0,E=S.length;I<E;++I){const M=S[I],D=M.start,k=M.count;for(let L=D,Y=D+k;L<Y;L+=3)A(t.getX(L+0)),A(t.getX(L+1)),A(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ln(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new C,o=new C,r=new C,a=new C,c=new C,l=new C,h=new C,u=new C;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),o.fromBufferAttribute(e,_),r.fromBufferAttribute(e,m),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),o.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new ln(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new pe,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],u=o[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ta=new ue,qn=new po,Ls=new fo,Aa=new C,bi=new C,Ti=new C,Ai=new C,Xo=new C,Ds=new C,Is=new ft,Us=new ft,Ns=new ft,Ca=new C,Ra=new C,Pa=new C,zs=new C,Os=new C;class K extends Ce{constructor(t=new pe,e=new He){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){Ds.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],u=o[c];h!==0&&(Xo.fromBufferAttribute(u,t),r?Ds.addScaledVector(Xo,h):Ds.addScaledVector(Xo.sub(e),h))}e.add(Ds)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Ls.copy(n.boundingSphere),Ls.applyMatrix4(o),qn.copy(t.ray).recast(t.near),!(Ls.containsPoint(qn.origin)===!1&&(qn.intersectSphere(Ls,Aa)===null||qn.origin.distanceToSquared(Aa)>(t.far-t.near)**2))&&(Ta.copy(o).invert(),qn.copy(t.ray).applyMatrix4(Ta),!(n.boundingBox!==null&&qn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,qn)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,d=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=r[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let w=S,P=x;w<P;w+=3){const R=a.getX(w),A=a.getX(w+1),I=a.getX(w+2);i=Fs(this,p,t,n,l,h,u,R,A,I),i&&(i.faceIndex=Math.floor(w/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=a.getX(m),x=a.getX(m+1),w=a.getX(m+2);i=Fs(this,r,t,n,l,h,u,S,x,w),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=r[m.materialIndex],S=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let w=S,P=x;w<P;w+=3){const R=w,A=w+1,I=w+2;i=Fs(this,p,t,n,l,h,u,R,A,I),i&&(i.faceIndex=Math.floor(w/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const S=m,x=m+1,w=m+2;i=Fs(this,r,t,n,l,h,u,S,x,w),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function jh(s,t,e,n,i,o,r,a){let c;if(t.side===Ae?c=n.intersectTriangle(r,o,i,!0,a):c=n.intersectTriangle(i,o,r,t.side===hn,a),c===null)return null;Os.copy(a),Os.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Os);return l<e.near||l>e.far?null:{distance:l,point:Os.clone(),object:s}}function Fs(s,t,e,n,i,o,r,a,c,l){s.getVertexPosition(a,bi),s.getVertexPosition(c,Ti),s.getVertexPosition(l,Ai);const h=jh(s,t,e,n,bi,Ti,Ai,zs);if(h){i&&(Is.fromBufferAttribute(i,a),Us.fromBufferAttribute(i,c),Ns.fromBufferAttribute(i,l),h.uv=an.getInterpolation(zs,bi,Ti,Ai,Is,Us,Ns,new ft)),o&&(Is.fromBufferAttribute(o,a),Us.fromBufferAttribute(o,c),Ns.fromBufferAttribute(o,l),h.uv1=an.getInterpolation(zs,bi,Ti,Ai,Is,Us,Ns,new ft)),r&&(Ca.fromBufferAttribute(r,a),Ra.fromBufferAttribute(r,c),Pa.fromBufferAttribute(r,l),h.normal=an.getInterpolation(zs,bi,Ti,Ai,Ca,Ra,Pa,new C),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new C,materialIndex:0};an.getNormal(bi,Ti,Ai,u.normal),h.face=u}return h}class se extends pe{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,r,o,0),g("z","y","x",1,-1,n,e,-t,r,o,1),g("x","z","y",1,1,t,n,e,i,r,2),g("x","z","y",1,-1,t,n,-e,i,r,3),g("x","y","z",1,-1,t,e,n,i,o,4),g("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(_,m,p,S,x,w,P,R,A,I,E){const M=w/A,D=P/I,k=w/2,L=P/2,Y=R/2,z=A+1,Z=I+1;let it=0,B=0;const Q=new C;for(let st=0;st<Z;st++){const gt=st*D-L;for(let Lt=0;Lt<z;Lt++){const Nt=Lt*M-k;Q[_]=Nt*S,Q[m]=gt*x,Q[p]=Y,l.push(Q.x,Q.y,Q.z),Q[_]=0,Q[m]=0,Q[p]=R>0?1:-1,h.push(Q.x,Q.y,Q.z),u.push(Lt/A),u.push(1-st/I),it+=1}}for(let st=0;st<I;st++)for(let gt=0;gt<A;gt++){const Lt=d+gt+z*st,Nt=d+gt+z*(st+1),j=d+(gt+1)+z*(st+1),ht=d+(gt+1)+z*st;c.push(Lt,Nt,ht),c.push(Nt,j,ht),B+=6}a.addGroup(f,B,E),f+=B,d+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new se(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Xi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ue(s){const t={};for(let e=0;e<s.length;e++){const n=Xi(s[e]);for(const i in n)t[i]=n[i]}return t}function Zh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Gc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:re.workingColorSpace}const Kh={clone:Xi,merge:Ue};var Jh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,$h=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends qi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Jh,this.fragmentShader=$h,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Xi(t.uniforms),this.uniformsGroups=Zh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Vc extends Ce{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ue,this.projectionMatrix=new ue,this.projectionMatrixInverse=new ue,this.coordinateSystem=En}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const Dn=new C,La=new ft,Da=new ft;class Ge extends Vc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ds*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ds*2*Math.atan(Math.tan(rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){Dn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z),Dn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(Dn.x,Dn.y).multiplyScalar(-t/Dn.z)}getViewSize(t,e){return this.getViewBounds(t,La,Da),e.subVectors(Da,La)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(rs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Ci=-90,Ri=1;class Qh extends Ce{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ge(Ci,Ri,t,e);i.layers=this.layers,this.add(i);const o=new Ge(Ci,Ri,t,e);o.layers=this.layers,this.add(o);const r=new Ge(Ci,Ri,t,e);r.layers=this.layers,this.add(r);const a=new Ge(Ci,Ri,t,e);a.layers=this.layers,this.add(a);const c=new Ge(Ci,Ri,t,e);c.layers=this.layers,this.add(c);const l=new Ge(Ci,Ri,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===no)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Wc extends ye{constructor(t,e,n,i,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Gi,super(t,e,n,i,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class tu extends oi{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Wc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new se(5,5,5),o=new bn({name:"CubemapFromEquirect",uniforms:Xi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ae,blending:kn});o.uniforms.tEquirect.value=e;const r=new K(i,o),a=e.minFilter;return e.minFilter===ei&&(e.minFilter=je),new Qh(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const Yo=new C,eu=new C,nu=new $t;class Nn{constructor(t=new C(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Yo.subVectors(n,e).cross(eu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Yo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||nu.getNormalMatrix(t),i=this.coplanarPoint(Yo).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new fo,Bs=new C;class Er{constructor(t=new Nn,e=new Nn,n=new Nn,i=new Nn,o=new Nn,r=new Nn){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=En){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],S=i[13],x=i[14],w=i[15];if(n[0].setComponents(c-o,d-l,m-f,w-p).normalize(),n[1].setComponents(c+o,d+l,m+f,w+p).normalize(),n[2].setComponents(c+r,d+h,m+g,w+S).normalize(),n[3].setComponents(c-r,d-h,m-g,w-S).normalize(),n[4].setComponents(c-a,d-u,m-_,w-x).normalize(),e===En)n[5].setComponents(c+a,d+u,m+_,w+x).normalize();else if(e===no)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(t){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(Bs.x=i.normal.x>0?t.max.x:t.min.x,Bs.y=i.normal.y>0?t.max.y:t.min.y,Bs.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(Bs)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Xc(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function iu(s){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c._updateRange,d=c.updateRanges;if(s.bindBuffer(l,a),u.count===-1&&d.length===0&&s.bufferSubData(l,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(l,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:o,update:r}}class we extends pe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const S=p*d-r;for(let x=0;x<l;x++){const w=x*u-o;g.push(w,-S,0),_.push(0,0,1),m.push(x/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let S=0;S<a;S++){const x=S+l*p,w=S+l*(p+1),P=S+1+l*(p+1),R=S+1+l*p;f.push(x,w,R),f.push(w,P,R)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new we(t.width,t.height,t.widthSegments,t.heightSegments)}}var su=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ou=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ru=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,au=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,cu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,hu=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,uu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,du=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,fu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,pu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,mu=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,gu=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,_u=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,xu=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vu=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,Mu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,wu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Eu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Au=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Cu=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Ru=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Pu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Lu=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Du=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Iu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Uu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Nu=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,zu=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Ou=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Fu=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Bu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,ku=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Hu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Gu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Vu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Wu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Xu=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Yu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qu=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,ju=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Zu=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Ku=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Ju=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,$u=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Qu=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,td=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,ed=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,nd=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,id=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,sd=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,od=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ad=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,cd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ld=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,hd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,ud=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,fd=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,pd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,md=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,gd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,_d=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,xd=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,vd=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
	#endif
	#ifdef MORPHTARGETS_TEXTURE
		#ifndef USE_INSTANCING_MORPH
			uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		#endif
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,Md=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,yd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,Sd=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,wd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ed=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,bd=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Td=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Ad=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Cd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Rd=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Pd=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Ld=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Dd=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Id=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Ud=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Nd=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Od=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Fd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Bd=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return shadow;
	}
#endif`,kd=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Hd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Gd=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Vd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Wd=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Xd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Yd=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Zd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Kd=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Jd=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,$d=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
		
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
		
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		
		#else
		
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Qd=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,tf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,nf=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const sf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,of=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,rf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,af=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,hf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,uf=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,df=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,ff=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,pf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,mf=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,gf=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,_f=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,xf=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,vf=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Mf=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,yf=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sf=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,wf=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ef=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,bf=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tf=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Af=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cf=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,Rf=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pf=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Lf=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Df=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,If=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Uf=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Nf=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,zf=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Of=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Jt={alphahash_fragment:su,alphahash_pars_fragment:ou,alphamap_fragment:ru,alphamap_pars_fragment:au,alphatest_fragment:cu,alphatest_pars_fragment:lu,aomap_fragment:hu,aomap_pars_fragment:uu,batching_pars_vertex:du,batching_vertex:fu,begin_vertex:pu,beginnormal_vertex:mu,bsdfs:gu,iridescence_fragment:_u,bumpmap_pars_fragment:xu,clipping_planes_fragment:vu,clipping_planes_pars_fragment:Mu,clipping_planes_pars_vertex:yu,clipping_planes_vertex:Su,color_fragment:wu,color_pars_fragment:Eu,color_pars_vertex:bu,color_vertex:Tu,common:Au,cube_uv_reflection_fragment:Cu,defaultnormal_vertex:Ru,displacementmap_pars_vertex:Pu,displacementmap_vertex:Lu,emissivemap_fragment:Du,emissivemap_pars_fragment:Iu,colorspace_fragment:Uu,colorspace_pars_fragment:Nu,envmap_fragment:zu,envmap_common_pars_fragment:Ou,envmap_pars_fragment:Fu,envmap_pars_vertex:Bu,envmap_physical_pars_fragment:Ku,envmap_vertex:ku,fog_vertex:Hu,fog_pars_vertex:Gu,fog_fragment:Vu,fog_pars_fragment:Wu,gradientmap_pars_fragment:Xu,lightmap_pars_fragment:Yu,lights_lambert_fragment:qu,lights_lambert_pars_fragment:ju,lights_pars_begin:Zu,lights_toon_fragment:Ju,lights_toon_pars_fragment:$u,lights_phong_fragment:Qu,lights_phong_pars_fragment:td,lights_physical_fragment:ed,lights_physical_pars_fragment:nd,lights_fragment_begin:id,lights_fragment_maps:sd,lights_fragment_end:od,logdepthbuf_fragment:rd,logdepthbuf_pars_fragment:ad,logdepthbuf_pars_vertex:cd,logdepthbuf_vertex:ld,map_fragment:hd,map_pars_fragment:ud,map_particle_fragment:dd,map_particle_pars_fragment:fd,metalnessmap_fragment:pd,metalnessmap_pars_fragment:md,morphinstance_vertex:gd,morphcolor_vertex:_d,morphnormal_vertex:xd,morphtarget_pars_vertex:vd,morphtarget_vertex:Md,normal_fragment_begin:yd,normal_fragment_maps:Sd,normal_pars_fragment:wd,normal_pars_vertex:Ed,normal_vertex:bd,normalmap_pars_fragment:Td,clearcoat_normal_fragment_begin:Ad,clearcoat_normal_fragment_maps:Cd,clearcoat_pars_fragment:Rd,iridescence_pars_fragment:Pd,opaque_fragment:Ld,packing:Dd,premultiplied_alpha_fragment:Id,project_vertex:Ud,dithering_fragment:Nd,dithering_pars_fragment:zd,roughnessmap_fragment:Od,roughnessmap_pars_fragment:Fd,shadowmap_pars_fragment:Bd,shadowmap_pars_vertex:kd,shadowmap_vertex:Hd,shadowmask_pars_fragment:Gd,skinbase_vertex:Vd,skinning_pars_vertex:Wd,skinning_vertex:Xd,skinnormal_vertex:Yd,specularmap_fragment:qd,specularmap_pars_fragment:jd,tonemapping_fragment:Zd,tonemapping_pars_fragment:Kd,transmission_fragment:Jd,transmission_pars_fragment:$d,uv_pars_fragment:Qd,uv_pars_vertex:tf,uv_vertex:ef,worldpos_vertex:nf,background_vert:sf,background_frag:of,backgroundCube_vert:rf,backgroundCube_frag:af,cube_vert:cf,cube_frag:lf,depth_vert:hf,depth_frag:uf,distanceRGBA_vert:df,distanceRGBA_frag:ff,equirect_vert:pf,equirect_frag:mf,linedashed_vert:gf,linedashed_frag:_f,meshbasic_vert:xf,meshbasic_frag:vf,meshlambert_vert:Mf,meshlambert_frag:yf,meshmatcap_vert:Sf,meshmatcap_frag:wf,meshnormal_vert:Ef,meshnormal_frag:bf,meshphong_vert:Tf,meshphong_frag:Af,meshphysical_vert:Cf,meshphysical_frag:Rf,meshtoon_vert:Pf,meshtoon_frag:Lf,points_vert:Df,points_frag:If,shadow_vert:Uf,shadow_frag:Nf,sprite_vert:zf,sprite_frag:Of},At={common:{diffuse:{value:new Zt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new ft(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Zt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Zt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Zt(16777215)},opacity:{value:1},center:{value:new ft(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},rn={basic:{uniforms:Ue([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ue([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ue([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new Zt(0)},specular:{value:new Zt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ue([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new Zt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ue([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new Zt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ue([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ue([At.points,At.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ue([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ue([At.common,At.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ue([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ue([At.sprite,At.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ue([At.common,At.displacementmap,{referencePosition:{value:new C},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ue([At.lights,At.fog,{color:{value:new Zt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};rn.physical={uniforms:Ue([rn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new ft(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Zt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new ft},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Zt(0)},specularColor:{value:new Zt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new ft},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const ks={r:0,b:0,g:0},Zn=new dn,Ff=new ue;function Bf(s,t,e,n,i,o,r){const a=new Zt(0);let c=o===!0?0:1,l,h,u=null,d=0,f=null;function g(S){let x=S.isScene===!0?S.background:null;return x&&x.isTexture&&(x=(S.backgroundBlurriness>0?e:t).get(x)),x}function _(S){let x=!1;const w=g(S);w===null?p(a,c):w&&w.isColor&&(p(w,1),x=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,r):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil)}function m(S,x){const w=g(x);w&&(w.isCubeTexture||w.mapping===co)?(h===void 0&&(h=new K(new se(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Xi(rn.backgroundCube.uniforms),vertexShader:rn.backgroundCube.vertexShader,fragmentShader:rn.backgroundCube.fragmentShader,side:Ae,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(P,R,A){this.matrixWorld.copyPosition(A.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Zn.copy(x.backgroundRotation),Zn.x*=-1,Zn.y*=-1,Zn.z*=-1,w.isCubeTexture&&w.isRenderTargetTexture===!1&&(Zn.y*=-1,Zn.z*=-1),h.material.uniforms.envMap.value=w,h.material.uniforms.flipEnvMap.value=w.isCubeTexture&&w.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(Ff.makeRotationFromEuler(Zn)),h.material.toneMapped=re.getTransfer(w.colorSpace)!==he,(u!==w||d!==w.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=w,d=w.version,f=s.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):w&&w.isTexture&&(l===void 0&&(l=new K(new we(2,2),new bn({name:"BackgroundMaterial",uniforms:Xi(rn.background.uniforms),vertexShader:rn.background.vertexShader,fragmentShader:rn.background.fragmentShader,side:hn,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=w,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=re.getTransfer(w.colorSpace)!==he,w.matrixAutoUpdate===!0&&w.updateMatrix(),l.material.uniforms.uvTransform.value.copy(w.matrix),(u!==w||d!==w.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=w,d=w.version,f=s.toneMapping),l.layers.enableAll(),S.unshift(l,l.geometry,l.material,0,0,null))}function p(S,x){S.getRGB(ks,Gc(s)),n.buffers.color.setClear(ks.r,ks.g,ks.b,x,r)}return{getClearColor:function(){return a},setClearColor:function(S,x=1){a.set(S),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(S){c=S,p(a,c)},render:_,addToRenderList:m}}function kf(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let o=i,r=!1;function a(M,D,k,L,Y){let z=!1;const Z=u(L,k,D);o!==Z&&(o=Z,l(o.object)),z=f(M,L,k,Y),z&&g(M,L,k,Y),Y!==null&&t.update(Y,s.ELEMENT_ARRAY_BUFFER),(z||r)&&(r=!1,w(M,D,k,L),Y!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(Y).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,D,k){const L=k.wireframe===!0;let Y=n[M.id];Y===void 0&&(Y={},n[M.id]=Y);let z=Y[D.id];z===void 0&&(z={},Y[D.id]=z);let Z=z[L];return Z===void 0&&(Z=d(c()),z[L]=Z),Z}function d(M){const D=[],k=[],L=[];for(let Y=0;Y<e;Y++)D[Y]=0,k[Y]=0,L[Y]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:k,attributeDivisors:L,object:M,attributes:{},index:null}}function f(M,D,k,L){const Y=o.attributes,z=D.attributes;let Z=0;const it=k.getAttributes();for(const B in it)if(it[B].location>=0){const st=Y[B];let gt=z[B];if(gt===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(gt=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(gt=M.instanceColor)),st===void 0||st.attribute!==gt||gt&&st.data!==gt.data)return!0;Z++}return o.attributesNum!==Z||o.index!==L}function g(M,D,k,L){const Y={},z=D.attributes;let Z=0;const it=k.getAttributes();for(const B in it)if(it[B].location>=0){let st=z[B];st===void 0&&(B==="instanceMatrix"&&M.instanceMatrix&&(st=M.instanceMatrix),B==="instanceColor"&&M.instanceColor&&(st=M.instanceColor));const gt={};gt.attribute=st,st&&st.data&&(gt.data=st.data),Y[B]=gt,Z++}o.attributes=Y,o.attributesNum=Z,o.index=L}function _(){const M=o.newAttributes;for(let D=0,k=M.length;D<k;D++)M[D]=0}function m(M){p(M,0)}function p(M,D){const k=o.newAttributes,L=o.enabledAttributes,Y=o.attributeDivisors;k[M]=1,L[M]===0&&(s.enableVertexAttribArray(M),L[M]=1),Y[M]!==D&&(s.vertexAttribDivisor(M,D),Y[M]=D)}function S(){const M=o.newAttributes,D=o.enabledAttributes;for(let k=0,L=D.length;k<L;k++)D[k]!==M[k]&&(s.disableVertexAttribArray(k),D[k]=0)}function x(M,D,k,L,Y,z,Z){Z===!0?s.vertexAttribIPointer(M,D,k,Y,z):s.vertexAttribPointer(M,D,k,L,Y,z)}function w(M,D,k,L){_();const Y=L.attributes,z=k.getAttributes(),Z=D.defaultAttributeValues;for(const it in z){const B=z[it];if(B.location>=0){let Q=Y[it];if(Q===void 0&&(it==="instanceMatrix"&&M.instanceMatrix&&(Q=M.instanceMatrix),it==="instanceColor"&&M.instanceColor&&(Q=M.instanceColor)),Q!==void 0){const st=Q.normalized,gt=Q.itemSize,Lt=t.get(Q);if(Lt===void 0)continue;const Nt=Lt.buffer,j=Lt.type,ht=Lt.bytesPerElement,Et=j===s.INT||j===s.UNSIGNED_INT||Q.gpuType===Cc;if(Q.isInterleavedBufferAttribute){const mt=Q.data,Ft=mt.stride,zt=Q.offset;if(mt.isInstancedInterleavedBuffer){for(let U=0;U<B.locationSize;U++)p(B.location+U,mt.meshPerAttribute);M.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=mt.meshPerAttribute*mt.count)}else for(let U=0;U<B.locationSize;U++)m(B.location+U);s.bindBuffer(s.ARRAY_BUFFER,Nt);for(let U=0;U<B.locationSize;U++)x(B.location+U,gt/B.locationSize,j,st,Ft*ht,(zt+gt/B.locationSize*U)*ht,Et)}else{if(Q.isInstancedBufferAttribute){for(let mt=0;mt<B.locationSize;mt++)p(B.location+mt,Q.meshPerAttribute);M.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=Q.meshPerAttribute*Q.count)}else for(let mt=0;mt<B.locationSize;mt++)m(B.location+mt);s.bindBuffer(s.ARRAY_BUFFER,Nt);for(let mt=0;mt<B.locationSize;mt++)x(B.location+mt,gt/B.locationSize,j,st,gt*ht,gt/B.locationSize*mt*ht,Et)}}else if(Z!==void 0){const st=Z[it];if(st!==void 0)switch(st.length){case 2:s.vertexAttrib2fv(B.location,st);break;case 3:s.vertexAttrib3fv(B.location,st);break;case 4:s.vertexAttrib4fv(B.location,st);break;default:s.vertexAttrib1fv(B.location,st)}}}}S()}function P(){I();for(const M in n){const D=n[M];for(const k in D){const L=D[k];for(const Y in L)h(L[Y].object),delete L[Y];delete D[k]}delete n[M]}}function R(M){if(n[M.id]===void 0)return;const D=n[M.id];for(const k in D){const L=D[k];for(const Y in L)h(L[Y].object),delete L[Y];delete D[k]}delete n[M.id]}function A(M){for(const D in n){const k=n[D];if(k[M.id]===void 0)continue;const L=k[M.id];for(const Y in L)h(L[Y].object),delete L[Y];delete k[M.id]}}function I(){E(),r=!0,o!==i&&(o=i,l(o.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:I,resetDefaultState:E,dispose:P,releaseStatesOfGeometry:R,releaseStatesOfProgram:A,initAttributes:_,enableAttribute:m,disableUnusedAttributes:S}}function Hf(s,t,e){let n;function i(l){n=l}function o(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<u;f++)this.render(l[f],h[f]);else{d.multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)r(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)e.update(g,n,d[_])}}this.setMode=i,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Gf(s,t,e,n){let i;function o(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const R=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(R){return!(R!==cn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(R){const A=R===lo&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(R!==Gn&&n.convert(R)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&R!==Fn&&!A)}function c(R){if(R==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";R="mediump"}return R==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),S=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),w=f>0,P=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:S,maxFragmentUniforms:x,vertexTextures:w,maxSamples:P}}function Vf(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new Nn,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||o&&!m)o?h(null):l();else{const S=o?0:n,x=S*4;let w=p.clippingState||null;c.value=w,w=h(g,d,x,f);for(let P=0;P!==x;++P)w[P]=e[P];p.clippingState=w,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=S}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,S=d.matrixWorldInverse;a.getNormalMatrix(S),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,w=f;x!==_;++x,w+=4)r.copy(u[x]).applyMatrix4(S,a),r.normal.toArray(m,w),m[w+3]=r.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Wf(s){let t=new WeakMap;function e(r,a){return a===ur?r.mapping=Gi:a===dr&&(r.mapping=Vi),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===ur||a===dr)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new tu(c.height);return l.fromEquirectangularTexture(s,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Yc extends Vc{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ni=4,Ia=[.125,.215,.35,.446,.526,.582],ti=20,qo=new Yc,Ua=new Zt;let jo=null,Zo=0,Ko=0,Jo=!1;const $n=(1+Math.sqrt(5))/2,Pi=1/$n,Na=[new C(-$n,Pi,0),new C($n,Pi,0),new C(-Pi,0,$n),new C(Pi,0,$n),new C(0,$n,-Pi),new C(0,$n,Pi),new C(-1,1,-1),new C(1,1,-1),new C(-1,1,1),new C(1,1,1)];class za{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){jo=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),Jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ba(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Fa(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(jo,Zo,Ko),this._renderer.xr.enabled=Jo,t.scissorTest=!1,Hs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Gi||t.mapping===Vi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jo=this._renderer.getRenderTarget(),Zo=this._renderer.getActiveCubeFace(),Ko=this._renderer.getActiveMipmapLevel(),Jo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:lo,format:cn,colorSpace:Vn,depthBuffer:!1},i=Oa(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Oa(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Xf(o)),this._blurMaterial=Yf(o,t,e)}return i}_compileMaterial(t){const e=new K(this._lodPlanes[0],t);this._renderer.compile(e,qo)}_sceneToCubeUV(t,e,n,i){const a=new Ge(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(Ua),h.toneMapping=Hn,h.autoClear=!1;const f=new He({name:"PMREM.Background",side:Ae,depthWrite:!1,depthTest:!1}),g=new K(new se,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(Ua),_=!0);for(let p=0;p<6;p++){const S=p%3;S===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):S===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const x=this._cubeSize;Hs(i,S*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Gi||t.mapping===Vi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ba()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Fa());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new K(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;Hs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,qo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Na[(i-o-1)%Na.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new K(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*ti-1),_=o/g,m=isFinite(o)?1+Math.floor(h*_):ti;m>ti&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ti}`);const p=[];let S=0;for(let A=0;A<ti;++A){const I=A/_,E=Math.exp(-I*I/2);p.push(E),A===0?S+=E:A<m&&(S+=2*E)}for(let A=0;A<p.length;A++)p[A]=p[A]/S;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const w=this._sizeLods[i],P=3*w*(i>x-Ni?i-x+Ni:0),R=4*(this._cubeSize-w);Hs(e,P,R,3*w,2*w),c.setRenderTarget(e),c.render(u,qo)}}function Xf(s){const t=[],e=[],n=[];let i=s;const o=s-Ni+1+Ia.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let c=1/a;r>s-Ni?c=Ia[r-s+Ni-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,S=new Float32Array(_*g*f),x=new Float32Array(m*g*f),w=new Float32Array(p*g*f);for(let R=0;R<f;R++){const A=R%3*2/3-1,I=R>2?0:-1,E=[A,I,0,A+2/3,I,0,A+2/3,I+1,0,A,I,0,A+2/3,I+1,0,A,I+1,0];S.set(E,_*g*R),x.set(d,m*g*R);const M=[R,R,R,R,R,R];w.set(M,p*g*R)}const P=new pe;P.setAttribute("position",new ln(S,_)),P.setAttribute("uv",new ln(x,m)),P.setAttribute("faceIndex",new ln(w,p)),t.push(P),i>Ni&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Oa(s,t,e){const n=new oi(s,t,e);return n.texture.mapping=co,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Hs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Yf(s,t,e){const n=new Float32Array(ti),i=new C(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:ti,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Fa(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function Ba(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:br(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:kn,depthTest:!1,depthWrite:!1})}function br(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qf(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===ur||c===dr,h=c===Gi||c===Vi;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new za(s)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new za(s)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function jf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Zf(s,t,e,n){const i={},o=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",r),delete i[d.id];const f=o.get(d);f&&(t.remove(f),o.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],s.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const S=f.array;_=f.version;for(let x=0,w=S.length;x<w;x+=3){const P=S[x+0],R=S[x+1],A=S[x+2];d.push(P,R,R,A,A,P)}}else if(g!==void 0){const S=g.array;_=g.version;for(let x=0,w=S.length/3-1;x<w;x+=3){const P=x+0,R=x+1,A=x+2;d.push(P,R,R,A,A,P)}}else return;const m=new(zc(d)?Hc:kc)(d,1);m.version=_;const p=o.get(u);p&&t.remove(p),o.set(u,m)}function h(u){const d=o.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return o.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function Kf(s,t,e){let n;function i(d){n=d}let o,r;function a(d){o=d.type,r=d.bytesPerElement}function c(d,f){s.drawElements(n,f,o,d*r),e.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,o,d*r,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<g;m++)this.render(d[m]/r,f[m]);else{_.multiDrawElementsWEBGL(n,f,0,o,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/r,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,o,d,0,_,0,g);let p=0;for(let S=0;S<g;S++)p+=f[S];for(let S=0;S<_.length;S++)e.update(p,n,_[S])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Jf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function $f(s,t,e){const n=new WeakMap,i=new fe;function o(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],S=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let w=0;g===!0&&(w=1),_===!0&&(w=2),m===!0&&(w=3);let P=a.attributes.position.count*w,R=1;P>t.maxTextureSize&&(R=Math.ceil(P/t.maxTextureSize),P=t.maxTextureSize);const A=new Float32Array(P*R*4*u),I=new Fc(A,P,R,u);I.type=Fn,I.needsUpdate=!0;const E=w*4;for(let D=0;D<u;D++){const k=p[D],L=S[D],Y=x[D],z=P*R*4*D;for(let Z=0;Z<k.count;Z++){const it=Z*E;g===!0&&(i.fromBufferAttribute(k,Z),A[z+it+0]=i.x,A[z+it+1]=i.y,A[z+it+2]=i.z,A[z+it+3]=0),_===!0&&(i.fromBufferAttribute(L,Z),A[z+it+4]=i.x,A[z+it+5]=i.y,A[z+it+6]=i.z,A[z+it+7]=0),m===!0&&(i.fromBufferAttribute(Y,Z),A[z+it+8]=i.x,A[z+it+9]=i.y,A[z+it+10]=i.z,A[z+it+11]=Y.itemSize===4?i.w:1)}}d={count:u,texture:I,size:new ft(P,R)},n.set(a,d),a.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",r.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:o}}function Qf(s,t,e,n){let i=new WeakMap;function o(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}class qc extends ye{constructor(t,e,n,i,o,r,a,c,l,h){if(h=h!==void 0?h:Bi,h!==Bi&&h!==us)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===Bi&&(n=Wi),n===void 0&&h===us&&(n=gs),super(null,i,o,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ze,this.minFilter=c!==void 0?c:Ze,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const jc=new ye,Zc=new qc(1,1);Zc.compareFunction=Nc;const Kc=new Fc,Jc=new Fh,$c=new Wc,ka=[],Ha=[],Ga=new Float32Array(16),Va=new Float32Array(9),Wa=new Float32Array(4);function ji(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=ka[i];if(o===void 0&&(o=new Float32Array(i),ka[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function Ee(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function be(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function mo(s,t){let e=Ha[t];e===void 0&&(e=new Int32Array(t),Ha[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function tp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ep(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2fv(this.addr,t),be(e,t)}}function np(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;s.uniform3fv(this.addr,t),be(e,t)}}function ip(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4fv(this.addr,t),be(e,t)}}function sp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Wa.set(n),s.uniformMatrix2fv(this.addr,!1,Wa),be(e,n)}}function op(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Va.set(n),s.uniformMatrix3fv(this.addr,!1,Va),be(e,n)}}function rp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Ga.set(n),s.uniformMatrix4fv(this.addr,!1,Ga),be(e,n)}}function ap(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function cp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2iv(this.addr,t),be(e,t)}}function lp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3iv(this.addr,t),be(e,t)}}function hp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4iv(this.addr,t),be(e,t)}}function up(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2uiv(this.addr,t),be(e,t)}}function fp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3uiv(this.addr,t),be(e,t)}}function pp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4uiv(this.addr,t),be(e,t)}}function mp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const o=this.type===s.SAMPLER_2D_SHADOW?Zc:jc;e.setTexture2D(t||o,i)}function gp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Jc,i)}function _p(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||$c,i)}function xp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Kc,i)}function vp(s){switch(s){case 5126:return tp;case 35664:return ep;case 35665:return np;case 35666:return ip;case 35674:return sp;case 35675:return op;case 35676:return rp;case 5124:case 35670:return ap;case 35667:case 35671:return cp;case 35668:case 35672:return lp;case 35669:case 35673:return hp;case 5125:return up;case 36294:return dp;case 36295:return fp;case 36296:return pp;case 35678:case 36198:case 36298:case 36306:case 35682:return mp;case 35679:case 36299:case 36307:return gp;case 35680:case 36300:case 36308:case 36293:return _p;case 36289:case 36303:case 36311:case 36292:return xp}}function Mp(s,t){s.uniform1fv(this.addr,t)}function yp(s,t){const e=ji(t,this.size,2);s.uniform2fv(this.addr,e)}function Sp(s,t){const e=ji(t,this.size,3);s.uniform3fv(this.addr,e)}function wp(s,t){const e=ji(t,this.size,4);s.uniform4fv(this.addr,e)}function Ep(s,t){const e=ji(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function bp(s,t){const e=ji(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Tp(s,t){const e=ji(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Ap(s,t){s.uniform1iv(this.addr,t)}function Cp(s,t){s.uniform2iv(this.addr,t)}function Rp(s,t){s.uniform3iv(this.addr,t)}function Pp(s,t){s.uniform4iv(this.addr,t)}function Lp(s,t){s.uniform1uiv(this.addr,t)}function Dp(s,t){s.uniform2uiv(this.addr,t)}function Ip(s,t){s.uniform3uiv(this.addr,t)}function Up(s,t){s.uniform4uiv(this.addr,t)}function Np(s,t,e){const n=this.cache,i=t.length,o=mo(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||jc,o[r])}function zp(s,t,e){const n=this.cache,i=t.length,o=mo(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Jc,o[r])}function Op(s,t,e){const n=this.cache,i=t.length,o=mo(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||$c,o[r])}function Fp(s,t,e){const n=this.cache,i=t.length,o=mo(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Kc,o[r])}function Bp(s){switch(s){case 5126:return Mp;case 35664:return yp;case 35665:return Sp;case 35666:return wp;case 35674:return Ep;case 35675:return bp;case 35676:return Tp;case 5124:case 35670:return Ap;case 35667:case 35671:return Cp;case 35668:case 35672:return Rp;case 35669:case 35673:return Pp;case 5125:return Lp;case 36294:return Dp;case 36295:return Ip;case 36296:return Up;case 35678:case 36198:case 36298:case 36306:case 35682:return Np;case 35679:case 36299:case 36307:return zp;case 35680:case 36300:case 36308:case 36293:return Op;case 36289:case 36303:case 36311:case 36292:return Fp}}class kp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=vp(e.type)}}class Hp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Bp(e.type)}}class Gp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const $o=/(\w+)(\])?(\[|\.)?/g;function Xa(s,t){s.seq.push(t),s.map[t.id]=t}function Vp(s,t,e){const n=s.name,i=n.length;for($o.lastIndex=0;;){const o=$o.exec(n),r=$o.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){Xa(e,l===void 0?new kp(a,s,t):new Hp(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Gp(a),Xa(e,u)),e=u}}}class Zs{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);Vp(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function Ya(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Wp=37297;let Xp=0;function Yp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function qp(s){const t=re.getPrimaries(re.workingColorSpace),e=re.getPrimaries(s);let n;switch(t===e?n="":t===eo&&e===to?n="LinearDisplayP3ToLinearSRGB":t===to&&e===eo&&(n="LinearSRGBToLinearDisplayP3"),s){case Vn:case ho:return[n,"LinearTransferOETF"];case ke:case yr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function qa(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+Yp(s.getShaderSource(t),r)}else return i}function jp(s,t){const e=qp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Zp(s,t){let e;switch(t){case Gl:e="Linear";break;case Vl:e="Reinhard";break;case Wl:e="OptimizedCineon";break;case bc:e="ACESFilmic";break;case Yl:e="AgX";break;case ql:e="Neutral";break;case Xl:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Kp(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(ss).join(`
`)}function Jp(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function $p(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function ss(s){return s!==""}function ja(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Za(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Qp=/^[ \t]*#include +<([\w\d./]+)>/gm;function pr(s){return s.replace(Qp,em)}const tm=new Map;function em(s,t){let e=Jt[t];if(e===void 0){const n=tm.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return pr(e)}const nm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ka(s){return s.replace(nm,im)}function im(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function Ja(s){let t=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function sm(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Sc?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===wc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Sn&&(t="SHADOWMAP_TYPE_VSM"),t}function om(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Gi:case Vi:t="ENVMAP_TYPE_CUBE";break;case co:t="ENVMAP_TYPE_CUBE_UV";break}return t}function rm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Vi:t="ENVMAP_MODE_REFRACTION";break}return t}function am(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Ec:t="ENVMAP_BLENDING_MULTIPLY";break;case kl:t="ENVMAP_BLENDING_MIX";break;case Hl:t="ENVMAP_BLENDING_ADD";break}return t}function cm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function lm(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=sm(e),l=om(e),h=rm(e),u=am(e),d=cm(e),f=Kp(e),g=Jp(o),_=i.createProgram();let m,p,S=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ss).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(ss).join(`
`),p.length>0&&(p+=`
`)):(m=[Ja(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(ss).join(`
`),p=[Ja(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Hn?"#define TONE_MAPPING":"",e.toneMapping!==Hn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Hn?Zp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,jp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(ss).join(`
`)),r=pr(r),r=ja(r,e),r=Za(r,e),a=pr(a),a=ja(a,e),a=Za(a,e),r=Ka(r),a=Ka(a),e.isRawShaderMaterial!==!0&&(S=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===da?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===da?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=S+m+r,w=S+p+a,P=Ya(i,i.VERTEX_SHADER,x),R=Ya(i,i.FRAGMENT_SHADER,w);i.attachShader(_,P),i.attachShader(_,R),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function A(D){if(s.debug.checkShaderErrors){const k=i.getProgramInfoLog(_).trim(),L=i.getShaderInfoLog(P).trim(),Y=i.getShaderInfoLog(R).trim();let z=!0,Z=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(z=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,P,R);else{const it=qa(i,P,"vertex"),B=qa(i,R,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+D.name+`
Material Type: `+D.type+`

Program Info Log: `+k+`
`+it+`
`+B)}else k!==""?console.warn("THREE.WebGLProgram: Program Info Log:",k):(L===""||Y==="")&&(Z=!1);Z&&(D.diagnostics={runnable:z,programLog:k,vertexShader:{log:L,prefix:m},fragmentShader:{log:Y,prefix:p}})}i.deleteShader(P),i.deleteShader(R),I=new Zs(i,_),E=$p(i,_)}let I;this.getUniforms=function(){return I===void 0&&A(this),I};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Wp)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Xp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=P,this.fragmentShader=R,this}let hm=0;class um{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new dm(t),e.set(t,n)),n}}class dm{constructor(t){this.id=hm++,this.code=t,this.usedTimes=0}}function fm(s,t,e,n,i,o,r){const a=new wr,c=new um,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,M,D,k,L){const Y=k.fog,z=L.geometry,Z=E.isMeshStandardMaterial?k.environment:null,it=(E.isMeshStandardMaterial?e:t).get(E.envMap||Z),B=it&&it.mapping===co?it.image.height:null,Q=g[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const st=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,gt=st!==void 0?st.length:0;let Lt=0;z.morphAttributes.position!==void 0&&(Lt=1),z.morphAttributes.normal!==void 0&&(Lt=2),z.morphAttributes.color!==void 0&&(Lt=3);let Nt,j,ht,Et;if(Q){const Kt=rn[Q];Nt=Kt.vertexShader,j=Kt.fragmentShader}else Nt=E.vertexShader,j=E.fragmentShader,c.update(E),ht=c.getVertexShaderID(E),Et=c.getFragmentShaderID(E);const mt=s.getRenderTarget(),Ft=L.isInstancedMesh===!0,zt=L.isBatchedMesh===!0,U=!!E.map,Gt=!!E.matcap,$=!!it,ut=!!E.aoMap,et=!!E.lightMap,J=!!E.bumpMap,W=!!E.normalMap,at=!!E.displacementMap,yt=!!E.emissiveMap,T=!!E.metalnessMap,y=!!E.roughnessMap,F=E.anisotropy>0,X=E.clearcoat>0,ot=E.dispersion>0,tt=E.iridescence>0,bt=E.sheen>0,pt=E.transmission>0,ct=F&&!!E.anisotropyMap,Ct=X&&!!E.clearcoatMap,_t=X&&!!E.clearcoatNormalMap,xt=X&&!!E.clearcoatRoughnessMap,St=tt&&!!E.iridescenceMap,Tt=tt&&!!E.iridescenceThicknessMap,dt=bt&&!!E.sheenColorMap,It=bt&&!!E.sheenRoughnessMap,Vt=!!E.specularMap,Ot=!!E.specularColorMap,Wt=!!E.specularIntensityMap,v=pt&&!!E.transmissionMap,O=pt&&!!E.thicknessMap,H=!!E.gradientMap,lt=!!E.alphaMap,vt=E.alphaTest>0,kt=!!E.alphaHash,Xt=!!E.extensions;let ie=Hn;E.toneMapped&&(mt===null||mt.isXRRenderTarget===!0)&&(ie=s.toneMapping);const ae={shaderID:Q,shaderType:E.type,shaderName:E.name,vertexShader:Nt,fragmentShader:j,defines:E.defines,customVertexShaderID:ht,customFragmentShaderID:Et,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:zt,instancing:Ft,instancingColor:Ft&&L.instanceColor!==null,instancingMorph:Ft&&L.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:mt===null?s.outputColorSpace:mt.isXRRenderTarget===!0?mt.texture.colorSpace:Vn,alphaToCoverage:!!E.alphaToCoverage,map:U,matcap:Gt,envMap:$,envMapMode:$&&it.mapping,envMapCubeUVHeight:B,aoMap:ut,lightMap:et,bumpMap:J,normalMap:W,displacementMap:d&&at,emissiveMap:yt,normalMapObjectSpace:W&&E.normalMapType===ah,normalMapTangentSpace:W&&E.normalMapType===Uc,metalnessMap:T,roughnessMap:y,anisotropy:F,anisotropyMap:ct,clearcoat:X,clearcoatMap:Ct,clearcoatNormalMap:_t,clearcoatRoughnessMap:xt,dispersion:ot,iridescence:tt,iridescenceMap:St,iridescenceThicknessMap:Tt,sheen:bt,sheenColorMap:dt,sheenRoughnessMap:It,specularMap:Vt,specularColorMap:Ot,specularIntensityMap:Wt,transmission:pt,transmissionMap:v,thicknessMap:O,gradientMap:H,opaque:E.transparent===!1&&E.blending===Fi&&E.alphaToCoverage===!1,alphaMap:lt,alphaTest:vt,alphaHash:kt,combine:E.combine,mapUv:U&&_(E.map.channel),aoMapUv:ut&&_(E.aoMap.channel),lightMapUv:et&&_(E.lightMap.channel),bumpMapUv:J&&_(E.bumpMap.channel),normalMapUv:W&&_(E.normalMap.channel),displacementMapUv:at&&_(E.displacementMap.channel),emissiveMapUv:yt&&_(E.emissiveMap.channel),metalnessMapUv:T&&_(E.metalnessMap.channel),roughnessMapUv:y&&_(E.roughnessMap.channel),anisotropyMapUv:ct&&_(E.anisotropyMap.channel),clearcoatMapUv:Ct&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:_t&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:xt&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:dt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:It&&_(E.sheenRoughnessMap.channel),specularMapUv:Vt&&_(E.specularMap.channel),specularColorMapUv:Ot&&_(E.specularColorMap.channel),specularIntensityMapUv:Wt&&_(E.specularIntensityMap.channel),transmissionMapUv:v&&_(E.transmissionMap.channel),thicknessMapUv:O&&_(E.thicknessMap.channel),alphaMapUv:lt&&_(E.alphaMap.channel),vertexTangents:!!z.attributes.tangent&&(W||F),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!z.attributes.uv&&(U||lt),fog:!!Y,useFog:E.fog===!0,fogExp2:!!Y&&Y.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:L.isSkinnedMesh===!0,morphTargets:z.morphAttributes.position!==void 0,morphNormals:z.morphAttributes.normal!==void 0,morphColors:z.morphAttributes.color!==void 0,morphTargetsCount:gt,morphTextureStride:Lt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&D.length>0,shadowMapType:s.shadowMap.type,toneMapping:ie,useLegacyLights:s._useLegacyLights,decodeVideoTexture:U&&E.map.isVideoTexture===!0&&re.getTransfer(E.map.colorSpace)===he,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ve,flipSided:E.side===Ae,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Xt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Xt&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return ae.vertexUv1s=l.has(1),ae.vertexUv2s=l.has(2),ae.vertexUv3s=l.has(3),l.clear(),ae}function p(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const D in E.defines)M.push(D),M.push(E.defines[D]);return E.isRawShaderMaterial===!1&&(S(M,E),x(M,E),M.push(s.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function S(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function x(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.alphaToCoverage&&a.enable(20),E.push(a.mask)}function w(E){const M=g[E.type];let D;if(M){const k=rn[M];D=Kh.clone(k.uniforms)}else D=E.uniforms;return D}function P(E,M){let D;for(let k=0,L=h.length;k<L;k++){const Y=h[k];if(Y.cacheKey===M){D=Y,++D.usedTimes;break}}return D===void 0&&(D=new lm(s,M,E,o),h.push(D)),D}function R(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function A(E){c.remove(E)}function I(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:w,acquireProgram:P,releaseProgram:R,releaseShaderCache:A,programs:h,dispose:I}}function pm(){let s=new WeakMap;function t(o){let r=s.get(o);return r===void 0&&(r={},s.set(o,r)),r}function e(o){s.delete(o)}function n(o,r,a){s.get(o)[r]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function mm(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function $a(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Qa(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(u,d,f,g,_,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,d,f,g,_,m){const p=r(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(u,d,f,g,_,m){const p=r(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||mm),n.length>1&&n.sort(d||$a),i.length>1&&i.sort(d||$a)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:c,finish:h,sort:l}}function gm(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new Qa,s.set(n,[r])):i>=o.length?(r=new Qa,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function _m(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new C,color:new Zt};break;case"SpotLight":e={position:new C,direction:new C,color:new Zt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new C,color:new Zt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new C,skyColor:new Zt,groundColor:new Zt};break;case"RectAreaLight":e={color:new Zt,position:new C,halfWidth:new C,halfHeight:new C};break}return s[t.id]=e,e}}}function xm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ft,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let vm=0;function Mm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function ym(s){const t=new _m,e=xm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new C);const i=new C,o=new ue,r=new ue;function a(l,h){let u=0,d=0,f=0;for(let D=0;D<9;D++)n.probe[D].set(0,0,0);let g=0,_=0,m=0,p=0,S=0,x=0,w=0,P=0,R=0,A=0,I=0;l.sort(Mm);const E=h===!0?Math.PI:1;for(let D=0,k=l.length;D<k;D++){const L=l[D],Y=L.color,z=L.intensity,Z=L.distance,it=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=Y.r*z*E,d+=Y.g*z*E,f+=Y.b*z*E;else if(L.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(L.sh.coefficients[B],z);I++}else if(L.isDirectionalLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity*E),L.castShadow){const Q=L.shadow,st=e.get(L);st.shadowBias=Q.bias,st.shadowNormalBias=Q.normalBias,st.shadowRadius=Q.radius,st.shadowMapSize=Q.mapSize,n.directionalShadow[g]=st,n.directionalShadowMap[g]=it,n.directionalShadowMatrix[g]=L.shadow.matrix,x++}n.directional[g]=B,g++}else if(L.isSpotLight){const B=t.get(L);B.position.setFromMatrixPosition(L.matrixWorld),B.color.copy(Y).multiplyScalar(z*E),B.distance=Z,B.coneCos=Math.cos(L.angle),B.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),B.decay=L.decay,n.spot[m]=B;const Q=L.shadow;if(L.map&&(n.spotLightMap[R]=L.map,R++,Q.updateMatrices(L),L.castShadow&&A++),n.spotLightMatrix[m]=Q.matrix,L.castShadow){const st=e.get(L);st.shadowBias=Q.bias,st.shadowNormalBias=Q.normalBias,st.shadowRadius=Q.radius,st.shadowMapSize=Q.mapSize,n.spotShadow[m]=st,n.spotShadowMap[m]=it,P++}m++}else if(L.isRectAreaLight){const B=t.get(L);B.color.copy(Y).multiplyScalar(z),B.halfWidth.set(L.width*.5,0,0),B.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=B,p++}else if(L.isPointLight){const B=t.get(L);if(B.color.copy(L.color).multiplyScalar(L.intensity*E),B.distance=L.distance,B.decay=L.decay,L.castShadow){const Q=L.shadow,st=e.get(L);st.shadowBias=Q.bias,st.shadowNormalBias=Q.normalBias,st.shadowRadius=Q.radius,st.shadowMapSize=Q.mapSize,st.shadowCameraNear=Q.camera.near,st.shadowCameraFar=Q.camera.far,n.pointShadow[_]=st,n.pointShadowMap[_]=it,n.pointShadowMatrix[_]=L.shadow.matrix,w++}n.point[_]=B,_++}else if(L.isHemisphereLight){const B=t.get(L);B.skyColor.copy(L.color).multiplyScalar(z*E),B.groundColor.copy(L.groundColor).multiplyScalar(z*E),n.hemi[S]=B,S++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const M=n.hash;(M.directionalLength!==g||M.pointLength!==_||M.spotLength!==m||M.rectAreaLength!==p||M.hemiLength!==S||M.numDirectionalShadows!==x||M.numPointShadows!==w||M.numSpotShadows!==P||M.numSpotMaps!==R||M.numLightProbes!==I)&&(n.directional.length=g,n.spot.length=m,n.rectArea.length=p,n.point.length=_,n.hemi.length=S,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=w,n.pointShadowMap.length=w,n.spotShadow.length=P,n.spotShadowMap.length=P,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=w,n.spotLightMatrix.length=P+R-A,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=A,n.numLightProbes=I,M.directionalLength=g,M.pointLength=_,M.spotLength=m,M.rectAreaLength=p,M.hemiLength=S,M.numDirectionalShadows=x,M.numPointShadows=w,M.numSpotShadows=P,M.numSpotMaps=R,M.numLightProbes=I,n.version=vm++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,S=l.length;p<S;p++){const x=l[p];if(x.isDirectionalLight){const w=n.directional[u];w.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),u++}else if(x.isSpotLight){const w=n.spot[f];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),w.direction.sub(i),w.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const w=n.rectArea[g];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(m),r.identity(),o.copy(x.matrixWorld),o.premultiply(m),r.extractRotation(o),w.halfWidth.set(x.width*.5,0,0),w.halfHeight.set(0,x.height*.5,0),w.halfWidth.applyMatrix4(r),w.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const w=n.point[d];w.position.setFromMatrixPosition(x.matrixWorld),w.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const w=n.hemi[_];w.direction.setFromMatrixPosition(x.matrixWorld),w.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function tc(s){const t=new ym(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(h){t.setup(e,h)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function Sm(s){let t=new WeakMap;function e(i,o=0){const r=t.get(i);let a;return r===void 0?(a=new tc(s),t.set(i,[a])):o>=r.length?(a=new tc(s),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class wm extends qi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Em extends qi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const bm=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tm=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Am(s,t,e){let n=new Er;const i=new ft,o=new ft,r=new fe,a=new wm({depthPacking:rh}),c=new Em,l={},h=e.maxTextureSize,u={[hn]:Ae,[Ae]:hn,[Ve]:Ve},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ft},radius:{value:4}},vertexShader:bm,fragmentShader:Tm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new pe;g.setAttribute("position",new ln(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new K(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Sc;let p=this.type;this.render=function(R,A,I){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||R.length===0)return;const E=s.getRenderTarget(),M=s.getActiveCubeFace(),D=s.getActiveMipmapLevel(),k=s.state;k.setBlending(kn),k.buffers.color.setClear(1,1,1,1),k.buffers.depth.setTest(!0),k.setScissorTest(!1);const L=p!==Sn&&this.type===Sn,Y=p===Sn&&this.type!==Sn;for(let z=0,Z=R.length;z<Z;z++){const it=R[z],B=it.shadow;if(B===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(B.autoUpdate===!1&&B.needsUpdate===!1)continue;i.copy(B.mapSize);const Q=B.getFrameExtents();if(i.multiply(Q),o.copy(B.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/Q.x),i.x=o.x*Q.x,B.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/Q.y),i.y=o.y*Q.y,B.mapSize.y=o.y)),B.map===null||L===!0||Y===!0){const gt=this.type!==Sn?{minFilter:Ze,magFilter:Ze}:{};B.map!==null&&B.map.dispose(),B.map=new oi(i.x,i.y,gt),B.map.texture.name=it.name+".shadowMap",B.camera.updateProjectionMatrix()}s.setRenderTarget(B.map),s.clear();const st=B.getViewportCount();for(let gt=0;gt<st;gt++){const Lt=B.getViewport(gt);r.set(o.x*Lt.x,o.y*Lt.y,o.x*Lt.z,o.y*Lt.w),k.viewport(r),B.updateMatrices(it,gt),n=B.getFrustum(),w(A,I,B.camera,it,this.type)}B.isPointLightShadow!==!0&&this.type===Sn&&S(B,I),B.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(E,M,D)};function S(R,A){const I=t.update(_);d.defines.VSM_SAMPLES!==R.blurSamples&&(d.defines.VSM_SAMPLES=R.blurSamples,f.defines.VSM_SAMPLES=R.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),R.mapPass===null&&(R.mapPass=new oi(i.x,i.y)),d.uniforms.shadow_pass.value=R.map.texture,d.uniforms.resolution.value=R.mapSize,d.uniforms.radius.value=R.radius,s.setRenderTarget(R.mapPass),s.clear(),s.renderBufferDirect(A,null,I,d,_,null),f.uniforms.shadow_pass.value=R.mapPass.texture,f.uniforms.resolution.value=R.mapSize,f.uniforms.radius.value=R.radius,s.setRenderTarget(R.map),s.clear(),s.renderBufferDirect(A,null,I,f,_,null)}function x(R,A,I,E){let M=null;const D=I.isPointLight===!0?R.customDistanceMaterial:R.customDepthMaterial;if(D!==void 0)M=D;else if(M=I.isPointLight===!0?c:a,s.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0){const k=M.uuid,L=A.uuid;let Y=l[k];Y===void 0&&(Y={},l[k]=Y);let z=Y[L];z===void 0&&(z=M.clone(),Y[L]=z,A.addEventListener("dispose",P)),M=z}if(M.visible=A.visible,M.wireframe=A.wireframe,E===Sn?M.side=A.shadowSide!==null?A.shadowSide:A.side:M.side=A.shadowSide!==null?A.shadowSide:u[A.side],M.alphaMap=A.alphaMap,M.alphaTest=A.alphaTest,M.map=A.map,M.clipShadows=A.clipShadows,M.clippingPlanes=A.clippingPlanes,M.clipIntersection=A.clipIntersection,M.displacementMap=A.displacementMap,M.displacementScale=A.displacementScale,M.displacementBias=A.displacementBias,M.wireframeLinewidth=A.wireframeLinewidth,M.linewidth=A.linewidth,I.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const k=s.properties.get(M);k.light=I}return M}function w(R,A,I,E,M){if(R.visible===!1)return;if(R.layers.test(A.layers)&&(R.isMesh||R.isLine||R.isPoints)&&(R.castShadow||R.receiveShadow&&M===Sn)&&(!R.frustumCulled||n.intersectsObject(R))){R.modelViewMatrix.multiplyMatrices(I.matrixWorldInverse,R.matrixWorld);const L=t.update(R),Y=R.material;if(Array.isArray(Y)){const z=L.groups;for(let Z=0,it=z.length;Z<it;Z++){const B=z[Z],Q=Y[B.materialIndex];if(Q&&Q.visible){const st=x(R,Q,E,M);R.onBeforeShadow(s,R,A,I,L,st,B),s.renderBufferDirect(I,null,L,st,R,B),R.onAfterShadow(s,R,A,I,L,st,B)}}}else if(Y.visible){const z=x(R,Y,E,M);R.onBeforeShadow(s,R,A,I,L,z,null),s.renderBufferDirect(I,null,L,z,R,null),R.onAfterShadow(s,R,A,I,L,z,null)}}const k=R.children;for(let L=0,Y=k.length;L<Y;L++)w(k[L],A,I,E,M)}function P(R){R.target.removeEventListener("dispose",P);for(const I in l){const E=l[I],M=R.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}function Cm(s){function t(){let v=!1;const O=new fe;let H=null;const lt=new fe(0,0,0,0);return{setMask:function(vt){H!==vt&&!v&&(s.colorMask(vt,vt,vt,vt),H=vt)},setLocked:function(vt){v=vt},setClear:function(vt,kt,Xt,ie,ae){ae===!0&&(vt*=ie,kt*=ie,Xt*=ie),O.set(vt,kt,Xt,ie),lt.equals(O)===!1&&(s.clearColor(vt,kt,Xt,ie),lt.copy(O))},reset:function(){v=!1,H=null,lt.set(-1,0,0,0)}}}function e(){let v=!1,O=null,H=null,lt=null;return{setTest:function(vt){vt?Et(s.DEPTH_TEST):mt(s.DEPTH_TEST)},setMask:function(vt){O!==vt&&!v&&(s.depthMask(vt),O=vt)},setFunc:function(vt){if(H!==vt){switch(vt){case Il:s.depthFunc(s.NEVER);break;case Ul:s.depthFunc(s.ALWAYS);break;case Nl:s.depthFunc(s.LESS);break;case $s:s.depthFunc(s.LEQUAL);break;case zl:s.depthFunc(s.EQUAL);break;case Ol:s.depthFunc(s.GEQUAL);break;case Fl:s.depthFunc(s.GREATER);break;case Bl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}H=vt}},setLocked:function(vt){v=vt},setClear:function(vt){lt!==vt&&(s.clearDepth(vt),lt=vt)},reset:function(){v=!1,O=null,H=null,lt=null}}}function n(){let v=!1,O=null,H=null,lt=null,vt=null,kt=null,Xt=null,ie=null,ae=null;return{setTest:function(Kt){v||(Kt?Et(s.STENCIL_TEST):mt(s.STENCIL_TEST))},setMask:function(Kt){O!==Kt&&!v&&(s.stencilMask(Kt),O=Kt)},setFunc:function(Kt,ce,Qt){(H!==Kt||lt!==ce||vt!==Qt)&&(s.stencilFunc(Kt,ce,Qt),H=Kt,lt=ce,vt=Qt)},setOp:function(Kt,ce,Qt){(kt!==Kt||Xt!==ce||ie!==Qt)&&(s.stencilOp(Kt,ce,Qt),kt=Kt,Xt=ce,ie=Qt)},setLocked:function(Kt){v=Kt},setClear:function(Kt){ae!==Kt&&(s.clearStencil(Kt),ae=Kt)},reset:function(){v=!1,O=null,H=null,lt=null,vt=null,kt=null,Xt=null,ie=null,ae=null}}}const i=new t,o=new e,r=new n,a=new WeakMap,c=new WeakMap;let l={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,S=null,x=null,w=null,P=null,R=new Zt(0,0,0),A=0,I=!1,E=null,M=null,D=null,k=null,L=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let z=!1,Z=0;const it=s.getParameter(s.VERSION);it.indexOf("WebGL")!==-1?(Z=parseFloat(/^WebGL (\d)/.exec(it)[1]),z=Z>=1):it.indexOf("OpenGL ES")!==-1&&(Z=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),z=Z>=2);let B=null,Q={};const st=s.getParameter(s.SCISSOR_BOX),gt=s.getParameter(s.VIEWPORT),Lt=new fe().fromArray(st),Nt=new fe().fromArray(gt);function j(v,O,H,lt){const vt=new Uint8Array(4),kt=s.createTexture();s.bindTexture(v,kt),s.texParameteri(v,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(v,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xt=0;Xt<H;Xt++)v===s.TEXTURE_3D||v===s.TEXTURE_2D_ARRAY?s.texImage3D(O,0,s.RGBA,1,1,lt,0,s.RGBA,s.UNSIGNED_BYTE,vt):s.texImage2D(O+Xt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,vt);return kt}const ht={};ht[s.TEXTURE_2D]=j(s.TEXTURE_2D,s.TEXTURE_2D,1),ht[s.TEXTURE_CUBE_MAP]=j(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ht[s.TEXTURE_2D_ARRAY]=j(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ht[s.TEXTURE_3D]=j(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),o.setClear(1),r.setClear(0),Et(s.DEPTH_TEST),o.setFunc($s),J(!1),W(Ur),Et(s.CULL_FACE),ut(kn);function Et(v){l[v]!==!0&&(s.enable(v),l[v]=!0)}function mt(v){l[v]!==!1&&(s.disable(v),l[v]=!1)}function Ft(v,O){return h[v]!==O?(s.bindFramebuffer(v,O),h[v]=O,v===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=O),v===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=O),!0):!1}function zt(v,O){let H=d,lt=!1;if(v){H=u.get(O),H===void 0&&(H=[],u.set(O,H));const vt=v.textures;if(H.length!==vt.length||H[0]!==s.COLOR_ATTACHMENT0){for(let kt=0,Xt=vt.length;kt<Xt;kt++)H[kt]=s.COLOR_ATTACHMENT0+kt;H.length=vt.length,lt=!0}}else H[0]!==s.BACK&&(H[0]=s.BACK,lt=!0);lt&&s.drawBuffers(H)}function U(v){return f!==v?(s.useProgram(v),f=v,!0):!1}const Gt={[Qn]:s.FUNC_ADD,[gl]:s.FUNC_SUBTRACT,[_l]:s.FUNC_REVERSE_SUBTRACT};Gt[xl]=s.MIN,Gt[vl]=s.MAX;const $={[Ml]:s.ZERO,[yl]:s.ONE,[Sl]:s.SRC_COLOR,[lr]:s.SRC_ALPHA,[Cl]:s.SRC_ALPHA_SATURATE,[Tl]:s.DST_COLOR,[El]:s.DST_ALPHA,[wl]:s.ONE_MINUS_SRC_COLOR,[hr]:s.ONE_MINUS_SRC_ALPHA,[Al]:s.ONE_MINUS_DST_COLOR,[bl]:s.ONE_MINUS_DST_ALPHA,[Rl]:s.CONSTANT_COLOR,[Pl]:s.ONE_MINUS_CONSTANT_COLOR,[Ll]:s.CONSTANT_ALPHA,[Dl]:s.ONE_MINUS_CONSTANT_ALPHA};function ut(v,O,H,lt,vt,kt,Xt,ie,ae,Kt){if(v===kn){g===!0&&(mt(s.BLEND),g=!1);return}if(g===!1&&(Et(s.BLEND),g=!0),v!==ml){if(v!==_||Kt!==I){if((m!==Qn||x!==Qn)&&(s.blendEquation(s.FUNC_ADD),m=Qn,x=Qn),Kt)switch(v){case Fi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Nr:s.blendFunc(s.ONE,s.ONE);break;case zr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Or:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case Fi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Nr:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case zr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Or:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}p=null,S=null,w=null,P=null,R.set(0,0,0),A=0,_=v,I=Kt}return}vt=vt||O,kt=kt||H,Xt=Xt||lt,(O!==m||vt!==x)&&(s.blendEquationSeparate(Gt[O],Gt[vt]),m=O,x=vt),(H!==p||lt!==S||kt!==w||Xt!==P)&&(s.blendFuncSeparate($[H],$[lt],$[kt],$[Xt]),p=H,S=lt,w=kt,P=Xt),(ie.equals(R)===!1||ae!==A)&&(s.blendColor(ie.r,ie.g,ie.b,ae),R.copy(ie),A=ae),_=v,I=!1}function et(v,O){v.side===Ve?mt(s.CULL_FACE):Et(s.CULL_FACE);let H=v.side===Ae;O&&(H=!H),J(H),v.blending===Fi&&v.transparent===!1?ut(kn):ut(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),o.setFunc(v.depthFunc),o.setTest(v.depthTest),o.setMask(v.depthWrite),i.setMask(v.colorWrite);const lt=v.stencilWrite;r.setTest(lt),lt&&(r.setMask(v.stencilWriteMask),r.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),r.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),yt(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?Et(s.SAMPLE_ALPHA_TO_COVERAGE):mt(s.SAMPLE_ALPHA_TO_COVERAGE)}function J(v){E!==v&&(v?s.frontFace(s.CW):s.frontFace(s.CCW),E=v)}function W(v){v!==fl?(Et(s.CULL_FACE),v!==M&&(v===Ur?s.cullFace(s.BACK):v===pl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):mt(s.CULL_FACE),M=v}function at(v){v!==D&&(z&&s.lineWidth(v),D=v)}function yt(v,O,H){v?(Et(s.POLYGON_OFFSET_FILL),(k!==O||L!==H)&&(s.polygonOffset(O,H),k=O,L=H)):mt(s.POLYGON_OFFSET_FILL)}function T(v){v?Et(s.SCISSOR_TEST):mt(s.SCISSOR_TEST)}function y(v){v===void 0&&(v=s.TEXTURE0+Y-1),B!==v&&(s.activeTexture(v),B=v)}function F(v,O,H){H===void 0&&(B===null?H=s.TEXTURE0+Y-1:H=B);let lt=Q[H];lt===void 0&&(lt={type:void 0,texture:void 0},Q[H]=lt),(lt.type!==v||lt.texture!==O)&&(B!==H&&(s.activeTexture(H),B=H),s.bindTexture(v,O||ht[v]),lt.type=v,lt.texture=O)}function X(){const v=Q[B];v!==void 0&&v.type!==void 0&&(s.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function ot(){try{s.compressedTexImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function bt(){try{s.texSubImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function pt(){try{s.texSubImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ct(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Ct(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function _t(){try{s.texStorage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function xt(){try{s.texStorage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Tt(){try{s.texImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function dt(v){Lt.equals(v)===!1&&(s.scissor(v.x,v.y,v.z,v.w),Lt.copy(v))}function It(v){Nt.equals(v)===!1&&(s.viewport(v.x,v.y,v.z,v.w),Nt.copy(v))}function Vt(v,O){let H=c.get(O);H===void 0&&(H=new WeakMap,c.set(O,H));let lt=H.get(v);lt===void 0&&(lt=s.getUniformBlockIndex(O,v.name),H.set(v,lt))}function Ot(v,O){const lt=c.get(O).get(v);a.get(O)!==lt&&(s.uniformBlockBinding(O,lt,v.__bindingPointIndex),a.set(O,lt))}function Wt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),l={},B=null,Q={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,S=null,x=null,w=null,P=null,R=new Zt(0,0,0),A=0,I=!1,E=null,M=null,D=null,k=null,L=null,Lt.set(0,0,s.canvas.width,s.canvas.height),Nt.set(0,0,s.canvas.width,s.canvas.height),i.reset(),o.reset(),r.reset()}return{buffers:{color:i,depth:o,stencil:r},enable:Et,disable:mt,bindFramebuffer:Ft,drawBuffers:zt,useProgram:U,setBlending:ut,setMaterial:et,setFlipSided:J,setCullFace:W,setLineWidth:at,setPolygonOffset:yt,setScissorTest:T,activeTexture:y,bindTexture:F,unbindTexture:X,compressedTexImage2D:ot,compressedTexImage3D:tt,texImage2D:St,texImage3D:Tt,updateUBOMapping:Vt,uniformBlockBinding:Ot,texStorage2D:_t,texStorage3D:xt,texSubImage2D:bt,texSubImage3D:pt,compressedTexSubImage2D:ct,compressedTexSubImage3D:Ct,scissor:dt,viewport:It,reset:Wt}}function Rm(s,t,e,n,i,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ft,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,y){return f?new OffscreenCanvas(T,y):io("canvas")}function _(T,y,F){let X=1;const ot=yt(T);if((ot.width>F||ot.height>F)&&(X=F/Math.max(ot.width,ot.height)),X<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const tt=Math.floor(X*ot.width),bt=Math.floor(X*ot.height);u===void 0&&(u=g(tt,bt));const pt=y?g(tt,bt):u;return pt.width=tt,pt.height=bt,pt.getContext("2d").drawImage(T,0,0,tt,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ot.width+"x"+ot.height+") to ("+tt+"x"+bt+")."),pt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ot.width+"x"+ot.height+")."),T;return T}function m(T){return T.generateMipmaps&&T.minFilter!==Ze&&T.minFilter!==je}function p(T){s.generateMipmap(T)}function S(T,y,F,X,ot=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let tt=y;if(y===s.RED&&(F===s.FLOAT&&(tt=s.R32F),F===s.HALF_FLOAT&&(tt=s.R16F),F===s.UNSIGNED_BYTE&&(tt=s.R8)),y===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(tt=s.R8UI),F===s.UNSIGNED_SHORT&&(tt=s.R16UI),F===s.UNSIGNED_INT&&(tt=s.R32UI),F===s.BYTE&&(tt=s.R8I),F===s.SHORT&&(tt=s.R16I),F===s.INT&&(tt=s.R32I)),y===s.RG&&(F===s.FLOAT&&(tt=s.RG32F),F===s.HALF_FLOAT&&(tt=s.RG16F),F===s.UNSIGNED_BYTE&&(tt=s.RG8)),y===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(tt=s.RG8UI),F===s.UNSIGNED_SHORT&&(tt=s.RG16UI),F===s.UNSIGNED_INT&&(tt=s.RG32UI),F===s.BYTE&&(tt=s.RG8I),F===s.SHORT&&(tt=s.RG16I),F===s.INT&&(tt=s.RG32I)),y===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(tt=s.RGB9_E5),y===s.RGBA){const bt=ot?Qs:re.getTransfer(X);F===s.FLOAT&&(tt=s.RGBA32F),F===s.HALF_FLOAT&&(tt=s.RGBA16F),F===s.UNSIGNED_BYTE&&(tt=bt===he?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function x(T,y){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ze&&T.minFilter!==je?Math.log2(Math.max(y.width,y.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?y.mipmaps.length:1}function w(T){const y=T.target;y.removeEventListener("dispose",w),R(y),y.isVideoTexture&&h.delete(y)}function P(T){const y=T.target;y.removeEventListener("dispose",P),I(y)}function R(T){const y=n.get(T);if(y.__webglInit===void 0)return;const F=T.source,X=d.get(F);if(X){const ot=X[y.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&A(T),Object.keys(X).length===0&&d.delete(F)}n.remove(T)}function A(T){const y=n.get(T);s.deleteTexture(y.__webglTexture);const F=T.source,X=d.get(F);delete X[y.__cacheKey],r.memory.textures--}function I(T){const y=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let X=0;X<6;X++){if(Array.isArray(y.__webglFramebuffer[X]))for(let ot=0;ot<y.__webglFramebuffer[X].length;ot++)s.deleteFramebuffer(y.__webglFramebuffer[X][ot]);else s.deleteFramebuffer(y.__webglFramebuffer[X]);y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer[X])}else{if(Array.isArray(y.__webglFramebuffer))for(let X=0;X<y.__webglFramebuffer.length;X++)s.deleteFramebuffer(y.__webglFramebuffer[X]);else s.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&s.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let X=0;X<y.__webglColorRenderbuffer.length;X++)y.__webglColorRenderbuffer[X]&&s.deleteRenderbuffer(y.__webglColorRenderbuffer[X]);y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(y.__webglDepthRenderbuffer)}const F=T.textures;for(let X=0,ot=F.length;X<ot;X++){const tt=n.get(F[X]);tt.__webglTexture&&(s.deleteTexture(tt.__webglTexture),r.memory.textures--),n.remove(F[X])}n.remove(T)}let E=0;function M(){E=0}function D(){const T=E;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),E+=1,T}function k(T){const y=[];return y.push(T.wrapS),y.push(T.wrapT),y.push(T.wrapR||0),y.push(T.magFilter),y.push(T.minFilter),y.push(T.anisotropy),y.push(T.internalFormat),y.push(T.format),y.push(T.type),y.push(T.generateMipmaps),y.push(T.premultiplyAlpha),y.push(T.flipY),y.push(T.unpackAlignment),y.push(T.colorSpace),y.join()}function L(T,y){const F=n.get(T);if(T.isVideoTexture&&W(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const X=T.image;if(X===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(X.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Lt(F,T,y);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+y)}function Y(T,y){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Lt(F,T,y);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+y)}function z(T,y){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Lt(F,T,y);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+y)}function Z(T,y){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Nt(F,T,y);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+y)}const it={[un]:s.REPEAT,[wn]:s.CLAMP_TO_EDGE,[fr]:s.MIRRORED_REPEAT},B={[Ze]:s.NEAREST,[jl]:s.NEAREST_MIPMAP_NEAREST,[Ms]:s.NEAREST_MIPMAP_LINEAR,[je]:s.LINEAR,[wo]:s.LINEAR_MIPMAP_NEAREST,[ei]:s.LINEAR_MIPMAP_LINEAR},Q={[ch]:s.NEVER,[ph]:s.ALWAYS,[lh]:s.LESS,[Nc]:s.LEQUAL,[hh]:s.EQUAL,[fh]:s.GEQUAL,[uh]:s.GREATER,[dh]:s.NOTEQUAL};function st(T,y){if(y.type===Fn&&t.has("OES_texture_float_linear")===!1&&(y.magFilter===je||y.magFilter===wo||y.magFilter===Ms||y.magFilter===ei||y.minFilter===je||y.minFilter===wo||y.minFilter===Ms||y.minFilter===ei)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,it[y.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,it[y.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,it[y.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,B[y.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,B[y.minFilter]),y.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,Q[y.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ze||y.minFilter!==Ms&&y.minFilter!==ei||y.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||n.get(y).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,i.getMaxAnisotropy())),n.get(y).__currentAnisotropy=y.anisotropy}}}function gt(T,y){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,y.addEventListener("dispose",w));const X=y.source;let ot=d.get(X);ot===void 0&&(ot={},d.set(X,ot));const tt=k(y);if(tt!==T.__cacheKey){ot[tt]===void 0&&(ot[tt]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,F=!0),ot[tt].usedTimes++;const bt=ot[T.__cacheKey];bt!==void 0&&(ot[T.__cacheKey].usedTimes--,bt.usedTimes===0&&A(y)),T.__cacheKey=tt,T.__webglTexture=ot[tt].texture}return F}function Lt(T,y,F){let X=s.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&(X=s.TEXTURE_2D_ARRAY),y.isData3DTexture&&(X=s.TEXTURE_3D);const ot=gt(T,y),tt=y.source;e.bindTexture(X,T.__webglTexture,s.TEXTURE0+F);const bt=n.get(tt);if(tt.version!==bt.__version||ot===!0){e.activeTexture(s.TEXTURE0+F);const pt=re.getPrimaries(re.workingColorSpace),ct=y.colorSpace===zn?null:re.getPrimaries(y.colorSpace),Ct=y.colorSpace===zn||pt===ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ct);let _t=_(y.image,!1,i.maxTextureSize);_t=at(y,_t);const xt=o.convert(y.format,y.colorSpace),St=o.convert(y.type);let Tt=S(y.internalFormat,xt,St,y.colorSpace,y.isVideoTexture);st(X,y);let dt;const It=y.mipmaps,Vt=y.isVideoTexture!==!0,Ot=bt.__version===void 0||ot===!0,Wt=tt.dataReady,v=x(y,_t);if(y.isDepthTexture)Tt=s.DEPTH_COMPONENT16,y.type===Fn?Tt=s.DEPTH_COMPONENT32F:y.type===Wi?Tt=s.DEPTH_COMPONENT24:y.type===gs&&(Tt=s.DEPTH24_STENCIL8),Ot&&(Vt?e.texStorage2D(s.TEXTURE_2D,1,Tt,_t.width,_t.height):e.texImage2D(s.TEXTURE_2D,0,Tt,_t.width,_t.height,0,xt,St,null));else if(y.isDataTexture)if(It.length>0){Vt&&Ot&&e.texStorage2D(s.TEXTURE_2D,v,Tt,It[0].width,It[0].height);for(let O=0,H=It.length;O<H;O++)dt=It[O],Vt?Wt&&e.texSubImage2D(s.TEXTURE_2D,O,0,0,dt.width,dt.height,xt,St,dt.data):e.texImage2D(s.TEXTURE_2D,O,Tt,dt.width,dt.height,0,xt,St,dt.data);y.generateMipmaps=!1}else Vt?(Ot&&e.texStorage2D(s.TEXTURE_2D,v,Tt,_t.width,_t.height),Wt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,_t.width,_t.height,xt,St,_t.data)):e.texImage2D(s.TEXTURE_2D,0,Tt,_t.width,_t.height,0,xt,St,_t.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){Vt&&Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,v,Tt,It[0].width,It[0].height,_t.depth);for(let O=0,H=It.length;O<H;O++)dt=It[O],y.format!==cn?xt!==null?Vt?Wt&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,O,0,0,0,dt.width,dt.height,_t.depth,xt,dt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,O,Tt,dt.width,dt.height,_t.depth,0,dt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?Wt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,O,0,0,0,dt.width,dt.height,_t.depth,xt,St,dt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,O,Tt,dt.width,dt.height,_t.depth,0,xt,St,dt.data)}else{Vt&&Ot&&e.texStorage2D(s.TEXTURE_2D,v,Tt,It[0].width,It[0].height);for(let O=0,H=It.length;O<H;O++)dt=It[O],y.format!==cn?xt!==null?Vt?Wt&&e.compressedTexSubImage2D(s.TEXTURE_2D,O,0,0,dt.width,dt.height,xt,dt.data):e.compressedTexImage2D(s.TEXTURE_2D,O,Tt,dt.width,dt.height,0,dt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?Wt&&e.texSubImage2D(s.TEXTURE_2D,O,0,0,dt.width,dt.height,xt,St,dt.data):e.texImage2D(s.TEXTURE_2D,O,Tt,dt.width,dt.height,0,xt,St,dt.data)}else if(y.isDataArrayTexture)Vt?(Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,v,Tt,_t.width,_t.height,_t.depth),Wt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,_t.width,_t.height,_t.depth,xt,St,_t.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Tt,_t.width,_t.height,_t.depth,0,xt,St,_t.data);else if(y.isData3DTexture)Vt?(Ot&&e.texStorage3D(s.TEXTURE_3D,v,Tt,_t.width,_t.height,_t.depth),Wt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,_t.width,_t.height,_t.depth,xt,St,_t.data)):e.texImage3D(s.TEXTURE_3D,0,Tt,_t.width,_t.height,_t.depth,0,xt,St,_t.data);else if(y.isFramebufferTexture){if(Ot)if(Vt)e.texStorage2D(s.TEXTURE_2D,v,Tt,_t.width,_t.height);else{let O=_t.width,H=_t.height;for(let lt=0;lt<v;lt++)e.texImage2D(s.TEXTURE_2D,lt,Tt,O,H,0,xt,St,null),O>>=1,H>>=1}}else if(It.length>0){if(Vt&&Ot){const O=yt(It[0]);e.texStorage2D(s.TEXTURE_2D,v,Tt,O.width,O.height)}for(let O=0,H=It.length;O<H;O++)dt=It[O],Vt?Wt&&e.texSubImage2D(s.TEXTURE_2D,O,0,0,xt,St,dt):e.texImage2D(s.TEXTURE_2D,O,Tt,xt,St,dt);y.generateMipmaps=!1}else if(Vt){if(Ot){const O=yt(_t);e.texStorage2D(s.TEXTURE_2D,v,Tt,O.width,O.height)}Wt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt,St,_t)}else e.texImage2D(s.TEXTURE_2D,0,Tt,xt,St,_t);m(y)&&p(X),bt.__version=tt.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function Nt(T,y,F){if(y.image.length!==6)return;const X=gt(T,y),ot=y.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+F);const tt=n.get(ot);if(ot.version!==tt.__version||X===!0){e.activeTexture(s.TEXTURE0+F);const bt=re.getPrimaries(re.workingColorSpace),pt=y.colorSpace===zn?null:re.getPrimaries(y.colorSpace),ct=y.colorSpace===zn||bt===pt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,y.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,y.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);const Ct=y.isCompressedTexture||y.image[0].isCompressedTexture,_t=y.image[0]&&y.image[0].isDataTexture,xt=[];for(let H=0;H<6;H++)!Ct&&!_t?xt[H]=_(y.image[H],!0,i.maxCubemapSize):xt[H]=_t?y.image[H].image:y.image[H],xt[H]=at(y,xt[H]);const St=xt[0],Tt=o.convert(y.format,y.colorSpace),dt=o.convert(y.type),It=S(y.internalFormat,Tt,dt,y.colorSpace),Vt=y.isVideoTexture!==!0,Ot=tt.__version===void 0||X===!0,Wt=ot.dataReady;let v=x(y,St);st(s.TEXTURE_CUBE_MAP,y);let O;if(Ct){Vt&&Ot&&e.texStorage2D(s.TEXTURE_CUBE_MAP,v,It,St.width,St.height);for(let H=0;H<6;H++){O=xt[H].mipmaps;for(let lt=0;lt<O.length;lt++){const vt=O[lt];y.format!==cn?Tt!==null?Vt?Wt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,0,0,vt.width,vt.height,Tt,vt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,It,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,0,0,vt.width,vt.height,Tt,dt,vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,It,vt.width,vt.height,0,Tt,dt,vt.data)}}}else{if(O=y.mipmaps,Vt&&Ot){O.length>0&&v++;const H=yt(xt[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,v,It,H.width,H.height)}for(let H=0;H<6;H++)if(_t){Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,xt[H].width,xt[H].height,Tt,dt,xt[H].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,It,xt[H].width,xt[H].height,0,Tt,dt,xt[H].data);for(let lt=0;lt<O.length;lt++){const kt=O[lt].image[H].image;Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,0,0,kt.width,kt.height,Tt,dt,kt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,It,kt.width,kt.height,0,Tt,dt,kt.data)}}else{Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Tt,dt,xt[H]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,It,Tt,dt,xt[H]);for(let lt=0;lt<O.length;lt++){const vt=O[lt];Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,0,0,Tt,dt,vt.image[H]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,It,Tt,dt,vt.image[H])}}}m(y)&&p(s.TEXTURE_CUBE_MAP),tt.__version=ot.version,y.onUpdate&&y.onUpdate(y)}T.__version=y.version}function j(T,y,F,X,ot,tt){const bt=o.convert(F.format,F.colorSpace),pt=o.convert(F.type),ct=S(F.internalFormat,bt,pt,F.colorSpace);if(!n.get(y).__hasExternalTextures){const _t=Math.max(1,y.width>>tt),xt=Math.max(1,y.height>>tt);ot===s.TEXTURE_3D||ot===s.TEXTURE_2D_ARRAY?e.texImage3D(ot,tt,ct,_t,xt,y.depth,0,bt,pt,null):e.texImage2D(ot,tt,ct,_t,xt,0,bt,pt,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),J(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,X,ot,n.get(F).__webglTexture,0,et(y)):(ot===s.TEXTURE_2D||ot>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,X,ot,n.get(F).__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(T,y,F){if(s.bindRenderbuffer(s.RENDERBUFFER,T),y.depthBuffer&&!y.stencilBuffer){let X=s.DEPTH_COMPONENT24;if(F||J(y)){const ot=y.depthTexture;ot&&ot.isDepthTexture&&(ot.type===Fn?X=s.DEPTH_COMPONENT32F:ot.type===Wi&&(X=s.DEPTH_COMPONENT24));const tt=et(y);J(y)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,X,y.width,y.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,X,y.width,y.height)}else s.renderbufferStorage(s.RENDERBUFFER,X,y.width,y.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(y.depthBuffer&&y.stencilBuffer){const X=et(y);F&&J(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,X,s.DEPTH24_STENCIL8,y.width,y.height):J(y)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,X,s.DEPTH24_STENCIL8,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,y.width,y.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{const X=y.textures;for(let ot=0;ot<X.length;ot++){const tt=X[ot],bt=o.convert(tt.format,tt.colorSpace),pt=o.convert(tt.type),ct=S(tt.internalFormat,bt,pt,tt.colorSpace),Ct=et(y);F&&J(y)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ct,ct,y.width,y.height):J(y)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ct,ct,y.width,y.height):s.renderbufferStorage(s.RENDERBUFFER,ct,y.width,y.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Et(T,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(y.depthTexture).__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),L(y.depthTexture,0);const X=n.get(y.depthTexture).__webglTexture,ot=et(y);if(y.depthTexture.format===Bi)J(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,X,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,X,0);else if(y.depthTexture.format===us)J(y)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,X,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,X,0);else throw new Error("Unknown depthTexture format")}function mt(T){const y=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!y.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Et(y.__webglFramebuffer,T)}else if(F){y.__webglDepthbuffer=[];for(let X=0;X<6;X++)e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer[X]),y.__webglDepthbuffer[X]=s.createRenderbuffer(),ht(y.__webglDepthbuffer[X],T,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer=s.createRenderbuffer(),ht(y.__webglDepthbuffer,T,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(T,y,F){const X=n.get(T);y!==void 0&&j(X.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&mt(T)}function zt(T){const y=T.texture,F=n.get(T),X=n.get(y);T.addEventListener("dispose",P);const ot=T.textures,tt=T.isWebGLCubeRenderTarget===!0,bt=ot.length>1;if(bt||(X.__webglTexture===void 0&&(X.__webglTexture=s.createTexture()),X.__version=y.version,r.memory.textures++),tt){F.__webglFramebuffer=[];for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer[pt]=[];for(let ct=0;ct<y.mipmaps.length;ct++)F.__webglFramebuffer[pt][ct]=s.createFramebuffer()}else F.__webglFramebuffer[pt]=s.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){F.__webglFramebuffer=[];for(let pt=0;pt<y.mipmaps.length;pt++)F.__webglFramebuffer[pt]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(bt)for(let pt=0,ct=ot.length;pt<ct;pt++){const Ct=n.get(ot[pt]);Ct.__webglTexture===void 0&&(Ct.__webglTexture=s.createTexture(),r.memory.textures++)}if(T.samples>0&&J(T)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let pt=0;pt<ot.length;pt++){const ct=ot[pt];F.__webglColorRenderbuffer[pt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[pt]);const Ct=o.convert(ct.format,ct.colorSpace),_t=o.convert(ct.type),xt=S(ct.internalFormat,Ct,_t,ct.colorSpace,T.isXRRenderTarget===!0),St=et(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,St,xt,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+pt,s.RENDERBUFFER,F.__webglColorRenderbuffer[pt])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),ht(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(tt){e.bindTexture(s.TEXTURE_CUBE_MAP,X.__webglTexture),st(s.TEXTURE_CUBE_MAP,y);for(let pt=0;pt<6;pt++)if(y.mipmaps&&y.mipmaps.length>0)for(let ct=0;ct<y.mipmaps.length;ct++)j(F.__webglFramebuffer[pt][ct],T,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,ct);else j(F.__webglFramebuffer[pt],T,y,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+pt,0);m(y)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let pt=0,ct=ot.length;pt<ct;pt++){const Ct=ot[pt],_t=n.get(Ct);e.bindTexture(s.TEXTURE_2D,_t.__webglTexture),st(s.TEXTURE_2D,Ct),j(F.__webglFramebuffer,T,Ct,s.COLOR_ATTACHMENT0+pt,s.TEXTURE_2D,0),m(Ct)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let pt=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(pt=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(pt,X.__webglTexture),st(pt,y),y.mipmaps&&y.mipmaps.length>0)for(let ct=0;ct<y.mipmaps.length;ct++)j(F.__webglFramebuffer[ct],T,y,s.COLOR_ATTACHMENT0,pt,ct);else j(F.__webglFramebuffer,T,y,s.COLOR_ATTACHMENT0,pt,0);m(y)&&p(pt),e.unbindTexture()}T.depthBuffer&&mt(T)}function U(T){const y=T.textures;for(let F=0,X=y.length;F<X;F++){const ot=y[F];if(m(ot)){const tt=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,bt=n.get(ot).__webglTexture;e.bindTexture(tt,bt),p(tt),e.unbindTexture()}}}const Gt=[],$=[];function ut(T){if(T.samples>0){if(J(T)===!1){const y=T.textures,F=T.width,X=T.height;let ot=s.COLOR_BUFFER_BIT;const tt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,bt=n.get(T),pt=y.length>1;if(pt)for(let ct=0;ct<y.length;ct++)e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let ct=0;ct<y.length;ct++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(ot|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(ot|=s.STENCIL_BUFFER_BIT)),pt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,bt.__webglColorRenderbuffer[ct]);const Ct=n.get(y[ct]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Ct,0)}s.blitFramebuffer(0,0,F,X,0,0,F,X,ot,s.NEAREST),c===!0&&(Gt.length=0,$.length=0,Gt.push(s.COLOR_ATTACHMENT0+ct),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Gt.push(tt),$.push(tt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,$)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Gt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),pt)for(let ct=0;ct<y.length;ct++){e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,bt.__webglColorRenderbuffer[ct]);const Ct=n.get(y[ct]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.TEXTURE_2D,Ct,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const y=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[y])}}}function et(T){return Math.min(i.maxSamples,T.samples)}function J(T){const y=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function W(T){const y=r.render.frame;h.get(T)!==y&&(h.set(T,y),T.update())}function at(T,y){const F=T.colorSpace,X=T.format,ot=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Vn&&F!==zn&&(re.getTransfer(F)===he?(X!==cn||ot!==Gn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),y}function yt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=D,this.resetTextureUnits=M,this.setTexture2D=L,this.setTexture2DArray=Y,this.setTexture3D=z,this.setTextureCube=Z,this.rebindTextures=Ft,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=U,this.updateMultisampleRenderTarget=ut,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=j,this.useMultisampledRTT=J}function Pm(s,t){function e(n,i=zn){let o;const r=re.getTransfer(i);if(n===Gn)return s.UNSIGNED_BYTE;if(n===Rc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Pc)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Jl)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Zl)return s.BYTE;if(n===Kl)return s.SHORT;if(n===Ac)return s.UNSIGNED_SHORT;if(n===Cc)return s.INT;if(n===Wi)return s.UNSIGNED_INT;if(n===Fn)return s.FLOAT;if(n===lo)return s.HALF_FLOAT;if(n===$l)return s.ALPHA;if(n===Ql)return s.RGB;if(n===cn)return s.RGBA;if(n===th)return s.LUMINANCE;if(n===eh)return s.LUMINANCE_ALPHA;if(n===Bi)return s.DEPTH_COMPONENT;if(n===us)return s.DEPTH_STENCIL;if(n===nh)return s.RED;if(n===Lc)return s.RED_INTEGER;if(n===ih)return s.RG;if(n===Dc)return s.RG_INTEGER;if(n===Ic)return s.RGBA_INTEGER;if(n===Eo||n===bo||n===To||n===Ao)if(r===he)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===Eo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===bo)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===To)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Ao)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===Eo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===bo)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===To)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Ao)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===Fr||n===Br||n===kr||n===Hr)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===Fr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Br)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===kr)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Hr)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Gr||n===Vr||n===Wr)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Gr||n===Vr)return r===he?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Wr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Xr||n===Yr||n===qr||n===jr||n===Zr||n===Kr||n===Jr||n===$r||n===Qr||n===ta||n===ea||n===na||n===ia||n===sa)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===Xr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Yr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===qr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===jr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Zr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Kr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Jr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===$r)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Qr)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===ta)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ea)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===na)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===ia)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===sa)return r===he?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Co||n===oa||n===ra)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Co)return r===he?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===oa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ra)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===sh||n===aa||n===ca||n===la)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Co)return o.COMPRESSED_RED_RGTC1_EXT;if(n===aa)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ca)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===la)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===gs?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Lm extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ne extends Ce{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Dm={type:"move"};class Qo{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ne,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ne,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new C,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new C),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ne,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new C,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new C),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Dm)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ne;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Im=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Um=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Nm{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new ye,o=t.properties.get(i);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,i=new bn({vertexShader:Im,fragmentShader:Um,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new K(new we(20,20),i)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class zm extends li{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=new Nm,m=e.getContextAttributes();let p=null,S=null;const x=[],w=[],P=new ft;let R=null;const A=new Ge;A.layers.enable(1),A.viewport=new fe;const I=new Ge;I.layers.enable(2),I.viewport=new fe;const E=[A,I],M=new Lm;M.layers.enable(1),M.layers.enable(2);let D=null,k=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ht=x[j];return ht===void 0&&(ht=new Qo,x[j]=ht),ht.getTargetRaySpace()},this.getControllerGrip=function(j){let ht=x[j];return ht===void 0&&(ht=new Qo,x[j]=ht),ht.getGripSpace()},this.getHand=function(j){let ht=x[j];return ht===void 0&&(ht=new Qo,x[j]=ht),ht.getHandSpace()};function L(j){const ht=w.indexOf(j.inputSource);if(ht===-1)return;const Et=x[ht];Et!==void 0&&(Et.update(j.inputSource,j.frame,l||r),Et.dispatchEvent({type:j.type,data:j.inputSource}))}function Y(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",Y),i.removeEventListener("inputsourceschange",z);for(let j=0;j<x.length;j++){const ht=w[j];ht!==null&&(w[j]=null,x[j].disconnect(ht))}D=null,k=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,S=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(R),t.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",Y),i.addEventListener("inputsourceschange",z),m.xrCompatible!==!0&&await e.makeXRCompatible(),R=t.getPixelRatio(),t.getSize(P),i.renderState.layers===void 0){const ht={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(i,e,ht),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),S=new oi(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Gn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ht=null,Et=null,mt=null;m.depth&&(mt=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ht=m.stencil?us:Bi,Et=m.stencil?gs:Wi);const Ft={colorFormat:e.RGBA8,depthFormat:mt,scaleFactor:o};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Ft),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),S=new oi(d.textureWidth,d.textureHeight,{format:cn,type:Gn,depthTexture:new qc(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ht),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}S.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),Nt.setContext(i),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function z(j){for(let ht=0;ht<j.removed.length;ht++){const Et=j.removed[ht],mt=w.indexOf(Et);mt>=0&&(w[mt]=null,x[mt].disconnect(Et))}for(let ht=0;ht<j.added.length;ht++){const Et=j.added[ht];let mt=w.indexOf(Et);if(mt===-1){for(let zt=0;zt<x.length;zt++)if(zt>=w.length){w.push(Et),mt=zt;break}else if(w[zt]===null){w[zt]=Et,mt=zt;break}if(mt===-1)break}const Ft=x[mt];Ft&&Ft.connect(Et)}}const Z=new C,it=new C;function B(j,ht,Et){Z.setFromMatrixPosition(ht.matrixWorld),it.setFromMatrixPosition(Et.matrixWorld);const mt=Z.distanceTo(it),Ft=ht.projectionMatrix.elements,zt=Et.projectionMatrix.elements,U=Ft[14]/(Ft[10]-1),Gt=Ft[14]/(Ft[10]+1),$=(Ft[9]+1)/Ft[5],ut=(Ft[9]-1)/Ft[5],et=(Ft[8]-1)/Ft[0],J=(zt[8]+1)/zt[0],W=U*et,at=U*J,yt=mt/(-et+J),T=yt*-et;ht.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(T),j.translateZ(yt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const y=U+yt,F=Gt+yt,X=W-T,ot=at+(mt-T),tt=$*Gt/F*y,bt=ut*Gt/F*y;j.projectionMatrix.makePerspective(X,ot,tt,bt,y,F),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function Q(j,ht){ht===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ht.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;_.texture!==null&&(j.near=_.depthNear,j.far=_.depthFar),M.near=I.near=A.near=j.near,M.far=I.far=A.far=j.far,(D!==M.near||k!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),D=M.near,k=M.far,A.near=D,A.far=k,I.near=D,I.far=k,A.updateProjectionMatrix(),I.updateProjectionMatrix(),j.updateProjectionMatrix());const ht=j.parent,Et=M.cameras;Q(M,ht);for(let mt=0;mt<Et.length;mt++)Q(Et[mt],ht);Et.length===2?B(M,A,I):M.projectionMatrix.copy(A.projectionMatrix),st(j,M,ht)};function st(j,ht,Et){Et===null?j.matrix.copy(ht.matrixWorld):(j.matrix.copy(Et.matrixWorld),j.matrix.invert(),j.matrix.multiply(ht.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ht.projectionMatrix),j.projectionMatrixInverse.copy(ht.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=ds*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null};let gt=null;function Lt(j,ht){if(h=ht.getViewerPose(l||r),g=ht,h!==null){const Et=h.views;f!==null&&(t.setRenderTargetFramebuffer(S,f.framebuffer),t.setRenderTarget(S));let mt=!1;Et.length!==M.cameras.length&&(M.cameras.length=0,mt=!0);for(let zt=0;zt<Et.length;zt++){const U=Et[zt];let Gt=null;if(f!==null)Gt=f.getViewport(U);else{const ut=u.getViewSubImage(d,U);Gt=ut.viewport,zt===0&&(t.setRenderTargetTextures(S,ut.colorTexture,d.ignoreDepthValues?void 0:ut.depthStencilTexture),t.setRenderTarget(S))}let $=E[zt];$===void 0&&($=new Ge,$.layers.enable(zt),$.viewport=new fe,E[zt]=$),$.matrix.fromArray(U.transform.matrix),$.matrix.decompose($.position,$.quaternion,$.scale),$.projectionMatrix.fromArray(U.projectionMatrix),$.projectionMatrixInverse.copy($.projectionMatrix).invert(),$.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),zt===0&&(M.matrix.copy($.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),mt===!0&&M.cameras.push($)}const Ft=i.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){const zt=u.getDepthInformation(Et[0]);zt&&zt.isValid&&zt.texture&&_.init(t,zt,i.renderState)}}for(let Et=0;Et<x.length;Et++){const mt=w[Et],Ft=x[Et];mt!==null&&Ft!==void 0&&Ft.update(mt,ht,l||r)}_.render(t,M),gt&&gt(j,ht),ht.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ht}),g=null}const Nt=new Xc;Nt.setAnimationLoop(Lt),this.setAnimationLoop=function(j){gt=j},this.dispose=function(){}}}const Kn=new dn,Om=new ue;function Fm(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Gc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,S,x,w){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),u(m,p)):p.isMeshPhongMaterial?(o(m,p),h(m,p)):p.isMeshStandardMaterial?(o(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,w)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),_(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,S,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ae&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ae&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const S=t.get(p),x=S.envMap,w=S.envMapRotation;if(x&&(m.envMap.value=x,Kn.copy(w),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),m.envMapRotation.value.setFromMatrix4(Om.makeRotationFromEuler(Kn)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const P=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*P,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,S,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*S,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,S){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ae&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=S.texture,m.transmissionSamplerSize.value.set(S.width,S.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const S=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(S.matrixWorld),m.nearDistance.value=S.shadow.camera.near,m.farDistance.value=S.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Bm(s,t,e,n){let i={},o={},r=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(S,x){const w=x.program;n.uniformBlockBinding(S,w)}function l(S,x){let w=i[S.id];w===void 0&&(g(S),w=h(S),i[S.id]=w,S.addEventListener("dispose",m));const P=x.program;n.updateUBOMapping(S,P);const R=t.render.frame;o[S.id]!==R&&(d(S),o[S.id]=R)}function h(S){const x=u();S.__bindingPointIndex=x;const w=s.createBuffer(),P=S.__size,R=S.usage;return s.bindBuffer(s.UNIFORM_BUFFER,w),s.bufferData(s.UNIFORM_BUFFER,P,R),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,w),w}function u(){for(let S=0;S<a;S++)if(r.indexOf(S)===-1)return r.push(S),S;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(S){const x=i[S.id],w=S.uniforms,P=S.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let R=0,A=w.length;R<A;R++){const I=Array.isArray(w[R])?w[R]:[w[R]];for(let E=0,M=I.length;E<M;E++){const D=I[E];if(f(D,R,E,P)===!0){const k=D.__offset,L=Array.isArray(D.value)?D.value:[D.value];let Y=0;for(let z=0;z<L.length;z++){const Z=L[z],it=_(Z);typeof Z=="number"||typeof Z=="boolean"?(D.__data[0]=Z,s.bufferSubData(s.UNIFORM_BUFFER,k+Y,D.__data)):Z.isMatrix3?(D.__data[0]=Z.elements[0],D.__data[1]=Z.elements[1],D.__data[2]=Z.elements[2],D.__data[3]=0,D.__data[4]=Z.elements[3],D.__data[5]=Z.elements[4],D.__data[6]=Z.elements[5],D.__data[7]=0,D.__data[8]=Z.elements[6],D.__data[9]=Z.elements[7],D.__data[10]=Z.elements[8],D.__data[11]=0):(Z.toArray(D.__data,Y),Y+=it.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,k,D.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(S,x,w,P){const R=S.value,A=x+"_"+w;if(P[A]===void 0)return typeof R=="number"||typeof R=="boolean"?P[A]=R:P[A]=R.clone(),!0;{const I=P[A];if(typeof R=="number"||typeof R=="boolean"){if(I!==R)return P[A]=R,!0}else if(I.equals(R)===!1)return I.copy(R),!0}return!1}function g(S){const x=S.uniforms;let w=0;const P=16;for(let A=0,I=x.length;A<I;A++){const E=Array.isArray(x[A])?x[A]:[x[A]];for(let M=0,D=E.length;M<D;M++){const k=E[M],L=Array.isArray(k.value)?k.value:[k.value];for(let Y=0,z=L.length;Y<z;Y++){const Z=L[Y],it=_(Z),B=w%P;B!==0&&P-B<it.boundary&&(w+=P-B),k.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),k.__offset=w,w+=it.storage}}}const R=w%P;return R>0&&(w+=P-R),S.__size=w,S.__cache={},this}function _(S){const x={boundary:0,storage:0};return typeof S=="number"||typeof S=="boolean"?(x.boundary=4,x.storage=4):S.isVector2?(x.boundary=8,x.storage=8):S.isVector3||S.isColor?(x.boundary=16,x.storage=12):S.isVector4?(x.boundary=16,x.storage=16):S.isMatrix3?(x.boundary=48,x.storage=48):S.isMatrix4?(x.boundary=64,x.storage=64):S.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",S),x}function m(S){const x=S.target;x.removeEventListener("dispose",m);const w=r.indexOf(x.__bindingPointIndex);r.splice(w,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete o[x.id]}function p(){for(const S in i)s.deleteBuffer(i[S]);r=[],i={},o={}}return{bind:c,update:l,dispose:p}}class km{constructor(t={}){const{canvas:e=Lh(),context:n=null,depth:i=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=r;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],S=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this._useLegacyLights=!1,this.toneMapping=Hn,this.toneMappingExposure=1;const x=this;let w=!1,P=0,R=0,A=null,I=-1,E=null;const M=new fe,D=new fe;let k=null;const L=new Zt(0);let Y=0,z=e.width,Z=e.height,it=1,B=null,Q=null;const st=new fe(0,0,z,Z),gt=new fe(0,0,z,Z);let Lt=!1;const Nt=new Er;let j=!1,ht=!1;const Et=new ue,mt=new C,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function zt(){return A===null?it:1}let U=n;function Gt(b,N){return e.getContext(b,N)}try{const b={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Mr}`),e.addEventListener("webglcontextlost",v,!1),e.addEventListener("webglcontextrestored",O,!1),e.addEventListener("webglcontextcreationerror",H,!1),U===null){const N="webgl2";if(U=Gt(N,b),U===null)throw Gt(N)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let $,ut,et,J,W,at,yt,T,y,F,X,ot,tt,bt,pt,ct,Ct,_t,xt,St,Tt,dt,It,Vt;function Ot(){$=new jf(U),$.init(),dt=new Pm(U,$),ut=new Gf(U,$,t,dt),et=new Cm(U),J=new Jf(U),W=new pm,at=new Rm(U,$,et,W,ut,dt,J),yt=new Wf(x),T=new qf(x),y=new iu(U),It=new kf(U,y),F=new Zf(U,y,J,It),X=new Qf(U,F,y,J),xt=new $f(U,ut,at),ct=new Vf(W),ot=new fm(x,yt,T,$,ut,It,ct),tt=new Fm(x,W),bt=new gm,pt=new Sm($),_t=new Bf(x,yt,T,et,X,d,c),Ct=new Am(x,X,ut),Vt=new Bm(U,J,ut,et),St=new Hf(U,$,J),Tt=new Kf(U,$,J),J.programs=ot.programs,x.capabilities=ut,x.extensions=$,x.properties=W,x.renderLists=bt,x.shadowMap=Ct,x.state=et,x.info=J}Ot();const Wt=new zm(x,U);this.xr=Wt,this.getContext=function(){return U},this.getContextAttributes=function(){return U.getContextAttributes()},this.forceContextLoss=function(){const b=$.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=$.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(b){b!==void 0&&(it=b,this.setSize(z,Z,!1))},this.getSize=function(b){return b.set(z,Z)},this.setSize=function(b,N,q=!0){if(Wt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}z=b,Z=N,e.width=Math.floor(b*it),e.height=Math.floor(N*it),q===!0&&(e.style.width=b+"px",e.style.height=N+"px"),this.setViewport(0,0,b,N)},this.getDrawingBufferSize=function(b){return b.set(z*it,Z*it).floor()},this.setDrawingBufferSize=function(b,N,q){z=b,Z=N,it=q,e.width=Math.floor(b*q),e.height=Math.floor(N*q),this.setViewport(0,0,b,N)},this.getCurrentViewport=function(b){return b.copy(M)},this.getViewport=function(b){return b.copy(st)},this.setViewport=function(b,N,q,V){b.isVector4?st.set(b.x,b.y,b.z,b.w):st.set(b,N,q,V),et.viewport(M.copy(st).multiplyScalar(it).round())},this.getScissor=function(b){return b.copy(gt)},this.setScissor=function(b,N,q,V){b.isVector4?gt.set(b.x,b.y,b.z,b.w):gt.set(b,N,q,V),et.scissor(D.copy(gt).multiplyScalar(it).round())},this.getScissorTest=function(){return Lt},this.setScissorTest=function(b){et.setScissorTest(Lt=b)},this.setOpaqueSort=function(b){B=b},this.setTransparentSort=function(b){Q=b},this.getClearColor=function(b){return b.copy(_t.getClearColor())},this.setClearColor=function(){_t.setClearColor.apply(_t,arguments)},this.getClearAlpha=function(){return _t.getClearAlpha()},this.setClearAlpha=function(){_t.setClearAlpha.apply(_t,arguments)},this.clear=function(b=!0,N=!0,q=!0){let V=0;if(b){let G=!1;if(A!==null){const nt=A.texture.format;G=nt===Ic||nt===Dc||nt===Lc}if(G){const nt=A.texture.type,Mt=nt===Gn||nt===Wi||nt===Ac||nt===gs||nt===Rc||nt===Pc,wt=_t.getClearColor(),Dt=_t.getClearAlpha(),Ut=wt.r,Bt=wt.g,jt=wt.b;Mt?(f[0]=Ut,f[1]=Bt,f[2]=jt,f[3]=Dt,U.clearBufferuiv(U.COLOR,0,f)):(g[0]=Ut,g[1]=Bt,g[2]=jt,g[3]=Dt,U.clearBufferiv(U.COLOR,0,g))}else V|=U.COLOR_BUFFER_BIT}N&&(V|=U.DEPTH_BUFFER_BIT),q&&(V|=U.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),U.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",v,!1),e.removeEventListener("webglcontextrestored",O,!1),e.removeEventListener("webglcontextcreationerror",H,!1),bt.dispose(),pt.dispose(),W.dispose(),yt.dispose(),T.dispose(),X.dispose(),It.dispose(),Vt.dispose(),ot.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",Kt),Wt.removeEventListener("sessionend",ce),Qt.stop()};function v(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),w=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),w=!1;const b=J.autoReset,N=Ct.enabled,q=Ct.autoUpdate,V=Ct.needsUpdate,G=Ct.type;Ot(),J.autoReset=b,Ct.enabled=N,Ct.autoUpdate=q,Ct.needsUpdate=V,Ct.type=G}function H(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function lt(b){const N=b.target;N.removeEventListener("dispose",lt),vt(N)}function vt(b){kt(b),W.remove(b)}function kt(b){const N=W.get(b).programs;N!==void 0&&(N.forEach(function(q){ot.releaseProgram(q)}),b.isShaderMaterial&&ot.releaseShaderCache(b))}this.renderBufferDirect=function(b,N,q,V,G,nt){N===null&&(N=Ft);const Mt=G.isMesh&&G.matrixWorld.determinant()<0,wt=xs(b,N,q,V,G);et.setMaterial(V,Mt);let Dt=q.index,Ut=1;if(V.wireframe===!0){if(Dt=F.getWireframeAttribute(q),Dt===void 0)return;Ut=2}const Bt=q.drawRange,jt=q.attributes.position;let me=Bt.start*Ut,Se=(Bt.start+Bt.count)*Ut;nt!==null&&(me=Math.max(me,nt.start*Ut),Se=Math.min(Se,(nt.start+nt.count)*Ut)),Dt!==null?(me=Math.max(me,0),Se=Math.min(Se,Dt.count)):jt!=null&&(me=Math.max(me,0),Se=Math.min(Se,jt.count));const Re=Se-me;if(Re<0||Re===1/0)return;It.setup(G,V,wt,q,Dt);let Xe,te=St;if(Dt!==null&&(Xe=y.get(Dt),te=Tt,te.setIndex(Xe)),G.isMesh)V.wireframe===!0?(et.setLineWidth(V.wireframeLinewidth*zt()),te.setMode(U.LINES)):te.setMode(U.TRIANGLES);else if(G.isLine){let Yt=V.linewidth;Yt===void 0&&(Yt=1),et.setLineWidth(Yt*zt()),G.isLineSegments?te.setMode(U.LINES):G.isLineLoop?te.setMode(U.LINE_LOOP):te.setMode(U.LINE_STRIP)}else G.isPoints?te.setMode(U.POINTS):G.isSprite&&te.setMode(U.TRIANGLES);if(G.isBatchedMesh)G._multiDrawInstances!==null?te.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances):te.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)te.renderInstances(me,Re,G.count);else if(q.isInstancedBufferGeometry){const Yt=q._maxInstanceCount!==void 0?q._maxInstanceCount:1/0,gn=Math.min(q.instanceCount,Yt);te.renderInstances(me,Re,gn)}else te.render(me,Re)};function Xt(b,N,q){b.transparent===!0&&b.side===Ve&&b.forceSinglePass===!1?(b.side=Ae,b.needsUpdate=!0,We(b,N,q),b.side=hn,b.needsUpdate=!0,We(b,N,q),b.side=Ve):We(b,N,q)}this.compile=function(b,N,q=null){q===null&&(q=b),m=pt.get(q),m.init(N),S.push(m),q.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),b!==q&&b.traverseVisible(function(G){G.isLight&&G.layers.test(N.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(x._useLegacyLights);const V=new Set;return b.traverse(function(G){const nt=G.material;if(nt)if(Array.isArray(nt))for(let Mt=0;Mt<nt.length;Mt++){const wt=nt[Mt];Xt(wt,q,G),V.add(wt)}else Xt(nt,q,G),V.add(nt)}),S.pop(),m=null,V},this.compileAsync=function(b,N,q=null){const V=this.compile(b,N,q);return new Promise(G=>{function nt(){if(V.forEach(function(Mt){W.get(Mt).currentProgram.isReady()&&V.delete(Mt)}),V.size===0){G(b);return}setTimeout(nt,10)}$.get("KHR_parallel_shader_compile")!==null?nt():setTimeout(nt,10)})};let ie=null;function ae(b){ie&&ie(b)}function Kt(){Qt.stop()}function ce(){Qt.start()}const Qt=new Xc;Qt.setAnimationLoop(ae),typeof self<"u"&&Qt.setContext(self),this.setAnimationLoop=function(b){ie=b,Wt.setAnimationLoop(b),b===null?Qt.stop():Qt.start()},Wt.addEventListener("sessionstart",Kt),Wt.addEventListener("sessionend",ce),this.render=function(b,N){if(N!==void 0&&N.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(w===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),N.parent===null&&N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(N),N=Wt.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,N,A),m=pt.get(b,S.length),m.init(N),S.push(m),Et.multiplyMatrices(N.projectionMatrix,N.matrixWorldInverse),Nt.setFromProjectionMatrix(Et),ht=this.localClippingEnabled,j=ct.init(this.clippingPlanes,ht),_=bt.get(b,p.length),_.init(),p.push(_),Ke(b,N,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(B,Q);const q=Wt.enabled===!1||Wt.isPresenting===!1||Wt.hasDepthSensing()===!1;q&&_t.addToRenderList(_,b),this.info.render.frame++,j===!0&&ct.beginShadows();const V=m.state.shadowsArray;Ct.render(V,b,N),j===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=_.opaque,nt=_.transmissive;if(m.setupLights(x._useLegacyLights),N.isArrayCamera){const Mt=N.cameras;if(nt.length>0)for(let wt=0,Dt=Mt.length;wt<Dt;wt++){const Ut=Mt[wt];on(G,nt,b,Ut)}q&&_t.render(b);for(let wt=0,Dt=Mt.length;wt<Dt;wt++){const Ut=Mt[wt];ze(_,b,Ut,Ut.viewport)}}else nt.length>0&&on(G,nt,b,N),q&&_t.render(b),ze(_,b,N);A!==null&&(at.updateMultisampleRenderTarget(A),at.updateRenderTargetMipmap(A)),b.isScene===!0&&b.onAfterRender(x,b,N),It.resetDefaultState(),I=-1,E=null,S.pop(),S.length>0?(m=S[S.length-1],j===!0&&ct.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Ke(b,N,q,V){if(b.visible===!1)return;if(b.layers.test(N.layers)){if(b.isGroup)q=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(N);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Nt.intersectsSprite(b)){V&&mt.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Et);const Mt=X.update(b),wt=b.material;wt.visible&&_.push(b,Mt,wt,q,mt.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Nt.intersectsObject(b))){const Mt=X.update(b),wt=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),mt.copy(b.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),mt.copy(Mt.boundingSphere.center)),mt.applyMatrix4(b.matrixWorld).applyMatrix4(Et)),Array.isArray(wt)){const Dt=Mt.groups;for(let Ut=0,Bt=Dt.length;Ut<Bt;Ut++){const jt=Dt[Ut],me=wt[jt.materialIndex];me&&me.visible&&_.push(b,Mt,me,q,mt.z,jt)}}else wt.visible&&_.push(b,Mt,wt,q,mt.z,null)}}const nt=b.children;for(let Mt=0,wt=nt.length;Mt<wt;Mt++)Ke(nt[Mt],N,q,V)}function ze(b,N,q,V){const G=b.opaque,nt=b.transmissive,Mt=b.transparent;m.setupLightsView(q),j===!0&&ct.setGlobalState(x.clippingPlanes,q),V&&et.viewport(M.copy(V)),G.length>0&&Je(G,N,q),nt.length>0&&Je(nt,N,q),Mt.length>0&&Je(Mt,N,q),et.buffers.depth.setTest(!0),et.buffers.depth.setMask(!0),et.buffers.color.setMask(!0),et.setPolygonOffset(!1)}function on(b,N,q,V){if((q.isScene===!0?q.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new oi(1,1,{generateMipmaps:!0,type:$.has("EXT_color_buffer_half_float")||$.has("EXT_color_buffer_float")?lo:Gn,minFilter:ei,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const nt=m.state.transmissionRenderTarget[V.id],Mt=V.viewport||M;nt.setSize(Mt.z,Mt.w);const wt=x.getRenderTarget();x.setRenderTarget(nt),x.getClearColor(L),Y=x.getClearAlpha(),Y<1&&x.setClearColor(16777215,.5),x.clear();const Dt=x.toneMapping;x.toneMapping=Hn;const Ut=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),j===!0&&ct.setGlobalState(x.clippingPlanes,V),Je(b,q,V),at.updateMultisampleRenderTarget(nt),at.updateRenderTargetMipmap(nt),$.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let jt=0,me=N.length;jt<me;jt++){const Se=N[jt],Re=Se.object,Xe=Se.geometry,te=Se.material,Yt=Se.group;if(te.side===Ve&&Re.layers.test(V.layers)){const gn=te.side;te.side=Ae,te.needsUpdate=!0,mn(Re,q,V,Xe,te,Yt),te.side=gn,te.needsUpdate=!0,Bt=!0}}Bt===!0&&(at.updateMultisampleRenderTarget(nt),at.updateRenderTargetMipmap(nt))}x.setRenderTarget(wt),x.setClearColor(L,Y),Ut!==void 0&&(V.viewport=Ut),x.toneMapping=Dt}function Je(b,N,q){const V=N.isScene===!0?N.overrideMaterial:null;for(let G=0,nt=b.length;G<nt;G++){const Mt=b[G],wt=Mt.object,Dt=Mt.geometry,Ut=V===null?Mt.material:V,Bt=Mt.group;wt.layers.test(q.layers)&&mn(wt,N,q,Dt,Ut,Bt)}}function mn(b,N,q,V,G,nt){b.onBeforeRender(x,N,q,V,G,nt),b.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(x,N,q,V,b,nt),G.transparent===!0&&G.side===Ve&&G.forceSinglePass===!1?(G.side=Ae,G.needsUpdate=!0,x.renderBufferDirect(q,N,V,G,b,nt),G.side=hn,G.needsUpdate=!0,x.renderBufferDirect(q,N,V,G,b,nt),G.side=Ve):x.renderBufferDirect(q,N,V,G,b,nt),b.onAfterRender(x,N,q,V,G,nt)}function We(b,N,q){N.isScene!==!0&&(N=Ft);const V=W.get(b),G=m.state.lights,nt=m.state.shadowsArray,Mt=G.state.version,wt=ot.getParameters(b,G.state,nt,N,q),Dt=ot.getProgramCacheKey(wt);let Ut=V.programs;V.environment=b.isMeshStandardMaterial?N.environment:null,V.fog=N.fog,V.envMap=(b.isMeshStandardMaterial?T:yt).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?N.environmentRotation:b.envMapRotation,Ut===void 0&&(b.addEventListener("dispose",lt),Ut=new Map,V.programs=Ut);let Bt=Ut.get(Dt);if(Bt!==void 0){if(V.currentProgram===Bt&&V.lightsStateVersion===Mt)return Zi(b,wt),Bt}else wt.uniforms=ot.getUniforms(b),b.onBuild(q,wt,x),b.onBeforeCompile(wt,x),Bt=ot.acquireProgram(wt,Dt),Ut.set(Dt,Bt),V.uniforms=wt.uniforms;const jt=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(jt.clippingPlanes=ct.uniform),Zi(b,wt),V.needsLights=vs(b),V.lightsStateVersion=Mt,V.needsLights&&(jt.ambientLightColor.value=G.state.ambient,jt.lightProbe.value=G.state.probe,jt.directionalLights.value=G.state.directional,jt.directionalLightShadows.value=G.state.directionalShadow,jt.spotLights.value=G.state.spot,jt.spotLightShadows.value=G.state.spotShadow,jt.rectAreaLights.value=G.state.rectArea,jt.ltc_1.value=G.state.rectAreaLTC1,jt.ltc_2.value=G.state.rectAreaLTC2,jt.pointLights.value=G.state.point,jt.pointLightShadows.value=G.state.pointShadow,jt.hemisphereLights.value=G.state.hemi,jt.directionalShadowMap.value=G.state.directionalShadowMap,jt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,jt.spotShadowMap.value=G.state.spotShadowMap,jt.spotLightMatrix.value=G.state.spotLightMatrix,jt.spotLightMap.value=G.state.spotLightMap,jt.pointShadowMap.value=G.state.pointShadowMap,jt.pointShadowMatrix.value=G.state.pointShadowMatrix),V.currentProgram=Bt,V.uniformsList=null,Bt}function $e(b){if(b.uniformsList===null){const N=b.currentProgram.getUniforms();b.uniformsList=Zs.seqWithValue(N.seq,b.uniforms)}return b.uniformsList}function Zi(b,N){const q=W.get(b);q.outputColorSpace=N.outputColorSpace,q.batching=N.batching,q.instancing=N.instancing,q.instancingColor=N.instancingColor,q.instancingMorph=N.instancingMorph,q.skinning=N.skinning,q.morphTargets=N.morphTargets,q.morphNormals=N.morphNormals,q.morphColors=N.morphColors,q.morphTargetsCount=N.morphTargetsCount,q.numClippingPlanes=N.numClippingPlanes,q.numIntersection=N.numClipIntersection,q.vertexAlphas=N.vertexAlphas,q.vertexTangents=N.vertexTangents,q.toneMapping=N.toneMapping}function xs(b,N,q,V,G){N.isScene!==!0&&(N=Ft),at.resetTextureUnits();const nt=N.fog,Mt=V.isMeshStandardMaterial?N.environment:null,wt=A===null?x.outputColorSpace:A.isXRRenderTarget===!0?A.texture.colorSpace:Vn,Dt=(V.isMeshStandardMaterial?T:yt).get(V.envMap||Mt),Ut=V.vertexColors===!0&&!!q.attributes.color&&q.attributes.color.itemSize===4,Bt=!!q.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),jt=!!q.morphAttributes.position,me=!!q.morphAttributes.normal,Se=!!q.morphAttributes.color;let Re=Hn;V.toneMapped&&(A===null||A.isXRRenderTarget===!0)&&(Re=x.toneMapping);const Xe=q.morphAttributes.position||q.morphAttributes.normal||q.morphAttributes.color,te=Xe!==void 0?Xe.length:0,Yt=W.get(V),gn=m.state.lights;if(j===!0&&(ht===!0||b!==E)){const Ye=b===E&&V.id===I;ct.setState(V,b,Ye)}let de=!1;V.version===Yt.__version?(Yt.needsLights&&Yt.lightsStateVersion!==gn.state.version||Yt.outputColorSpace!==wt||G.isBatchedMesh&&Yt.batching===!1||!G.isBatchedMesh&&Yt.batching===!0||G.isInstancedMesh&&Yt.instancing===!1||!G.isInstancedMesh&&Yt.instancing===!0||G.isSkinnedMesh&&Yt.skinning===!1||!G.isSkinnedMesh&&Yt.skinning===!0||G.isInstancedMesh&&Yt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Yt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Yt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Yt.instancingMorph===!1&&G.morphTexture!==null||Yt.envMap!==Dt||V.fog===!0&&Yt.fog!==nt||Yt.numClippingPlanes!==void 0&&(Yt.numClippingPlanes!==ct.numPlanes||Yt.numIntersection!==ct.numIntersection)||Yt.vertexAlphas!==Ut||Yt.vertexTangents!==Bt||Yt.morphTargets!==jt||Yt.morphNormals!==me||Yt.morphColors!==Se||Yt.toneMapping!==Re||Yt.morphTargetsCount!==te)&&(de=!0):(de=!0,Yt.__version=V.version);let Wn=Yt.currentProgram;de===!0&&(Wn=We(V,N,G));let Dr=!1,Ki=!1,Mo=!1;const Pe=Wn.getUniforms(),Tn=Yt.uniforms;if(et.useProgram(Wn.program)&&(Dr=!0,Ki=!0,Mo=!0),V.id!==I&&(I=V.id,Ki=!0),Dr||E!==b){Pe.setValue(U,"projectionMatrix",b.projectionMatrix),Pe.setValue(U,"viewMatrix",b.matrixWorldInverse);const Ye=Pe.map.cameraPosition;Ye!==void 0&&Ye.setValue(U,mt.setFromMatrixPosition(b.matrixWorld)),ut.logarithmicDepthBuffer&&Pe.setValue(U,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Pe.setValue(U,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,Ki=!0,Mo=!0)}if(G.isSkinnedMesh){Pe.setOptional(U,G,"bindMatrix"),Pe.setOptional(U,G,"bindMatrixInverse");const Ye=G.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),Pe.setValue(U,"boneTexture",Ye.boneTexture,at))}G.isBatchedMesh&&(Pe.setOptional(U,G,"batchingTexture"),Pe.setValue(U,"batchingTexture",G._matricesTexture,at));const yo=q.morphAttributes;if((yo.position!==void 0||yo.normal!==void 0||yo.color!==void 0)&&xt.update(G,q,Wn),(Ki||Yt.receiveShadow!==G.receiveShadow)&&(Yt.receiveShadow=G.receiveShadow,Pe.setValue(U,"receiveShadow",G.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Tn.envMap.value=Dt,Tn.flipEnvMap.value=Dt.isCubeTexture&&Dt.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&N.environment!==null&&(Tn.envMapIntensity.value=N.environmentIntensity),Ki&&(Pe.setValue(U,"toneMappingExposure",x.toneMappingExposure),Yt.needsLights&&ui(Tn,Mo),nt&&V.fog===!0&&tt.refreshFogUniforms(Tn,nt),tt.refreshMaterialUniforms(Tn,V,it,Z,m.state.transmissionRenderTarget[b.id]),Zs.upload(U,$e(Yt),Tn,at)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Zs.upload(U,$e(Yt),Tn,at),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Pe.setValue(U,"center",G.center),Pe.setValue(U,"modelViewMatrix",G.modelViewMatrix),Pe.setValue(U,"normalMatrix",G.normalMatrix),Pe.setValue(U,"modelMatrix",G.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ye=V.uniformsGroups;for(let So=0,hl=Ye.length;So<hl;So++){const Ir=Ye[So];Vt.update(Ir,Wn),Vt.bind(Ir,Wn)}}return Wn}function ui(b,N){b.ambientLightColor.needsUpdate=N,b.lightProbe.needsUpdate=N,b.directionalLights.needsUpdate=N,b.directionalLightShadows.needsUpdate=N,b.pointLights.needsUpdate=N,b.pointLightShadows.needsUpdate=N,b.spotLights.needsUpdate=N,b.spotLightShadows.needsUpdate=N,b.rectAreaLights.needsUpdate=N,b.hemisphereLights.needsUpdate=N}function vs(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return R},this.getRenderTarget=function(){return A},this.setRenderTargetTextures=function(b,N,q){W.get(b.texture).__webglTexture=N,W.get(b.depthTexture).__webglTexture=q;const V=W.get(b);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=q===void 0,V.__autoAllocateDepthBuffer||$.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,N){const q=W.get(b);q.__webglFramebuffer=N,q.__useDefaultFramebuffer=N===void 0},this.setRenderTarget=function(b,N=0,q=0){A=b,P=N,R=q;let V=!0,G=null,nt=!1,Mt=!1;if(b){const Dt=W.get(b);Dt.__useDefaultFramebuffer!==void 0?(et.bindFramebuffer(U.FRAMEBUFFER,null),V=!1):Dt.__webglFramebuffer===void 0?at.setupRenderTarget(b):Dt.__hasExternalTextures&&at.rebindTextures(b,W.get(b.texture).__webglTexture,W.get(b.depthTexture).__webglTexture);const Ut=b.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Mt=!0);const Bt=W.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Bt[N])?G=Bt[N][q]:G=Bt[N],nt=!0):b.samples>0&&at.useMultisampledRTT(b)===!1?G=W.get(b).__webglMultisampledFramebuffer:Array.isArray(Bt)?G=Bt[q]:G=Bt,M.copy(b.viewport),D.copy(b.scissor),k=b.scissorTest}else M.copy(st).multiplyScalar(it).floor(),D.copy(gt).multiplyScalar(it).floor(),k=Lt;if(et.bindFramebuffer(U.FRAMEBUFFER,G)&&V&&et.drawBuffers(b,G),et.viewport(M),et.scissor(D),et.setScissorTest(k),nt){const Dt=W.get(b.texture);U.framebufferTexture2D(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,U.TEXTURE_CUBE_MAP_POSITIVE_X+N,Dt.__webglTexture,q)}else if(Mt){const Dt=W.get(b.texture),Ut=N||0;U.framebufferTextureLayer(U.FRAMEBUFFER,U.COLOR_ATTACHMENT0,Dt.__webglTexture,q||0,Ut)}I=-1},this.readRenderTargetPixels=function(b,N,q,V,G,nt,Mt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=W.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(wt=wt[Mt]),wt){et.bindFramebuffer(U.FRAMEBUFFER,wt);try{const Dt=b.texture,Ut=Dt.format,Bt=Dt.type;if(!ut.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!ut.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}N>=0&&N<=b.width-V&&q>=0&&q<=b.height-G&&U.readPixels(N,q,V,G,dt.convert(Ut),dt.convert(Bt),nt)}finally{const Dt=A!==null?W.get(A).__webglFramebuffer:null;et.bindFramebuffer(U.FRAMEBUFFER,Dt)}}},this.copyFramebufferToTexture=function(b,N,q=0){const V=Math.pow(2,-q),G=Math.floor(N.image.width*V),nt=Math.floor(N.image.height*V);at.setTexture2D(N,0),U.copyTexSubImage2D(U.TEXTURE_2D,q,0,0,b.x,b.y,G,nt),et.unbindTexture()},this.copyTextureToTexture=function(b,N,q,V=0){const G=N.image.width,nt=N.image.height,Mt=dt.convert(q.format),wt=dt.convert(q.type);at.setTexture2D(q,0),U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,q.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,q.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,q.unpackAlignment),N.isDataTexture?U.texSubImage2D(U.TEXTURE_2D,V,b.x,b.y,G,nt,Mt,wt,N.image.data):N.isCompressedTexture?U.compressedTexSubImage2D(U.TEXTURE_2D,V,b.x,b.y,N.mipmaps[0].width,N.mipmaps[0].height,Mt,N.mipmaps[0].data):U.texSubImage2D(U.TEXTURE_2D,V,b.x,b.y,Mt,wt,N.image),V===0&&q.generateMipmaps&&U.generateMipmap(U.TEXTURE_2D),et.unbindTexture()},this.copyTextureToTexture3D=function(b,N,q,V,G=0){const nt=b.max.x-b.min.x,Mt=b.max.y-b.min.y,wt=b.max.z-b.min.z,Dt=dt.convert(V.format),Ut=dt.convert(V.type);let Bt;if(V.isData3DTexture)at.setTexture3D(V,0),Bt=U.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)at.setTexture2DArray(V,0),Bt=U.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL,V.flipY),U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),U.pixelStorei(U.UNPACK_ALIGNMENT,V.unpackAlignment);const jt=U.getParameter(U.UNPACK_ROW_LENGTH),me=U.getParameter(U.UNPACK_IMAGE_HEIGHT),Se=U.getParameter(U.UNPACK_SKIP_PIXELS),Re=U.getParameter(U.UNPACK_SKIP_ROWS),Xe=U.getParameter(U.UNPACK_SKIP_IMAGES),te=q.isCompressedTexture?q.mipmaps[G]:q.image;U.pixelStorei(U.UNPACK_ROW_LENGTH,te.width),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,te.height),U.pixelStorei(U.UNPACK_SKIP_PIXELS,b.min.x),U.pixelStorei(U.UNPACK_SKIP_ROWS,b.min.y),U.pixelStorei(U.UNPACK_SKIP_IMAGES,b.min.z),q.isDataTexture||q.isData3DTexture?U.texSubImage3D(Bt,G,N.x,N.y,N.z,nt,Mt,wt,Dt,Ut,te.data):V.isCompressedArrayTexture?U.compressedTexSubImage3D(Bt,G,N.x,N.y,N.z,nt,Mt,wt,Dt,te.data):U.texSubImage3D(Bt,G,N.x,N.y,N.z,nt,Mt,wt,Dt,Ut,te),U.pixelStorei(U.UNPACK_ROW_LENGTH,jt),U.pixelStorei(U.UNPACK_IMAGE_HEIGHT,me),U.pixelStorei(U.UNPACK_SKIP_PIXELS,Se),U.pixelStorei(U.UNPACK_SKIP_ROWS,Re),U.pixelStorei(U.UNPACK_SKIP_IMAGES,Xe),G===0&&V.generateMipmaps&&U.generateMipmap(Bt),et.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?at.setTextureCube(b,0):b.isData3DTexture?at.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?at.setTexture2DArray(b,0):at.setTexture2D(b,0),et.unbindTexture()},this.resetState=function(){P=0,R=0,A=null,et.reset(),It.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===yr?"display-p3":"srgb",e.unpackColorSpace=re.workingColorSpace===ho?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Tr{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Zt(t),this.near=e,this.far=n}clone(){return new Tr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Hm extends Ce{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ni extends qi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Zt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const so=new C,oo=new C,ec=new ue,es=new po,Gs=new fo,tr=new C,nc=new C;class Bn extends Ce{constructor(t=new pe,e=new ni){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,o=e.count;i<o;i++)so.fromBufferAttribute(e,i-1),oo.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=so.distanceTo(oo);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,o=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(i),Gs.radius+=o,t.ray.intersectsSphere(Gs)===!1)return;ec.copy(i).invert(),es.copy(t.ray).applyMatrix4(ec);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),S=h.getX(_+1),x=Vs(this,t,es,c,p,S);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Vs(this,t,es,c,_,m);p&&e.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=l){const p=Vs(this,t,es,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Vs(this,t,es,c,g-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Vs(s,t,e,n,i,o){const r=s.geometry.attributes.position;if(so.fromBufferAttribute(r,i),oo.fromBufferAttribute(r,o),e.distanceSqToSegment(so,oo,tr,nc)>n)return;tr.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(tr);if(!(c<t.near||c>t.far))return{distance:c,point:nc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}class ii extends ye{constructor(t,e,n,i,o,r,a,c,l){super(t,e,n,i,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class fn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(i),e.push(o),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(o-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(o-1)}getTangent(t,e){let i=t-1e-4,o=t+1e-4;i<0&&(i=0),o>1&&(o=1);const r=this.getPoint(i),a=this.getPoint(o),c=e||(r.isVector2?new ft:new C);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new C,i=[],o=[],r=[],a=new C,c=new ue;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new C)}o[0]=new C,r[0]=new C;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],a),r[0].crossVectors(i[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Me(i[f-1].dot(i[f]),-1,1));o[f].applyMatrix4(c.makeRotationAxis(a,g))}r[f].crossVectors(i[f],o[f])}if(e===!0){let f=Math.acos(Me(o[0].dot(o[t]),-1,1));f/=t,i[0].dot(a.crossVectors(o[0],o[t]))>0&&(f=-f);for(let g=1;g<=t;g++)o[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),r[g].crossVectors(i[g],o[g])}return{tangents:i,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Ar extends fn{constructor(t=0,e=0,n=1,i=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ft){const n=e,i=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(r?o=0:o=i),this.aClockwise===!0&&!r&&(o===i?o=-i:o=o-i);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Gm extends Ar{constructor(t,e,n,i,o,r){super(t,e,n,n,i,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Cr(){let s=0,t=0,e=0,n=0;function i(o,r,a,c){s=o,t=a,e=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){i(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,h,u){let d=(r-o)/l-(a-o)/(l+h)+(a-r)/h,f=(a-r)/h-(c-r)/(h+u)+(c-a)/u;d*=h,f*=h,i(r,a,d,f)},calc:function(o){const r=o*o,a=r*o;return s+t*o+e*r+n*a}}}const Ws=new C,er=new Cr,nr=new Cr,ir=new Cr;class Hi extends fn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new C){const n=e,i=this.points,o=i.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%o]:(Ws.subVectors(i[0],i[1]).add(i[0]),l=Ws);const u=i[a%o],d=i[(a+1)%o];if(this.closed||a+2<o?h=i[(a+2)%o]:(Ws.subVectors(i[o-1],i[o-2]).add(i[o-1]),h=Ws),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),er.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),nr.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),ir.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(er.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),nr.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),ir.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(er.calc(c),nr.calc(c),ir.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new C().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function ic(s,t,e,n,i){const o=(n-t)*.5,r=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+o+r)*c+(-3*e+3*n-2*o-r)*a+o*s+e}function Vm(s,t){const e=1-s;return e*e*t}function Wm(s,t){return 2*(1-s)*s*t}function Xm(s,t){return s*s*t}function cs(s,t,e,n){return Vm(s,t)+Wm(s,e)+Xm(s,n)}function Ym(s,t){const e=1-s;return e*e*e*t}function qm(s,t){const e=1-s;return 3*e*e*s*t}function jm(s,t){return 3*(1-s)*s*s*t}function Zm(s,t){return s*s*s*t}function ls(s,t,e,n,i){return Ym(s,t)+qm(s,e)+jm(s,n)+Zm(s,i)}class Qc extends fn{constructor(t=new ft,e=new ft,n=new ft,i=new ft){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ft){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(ls(t,i.x,o.x,r.x,a.x),ls(t,i.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Km extends fn{constructor(t=new C,e=new C,n=new C,i=new C){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new C){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(ls(t,i.x,o.x,r.x,a.x),ls(t,i.y,o.y,r.y,a.y),ls(t,i.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class tl extends fn{constructor(t=new ft,e=new ft){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ft){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ft){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jm extends fn{constructor(t=new C,e=new C){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new C){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new C){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class el extends fn{constructor(t=new ft,e=new ft,n=new ft){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ft){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(cs(t,i.x,o.x,r.x),cs(t,i.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Yi extends fn{constructor(t=new C,e=new C,n=new C){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new C){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(cs(t,i.x,o.x,r.x),cs(t,i.y,o.y,r.y),cs(t,i.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class nl extends fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ft){const n=e,i=this.points,o=(i.length-1)*t,r=Math.floor(o),a=o-r,c=i[r===0?r:r-1],l=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(ic(a,c.x,l.x,h.x,u.x),ic(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ft().fromArray(i))}return this}}var ro=Object.freeze({__proto__:null,ArcCurve:Gm,CatmullRomCurve3:Hi,CubicBezierCurve:Qc,CubicBezierCurve3:Km,EllipseCurve:Ar,LineCurve:tl,LineCurve3:Jm,QuadraticBezierCurve:el,QuadraticBezierCurve3:Yi,SplineCurve:nl});class $m extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ro[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let o=0;for(;o<i.length;){if(i[o]>=n){const r=i[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,o=this.curves;i<o.length;i++){const r=o[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ro[i.type]().fromJSON(i))}return this}}class mr extends $m{constructor(t){super(),this.type="Path",this.currentPoint=new ft,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new tl(this.currentPoint.clone(),new ft(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const o=new el(this.currentPoint.clone(),new ft(t,e),new ft(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,o,r){const a=new Qc(this.currentPoint.clone(),new ft(t,e),new ft(n,i),new ft(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new nl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,o,r),this}absarc(t,e,n,i,o,r){return this.absellipse(t,e,n,n,i,o,r),this}ellipse(t,e,n,i,o,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,o,r,a,c),this}absellipse(t,e,n,i,o,r,a,c){const l=new Ar(t,e,n,i,o,r,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class go extends pe{constructor(t=[new ft(0,-.5),new ft(.5,0),new ft(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Me(i,0,Math.PI*2);const o=[],r=[],a=[],c=[],l=[],h=1/e,u=new C,d=new ft,f=new C,g=new C,_=new C;let m=0,p=0;for(let S=0;S<=t.length-1;S++)switch(S){case 0:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[S+1].x-t[S].x,p=t[S+1].y-t[S].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let S=0;S<=e;S++){const x=n+S*h*i,w=Math.sin(x),P=Math.cos(x);for(let R=0;R<=t.length-1;R++){u.x=t[R].x*w,u.y=t[R].y,u.z=t[R].x*P,r.push(u.x,u.y,u.z),d.x=S/e,d.y=R/(t.length-1),a.push(d.x,d.y);const A=c[3*R+0]*w,I=c[3*R+1],E=c[3*R+0]*P;l.push(A,I,E)}}for(let S=0;S<e;S++)for(let x=0;x<t.length-1;x++){const w=x+S*t.length,P=w,R=w+t.length,A=w+t.length+1,I=w+1;o.push(P,R,I),o.push(A,I,R)}this.setIndex(o),this.setAttribute("position",new oe(r,3)),this.setAttribute("uv",new oe(a,2)),this.setAttribute("normal",new oe(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new go(t.points,t.segments,t.phiStart,t.phiLength)}}class ao extends go{constructor(t=1,e=1,n=4,i=8){const o=new mr;o.absarc(0,-e/2,t,Math.PI*1.5,0),o.absarc(0,e/2,t,0,Math.PI*.5),super(o.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new ao(t.radius,t.length,t.capSegments,t.radialSegments)}}class _o extends pe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new C,h=new ft;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[d]/t+1)/2,h.y=(r[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)o.push(u,u+1,0);this.setIndex(o),this.setAttribute("position",new oe(r,3)),this.setAttribute("normal",new oe(a,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _o(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class xe extends pe{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),o=Math.floor(o);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;S(),r===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function S(){const w=new C,P=new C;let R=0;const A=(e-t)/n;for(let I=0;I<=o;I++){const E=[],M=I/o,D=M*(e-t)+t;for(let k=0;k<=i;k++){const L=k/i,Y=L*c+a,z=Math.sin(Y),Z=Math.cos(Y);P.x=D*z,P.y=-M*n+m,P.z=D*Z,u.push(P.x,P.y,P.z),w.set(z,A,Z).normalize(),d.push(w.x,w.y,w.z),f.push(L,1-M),E.push(g++)}_.push(E)}for(let I=0;I<i;I++)for(let E=0;E<o;E++){const M=_[E][I],D=_[E+1][I],k=_[E+1][I+1],L=_[E][I+1];h.push(M,D,L),h.push(D,k,L),R+=6}l.addGroup(p,R,0),p+=R}function x(w){const P=g,R=new ft,A=new C;let I=0;const E=w===!0?t:e,M=w===!0?1:-1;for(let k=1;k<=i;k++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const D=g;for(let k=0;k<=i;k++){const Y=k/i*c+a,z=Math.cos(Y),Z=Math.sin(Y);A.x=E*Z,A.y=m*M,A.z=E*z,u.push(A.x,A.y,A.z),d.push(0,M,0),R.x=z*.5+.5,R.y=Z*.5*M+.5,f.push(R.x,R.y),g++}for(let k=0;k<i;k++){const L=P+k,Y=D+k;w===!0?h.push(Y,Y+1,L):h.push(Y+1,Y,L),I+=3}l.addGroup(p,I,w===!0?1:2),p+=I}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ai extends xe{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new ai(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class il extends mr{constructor(t){super(t),this.uuid=hi(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new mr().fromJSON(i))}return this}}const Qm={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let o=sl(s,0,i,e,!0);const r=[];if(!o||o.next===o.prev)return r;let a,c,l,h,u,d,f;if(n&&(o=s0(s,t,o,e)),s.length>80*e){a=l=s[0],c=h=s[1];for(let g=e;g<i;g+=e)u=s[g],d=s[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return fs(o,r,e,a,c,f,0),r}};function sl(s,t,e,n,i){let o,r;if(i===m0(s,t,e,n)>0)for(o=t;o<e;o+=n)r=sc(o,s[o],s[o+1],r);else for(o=e-n;o>=t;o-=n)r=sc(o,s[o],s[o+1],r);return r&&xo(r,r.next)&&(ms(r),r=r.next),r}function ci(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(xo(e,e.next)||ge(e.prev,e,e.next)===0)){if(ms(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function fs(s,t,e,n,i,o,r){if(!s)return;!r&&o&&l0(s,n,i,o);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,o?e0(s,n,i,o):t0(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),ms(s),s=l.next,a=l.next;continue}if(s=l,s===a){r?r===1?(s=n0(ci(s),t,e),fs(s,t,e,n,i,o,2)):r===2&&i0(s,t,e,n,i,o):fs(ci(s),t,e,n,i,o,1);break}}}function t0(s){const t=s.prev,e=s,n=s.next;if(ge(t,e,n)>=0)return!1;const i=t.x,o=e.x,r=n.x,a=t.y,c=e.y,l=n.y,h=i<o?i<r?i:r:o<r?o:r,u=a<c?a<l?a:l:c<l?c:l,d=i>o?i>r?i:r:o>r?o:r,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&zi(i,a,o,c,r,l,g.x,g.y)&&ge(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function e0(s,t,e,n){const i=s.prev,o=s,r=s.next;if(ge(i,o,r)>=0)return!1;const a=i.x,c=o.x,l=r.x,h=i.y,u=o.y,d=r.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=gr(f,g,t,e,n),S=gr(_,m,t,e,n);let x=s.prevZ,w=s.nextZ;for(;x&&x.z>=p&&w&&w.z<=S;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==r&&zi(a,h,c,u,l,d,x.x,x.y)&&ge(x.prev,x,x.next)>=0||(x=x.prevZ,w.x>=f&&w.x<=_&&w.y>=g&&w.y<=m&&w!==i&&w!==r&&zi(a,h,c,u,l,d,w.x,w.y)&&ge(w.prev,w,w.next)>=0))return!1;w=w.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==r&&zi(a,h,c,u,l,d,x.x,x.y)&&ge(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;w&&w.z<=S;){if(w.x>=f&&w.x<=_&&w.y>=g&&w.y<=m&&w!==i&&w!==r&&zi(a,h,c,u,l,d,w.x,w.y)&&ge(w.prev,w,w.next)>=0)return!1;w=w.nextZ}return!0}function n0(s,t,e){let n=s;do{const i=n.prev,o=n.next.next;!xo(i,o)&&ol(i,n,n.next,o)&&ps(i,o)&&ps(o,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),ms(n),ms(n.next),n=s=o),n=n.next}while(n!==s);return ci(n)}function i0(s,t,e,n,i,o){let r=s;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&d0(r,a)){let c=rl(r,a);r=ci(r,r.next),c=ci(c,c.next),fs(r,t,e,n,i,o,0),fs(c,t,e,n,i,o,0);return}a=a.next}r=r.next}while(r!==s)}function s0(s,t,e,n){const i=[];let o,r,a,c,l;for(o=0,r=t.length;o<r;o++)a=t[o]*n,c=o<r-1?t[o+1]*n:s.length,l=sl(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(u0(l));for(i.sort(o0),o=0;o<i.length;o++)e=r0(i[o],e);return e}function o0(s,t){return s.x-t.x}function r0(s,t){const e=a0(s,t);if(!e)return t;const n=rl(e,s);return ci(n,n.next),ci(e,e.next)}function a0(s,t){let e=t,n=-1/0,i;const o=s.x,r=s.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const d=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=o&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===o))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,u;e=i;do o>=e.x&&e.x>=c&&o!==e.x&&zi(r<l?o:n,r,c,l,r<l?n:o,r,e.x,e.y)&&(u=Math.abs(r-e.y)/(o-e.x),ps(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&c0(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function c0(s,t){return ge(s.prev,s,t.prev)<0&&ge(t.next,s,s.next)<0}function l0(s,t,e,n){let i=s;do i.z===0&&(i.z=gr(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,h0(i)}function h0(s){let t,e,n,i,o,r,a,c,l=1;do{for(e=s,s=null,o=null,r=0;e;){for(r++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),o?o.nextZ=i:s=i,i.prevZ=o,o=i;e=n}o.nextZ=null,l*=2}while(r>1);return s}function gr(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function u0(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function zi(s,t,e,n,i,o,r,a){return(i-r)*(t-a)>=(s-r)*(o-a)&&(s-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(o-a)>=(i-r)*(n-a)}function d0(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!f0(s,t)&&(ps(s,t)&&ps(t,s)&&p0(s,t)&&(ge(s.prev,s,t.prev)||ge(s,t.prev,t))||xo(s,t)&&ge(s.prev,s,s.next)>0&&ge(t.prev,t,t.next)>0)}function ge(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function xo(s,t){return s.x===t.x&&s.y===t.y}function ol(s,t,e,n){const i=Ys(ge(s,t,e)),o=Ys(ge(s,t,n)),r=Ys(ge(e,n,s)),a=Ys(ge(e,n,t));return!!(i!==o&&r!==a||i===0&&Xs(s,e,t)||o===0&&Xs(s,n,t)||r===0&&Xs(e,s,n)||a===0&&Xs(e,t,n))}function Xs(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ys(s){return s>0?1:s<0?-1:0}function f0(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&ol(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function ps(s,t){return ge(s.prev,s,s.next)<0?ge(s,t,s.next)>=0&&ge(s,s.prev,t)>=0:ge(s,t,s.prev)<0||ge(s,s.next,t)<0}function p0(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,o=(s.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&i<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function rl(s,t){const e=new _r(s.i,s.x,s.y),n=new _r(t.i,t.x,t.y),i=s.next,o=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function sc(s,t,e,n){const i=new _r(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ms(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function _r(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function m0(s,t,e,n){let i=0;for(let o=t,r=e-n;o<e;o+=n)i+=(s[r]-s[o])*(s[o+1]+s[r+1]),r=o;return i}class hs{static area(t){const e=t.length;let n=0;for(let i=e-1,o=0;o<e;i=o++)n+=t[i].x*t[o].y-t[o].x*t[i].y;return n*.5}static isClockWise(t){return hs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],o=[];oc(t),rc(n,t);let r=t.length;e.forEach(oc);for(let c=0;c<e.length;c++)i.push(r),r+=e[c].length,rc(n,e[c]);const a=Qm.triangulate(n,i);for(let c=0;c<a.length;c+=3)o.push(a.slice(c,c+3));return o}}function oc(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function rc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Rr extends pe{constructor(t=new il([new ft(.5,.5),new ft(-.5,.5),new ft(-.5,-.5),new ft(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];r(l)}this.setAttribute("position",new oe(i,3)),this.setAttribute("uv",new oe(o,2)),this.computeVertexNormals();function r(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,S=e.UVGenerator!==void 0?e.UVGenerator:g0;let x,w=!1,P,R,A,I;p&&(x=p.getSpacedPoints(h),w=!0,d=!1,P=p.computeFrenetFrames(h,!1),R=new C,A=new C,I=new C),d||(m=0,f=0,g=0,_=0);const E=a.extractPoints(l);let M=E.shape;const D=E.holes;if(!hs.isClockWise(M)){M=M.reverse();for(let $=0,ut=D.length;$<ut;$++){const et=D[$];hs.isClockWise(et)&&(D[$]=et.reverse())}}const L=hs.triangulateShape(M,D),Y=M;for(let $=0,ut=D.length;$<ut;$++){const et=D[$];M=M.concat(et)}function z($,ut,et){return ut||console.error("THREE.ExtrudeGeometry: vec does not exist"),$.clone().addScaledVector(ut,et)}const Z=M.length,it=L.length;function B($,ut,et){let J,W,at;const yt=$.x-ut.x,T=$.y-ut.y,y=et.x-$.x,F=et.y-$.y,X=yt*yt+T*T,ot=yt*F-T*y;if(Math.abs(ot)>Number.EPSILON){const tt=Math.sqrt(X),bt=Math.sqrt(y*y+F*F),pt=ut.x-T/tt,ct=ut.y+yt/tt,Ct=et.x-F/bt,_t=et.y+y/bt,xt=((Ct-pt)*F-(_t-ct)*y)/(yt*F-T*y);J=pt+yt*xt-$.x,W=ct+T*xt-$.y;const St=J*J+W*W;if(St<=2)return new ft(J,W);at=Math.sqrt(St/2)}else{let tt=!1;yt>Number.EPSILON?y>Number.EPSILON&&(tt=!0):yt<-Number.EPSILON?y<-Number.EPSILON&&(tt=!0):Math.sign(T)===Math.sign(F)&&(tt=!0),tt?(J=-T,W=yt,at=Math.sqrt(X)):(J=yt,W=T,at=Math.sqrt(X/2))}return new ft(J/at,W/at)}const Q=[];for(let $=0,ut=Y.length,et=ut-1,J=$+1;$<ut;$++,et++,J++)et===ut&&(et=0),J===ut&&(J=0),Q[$]=B(Y[$],Y[et],Y[J]);const st=[];let gt,Lt=Q.concat();for(let $=0,ut=D.length;$<ut;$++){const et=D[$];gt=[];for(let J=0,W=et.length,at=W-1,yt=J+1;J<W;J++,at++,yt++)at===W&&(at=0),yt===W&&(yt=0),gt[J]=B(et[J],et[at],et[yt]);st.push(gt),Lt=Lt.concat(gt)}for(let $=0;$<m;$++){const ut=$/m,et=f*Math.cos(ut*Math.PI/2),J=g*Math.sin(ut*Math.PI/2)+_;for(let W=0,at=Y.length;W<at;W++){const yt=z(Y[W],Q[W],J);mt(yt.x,yt.y,-et)}for(let W=0,at=D.length;W<at;W++){const yt=D[W];gt=st[W];for(let T=0,y=yt.length;T<y;T++){const F=z(yt[T],gt[T],J);mt(F.x,F.y,-et)}}}const Nt=g+_;for(let $=0;$<Z;$++){const ut=d?z(M[$],Lt[$],Nt):M[$];w?(A.copy(P.normals[0]).multiplyScalar(ut.x),R.copy(P.binormals[0]).multiplyScalar(ut.y),I.copy(x[0]).add(A).add(R),mt(I.x,I.y,I.z)):mt(ut.x,ut.y,0)}for(let $=1;$<=h;$++)for(let ut=0;ut<Z;ut++){const et=d?z(M[ut],Lt[ut],Nt):M[ut];w?(A.copy(P.normals[$]).multiplyScalar(et.x),R.copy(P.binormals[$]).multiplyScalar(et.y),I.copy(x[$]).add(A).add(R),mt(I.x,I.y,I.z)):mt(et.x,et.y,u/h*$)}for(let $=m-1;$>=0;$--){const ut=$/m,et=f*Math.cos(ut*Math.PI/2),J=g*Math.sin(ut*Math.PI/2)+_;for(let W=0,at=Y.length;W<at;W++){const yt=z(Y[W],Q[W],J);mt(yt.x,yt.y,u+et)}for(let W=0,at=D.length;W<at;W++){const yt=D[W];gt=st[W];for(let T=0,y=yt.length;T<y;T++){const F=z(yt[T],gt[T],J);w?mt(F.x,F.y+x[h-1].y,x[h-1].x+et):mt(F.x,F.y,u+et)}}}j(),ht();function j(){const $=i.length/3;if(d){let ut=0,et=Z*ut;for(let J=0;J<it;J++){const W=L[J];Ft(W[2]+et,W[1]+et,W[0]+et)}ut=h+m*2,et=Z*ut;for(let J=0;J<it;J++){const W=L[J];Ft(W[0]+et,W[1]+et,W[2]+et)}}else{for(let ut=0;ut<it;ut++){const et=L[ut];Ft(et[2],et[1],et[0])}for(let ut=0;ut<it;ut++){const et=L[ut];Ft(et[0]+Z*h,et[1]+Z*h,et[2]+Z*h)}}n.addGroup($,i.length/3-$,0)}function ht(){const $=i.length/3;let ut=0;Et(Y,ut),ut+=Y.length;for(let et=0,J=D.length;et<J;et++){const W=D[et];Et(W,ut),ut+=W.length}n.addGroup($,i.length/3-$,1)}function Et($,ut){let et=$.length;for(;--et>=0;){const J=et;let W=et-1;W<0&&(W=$.length-1);for(let at=0,yt=h+m*2;at<yt;at++){const T=Z*at,y=Z*(at+1),F=ut+J+T,X=ut+W+T,ot=ut+W+y,tt=ut+J+y;zt(F,X,ot,tt)}}}function mt($,ut,et){c.push($),c.push(ut),c.push(et)}function Ft($,ut,et){U($),U(ut),U(et);const J=i.length/3,W=S.generateTopUV(n,i,J-3,J-2,J-1);Gt(W[0]),Gt(W[1]),Gt(W[2])}function zt($,ut,et,J){U($),U(ut),U(J),U(ut),U(et),U(J);const W=i.length/3,at=S.generateSideWallUV(n,i,W-6,W-3,W-2,W-1);Gt(at[0]),Gt(at[1]),Gt(at[3]),Gt(at[1]),Gt(at[2]),Gt(at[3])}function U($){i.push(c[$*3+0]),i.push(c[$*3+1]),i.push(c[$*3+2])}function Gt($){o.push($.x),o.push($.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return _0(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,r=t.shapes.length;o<r;o++){const a=e[t.shapes[o]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ro[i.type]().fromJSON(i)),new Rr(n,t.options)}}const g0={generateTopUV:function(s,t,e,n,i){const o=t[e*3],r=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new ft(o,r),new ft(a,c),new ft(l,h)]},generateSideWallUV:function(s,t,e,n,i,o){const r=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],_=t[o*3],m=t[o*3+1],p=t[o*3+2];return Math.abs(a-h)<Math.abs(r-l)?[new ft(r,1-c),new ft(l,1-u),new ft(d,1-g),new ft(_,1-p)]:[new ft(a,1-c),new ft(h,1-u),new ft(f,1-g),new ft(m,1-p)]}};function _0(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const o=s[n];e.shapes.push(o.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class qt extends pe{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],u=new C,d=new C,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const S=[],x=p/n;let w=0;p===0&&r===0?w=.5/e:p===n&&c===Math.PI&&(w=-.5/e);for(let P=0;P<=e;P++){const R=P/e;u.x=-t*Math.cos(i+R*o)*Math.sin(r+x*a),u.y=t*Math.cos(r+x*a),u.z=t*Math.sin(i+R*o)*Math.sin(r+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(R+w,1-x),S.push(l++)}h.push(S)}for(let p=0;p<n;p++)for(let S=0;S<e;S++){const x=h[p][S+1],w=h[p][S],P=h[p+1][S],R=h[p+1][S+1];(p!==0||r>0)&&f.push(x,w,R),(p!==n-1||c<Math.PI)&&f.push(w,P,R)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class On extends pe{constructor(t=1,e=.4,n=12,i=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:o},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],c=[],l=[],h=new C,u=new C,d=new C;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*o,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,S=(i+1)*f+g;r.push(_,m,S),r.push(m,p,S)}this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(c,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new On(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class si extends pe{constructor(t=new Yi(new C(-1,-1,0),new C(-1,1,0),new C(1,1,0)),e=64,n=1,i=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:o};const r=t.computeFrenetFrames(e,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new C,c=new C,l=new ft;let h=new C;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function _(){for(let x=0;x<e;x++)m(x);m(o===!1?e:0),S(),p()}function m(x){h=t.getPointAt(x/e,h);const w=r.normals[x],P=r.binormals[x];for(let R=0;R<=i;R++){const A=R/i*Math.PI*2,I=Math.sin(A),E=-Math.cos(A);c.x=E*w.x+I*P.x,c.y=E*w.y+I*P.y,c.z=E*w.z+I*P.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=e;x++)for(let w=1;w<=i;w++){const P=(i+1)*(x-1)+(w-1),R=(i+1)*x+(w-1),A=(i+1)*x+w,I=(i+1)*(x-1)+w;g.push(P,R,I),g.push(R,A,I)}}function S(){for(let x=0;x<=e;x++)for(let w=0;w<=i;w++)l.x=x/e,l.y=w/i,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new si(new ro[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Rt extends qi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Zt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Zt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Uc,this.normalScale=new ft(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class al extends Rt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ft(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Me(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Zt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Zt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Zt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class vo extends Ce{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Zt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class x0 extends vo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Zt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const sr=new ue,ac=new C,cc=new C;class cl{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ft(512,512),this.map=null,this.mapPass=null,this.matrix=new ue,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Er,this._frameExtents=new ft(1,1),this._viewportCount=1,this._viewports=[new fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;ac.setFromMatrixPosition(t.matrixWorld),e.position.copy(ac),cc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(cc),e.updateMatrixWorld(),sr.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(sr),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(sr)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const lc=new ue,ns=new C,or=new C;class v0 extends cl{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ft(4,2),this._viewportCount=6,this._viewports=[new fe(2,1,1,1),new fe(0,1,1,1),new fe(3,1,1,1),new fe(1,1,1,1),new fe(3,0,1,1),new fe(1,0,1,1)],this._cubeDirections=[new C(1,0,0),new C(-1,0,0),new C(0,0,1),new C(0,0,-1),new C(0,1,0),new C(0,-1,0)],this._cubeUps=[new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,1,0),new C(0,0,1),new C(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,o=t.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),ns.setFromMatrixPosition(t.matrixWorld),n.position.copy(ns),or.copy(n.position),or.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(or),n.updateMatrixWorld(),i.makeTranslation(-ns.x,-ns.y,-ns.z),lc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(lc)}}class M0 extends vo{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new v0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class y0 extends cl{constructor(){super(new Yc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ll extends vo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ce.DEFAULT_UP),this.updateMatrix(),this.target=new Ce,this.shadow=new y0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class S0 extends vo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class w0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=hc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=hc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function hc(){return(typeof performance>"u"?Date:performance).now()}const uc=new ue;class E0{constructor(t,e,n=0,i=1/0){this.ray=new po(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new wr,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return uc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(uc),this}intersectObject(t,e=!0,n=[]){return xr(t,this,n,e),n.sort(dc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,o=t.length;i<o;i++)xr(t[i],this,n,e);return n.sort(dc),n}}function dc(s,t){return s.distance-t.distance}function xr(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){const i=s.children;for(let o=0,r=i.length;o<r;o++)xr(i[o],t,e,!0)}}class fc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(Me(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Mr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Mr);class b0{constructor(t){rt(this,"scene",new Hm);rt(this,"renderer");rt(this,"clock",new w0);rt(this,"camera");rt(this,"container");rt(this,"updatables",[]);rt(this,"handleResize",()=>{const{clientWidth:t,clientHeight:e}=this.container;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)});this.container=t,this.camera=new Ge(55,1,.5,800),this.renderer=new km({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=ke,this.renderer.toneMapping=bc,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=wc,"physicallyCorrectLights"in this.renderer&&(this.renderer.physicallyCorrectLights=!1),this.container.appendChild(this.renderer.domElement),this.handleResize(),window.addEventListener("resize",this.handleResize)}addUpdatable(...t){this.updatables.push(...t)}addToScene(...t){t.forEach(e=>this.scene.add(e))}start(){this.clock.start();const t=()=>{const e=this.clock.getDelta();this.updatables.forEach(n=>n.update(e)),this.renderer.render(this.scene,this.camera),requestAnimationFrame(t)};t()}}const pc=(s,t,e)=>Math.min(e,Math.max(t,s));class T0{constructor(t){rt(this,"base");rt(this,"stick");rt(this,"radius",40);rt(this,"pointerId",null);rt(this,"vector",{x:0,y:0});rt(this,"onPointerDown",t=>{this.pointerId=t.pointerId,t.target.setPointerCapture(t.pointerId),this.updateStick(t)});rt(this,"onPointerMove",t=>{t.pointerId===this.pointerId&&this.updateStick(t)});rt(this,"onPointerUp",t=>{t.pointerId===this.pointerId&&(this.pointerId=null,this.vector={x:0,y:0},this.stick.style.transform="translate(0px, 0px)")});this.base=document.createElement("div"),this.base.className="joystick",this.stick=document.createElement("div"),this.stick.className="joystick-stick",this.base.appendChild(this.stick),t.appendChild(this.base),this.base.addEventListener("pointerdown",this.onPointerDown),this.base.addEventListener("pointermove",this.onPointerMove),this.base.addEventListener("pointerup",this.onPointerUp),this.base.addEventListener("pointercancel",this.onPointerUp)}getVector(){return{...this.vector}}updateStick(t){const e=this.base.getBoundingClientRect(),n=t.clientX-e.left-e.width/2,i=t.clientY-e.top-e.height/2,o=Math.hypot(n,i),r=Math.min(o,this.radius),a=Math.atan2(i,n),c=Math.cos(a)*r,l=Math.sin(a)*r;this.vector={x:pc(c/this.radius,-1,1),y:pc(l/this.radius,-1,1)},this.stick.style.transform=`translate(${c}px, ${l}px)`}}class A0{constructor(t){rt(this,"keys",new Set);rt(this,"joystick");rt(this,"runHeld",!1);rt(this,"jumpQueued",!1);rt(this,"exitQueued",!1);rt(this,"enterQueued",!1);rt(this,"exitButton",null);rt(this,"onKeyDown",t=>{this.keys.add(t.code),t.code==="Space"&&!t.repeat&&(this.jumpQueued=!0),t.code==="KeyE"&&!t.repeat&&(this.exitQueued=!0),t.code==="Enter"&&!t.repeat&&(this.enterQueued=!0)});rt(this,"onKeyUp",t=>{this.keys.delete(t.code)});this.joystick=new T0(t),this.createTouchButtons(t),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}getMoveVector(){let t=0,e=0;if((this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(e+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(e-=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(t-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(t+=1),t!==0||e!==0){const o=Math.hypot(t,e)||1;return{x:t/o,z:e/o}}const n=this.joystick.getVector();return Math.hypot(n.x,n.y)>.05?{x:n.x,z:n.y}:{x:0,z:0}}isSprinting(){if(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.runHeld)return!0;const t=this.joystick.getVector();return Math.hypot(t.x,t.y)>=.85}consumeJumpPressed(){const t=this.jumpQueued;return this.jumpQueued=!1,t}consumeExitPressed(){const t=this.exitQueued;return this.exitQueued=!1,t}consumeEnterPressed(){const t=this.enterQueued;return this.enterQueued=!1,t}setExitVisible(t){this.exitButton&&(this.exitButton.style.display=t?"":"none")}createTouchButtons(t){const e=document.createElement("div");e.className="action-buttons";const n=document.createElement("button");n.className="action-button",n.type="button",n.textContent="БЕГ";const i=document.createElement("button");i.className="action-button",i.type="button",i.textContent="ПРЫЖОК";const o=document.createElement("button");o.className="action-button",o.type="button",o.textContent="ВЫЙТИ",o.style.display="none",this.exitButton=o;const r=c=>{c.preventDefault(),this.runHeld=!0},a=c=>{c.preventDefault(),this.runHeld=!1};n.addEventListener("pointerdown",r),n.addEventListener("pointerup",a),n.addEventListener("pointercancel",a),n.addEventListener("pointerleave",a),i.addEventListener("pointerdown",c=>{c.preventDefault(),this.jumpQueued=!0}),o.addEventListener("pointerdown",c=>{c.preventDefault(),this.exitQueued=!0}),e.append(n,i,o),t.appendChild(e)}}const mc={type:"change"},rr={type:"start"},gc={type:"end"},qs=new po,_c=new Nn,C0=Math.cos(70*uo.DEG2RAD);class R0 extends li{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new C,this.cursor=new C,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:di.ROTATE,MIDDLE:di.DOLLY,RIGHT:di.PAN},this.touches={ONE:fi.ROTATE,TWO:fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(v){v.addEventListener("keydown",Ct),this._domElementKeyEvents=v},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Ct),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(mc),n.update(),o=i.NONE},this.update=function(){const v=new C,O=new ri().setFromUnitVectors(t.up,new C(0,1,0)),H=O.clone().invert(),lt=new C,vt=new ri,kt=new C,Xt=2*Math.PI;return function(ae=null){const Kt=n.object.position;v.copy(Kt).sub(n.target),v.applyQuaternion(O),a.setFromVector3(v),n.autoRotate&&o===i.NONE&&k(M(ae)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let ce=n.minAzimuthAngle,Qt=n.maxAzimuthAngle;isFinite(ce)&&isFinite(Qt)&&(ce<-Math.PI?ce+=Xt:ce>Math.PI&&(ce-=Xt),Qt<-Math.PI?Qt+=Xt:Qt>Math.PI&&(Qt-=Xt),ce<=Qt?a.theta=Math.max(ce,Math.min(Qt,a.theta)):a.theta=a.theta>(ce+Qt)/2?Math.max(ce,a.theta):Math.min(Qt,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Ke=!1;if(n.zoomToCursor&&R||n.object.isOrthographicCamera)a.radius=st(a.radius);else{const ze=a.radius;a.radius=st(a.radius*l),Ke=ze!=a.radius}if(v.setFromSpherical(a),v.applyQuaternion(H),Kt.copy(n.target).add(v),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&R){let ze=null;if(n.object.isPerspectiveCamera){const on=v.length();ze=st(on*l);const Je=on-ze;n.object.position.addScaledVector(w,Je),n.object.updateMatrixWorld(),Ke=!!Je}else if(n.object.isOrthographicCamera){const on=new C(P.x,P.y,0);on.unproject(n.object);const Je=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),Ke=Je!==n.object.zoom;const mn=new C(P.x,P.y,0);mn.unproject(n.object),n.object.position.sub(mn).add(on),n.object.updateMatrixWorld(),ze=v.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ze!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ze).add(n.object.position):(qs.origin.copy(n.object.position),qs.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(qs.direction))<C0?t.lookAt(n.target):(_c.setFromNormalAndCoplanarPoint(n.object.up,n.target),qs.intersectPlane(_c,n.target))))}else if(n.object.isOrthographicCamera){const ze=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),ze!==n.object.zoom&&(n.object.updateProjectionMatrix(),Ke=!0)}return l=1,R=!1,Ke||lt.distanceToSquared(n.object.position)>r||8*(1-vt.dot(n.object.quaternion))>r||kt.distanceToSquared(n.target)>r?(n.dispatchEvent(mc),lt.copy(n.object.position),vt.copy(n.object.quaternion),kt.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",St),n.domElement.removeEventListener("pointerdown",T),n.domElement.removeEventListener("pointercancel",F),n.domElement.removeEventListener("wheel",tt),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",F),n.domElement.getRootNode().removeEventListener("keydown",pt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Ct),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=i.NONE;const r=1e-6,a=new fc,c=new fc;let l=1;const h=new C,u=new ft,d=new ft,f=new ft,g=new ft,_=new ft,m=new ft,p=new ft,S=new ft,x=new ft,w=new C,P=new ft;let R=!1;const A=[],I={};let E=!1;function M(v){return v!==null?2*Math.PI/60*n.autoRotateSpeed*v:2*Math.PI/60/60*n.autoRotateSpeed}function D(v){const O=Math.abs(v*.01);return Math.pow(.95,n.zoomSpeed*O)}function k(v){c.theta-=v}function L(v){c.phi-=v}const Y=function(){const v=new C;return function(H,lt){v.setFromMatrixColumn(lt,0),v.multiplyScalar(-H),h.add(v)}}(),z=function(){const v=new C;return function(H,lt){n.screenSpacePanning===!0?v.setFromMatrixColumn(lt,1):(v.setFromMatrixColumn(lt,0),v.crossVectors(n.object.up,v)),v.multiplyScalar(H),h.add(v)}}(),Z=function(){const v=new C;return function(H,lt){const vt=n.domElement;if(n.object.isPerspectiveCamera){const kt=n.object.position;v.copy(kt).sub(n.target);let Xt=v.length();Xt*=Math.tan(n.object.fov/2*Math.PI/180),Y(2*H*Xt/vt.clientHeight,n.object.matrix),z(2*lt*Xt/vt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(Y(H*(n.object.right-n.object.left)/n.object.zoom/vt.clientWidth,n.object.matrix),z(lt*(n.object.top-n.object.bottom)/n.object.zoom/vt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function it(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function B(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function Q(v,O){if(!n.zoomToCursor)return;R=!0;const H=n.domElement.getBoundingClientRect(),lt=v-H.left,vt=O-H.top,kt=H.width,Xt=H.height;P.x=lt/kt*2-1,P.y=-(vt/Xt)*2+1,w.set(P.x,P.y,1).unproject(n.object).sub(n.object.position).normalize()}function st(v){return Math.max(n.minDistance,Math.min(n.maxDistance,v))}function gt(v){u.set(v.clientX,v.clientY)}function Lt(v){Q(v.clientX,v.clientX),p.set(v.clientX,v.clientY)}function Nt(v){g.set(v.clientX,v.clientY)}function j(v){d.set(v.clientX,v.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const O=n.domElement;k(2*Math.PI*f.x/O.clientHeight),L(2*Math.PI*f.y/O.clientHeight),u.copy(d),n.update()}function ht(v){S.set(v.clientX,v.clientY),x.subVectors(S,p),x.y>0?it(D(x.y)):x.y<0&&B(D(x.y)),p.copy(S),n.update()}function Et(v){_.set(v.clientX,v.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),Z(m.x,m.y),g.copy(_),n.update()}function mt(v){Q(v.clientX,v.clientY),v.deltaY<0?B(D(v.deltaY)):v.deltaY>0&&it(D(v.deltaY)),n.update()}function Ft(v){let O=!1;switch(v.code){case n.keys.UP:v.ctrlKey||v.metaKey||v.shiftKey?L(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Z(0,n.keyPanSpeed),O=!0;break;case n.keys.BOTTOM:v.ctrlKey||v.metaKey||v.shiftKey?L(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Z(0,-n.keyPanSpeed),O=!0;break;case n.keys.LEFT:v.ctrlKey||v.metaKey||v.shiftKey?k(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Z(n.keyPanSpeed,0),O=!0;break;case n.keys.RIGHT:v.ctrlKey||v.metaKey||v.shiftKey?k(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):Z(-n.keyPanSpeed,0),O=!0;break}O&&(v.preventDefault(),n.update())}function zt(v){if(A.length===1)u.set(v.pageX,v.pageY);else{const O=Ot(v),H=.5*(v.pageX+O.x),lt=.5*(v.pageY+O.y);u.set(H,lt)}}function U(v){if(A.length===1)g.set(v.pageX,v.pageY);else{const O=Ot(v),H=.5*(v.pageX+O.x),lt=.5*(v.pageY+O.y);g.set(H,lt)}}function Gt(v){const O=Ot(v),H=v.pageX-O.x,lt=v.pageY-O.y,vt=Math.sqrt(H*H+lt*lt);p.set(0,vt)}function $(v){n.enableZoom&&Gt(v),n.enablePan&&U(v)}function ut(v){n.enableZoom&&Gt(v),n.enableRotate&&zt(v)}function et(v){if(A.length==1)d.set(v.pageX,v.pageY);else{const H=Ot(v),lt=.5*(v.pageX+H.x),vt=.5*(v.pageY+H.y);d.set(lt,vt)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const O=n.domElement;k(2*Math.PI*f.x/O.clientHeight),L(2*Math.PI*f.y/O.clientHeight),u.copy(d)}function J(v){if(A.length===1)_.set(v.pageX,v.pageY);else{const O=Ot(v),H=.5*(v.pageX+O.x),lt=.5*(v.pageY+O.y);_.set(H,lt)}m.subVectors(_,g).multiplyScalar(n.panSpeed),Z(m.x,m.y),g.copy(_)}function W(v){const O=Ot(v),H=v.pageX-O.x,lt=v.pageY-O.y,vt=Math.sqrt(H*H+lt*lt);S.set(0,vt),x.set(0,Math.pow(S.y/p.y,n.zoomSpeed)),it(x.y),p.copy(S);const kt=(v.pageX+O.x)*.5,Xt=(v.pageY+O.y)*.5;Q(kt,Xt)}function at(v){n.enableZoom&&W(v),n.enablePan&&J(v)}function yt(v){n.enableZoom&&W(v),n.enableRotate&&et(v)}function T(v){n.enabled!==!1&&(A.length===0&&(n.domElement.setPointerCapture(v.pointerId),n.domElement.addEventListener("pointermove",y),n.domElement.addEventListener("pointerup",F)),!It(v)&&(Tt(v),v.pointerType==="touch"?_t(v):X(v)))}function y(v){n.enabled!==!1&&(v.pointerType==="touch"?xt(v):ot(v))}function F(v){switch(dt(v),A.length){case 0:n.domElement.releasePointerCapture(v.pointerId),n.domElement.removeEventListener("pointermove",y),n.domElement.removeEventListener("pointerup",F),n.dispatchEvent(gc),o=i.NONE;break;case 1:const O=A[0],H=I[O];_t({pointerId:O,pageX:H.x,pageY:H.y});break}}function X(v){let O;switch(v.button){case 0:O=n.mouseButtons.LEFT;break;case 1:O=n.mouseButtons.MIDDLE;break;case 2:O=n.mouseButtons.RIGHT;break;default:O=-1}switch(O){case di.DOLLY:if(n.enableZoom===!1)return;Lt(v),o=i.DOLLY;break;case di.ROTATE:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enablePan===!1)return;Nt(v),o=i.PAN}else{if(n.enableRotate===!1)return;gt(v),o=i.ROTATE}break;case di.PAN:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enableRotate===!1)return;gt(v),o=i.ROTATE}else{if(n.enablePan===!1)return;Nt(v),o=i.PAN}break;default:o=i.NONE}o!==i.NONE&&n.dispatchEvent(rr)}function ot(v){switch(o){case i.ROTATE:if(n.enableRotate===!1)return;j(v);break;case i.DOLLY:if(n.enableZoom===!1)return;ht(v);break;case i.PAN:if(n.enablePan===!1)return;Et(v);break}}function tt(v){n.enabled===!1||n.enableZoom===!1||o!==i.NONE||(v.preventDefault(),n.dispatchEvent(rr),mt(bt(v)),n.dispatchEvent(gc))}function bt(v){const O=v.deltaMode,H={clientX:v.clientX,clientY:v.clientY,deltaY:v.deltaY};switch(O){case 1:H.deltaY*=16;break;case 2:H.deltaY*=100;break}return v.ctrlKey&&!E&&(H.deltaY*=10),H}function pt(v){v.key==="Control"&&(E=!0,n.domElement.getRootNode().addEventListener("keyup",ct,{passive:!0,capture:!0}))}function ct(v){v.key==="Control"&&(E=!1,n.domElement.getRootNode().removeEventListener("keyup",ct,{passive:!0,capture:!0}))}function Ct(v){n.enabled===!1||n.enablePan===!1||Ft(v)}function _t(v){switch(Vt(v),A.length){case 1:switch(n.touches.ONE){case fi.ROTATE:if(n.enableRotate===!1)return;zt(v),o=i.TOUCH_ROTATE;break;case fi.PAN:if(n.enablePan===!1)return;U(v),o=i.TOUCH_PAN;break;default:o=i.NONE}break;case 2:switch(n.touches.TWO){case fi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;$(v),o=i.TOUCH_DOLLY_PAN;break;case fi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;ut(v),o=i.TOUCH_DOLLY_ROTATE;break;default:o=i.NONE}break;default:o=i.NONE}o!==i.NONE&&n.dispatchEvent(rr)}function xt(v){switch(Vt(v),o){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;et(v),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;J(v),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;at(v),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;yt(v),n.update();break;default:o=i.NONE}}function St(v){n.enabled!==!1&&v.preventDefault()}function Tt(v){A.push(v.pointerId)}function dt(v){delete I[v.pointerId];for(let O=0;O<A.length;O++)if(A[O]==v.pointerId){A.splice(O,1);return}}function It(v){for(let O=0;O<A.length;O++)if(A[O]==v.pointerId)return!0;return!1}function Vt(v){let O=I[v.pointerId];O===void 0&&(O=new ft,I[v.pointerId]=O),O.set(v.pageX,v.pageY)}function Ot(v){const O=v.pointerId===A[0]?A[1]:A[0];return I[O]}n.domElement.addEventListener("contextmenu",St),n.domElement.addEventListener("pointerdown",T),n.domElement.addEventListener("pointercancel",F),n.domElement.addEventListener("wheel",tt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",pt,{passive:!0,capture:!0}),this.update()}}class P0{constructor(t,e,n){rt(this,"controls");rt(this,"camera");rt(this,"target");rt(this,"offset",new C(0,2,0));rt(this,"lastTarget",new C);rt(this,"tmp",new C);this.camera=t,this.target=n,this.controls=new R0(t,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.minDistance=5,this.controls.maxDistance=80,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.enablePan=!1,this.controls.screenSpacePanning=!1,this.controls.target.copy(this.target.position).add(this.offset),t.position.copy(this.controls.target).add(new C(0,8,-14)),this.lastTarget.copy(this.target.position)}setTarget(t){if(this.target===t)return;const e=t.position.clone().sub(this.target.position);this.camera.position.add(e),this.controls.target.add(e),this.target=t,this.lastTarget.copy(t.position)}update(){this.tmp.copy(this.target.position).sub(this.lastTarget),this.tmp.y=0,this.tmp.lengthSq()>0&&(this.camera.position.add(this.tmp),this.controls.target.add(this.tmp));const t=this.target.position.x+this.offset.x,e=this.target.position.z+this.offset.z,n=t-this.controls.target.x,i=e-this.controls.target.z;(Math.abs(n)>1e-4||Math.abs(i)>1e-4)&&(this.tmp.set(n,0,i),this.camera.position.add(this.tmp),this.controls.target.add(this.tmp)),this.controls.target.y=this.target.position.y+this.offset.y,this.lastTarget.copy(this.target.position),this.controls.update()}}const Ht={roads:[{position:{x:0,z:0},width:10,length:380,center:"dashed"},{position:{x:0,z:0},width:10,length:380,rotation:Math.PI/2,center:"dashed"},{position:{x:0,z:70},width:10,length:220,rotation:Math.PI/2,center:"dashed"},{position:{x:-70,z:-10},width:10,length:170,center:"dashed"},{position:{x:65,z:120},width:8,length:130,rotation:Math.PI/2,center:"none"}],crosswalks:[],parks:[{position:{x:-120,z:-40},width:70,depth:60}],waterAreas:[{position:{x:-120,z:-50},width:34,depth:24}],beachAreas:[{position:{x:-150,z:-150},width:90,depth:46}],buildings:[{position:{x:-40,z:102},size:{x:10,y:7.5,z:10},color:"#e30611",roof:"#2980b9",rotation:Math.PI,label:"МТС БАНК"},{position:{x:40,z:92},size:{x:12,y:4.2,z:8},color:"#27ae60",roof:"#27ae60",rotation:Math.PI,label:"ПРОДУКТЫ",shutters:!0},{position:{x:-96,z:26},size:{x:24,y:10,z:12},color:"#eeeeee",roof:"#20b2aa",rotation:-Math.PI/2,label:"МЕДСИ",labelTextColor:"#20b2aa",labelBg:"#ffffff",labelAnchor:"center",labelAllSides:!0},{position:{x:-52,z:26},size:{x:10,y:5,z:8},color:"#e30611",roof:"#ffffff",rotation:-Math.PI/2,label:"МТС SHOP",labelBg:"#ffffff",labelTextColor:"#e30611",labelAnchor:"center"},{position:{x:-55,z:-40},size:{x:20,y:5,z:8},color:"#9b59b6",roof:"#8e44ad",rotation:-Math.PI/2,label:"Магазин одежды"},{position:{x:29,z:130},size:{x:7.2,y:7.2,z:7.6},color:"#f6e3d3",roof:"#c65b4a",rotation:Math.PI},{position:{x:37,z:130},size:{x:7.2,y:7,z:7.6},color:"#e8f2ff",roof:"#4a6fa8",rotation:Math.PI},{position:{x:45,z:130},size:{x:7.2,y:7.4,z:7.6},color:"#f3f0d7",roof:"#b85d3d",rotation:Math.PI},{position:{x:53,z:130},size:{x:7.2,y:7.1,z:7.6},color:"#fde2ea",roof:"#a84a6a",rotation:Math.PI},{position:{x:61,z:130},size:{x:7.2,y:7.3,z:7.6},color:"#e8ffe9",roof:"#4f8b6b",rotation:Math.PI},{position:{x:69,z:130},size:{x:7.2,y:7,z:7.6},color:"#fff0d6",roof:"#b06a3c",rotation:Math.PI},{position:{x:77,z:130},size:{x:7.2,y:7.5,z:7.6},color:"#e9e6ff",roof:"#5b4aa8",rotation:Math.PI},{position:{x:85,z:130},size:{x:7.2,y:7.1,z:7.6},color:"#f7f7f2",roof:"#3f4a57",rotation:Math.PI},{position:{x:93,z:130},size:{x:7.2,y:7.3,z:7.6},color:"#e6f7ff",roof:"#3b6c7d",rotation:Math.PI},{position:{x:101,z:130},size:{x:7.2,y:7.2,z:7.6},color:"#ffe6d8",roof:"#b34e3b",rotation:Math.PI}],umbrellas:[{x:-170,z:-150,color:"#ffb3c1"},{x:-150,z:-142,color:"#ffe08a"},{x:-132,z:-156,color:"#9fd3ff"}],rocks:[{x:-188,z:-160,size:1.2},{x:-176,z:-168,size:1},{x:-160,z:-158,size:.8}],parkingLots:[{buildingIndex:0,spots:10},{buildingIndex:1,spots:2},{buildingIndex:2,spots:2},{buildingIndex:3,spots:2},{buildingIndex:4,spots:2}]},ee={worldSize:260,groundColor:"#4caf50",pathColor:"#edf1f6",waterColor:"#6dc9e8",sandColor:"#f7e2b8",skyTopColor:"#6ecbff",skyBottomColor:"#fff7e8",fogColor:"#eef8ff",fogNear:80,fogFar:520,playerSpeed:6,playerSprintMultiplier:1.75,playerTurnSpeed:10,playerJumpSpeed:8.5,playerGravity:22,sunColor:"#fff1c4",ambientColor:"#fff7ea"},Pt={foundationHeight:.5,facadeInset:.06,door:{width:2,frameWidth:2.4,frameHeight:3.2,outward:.6,frameOutward:.45,localZOutset:.9},windows:{width:1.1,height:1.3,desiredStep:2.4,floorHeight:2.4,marginX:1.2,marginTop:1.1,sillFromBase:1.2,doorClearance:.6},roof:{minHeight:.7,maxHeight:1.2,relative:.12}},L0=(s,t)=>{const e=new ne;e.rotation.y=s.rotation??0;const n=new K(new se(s.size.x*1.06,.5,s.size.z*1.06),new Rt({color:"#7f8c8d",roughness:.9,metalness:.02}));n.position.y=Pt.foundationHeight/2,n.castShadow=!0,n.receiveShadow=!0,e.add(n);const i=new se(s.size.x,s.size.y,s.size.z),o=new Rt({color:s.color,map:t.wall,roughness:.7,metalness:.05}),r=new K(i,o);r.castShadow=!0,r.receiveShadow=!0,r.position.y=Pt.foundationHeight+s.size.y/2,e.add(r);const a=Math.max(Pt.roof.minHeight,Math.min(Pt.roof.maxHeight,s.size.y*Pt.roof.relative)),c=new se(s.size.x*1.05,a,s.size.z*1.05),l=new Rt({color:s.roof,map:t.roof,roughness:.6,metalness:.08}),h=new K(c,l);h.castShadow=!0,h.position.y=Pt.foundationHeight+s.size.y+a/2-.02,e.add(h);const u=new Rt({color:"#f9f9f7",roughness:.6,metalness:.02}),d=new K(new se(s.size.x*1.02,.12,s.size.z*1.02),u);d.position.y=Pt.foundationHeight+s.size.y+.02,d.castShadow=!0,d.receiveShadow=!0,e.add(d);const f=new Rt({map:t.windows,emissive:new Zt("#ffd9a8"),emissiveIntensity:.2,roughness:.16,metalness:.18,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),g=new Rt({color:"#f4f6fb",roughness:.38,metalness:.16}),_=new we(Pt.windows.width,Pt.windows.height),m=s.size.y-Pt.windows.marginTop,p=Math.max(1,Math.floor((m-Pt.windows.sillFromBase)/Pt.windows.floorHeight)),S=J=>{const W=Math.max(.01,J-2*Pt.windows.marginX),at=Math.max(1,Math.floor(W/Pt.windows.desiredStep)),yt=W/at,T=-W/2+yt/2;return{cols:at,step:yt,x0:T}},x=S(s.size.x),w=Pt.door.width/2+Pt.windows.doorClearance,P=Pt.door.frameHeight+Pt.windows.doorClearance;for(let J=0;J<p;J+=1){let W=Pt.foundationHeight+Pt.windows.sillFromBase+Pt.windows.height/2+J*Pt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(W+=.35);for(let at=0;at<x.cols;at+=1){const yt=x.x0+at*x.step,T=Math.abs(yt)<=w,y=W<=Pt.foundationHeight+P;if(T&&y)continue;const F=new K(_,f);F.position.set(yt,W,s.size.z/2+Pt.facadeInset),F.renderOrder=1,e.add(F);const X=.06,ot=new se(Pt.windows.width+.18,Pt.windows.height+.18,X),tt=new K(ot,g);if(tt.position.set(yt,W,s.size.z/2+Pt.facadeInset-X/2),tt.castShadow=!0,tt.receiveShadow=!0,tt.renderOrder=0,e.add(tt),s.shutters){const bt=new Rt({color:"#1f6f39",roughness:.75,metalness:.02}),pt=.22,ct=Pt.windows.height*1.02,Ct=.06,_t=s.size.z/2+Pt.facadeInset+.03,xt=new K(new se(pt,ct,Ct),bt);xt.position.set(yt-Pt.windows.width/2-pt/2-.06,W,_t),xt.castShadow=!0,xt.renderOrder=1,e.add(xt);const St=new K(new se(pt,ct,Ct),bt);St.position.set(yt+Pt.windows.width/2+pt/2+.06,W,_t),St.castShadow=!0,St.renderOrder=1,e.add(St)}}}const R=S(s.size.z);for(let J=0;J<p;J+=1){let W=Pt.foundationHeight+Pt.windows.sillFromBase+Pt.windows.height/2+J*Pt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(W+=.35);for(let at=0;at<R.cols;at+=1){const yt=R.x0+at*R.step,T=new K(_,f);T.rotation.y=Math.PI/2,T.position.set(s.size.x/2+Pt.facadeInset,W,yt),T.renderOrder=1,e.add(T);const y=.06,F=new se(Pt.windows.width+.18,Pt.windows.height+.18,y),X=new K(F,g);X.rotation.y=Math.PI/2,X.position.set(s.size.x/2+Pt.facadeInset-y/2,W,yt),X.castShadow=!0,X.receiveShadow=!0,X.renderOrder=0,e.add(X)}}for(let J=0;J<p;J+=1){let W=Pt.foundationHeight+Pt.windows.sillFromBase+Pt.windows.height/2+J*Pt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(W+=.35);for(let at=0;at<x.cols;at+=1){const yt=x.x0+at*x.step,T=new K(_,f);T.rotation.y=Math.PI,T.position.set(yt,W,-s.size.z/2-Pt.facadeInset),T.renderOrder=1,e.add(T);const y=.06,F=new se(Pt.windows.width+.18,Pt.windows.height+.18,y),X=new K(F,g);X.rotation.y=Math.PI,X.position.set(yt,W,-s.size.z/2-Pt.facadeInset+y/2),X.castShadow=!0,X.receiveShadow=!0,X.renderOrder=0,e.add(X)}}for(let J=0;J<p;J+=1){let W=Pt.foundationHeight+Pt.windows.sillFromBase+Pt.windows.height/2+J*Pt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(W+=.35);for(let at=0;at<R.cols;at+=1){const yt=R.x0+at*R.step,T=new K(_,f);T.rotation.y=-Math.PI/2,T.position.set(-s.size.x/2-Pt.facadeInset,W,yt),T.renderOrder=1,e.add(T);const y=.06,F=new se(Pt.windows.width+.18,Pt.windows.height+.18,y),X=new K(F,g);X.rotation.y=-Math.PI/2,X.position.set(-s.size.x/2-Pt.facadeInset+y/2,W,yt),X.castShadow=!0,X.receiveShadow=!0,X.renderOrder=0,e.add(X)}}const A=new K(new se(2.4,3.2,.35),new Rt({color:"#2c3e50",roughness:.7,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));A.position.set(0,Pt.foundationHeight+1.85,s.size.z/2+Pt.door.frameOutward),A.renderOrder=2,e.add(A);const I=new se(2,2.8,.15),E=document.createElement("canvas");E.width=256,E.height=512;const M=E.getContext("2d");let D;if(M){M.fillStyle="#8b5a2b",M.fillRect(0,0,E.width,E.height);const J=M.createLinearGradient(0,0,0,E.height);J.addColorStop(0,"rgba(255,255,255,0.16)"),J.addColorStop(.5,"rgba(0,0,0,0.1)"),J.addColorStop(1,"rgba(0,0,0,0.22)"),M.fillStyle=J,M.fillRect(0,0,E.width,E.height);const W=32,at=(E.height-W*3)/2,yt=E.width-W*2;M.strokeStyle="rgba(0,0,0,0.45)",M.lineWidth=6,M.strokeRect(W,W,yt,at),M.strokeRect(W,W*2+at,yt,at),M.strokeStyle="rgba(255,255,255,0.08)",M.lineWidth=2;for(let T=0;T<E.width;T+=12)M.beginPath(),M.moveTo(T+Math.random()*4,0),M.lineTo(T+Math.random()*4,E.height),M.stroke();D=new ii(E),D.wrapS=D.wrapT=wn,D.anisotropy=4}const k=new Rt({color:"#8B4513",roughness:.8,metalness:.15,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3,map:D}),L=new ne,Y=Pt.door.width/2;L.position.set(Y,Pt.foundationHeight+1.75,s.size.z/2+Pt.door.outward);const z=new K(I,k);z.position.set(-2/2,0,0),z.castShadow=!0,z.renderOrder=3,z.name="door",L.add(z),e.add(L);const Z=new ne,it=new K(new xe(.04,.04,.12,12),new Rt({color:"#dcdcdc",metalness:.8,roughness:.25}));it.rotation.z=Math.PI/2,Z.add(it);const B=new K(new qt(.05,12,12),new Rt({color:"#f5f5f5",metalness:.9,roughness:.2}));B.position.set(.08,0,0),Z.add(B),Z.position.set(-2/2+.08,0,I.parameters.depth/2+.02),z.add(Z);const Q=document.createElement("canvas");Q.width=256,Q.height=128;const st=Q.getContext("2d");let gt;if(st){st.fillStyle="#c9c9c5",st.fillRect(0,0,Q.width,Q.height);const J=st.createLinearGradient(0,0,0,Q.height);J.addColorStop(0,"rgba(255,255,255,0.25)"),J.addColorStop(1,"rgba(0,0,0,0.18)"),st.fillStyle=J,st.fillRect(0,0,Q.width,Q.height),st.strokeStyle="rgba(0,0,0,0.25)",st.lineWidth=2;for(let W=22;W<Q.height;W+=24)st.beginPath(),st.moveTo(0,W+Math.random()*3),st.lineTo(Q.width,W+Math.random()*3),st.stroke();gt=new ii(Q),gt.wrapS=gt.wrapT=un,gt.repeat.set(2,1)}const Lt=new Rt({color:"#d0d0cc",roughness:.9,metalness:.02,map:gt}),Nt=Pt.door.frameWidth+.8,j=.55,ht=.16,Et=3,mt=.08,zt=s.size.z/2+Pt.door.outward-j/2-.04,U=zt+(Et-1)*(j-.05);for(let J=0;J<Et;J+=1){const W=ht,at=mt+J*ht,yt=U-J*(j-.05),T=new K(new se(Nt-J*.18,W,j),Lt);T.position.set(0,at,yt),T.castShadow=!0,T.receiveShadow=!0,e.add(T)}const Gt=new Rt({color:"#c7b18a",roughness:.5,metalness:.25}),$=new xe(.05,.06,.9,10),ut=J=>{const W=new ne,at=Et+1,yt=zt-j/2,T=U+j/2,y=mt+.45,F=y+Et*ht*.6,X=[];for(let ot=0;ot<at;ot+=1){const tt=new K($,Gt),bt=ot/(at-1),pt=T+(yt-T)*bt,ct=y+(F-y)*bt;tt.position.set((Nt/2+.06)*J,ct,pt),tt.castShadow=!0,W.add(tt);const Ct=ct+$.parameters.height/2;X.push(new C((Nt/2+.06)*J,Ct,pt))}if(X.length>=2){const ot=new Hi(X),tt=new si(ot,16,.045,10,!1),bt=new K(tt,Gt);bt.castShadow=!0,W.add(bt)}e.add(W)};ut(-1),ut(1);const et=new K(new se(3.2,.15,1.4),new Rt({color:s.roof,roughness:.55,metalness:.05}));if(et.position.set(0,Pt.foundationHeight+3.55,s.size.z/2+.85),et.rotation.x=-.2,et.castShadow=!0,e.add(et),s.label){const W=((tt,bt,pt)=>{const ct=document.createElement("canvas");ct.width=512,ct.height=128;const Ct=ct.getContext("2d");if(!Ct)return new ye;Ct.fillStyle=bt,Ct.fillRect(0,0,ct.width,ct.height),Ct.fillStyle=pt,Ct.font="bold 64px Arial",Ct.textAlign="center",Ct.textBaseline="middle",Ct.shadowColor="rgba(0,0,0,0.45)",Ct.shadowBlur=8,Ct.shadowOffsetY=3,Ct.fillText(tt,ct.width/2,ct.height/2+2);const _t=new ii(ct);return _t.wrapS=_t.wrapT=wn,_t.anisotropy=8,_t})(s.label,s.labelBg??s.color,s.labelTextColor??"#ffffff"),at=1.4,yt=Pt.foundationHeight+s.size.y+.85,T=.31,y=.31,F=()=>new Rt({map:W,color:"#ffffff",roughness:.25,metalness:.05,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:hn}),X=()=>{const tt=Math.min(s.size.x*.9,8),bt=new K(new we(tt,at),F()),pt=s.labelAnchor??"center",ct=.35,Ct=pt==="edgeRight"?s.size.x/2-tt/2-ct:pt==="edgeLeft"?-s.size.x/2+tt/2+ct:0;bt.position.set(Ct,yt,s.size.z/2+T),bt.castShadow=!0,bt.renderOrder=4,e.add(bt)},ot=()=>{const tt=Math.min(s.size.x*.9,8),bt=Math.min(s.size.z*.9,8),pt=new K(new we(tt,at),F());pt.rotation.y=Math.PI,pt.position.set(0,yt,-s.size.z/2-T),pt.castShadow=!0,pt.renderOrder=4,e.add(pt);const ct=new K(new we(bt,at),F());ct.rotation.y=-Math.PI/2,ct.position.set(s.size.x/2+y,yt,0),ct.castShadow=!0,ct.renderOrder=4,e.add(ct);const Ct=new K(new we(bt,at),F());Ct.rotation.y=Math.PI/2,Ct.position.set(-s.size.x/2-y,yt,0),Ct.castShadow=!0,Ct.renderOrder=4,e.add(Ct)};X(),s.labelAllSides&&ot()}return e.position.set(s.position.x,0,s.position.z),e.userData.door=L,e},In=(s,t)=>{const n=document.createElement("canvas");n.width=512,n.height=512;const i=n.getContext("2d");if(!i){const a=new ye;return a.needsUpdate=!0,a}s!=="clouds"?(i.fillStyle=t,i.fillRect(0,0,512,512)):i.clearRect(0,0,512,512);const o=a=>{const c=i.getImageData(0,0,512,512),l=c.data;for(let h=0;h<l.length;h+=4){const u=(Math.random()-.5)*a;l[h]+=u,l[h+1]+=u,l[h+2]+=u}i.putImageData(c,0,0)};if(s==="grass"){o(40),i.fillStyle="rgba(0, 0, 0, 0.08)";for(let a=0;a<600;a++)i.fillRect(Math.random()*512,Math.random()*512,1,2)}if(s==="sand"){o(30),i.fillStyle="rgba(255, 255, 255, 0.12)";for(let a=0;a<400;a++)i.fillRect(Math.random()*512,Math.random()*512,2,1)}if(s==="path"){o(25),i.fillStyle="rgba(0, 0, 0, 0.12)";for(let a=0;a<500;a++)i.fillRect(Math.random()*512,Math.random()*512,2,2)}if(s==="road"){o(35),i.fillStyle="rgba(0, 0, 0, 0.12)";for(let a=0;a<500;a++)i.fillRect(Math.random()*512,Math.random()*512,2,2)}if(s==="roof"){o(15),i.strokeStyle="rgba(0, 0, 0, 0.25)",i.lineWidth=2;const a=8,c=512/a;for(let l=0;l<=a;l++)i.beginPath(),i.moveTo(0,l*c),i.lineTo(512,l*c),i.stroke()}if(s==="wall"){const a=i.createLinearGradient(0,0,0,512);a.addColorStop(0,"rgba(255,255,255,0.18)"),a.addColorStop(1,"rgba(0,0,0,0.12)"),i.fillStyle=a,i.fillRect(0,0,512,512),o(22),i.fillStyle="rgba(0, 0, 0, 0.06)";for(let l=0;l<900;l++)i.fillRect(Math.random()*512,Math.random()*512,1,1);for(let l=0;l<140;l++){const h=Math.random()*512,u=Math.random()*512,d=4+Math.random()*16;i.beginPath(),i.arc(h,u,d,0,Math.PI*2),i.fillStyle=`rgba(0, 0, 0, ${.025+Math.random()*.03})`,i.fill()}i.strokeStyle="rgba(0, 0, 0, 0.06)",i.lineWidth=2;const c=48;for(let l=0;l<512;l+=c)i.beginPath(),i.moveTo(0,l+(Math.random()*2-1)),i.lineTo(512,l+(Math.random()*2-1)),i.stroke()}if(s==="windows"){const a=i.createLinearGradient(0,0,0,512);a.addColorStop(0,"rgba(170, 210, 235, 0.95)"),a.addColorStop(1,"rgba(45, 75, 95, 0.95)"),i.fillStyle=a,i.fillRect(0,0,512,512),i.fillStyle="rgba(255, 255, 255, 0.14)",i.beginPath(),i.moveTo(512*.1,512*.9),i.lineTo(512*.9,512*.1),i.lineTo(512*.9,512*.28),i.lineTo(512*.28,512*.9),i.closePath(),i.fill(),i.strokeStyle="rgba(25, 35, 45, 0.95)",i.lineWidth=22,i.strokeRect(0,0,512,512),i.strokeStyle="rgba(255, 255, 255, 0.15)",i.lineWidth=6,i.strokeRect(18,18,476,476),i.fillStyle="rgba(25, 35, 45, 0.9)";const c=14;i.fillRect(512/2-c/2,18,c,476),i.fillRect(18,512/2-c/2,476,c),o(10)}if(s==="clouds")for(let c=0;c<26;c+=1){const l=Math.random()*512,h=Math.random()*512,u=34+Math.random()*62,d=5+Math.floor(Math.random()*5);for(let f=0;f<d;f+=1){const g=(Math.random()-.5)*u*.9,_=(Math.random()-.5)*u*.45,m=u*(1+(Math.random()-.5)*.35)*1.35,p=u*(.7+Math.random()*.35);i.save(),i.translate(l+g,h+_),i.scale(m/Math.max(1e-4,p),1);const S=i.createRadialGradient(0,0,0,0,0,p),x=.34+Math.random()*.18;S.addColorStop(0,`rgba(255, 255, 255, ${x})`),S.addColorStop(.62,`rgba(255, 255, 255, ${x*.62})`),S.addColorStop(1,"rgba(255, 255, 255, 0)"),i.fillStyle=S,i.beginPath(),i.arc(0,0,p,0,Math.PI*2),i.fill(),i.restore()}}const r=new ii(n);return r.wrapS=r.wrapT=un,r.anisotropy=4,r},D0=s=>{const n=document.createElement("canvas");n.width=256,n.height=64;const i=n.getContext("2d");if(!i)return new ye;i.fillStyle="#ffffff",i.fillRect(0,0,256,64),i.strokeStyle="#000000",i.lineWidth=8,i.strokeRect(0,0,256,64),i.fillStyle="#000000",i.font="bold 40px monospace",i.textAlign="center",i.textBaseline="middle",i.fillText(s.toUpperCase(),256/2,64/2);const o=new ii(n);return o.minFilter=je,o},I0=new qt(.1,6,6),U0=new He({color:8947848,transparent:!0,opacity:.6,depthWrite:!1});class js{constructor(t,e){rt(this,"object",new ne);rt(this,"path");rt(this,"speed");rt(this,"targetIndex",0);rt(this,"y");rt(this,"animTime",0);rt(this,"speedScale",1);rt(this,"isParked");rt(this,"doorPivot");rt(this,"doorVoid");rt(this,"doorOpen",0);rt(this,"doorOpenTarget",0);rt(this,"doorOpenSpeed",7);rt(this,"doorMaxAngle",Math.PI*.65);rt(this,"driver");rt(this,"smokeGroup",new ne);rt(this,"smokeParticles",[]);rt(this,"nextSmokeTime",0);this.path=t,this.speed=e.speed,this.y=e.y??.22,this.targetIndex=Math.max(0,Math.min(t.length-1,e.startIndex??0)),this.isParked=!!e.parked,this.isParked=!!e.parked,this.object.add(this.buildModel(e.color,e.plateText)),this.object.add(this.smokeGroup);const n=this.path[this.targetIndex]??new C(0,0,0);this.object.position.set(n.x,this.y,n.z),e.plateText&&(this.object.userData.plateText=e.plateText)}setSpeedScale(t){this.speedScale=Math.max(0,t)}setDoorOpen(t){this.doorOpenTarget=t?1:0}getForward2D(){const t=this.object.rotation.y;return{x:Math.sin(t),z:Math.cos(t)}}update(t){if(this.path.length<2)return;this.animTime+=t;const e=this.path[this.targetIndex],n=this.object.position.x,i=this.object.position.z,o=e.x-n,r=e.z-i,a=Math.hypot(o,r);if(a<.55){this.targetIndex=(this.targetIndex+1)%this.path.length;return}const c=1/Math.max(a,1e-6),l=o*c,h=r*c,u=this.speed*this.speedScale*t;if(this.object.position.x+=l*Math.min(u,a),this.object.position.z+=h*Math.min(u,a),this.object.position.y=this.y,this.object.rotation.y=Math.atan2(l,h),this.updateDoorAnimation(t),this.driver){const d=Math.sin(this.animTime*3.2)*.04;this.driver.head.position.y=this.driver.headBaseY+d,this.driver.earL.position.y=this.driver.earBaseY+d*.9,this.driver.earR.position.y=this.driver.earBaseY+d*.9}this.updateSmoke(t,this.speedScale)}buildModel(t,e){const n=new ne,i=new Rt({color:t,roughness:.25,metalness:.1}),o=new Rt({color:"#bfe6ff",roughness:.08,metalness:.05,transparent:!0,opacity:.72}),r=new Rt({color:"#1f2a33",roughness:.9,metalness:.05}),a=new Rt({color:"#151a1f",roughness:.95,metalness:.05,side:Ve}),c=new Rt({color:"#151a1f",roughness:.95,metalness:.05,side:Ae}),l=new al({color:15901016,roughness:.55,metalness:0,sheen:1,sheenRoughness:.45,sheenColor:16769484,map:this.createFurTexture()}),h=new Rt({color:16775920,roughness:.65,metalness:.05}),u=new Rt({color:16758465,roughness:.45}),d=this.isParked?new qt(1,18,18,0,Math.PI*2,Math.PI*.18,Math.PI*.82):new qt(1,18,18),f=new K(d,i);if(f.scale.set(1.1,.8,2.2),f.position.y=.82,f.castShadow=!0,f.receiveShadow=!0,n.add(f),this.isParked){const xt=new K(d,c);xt.scale.set(1.02,.74,2.05),xt.position.y=.8,xt.castShadow=!1,xt.receiveShadow=!1,n.add(xt)}const g=1.25,_=.7,m=.15,p=new il,S=-g/2,x=-_/2;p.moveTo(S,x+m),p.lineTo(S,x+_-m),p.quadraticCurveTo(S,x+_,S+m,x+_),p.lineTo(S+g-m,x+_),p.quadraticCurveTo(S+g,x+_,S+g,x+_-m),p.lineTo(S+g,x+m),p.quadraticCurveTo(S+g,x,S+g-m,x),p.lineTo(S+m,x),p.quadraticCurveTo(S,x,S,x+m);const w={depth:.05,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02,bevelSegments:4},P=new Rr(p,w);P.center();const R=new K(P,o);if(R.position.set(0,1.45,.95),R.rotation.x=-.2,n.add(R),!this.isParked){const xt=new Rt({color:"#0a0c0e",roughness:1,metalness:0}),St=new K(new On(.55,.15,12,32),xt);St.rotation.x=Math.PI/2,St.position.set(0,1.45,-.1),n.add(St)}const A=new Rt({color:2829099,roughness:.9,metalness:.02}),I=(xt,St,Tt=1.008)=>{const dt=new C(xt,0,St),It=dt.x*dt.x+dt.z*dt.z,Vt=Math.sqrt(Math.max(0,1-It));return dt.y=Vt,dt.multiplyScalar(Tt)},E=(xt,St)=>{const Tt=new Hi(xt,!1,"catmullrom",.6),dt=new si(Tt,40,St,6,!1),It=new K(dt,A);return It.castShadow=!1,It.receiveShadow=!1,It},M=xt=>{const dt=xt*.9272727272727272,It=.35/2.2,Vt=-.55/2.2,Ot=Xt=>{const ie=[];for(let ae=0;ae<=10;ae+=1){const Kt=ae/10,ce=dt*(1-.02*Math.sin(Kt*Math.PI));ie.push(I(ce,Xt,1.01))}return ie},Wt=()=>{const Xt=[],ae=.15909090909090906;for(let Kt=0;Kt<=10;Kt+=1){const ce=Kt/10,Qt=-.25+(ae- -.25)*ce;Xt.push(I(dt,Qt,1.011))}return Xt},v=.012,O=E(Ot(It),v),H=E(Ot(Vt),v),lt=E(Wt(),v),vt=new K(new ao(.03,.14,4,8),A);vt.rotation.z=Math.PI/2;const kt=I(dt,-.05/2.2,1.02);vt.position.copy(kt),f.add(O,H,lt,vt)};M(1),M(-1);const D=new K(new On(.66,.07,10,26),i);D.rotation.x=Math.PI/2,D.scale.set(1,1,1.1);const k=this.isParked?.96:1.02,L=-.08;D.position.set(0,k,L),D.castShadow=!0,n.add(D);const Y=new K(new On(.58,.08,10,26),a);Y.rotation.x=Math.PI/2,Y.scale.set(1,1,1.05),Y.position.set(0,k-.12,L-.02),Y.castShadow=!1,Y.receiveShadow=!0,n.add(Y);const z=new K(new xe(.82,.82,.6,26,1,!0),a);z.position.set(0,this.isParked?.86:.92,-.18),z.castShadow=!0,z.receiveShadow=!0,n.add(z);const Z=new K(new _o(this.isParked?.9:.74,26),a);if(Z.rotation.x=-Math.PI/2,Z.position.set(0,this.isParked?.62:.66,-.18),Z.receiveShadow=!0,n.add(Z),this.isParked){const Ot={x:1.1,y:.8,z:2.2},Wt=-.12+.95/2,v=(.98-.82)/Ot.y,O=Wt/Ot.z,H=Ot.x*Math.sqrt(Math.max(0,1-v*v-O*O)),lt=(on,Je,mn,We,$e)=>{const Zi=[],xs=[],ui=[],vs=(nt,Mt,wt,Dt,Ut,Bt)=>{Zi.push(nt,Mt,wt),xs.push(Dt,Ut,Bt)},b=[];for(let nt=0;nt<=We;nt+=1){const wt=.98+(nt/We-.5)*Je,Dt=(wt-.82)/Ot.y;for(let Ut=0;Ut<=$e;Ut+=1){const jt=-.12+(Ut/$e-.5)*on,me=jt/Ot.z,Se=1-Dt*Dt-me*me,Re=Se>0?Ot.x*Math.sqrt(Se):Ot.x*1e-4,Xe=Re/(Ot.x*Ot.x),te=(wt-.82)/(Ot.y*Ot.y),Yt=jt/(Ot.z*Ot.z),gn=Math.hypot(Xe,te,Yt)||1;b.push({x:Re,y:wt,z:jt,nx:Xe/gn,ny:te/gn,nz:Yt/gn})}}const N=$e+1;for(const nt of b)vs(nt.x,nt.y,nt.z,nt.nx,nt.ny,nt.nz);for(const nt of b)vs(nt.x-nt.nx*mn,nt.y-nt.ny*mn,nt.z-nt.nz*mn,-nt.nx,-nt.ny,-nt.nz);for(let nt=0;nt<We;nt+=1)for(let Mt=0;Mt<$e;Mt+=1){const wt=nt*N+Mt,Dt=wt+N,Ut=Dt+1,Bt=wt+1;ui.push(wt,Dt,Bt,Dt,Ut,Bt)}const q=b.length;for(let nt=0;nt<We;nt+=1)for(let Mt=0;Mt<$e;Mt+=1){const wt=q+nt*N+Mt,Dt=wt+N,Ut=Dt+1,Bt=wt+1;ui.push(wt,Bt,Dt,Dt,Bt,Ut)}const V=(nt,Mt,wt,Dt)=>{ui.push(nt,Mt,wt,Mt,Dt,wt)};for(let nt=0;nt<$e;nt+=1){const Mt=nt,wt=nt+1;V(Mt,wt,q+Mt,q+wt)}for(let nt=0;nt<$e;nt+=1){const Mt=We*N+nt,wt=Mt+1;V(Mt,q+Mt,wt,q+wt)}for(let nt=0;nt<We;nt+=1){const Mt=nt*N,wt=Mt+N;V(Mt,q+Mt,wt,q+wt)}for(let nt=0;nt<We;nt+=1){const Mt=nt*N+$e,wt=Mt+N;V(Mt,wt,q+Mt,q+wt)}const G=new pe;return G.setIndex(ui),G.setAttribute("position",new oe(Zi,3)),G.setAttribute("normal",new oe(xs,3)),G.computeBoundingSphere(),G.translate(-H,-.98,-Wt),G},vt=i.clone();vt.side=Ve;const kt=new ne;kt.position.set(H,.98,Wt);const Xt=lt(.95,.8,.035*2,8,10),ie=new K(Xt,vt);ie.castShadow=!0,ie.receiveShadow=!0,kt.add(ie),n.add(kt),this.doorPivot=kt;const ae=.6,Kt=new se(ae,.8*.9,.95*.9),ce=new Rt({color:"#050607",roughness:1,metalness:0,side:hn}),Qt=new K(Kt,ce),Ke=-.12/Ot.z,ze=Ot.x*Math.sqrt(Math.max(0,1-v*v-Ke*Ke));Qt.position.set(ze-ae/2,.98,-.12),Qt.castShadow=!1,Qt.receiveShadow=!1,Qt.visible=!1,n.add(Qt),this.doorVoid=Qt}const it=new K(new se(.95,.18,.4),r);it.position.set(0,1.06,.45),it.castShadow=!0,n.add(it);const B=new ne,Q=new C(0,1.22,.34);B.position.copy(Q),B.rotation.x=-.25,n.add(B);const st=new K(new On(.28,.05,10,18),r);st.castShadow=!0,B.add(st);const gt=new K(new xe(.04,.06,.3,10),r);gt.rotation.x=Math.PI/2,gt.position.set(0,-.12,-.18),B.add(gt);const Lt=new K(new ao(.18,1.25,8,14),o);if(Lt.rotation.x=Math.PI/2,Lt.rotation.z=-.55,Lt.scale.set(1.1,.75,.28),Lt.position.set(0,k+.18,Q.z+.6),n.add(Lt),!this.isParked){const xt=new qt(.14,16,16),St=new K(xt,h);St.scale.set(1.1,.65,1.2),St.position.set(-.18,.02,.02),St.castShadow=!0,B.add(St);const Tt=new K(xt,h);Tt.scale.set(1.1,.65,1.2),Tt.position.set(.18,.02,.02),Tt.castShadow=!0,B.add(Tt)}const Nt=new K(new xe(.55,.55,.18,18),r);Nt.position.set(0,.92,-.22),Nt.castShadow=!0,n.add(Nt);const j=new K(new xe(.46,.46,.26,16),r);j.position.set(0,1.1,-.22),j.castShadow=!0,n.add(j);const ht=new K(new qt(.55,18,14),i);ht.scale.set(1.25,.55,.6),ht.position.set(0,.55,2.05),ht.castShadow=!0,n.add(ht);const Et=new K(new On(.35,.05,10,18,Math.PI),r);Et.position.set(0,.45,2.15),Et.rotation.x=Math.PI/2,n.add(Et);const mt=new xe(.32,.32,.22,16),Ft=new xe(.2,.2,.23,16),zt=new xe(.08,.08,.24,16),U=new Rt({color:"#20262c",roughness:.9,metalness:.1}),Gt=new Rt({color:"#A0A0A0",roughness:.4,metalness:.8}),$=new Rt({color:"#FFFFFF",roughness:.2,metalness:.2}),ut=[[.9,.32,1.2,1],[-.9,.32,1.2,-1],[.9,.32,-1.2,1],[-.9,.32,-1.2,-1]];for(const[xt,St,Tt]of ut){const dt=new ne;dt.position.set(xt,St,Tt),dt.rotation.z=Math.PI/2;const It=new K(mt,U);It.castShadow=!0,dt.add(It);const Vt=new K(Ft,Gt);dt.add(Vt);const Ot=new K(zt,$);dt.add(Ot),n.add(dt)}if(!this.isParked){const St=new K(new qt(.66,22,18),l);St.position.set(0,1.93,-.08),St.castShadow=!0,n.add(St);const Tt=new K(new qt(.42,18,14),l);Tt.scale.set(1.05,.75,.95),Tt.position.set(0,1.45,-.28),Tt.castShadow=!0,n.add(Tt),this.addPlayerStyleFace(St,h,.66);const dt=this.createPlayerStyleEar(-.34,l,u);dt.position.set(-.34,2.43,-.18),n.add(dt);const It=this.createPlayerStyleEar(.34,l,u);It.position.set(.34,2.43,-.18),n.add(It),this.driver={head:St,chest:Tt,earL:dt,earR:It,headBaseY:St.position.y,chestBaseY:Tt.position.y,earBaseY:dt.position.y}}const et=new qt(.2,16,16),J=new qt(.14,16,16),W=new Rt({color:16777215,emissive:16777215,emissiveIntensity:1,roughness:.2}),at=new Rt({color:16776960,emissive:16776960,emissiveIntensity:1.5,roughness:.2}),yt=new Rt({color:16711680,emissive:16711680,emissiveIntensity:1.5,roughness:.2}),T=xt=>{const St=new K(et,W);St.position.set(xt,.82,2.05),St.scale.set(1,1,.4);const Tt=new K(J,at);return Tt.position.set(0,0,.15),Tt.scale.set(1,1,.6),St.add(Tt),St},y=T(.6);n.add(y);const F=T(-.6);n.add(F);const X=xt=>{const St=new K(et,yt);return St.position.set(xt,.82,-2.05),St.scale.set(1,1,.5),St},ot=X(.6);n.add(ot);const tt=X(-.6);if(n.add(tt),e){const xt=new we(.5,.125),St=D0(e),Tt=new He({map:St,side:Ve}),dt=new K(xt,Tt);dt.position.set(0,.6,-2.12),dt.rotation.y=Math.PI,dt.rotation.x=-.1,n.add(dt)}const bt=new K(new xe(.06,.06,.2,8),r);bt.rotation.x=Math.PI/2,bt.position.set(.45,.43,-2.05),n.add(bt);const pt=new xe(.16,.16,.08,24);pt.rotateX(Math.PI/2);const ct=new xe(.13,.13,.02,24);ct.rotateX(Math.PI/2);const Ct=new Rt({color:11393254,roughness:.1,metalness:.9}),_t=xt=>{const St=new ne,Tt=new K(pt,i);St.add(Tt);const dt=new K(ct,Ct);dt.position.set(0,0,-.05),St.add(dt);const It=new K(new xe(.02,.02,.35,8),r);It.rotation.z=xt>0?-Math.PI/2.5:Math.PI/2.5,It.position.set(xt>0?-.18:.18,-.1,0),St.add(It);const Vt=xt>0?1.3:-1.3;return St.position.set(Vt,1.35,.4),St.rotation.y=xt>0?.25:-.25,St};return n.add(_t(1)),n.add(_t(-1)),n}updateSmoke(t,e=1){if(!this.isParked){if(this.nextSmokeTime-=t,this.nextSmokeTime<=0){const n=e<.1;this.nextSmokeTime=n?.15+Math.random()*.15:.05+Math.random()*.05;const i=new K(I0,U0);i.position.set(.45+(Math.random()-.5)*.1,.43+(Math.random()-.5)*.1,-2.15);const o=n?.35:.6;i.scale.setScalar(o+Math.random()*.4),i.rotation.z=Math.random()*Math.PI,this.smokeGroup.add(i);const r=n?.4:1,a=new C((Math.random()-.5)*.15,(.4+Math.random()*.4)*r,(-1.5-Math.random()*1.5)*r);this.smokeParticles.push({mesh:i,life:1,velocity:a})}for(let n=this.smokeParticles.length-1;n>=0;n--){const i=this.smokeParticles[n];if(i.life-=t,i.life<=0){this.smokeGroup.remove(i.mesh),this.smokeParticles.splice(n,1);continue}i.mesh.position.addScaledVector(i.velocity,t),i.mesh.scale.multiplyScalar(1+t*.5)}}}updateDoorAnimation(t){if(!this.doorPivot)return;const e=Math.min(1,t*this.doorOpenSpeed);this.doorOpen+=(this.doorOpenTarget-this.doorOpen)*e,this.doorOpen=uo.clamp(this.doorOpen,0,1),this.doorPivot.rotation.y=-this.doorOpen*this.doorMaxAngle,this.doorVoid&&(this.doorVoid.visible=this.doorOpen>.05)}addPlayerStyleFace(t,e,n){const i=n/.9,o=new K(new qt(.42*i,24,18),e);o.scale.set(1.1,.7,.9),o.position.set(0,-.15*i,.65*i),o.castShadow=!0,t.add(o);const r=new ne;r.position.set(0,-.19*i,1.01*i),t.add(r);const a=new ni({color:3881787,linewidth:2}),c=new Yi(new C(-.2*i,-.02*i,0),new C(-.1*i,-.1*i,0),new C(0,-.06*i,0)),l=new pe().setFromPoints(c.getPoints(10));r.add(new Bn(l,a));const h=new Yi(new C(0,-.06*i,0),new C(.1*i,-.1*i,0),new C(.2*i,-.02*i,0)),u=new pe().setFromPoints(h.getPoints(10));r.add(new Bn(u,a));const d=new Rt({color:16777215,roughness:.1}),f=new K(new qt(.23*i,32,24),d);f.position.set(-.34*i,.14*i,.74*i),f.scale.set(1,1,.85),t.add(f);const g=new K(new qt(.22*i,32,24),d);g.position.set(.34*i,.14*i,.74*i),g.scale.set(1,1,.85),t.add(g);const _=new Rt({color:0,roughness:.4}),m=new K(new qt(.12*i,24,18),_);m.scale.set(1,1,.45),m.position.set(-.34*i,.14*i,.92*i),t.add(m);const p=new K(new qt(.12*i,24,18),_);p.scale.set(1,1,.45),p.position.set(.34*i,.14*i,.92*i),t.add(p);const S=new He({color:16777215}),x=new K(new qt(.028*i,12,12),S);x.position.set(-.3*i,.18*i,.98*i),t.add(x);const w=new K(new qt(.028*i,12,12),S);t.add(w);const P=new qt(.13*i,16,16),R=new Rt({color:2829099,roughness:.4}),A=new K(P,R);A.position.set(0,-.02*i,.89*i),A.scale.set(1.1,.85,.7),t.add(A);const I=new Bn(new pe().setFromPoints([new C(0,-.09*i,.83*i),new C(0,-.19*i,.89*i)]),new ni({color:3355443}));t.add(I);const E=new ni({color:4473924});this.createWhiskerLine(-.35*i,-.1*i,.73*i,Math.PI-.3,1.3*i,E,t),this.createWhiskerLine(-.35*i,-.17*i,.73*i,Math.PI-.15,1.25*i,E,t),this.createWhiskerLine(-.35*i,-.24*i,.73*i,Math.PI,1.2*i,E,t),this.createWhiskerLine(.35*i,-.1*i,.73*i,.3,1.3*i,E,t),this.createWhiskerLine(.35*i,-.17*i,.73*i,.15,1.25*i,E,t),this.createWhiskerLine(.35*i,-.24*i,.73*i,0,1.2*i,E,t)}createWhiskerLine(t,e,n,i,o,r,a){const c=[new C(t,e,n),new C(t+Math.cos(i)*o,e,n+Math.sin(i)*o)],l=new pe().setFromPoints(c);a.add(new Bn(l,r))}createPlayerStyleEar(t,e,n){const i=new ne,o=new K(new ai(.26,.48,14),e);o.scale.set(1,1.05,1),i.add(o);const r=new K(new ai(.2,.38,14),n);return r.position.set(0,-.05,.06),r.scale.set(.82,.82,.55),i.add(r),i.rotation.z=t>0?-.45:.45,i.rotation.x=-.1,i.castShadow=!1,i}createFurTexture(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");if(!e){const i=new ye;return i.needsUpdate=!0,i}e.fillStyle="#f2a158",e.fillRect(0,0,t.width,t.height),e.fillStyle="rgba(194, 114, 49, 0.25)";for(let i=0;i<220;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=1+Math.random()*2.2;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}e.fillStyle="rgba(255, 255, 255, 0.05)";for(let i=0;i<80;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=.8+Math.random()*1.4;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}const n=new ii(t);return n.wrapS=un,n.wrapT=un,n.repeat.set(2.2,2.2),n.colorSpace=ke,n}}const Li=["КОТ-404","МЯУ-007","РЫБА","С0Н","ТЫГДЫК","ЛАПКИ","МУР","КУСЬ","ШЕРСТЬ","ЖРАТЬ"];class N0{constructor(){rt(this,"group",new ne);rt(this,"wallTexture",In("wall","#f5efe8"));rt(this,"roofTexture",In("roof","#d07055"));rt(this,"windowTexture",In("windows","#7fc8ff"));rt(this,"groundTexture",In("grass",ee.groundColor));rt(this,"sandTexture",In("sand",ee.sandColor));rt(this,"roadTexture",In("road","#555a60"));rt(this,"pathTexture",In("path",ee.pathColor));rt(this,"cloudTexture",In("clouds","rgba(0,0,0,0)"));rt(this,"laneLineMaterial",new Rt({color:"#f5f8ff",roughness:.35}));rt(this,"centerLineMaterial",new Rt({color:"#f7f9fc",roughness:.35,metalness:.02,emissive:"#dfe6ef",emissiveIntensity:.05}));rt(this,"colliders",[]);rt(this,"doors",[]);rt(this,"mtsShopDoor");rt(this,"birds",[]);rt(this,"birdsTime",0);rt(this,"intersections",this.computeIntersections());rt(this,"trafficCars",[]);rt(this,"parkedCars",[]);rt(this,"parkingParams",{spotW:2.9,spotD:5.8,gap:.4,pad:1.2,aisle:6.4,drivewayW:3.2});rt(this,"parkingLayouts",[]);rt(this,"trafficState","NS_GO");rt(this,"trafficTimer",0);rt(this,"trafficCycleTime",5);rt(this,"trafficYellowTime",1.5);rt(this,"trafficLights",[]);this.wallTexture.repeat.set(2,2),this.roofTexture.repeat.set(2,2),this.windowTexture.repeat.set(1,1),this.parkingLayouts=this.computeParkingLayouts(),this.buildSky(),this.buildHills(),this.buildGround(),this.buildParks(),this.buildBeach(),this.buildWater(),this.buildRoads(),this.buildPathsToBuildings(),this.buildParkingLots(),this.buildCrosswalks(),this.buildTrafficLights(),this.buildBuildings(),this.buildTrees(),this.buildLamps(),this.buildUmbrellas(),this.buildBenches(),this.buildRocks(),this.buildBirds(),this.buildTrafficCars()}update(t){this.updateTrafficLights(t),this.updateBirds(t),this.updateTrafficCars(t)}updateTrafficCars(t){if(this.trafficCars.length===0)return;const e=18,n=2.2,i=6,o=h=>h*h,r=this.intersections,a=4,c=18,l=h=>this.getTrafficLightState(h);for(const h of this.trafficCars){const u=h.object.position,d=h.getForward2D();let f=1,g=1/0;for(const _ of this.trafficCars){if(_===h)continue;const m=_.object.position,p=m.x-u.x,S=m.z-u.z,x=o(p)+o(S);if(x>e*e||x<1e-4)continue;const w=Math.sqrt(x),P=p/w,R=S/w;P*d.x+R*d.z<.7||Math.abs(p*d.z-S*d.x)>n||w<g&&(g=w)}if(g<1/0){if(g<i*.4)f=0;else if(g<i){const _=(g-i*.4)/(i*.6);f=Math.min(f,Math.max(0,_))}}for(const _ of r){const m=_.x-u.x,p=_.z-u.z,S=o(m)+o(p);if(S>c*c||S<a*a)continue;const x=Math.sqrt(S),w=m/x,P=p/x;if(!(w*d.x+P*d.z>.4))continue;const A=Math.abs(p)>Math.abs(m)?"NS":"EW",I=l(A);if(!(I==="RED"||I==="YELLOW"))continue;const M=(x-a)/Math.max(c-a,.001),D=Math.max(0,Math.min(1,M));f=Math.min(f,D)}h.setSpeedScale(f),h.update(t)}}buildTrafficCars(){const t=Ht.roads??[];if(t.length===0)return;const e=(a,c,l)=>Math.max(c,Math.min(l,a)),n=a=>{const c=a.rotation??0,l=a.length/2,h=a.width/2-1.15,u=e(a.width*.25,1.2,Math.max(1.2,h)),d=4,f=4.5,g=[];for(let m=-l+d;m<=l-d+1e-6;m+=f){const p=this.localToWorldXZ(a.position.x,a.position.z,c,u,m);g.push(new C(p.x,0,p.z))}const _=[];for(let m=l-d;m>=-l+d-1e-6;m-=f){const p=this.localToWorldXZ(a.position.x,a.position.z,c,-u,m);_.push(new C(p.x,0,p.z))}if(g.length>0&&_.length>0){const m=g[g.length-1],p=_[0];m.distanceTo(p)<.1&&_.shift()}if(_.length>0&&g.length>0){const m=_[_.length-1],p=g[0];m.distanceTo(p)<.1&&g.shift()}return[...g,..._]},i=a=>t[a]??null,o=[i(0),i(1),i(2)].filter(Boolean);if(o.length===0)return;const r=["#ff6b6b","#6bcBff","#ffd166"];o.forEach((a,c)=>{const l=n(a);if(l.length<4)return;const h=Li[Math.floor(Math.random()*Li.length)],u=new js(l,{color:r[c%r.length],speed:8,y:.23,startIndex:Math.floor(l.length*c/o.length),plateText:h});this.trafficCars.push(u),this.group.add(u.object)})}computeWorldBounds2D(t){let e=-130,n=ee.worldSize/2,i=-260/2,o=ee.worldSize/2;const r=(c,l,h,u)=>{e=Math.min(e,c),n=Math.max(n,l),i=Math.min(i,h),o=Math.max(o,u)};for(const c of Ht.roads??[]){const l=c.rotation??0,h=Math.abs(Math.cos(l)),u=Math.abs(Math.sin(l)),d=c.width/2,f=c.length/2,g=h*d+u*f,_=u*d+h*f;r(c.position.x-g,c.position.x+g,c.position.z-_,c.position.z+_)}for(const c of Ht.buildings??[]){const l=c.size.x/2,h=c.size.z/2;r(c.position.x-l,c.position.x+l,c.position.z-h,c.position.z+h)}const a=[...Ht.waterAreas??[],...Ht.beachAreas??[],...Ht.parks??[]];for(const c of a)r(c.position.x-c.width/2,c.position.x+c.width/2,c.position.z-c.depth/2,c.position.z+c.depth/2);return{minX:e-t,maxX:n+t,minZ:i-t,maxZ:o+t}}buildSky(){const t=ee.worldSize*1.6,e=new qt(t,32,32),n=new bn({side:Ae,uniforms:{topColor:{value:new Zt(ee.skyTopColor)},bottomColor:{value:new Zt(ee.skyBottomColor)},offset:{value:24},exponent:{value:.42}},vertexShader:`
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPosition = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPosition.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,fragmentShader:`
        uniform vec3 topColor;
        uniform vec3 bottomColor;
        uniform float offset;
        uniform float exponent;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition + vec3(0.0, offset, 0.0)).y;
          float mixValue = max(pow(max(h, 0.0), exponent), 0.0);
          gl_FragColor = vec4(mix(bottomColor, topColor, mixValue), 1.0);
        }
      `}),i=new K(e,n);this.group.add(i),this.buildSunAndClouds()}buildSunAndClouds(){const t=ee.worldSize*3,e=105,n=35,i=ee.worldSize*1.6,o=new ne,r=Math.min(i*.78,t*.6),a=Math.min(i*.5,e+n*.45);o.position.set(0,a,-r);const c=ee.worldSize*.075,l=new K(new qt(c,28,28),new He({color:16773552,fog:!1,depthWrite:!1,depthTest:!0}));l.renderOrder=3,o.add(l);const h=new K(new qt(c*2.4,28,28),new He({color:16770979,fog:!1,transparent:!0,opacity:.42,side:Ae,depthWrite:!1,depthTest:!0}));h.renderOrder=2,o.add(h);const u=new K(new qt(c*1.8,28,28),new He({color:16765834,fog:!1,transparent:!0,opacity:.48,side:Ae,depthWrite:!1,depthTest:!0}));u.renderOrder=2,o.add(u),this.group.add(o),this.cloudTexture.wrapS=this.cloudTexture.wrapT=un,this.cloudTexture.repeat.set(1,1);const d=new Rt({color:"#ffffff",roughness:1,metalness:0,transparent:!0,opacity:.85,emissive:"#ffffff",emissiveIntensity:.03,alphaMap:this.cloudTexture,depthWrite:!1}),f=(m,p,S,x)=>{const w=new ne,P=5;for(let R=0;R<P;R+=1){const A=7+Math.random()*5,I=new K(new qt(A,18,18),d);I.position.set((Math.random()-.5)*20,(Math.random()-.5)*5,(Math.random()-.5)*12),w.add(I)}return w.position.set(m,p,S),w.scale.setScalar(x),w.rotation.y=Math.random()*Math.PI*2,w.renderOrder=2,w},g=new ne,_=18;for(let m=0;m<_;m+=1){const p=(Math.random()-.5)*t,S=(Math.random()-.5)*t,x=e+Math.random()*n,w=.9+Math.random()*.55;g.add(f(p,x,S,w))}this.group.add(g)}buildGround(){const t=this.computeWorldBounds2D(40),e=Math.max(t.maxX-t.minX,t.maxZ-t.minZ,ee.worldSize),n=new we(e,e);this.groundTexture.repeat.set(10,10);const i=new Rt({color:ee.groundColor,map:this.groundTexture,roughness:.85,metalness:.05}),o=new K(n,i);o.rotation.x=-Math.PI/2,o.receiveShadow=!0,this.group.add(o);const r=["#ff6b6b","#ff9ff3","#ffeaa7","#a29bfe","#ff7675","#fdcb6e","#fef5e7","#c8d6e5","#ffcccc"],a={},c=ee.worldSize*.5;for(let l=0;l<420;l+=1){const h=Math.random()*Math.PI*2,u=Math.random()*c,d=Math.cos(h)*u,f=Math.sin(h)*u;if(this.isPointOnRoad(d,f,1.2)||this.isPointInParking(d,f,1.4)||this.isPointNearBuilding(d,f,2.8)||this.isPointInAreas(d,f,Ht.waterAreas,0)||this.isPointInAreas(d,f,Ht.beachAreas,0))continue;const g=r[Math.floor(Math.random()*r.length)],_=a[g]??(a[g]=new Rt({color:g,roughness:.6})),m=new K(new xe(.04,.04,.6,6),new Rt({color:"#27ae60"}));m.position.set(d,.3,f);const p=new K(new qt(.16,8,8),_);p.position.set(d,.65,f),p.castShadow=!0,this.group.add(m,p)}}isPointInAreas(t,e,n,i){return n?n.some(o=>Math.abs(t-o.position.x)<=o.width/2+i&&Math.abs(e-o.position.z)<=o.depth/2+i):!1}isPointOnRoad(t,e,n=0){const i=Ht.roads??[];for(const o of i){const r=o.rotation??0,a=this.worldToLocalXZ(o.position.x,o.position.z,r,t,e);if(Math.abs(a.x)<=o.width/2+n&&Math.abs(a.z)<=o.length/2+n)return!0}return!1}isPointNearBuilding(t,e,n){return Ht.buildings.some(i=>{const o=i.rotation??0,r=this.worldToLocalXZ(i.position.x,i.position.z,o,t,e);return Math.abs(r.x)<=i.size.x/2+n&&Math.abs(r.z)<=i.size.z/2+n})}isMainRoad(t){return(t.center??"none")!=="none"||t.width>=10}getClosestRoadInfo(t,e,n=!1){const i=Ht.roads??[];if(i.length===0)return null;const o=(c,l,h)=>Math.max(l,Math.min(h,c));let r=null,a=null;for(const c of i){const l=c.rotation??0,h=this.worldToLocalXZ(c.position.x,c.position.z,l,t,e),u=o(h.x,-c.width/2,c.width/2),d=o(h.z,-c.length/2,c.length/2),f=this.localToWorldXZ(c.position.x,c.position.z,l,u,d),g=t-f.x,_=e-f.z,m=g*g+_*_,p={road:c,worldOnRoad:f,localOnRoad:{x:u,z:d},distance2:m};(!r||m<r.distance2)&&(r=p),this.isMainRoad(c)&&(!a||m<a.distance2)&&(a=p)}return!n||!a||!r?r:a.distance2<=r.distance2*1.6?a:r}isPointInParking(t,e,n=0){return this.parkingLayouts.some(i=>{const o=this.worldToLocalXZ(i.center.x,i.center.z,i.rotation,t,e);return Math.abs(o.x)<=i.totalW/2+n&&Math.abs(o.z)<=i.totalD/2+n})}worldToLocalXZ(t,e,n,i,o){const r=i-t,a=o-e,c=Math.cos(-n),l=Math.sin(-n);return{x:r*c+a*l,z:-r*l+a*c}}computeIntersections(){const t=Ht.roads??[],e=1e-6,n=(r,a)=>r.x*a.z-r.z*a.x,i=r=>({x:Math.sin(r),z:Math.cos(r)}),o=[];for(let r=0;r<t.length;r+=1)for(let a=r+1;a<t.length;a+=1){const c=t[r],l=t[a],h=c.rotation??0,u=l.rotation??0,d={x:c.position.x,z:c.position.z},f={x:l.position.x,z:l.position.z},g=i(h),_=i(u),m=n(g,_);if(Math.abs(m)<e)continue;const p={x:f.x-d.x,z:f.z-d.z},S=n(p,_)/m,x={x:d.x+g.x*S,z:d.z+g.z*S},w=this.worldToLocalXZ(c.position.x,c.position.z,h,x.x,x.z),P=this.worldToLocalXZ(l.position.x,l.position.z,u,x.x,x.z),R=Math.abs(w.x)<=c.width/2+.01&&Math.abs(w.z)<=c.length/2+.01,A=Math.abs(P.x)<=l.width/2+.01&&Math.abs(P.z)<=l.length/2+.01;if(!R||!A)continue;const I=Math.max(c.width,l.width)/2+1.2;o.some(M=>Math.hypot(M.x-x.x,M.z-x.z)<.5)||o.push({x:x.x,z:x.z,halfSize:I})}return o}buildHills(){const t=["#5fae6a","#72bf76","#86c56f","#a7cf6a","#c9c56a","#8bbf8a"],e=this.computeWorldBounds2D(0),i=Math.max(Math.abs(e.minX),Math.abs(e.maxX),Math.abs(e.minZ),Math.abs(e.maxZ))+6,o=20,r=(a,c,l)=>{const h=a.attributes.position;if(h){for(let u=0;u<h.count;u+=1){const d=h.getX(u),f=h.getY(u),g=h.getZ(u);if(Math.hypot(d,g)<1e-6)continue;const m=Math.min(1,Math.max(0,f/Math.max(1e-6,l))),p=1-Math.min(1,Math.max(0,m)),S=Math.sin(d*3.1)*.35+Math.cos(g*2.7)*.35,x=(Math.random()-.5)*.5,w=1+(S+x)*c*p;h.setXYZ(u,d*w,f,g*w)}a.computeVertexNormals()}};for(let a=0;a<o;a+=1){const c=a/o*Math.PI*2,l=i+(Math.random()-.5)*14,h=Math.cos(c)*l,u=Math.sin(c)*l,d=20+Math.random()*22,f=7+Math.random()*10,g=t[Math.floor(Math.random()*t.length)],_=new Rt({color:g,roughness:.95,metalness:0}),m=[],p=18,S=d,x=f,w=2,P=1.05;for(let E=0;E<=p;E+=1){const M=E/p,D=M*S,k=x*Math.pow(Math.max(0,1-Math.pow(M,w)),P);m.push(new ft(D,k))}const R=new go(m,28);r(R,.07,x);const A=new K(R,_);A.castShadow=!1,A.receiveShadow=!1,A.position.set(h,-1.6,u),A.rotation.y=Math.random()*Math.PI*2,this.group.add(A);const I=6+Math.floor(Math.random()*10);for(let E=0;E<I;E+=1){const M=Math.random()*Math.PI*2,D=d*(.75+Math.random()*.55),k=h+Math.cos(M)*D,L=u+Math.sin(M)*D;this.isPointOnRoad(k,L,1.2)||this.isPointNearBuilding(k,L,4.5)||this.isPointInAreas(k,L,Ht.waterAreas,2)||this.isPointInAreas(k,L,Ht.beachAreas,2)||this.addTree(k,L)}}}buildBeach(){const t=Ht.beachAreas;if(!t||t.length===0)return;this.sandTexture.repeat.set(8,6);const e=new Rt({color:ee.sandColor,map:this.sandTexture,roughness:.9,metalness:0});t.forEach(n=>{const i=new K(new we(n.width,n.depth),e);i.position.set(n.position.x,.01,n.position.z),i.rotation.x=-Math.PI/2,i.receiveShadow=!0,this.group.add(i)})}buildWater(){const t=new Rt({color:ee.waterColor,roughness:.25,metalness:.15,transparent:!0,opacity:.9}),e=Ht.waterAreas;!e||e.length===0||e.forEach(n=>{const i=new K(new we(n.width,n.depth),t);i.position.set(n.position.x,.02,n.position.z),i.rotation.x=-Math.PI/2,this.group.add(i)})}buildRoads(){var t;(t=Ht.roads)==null||t.forEach(e=>{const n=new ne;n.position.set(e.position.x,.04,e.position.z),n.rotation.y=e.rotation??0;const i=new K(new we(e.width,e.length),new Rt({color:"#555a60",map:this.roadTexture,roughness:.9,metalness:.08}));i.rotation.x=-Math.PI/2,i.receiveShadow=!0,n.add(i);const o=e.center??"none";if(this.addCenterLine(n,o,e.length,e),e.width>=11){const r=e.width*.25;this.addDashedLine(n,r,e.length,this.laneLineMaterial),this.addDashedLine(n,-r,e.length,this.laneLineMaterial)}this.group.add(n)})}buildPathsToBuildings(){const t=new Rt({color:ee.pathColor,map:this.pathTexture,roughness:.95,metalness:0});this.pathTexture.repeat.set(2,2);const e=Ht.roads??[];if(e.length===0)return;const n=2.4,i=.03,o=(l,h,u)=>Math.max(h,Math.min(u,l)),r=(l,h,u,d)=>{const f=u-l.x,g=d-l.z,_=Math.cos(-h),m=Math.sin(-h);return{x:f*_+g*m,z:-f*m+g*_}},a=(l,h,u,d)=>{const f=Math.cos(h),g=Math.sin(h);return{x:l.x+u*f+d*g,z:l.z+(-u*g+d*f)}},c=(l,h)=>{let u={x:e[0].position.x,z:e[0].position.z},d=1/0;for(const f of e){const g=f.rotation??0,_=r(f.position,g,l,h),m=o(_.x,-f.width/2,f.width/2),p=o(_.z,-f.length/2,f.length/2),S=a(f.position,g,m,p),x=l-S.x,w=h-S.z,P=x*x+w*w;P<d&&(d=P,u=S)}return u};Ht.buildings.forEach(l=>{const h=l.rotation??0,u=l.size.z/2+Pt.door.localZOutset,d=a(l.position,h,0,u),f=c(d.x,d.z),g=d.x-f.x,_=d.z-f.z,m=Math.hypot(g,_);if(m<.5)return;const p=new K(new se(m,.06,n),t);p.position.set((d.x+f.x)/2,i,(d.z+f.z)/2),p.rotation.y=-Math.atan2(_,g),p.receiveShadow=!0,this.group.add(p)})}pushLotAwayFromRoadIfNeeded(t,e,n,i,o){const r=this.getClosestRoadInfo(t.x,t.z,!0);if(!r)return t;const a=r.road,c=a.rotation??0,l=this.worldToLocalXZ(a.position.x,a.position.z,c,t.x,t.z),h=e-c,u=Math.abs(Math.cos(h))*n+Math.abs(Math.sin(h))*i,d=a.width/2+u+o,f=Math.abs(l.x);if(f>=d)return t;const g=d-f,_=Math.sign(l.x)||1,m=Math.cos(c)*_,p=-Math.sin(c)*_;return{x:t.x+m*g,z:t.z+p*g}}computeParkingLayouts(){const t=Ht.parkingLots;if(!t||t.length===0)return[];const{spotW:e,spotD:n,gap:i,pad:o,aisle:r}=this.parkingParams,a=[];return t.forEach(c=>{const l=Ht.buildings[c.buildingIndex];if(!l)return;const h=l.rotation??0,u=Math.max(1,Math.floor(c.spots)),d=u<=5?1:2,f=d===1?u:Math.ceil(u/2),g=d===2?Math.floor(u/2):0,_=Math.max(f,g,1),m=_*e+(_-1)*i+o*2,p=d===1?n+r+o*2:2*n+r+o*2,S=this.getBuildingSafePosition(l),x=l.size.z/2+Pt.door.localZOutset,w=this.localToWorldXZ(S.x,S.z,h,0,x),P=this.getClosestRoadInfo(w.x,w.z,!0),R=(P==null?void 0:P.worldOnRoad)??w,A=l.size.z/2+p/2+3.2,I=l.size.x/2+m/2+1.2,E=-I,M=this.localToWorldXZ(S.x,S.z,h,I,A),D=this.localToWorldXZ(S.x,S.z,h,E,A),k=(M.x-R.x)**2+(M.z-R.z)**2,Y=(D.x-R.x)**2+(D.z-R.z)**2<k?{x:E,z:A}:{x:I,z:A};let z=this.localToWorldXZ(S.x,S.z,h,Y.x,Y.z);z=this.pushLotAwayFromRoadIfNeeded(z,h,m/2,p/2,.8);const Z=d===2?0:-p/2+o+n+r/2,it=d===1?[-r/2]:[-(r/2+n/2),+(r/2+n/2)],B=this.getClosestRoadInfo(z.x,z.z,!0);a.push({buildingIndex:c.buildingIndex,center:z,rotation:h,totalW:m,totalD:p,rows:d,spots:u,spotsRowA:f,spotsRowB:g,rowCentersLocalZ:it,aisleCenterZ:Z,roadForLot:B})}),a}buildParkingLots(){if(this.parkingLayouts.length===0)return;const t=new Rt({color:"#3f464d",roughness:.95,metalness:.05}),e=new Rt({color:"#f7f9fc",roughness:.4,metalness:.05}),{spotW:n,spotD:i,gap:o,pad:r,aisle:a,drivewayW:c}=this.parkingParams,l=.024,h=(f,g,_,m)=>{const p=Math.cos(g),S=Math.sin(g);return{x:f.x+_*p+m*S,z:f.z+(-_*S+m*p)}},u=(f,g,_,m)=>{const p=g.x-f.x,S=g.z-f.z,x=Math.hypot(p,S);if(x<.25)return;const w=new K(new se(x,.06,_),m);w.position.set((f.x+g.x)/2,l,(f.z+g.z)/2),w.rotation.y=-Math.atan2(S,p),w.receiveShadow=!0,this.group.add(w)},d=["#ff6b6b","#6bcBff","#ffd166","#a29bfe"];this.parkingLayouts.forEach(f=>{const{center:g,rotation:_,totalW:m,totalD:p,rows:S,spotsRowA:x,spotsRowB:w,rowCentersLocalZ:P,aisleCenterZ:R}=f,A=new K(new se(m,.08,p),t);A.position.set(g.x,.025,g.z),A.rotation.y=_,A.receiveShadow=!0,this.group.add(A);const I=(z,Z,it)=>{const B=h({x:g.x,z:g.z},_,z,Z),Q=new K(new se(.08,.06,it),e);Q.position.set(B.x,.07,B.z),Q.rotation.y=_,this.group.add(Q)};for(let z=0;z<P.length;z+=1){const Z=P[z],it=i,Q=Math.max(1,S===1||z===0?x:w);for(let j=0;j<=Q;j+=1){const ht=-m/2+r+j*(n+o);I(ht,Z,it)}const st=Math.sign(Z)||-1,gt=Z+st*(i/2-.12),Lt=h({x:g.x,z:g.z},_,0,gt),Nt=new K(new se(m-r*2,.06,.08),e);Nt.position.set(Lt.x,.07,Lt.z),Nt.rotation.y=_,this.group.add(Nt)}const E=.08,M=z=>{const Z=h({x:g.x,z:g.z},_,0,z),it=new K(new se(m-r*2,.06,E),e);it.position.set(Z.x,.07,Z.z),it.rotation.y=_,this.group.add(it)};S===2?(M(-a/2),M(+a/2)):M(P[0]+i/2);const D=f.roadForLot;if(D){const z=D.road,Z=z.rotation??0,it=this.worldToLocalXZ(z.position.x,z.position.z,Z,g.x,g.z),B=Math.sign(it.x)||1,Q=.25,st=6,gt=h(z.position,Z,B*(z.width/2+Q),D.localOnRoad.z),Lt=h(z.position,Z,B*(z.width/2+Q+st),D.localOnRoad.z),Nt=h({x:g.x,z:g.z},_,-m/2,R),j=h({x:g.x,z:g.z},_,+m/2,R),ht=(Nt.x-Lt.x)**2+(Nt.z-Lt.z)**2,Et=(j.x-Lt.x)**2+(j.z-Lt.z)**2,mt=ht<Et?Nt:j,Ft=this.worldToLocalXZ(z.position.x,z.position.z,Z,mt.x,mt.z),zt=h(z.position,Z,B*(z.width/2+Q+st),Ft.z);u(gt,Lt,c,t),u(Lt,zt,c,t),u(zt,mt,c,t)}const k=[];for(let z=0;z<P.length;z+=1){const Z=P[z],B=Math.max(1,S===1||z===0?x:w),Q=Z>=0?Math.PI:0;for(let st=0;st<B;st+=1){const gt=-m/2+r+n/2+st*(n+o);k.push({x:gt,z:Z,yaw:Q})}}const L=Math.min(2,k.length);(L===1?[Math.floor(k.length/2)]:[0,Math.max(0,k.length-1)]).slice(0,L).forEach((z,Z)=>{const it=k[z];if(!it)return;const B=h({x:g.x,z:g.z},_,it.x,it.z),Q=d[(f.buildingIndex+Z)%d.length],st=Li[Math.floor(Math.random()*Li.length)],gt=new js([new C(B.x,0,B.z)],{color:Q,speed:0,y:.23,parked:!0,plateText:st});gt.object.position.set(B.x,.23,B.z),gt.object.rotation.y=_+it.yaw,gt.object.userData.parkedCar=!0,gt.object.userData.carColor=Q,this.group.add(gt.object),this.parkedCars.push({car:gt,object:gt.object,radius:2.6,doorOpen:!1})})})}addCenterLine(t,e,n,i){if(e==="none")return;if(e==="dashed"){this.addDashedLine(t,0,n,this.centerLineMaterial);return}const o=r=>{this.computeCenterLineIntervals(i).forEach(c=>{const l=c.b-c.a;if(l<.6)return;const h=(c.a+c.b)/2;t.add(this.createSolidLine(r,l,this.centerLineMaterial,h))})};if(e==="solid"){o(0);return}e==="double"&&(o(-.35),o(.35))}computeCenterLineIntervals(t){const e=t.rotation??0,n=-t.length/2,i=t.length/2,o=[];for(const l of this.intersections){const h=this.worldToLocalXZ(t.position.x,t.position.z,e,l.x,l.z);if(Math.abs(h.x)>t.width/2+.6)continue;const u=l.halfSize+1,d=Math.max(n,h.z-u),f=Math.min(i,h.z+u);f<=n||d>=i||o.push({a:d,b:f})}if(o.length===0)return[{a:n,b:i}];o.sort((l,h)=>l.a-h.a);const r=[];for(const l of o){const h=r[r.length-1];!h||l.a>h.b?r.push({a:l.a,b:l.b}):h.b=Math.max(h.b,l.b)}const a=[];let c=n;for(const l of r)l.a>c&&a.push({a:c,b:l.a}),c=Math.max(c,l.b);return i>c&&a.push({a:c,b:i}),a}buildCrosswalks(){var e;const t=new Rt({color:"#f7f9fc",roughness:.3});(e=Ht.crosswalks)==null||e.forEach(n=>{const i=new ne,o=.45,r=.75,a=Math.floor(n.length/r)+2,c=-n.length/2+o/2;for(let l=0;l<a;l+=1){const h=c+l*r;if(h>n.length/2)break;const u=new K(new we(n.width,o),t);u.position.set(0,.06,h),u.rotation.x=-Math.PI/2,i.add(u)}i.position.set(n.position.x,.05,n.position.z),i.rotation.y=n.rotation??0,this.group.add(i)})}createSolidLine(t,e,n,i=0){const o=new K(new we(.18,e),n);return o.position.set(t,.055,i),o.rotation.x=-Math.PI/2,o.receiveShadow=!1,o}addDashedLine(t,e,n,i){const a=Math.floor(n/5);for(let c=0;c<a;c+=1){const l=-n/2+1.5+c*5,h=this.localToWorldXZ(t.position.x,t.position.z,t.rotation.y,e,l);if(this.isInAnyIntersection(h.x,h.z))continue;const u=new K(new we(.18,3),i);u.position.set(e,.055,l),u.rotation.x=-Math.PI/2,u.receiveShadow=!1,t.add(u)}}isInAnyIntersection(t,e){return this.intersections.some(n=>Math.abs(t-n.x)<=n.halfSize&&Math.abs(e-n.z)<=n.halfSize)}localToWorldXZ(t,e,n,i,o){const r=Math.cos(n),a=Math.sin(n);return{x:t+i*r+o*a,z:e+(-i*a+o*r)}}buildTrafficLights(){if(this.intersections.length===0)return;const t=new xe(.1,.1,4,8),e=new Rt({color:2899536}),n=new se(.5,1.2,.5),i=new _o(.15,16),o=1;this.intersections.forEach(r=>{const a=r.halfSize+o;[{x:-a,z:-a,rot:0,type:"NS"},{x:a,z:-a,rot:-Math.PI/2,type:"EW"},{x:a,z:a,rot:Math.PI,type:"NS"},{x:-a,z:a,rot:Math.PI/2,type:"EW"}].forEach(l=>{const h=new ne;h.position.set(l.x+r.x,0,l.z+r.z);const u=new K(t,e);u.position.y=2,u.castShadow=!0,h.add(u);const d=new K(n,e);d.position.set(0,3.5,0),d.rotation.y=l.rot,d.castShadow=!0,h.add(d);const f=new He({color:3342336}),g=new He({color:3355392}),_=new He({color:13056}),m=new K(i,f);m.position.set(0,.3,.26),d.add(m);const p=new K(i,g);p.position.set(0,0,.26),d.add(p);const S=new K(i,_);S.position.set(0,-.3,.26),d.add(S),this.trafficLights.push({type:l.type,red:f,yellow:g,green:_}),this.group.add(h)})}),this.applyTrafficLightVisuals()}updateTrafficLights(t){if(this.trafficLights.length!==0)switch(this.trafficTimer+=t,this.trafficState){case"NS_GO":this.trafficTimer>=this.trafficCycleTime&&this.transitionTraffic("NS_YELLOW");break;case"NS_YELLOW":this.trafficTimer>=this.trafficYellowTime&&this.transitionTraffic("EW_GO");break;case"EW_GO":this.trafficTimer>=this.trafficCycleTime&&this.transitionTraffic("EW_YELLOW");break;case"EW_YELLOW":this.trafficTimer>=this.trafficYellowTime&&this.transitionTraffic("NS_GO");break}}transitionTraffic(t){this.trafficState=t,this.trafficTimer=0,this.applyTrafficLightVisuals()}getTrafficLightState(t){return this.trafficState===`${t}_GO`?"GREEN":this.trafficState===`${t}_YELLOW`?"YELLOW":"RED"}applyTrafficLightVisuals(){this.trafficLights.forEach(t=>{t.red.color.setHex(3342336),t.yellow.color.setHex(3355392),t.green.color.setHex(13056);const e=this.getTrafficLightState(t.type);e==="RED"&&t.red.color.setHex(16711680),e==="YELLOW"&&t.yellow.color.setHex(16776960),e==="GREEN"&&t.green.color.setHex(65280)})}buildParks(){var e;const t=new Rt({color:"#76d09a",roughness:.85,metalness:.03});(e=Ht.parks)==null||e.forEach(n=>{const i=new K(new we(n.width,n.depth),t);i.rotation.x=-Math.PI/2,i.position.set(n.position.x,.015,n.position.z),i.receiveShadow=!0,this.group.add(i)})}getBuildingSafePosition(t){const e=Ht.roads??[],n=.8;let i={x:t.position.x,z:t.position.z};const o=t.rotation??0,r=t.size.x/2,a=t.size.z/2;for(const c of e){const l=c.rotation??0,h=this.worldToLocalXZ(c.position.x,c.position.z,l,i.x,i.z),u=o-l,d=Math.abs(Math.cos(u)),f=Math.abs(Math.sin(u)),g=d*r+f*a,_=f*r+d*a,m=c.width/2+g+n,p=c.length/2+_+n;if(Math.abs(h.x)<m&&Math.abs(h.z)<p){const S=m-Math.abs(h.x),x=Math.sign(h.x)||1,w=Math.cos(l)*x,P=-Math.sin(l)*x;i={x:i.x+w*S,z:i.z+P*S}}}return i}buildBuildings(){Ht.buildings.forEach(t=>{const e=this.getBuildingSafePosition(t),n=t.rotation??0,i=L0({...t,position:e},{wall:this.wallTexture,roof:this.roofTexture,windows:this.windowTexture});this.colliders.push({position:{x:e.x,z:e.z},half:{x:t.size.x/2+.4,z:t.size.z/2+.4},rotation:n,type:"building"});const o=i.userData.door,r=t.size.z/2+Pt.door.localZOutset,a=this.localToWorldXZ(e.x,e.z,n,0,r);o&&(this.doors.push({mesh:o,position:a,rotation:n,open:0,label:t.label}),t.label==="МТС SHOP"&&(this.mtsShopDoor={x:a.x,z:a.z})),this.group.add(i)})}buildTrees(){const t=Ht.parks??[],e=Ht.waterAreas,n=Ht.beachAreas,i=a=>{if(t.length!==0)for(let c=0;c<a;c+=1){const l=t[Math.floor(Math.random()*t.length)],h=l.position.x+(Math.random()-.5)*l.width,u=l.position.z+(Math.random()-.5)*l.depth;this.isPointOnRoad(h,u,2)||this.isPointInParking(h,u,2.2)||this.isPointInAreas(h,u,e,2)||this.isPointInAreas(h,u,n,2)||this.isPointNearBuilding(h,u,4.5)||this.addTree(h,u)}},o=()=>{Ht.buildings.forEach(a=>{const c=a.rotation??0,l=a.size.x/2+1.4,h=a.size.z/2+1.4,u=a.size.x*a.size.z,f=(u>=180?6:u>=110?5:4)+Math.floor(Math.random()*4);let g=0;for(let _=0;_<24&&g<f;_+=1){const m=_%2===0?1:-1,p=Math.random()<.5?"z":"x",S=p==="z"?Math.random()<.5?h:-h:Math.random()<.5?l:-l,x=p==="z"?m*(l+1+Math.random()*2.2):S+m*(1+Math.random()*2.2),w=p==="z"?S+(Math.random()-.5)*2.6:m*(h+1+Math.random()*2.2),P=this.localToWorldXZ(a.position.x,a.position.z,c,x,w);this.isPointOnRoad(P.x,P.z,1.6)||this.isPointInParking(P.x,P.z,2.2)||this.isPointInAreas(P.x,P.z,e,1.6)||this.isPointInAreas(P.x,P.z,n,1.6)||this.isPointNearBuilding(P.x,P.z,1.2)||(this.addTree(P.x,P.z),g+=1)}})},r=()=>{const a=Ht.roads??[];if(a.length===0)return;const c=(l,h)=>{this.isPointOnRoad(l,h,1.6)||this.isPointInParking(l,h,2.2)||this.isPointInAreas(l,h,e,1.6)||this.isPointInAreas(l,h,n,1.6)||this.isPointNearBuilding(l,h,2.2)||this.addTree(l,h)};a.forEach(l=>{const h=l.rotation??0,u=l.length/2,d=Math.cos(h),f=Math.sin(h),g=[l.width/2+2.4,-(l.width/2+2.4)],_=10;for(const m of g)for(let p=-u+6;p<=u-6+1e-6;p+=_){const S=m,x=p+(Math.random()-.5)*3,w=l.position.x+S*d+x*f,P=l.position.z+-S*f+x*d;c(w,P)}})};i(90),o(),r()}addTree(t,e){const n=new K(new xe(.35,.5,2.6,10),new Rt({color:"#7a5138",roughness:.9}));n.position.set(t,1.3,e),n.castShadow=!0;const i=["#3fbf74","#34a96b","#5cd18a"];for(let o=0;o<4;o+=1){const r=new K(new qt(1.4-o*.12,12,12),new Rt({color:i[o%i.length],roughness:.75}));r.position.set(t,3.2+o*.5,e+(o%2===0?.2:-.2)),r.castShadow=!0,this.group.add(r)}this.group.add(n),this.colliders.push({position:{x:t,z:e},half:{x:.6,z:.6},rotation:0,type:"tree"})}buildLamps(){const t=(n,i)=>{const o=new K(new xe(.1,.12,2.8,8),new Rt({color:"#7a5a3a"}));o.position.set(n,1.4,i),o.castShadow=!0;const r=new K(new qt(.35,12,12),new Rt({color:"#ffd77b",emissive:"#ffd77b",emissiveIntensity:.8}));r.position.set(n,2.9,i),r.castShadow=!0;const a=new M0("#ffd7a3",.5,8);a.position.set(n,2.9,i),this.group.add(o,r,a)};[0,1].forEach(n=>{const i=Ht.buildings[n];if(!i)return;const o=i.rotation??0,r=i.size.z/2+Pt.door.localZOutset,a=i.size.x>=10?2.2:1.8,c=this.localToWorldXZ(i.position.x,i.position.z,o,a,r+1.2);this.isPointOnRoad(c.x,c.z,.8)||t(c.x,c.z)})}buildUmbrellas(){Ht.umbrellas.forEach(t=>{const e=new K(new xe(.08,.1,2.4,8),new Rt({color:"#f0f0f0"}));e.position.set(t.x,1.2,t.z),e.castShadow=!0;const n=new K(new ai(1.6,.9,12),new Rt({color:t.color}));n.position.set(t.x,2.2,t.z),n.castShadow=!0,this.group.add(e,n)})}buildBenches(){const t=Ht.parks??[];if(t.length===0)return;const e=()=>t[Math.floor(Math.random()*t.length)],n=Ht.waterAreas,i=5;for(let o=0;o<i;o+=1){const r=e(),a=r.position.x+(Math.random()-.5)*(r.width-8),c=r.position.z+(Math.random()-.5)*(r.depth-8);if(this.isPointOnRoad(a,c,2.5)||this.isPointInAreas(a,c,n,2.5))continue;const l=Math.random()*Math.PI*2,h=new K(new se(2.4,.2,.7),new Rt({color:"#8d5b3e"}));h.position.set(a,.6,c),h.rotation.y=l,h.castShadow=!0;const u=new K(new se(2.4,.7,.15),new Rt({color:"#7b4f36"}));u.position.set(a,1,c-.25),u.rotation.y=l,u.castShadow=!0,this.group.add(h,u)}}buildRocks(){Ht.rocks.forEach(t=>{const e=new K(new qt(t.size,10,10),new Rt({color:"#a2b1bf",roughness:.8}));e.position.set(t.x,t.size*.5,t.z),e.castShadow=!0,this.group.add(e)})}resolveCollisions(t,e){const n=t.clone();for(const i of this.colliders){const o=i.rotation,r=n.x-i.position.x,a=n.z-i.position.z,c=Math.cos(-o),l=Math.sin(-o),h=r*c+a*l,u=-r*l+a*c,d=i.half.x,f=i.half.z,g=Math.max(-d,Math.min(d,h)),_=Math.max(-f,Math.min(f,u)),m=h-g,p=u-_,S=m*m+p*p;let x=h,w=u;if(Math.abs(h)<=d&&Math.abs(u)<=f){const I=d-Math.abs(h)+e,E=f-Math.abs(u)+e;I<E?x=h>=0?d+e:-d-e:w=u>=0?f+e:-f-e}else if(S<e*e){const I=Math.max(1e-6,Math.sqrt(S)),E=e-I,M=m/I,D=p/I;x+=M*E,w+=D*E}else continue;const R=i.position.x+x*Math.cos(o)+w*Math.sin(o),A=i.position.z+(-x*Math.sin(o)+w*Math.cos(o));n.x=R,n.z=A}return n}resolvePlayerMovement(t,e){const n=this.resolveCollisions(t,e),i=(o,r)=>{const a=n.x-o.position.x,c=n.z-o.position.z,l=Math.hypot(a,c),h=e+r;if(l<1e-6||l>=h)return;const u=h-l,d=a/l,f=c/l;n.x+=d*u,n.z+=f*u};for(const o of this.parkedCars)i(o.object,o.radius);for(const o of this.trafficCars)i(o.object,2.2);return n}resolveCarMovement(t,e,n){const i=this.resolveCollisions(t,e),o=(r,a)=>{if(r===n)return;const c=i.x-r.position.x,l=i.z-r.position.z,h=Math.hypot(c,l),u=e+a;if(h<1e-6||h>=u)return;const d=u-h,f=c/h,g=l/h;i.x+=f*d,i.z+=g*d};for(const r of this.parkedCars)o(r.object,r.radius);for(const r of this.trafficCars)o(r.object,2.2);return i}updateDoors(t,e){const o=Math.PI*.45;this.doors.forEach(r=>{const a=Math.hypot(e.x-r.position.x,e.z-r.position.z),c=a<=2.6?1:a>=3.2?0:r.open,l=6;r.open=uo.clamp(r.open+(c-r.open)*Math.min(1,t*l),0,1),r.mesh.rotation.y=o*r.open})}getBuildingDoorPosition(t){if(t==="МТС SHOP"&&this.mtsShopDoor)return this.mtsShopDoor;const e=this.doors.find(n=>n.label===t);return e==null?void 0:e.position}getParkedCarObjects(){return this.parkedCars.map(t=>t.object)}occupyParkedCar(t){var c;const e=this.parkedCars.findIndex(l=>l.object===t);if(e<0)return null;const n=this.parkedCars[e],i=((c=n.object.userData)==null?void 0:c.carColor)??"#ff6b6b",o=n.object.position,r=n.object.rotation.y;this.group.remove(n.object),this.parkedCars.splice(e,1),this.parkedCars.splice(e,1);const a=new js([new C(o.x,0,o.z)],{color:i,speed:0,y:.23,parked:!1,plateText:"ПЕРСИК 777"});return a.object.position.set(o.x,o.y,o.z),a.object.rotation.y=r,a.object.userData.carColor=i,a.object.userData.carInstance=a,this.group.add(a.object),a.object}parkCarAt(t){var a,c;const e=((a=t.userData)==null?void 0:a.carColor)??"#ff6b6b",n=t.position,i=t.rotation.y;this.group.remove(t),this.group.remove(t);const o=((c=t.userData)==null?void 0:c.plateText)||Li[Math.floor(Math.random()*Li.length)],r=new js([new C(n.x,0,n.z)],{color:e,speed:0,y:.23,parked:!0,plateText:o});return r.object.position.set(n.x,.23,n.z),r.object.rotation.y=i,r.object.userData.parkedCar=!0,r.object.userData.carColor=e,r.object.userData.carInstance=r,this.group.add(r.object),this.parkedCars.push({car:r,object:r.object,radius:2.6,doorOpen:!1}),r.object}updateParkedCarDoors(t,e,n=4.6,i=5.2){for(const o of this.parkedCars){const r=e.x-o.object.position.x,a=e.z-o.object.position.z,c=Math.hypot(r,a);c<=n&&!o.doorOpen?(o.doorOpen=!0,o.car.setDoorOpen(!0)):c>=i&&o.doorOpen&&(o.doorOpen=!1,o.car.setDoorOpen(!1)),o.car.updateDoorAnimation(t)}}closeAllParkedCarDoors(t=0){for(const e of this.parkedCars)e.doorOpen&&(e.doorOpen=!1,e.car.setDoorOpen(!1),t>0&&e.car.updateDoorAnimation(t))}findParkedCarNear(t,e){let n=null,i=e;for(const o of this.parkedCars){const r=o.object.position.x-t.x,a=o.object.position.z-t.z,c=Math.hypot(r,a);c<=i&&(i=c,n=o)}return n?{car:n,distance:i}:null}buildBirds(){[{x:-60,z:20},{x:0,z:80},{x:40,z:130}].forEach((e,n)=>{const i=new ne,o=4+Math.floor(Math.random()*3),r=new we(.7,.35),a=new He({color:"#2d3436",side:Ve});for(let d=0;d<o;d+=1){const f=new K(r,a);f.position.set((Math.random()-.5)*3,(Math.random()-.5)*.6,(Math.random()-.5)*1.5),f.rotation.x=-Math.PI/2+(Math.random()-.5)*.3,f.rotation.z=(Math.random()-.5)*.5,i.add(f)}const c=26+Math.random()*10,l=32+Math.random()*6,h=.18+Math.random()*.08,u=n*Math.PI*.8;this.birds.push({group:i,radius:c,speed:h,height:l,center:e,phase:u}),this.group.add(i)})}updateBirds(t){this.birds.length!==0&&(this.birdsTime+=t,this.birds.forEach(e=>{const n=this.birdsTime*e.speed+e.phase,i=e.center.x+Math.cos(n)*e.radius,o=e.center.z+Math.sin(n)*e.radius;e.group.position.set(i,e.height,o),e.group.rotation.y=-n+Math.PI/2}))}}class z0{constructor(){rt(this,"object");rt(this,"playerGroup");rt(this,"catGroup");rt(this,"catParts",null);rt(this,"catAnimTime",0);rt(this,"velocity",new C);rt(this,"verticalVelocity",0);rt(this,"eyeLookTimer",0);rt(this,"eyeLookDuration",0);rt(this,"eyeLookStart",new ft(0,0));rt(this,"eyeLookTarget",new ft(0,0));rt(this,"eyeLookOffset",new ft(0,0));rt(this,"leftPupilBase",new C);rt(this,"rightPupilBase",new C);rt(this,"leftHighlightBase",new C);rt(this,"rightHighlightBase",new C);this.playerGroup=new ne,this.playerGroup.position.set(0,0,4),this.playerGroup.rotation.y=Math.PI*1.25,this.catGroup=new ne,this.catGroup.scale.set(.6,.6,.6),this.playerGroup.add(this.catGroup),this.buildCat(),this.object=this.playerGroup}setSpawn(t){this.playerGroup.position.set(t.x,t.y??0,t.z),typeof t.yaw=="number"&&(this.playerGroup.rotation.y=t.yaw),this.verticalVelocity=0}buildCat(){const t=this.createFurTexture(),e=new al({color:15901016,roughness:.55,metalness:0,sheen:1,sheenRoughness:.45,sheenColor:16769484,map:t}),n=new Rt({color:16775920,roughness:.65,metalness:.05}),i=new K(new qt(1.35,32,24),e);i.scale.set(1,.78,1.1),i.position.y=1,i.castShadow=!0,this.catGroup.add(i);const o=new K(new qt(.9,32,24),e);o.scale.set(1.05,.95,1.05),o.position.set(0,2.05,.45),o.castShadow=!0,this.catGroup.add(o);const r=new K(new qt(.42,24,18),n);r.scale.set(1.1,.7,.9),r.position.set(0,-.15,.65),r.castShadow=!0,o.add(r);const a=new ne;a.position.set(0,-.19,1.01),o.add(a);const c=new ni({color:3881787,linewidth:2}),l=new Yi(new C(-.2,-.02,0),new C(-.1,-.1,0),new C(0,-.06,0)),h=new pe().setFromPoints(l.getPoints(10)),u=new Bn(h,c);a.add(u);const d=new Yi(new C(0,-.06,0),new C(.1,-.1,0),new C(.2,-.02,0)),f=new pe().setFromPoints(d.getPoints(10)),g=new Bn(f,c);a.add(g);const _=this.createEar(-.45,e),m=this.createEar(.45,e);o.add(_),o.add(m);const p=new Rt({color:16777215,roughness:.1}),S=new K(new qt(.23,32,24),p);S.position.set(-.34,.14,.74),S.scale.set(1,1,.85),o.add(S);const x=new K(new qt(.22,32,24),p);x.position.set(.34,.14,.74),x.scale.set(1,1,.85),o.add(x);const w=new Rt({color:13662778,roughness:.55,metalness:.05}),P=new Hi([new C(-.48,.44,.7),new C(-.32,.5,.72),new C(-.16,.44,.7)]),R=new si(P,16,.035,10,!1),A=new K(R,w);A.castShadow=!0,o.add(A);const I=new Hi([new C(.16,.44,.7),new C(.32,.5,.72),new C(.48,.44,.7)]),E=new si(I,16,.035,10,!1),M=new K(E,w);M.castShadow=!0,o.add(M);const D=new Rt({color:0,roughness:.4}),k=new K(new qt(.12,24,18),D);k.scale.set(1,1,.45),k.position.set(-.34,.14,.92),this.leftPupilBase.copy(k.position),o.add(k);const L=new K(new qt(.12,24,18),D);L.scale.set(1,1,.45),L.position.set(.34,.14,.92),this.rightPupilBase.copy(L.position),o.add(L);const Y=new He({color:16777215}),z=new K(new qt(.028,12,12),Y);z.position.set(-.3,.18,.98),this.leftHighlightBase.copy(z.position),o.add(z);const Z=new K(new qt(.028,12,12),Y);Z.position.set(.27,.18,.98),this.rightHighlightBase.copy(Z.position),o.add(Z);const it=this.createNose();o.add(it);const B=new Bn(new pe().setFromPoints([new C(0,-.09,.83),new C(0,-.19,.89)]),new ni({color:3355443}));o.add(B);const Q=new ni({color:4473924});this.createWhiskerLine(-.35,-.1,.73,Math.PI-.3,1.3,Q,o),this.createWhiskerLine(-.35,-.17,.73,Math.PI-.15,1.25,Q,o),this.createWhiskerLine(-.35,-.24,.73,Math.PI,1.2,Q,o),this.createWhiskerLine(.35,-.1,.73,.3,1.3,Q,o),this.createWhiskerLine(.35,-.17,.73,.15,1.25,Q,o),this.createWhiskerLine(.35,-.24,.73,0,1.2,Q,o);const st=new xe(.2,.22,.8,16),gt=(ut,et)=>{const J=new ne;J.position.set(ut,.85,et);const W=new K(st,e);W.position.y=-.4,W.castShadow=!0,J.add(W);const at=this.createPaw(0,-.72,0,n);return J.add(at),this.catGroup.add(J),{legGroup:J,paw:at}},Lt=gt(-.6,.8),Nt=gt(.6,.8),j=gt(-.7,-.5),ht=gt(.7,-.5),Et=new ne;Et.position.set(0,1,-1.2);const mt=new Hi([new C(0,0,0),new C(0,.5,-.4),new C(0,1.2,-.2),new C(0,1.5,.2)]),Ft=new si(mt,20,.15,8,!1),zt=new K(Ft,e);zt.castShadow=!0,Et.add(zt);const U=new K(new qt(.2,16,16),n);U.position.set(0,1.5,.2),U.castShadow=!0,Et.add(U),this.catGroup.add(Et);const Gt=new K(new On(.35,.06,8,32),new Rt({color:15158332,roughness:.3}));Gt.position.set(0,1.55,.3),Gt.rotation.x=Math.PI/2-.2,this.catGroup.add(Gt);const $=new K(new qt(.1,16,16),new Rt({color:15844367,metalness:.8,roughness:.2}));$.position.set(0,1.4,.6),this.catGroup.add($),this.catParts={head:o,leftEar:_,rightEar:m,leftFrontLeg:Lt.legGroup,rightFrontLeg:Nt.legGroup,leftBackLeg:j.legGroup,rightBackLeg:ht.legGroup,leftFrontPaw:Lt.paw,rightFrontPaw:Nt.paw,leftBackPaw:j.paw,rightBackPaw:ht.paw,tail:Et,leftPupil:k,rightPupil:L,leftPupilHighlight:z,rightPupilHighlight:Z}}createEar(t,e){const n=new ne,i=new K(new ai(.55,.95,32),e);i.scale.set(1,1.05,1),n.add(i);const o=new K(new ai(.42,.78,32),new Rt({color:16758465,roughness:.45}));return o.position.set(0,-.08,.08),o.scale.set(.82,.82,.55),n.add(o),n.position.set(t,.45,.05),n.rotation.z=t>0?-.45:.45,n.rotation.x=-.1,n}createNose(){const t=new qt(.13,16,16),e=new Rt({color:2829099,roughness:.4}),n=new K(t,e);return n.position.set(0,-.02,.89),n.scale.set(1.1,.85,.7),n}createFurTexture(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");if(!e){const i=new ye;return i.needsUpdate=!0,i}e.fillStyle="#f2a158",e.fillRect(0,0,t.width,t.height),e.fillStyle="rgba(194, 114, 49, 0.25)";for(let i=0;i<220;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=1+Math.random()*2.2;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}e.fillStyle="rgba(255, 255, 255, 0.05)";for(let i=0;i<80;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=.8+Math.random()*1.4;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}const n=new ii(t);return n.wrapS=un,n.wrapT=un,n.repeat.set(2.2,2.2),n.colorSpace=ke,n}createWhiskerLine(t,e,n,i,o,r,a){const c=[new C(t,e,n),new C(t+Math.cos(i)*o,e,n+Math.sin(i)*o)],l=new pe().setFromPoints(c),h=new Bn(l,r);a.add(h)}createPaw(t,e,n,i){const o=new ne;o.position.set(t,e,n);const r=new K(new qt(.24,16,16),i);return r.scale.set(1.1,.6,1.2),r.castShadow=!0,o.add(r),o}update(t,e,n){const i=Math.hypot(e.x,e.z),o=!!(n!=null&&n.sprint);if(i>0){const l=ee.playerSpeed*(o?ee.playerSprintMultiplier:1);this.velocity.set(e.x/i,0,e.z/i).multiplyScalar(l),this.playerGroup.position.addScaledVector(this.velocity,t);const h=Math.atan2(this.velocity.x,this.velocity.z),d=e.z>.2&&Math.abs(e.x)>.2?ee.playerTurnSpeed*.5:ee.playerTurnSpeed;this.playerGroup.rotation.y=this.lerpYaw(this.playerGroup.rotation.y,h,d*t)}else this.velocity.set(0,0,0);const r=this.velocity.length()>.1,a=r&&o;this.animateCat(t,r,a),this.playerGroup.position.y<=1e-4&&(this.playerGroup.position.y=0,this.verticalVelocity<0&&(this.verticalVelocity=0),n!=null&&n.jump&&(this.verticalVelocity=ee.playerJumpSpeed)),this.verticalVelocity-=ee.playerGravity*t,this.playerGroup.position.y+=this.verticalVelocity*t,this.playerGroup.position.y<0&&(this.playerGroup.position.y=0,this.verticalVelocity=0)}animateCat(t,e,n){if(!this.catParts)return;this.catAnimTime+=t*(n?12:8);const i=this.catAnimTime;if(this.updateEyeLook(t),e){const o=Math.sin(i)*(n?.65:.5);this.catParts.leftFrontLeg.rotation.x=o,this.catParts.rightBackLeg.rotation.x=o,this.catParts.rightFrontLeg.rotation.x=-o,this.catParts.leftBackLeg.rotation.x=-o,this.catParts.leftFrontPaw.rotation.x=-o*.4,this.catParts.rightFrontPaw.rotation.x=o*.4,this.catParts.leftBackPaw.rotation.x=o*.4,this.catParts.rightBackPaw.rotation.x=-o*.4,this.catGroup.position.y=Math.abs(Math.sin(i*2))*(n?.12:.06),this.catParts.tail.rotation.z=Math.sin(i*2)*.4,this.catParts.tail.rotation.x=Math.sin(i)*.15}else this.catParts.leftFrontLeg.rotation.x=0,this.catParts.rightFrontLeg.rotation.x=0,this.catParts.leftBackLeg.rotation.x=0,this.catParts.rightBackLeg.rotation.x=0,this.catParts.leftFrontPaw.rotation.x=0,this.catParts.rightFrontPaw.rotation.x=0,this.catParts.leftBackPaw.rotation.x=0,this.catParts.rightBackPaw.rotation.x=0,this.catParts.leftEar.rotation.x=-.1+Math.sin(i*2)*.05,this.catParts.rightEar.rotation.x=-.1+Math.sin(i*2)*.05,this.catParts.leftEar.rotation.z=.5+Math.sin(i*1.5)*.03,this.catParts.rightEar.rotation.z=-.5-Math.sin(i*1.5)*.03,this.catGroup.position.y=Math.sin(i*.5)*.02,this.catParts.tail.rotation.z=Math.sin(i*.8)*.15}updateEyeLook(t){if(!this.catParts)return;if(this.eyeLookDuration>0){this.eyeLookTimer+=t;const o=Math.min(this.eyeLookTimer/this.eyeLookDuration,1);this.eyeLookOffset.lerpVectors(this.eyeLookStart,this.eyeLookTarget,o),o>=1&&(this.eyeLookTarget.lengthSq()>1e-4?(this.eyeLookStart.copy(this.eyeLookOffset),this.eyeLookTarget.set(0,0),this.eyeLookDuration=.45,this.eyeLookTimer=0):this.eyeLookDuration=0)}else if(Math.random()<t*.9){const a=(Math.random()*2-1)*.12,c=(Math.random()*2-1)*.05;this.eyeLookStart.copy(this.eyeLookOffset),this.eyeLookTarget.set(a,c),this.eyeLookDuration=.5+Math.random()*.35,this.eyeLookTimer=0}const e=this.eyeLookOffset.x,n=this.eyeLookOffset.y;this.catParts.leftPupil.position.set(this.leftPupilBase.x+e,this.leftPupilBase.y+n,this.leftPupilBase.z),this.catParts.rightPupil.position.set(this.rightPupilBase.x+e,this.rightPupilBase.y+n,this.rightPupilBase.z);const i=1.2;this.catParts.leftPupilHighlight.position.set(this.leftHighlightBase.x+e*i,this.leftHighlightBase.y+n*i,this.leftHighlightBase.z),this.catParts.rightPupilHighlight.position.set(this.rightHighlightBase.x+e*i,this.rightHighlightBase.y+n*i,this.rightHighlightBase.z)}lerpYaw(t,e,n){const i=uo.euclideanModulo(e-t+Math.PI,Math.PI*2)-Math.PI;return t+i*n}}class O0{constructor(t){rt(this,"element");rt(this,"minimapWrap");rt(this,"minimapCanvas");rt(this,"minimapCtx");rt(this,"toastEl");rt(this,"promoEl");rt(this,"promoTextEl");rt(this,"toastTimer",null);rt(this,"staticCanvas",null);rt(this,"staticCtx",null);rt(this,"mapOpen",!1);rt(this,"bounds",null);rt(this,"lastCanvasW",0);rt(this,"lastCanvasH",0);rt(this,"promoCloseHandler",null);this.element=document.createElement("div"),this.element.className="ui",this.element.innerHTML=`
      <div class="ui-top">
        <div class="logo">COASTAL WORLD</div>
      </div>
      <div class="ui-buttons">
        <button class="ui-button" type="button" data-action="toggle-map">MAP</button>
        <button class="ui-button" type="button" data-action="toggle-help">≡</button>
      </div>
      <div class="ui-toast" data-role="toast" aria-live="polite" hidden></div>
      <div class="ui-modal" data-role="promo" hidden>
        <div class="ui-modal__card">
          <div class="ui-modal__text" data-role="promo-text"></div>
          <button class="ui-modal__close" type="button" data-role="promo-close" aria-label="Закрыть уведомление">×</button>
        </div>
      </div>
      <div class="ui-hint">WASD/стрелки, джойстик • Shift — быстрый бег • Space — прыжок • E — выйти из машины • мышь/палец для обзора • колесо/пинч для масштаба</div>
      <div class="minimap" data-role="minimap">
        <canvas data-role="minimap-canvas"></canvas>
      </div>
    `,t.appendChild(this.element);const e=this.element.querySelector('[data-role="toast"]'),n=this.element.querySelector('[data-role="minimap"]'),i=this.element.querySelector('[data-role="minimap-canvas"]'),o=this.element.querySelector('[data-role="promo"]'),r=this.element.querySelector('[data-role="promo-text"]'),a=this.element.querySelector('[data-role="promo-close"]');if(!e||!n||!i||!o||!r||!a)throw new Error("UI DOM not found");const c=i.getContext("2d");if(!c)throw new Error("Minimap 2d context not available");this.toastEl=e,this.minimapWrap=n,this.minimapCanvas=i,this.minimapCtx=c,this.promoEl=o,this.promoTextEl=r;const l=this.element.querySelector('[data-action="toggle-map"]');l==null||l.addEventListener("click",()=>this.toggleMap());const h=this.element.querySelector('[data-action="toggle-help"]');h==null||h.addEventListener("click",()=>this.toggleHelp()),this.toastEl.addEventListener("click",()=>this.hideMessage()),a.addEventListener("click",()=>{var u;this.hidePromo(),(u=this.promoCloseHandler)==null||u.call(this)}),this.bounds=this.computeWorldBounds()}showMessage(t,e){this.toastTimer!=null&&(window.clearTimeout(this.toastTimer),this.toastTimer=null),this.toastEl.textContent=t,this.toastEl.hidden=!1,this.element.classList.add("toast-open");const n=(e==null?void 0:e.durationMs)??6500;n>0&&(this.toastTimer=window.setTimeout(()=>{this.hideMessage()},n))}hideMessage(){this.toastTimer!=null&&(window.clearTimeout(this.toastTimer),this.toastTimer=null),this.toastEl.hidden=!0,this.element.classList.remove("toast-open")}showPromo(t){this.promoTextEl.textContent=t,this.promoEl.hidden=!1,this.promoEl.classList.add("open")}hidePromo(){this.promoEl.hidden=!0,this.promoEl.classList.remove("open")}isPromoVisible(){return!this.promoEl.hidden}onPromoClosed(t){this.promoCloseHandler=t}toggleMap(){this.mapOpen=!this.mapOpen,this.element.classList.toggle("map-open",this.mapOpen),this.lastCanvasW=0,this.lastCanvasH=0}toggleHelp(){this.element.classList.toggle("help-hidden")}updateMinimap(t){this.bounds||(this.bounds=this.computeWorldBounds()),this.ensureMinimapSize(),this.ensureStaticLayer(),this.staticCanvas&&(this.minimapCtx.clearRect(0,0,this.minimapCanvas.width,this.minimapCanvas.height),this.minimapCtx.drawImage(this.staticCanvas,0,0));const e=this.worldToMap(t.x,t.z),n=this.minimapCtx;n.save(),n.translate(e.x,e.y),n.rotate(-t.yaw),n.fillStyle="#ffffff",n.strokeStyle="rgba(0,0,0,0.45)",n.lineWidth=Math.max(1,Math.round(this.minimapCanvas.width*.006)),n.beginPath();const i=Math.max(8,Math.round(this.minimapCanvas.width*.03));n.moveTo(0,-i),n.lineTo(i*.65,i),n.lineTo(0,i*.55),n.lineTo(-i*.65,i),n.closePath(),n.fill(),n.stroke(),n.restore()}ensureMinimapSize(){const t=Math.min(window.devicePixelRatio||1,2),e=this.minimapWrap.getBoundingClientRect(),n=Math.max(1,Math.round(e.width*t)),i=Math.max(1,Math.round(e.height*t));n===this.lastCanvasW&&i===this.lastCanvasH||(this.lastCanvasW=n,this.lastCanvasH=i,this.minimapCanvas.width=n,this.minimapCanvas.height=i,this.staticCanvas=null,this.staticCtx=null)}ensureStaticLayer(){if(this.staticCanvas&&this.staticCtx)return;const t=document.createElement("canvas");t.width=this.minimapCanvas.width,t.height=this.minimapCanvas.height;const e=t.getContext("2d");e&&(this.staticCanvas=t,this.staticCtx=e,this.renderStaticMap(e,t.width,t.height))}computeWorldBounds(){let t=-130,e=ee.worldSize/2,n=-260/2,i=ee.worldSize/2;const o=(c,l,h,u)=>{t=Math.min(t,c),e=Math.max(e,l),n=Math.min(n,h),i=Math.max(i,u)};for(const c of Ht.roads??[]){const l=c.rotation??0,h=Math.abs(Math.cos(l)),u=Math.abs(Math.sin(l)),d=c.width/2,f=c.length/2,g=h*d+u*f,_=u*d+h*f;o(c.position.x-g,c.position.x+g,c.position.z-_,c.position.z+_)}for(const c of Ht.buildings??[]){const l=c.size.x/2,h=c.size.z/2;o(c.position.x-l,c.position.x+l,c.position.z-h,c.position.z+h)}const r=[...Ht.parks??[],...Ht.waterAreas??[],...Ht.beachAreas??[]];for(const c of r)o(c.position.x-c.width/2,c.position.x+c.width/2,c.position.z-c.depth/2,c.position.z+c.depth/2);const a=18;return{minX:t-a,maxX:e+a,minZ:n-a,maxZ:i+a}}worldToMap(t,e){if(!this.bounds)return{x:0,y:0};const{minX:n,maxX:i,minZ:o,maxZ:r}=this.bounds,a=this.minimapCanvas.width,c=this.minimapCanvas.height,l=(t-n)/Math.max(1e-6,i-n),h=(e-o)/Math.max(1e-6,r-o);return{x:l*a,y:(1-h)*c}}renderStaticMap(t,e,n){t.clearRect(0,0,e,n),t.fillStyle=this.mapOpen?"rgba(10, 24, 34, 0.78)":"rgba(10, 24, 34, 0.55)",t.fillRect(0,0,e,n),t.strokeStyle="rgba(255,255,255,0.45)",t.lineWidth=Math.max(2,Math.round(e*.01)),t.strokeRect(t.lineWidth/2,t.lineWidth/2,e-t.lineWidth,n-t.lineWidth);const i=(o,r,a,c,l)=>{const h=this.worldToMap(o-a/2,r-c/2),u=this.worldToMap(o+a/2,r+c/2),d=Math.min(h.x,u.x),f=Math.max(h.x,u.x),g=Math.min(h.y,u.y),_=Math.max(h.y,u.y);t.fillStyle=l,t.fillRect(d,g,f-d,_-g)};for(const o of Ht.parks??[])i(o.position.x,o.position.z,o.width,o.depth,"rgba(88, 190, 124, 0.22)");for(const o of Ht.waterAreas??[])i(o.position.x,o.position.z,o.width,o.depth,"rgba(120, 210, 255, 0.22)");for(const o of Ht.beachAreas??[])i(o.position.x,o.position.z,o.width,o.depth,"rgba(255, 220, 160, 0.18)");t.fillStyle="rgba(205, 220, 235, 0.18)";for(const o of Ht.roads??[])this.drawRotatedRect(t,o.position.x,o.position.z,o.width,o.length,o.rotation??0,"rgba(145, 160, 175, 0.55)");for(const o of Ht.buildings??[]){const r=o.label?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.55)";this.drawRotatedRect(t,o.position.x,o.position.z,o.size.x,o.size.z,o.rotation??0,r)}if(this.mapOpen){t.font=`${Math.max(12,Math.round(e*.03))}px Arial`,t.fillStyle="rgba(255,255,255,0.9)",t.textAlign="center",t.textBaseline="top";for(const o of Ht.buildings??[]){if(!o.label)continue;const r=this.worldToMap(o.position.x,o.position.z);t.fillText(o.label,r.x,r.y+Math.max(6,Math.round(e*.018)))}}}drawRotatedRect(t,e,n,i,o,r,a){const c=i/2,l=o/2,h=Math.cos(r),u=Math.sin(r),d=[{x:-c,z:-l},{x:c,z:-l},{x:c,z:l},{x:-c,z:l}].map(g=>({x:e+g.x*h+g.z*u,z:n+(-g.x*u+g.z*h)})),f=this.worldToMap(d[0].x,d[0].z);t.beginPath(),t.moveTo(f.x,f.y);for(let g=1;g<d.length;g+=1){const _=this.worldToMap(d[g].x,d[g].z);t.lineTo(_.x,_.y)}t.closePath(),t.fillStyle=a,t.fill()}}const Pr=document.getElementById("app");if(!Pr)throw new Error("App container not found");const Oe=new b0(Pr),sn=new O0(Pr),Un=new A0(sn.element),Ne=new N0,le=new z0,Ks={};let Jn=null,Oi=null,Ui=null,_e=null,nn=!1,Di=0;const Js=4.5,os=[],F0=new qt(.12,8,8);let vr=Ne.getParkedCarObjects();const xc=new E0,ar=new ft,B0=s=>{var e;let t=s;for(;t;){if((e=t.userData)!=null&&e.parkedCar)return t;t=t.parent}return null},is=Ht.buildings.find(s=>s.label==="МТС БАНК")??Ht.buildings[0];if(is){const s=is.rotation??0,t=is.size.z/2+Pt.door.localZOutset,e=Math.sin(s),n=Math.cos(s),i=is.position.x+e*t,o=is.position.z+n*t,r=4.2;le.setSpawn({x:i+e*r,z:o+n*r,yaw:s})}sn.showMessage("УРА! Вам выдали кредитную карту. Изучите город чтобы понять возможности карты");sn.onPromoClosed(()=>{Oi&&(Ks[Oi]=!0)});Oe.scene.background=new Zt(ee.skyBottomColor);Oe.scene.fog=new Tr(ee.fogColor,ee.fogNear,ee.fogFar);Oe.addToScene(Ne.group,le.object);const k0=new S0(ee.ambientColor,.7),H0=new x0(ee.skyBottomColor,"#a7e1c2",.95),pn=new ll(ee.sunColor,1.7);pn.position.set(16,22,10);pn.castShadow=!0;pn.shadow.mapSize.set(1024,1024);pn.shadow.camera.near=2;pn.shadow.camera.far=80;pn.shadow.camera.left=-30;pn.shadow.camera.right=30;pn.shadow.camera.top=30;pn.shadow.camera.bottom=-30;const Lr=new ll("#eaf5ff",.28);Lr.position.set(-12,14,-18);Lr.castShadow=!1;Oe.addToScene(k0,H0,pn,Lr);const cr=new P0(Oe.camera,Oe.renderer.domElement,le.object),G0=new C(0,1,0),vc=new C,Mc=new C,yc=new C,V0=12,W0=1.4,X0=3.6,Y0=1.7,q0=(s,t)=>{const e=new C(-Math.sin(t),0,-Math.cos(t));for(let n=0;n<6;n+=1){const i=new Rt({color:"#4a4f55",transparent:!0,opacity:.65}),o=new K(F0,i),r=new C(0,.35,-2.1).add(new C((Math.random()-.5)*.25,0,(Math.random()-.5)*.2)),a=s.localToWorld(r);o.position.copy(a),o.castShadow=!1,o.receiveShadow=!1,Oe.scene.add(o),os.push({mesh:o,velocity:new C(e.x*(.2+Math.random()*.2),.6+Math.random()*.4,e.z*(.2+Math.random()*.2)),life:0,maxLife:.9+Math.random()*.4})}};Oe.renderer.domElement.addEventListener("pointerdown",s=>{var a;if(nn||s.button!==0)return;const t=Oe.renderer.domElement.getBoundingClientRect();ar.x=(s.clientX-t.left)/t.width*2-1,ar.y=-((s.clientY-t.top)/t.height)*2+1,xc.setFromCamera(ar,Oe.camera);const e=xc.intersectObjects(vr,!0);if(e.length===0)return;const n=B0(((a=e[0])==null?void 0:a.object)??null);if(!n)return;const i=le.object.position.x-n.position.x,o=le.object.position.z-n.position.z;if(Math.hypot(i,o)>Js){sn.showMessage("Подойдите ближе к машине");return}Ui=n});Oe.addUpdatable(Ne,{update:s=>{var a;!nn&&Ui&&(_e=Ne.occupyParkedCar(Ui)??Ui,Ui=null,vr=Ne.getParkedCarObjects(),nn=!0,le.object.visible=!1,sn.showMessage("Котик сел в машину"),_e&&(cr.setTarget(_e),Di=_e.rotation.y,q0(_e,Di)),Un.setExitVisible(!0));const t=Un.getMoveVector(),e=Un.isSprinting(),n=Un.consumeJumpPressed(),i=Math.hypot(t.x,t.z);if(!nn&&Un.consumeEnterPressed()){const c=Ne.findParkedCarNear({x:le.object.position.x,z:le.object.position.z},Js);(a=c==null?void 0:c.car)!=null&&a.object?Ui=c.car.object:sn.showMessage("Подойдите ближе к машине")}if(nn&&_e&&(Un.consumeExitPressed()||Un.consumeEnterPressed())){const c=Ne.parkCarAt(_e);if(vr=Ne.getParkedCarObjects(),nn=!1,_e=null,le.object.visible=!0,Un.setExitVisible(!1),cr.setTarget(le.object),c){const l=c.rotation.y;yc.set(Math.cos(l),0,-Math.sin(l));const h=c.position.clone().addScaledVector(yc,2.2);le.object.position.set(h.x,0,h.z);const u=Ne.resolvePlayerMovement(le.object.position,.9);le.object.position.x=u.x,le.object.position.z=u.z}sn.showMessage("Котик вышел из машины")}if(nn){if(_e){if(i>.01){const c=t.z,l=-t.x,h=V0*(e?W0:1),u=Math.max(.2,Math.abs(c));Di+=l*X0*u*s,Mc.set(Math.sin(Di),0,Math.cos(Di)),vc.copy(Mc).multiplyScalar(h*c*s),_e.position.add(vc),_e.rotation.y=Di}_e.userData.carInstance&&_e.userData.carInstance.updateSmoke(s,i)}}else if(i>.01){const c=new C;Oe.camera.getWorldDirection(c),c.y=0,c.normalize();const l=new C().crossVectors(c,G0).normalize(),h=new C().addScaledVector(l,t.x).addScaledVector(c,t.z);le.update(s,{x:h.x,z:h.z},{sprint:e,jump:n})}else le.update(s,{x:0,z:0},{sprint:e,jump:n});if(nn){if(_e){const c=Ne.resolveCarMovement(_e.position,Y0,_e);_e.position.x=c.x,_e.position.z=c.z}}else{const c=Ne.resolvePlayerMovement(le.object.position,.9);le.object.position.x=c.x,le.object.position.z=c.z}if(nn?Ne.closeAllParkedCarDoors(s):(Ne.updateDoors(s,le.object.position),Ne.updateParkedCarDoors(s,le.object.position,Js,Js+.6)),os.length>0)for(let c=os.length-1;c>=0;c-=1){const l=os[c];l.life+=s,l.mesh.position.addScaledVector(l.velocity,s);const h=1-Math.min(1,l.life/l.maxLife);l.mesh.scale.setScalar(1+(1-h)*.8);const u=l.mesh.material;u.opacity=.65*h,l.life>=l.maxLife&&(Oe.scene.remove(l.mesh),os.splice(c,1))}const o=[{label:"МТС SHOP",distance:11,text:"С вашей Кредитной картой доступен кешбэк до 20% на всю технику"},{label:"Магазин одежды",distance:11,text:"Вам доступна скидка 3% на одежду по вашей кредитной карте"},{label:"МЕДСИ",distance:11,text:"Кешбэк 10 процентов на любые процедуры"}];let r=null;if(!nn)for(const c of o){const l=Ne.getBuildingDoorPosition(c.label);if(!l)continue;if(Math.hypot(le.object.position.x-l.x,le.object.position.z-l.z)<=c.distance){r=c;break}}r?(Jn&&Jn!==r.label&&(Ks[Jn]=!1,Oi=null),Jn=r.label,!(Ks[r.label]===!0)&&Oi!==r.label&&(sn.showPromo(r.text),Oi=r.label)):Jn&&(Ks[Jn]=!1,Jn=null,Oi=null,sn.hidePromo()),cr.update(),nn&&_e?sn.updateMinimap({x:_e.position.x,z:_e.position.z,yaw:_e.rotation.y}):sn.updateMinimap({x:le.object.position.x,z:le.object.position.z,yaw:le.object.rotation.y})}});Oe.start();
