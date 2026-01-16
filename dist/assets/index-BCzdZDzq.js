var fl=Object.defineProperty;var pl=(s,t,e)=>t in s?fl(s,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):s[t]=e;var ot=(s,t,e)=>pl(s,typeof t!="symbol"?t+"":t,e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2010-2024 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Sr="164",fi={ROTATE:0,DOLLY:1,PAN:2},pi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},ml=0,zr=1,gl=2,Ec=1,bc=2,Sn=3,on=0,Ce=1,Ve=2,Hn=0,Bi=1,Or=2,Fr=3,Br=4,_l=5,ti=100,xl=101,vl=102,Ml=103,yl=104,Sl=200,wl=201,El=202,bl=203,hr=204,ur=205,Tl=206,Al=207,Cl=208,Pl=209,Rl=210,Ll=211,Il=212,Dl=213,Ul=214,Nl=0,zl=1,Ol=2,Qs=3,Fl=4,Bl=5,kl=6,Hl=7,Tc=0,Gl=1,Vl=2,Gn=0,Wl=1,Xl=2,Yl=3,Ac=4,ql=5,Zl=6,jl=7,Cc=300,Vi=301,Wi=302,dr=303,fr=304,lo=306,un=1e3,wn=1001,pr=1002,Ke=1003,Kl=1004,ys=1005,je=1006,Eo=1007,ni=1008,Vn=1009,Jl=1010,$l=1011,Pc=1012,Rc=1013,Xi=1014,Fn=1015,ho=1016,Lc=1017,Ic=1018,_s=1020,Ql=35902,th=1021,eh=1022,ln=1023,nh=1024,ih=1025,ki=1026,ds=1027,sh=1028,Dc=1029,oh=1030,Uc=1031,Nc=1033,bo=33776,To=33777,Ao=33778,Co=33779,kr=35840,Hr=35841,Gr=35842,Vr=35843,Wr=36196,Xr=37492,Yr=37496,qr=37808,Zr=37809,jr=37810,Kr=37811,Jr=37812,$r=37813,Qr=37814,ta=37815,ea=37816,na=37817,ia=37818,sa=37819,oa=37820,ra=37821,Po=36492,aa=36494,ca=36495,rh=36283,la=36284,ha=36285,ua=36286,ah=3200,ch=3201,zc=0,lh=1,zn="",ke="srgb",Wn="srgb-linear",wr="display-p3",uo="display-p3-linear",to="linear",ue="srgb",eo="rec709",no="p3",mi=7680,da=519,hh=512,uh=513,dh=514,Oc=515,fh=516,ph=517,mh=518,gh=519,fa=35044,pa="300 es",En=2e3,io=2001;class hi{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const Ie=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let ma=1234567;const as=Math.PI/180,fs=180/Math.PI;function ui(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ie[s&255]+Ie[s>>8&255]+Ie[s>>16&255]+Ie[s>>24&255]+"-"+Ie[t&255]+Ie[t>>8&255]+"-"+Ie[t>>16&15|64]+Ie[t>>24&255]+"-"+Ie[e&63|128]+Ie[e>>8&255]+"-"+Ie[e>>16&255]+Ie[e>>24&255]+Ie[n&255]+Ie[n>>8&255]+Ie[n>>16&255]+Ie[n>>24&255]).toLowerCase()}function ye(s,t,e){return Math.max(t,Math.min(e,s))}function Er(s,t){return(s%t+t)%t}function _h(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function xh(s,t,e){return s!==t?(e-s)/(t-s):0}function cs(s,t,e){return(1-e)*s+e*t}function vh(s,t,e,n){return cs(s,t,1-Math.exp(-e*n))}function Mh(s,t=1){return t-Math.abs(Er(s,t*2)-t)}function yh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Sh(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function wh(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Eh(s,t){return s+Math.random()*(t-s)}function bh(s){return s*(.5-Math.random())}function Th(s){s!==void 0&&(ma=s);let t=ma+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ah(s){return s*as}function Ch(s){return s*fs}function Ph(s){return(s&s-1)===0&&s!==0}function Rh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Lh(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ih(s,t,e,n,i){const o=Math.cos,r=Math.sin,a=o(e/2),c=r(e/2),l=o((t+n)/2),h=r((t+n)/2),u=o((t-n)/2),d=r((t-n)/2),f=o((n-t)/2),g=r((n-t)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Ui(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function Ue(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const fo={DEG2RAD:as,RAD2DEG:fs,generateUUID:ui,clamp:ye,euclideanModulo:Er,mapLinear:_h,inverseLerp:xh,lerp:cs,damp:vh,pingpong:Mh,smoothstep:yh,smootherstep:Sh,randInt:wh,randFloat:Eh,randFloatSpread:bh,seededRandom:Th,degToRad:Ah,radToDeg:Ch,isPowerOfTwo:Ph,ceilPowerOfTwo:Rh,floorPowerOfTwo:Lh,setQuaternionFromProperEuler:Ih,normalize:Ue,denormalize:Ui};class ht{constructor(t=0,e=0){ht.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,i,o,r,a,c,l){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l)}set(t,e,n,i,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],g=n[8],_=i[0],m=i[3],p=i[6],y=i[1],x=i[4],S=i[7],R=i[2],A=i[5],C=i[8];return o[0]=r*_+a*y+c*R,o[3]=r*m+a*x+c*A,o[6]=r*p+a*S+c*C,o[1]=l*_+h*y+u*R,o[4]=l*m+h*x+u*A,o[7]=l*p+h*S+u*C,o[2]=d*_+f*y+g*R,o[5]=d*m+f*x+g*A,o[8]=d*p+f*S+g*C,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*o*h+n*a*c+i*o*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*r-a*l,d=a*c-h*o,f=l*o-r*c,g=e*u+n*d+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const _=1/g;return t[0]=u*_,t[1]=(i*l-h*n)*_,t[2]=(a*n-i*r)*_,t[3]=d*_,t[4]=(h*e-i*c)*_,t[5]=(i*o-a*e)*_,t[6]=f*_,t[7]=(n*c-l*e)*_,t[8]=(r*e-n*o)*_,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Ro.makeScale(t,e)),this}rotate(t){return this.premultiply(Ro.makeRotation(-t)),this}translate(t,e){return this.premultiply(Ro.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Ro=new $t;function Fc(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function so(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Dh(){const s=so("canvas");return s.style.display="block",s}const ga={};function Uh(s){s in ga||(ga[s]=!0,console.warn(s))}const _a=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),xa=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Ss={[Wn]:{transfer:to,primaries:eo,toReference:s=>s,fromReference:s=>s},[ke]:{transfer:ue,primaries:eo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[uo]:{transfer:to,primaries:no,toReference:s=>s.applyMatrix3(xa),fromReference:s=>s.applyMatrix3(_a)},[wr]:{transfer:ue,primaries:no,toReference:s=>s.convertSRGBToLinear().applyMatrix3(xa),fromReference:s=>s.applyMatrix3(_a).convertLinearToSRGB()}},Nh=new Set([Wn,uo]),ce={enabled:!0,_workingColorSpace:Wn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Nh.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Ss[t].toReference,i=Ss[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Ss[s].primaries},getTransfer:function(s){return s===zn?to:Ss[s].transfer}};function Hi(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Lo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let gi;class zh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{gi===void 0&&(gi=so("canvas")),gi.width=t.width,gi.height=t.height;const n=gi.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=gi}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=so("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=Hi(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Hi(e[n]/255)*255):e[n]=Hi(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Oh=0;class Bc{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=ui(),this.data=t,this.dataReady=!0,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(Io(i[r].image)):o.push(Io(i[r]))}else o=Io(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function Io(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?zh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Fh=0;class Se extends hi{constructor(t=Se.DEFAULT_IMAGE,e=Se.DEFAULT_MAPPING,n=wn,i=wn,o=je,r=ni,a=ln,c=Vn,l=Se.DEFAULT_ANISOTROPY,h=zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=ui(),this.name="",this.source=new Bc(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new ht(0,0),this.repeat=new ht(1,1),this.center=new ht(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.pmremVersion=0}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==Cc)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case un:t.x=t.x-Math.floor(t.x);break;case wn:t.x=t.x<0?0:1;break;case pr:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case un:t.y=t.y-Math.floor(t.y);break;case wn:t.y=t.y<0?0:1;break;case pr:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(t){t===!0&&this.pmremVersion++}}Se.DEFAULT_IMAGE=null;Se.DEFAULT_MAPPING=Cc;Se.DEFAULT_ANISOTROPY=1;class me{constructor(t=0,e=0,n=0,i=1){me.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],g=c[9],_=c[2],m=c[6],p=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-_)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+_)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const x=(l+1)/2,S=(f+1)/2,R=(p+1)/2,A=(h+d)/4,C=(u+_)/4,D=(g+m)/4;return x>S&&x>R?x<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(x),i=A/n,o=C/n):S>R?S<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(S),n=A/i,o=D/i):R<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(R),n=C/o,i=D/o),this.set(n,i,o,e),this}let y=Math.sqrt((m-g)*(m-g)+(u-_)*(u-_)+(d-h)*(d-h));return Math.abs(y)<.001&&(y=1),this.x=(m-g)/y,this.y=(u-_)/y,this.z=(d-h)/y,this.w=Math.acos((l+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Bh extends hi{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new me(0,0,t,e),this.scissorTest=!1,this.viewport=new me(0,0,t,e);const i={width:t,height:e,depth:1};n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:je,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1},n);const o=new Se(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace);o.flipY=!1,o.generateMipmaps=n.generateMipmaps,o.internalFormat=n.internalFormat,this.textures=[];const r=n.count;for(let a=0;a<r;a++)this.textures[a]=o.clone(),this.textures[a].isRenderTargetTexture=!0;this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}get texture(){return this.textures[0]}set texture(t){this.textures[0]=t}setSize(t,e,n=1){if(this.width!==t||this.height!==e||this.depth!==n){this.width=t,this.height=e,this.depth=n;for(let i=0,o=this.textures.length;i<o;i++)this.textures[i].image.width=t,this.textures[i].image.height=e,this.textures[i].image.depth=n;this.dispose()}this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.textures.length=0;for(let n=0,i=t.textures.length;n<i;n++)this.textures[n]=t.textures[n].clone(),this.textures[n].isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Bc(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,this.resolveDepthBuffer=t.resolveDepthBuffer,this.resolveStencilBuffer=t.resolveStencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class ri extends Bh{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class kc extends Se{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class kh extends Se{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ke,this.minFilter=Ke,this.wrapR=wn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class ai{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=o[r+0],f=o[r+1],g=o[r+2],_=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=g,t[e+3]=_;return}if(u!==_||c!==d||l!==f||h!==g){let m=1-a;const p=c*d+l*f+h*g+u*_,y=p>=0?1:-1,x=1-p*p;if(x>Number.EPSILON){const R=Math.sqrt(x),A=Math.atan2(R,p*y);m=Math.sin(m*A)/R,a=Math.sin(a*A)/R}const S=a*y;if(c=c*m+d*S,l=l*m+f*S,h=h*m+g*S,u=u*m+_*S,m===1-a){const R=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=R,l*=R,h*=R,u*=R}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=o[r],d=o[r+1],f=o[r+2],g=o[r+3];return t[e]=a*g+h*u+c*f-l*d,t[e+1]=c*g+h*d+l*u-a*f,t[e+2]=l*g+h*f+a*d-c*u,t[e+3]=h*g-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(o/2),d=c(n/2),f=c(i/2),g=c(o/2);switch(r){case"XYZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u+d*f*g;break;case"YZX":this._x=d*h*u+l*f*g,this._y=l*f*u+d*h*g,this._z=l*h*g-d*f*u,this._w=l*h*u-d*f*g;break;case"XZY":this._x=d*h*u-l*f*g,this._y=l*f*u-d*h*g,this._z=l*h*g+d*f*u,this._w=l*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(o-l)*f,this._z=(r-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(o+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(o-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(r-i)/f,this._x=(o+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(ye(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+i*l-o*c,this._y=i*h+r*c+o*a-n*l,this._z=o*h+r*l+n*c-i*a,this._w=r*h-n*a-i*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=r*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=o*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=2*Math.PI*Math.random(),e=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),o=Math.sqrt(n);return this.set(i*Math.sin(t),i*Math.cos(t),o*Math.sin(e),o*Math.cos(e))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class P{constructor(t=0,e=0,n=0){P.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(va.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(va.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),h=2*(a*e-o*i),u=2*(o*n-r*e);return this.x=e+c*l+r*u-a*h,this.y=n+c*h+a*l-o*u,this.z=i+c*u+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-o*a,this.y=o*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Do.copy(this).projectOnVector(t),this.sub(Do)}reflect(t){return this.sub(Do.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(ye(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=Math.random()*Math.PI*2,e=Math.random()*2-1,n=Math.sqrt(1-e*e);return this.x=n*Math.cos(t),this.y=e,this.z=n*Math.sin(t),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Do=new P,va=new ai;class xs{constructor(t=new P(1/0,1/0,1/0),e=new P(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(tn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(tn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=tn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,tn):tn.fromBufferAttribute(o,r),tn.applyMatrix4(t.matrixWorld),this.expandByPoint(tn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),ws.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),ws.copy(n.boundingBox)),ws.applyMatrix4(t.matrixWorld),this.union(ws)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,tn),tn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter($i),Es.subVectors(this.max,$i),_i.subVectors(t.a,$i),xi.subVectors(t.b,$i),vi.subVectors(t.c,$i),An.subVectors(xi,_i),Cn.subVectors(vi,xi),Yn.subVectors(_i,vi);let e=[0,-An.z,An.y,0,-Cn.z,Cn.y,0,-Yn.z,Yn.y,An.z,0,-An.x,Cn.z,0,-Cn.x,Yn.z,0,-Yn.x,-An.y,An.x,0,-Cn.y,Cn.x,0,-Yn.y,Yn.x,0];return!Uo(e,_i,xi,vi,Es)||(e=[1,0,0,0,1,0,0,0,1],!Uo(e,_i,xi,vi,Es))?!1:(bs.crossVectors(An,Cn),e=[bs.x,bs.y,bs.z],Uo(e,_i,xi,vi,Es))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,tn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(tn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(_n[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),_n[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),_n[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),_n[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),_n[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),_n[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),_n[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),_n[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(_n),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const _n=[new P,new P,new P,new P,new P,new P,new P,new P],tn=new P,ws=new xs,_i=new P,xi=new P,vi=new P,An=new P,Cn=new P,Yn=new P,$i=new P,Es=new P,bs=new P,qn=new P;function Uo(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){qn.fromArray(s,o);const a=i.x*Math.abs(qn.x)+i.y*Math.abs(qn.y)+i.z*Math.abs(qn.z),c=t.dot(qn),l=e.dot(qn),h=n.dot(qn);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Hh=new xs,Qi=new P,No=new P;class po{constructor(t=new P,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Hh.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;Qi.subVectors(t,this.center);const e=Qi.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(Qi,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(No.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(Qi.copy(t.center).add(No)),this.expandByPoint(Qi.copy(t.center).sub(No))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const xn=new P,zo=new P,Ts=new P,Pn=new P,Oo=new P,As=new P,Fo=new P;class mo{constructor(t=new P,e=new P(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,xn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=xn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(xn.copy(this.origin).addScaledVector(this.direction,e),xn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){zo.copy(t).add(e).multiplyScalar(.5),Ts.copy(e).sub(t).normalize(),Pn.copy(this.origin).sub(zo);const o=t.distanceTo(e)*.5,r=-this.direction.dot(Ts),a=Pn.dot(this.direction),c=-Pn.dot(Ts),l=Pn.lengthSq(),h=Math.abs(1-r*r);let u,d,f,g;if(h>0)if(u=r*c-a,d=r*a-c,g=o*h,u>=0)if(d>=-g)if(d<=g){const _=1/h;u*=_,d*=_,f=u*(u+r*d+2*a)+d*(r*u+d+2*c)+l}else d=o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d=-o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-g?(u=Math.max(0,-(-r*o+a)),d=u>0?-o:Math.min(Math.max(-o,-c),o),f=-u*u+d*(d+2*c)+l):d<=g?(u=0,d=Math.min(Math.max(-o,-c),o),f=d*(d+2*c)+l):(u=Math.max(0,-(r*o+a)),d=u>0?o:Math.min(Math.max(-o,-c),o),f=-u*u+d*(d+2*c)+l);else d=r>0?-o:o,u=Math.max(0,-(r*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(zo).addScaledVector(Ts,d),f}intersectSphere(t,e){xn.subVectors(t.center,this.origin);const n=xn.dot(this.direction),i=xn.dot(xn)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(o=(t.min.y-d.y)*h,r=(t.max.y-d.y)*h):(o=(t.max.y-d.y)*h,r=(t.min.y-d.y)*h),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,xn)!==null}intersectTriangle(t,e,n,i,o){Oo.subVectors(e,t),As.subVectors(n,t),Fo.crossVectors(Oo,As);let r=this.direction.dot(Fo),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Pn.subVectors(this.origin,t);const c=a*this.direction.dot(As.crossVectors(Pn,As));if(c<0)return null;const l=a*this.direction.dot(Oo.cross(Pn));if(l<0||c+l>r)return null;const h=-a*Pn.dot(Fo);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class de{constructor(t,e,n,i,o,r,a,c,l,h,u,d,f,g,_,m){de.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l,h,u,d,f,g,_,m)}set(t,e,n,i,o,r,a,c,l,h,u,d,f,g,_,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=o,p[5]=r,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=_,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new de().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Mi.setFromMatrixColumn(t,0).length(),o=1/Mi.setFromMatrixColumn(t,1).length(),r=1/Mi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(o),u=Math.sin(o);if(t.order==="XYZ"){const d=r*h,f=r*u,g=a*h,_=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+g*l,e[5]=d-_*l,e[9]=-a*c,e[2]=_-d*l,e[6]=g+f*l,e[10]=r*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d+_*a,e[4]=g*a-f,e[8]=r*l,e[1]=r*u,e[5]=r*h,e[9]=-a,e[2]=f*a-g,e[6]=_+d*a,e[10]=r*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,g=l*h,_=l*u;e[0]=d-_*a,e[4]=-r*u,e[8]=g+f*a,e[1]=f+g*a,e[5]=r*h,e[9]=_-d*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const d=r*h,f=r*u,g=a*h,_=a*u;e[0]=c*h,e[4]=g*l-f,e[8]=d*l+_,e[1]=c*u,e[5]=_*l+d,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const d=r*c,f=r*l,g=a*c,_=a*l;e[0]=c*h,e[4]=_-d*u,e[8]=g*u+f,e[1]=u,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+g,e[10]=d-_*u}else if(t.order==="XZY"){const d=r*c,f=r*l,g=a*c,_=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+_,e[5]=r*h,e[9]=f*u-g,e[2]=g*u-f,e[6]=a*h,e[10]=_*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Gh,t,Vh)}lookAt(t,e,n){const i=this.elements;return Fe.subVectors(t,e),Fe.lengthSq()===0&&(Fe.z=1),Fe.normalize(),Rn.crossVectors(n,Fe),Rn.lengthSq()===0&&(Math.abs(n.z)===1?Fe.x+=1e-4:Fe.z+=1e-4,Fe.normalize(),Rn.crossVectors(n,Fe)),Rn.normalize(),Cs.crossVectors(Fe,Rn),i[0]=Rn.x,i[4]=Cs.x,i[8]=Fe.x,i[1]=Rn.y,i[5]=Cs.y,i[9]=Fe.y,i[2]=Rn.z,i[6]=Cs.z,i[10]=Fe.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],g=n[2],_=n[6],m=n[10],p=n[14],y=n[3],x=n[7],S=n[11],R=n[15],A=i[0],C=i[4],D=i[8],E=i[12],M=i[1],I=i[5],B=i[9],L=i[13],W=i[2],U=i[6],K=i[10],it=i[14],k=i[3],$=i[7],et=i[11],mt=i[15];return o[0]=r*A+a*M+c*W+l*k,o[4]=r*C+a*I+c*U+l*$,o[8]=r*D+a*B+c*K+l*et,o[12]=r*E+a*L+c*it+l*mt,o[1]=h*A+u*M+d*W+f*k,o[5]=h*C+u*I+d*U+f*$,o[9]=h*D+u*B+d*K+f*et,o[13]=h*E+u*L+d*it+f*mt,o[2]=g*A+_*M+m*W+p*k,o[6]=g*C+_*I+m*U+p*$,o[10]=g*D+_*B+m*K+p*et,o[14]=g*E+_*L+m*it+p*mt,o[3]=y*A+x*M+S*W+R*k,o[7]=y*C+x*I+S*U+R*$,o[11]=y*D+x*B+S*K+R*et,o[15]=y*E+x*L+S*it+R*mt,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],g=t[3],_=t[7],m=t[11],p=t[15];return g*(+o*c*u-i*l*u-o*a*d+n*l*d+i*a*f-n*c*f)+_*(+e*c*f-e*l*d+o*r*d-i*r*f+i*l*h-o*c*h)+m*(+e*l*u-e*a*f-o*r*u+n*r*f+o*a*h-n*l*h)+p*(-i*a*h-e*c*u+e*a*d+i*r*u-n*r*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],g=t[12],_=t[13],m=t[14],p=t[15],y=u*m*l-_*d*l+_*c*f-a*m*f-u*c*p+a*d*p,x=g*d*l-h*m*l-g*c*f+r*m*f+h*c*p-r*d*p,S=h*_*l-g*u*l+g*a*f-r*_*f-h*a*p+r*u*p,R=g*u*c-h*_*c-g*a*d+r*_*d+h*a*m-r*u*m,A=e*y+n*x+i*S+o*R;if(A===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const C=1/A;return t[0]=y*C,t[1]=(_*d*o-u*m*o-_*i*f+n*m*f+u*i*p-n*d*p)*C,t[2]=(a*m*o-_*c*o+_*i*l-n*m*l-a*i*p+n*c*p)*C,t[3]=(u*c*o-a*d*o-u*i*l+n*d*l+a*i*f-n*c*f)*C,t[4]=x*C,t[5]=(h*m*o-g*d*o+g*i*f-e*m*f-h*i*p+e*d*p)*C,t[6]=(g*c*o-r*m*o-g*i*l+e*m*l+r*i*p-e*c*p)*C,t[7]=(r*d*o-h*c*o+h*i*l-e*d*l-r*i*f+e*c*f)*C,t[8]=S*C,t[9]=(g*u*o-h*_*o-g*n*f+e*_*f+h*n*p-e*u*p)*C,t[10]=(r*_*o-g*a*o+g*n*l-e*_*l-r*n*p+e*a*p)*C,t[11]=(h*a*o-r*u*o-h*n*l+e*u*l+r*n*f-e*a*f)*C,t[12]=R*C,t[13]=(h*_*i-g*u*i+g*n*d-e*_*d-h*n*m+e*u*m)*C,t[14]=(g*a*i-r*_*i-g*n*c+e*_*c+r*n*m-e*a*m)*C,t[15]=(r*u*i-h*a*i+h*n*c-e*u*c-r*n*d+e*a*d)*C,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*r,0,l*c-i*a,h*c+i*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,u=a+a,d=o*l,f=o*h,g=o*u,_=r*h,m=r*u,p=a*u,y=c*l,x=c*h,S=c*u,R=n.x,A=n.y,C=n.z;return i[0]=(1-(_+p))*R,i[1]=(f+S)*R,i[2]=(g-x)*R,i[3]=0,i[4]=(f-S)*A,i[5]=(1-(d+p))*A,i[6]=(m+y)*A,i[7]=0,i[8]=(g+x)*C,i[9]=(m-y)*C,i[10]=(1-(d+_))*C,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=Mi.set(i[0],i[1],i[2]).length();const r=Mi.set(i[4],i[5],i[6]).length(),a=Mi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],en.copy(this);const l=1/o,h=1/r,u=1/a;return en.elements[0]*=l,en.elements[1]*=l,en.elements[2]*=l,en.elements[4]*=h,en.elements[5]*=h,en.elements[6]*=h,en.elements[8]*=u,en.elements[9]*=u,en.elements[10]*=u,e.setFromRotationMatrix(en),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=En){const c=this.elements,l=2*o/(e-t),h=2*o/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,g;if(a===En)f=-(r+o)/(r-o),g=-2*r*o/(r-o);else if(a===io)f=-r/(r-o),g=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=En){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(r-o),d=(e+t)*l,f=(n+i)*h;let g,_;if(a===En)g=(r+o)*u,_=-2*u;else if(a===io)g=o*u,_=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=_,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Mi=new P,en=new de,Gh=new P(0,0,0),Vh=new P(1,1,1),Rn=new P,Cs=new P,Fe=new P,Ma=new de,ya=new ai;class dn{constructor(t=0,e=0,n=0,i=dn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(ye(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-ye(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,o),this._z=0);break;case"ZXY":this._x=Math.asin(ye(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-ye(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(ye(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-ye(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ma.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ma,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return ya.setFromEuler(this),this.setFromQuaternion(ya,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}dn.DEFAULT_ORDER="XYZ";class br{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Wh=0;const Sa=new P,yi=new ai,vn=new de,Ps=new P,ts=new P,Xh=new P,Yh=new ai,wa=new P(1,0,0),Ea=new P(0,1,0),ba=new P(0,0,1),Ta={type:"added"},qh={type:"removed"},Si={type:"childadded",child:null},Bo={type:"childremoved",child:null};class Pe extends hi{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Wh++}),this.uuid=ui(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Pe.DEFAULT_UP.clone();const t=new P,e=new dn,n=new ai,i=new P(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new de},normalMatrix:{value:new $t}}),this.matrix=new de,this.matrixWorld=new de,this.matrixAutoUpdate=Pe.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new br,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return yi.setFromAxisAngle(t,e),this.quaternion.multiply(yi),this}rotateOnWorldAxis(t,e){return yi.setFromAxisAngle(t,e),this.quaternion.premultiply(yi),this}rotateX(t){return this.rotateOnAxis(wa,t)}rotateY(t){return this.rotateOnAxis(Ea,t)}rotateZ(t){return this.rotateOnAxis(ba,t)}translateOnAxis(t,e){return Sa.copy(t).applyQuaternion(this.quaternion),this.position.add(Sa.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(wa,t)}translateY(t){return this.translateOnAxis(Ea,t)}translateZ(t){return this.translateOnAxis(ba,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(vn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?Ps.copy(t):Ps.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ts.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?vn.lookAt(ts,Ps,this.up):vn.lookAt(Ps,ts,this.up),this.quaternion.setFromRotationMatrix(vn),i&&(vn.extractRotation(i.matrixWorld),yi.setFromRotationMatrix(vn),this.quaternion.premultiply(yi.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.removeFromParent(),t.parent=this,this.children.push(t),t.dispatchEvent(Ta),Si.child=t,this.dispatchEvent(Si),Si.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(qh),Bo.child=t,this.dispatchEvent(Bo),Bo.child=null),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),vn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),vn.multiply(t.parent.matrixWorld)),t.applyMatrix4(vn),t.removeFromParent(),t.parent=this,this.children.push(t),t.updateWorldMatrix(!1,!0),t.dispatchEvent(Ta),Si.child=t,this.dispatchEvent(Si),Si.child=null,this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,t,Xh),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ts,Yh,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++){const a=i[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];o(t.shapes,u)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),u=r(t.shapes),d=r(t.skeletons),f=r(t.animations),g=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Pe.DEFAULT_UP=new P(0,1,0);Pe.DEFAULT_MATRIX_AUTO_UPDATE=!0;Pe.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const nn=new P,Mn=new P,ko=new P,yn=new P,wi=new P,Ei=new P,Aa=new P,Ho=new P,Go=new P,Vo=new P;class cn{constructor(t=new P,e=new P,n=new P){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),nn.subVectors(t,e),i.cross(nn);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){nn.subVectors(i,e),Mn.subVectors(n,e),ko.subVectors(t,e);const r=nn.dot(nn),a=nn.dot(Mn),c=nn.dot(ko),l=Mn.dot(Mn),h=Mn.dot(ko),u=r*l-a*a;if(u===0)return o.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,g=(r*h-a*c)*d;return o.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,yn)===null?!1:yn.x>=0&&yn.y>=0&&yn.x+yn.y<=1}static getInterpolation(t,e,n,i,o,r,a,c){return this.getBarycoord(t,e,n,i,yn)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,yn.x),c.addScaledVector(r,yn.y),c.addScaledVector(a,yn.z),c)}static isFrontFacing(t,e,n,i){return nn.subVectors(n,e),Mn.subVectors(t,e),nn.cross(Mn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return nn.subVectors(this.c,this.b),Mn.subVectors(this.a,this.b),nn.cross(Mn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return cn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return cn.getBarycoord(t,this.a,this.b,this.c,e)}getInterpolation(t,e,n,i,o){return cn.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return cn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return cn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;wi.subVectors(i,n),Ei.subVectors(o,n),Ho.subVectors(t,n);const c=wi.dot(Ho),l=Ei.dot(Ho);if(c<=0&&l<=0)return e.copy(n);Go.subVectors(t,i);const h=wi.dot(Go),u=Ei.dot(Go);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(wi,r);Vo.subVectors(t,o);const f=wi.dot(Vo),g=Ei.dot(Vo);if(g>=0&&f<=g)return e.copy(o);const _=f*l-c*g;if(_<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Ei,a);const m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Aa.subVectors(o,i),a=(u-h)/(u-h+(f-g)),e.copy(i).addScaledVector(Aa,a);const p=1/(m+_+d);return r=_*p,a=d*p,e.copy(n).addScaledVector(wi,r).addScaledVector(Ei,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Hc={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Ln={h:0,s:0,l:0},Rs={h:0,s:0,l:0};function Wo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class jt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=ke){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,ce.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=ce.workingColorSpace){return this.r=t,this.g=e,this.b=n,ce.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=ce.workingColorSpace){if(t=Er(t,1),e=ye(e,0,1),n=ye(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=Wo(r,o,t+1/3),this.g=Wo(r,o,t),this.b=Wo(r,o,t-1/3)}return ce.toWorkingColorSpace(this,i),this}setStyle(t,e=ke){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=ke){const n=Hc[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Hi(t.r),this.g=Hi(t.g),this.b=Hi(t.b),this}copyLinearToSRGB(t){return this.r=Lo(t.r),this.g=Lo(t.g),this.b=Lo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=ke){return ce.fromWorkingColorSpace(De.copy(this),t),Math.round(ye(De.r*255,0,255))*65536+Math.round(ye(De.g*255,0,255))*256+Math.round(ye(De.b*255,0,255))}getHexString(t=ke){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=ce.workingColorSpace){ce.fromWorkingColorSpace(De.copy(this),e);const n=De.r,i=De.g,o=De.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const u=r-a;switch(l=h<=.5?u/(r+a):u/(2-r-a),r){case n:c=(i-o)/u+(i<o?6:0);break;case i:c=(o-n)/u+2;break;case o:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=ce.workingColorSpace){return ce.fromWorkingColorSpace(De.copy(this),e),t.r=De.r,t.g=De.g,t.b=De.b,t}getStyle(t=ke){ce.fromWorkingColorSpace(De.copy(this),t);const e=De.r,n=De.g,i=De.b;return t!==ke?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Ln),this.setHSL(Ln.h+t,Ln.s+e,Ln.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Ln),t.getHSL(Rs);const n=cs(Ln.h,Rs.h,e),i=cs(Ln.s,Rs.s,e),o=cs(Ln.l,Rs.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const De=new jt;jt.NAMES=Hc;let Zh=0;class Zi extends hi{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zh++}),this.uuid=ui(),this.name="",this.type="Material",this.blending=Bi,this.side=on,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=hr,this.blendDst=ur,this.blendEquation=ti,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new jt(0,0,0),this.blendAlpha=0,this.depthFunc=Qs,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=da,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=mi,this.stencilZFail=mi,this.stencilZPass=mi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Bi&&(n.blending=this.blending),this.side!==on&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==hr&&(n.blendSrc=this.blendSrc),this.blendDst!==ur&&(n.blendDst=this.blendDst),this.blendEquation!==ti&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==Qs&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==da&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==mi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==mi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==mi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}}class He extends Zi{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new jt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.combine=Tc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const ve=new P,Ls=new ht;class hn{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=fa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Fn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return Uh("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)Ls.fromBufferAttribute(this,e),Ls.applyMatrix3(t),this.setXY(e,Ls.x,Ls.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix3(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyMatrix4(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.applyNormalMatrix(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)ve.fromBufferAttribute(this,e),ve.transformDirection(t),this.setXYZ(e,ve.x,ve.y,ve.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Ui(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=Ue(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Ui(e,this.array)),e}setX(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Ui(e,this.array)),e}setY(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Ui(e,this.array)),e}setZ(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Ui(e,this.array)),e}setW(t,e){return this.normalized&&(e=Ue(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),i=Ue(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=Ue(e,this.array),n=Ue(n,this.array),i=Ue(i,this.array),o=Ue(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==fa&&(t.usage=this.usage),t}}class Gc extends hn{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Vc extends hn{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class oe extends hn{constructor(t,e,n){super(new Float32Array(t),e,n)}}let jh=0;const qe=new de,Xo=new Pe,bi=new P,Be=new xs,es=new xs,Te=new P;class ge extends hi{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=ui(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Fc(t)?Vc:Gc)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new $t().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return qe.makeRotationFromQuaternion(t),this.applyMatrix4(qe),this}rotateX(t){return qe.makeRotationX(t),this.applyMatrix4(qe),this}rotateY(t){return qe.makeRotationY(t),this.applyMatrix4(qe),this}rotateZ(t){return qe.makeRotationZ(t),this.applyMatrix4(qe),this}translate(t,e,n){return qe.makeTranslation(t,e,n),this.applyMatrix4(qe),this}scale(t,e,n){return qe.makeScale(t,e,n),this.applyMatrix4(qe),this}lookAt(t){return Xo.lookAt(t),Xo.updateMatrix(),this.applyMatrix4(Xo.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(bi).negate(),this.translate(bi.x,bi.y,bi.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new oe(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new xs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new P(-1/0,-1/0,-1/0),new P(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];Be.setFromBufferAttribute(o),this.morphTargetsRelative?(Te.addVectors(this.boundingBox.min,Be.min),this.boundingBox.expandByPoint(Te),Te.addVectors(this.boundingBox.max,Be.max),this.boundingBox.expandByPoint(Te)):(this.boundingBox.expandByPoint(Be.min),this.boundingBox.expandByPoint(Be.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new po);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new P,1/0);return}if(t){const n=this.boundingSphere.center;if(Be.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];es.setFromBufferAttribute(a),this.morphTargetsRelative?(Te.addVectors(Be.min,es.min),Be.expandByPoint(Te),Te.addVectors(Be.max,es.max),Be.expandByPoint(Te)):(Be.expandByPoint(es.min),Be.expandByPoint(es.max))}Be.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)Te.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(Te));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Te.fromBufferAttribute(a,l),c&&(bi.fromBufferAttribute(t,l),Te.add(bi)),i=Math.max(i,n.distanceToSquared(Te))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=e.position,i=e.normal,o=e.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new hn(new Float32Array(4*n.count),4));const r=this.getAttribute("tangent"),a=[],c=[];for(let D=0;D<n.count;D++)a[D]=new P,c[D]=new P;const l=new P,h=new P,u=new P,d=new ht,f=new ht,g=new ht,_=new P,m=new P;function p(D,E,M){l.fromBufferAttribute(n,D),h.fromBufferAttribute(n,E),u.fromBufferAttribute(n,M),d.fromBufferAttribute(o,D),f.fromBufferAttribute(o,E),g.fromBufferAttribute(o,M),h.sub(l),u.sub(l),f.sub(d),g.sub(d);const I=1/(f.x*g.y-g.x*f.y);isFinite(I)&&(_.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(I),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(I),a[D].add(_),a[E].add(_),a[M].add(_),c[D].add(m),c[E].add(m),c[M].add(m))}let y=this.groups;y.length===0&&(y=[{start:0,count:t.count}]);for(let D=0,E=y.length;D<E;++D){const M=y[D],I=M.start,B=M.count;for(let L=I,W=I+B;L<W;L+=3)p(t.getX(L+0),t.getX(L+1),t.getX(L+2))}const x=new P,S=new P,R=new P,A=new P;function C(D){R.fromBufferAttribute(i,D),A.copy(R);const E=a[D];x.copy(E),x.sub(R.multiplyScalar(R.dot(E))).normalize(),S.crossVectors(A,E);const I=S.dot(c[D])<0?-1:1;r.setXYZW(D,x.x,x.y,x.z,I)}for(let D=0,E=y.length;D<E;++D){const M=y[D],I=M.start,B=M.count;for(let L=I,W=I+B;L<W;L+=3)C(t.getX(L+0)),C(t.getX(L+1)),C(t.getX(L+2))}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new hn(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new P,o=new P,r=new P,a=new P,c=new P,l=new P,h=new P,u=new P;if(t)for(let d=0,f=t.count;d<f;d+=3){const g=t.getX(d+0),_=t.getX(d+1),m=t.getX(d+2);i.fromBufferAttribute(e,g),o.fromBufferAttribute(e,_),r.fromBufferAttribute(e,m),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,_),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(_,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),o.fromBufferAttribute(e,d+1),r.fromBufferAttribute(e,d+2),h.subVectors(r,o),u.subVectors(i,o),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Te.fromBufferAttribute(t,e),Te.normalize(),t.setXYZ(e,Te.x,Te.y,Te.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,g=0;for(let _=0,m=c.length;_<m;_++){a.isInterleavedBufferAttribute?f=c[_]*a.data.stride+a.offset:f=c[_]*h;for(let p=0;p<h;p++)d[g++]=l[f++]}return new hn(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ge,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],u=o[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const u=r[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Ca=new de,Zn=new mo,Is=new po,Pa=new P,Ti=new P,Ai=new P,Ci=new P,Yo=new P,Ds=new P,Us=new ht,Ns=new ht,zs=new ht,Ra=new P,La=new P,Ia=new P,Os=new P,Fs=new P;class q extends Pe{constructor(t=new ge,e=new He){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){Ds.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],u=o[c];h!==0&&(Yo.fromBufferAttribute(u,t),r?Ds.addScaledVector(Yo,h):Ds.addScaledVector(Yo.sub(e),h))}e.add(Ds)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Is.copy(n.boundingSphere),Is.applyMatrix4(o),Zn.copy(t.ray).recast(t.near),!(Is.containsPoint(Zn.origin)===!1&&(Zn.intersectSphere(Is,Pa)===null||Zn.origin.distanceToSquared(Pa)>(t.far-t.near)**2))&&(Ca.copy(o).invert(),Zn.copy(t.ray).applyMatrix4(Ca),!(n.boundingBox!==null&&Zn.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,Zn)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,u=o.attributes.normal,d=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=r[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,R=x;S<R;S+=3){const A=a.getX(S),C=a.getX(S+1),D=a.getX(S+2);i=Bs(this,p,t,n,l,h,u,A,C,D),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(a.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=a.getX(m),x=a.getX(m+1),S=a.getX(m+2);i=Bs(this,r,t,n,l,h,u,y,x,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let g=0,_=d.length;g<_;g++){const m=d[g],p=r[m.materialIndex],y=Math.max(m.start,f.start),x=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let S=y,R=x;S<R;S+=3){const A=S,C=S+1,D=S+2;i=Bs(this,p,t,n,l,h,u,A,C,D),i&&(i.faceIndex=Math.floor(S/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),_=Math.min(c.count,f.start+f.count);for(let m=g,p=_;m<p;m+=3){const y=m,x=m+1,S=m+2;i=Bs(this,r,t,n,l,h,u,y,x,S),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Kh(s,t,e,n,i,o,r,a){let c;if(t.side===Ce?c=n.intersectTriangle(r,o,i,!0,a):c=n.intersectTriangle(i,o,r,t.side===on,a),c===null)return null;Fs.copy(a),Fs.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(Fs);return l<e.near||l>e.far?null:{distance:l,point:Fs.clone(),object:s}}function Bs(s,t,e,n,i,o,r,a,c,l){s.getVertexPosition(a,Ti),s.getVertexPosition(c,Ai),s.getVertexPosition(l,Ci);const h=Kh(s,t,e,n,Ti,Ai,Ci,Os);if(h){i&&(Us.fromBufferAttribute(i,a),Ns.fromBufferAttribute(i,c),zs.fromBufferAttribute(i,l),h.uv=cn.getInterpolation(Os,Ti,Ai,Ci,Us,Ns,zs,new ht)),o&&(Us.fromBufferAttribute(o,a),Ns.fromBufferAttribute(o,c),zs.fromBufferAttribute(o,l),h.uv1=cn.getInterpolation(Os,Ti,Ai,Ci,Us,Ns,zs,new ht)),r&&(Ra.fromBufferAttribute(r,a),La.fromBufferAttribute(r,c),Ia.fromBufferAttribute(r,l),h.normal=cn.getInterpolation(Os,Ti,Ai,Ci,Ra,La,Ia,new P),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new P,materialIndex:0};cn.getNormal(Ti,Ai,Ci,u.normal),h.face=u}return h}class ie extends ge{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],u=[];let d=0,f=0;g("z","y","x",-1,-1,n,e,t,r,o,0),g("z","y","x",1,-1,n,e,-t,r,o,1),g("x","z","y",1,1,t,n,e,i,r,2),g("x","z","y",1,-1,t,n,-e,i,r,3),g("x","y","z",1,-1,t,e,n,i,o,4),g("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(c),this.setAttribute("position",new oe(l,3)),this.setAttribute("normal",new oe(h,3)),this.setAttribute("uv",new oe(u,2));function g(_,m,p,y,x,S,R,A,C,D,E){const M=S/C,I=R/D,B=S/2,L=R/2,W=A/2,U=C+1,K=D+1;let it=0,k=0;const $=new P;for(let et=0;et<K;et++){const mt=et*I-L;for(let Lt=0;Lt<U;Lt++){const Nt=Lt*M-B;$[_]=Nt*y,$[m]=mt*x,$[p]=W,l.push($.x,$.y,$.z),$[_]=0,$[m]=0,$[p]=A>0?1:-1,h.push($.x,$.y,$.z),u.push(Lt/C),u.push(1-et/D),it+=1}}for(let et=0;et<D;et++)for(let mt=0;mt<C;mt++){const Lt=d+mt+U*et,Nt=d+mt+U*(et+1),j=d+(mt+1)+U*(et+1),ut=d+(mt+1)+U*et;c.push(Lt,Nt,ut),c.push(Nt,j,ut),k+=6}a.addGroup(f,k,E),f+=k,d+=it}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ie(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function Yi(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ne(s){const t={};for(let e=0;e<s.length;e++){const n=Yi(s[e]);for(const i in n)t[i]=n[i]}return t}function Jh(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Wc(s){const t=s.getRenderTarget();return t===null?s.outputColorSpace:t.isXRRenderTarget===!0?t.texture.colorSpace:ce.workingColorSpace}const $h={clone:Yi,merge:Ne};var Qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tu=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class bn extends Zi{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qh,this.fragmentShader=tu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=Yi(t.uniforms),this.uniformsGroups=Jh(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Xc extends Pe{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new de,this.projectionMatrix=new de,this.projectionMatrixInverse=new de,this.coordinateSystem=En}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const In=new P,Da=new ht,Ua=new ht;class Ge extends Xc{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=fs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(as*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return fs*2*Math.atan(Math.tan(as*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(t,e,n){In.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),e.set(In.x,In.y).multiplyScalar(-t/In.z),In.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(In.x,In.y).multiplyScalar(-t/In.z)}getViewSize(t,e){return this.getViewBounds(t,Da,Ua),e.subVectors(Ua,Da)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(as*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const Pi=-90,Ri=1;class eu extends Pe{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ge(Pi,Ri,t,e);i.layers=this.layers,this.add(i);const o=new Ge(Pi,Ri,t,e);o.layers=this.layers,this.add(o);const r=new Ge(Pi,Ri,t,e);r.layers=this.layers,this.add(r);const a=new Ge(Pi,Ri,t,e);a.layers=this.layers,this.add(a);const c=new Ge(Pi,Ri,t,e);c.layers=this.layers,this.add(c);const l=new Ge(Pi,Ri,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===En)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===io)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const _=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=_,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class Yc extends Se{constructor(t,e,n,i,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:Vi,super(t,e,n,i,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class nu extends ri{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];this.texture=new Yc(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new ie(5,5,5),o=new bn({name:"CubemapFromEquirect",uniforms:Yi(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ce,blending:Hn});o.uniforms.tEquirect.value=e;const r=new q(i,o),a=e.minFilter;return e.minFilter===ni&&(e.minFilter=je),new eu(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const qo=new P,iu=new P,su=new $t;class Nn{constructor(t=new P(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=qo.subVectors(n,e).cross(iu.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(qo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||su.getNormalMatrix(t),i=this.coplanarPoint(qo).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const jn=new po,ks=new P;class Tr{constructor(t=new Nn,e=new Nn,n=new Nn,i=new Nn,o=new Nn,r=new Nn){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=En){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],g=i[9],_=i[10],m=i[11],p=i[12],y=i[13],x=i[14],S=i[15];if(n[0].setComponents(c-o,d-l,m-f,S-p).normalize(),n[1].setComponents(c+o,d+l,m+f,S+p).normalize(),n[2].setComponents(c+r,d+h,m+g,S+y).normalize(),n[3].setComponents(c-r,d-h,m-g,S-y).normalize(),n[4].setComponents(c-a,d-u,m-_,S-x).normalize(),e===En)n[5].setComponents(c+a,d+u,m+_,S+x).normalize();else if(e===io)n[5].setComponents(a,u,_,x).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),jn.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),jn.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(jn)}intersectsSprite(t){return jn.center.set(0,0,0),jn.radius=.7071067811865476,jn.applyMatrix4(t.matrixWorld),this.intersectsSphere(jn)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(ks.x=i.normal.x>0?t.max.x:t.min.x,ks.y=i.normal.y>0?t.max.y:t.min.y,ks.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(ks)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function qc(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function ou(s){const t=new WeakMap;function e(a,c){const l=a.array,h=a.usage,u=l.byteLength,d=s.createBuffer();s.bindBuffer(c,d),s.bufferData(c,l,h),a.onUploadCallback();let f;if(l instanceof Float32Array)f=s.FLOAT;else if(l instanceof Uint16Array)a.isFloat16BufferAttribute?f=s.HALF_FLOAT:f=s.UNSIGNED_SHORT;else if(l instanceof Int16Array)f=s.SHORT;else if(l instanceof Uint32Array)f=s.UNSIGNED_INT;else if(l instanceof Int32Array)f=s.INT;else if(l instanceof Int8Array)f=s.BYTE;else if(l instanceof Uint8Array)f=s.UNSIGNED_BYTE;else if(l instanceof Uint8ClampedArray)f=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+l);return{buffer:d,type:f,bytesPerElement:l.BYTES_PER_ELEMENT,version:a.version,size:u}}function n(a,c,l){const h=c.array,u=c._updateRange,d=c.updateRanges;if(s.bindBuffer(l,a),u.count===-1&&d.length===0&&s.bufferSubData(l,0,h),d.length!==0){for(let f=0,g=d.length;f<g;f++){const _=d[f];s.bufferSubData(l,_.start*h.BYTES_PER_ELEMENT,h,_.start,_.count)}c.clearUpdateRanges()}u.count!==-1&&(s.bufferSubData(l,u.offset*h.BYTES_PER_ELEMENT,h,u.offset,u.count),u.count=-1),c.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),t.get(a)}function o(a){a.isInterleavedBufferAttribute&&(a=a.data);const c=t.get(a);c&&(s.deleteBuffer(c.buffer),t.delete(a))}function r(a,c){if(a.isGLBufferAttribute){const h=t.get(a);(!h||h.version<a.version)&&t.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}a.isInterleavedBufferAttribute&&(a=a.data);const l=t.get(a);if(l===void 0)t.set(a,e(a,c));else if(l.version<a.version){if(l.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(l.buffer,a,c),l.version=a.version}}return{get:i,remove:o,update:r}}class Me extends ge{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],g=[],_=[],m=[];for(let p=0;p<h;p++){const y=p*d-r;for(let x=0;x<l;x++){const S=x*u-o;g.push(S,-y,0),_.push(0,0,1),m.push(x/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let y=0;y<a;y++){const x=y+l*p,S=y+l*(p+1),R=y+1+l*(p+1),A=y+1+l*p;f.push(x,S,A),f.push(S,R,A)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Me(t.width,t.height,t.widthSegments,t.heightSegments)}}var ru=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,au=`#ifdef USE_ALPHAHASH
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
#endif`,cu=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,lu=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hu=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,uu=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,du=`#ifdef USE_AOMAP
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
#endif`,fu=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pu=`#ifdef USE_BATCHING
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
#endif`,mu=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,gu=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,_u=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xu=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,vu=`#ifdef USE_IRIDESCENCE
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
#endif`,Mu=`#ifdef USE_BUMPMAP
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
#endif`,yu=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Su=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wu=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Eu=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,bu=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tu=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Au=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cu=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Pu=`#define PI 3.141592653589793
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
} // validated`,Ru=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Lu=`vec3 transformedNormal = objectNormal;
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
#endif`,Iu=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Du=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Uu=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Nu=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,zu="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ou=`
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
}`,Fu=`#ifdef USE_ENVMAP
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
#endif`,Bu=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,ku=`#ifdef USE_ENVMAP
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
#endif`,Hu=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Gu=`#ifdef USE_ENVMAP
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
#endif`,Vu=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Wu=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xu=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Yu=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,qu=`#ifdef USE_GRADIENTMAP
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
}`,Zu=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,ju=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Ku=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Ju=`uniform bool receiveShadow;
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
#endif`,$u=`#ifdef USE_ENVMAP
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
#endif`,Qu=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,td=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,ed=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,nd=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,id=`PhysicalMaterial material;
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
#endif`,sd=`struct PhysicalMaterial {
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
}`,od=`
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
#endif`,rd=`#if defined( RE_IndirectDiffuse )
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
#endif`,ad=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cd=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,ld=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,hd=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,ud=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,dd=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,fd=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,pd=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,md=`#if defined( USE_POINTS_UV )
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
#endif`,gd=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,_d=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,xd=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[MORPHTARGETS_COUNT];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,vd=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Md=`#ifdef USE_MORPHNORMALS
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
#endif`,yd=`#ifdef USE_MORPHTARGETS
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
#endif`,Sd=`#ifdef USE_MORPHTARGETS
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
#endif`,wd=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,Ed=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,bd=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Td=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Ad=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cd=`#ifdef USE_NORMALMAP
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
#endif`,Pd=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Rd=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Ld=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Id=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dd=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Ud=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Nd=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,zd=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Od=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Fd=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bd=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,kd=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Hd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Gd=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Vd=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Wd=`float getShadowMask() {
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
}`,Xd=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Yd=`#ifdef USE_SKINNING
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
#endif`,qd=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Zd=`#ifdef USE_SKINNING
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
#endif`,jd=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Kd=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jd=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,$d=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Qd=`#ifdef USE_TRANSMISSION
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
#endif`,tf=`#ifdef USE_TRANSMISSION
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
#endif`,ef=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,nf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,sf=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,of=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const rf=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,af=`uniform sampler2D t2D;
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
}`,cf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,lf=`#ifdef ENVMAP_TYPE_CUBE
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
}`,hf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,uf=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,df=`#include <common>
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
}`,ff=`#if DEPTH_PACKING == 3200
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
}`,pf=`#define DISTANCE
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
}`,mf=`#define DISTANCE
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
}`,gf=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,_f=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xf=`uniform float scale;
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
}`,vf=`uniform vec3 diffuse;
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
}`,Mf=`#include <common>
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
}`,yf=`uniform vec3 diffuse;
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
}`,Sf=`#define LAMBERT
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
}`,wf=`#define LAMBERT
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
}`,Ef=`#define MATCAP
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
}`,bf=`#define MATCAP
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
}`,Tf=`#define NORMAL
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
}`,Af=`#define NORMAL
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
}`,Cf=`#define PHONG
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
}`,Pf=`#define PHONG
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
}`,Rf=`#define STANDARD
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
}`,Lf=`#define STANDARD
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
}`,If=`#define TOON
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
}`,Df=`#define TOON
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
}`,Uf=`uniform float size;
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
}`,Nf=`uniform vec3 diffuse;
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
}`,zf=`#include <common>
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
}`,Of=`uniform vec3 color;
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
}`,Ff=`uniform float rotation;
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
}`,Bf=`uniform vec3 diffuse;
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
}`,Jt={alphahash_fragment:ru,alphahash_pars_fragment:au,alphamap_fragment:cu,alphamap_pars_fragment:lu,alphatest_fragment:hu,alphatest_pars_fragment:uu,aomap_fragment:du,aomap_pars_fragment:fu,batching_pars_vertex:pu,batching_vertex:mu,begin_vertex:gu,beginnormal_vertex:_u,bsdfs:xu,iridescence_fragment:vu,bumpmap_pars_fragment:Mu,clipping_planes_fragment:yu,clipping_planes_pars_fragment:Su,clipping_planes_pars_vertex:wu,clipping_planes_vertex:Eu,color_fragment:bu,color_pars_fragment:Tu,color_pars_vertex:Au,color_vertex:Cu,common:Pu,cube_uv_reflection_fragment:Ru,defaultnormal_vertex:Lu,displacementmap_pars_vertex:Iu,displacementmap_vertex:Du,emissivemap_fragment:Uu,emissivemap_pars_fragment:Nu,colorspace_fragment:zu,colorspace_pars_fragment:Ou,envmap_fragment:Fu,envmap_common_pars_fragment:Bu,envmap_pars_fragment:ku,envmap_pars_vertex:Hu,envmap_physical_pars_fragment:$u,envmap_vertex:Gu,fog_vertex:Vu,fog_pars_vertex:Wu,fog_fragment:Xu,fog_pars_fragment:Yu,gradientmap_pars_fragment:qu,lightmap_pars_fragment:Zu,lights_lambert_fragment:ju,lights_lambert_pars_fragment:Ku,lights_pars_begin:Ju,lights_toon_fragment:Qu,lights_toon_pars_fragment:td,lights_phong_fragment:ed,lights_phong_pars_fragment:nd,lights_physical_fragment:id,lights_physical_pars_fragment:sd,lights_fragment_begin:od,lights_fragment_maps:rd,lights_fragment_end:ad,logdepthbuf_fragment:cd,logdepthbuf_pars_fragment:ld,logdepthbuf_pars_vertex:hd,logdepthbuf_vertex:ud,map_fragment:dd,map_pars_fragment:fd,map_particle_fragment:pd,map_particle_pars_fragment:md,metalnessmap_fragment:gd,metalnessmap_pars_fragment:_d,morphinstance_vertex:xd,morphcolor_vertex:vd,morphnormal_vertex:Md,morphtarget_pars_vertex:yd,morphtarget_vertex:Sd,normal_fragment_begin:wd,normal_fragment_maps:Ed,normal_pars_fragment:bd,normal_pars_vertex:Td,normal_vertex:Ad,normalmap_pars_fragment:Cd,clearcoat_normal_fragment_begin:Pd,clearcoat_normal_fragment_maps:Rd,clearcoat_pars_fragment:Ld,iridescence_pars_fragment:Id,opaque_fragment:Dd,packing:Ud,premultiplied_alpha_fragment:Nd,project_vertex:zd,dithering_fragment:Od,dithering_pars_fragment:Fd,roughnessmap_fragment:Bd,roughnessmap_pars_fragment:kd,shadowmap_pars_fragment:Hd,shadowmap_pars_vertex:Gd,shadowmap_vertex:Vd,shadowmask_pars_fragment:Wd,skinbase_vertex:Xd,skinning_pars_vertex:Yd,skinning_vertex:qd,skinnormal_vertex:Zd,specularmap_fragment:jd,specularmap_pars_fragment:Kd,tonemapping_fragment:Jd,tonemapping_pars_fragment:$d,transmission_fragment:Qd,transmission_pars_fragment:tf,uv_pars_fragment:ef,uv_pars_vertex:nf,uv_vertex:sf,worldpos_vertex:of,background_vert:rf,background_frag:af,backgroundCube_vert:cf,backgroundCube_frag:lf,cube_vert:hf,cube_frag:uf,depth_vert:df,depth_frag:ff,distanceRGBA_vert:pf,distanceRGBA_frag:mf,equirect_vert:gf,equirect_frag:_f,linedashed_vert:xf,linedashed_frag:vf,meshbasic_vert:Mf,meshbasic_frag:yf,meshlambert_vert:Sf,meshlambert_frag:wf,meshmatcap_vert:Ef,meshmatcap_frag:bf,meshnormal_vert:Tf,meshnormal_frag:Af,meshphong_vert:Cf,meshphong_frag:Pf,meshphysical_vert:Rf,meshphysical_frag:Lf,meshtoon_vert:If,meshtoon_frag:Df,points_vert:Uf,points_frag:Nf,shadow_vert:zf,shadow_frag:Of,sprite_vert:Ff,sprite_frag:Bf},At={common:{diffuse:{value:new jt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},envMapRotation:{value:new $t},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new ht(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new jt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new jt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new jt(16777215)},opacity:{value:1},center:{value:new ht(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},an={basic:{uniforms:Ne([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.fog]),vertexShader:Jt.meshbasic_vert,fragmentShader:Jt.meshbasic_frag},lambert:{uniforms:Ne([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new jt(0)}}]),vertexShader:Jt.meshlambert_vert,fragmentShader:Jt.meshlambert_frag},phong:{uniforms:Ne([At.common,At.specularmap,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.fog,At.lights,{emissive:{value:new jt(0)},specular:{value:new jt(1118481)},shininess:{value:30}}]),vertexShader:Jt.meshphong_vert,fragmentShader:Jt.meshphong_frag},standard:{uniforms:Ne([At.common,At.envmap,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.roughnessmap,At.metalnessmap,At.fog,At.lights,{emissive:{value:new jt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag},toon:{uniforms:Ne([At.common,At.aomap,At.lightmap,At.emissivemap,At.bumpmap,At.normalmap,At.displacementmap,At.gradientmap,At.fog,At.lights,{emissive:{value:new jt(0)}}]),vertexShader:Jt.meshtoon_vert,fragmentShader:Jt.meshtoon_frag},matcap:{uniforms:Ne([At.common,At.bumpmap,At.normalmap,At.displacementmap,At.fog,{matcap:{value:null}}]),vertexShader:Jt.meshmatcap_vert,fragmentShader:Jt.meshmatcap_frag},points:{uniforms:Ne([At.points,At.fog]),vertexShader:Jt.points_vert,fragmentShader:Jt.points_frag},dashed:{uniforms:Ne([At.common,At.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Jt.linedashed_vert,fragmentShader:Jt.linedashed_frag},depth:{uniforms:Ne([At.common,At.displacementmap]),vertexShader:Jt.depth_vert,fragmentShader:Jt.depth_frag},normal:{uniforms:Ne([At.common,At.bumpmap,At.normalmap,At.displacementmap,{opacity:{value:1}}]),vertexShader:Jt.meshnormal_vert,fragmentShader:Jt.meshnormal_frag},sprite:{uniforms:Ne([At.sprite,At.fog]),vertexShader:Jt.sprite_vert,fragmentShader:Jt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Jt.background_vert,fragmentShader:Jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new $t}},vertexShader:Jt.backgroundCube_vert,fragmentShader:Jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Jt.cube_vert,fragmentShader:Jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Jt.equirect_vert,fragmentShader:Jt.equirect_frag},distanceRGBA:{uniforms:Ne([At.common,At.displacementmap,{referencePosition:{value:new P},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Jt.distanceRGBA_vert,fragmentShader:Jt.distanceRGBA_frag},shadow:{uniforms:Ne([At.lights,At.fog,{color:{value:new jt(0)},opacity:{value:1}}]),vertexShader:Jt.shadow_vert,fragmentShader:Jt.shadow_frag}};an.physical={uniforms:Ne([an.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new ht(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new jt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new ht},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new jt(0)},specularColor:{value:new jt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new ht},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Jt.meshphysical_vert,fragmentShader:Jt.meshphysical_frag};const Hs={r:0,b:0,g:0},Kn=new dn,kf=new de;function Hf(s,t,e,n,i,o,r){const a=new jt(0);let c=o===!0?0:1,l,h,u=null,d=0,f=null;function g(y){let x=y.isScene===!0?y.background:null;return x&&x.isTexture&&(x=(y.backgroundBlurriness>0?e:t).get(x)),x}function _(y){let x=!1;const S=g(y);S===null?p(a,c):S&&S.isColor&&(p(S,1),x=!0);const R=s.xr.getEnvironmentBlendMode();R==="additive"?n.buffers.color.setClear(0,0,0,1,r):R==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil)}function m(y,x){const S=g(x);S&&(S.isCubeTexture||S.mapping===lo)?(h===void 0&&(h=new q(new ie(1,1,1),new bn({name:"BackgroundCubeMaterial",uniforms:Yi(an.backgroundCube.uniforms),vertexShader:an.backgroundCube.vertexShader,fragmentShader:an.backgroundCube.fragmentShader,side:Ce,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(R,A,C){this.matrixWorld.copyPosition(C.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),Kn.copy(x.backgroundRotation),Kn.x*=-1,Kn.y*=-1,Kn.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Kn.y*=-1,Kn.z*=-1),h.material.uniforms.envMap.value=S,h.material.uniforms.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=x.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(kf.makeRotationFromEuler(Kn)),h.material.toneMapped=ce.getTransfer(S.colorSpace)!==ue,(u!==S||d!==S.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),h.layers.enableAll(),y.unshift(h,h.geometry,h.material,0,0,null)):S&&S.isTexture&&(l===void 0&&(l=new q(new Me(2,2),new bn({name:"BackgroundMaterial",uniforms:Yi(an.background.uniforms),vertexShader:an.background.vertexShader,fragmentShader:an.background.fragmentShader,side:on,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=S,l.material.uniforms.backgroundIntensity.value=x.backgroundIntensity,l.material.toneMapped=ce.getTransfer(S.colorSpace)!==ue,S.matrixAutoUpdate===!0&&S.updateMatrix(),l.material.uniforms.uvTransform.value.copy(S.matrix),(u!==S||d!==S.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=S,d=S.version,f=s.toneMapping),l.layers.enableAll(),y.unshift(l,l.geometry,l.material,0,0,null))}function p(y,x){y.getRGB(Hs,Wc(s)),n.buffers.color.setClear(Hs.r,Hs.g,Hs.b,x,r)}return{getClearColor:function(){return a},setClearColor:function(y,x=1){a.set(y),c=x,p(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(y){c=y,p(a,c)},render:_,addToRenderList:m}}function Gf(s,t){const e=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=d(null);let o=i,r=!1;function a(M,I,B,L,W){let U=!1;const K=u(L,B,I);o!==K&&(o=K,l(o.object)),U=f(M,L,B,W),U&&g(M,L,B,W),W!==null&&t.update(W,s.ELEMENT_ARRAY_BUFFER),(U||r)&&(r=!1,S(M,I,B,L),W!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,t.get(W).buffer))}function c(){return s.createVertexArray()}function l(M){return s.bindVertexArray(M)}function h(M){return s.deleteVertexArray(M)}function u(M,I,B){const L=B.wireframe===!0;let W=n[M.id];W===void 0&&(W={},n[M.id]=W);let U=W[I.id];U===void 0&&(U={},W[I.id]=U);let K=U[L];return K===void 0&&(K=d(c()),U[L]=K),K}function d(M){const I=[],B=[],L=[];for(let W=0;W<e;W++)I[W]=0,B[W]=0,L[W]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:B,attributeDivisors:L,object:M,attributes:{},index:null}}function f(M,I,B,L){const W=o.attributes,U=I.attributes;let K=0;const it=B.getAttributes();for(const k in it)if(it[k].location>=0){const et=W[k];let mt=U[k];if(mt===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(mt=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(mt=M.instanceColor)),et===void 0||et.attribute!==mt||mt&&et.data!==mt.data)return!0;K++}return o.attributesNum!==K||o.index!==L}function g(M,I,B,L){const W={},U=I.attributes;let K=0;const it=B.getAttributes();for(const k in it)if(it[k].location>=0){let et=U[k];et===void 0&&(k==="instanceMatrix"&&M.instanceMatrix&&(et=M.instanceMatrix),k==="instanceColor"&&M.instanceColor&&(et=M.instanceColor));const mt={};mt.attribute=et,et&&et.data&&(mt.data=et.data),W[k]=mt,K++}o.attributes=W,o.attributesNum=K,o.index=L}function _(){const M=o.newAttributes;for(let I=0,B=M.length;I<B;I++)M[I]=0}function m(M){p(M,0)}function p(M,I){const B=o.newAttributes,L=o.enabledAttributes,W=o.attributeDivisors;B[M]=1,L[M]===0&&(s.enableVertexAttribArray(M),L[M]=1),W[M]!==I&&(s.vertexAttribDivisor(M,I),W[M]=I)}function y(){const M=o.newAttributes,I=o.enabledAttributes;for(let B=0,L=I.length;B<L;B++)I[B]!==M[B]&&(s.disableVertexAttribArray(B),I[B]=0)}function x(M,I,B,L,W,U,K){K===!0?s.vertexAttribIPointer(M,I,B,W,U):s.vertexAttribPointer(M,I,B,L,W,U)}function S(M,I,B,L){_();const W=L.attributes,U=B.getAttributes(),K=I.defaultAttributeValues;for(const it in U){const k=U[it];if(k.location>=0){let $=W[it];if($===void 0&&(it==="instanceMatrix"&&M.instanceMatrix&&($=M.instanceMatrix),it==="instanceColor"&&M.instanceColor&&($=M.instanceColor)),$!==void 0){const et=$.normalized,mt=$.itemSize,Lt=t.get($);if(Lt===void 0)continue;const Nt=Lt.buffer,j=Lt.type,ut=Lt.bytesPerElement,Et=j===s.INT||j===s.UNSIGNED_INT||$.gpuType===Rc;if($.isInterleavedBufferAttribute){const _t=$.data,Ft=_t.stride,zt=$.offset;if(_t.isInstancedInterleavedBuffer){for(let N=0;N<k.locationSize;N++)p(k.location+N,_t.meshPerAttribute);M.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let N=0;N<k.locationSize;N++)m(k.location+N);s.bindBuffer(s.ARRAY_BUFFER,Nt);for(let N=0;N<k.locationSize;N++)x(k.location+N,mt/k.locationSize,j,et,Ft*ut,(zt+mt/k.locationSize*N)*ut,Et)}else{if($.isInstancedBufferAttribute){for(let _t=0;_t<k.locationSize;_t++)p(k.location+_t,$.meshPerAttribute);M.isInstancedMesh!==!0&&L._maxInstanceCount===void 0&&(L._maxInstanceCount=$.meshPerAttribute*$.count)}else for(let _t=0;_t<k.locationSize;_t++)m(k.location+_t);s.bindBuffer(s.ARRAY_BUFFER,Nt);for(let _t=0;_t<k.locationSize;_t++)x(k.location+_t,mt/k.locationSize,j,et,mt*ut,mt/k.locationSize*_t*ut,Et)}}else if(K!==void 0){const et=K[it];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(k.location,et);break;case 3:s.vertexAttrib3fv(k.location,et);break;case 4:s.vertexAttrib4fv(k.location,et);break;default:s.vertexAttrib1fv(k.location,et)}}}}y()}function R(){D();for(const M in n){const I=n[M];for(const B in I){const L=I[B];for(const W in L)h(L[W].object),delete L[W];delete I[B]}delete n[M]}}function A(M){if(n[M.id]===void 0)return;const I=n[M.id];for(const B in I){const L=I[B];for(const W in L)h(L[W].object),delete L[W];delete I[B]}delete n[M.id]}function C(M){for(const I in n){const B=n[I];if(B[M.id]===void 0)continue;const L=B[M.id];for(const W in L)h(L[W].object),delete L[W];delete B[M.id]}}function D(){E(),r=!0,o!==i&&(o=i,l(o.object))}function E(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:D,resetDefaultState:E,dispose:R,releaseStatesOfGeometry:A,releaseStatesOfProgram:C,initAttributes:_,enableAttribute:m,disableUnusedAttributes:y}}function Vf(s,t,e){let n;function i(l){n=l}function o(l,h){s.drawArrays(n,l,h),e.update(h,n,1)}function r(l,h,u){u!==0&&(s.drawArraysInstanced(n,l,h,u),e.update(h,n,u))}function a(l,h,u){if(u===0)return;const d=t.get("WEBGL_multi_draw");if(d===null)for(let f=0;f<u;f++)this.render(l[f],h[f]);else{d.multiDrawArraysWEBGL(n,l,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];e.update(f,n,1)}}function c(l,h,u,d){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<l.length;g++)r(l[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(n,l,0,h,0,d,0,u);let g=0;for(let _=0;_<u;_++)g+=h[_];for(let _=0;_<d.length;_++)e.update(g,n,d[_])}}this.setMode=i,this.render=o,this.renderInstances=r,this.renderMultiDraw=a,this.renderMultiDrawInstances=c}function Wf(s,t,e,n){let i;function o(){if(i!==void 0)return i;if(t.has("EXT_texture_filter_anisotropic")===!0){const A=t.get("EXT_texture_filter_anisotropic");i=s.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function r(A){return!(A!==ln&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){const C=A===ho&&(t.has("EXT_color_buffer_half_float")||t.has("EXT_color_buffer_float"));return!(A!==Vn&&n.convert(A)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Fn&&!C)}function c(A){if(A==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let l=e.precision!==void 0?e.precision:"highp";const h=c(l);h!==l&&(console.warn("THREE.WebGLRenderer:",l,"not supported, using",h,"instead."),l=h);const u=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),g=s.getParameter(s.MAX_TEXTURE_SIZE),_=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),m=s.getParameter(s.MAX_VERTEX_ATTRIBS),p=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),y=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),S=f>0,R=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:o,getMaxPrecision:c,textureFormatReadable:r,textureTypeReadable:a,precision:l,logarithmicDepthBuffer:u,maxTextures:d,maxVertexTextures:f,maxTextureSize:g,maxCubemapSize:_,maxAttributes:m,maxVertexUniforms:p,maxVaryings:y,maxFragmentUniforms:x,vertexTextures:S,maxSamples:R}}function Xf(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new Nn,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const g=u.clippingPlanes,_=u.clipIntersection,m=u.clipShadows,p=s.get(u);if(!i||g===null||g.length===0||o&&!m)o?h(null):l();else{const y=o?0:n,x=y*4;let S=p.clippingState||null;c.value=S,S=h(g,d,x,f);for(let R=0;R!==x;++R)S[R]=e[R];p.clippingState=S,this.numIntersection=_?this.numPlanes:0,this.numPlanes+=y}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,g){const _=u!==null?u.length:0;let m=null;if(_!==0){if(m=c.value,g!==!0||m===null){const p=f+_*4,y=d.matrixWorldInverse;a.getNormalMatrix(y),(m===null||m.length<p)&&(m=new Float32Array(p));for(let x=0,S=f;x!==_;++x,S+=4)r.copy(u[x]).applyMatrix4(y,a),r.normal.toArray(m,S),m[S+3]=r.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=_,t.numIntersection=0,m}}function Yf(s){let t=new WeakMap;function e(r,a){return a===dr?r.mapping=Vi:a===fr&&(r.mapping=Wi),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===dr||a===fr)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new nu(c.height);return l.fromEquirectangularTexture(s,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class Zc extends Xc{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const zi=4,Na=[.125,.215,.35,.446,.526,.582],ei=20,Zo=new Zc,za=new jt;let jo=null,Ko=0,Jo=0,$o=!1;const Qn=(1+Math.sqrt(5))/2,Li=1/Qn,Oa=[new P(-Qn,Li,0),new P(Qn,Li,0),new P(-Li,0,Qn),new P(Li,0,Qn),new P(0,Qn,-Li),new P(0,Qn,Li),new P(-1,1,-1),new P(1,1,-1),new P(-1,1,1),new P(1,1,1)];class Fa{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){jo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ha(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=ka(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(jo,Ko,Jo),this._renderer.xr.enabled=$o,t.scissorTest=!1,Gs(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===Vi||t.mapping===Wi?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),jo=this._renderer.getRenderTarget(),Ko=this._renderer.getActiveCubeFace(),Jo=this._renderer.getActiveMipmapLevel(),$o=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:je,minFilter:je,generateMipmaps:!1,type:ho,format:ln,colorSpace:Wn,depthBuffer:!1},i=Ba(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Ba(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=qf(o)),this._blurMaterial=Zf(o,t,e)}return i}_compileMaterial(t){const e=new q(this._lodPlanes[0],t);this._renderer.compile(e,Zo)}_sceneToCubeUV(t,e,n,i){const a=new Ge(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(za),h.toneMapping=Gn,h.autoClear=!1;const f=new He({name:"PMREM.Background",side:Ce,depthWrite:!1,depthTest:!1}),g=new q(new ie,f);let _=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,_=!0):(f.color.copy(za),_=!0);for(let p=0;p<6;p++){const y=p%3;y===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):y===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const x=this._cubeSize;Gs(i,y*x,p>2?x:0,x,x),h.setRenderTarget(i),_&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===Vi||t.mapping===Wi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ha()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=ka());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new q(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;Gs(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,Zo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;const i=this._lodPlanes.length;for(let o=1;o<i;o++){const r=Math.sqrt(this._sigmas[o]*this._sigmas[o]-this._sigmas[o-1]*this._sigmas[o-1]),a=Oa[(i-o-1)%Oa.length];this._blur(t,o-1,o,r,a)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new q(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*ei-1),_=o/g,m=isFinite(o)?1+Math.floor(h*_):ei;m>ei&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${ei}`);const p=[];let y=0;for(let C=0;C<ei;++C){const D=C/_,E=Math.exp(-D*D/2);p.push(E),C===0?y+=E:C<m&&(y+=2*E)}for(let C=0;C<p.length;C++)p[C]=p[C]/y;d.envMap.value=t.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=r==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:x}=this;d.dTheta.value=g,d.mipInt.value=x-n;const S=this._sizeLods[i],R=3*S*(i>x-zi?i-x+zi:0),A=4*(this._cubeSize-S);Gs(e,R,A,3*S,2*S),c.setRenderTarget(e),c.render(u,Zo)}}function qf(s){const t=[],e=[],n=[];let i=s;const o=s-zi+1+Na.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let c=1/a;r>s-zi?c=Na[r-s+zi-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,_=3,m=2,p=1,y=new Float32Array(_*g*f),x=new Float32Array(m*g*f),S=new Float32Array(p*g*f);for(let A=0;A<f;A++){const C=A%3*2/3-1,D=A>2?0:-1,E=[C,D,0,C+2/3,D,0,C+2/3,D+1,0,C,D,0,C+2/3,D+1,0,C,D+1,0];y.set(E,_*g*A),x.set(d,m*g*A);const M=[A,A,A,A,A,A];S.set(M,p*g*A)}const R=new ge;R.setAttribute("position",new hn(y,_)),R.setAttribute("uv",new hn(x,m)),R.setAttribute("faceIndex",new hn(S,p)),t.push(R),i>zi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Ba(s,t,e){const n=new ri(s,t,e);return n.texture.mapping=lo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Gs(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function Zf(s,t,e){const n=new Float32Array(ei),i=new P(0,1,0);return new bn({name:"SphericalGaussianBlur",defines:{n:ei,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ar(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function ka(){return new bn({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ar(),fragmentShader:`

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
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Ha(){return new bn({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ar(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Hn,depthTest:!1,depthWrite:!1})}function Ar(){return`

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
	`}function jf(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===dr||c===fr,h=c===Vi||c===Wi;if(l||h){let u=t.get(a);const d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return e===null&&(e=new Fa(s)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),u.texture;if(u!==void 0)return u.texture;{const f=a.image;return l&&f&&f.height>0||h&&f&&i(f)?(e===null&&(e=new Fa(s)),u=l?e.fromEquirectangular(a):e.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,t.set(a,u),a.addEventListener("dispose",o),u.texture):null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function Kf(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(){e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance"),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture"),e("WEBGL_render_shared_exponent")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Jf(s,t,e,n){const i={},o=new WeakMap;function r(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const g in d.attributes)t.remove(d.attributes[g]);for(const g in d.morphAttributes){const _=d.morphAttributes[g];for(let m=0,p=_.length;m<p;m++)t.remove(_[m])}d.removeEventListener("dispose",r),delete i[d.id];const f=o.get(d);f&&(t.remove(f),o.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",r),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const g in d)t.update(d[g],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const g in f){const _=f[g];for(let m=0,p=_.length;m<p;m++)t.update(_[m],s.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,g=u.attributes.position;let _=0;if(f!==null){const y=f.array;_=f.version;for(let x=0,S=y.length;x<S;x+=3){const R=y[x+0],A=y[x+1],C=y[x+2];d.push(R,A,A,C,C,R)}}else if(g!==void 0){const y=g.array;_=g.version;for(let x=0,S=y.length/3-1;x<S;x+=3){const R=x+0,A=x+1,C=x+2;d.push(R,A,A,C,C,R)}}else return;const m=new(Fc(d)?Vc:Gc)(d,1);m.version=_;const p=o.get(u);p&&t.remove(p),o.set(u,m)}function h(u){const d=o.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return o.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function $f(s,t,e){let n;function i(d){n=d}let o,r;function a(d){o=d.type,r=d.bytesPerElement}function c(d,f){s.drawElements(n,f,o,d*r),e.update(f,n,1)}function l(d,f,g){g!==0&&(s.drawElementsInstanced(n,f,o,d*r,g),e.update(f,n,g))}function h(d,f,g){if(g===0)return;const _=t.get("WEBGL_multi_draw");if(_===null)for(let m=0;m<g;m++)this.render(d[m]/r,f[m]);else{_.multiDrawElementsWEBGL(n,f,0,o,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];e.update(m,n,1)}}function u(d,f,g,_){if(g===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)l(d[p]/r,f[p],_[p]);else{m.multiDrawElementsInstancedWEBGL(n,f,0,o,d,0,_,0,g);let p=0;for(let y=0;y<g;y++)p+=f[y];for(let y=0;y<_.length;y++)e.update(p,n,_[y])}}this.setMode=i,this.setIndex=a,this.render=c,this.renderInstances=l,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function Qf(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function tp(s,t,e){const n=new WeakMap,i=new me;function o(r,a,c){const l=r.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0;let d=n.get(a);if(d===void 0||d.count!==u){let M=function(){D.dispose(),n.delete(a),a.removeEventListener("dispose",M)};var f=M;d!==void 0&&d.texture.dispose();const g=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,m=a.morphAttributes.color!==void 0,p=a.morphAttributes.position||[],y=a.morphAttributes.normal||[],x=a.morphAttributes.color||[];let S=0;g===!0&&(S=1),_===!0&&(S=2),m===!0&&(S=3);let R=a.attributes.position.count*S,A=1;R>t.maxTextureSize&&(A=Math.ceil(R/t.maxTextureSize),R=t.maxTextureSize);const C=new Float32Array(R*A*4*u),D=new kc(C,R,A,u);D.type=Fn,D.needsUpdate=!0;const E=S*4;for(let I=0;I<u;I++){const B=p[I],L=y[I],W=x[I],U=R*A*4*I;for(let K=0;K<B.count;K++){const it=K*E;g===!0&&(i.fromBufferAttribute(B,K),C[U+it+0]=i.x,C[U+it+1]=i.y,C[U+it+2]=i.z,C[U+it+3]=0),_===!0&&(i.fromBufferAttribute(L,K),C[U+it+4]=i.x,C[U+it+5]=i.y,C[U+it+6]=i.z,C[U+it+7]=0),m===!0&&(i.fromBufferAttribute(W,K),C[U+it+8]=i.x,C[U+it+9]=i.y,C[U+it+10]=i.z,C[U+it+11]=W.itemSize===4?i.w:1)}}d={count:u,texture:D,size:new ht(R,A)},n.set(a,d),a.addEventListener("dispose",M)}if(r.isInstancedMesh===!0&&r.morphTexture!==null)c.getUniforms().setValue(s,"morphTexture",r.morphTexture,e);else{let g=0;for(let m=0;m<l.length;m++)g+=l[m];const _=a.morphTargetsRelative?1:1-g;c.getUniforms().setValue(s,"morphTargetBaseInfluence",_),c.getUniforms().setValue(s,"morphTargetInfluences",l)}c.getUniforms().setValue(s,"morphTargetsTexture",d.texture,e),c.getUniforms().setValue(s,"morphTargetsTextureSize",d.size)}return{update:o}}function ep(s,t,e,n){let i=new WeakMap;function o(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}class jc extends Se{constructor(t,e,n,i,o,r,a,c,l,h){if(h=h!==void 0?h:ki,h!==ki&&h!==ds)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===ki&&(n=Xi),n===void 0&&h===ds&&(n=_s),super(null,i,o,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ke,this.minFilter=c!==void 0?c:Ke,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Kc=new Se,Jc=new jc(1,1);Jc.compareFunction=Oc;const $c=new kc,Qc=new kh,tl=new Yc,Ga=[],Va=[],Wa=new Float32Array(16),Xa=new Float32Array(9),Ya=new Float32Array(4);function ji(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=Ga[i];if(o===void 0&&(o=new Float32Array(i),Ga[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function Ee(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function be(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function go(s,t){let e=Va[t];e===void 0&&(e=new Int32Array(t),Va[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function np(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ip(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2fv(this.addr,t),be(e,t)}}function sp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Ee(e,t))return;s.uniform3fv(this.addr,t),be(e,t)}}function op(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4fv(this.addr,t),be(e,t)}}function rp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Ya.set(n),s.uniformMatrix2fv(this.addr,!1,Ya),be(e,n)}}function ap(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Xa.set(n),s.uniformMatrix3fv(this.addr,!1,Xa),be(e,n)}}function cp(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Ee(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),be(e,t)}else{if(Ee(e,n))return;Wa.set(n),s.uniformMatrix4fv(this.addr,!1,Wa),be(e,n)}}function lp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function hp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2iv(this.addr,t),be(e,t)}}function up(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3iv(this.addr,t),be(e,t)}}function dp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4iv(this.addr,t),be(e,t)}}function fp(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function pp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Ee(e,t))return;s.uniform2uiv(this.addr,t),be(e,t)}}function mp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Ee(e,t))return;s.uniform3uiv(this.addr,t),be(e,t)}}function gp(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Ee(e,t))return;s.uniform4uiv(this.addr,t),be(e,t)}}function _p(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const o=this.type===s.SAMPLER_2D_SHADOW?Jc:Kc;e.setTexture2D(t||o,i)}function xp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Qc,i)}function vp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||tl,i)}function Mp(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||$c,i)}function yp(s){switch(s){case 5126:return np;case 35664:return ip;case 35665:return sp;case 35666:return op;case 35674:return rp;case 35675:return ap;case 35676:return cp;case 5124:case 35670:return lp;case 35667:case 35671:return hp;case 35668:case 35672:return up;case 35669:case 35673:return dp;case 5125:return fp;case 36294:return pp;case 36295:return mp;case 36296:return gp;case 35678:case 36198:case 36298:case 36306:case 35682:return _p;case 35679:case 36299:case 36307:return xp;case 35680:case 36300:case 36308:case 36293:return vp;case 36289:case 36303:case 36311:case 36292:return Mp}}function Sp(s,t){s.uniform1fv(this.addr,t)}function wp(s,t){const e=ji(t,this.size,2);s.uniform2fv(this.addr,e)}function Ep(s,t){const e=ji(t,this.size,3);s.uniform3fv(this.addr,e)}function bp(s,t){const e=ji(t,this.size,4);s.uniform4fv(this.addr,e)}function Tp(s,t){const e=ji(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ap(s,t){const e=ji(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Cp(s,t){const e=ji(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Pp(s,t){s.uniform1iv(this.addr,t)}function Rp(s,t){s.uniform2iv(this.addr,t)}function Lp(s,t){s.uniform3iv(this.addr,t)}function Ip(s,t){s.uniform4iv(this.addr,t)}function Dp(s,t){s.uniform1uiv(this.addr,t)}function Up(s,t){s.uniform2uiv(this.addr,t)}function Np(s,t){s.uniform3uiv(this.addr,t)}function zp(s,t){s.uniform4uiv(this.addr,t)}function Op(s,t,e){const n=this.cache,i=t.length,o=go(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||Kc,o[r])}function Fp(s,t,e){const n=this.cache,i=t.length,o=go(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Qc,o[r])}function Bp(s,t,e){const n=this.cache,i=t.length,o=go(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||tl,o[r])}function kp(s,t,e){const n=this.cache,i=t.length,o=go(e,i);Ee(n,o)||(s.uniform1iv(this.addr,o),be(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||$c,o[r])}function Hp(s){switch(s){case 5126:return Sp;case 35664:return wp;case 35665:return Ep;case 35666:return bp;case 35674:return Tp;case 35675:return Ap;case 35676:return Cp;case 5124:case 35670:return Pp;case 35667:case 35671:return Rp;case 35668:case 35672:return Lp;case 35669:case 35673:return Ip;case 5125:return Dp;case 36294:return Up;case 36295:return Np;case 36296:return zp;case 35678:case 36198:case 36298:case 36306:case 35682:return Op;case 35679:case 36299:case 36307:return Fp;case 35680:case 36300:case 36308:case 36293:return Bp;case 36289:case 36303:case 36311:case 36292:return kp}}class Gp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=yp(e.type)}}class Vp{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Hp(e.type)}}class Wp{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const Qo=/(\w+)(\])?(\[|\.)?/g;function qa(s,t){s.seq.push(t),s.map[t.id]=t}function Xp(s,t,e){const n=s.name,i=n.length;for(Qo.lastIndex=0;;){const o=Qo.exec(n),r=Qo.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){qa(e,l===void 0?new Gp(a,s,t):new Vp(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Wp(a),qa(e,u)),e=u}}}class Ks{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);Xp(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function Za(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Yp=37297;let qp=0;function Zp(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function jp(s){const t=ce.getPrimaries(ce.workingColorSpace),e=ce.getPrimaries(s);let n;switch(t===e?n="":t===no&&e===eo?n="LinearDisplayP3ToLinearSRGB":t===eo&&e===no&&(n="LinearSRGBToLinearDisplayP3"),s){case Wn:case uo:return[n,"LinearTransferOETF"];case ke:case wr:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function ja(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+Zp(s.getShaderSource(t),r)}else return i}function Kp(s,t){const e=jp(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Jp(s,t){let e;switch(t){case Wl:e="Linear";break;case Xl:e="Reinhard";break;case Yl:e="OptimizedCineon";break;case Ac:e="ACESFilmic";break;case Zl:e="AgX";break;case jl:e="Neutral";break;case ql:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function $p(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(os).join(`
`)}function Qp(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function tm(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function os(s){return s!==""}function Ka(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ja(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const em=/^[ \t]*#include +<([\w\d./]+)>/gm;function mr(s){return s.replace(em,im)}const nm=new Map;function im(s,t){let e=Jt[t];if(e===void 0){const n=nm.get(t);if(n!==void 0)e=Jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return mr(e)}const sm=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function $a(s){return s.replace(sm,om)}function om(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function Qa(s){let t=`precision ${s.precision} float;
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
#define LOW_PRECISION`),t}function rm(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Ec?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===bc?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Sn&&(t="SHADOWMAP_TYPE_VSM"),t}function am(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case Vi:case Wi:t="ENVMAP_TYPE_CUBE";break;case lo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function cm(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Wi:t="ENVMAP_MODE_REFRACTION";break}return t}function lm(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Tc:t="ENVMAP_BLENDING_MULTIPLY";break;case Gl:t="ENVMAP_BLENDING_MIX";break;case Vl:t="ENVMAP_BLENDING_ADD";break}return t}function hm(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function um(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=rm(e),l=am(e),h=cm(e),u=lm(e),d=hm(e),f=$p(e),g=Qp(o),_=i.createProgram();let m,p,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g].filter(os).join(`
`),p.length>0&&(p+=`
`)):(m=[Qa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.instancingMorph?"#define USE_INSTANCING_MORPH":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(os).join(`
`),p=[Qa(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,g,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.dispersion?"#define USE_DISPERSION":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==Gn?"#define TONE_MAPPING":"",e.toneMapping!==Gn?Jt.tonemapping_pars_fragment:"",e.toneMapping!==Gn?Jp("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Jt.colorspace_pars_fragment,Kp("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(os).join(`
`)),r=mr(r),r=Ka(r,e),r=Ja(r,e),a=mr(a),a=Ka(a,e),a=Ja(a,e),r=$a(r),a=$a(a),e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",e.glslVersion===pa?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===pa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const x=y+m+r,S=y+p+a,R=Za(i,i.VERTEX_SHADER,x),A=Za(i,i.FRAGMENT_SHADER,S);i.attachShader(_,R),i.attachShader(_,A),e.index0AttributeName!==void 0?i.bindAttribLocation(_,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(_,0,"position"),i.linkProgram(_);function C(I){if(s.debug.checkShaderErrors){const B=i.getProgramInfoLog(_).trim(),L=i.getShaderInfoLog(R).trim(),W=i.getShaderInfoLog(A).trim();let U=!0,K=!0;if(i.getProgramParameter(_,i.LINK_STATUS)===!1)if(U=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,_,R,A);else{const it=ja(i,R,"vertex"),k=ja(i,A,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(_,i.VALIDATE_STATUS)+`

Material Name: `+I.name+`
Material Type: `+I.type+`

Program Info Log: `+B+`
`+it+`
`+k)}else B!==""?console.warn("THREE.WebGLProgram: Program Info Log:",B):(L===""||W==="")&&(K=!1);K&&(I.diagnostics={runnable:U,programLog:B,vertexShader:{log:L,prefix:m},fragmentShader:{log:W,prefix:p}})}i.deleteShader(R),i.deleteShader(A),D=new Ks(i,_),E=tm(i,_)}let D;this.getUniforms=function(){return D===void 0&&C(this),D};let E;this.getAttributes=function(){return E===void 0&&C(this),E};let M=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return M===!1&&(M=i.getProgramParameter(_,Yp)),M},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(_),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=qp++,this.cacheKey=t,this.usedTimes=1,this.program=_,this.vertexShader=R,this.fragmentShader=A,this}let dm=0;class fm{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new pm(t),e.set(t,n)),n}}class pm{constructor(t){this.id=dm++,this.code=t,this.usedTimes=0}}function mm(s,t,e,n,i,o,r){const a=new br,c=new fm,l=new Set,h=[],u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function _(E){return l.add(E),E===0?"uv":`uv${E}`}function m(E,M,I,B,L){const W=B.fog,U=L.geometry,K=E.isMeshStandardMaterial?B.environment:null,it=(E.isMeshStandardMaterial?e:t).get(E.envMap||K),k=it&&it.mapping===lo?it.image.height:null,$=g[E.type];E.precision!==null&&(f=i.getMaxPrecision(E.precision),f!==E.precision&&console.warn("THREE.WebGLProgram.getParameters:",E.precision,"not supported, using",f,"instead."));const et=U.morphAttributes.position||U.morphAttributes.normal||U.morphAttributes.color,mt=et!==void 0?et.length:0;let Lt=0;U.morphAttributes.position!==void 0&&(Lt=1),U.morphAttributes.normal!==void 0&&(Lt=2),U.morphAttributes.color!==void 0&&(Lt=3);let Nt,j,ut,Et;if($){const Kt=an[$];Nt=Kt.vertexShader,j=Kt.fragmentShader}else Nt=E.vertexShader,j=E.fragmentShader,c.update(E),ut=c.getVertexShaderID(E),Et=c.getFragmentShaderID(E);const _t=s.getRenderTarget(),Ft=L.isInstancedMesh===!0,zt=L.isBatchedMesh===!0,N=!!E.map,Gt=!!E.matcap,Q=!!it,dt=!!E.aoMap,nt=!!E.lightMap,J=!!E.bumpMap,X=!!E.normalMap,at=!!E.displacementMap,yt=!!E.emissiveMap,T=!!E.metalnessMap,w=!!E.roughnessMap,F=E.anisotropy>0,Y=E.clearcoat>0,rt=E.dispersion>0,tt=E.iridescence>0,bt=E.sheen>0,gt=E.transmission>0,ct=F&&!!E.anisotropyMap,Pt=Y&&!!E.clearcoatMap,xt=Y&&!!E.clearcoatNormalMap,ft=Y&&!!E.clearcoatRoughnessMap,St=tt&&!!E.iridescenceMap,Tt=tt&&!!E.iridescenceThicknessMap,pt=bt&&!!E.sheenColorMap,Dt=bt&&!!E.sheenRoughnessMap,Vt=!!E.specularMap,Ot=!!E.specularColorMap,Wt=!!E.specularIntensityMap,v=gt&&!!E.transmissionMap,O=gt&&!!E.thicknessMap,H=!!E.gradientMap,lt=!!E.alphaMap,vt=E.alphaTest>0,Ht=!!E.alphaHash,Xt=!!E.extensions;let ne=Gn;E.toneMapped&&(_t===null||_t.isXRRenderTarget===!0)&&(ne=s.toneMapping);const le={shaderID:$,shaderType:E.type,shaderName:E.name,vertexShader:Nt,fragmentShader:j,defines:E.defines,customVertexShaderID:ut,customFragmentShaderID:Et,isRawShaderMaterial:E.isRawShaderMaterial===!0,glslVersion:E.glslVersion,precision:f,batching:zt,instancing:Ft,instancingColor:Ft&&L.instanceColor!==null,instancingMorph:Ft&&L.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:_t===null?s.outputColorSpace:_t.isXRRenderTarget===!0?_t.texture.colorSpace:Wn,alphaToCoverage:!!E.alphaToCoverage,map:N,matcap:Gt,envMap:Q,envMapMode:Q&&it.mapping,envMapCubeUVHeight:k,aoMap:dt,lightMap:nt,bumpMap:J,normalMap:X,displacementMap:d&&at,emissiveMap:yt,normalMapObjectSpace:X&&E.normalMapType===lh,normalMapTangentSpace:X&&E.normalMapType===zc,metalnessMap:T,roughnessMap:w,anisotropy:F,anisotropyMap:ct,clearcoat:Y,clearcoatMap:Pt,clearcoatNormalMap:xt,clearcoatRoughnessMap:ft,dispersion:rt,iridescence:tt,iridescenceMap:St,iridescenceThicknessMap:Tt,sheen:bt,sheenColorMap:pt,sheenRoughnessMap:Dt,specularMap:Vt,specularColorMap:Ot,specularIntensityMap:Wt,transmission:gt,transmissionMap:v,thicknessMap:O,gradientMap:H,opaque:E.transparent===!1&&E.blending===Bi&&E.alphaToCoverage===!1,alphaMap:lt,alphaTest:vt,alphaHash:Ht,combine:E.combine,mapUv:N&&_(E.map.channel),aoMapUv:dt&&_(E.aoMap.channel),lightMapUv:nt&&_(E.lightMap.channel),bumpMapUv:J&&_(E.bumpMap.channel),normalMapUv:X&&_(E.normalMap.channel),displacementMapUv:at&&_(E.displacementMap.channel),emissiveMapUv:yt&&_(E.emissiveMap.channel),metalnessMapUv:T&&_(E.metalnessMap.channel),roughnessMapUv:w&&_(E.roughnessMap.channel),anisotropyMapUv:ct&&_(E.anisotropyMap.channel),clearcoatMapUv:Pt&&_(E.clearcoatMap.channel),clearcoatNormalMapUv:xt&&_(E.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:ft&&_(E.clearcoatRoughnessMap.channel),iridescenceMapUv:St&&_(E.iridescenceMap.channel),iridescenceThicknessMapUv:Tt&&_(E.iridescenceThicknessMap.channel),sheenColorMapUv:pt&&_(E.sheenColorMap.channel),sheenRoughnessMapUv:Dt&&_(E.sheenRoughnessMap.channel),specularMapUv:Vt&&_(E.specularMap.channel),specularColorMapUv:Ot&&_(E.specularColorMap.channel),specularIntensityMapUv:Wt&&_(E.specularIntensityMap.channel),transmissionMapUv:v&&_(E.transmissionMap.channel),thicknessMapUv:O&&_(E.thicknessMap.channel),alphaMapUv:lt&&_(E.alphaMap.channel),vertexTangents:!!U.attributes.tangent&&(X||F),vertexColors:E.vertexColors,vertexAlphas:E.vertexColors===!0&&!!U.attributes.color&&U.attributes.color.itemSize===4,pointsUvs:L.isPoints===!0&&!!U.attributes.uv&&(N||lt),fog:!!W,useFog:E.fog===!0,fogExp2:!!W&&W.isFogExp2,flatShading:E.flatShading===!0,sizeAttenuation:E.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:L.isSkinnedMesh===!0,morphTargets:U.morphAttributes.position!==void 0,morphNormals:U.morphAttributes.normal!==void 0,morphColors:U.morphAttributes.color!==void 0,morphTargetsCount:mt,morphTextureStride:Lt,numDirLights:M.directional.length,numPointLights:M.point.length,numSpotLights:M.spot.length,numSpotLightMaps:M.spotLightMap.length,numRectAreaLights:M.rectArea.length,numHemiLights:M.hemi.length,numDirLightShadows:M.directionalShadowMap.length,numPointLightShadows:M.pointShadowMap.length,numSpotLightShadows:M.spotShadowMap.length,numSpotLightShadowsWithMaps:M.numSpotLightShadowsWithMaps,numLightProbes:M.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:E.dithering,shadowMapEnabled:s.shadowMap.enabled&&I.length>0,shadowMapType:s.shadowMap.type,toneMapping:ne,useLegacyLights:s._useLegacyLights,decodeVideoTexture:N&&E.map.isVideoTexture===!0&&ce.getTransfer(E.map.colorSpace)===ue,premultipliedAlpha:E.premultipliedAlpha,doubleSided:E.side===Ve,flipSided:E.side===Ce,useDepthPacking:E.depthPacking>=0,depthPacking:E.depthPacking||0,index0AttributeName:E.index0AttributeName,extensionClipCullDistance:Xt&&E.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:Xt&&E.extensions.multiDraw===!0&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:E.customProgramCacheKey()};return le.vertexUv1s=l.has(1),le.vertexUv2s=l.has(2),le.vertexUv3s=l.has(3),l.clear(),le}function p(E){const M=[];if(E.shaderID?M.push(E.shaderID):(M.push(E.customVertexShaderID),M.push(E.customFragmentShaderID)),E.defines!==void 0)for(const I in E.defines)M.push(I),M.push(E.defines[I]);return E.isRawShaderMaterial===!1&&(y(M,E),x(M,E),M.push(s.outputColorSpace)),M.push(E.customProgramCacheKey),M.join()}function y(E,M){E.push(M.precision),E.push(M.outputColorSpace),E.push(M.envMapMode),E.push(M.envMapCubeUVHeight),E.push(M.mapUv),E.push(M.alphaMapUv),E.push(M.lightMapUv),E.push(M.aoMapUv),E.push(M.bumpMapUv),E.push(M.normalMapUv),E.push(M.displacementMapUv),E.push(M.emissiveMapUv),E.push(M.metalnessMapUv),E.push(M.roughnessMapUv),E.push(M.anisotropyMapUv),E.push(M.clearcoatMapUv),E.push(M.clearcoatNormalMapUv),E.push(M.clearcoatRoughnessMapUv),E.push(M.iridescenceMapUv),E.push(M.iridescenceThicknessMapUv),E.push(M.sheenColorMapUv),E.push(M.sheenRoughnessMapUv),E.push(M.specularMapUv),E.push(M.specularColorMapUv),E.push(M.specularIntensityMapUv),E.push(M.transmissionMapUv),E.push(M.thicknessMapUv),E.push(M.combine),E.push(M.fogExp2),E.push(M.sizeAttenuation),E.push(M.morphTargetsCount),E.push(M.morphAttributeCount),E.push(M.numDirLights),E.push(M.numPointLights),E.push(M.numSpotLights),E.push(M.numSpotLightMaps),E.push(M.numHemiLights),E.push(M.numRectAreaLights),E.push(M.numDirLightShadows),E.push(M.numPointLightShadows),E.push(M.numSpotLightShadows),E.push(M.numSpotLightShadowsWithMaps),E.push(M.numLightProbes),E.push(M.shadowMapType),E.push(M.toneMapping),E.push(M.numClippingPlanes),E.push(M.numClipIntersection),E.push(M.depthPacking)}function x(E,M){a.disableAll(),M.supportsVertexTextures&&a.enable(0),M.instancing&&a.enable(1),M.instancingColor&&a.enable(2),M.instancingMorph&&a.enable(3),M.matcap&&a.enable(4),M.envMap&&a.enable(5),M.normalMapObjectSpace&&a.enable(6),M.normalMapTangentSpace&&a.enable(7),M.clearcoat&&a.enable(8),M.iridescence&&a.enable(9),M.alphaTest&&a.enable(10),M.vertexColors&&a.enable(11),M.vertexAlphas&&a.enable(12),M.vertexUv1s&&a.enable(13),M.vertexUv2s&&a.enable(14),M.vertexUv3s&&a.enable(15),M.vertexTangents&&a.enable(16),M.anisotropy&&a.enable(17),M.alphaHash&&a.enable(18),M.batching&&a.enable(19),M.dispersion&&a.enable(20),E.push(a.mask),a.disableAll(),M.fog&&a.enable(0),M.useFog&&a.enable(1),M.flatShading&&a.enable(2),M.logarithmicDepthBuffer&&a.enable(3),M.skinning&&a.enable(4),M.morphTargets&&a.enable(5),M.morphNormals&&a.enable(6),M.morphColors&&a.enable(7),M.premultipliedAlpha&&a.enable(8),M.shadowMapEnabled&&a.enable(9),M.useLegacyLights&&a.enable(10),M.doubleSided&&a.enable(11),M.flipSided&&a.enable(12),M.useDepthPacking&&a.enable(13),M.dithering&&a.enable(14),M.transmission&&a.enable(15),M.sheen&&a.enable(16),M.opaque&&a.enable(17),M.pointsUvs&&a.enable(18),M.decodeVideoTexture&&a.enable(19),M.alphaToCoverage&&a.enable(20),E.push(a.mask)}function S(E){const M=g[E.type];let I;if(M){const B=an[M];I=$h.clone(B.uniforms)}else I=E.uniforms;return I}function R(E,M){let I;for(let B=0,L=h.length;B<L;B++){const W=h[B];if(W.cacheKey===M){I=W,++I.usedTimes;break}}return I===void 0&&(I=new um(s,M,E,o),h.push(I)),I}function A(E){if(--E.usedTimes===0){const M=h.indexOf(E);h[M]=h[h.length-1],h.pop(),E.destroy()}}function C(E){c.remove(E)}function D(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:S,acquireProgram:R,releaseProgram:A,releaseShaderCache:C,programs:h,dispose:D}}function gm(){let s=new WeakMap;function t(o){let r=s.get(o);return r===void 0&&(r={},s.set(o,r)),r}function e(o){s.delete(o)}function n(o,r,a){s.get(o)[r]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function _m(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function tc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function ec(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(u,d,f,g,_,m){let p=s[t];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:_,group:m},s[t]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=_,p.group=m),t++,p}function a(u,d,f,g,_,m){const p=r(u,d,f,g,_,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(u,d,f,g,_,m){const p=r(u,d,f,g,_,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(u,d){e.length>1&&e.sort(u||_m),n.length>1&&n.sort(d||tc),i.length>1&&i.sort(d||tc)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:c,finish:h,sort:l}}function xm(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new ec,s.set(n,[r])):i>=o.length?(r=new ec,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function vm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new P,color:new jt};break;case"SpotLight":e={position:new P,direction:new P,color:new jt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new P,color:new jt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new P,skyColor:new jt,groundColor:new jt};break;case"RectAreaLight":e={color:new jt,position:new P,halfWidth:new P,halfHeight:new P};break}return s[t.id]=e,e}}}function Mm(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ht,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let ym=0;function Sm(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function wm(s){const t=new vm,e=Mm(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let l=0;l<9;l++)n.probe.push(new P);const i=new P,o=new de,r=new de;function a(l,h){let u=0,d=0,f=0;for(let I=0;I<9;I++)n.probe[I].set(0,0,0);let g=0,_=0,m=0,p=0,y=0,x=0,S=0,R=0,A=0,C=0,D=0;l.sort(Sm);const E=h===!0?Math.PI:1;for(let I=0,B=l.length;I<B;I++){const L=l[I],W=L.color,U=L.intensity,K=L.distance,it=L.shadow&&L.shadow.map?L.shadow.map.texture:null;if(L.isAmbientLight)u+=W.r*U*E,d+=W.g*U*E,f+=W.b*U*E;else if(L.isLightProbe){for(let k=0;k<9;k++)n.probe[k].addScaledVector(L.sh.coefficients[k],U);D++}else if(L.isDirectionalLight){const k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity*E),L.castShadow){const $=L.shadow,et=e.get(L);et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,n.directionalShadow[g]=et,n.directionalShadowMap[g]=it,n.directionalShadowMatrix[g]=L.shadow.matrix,x++}n.directional[g]=k,g++}else if(L.isSpotLight){const k=t.get(L);k.position.setFromMatrixPosition(L.matrixWorld),k.color.copy(W).multiplyScalar(U*E),k.distance=K,k.coneCos=Math.cos(L.angle),k.penumbraCos=Math.cos(L.angle*(1-L.penumbra)),k.decay=L.decay,n.spot[m]=k;const $=L.shadow;if(L.map&&(n.spotLightMap[A]=L.map,A++,$.updateMatrices(L),L.castShadow&&C++),n.spotLightMatrix[m]=$.matrix,L.castShadow){const et=e.get(L);et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,n.spotShadow[m]=et,n.spotShadowMap[m]=it,R++}m++}else if(L.isRectAreaLight){const k=t.get(L);k.color.copy(W).multiplyScalar(U),k.halfWidth.set(L.width*.5,0,0),k.halfHeight.set(0,L.height*.5,0),n.rectArea[p]=k,p++}else if(L.isPointLight){const k=t.get(L);if(k.color.copy(L.color).multiplyScalar(L.intensity*E),k.distance=L.distance,k.decay=L.decay,L.castShadow){const $=L.shadow,et=e.get(L);et.shadowBias=$.bias,et.shadowNormalBias=$.normalBias,et.shadowRadius=$.radius,et.shadowMapSize=$.mapSize,et.shadowCameraNear=$.camera.near,et.shadowCameraFar=$.camera.far,n.pointShadow[_]=et,n.pointShadowMap[_]=it,n.pointShadowMatrix[_]=L.shadow.matrix,S++}n.point[_]=k,_++}else if(L.isHemisphereLight){const k=t.get(L);k.skyColor.copy(L.color).multiplyScalar(U*E),k.groundColor.copy(L.groundColor).multiplyScalar(U*E),n.hemi[y]=k,y++}}p>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=At.LTC_FLOAT_1,n.rectAreaLTC2=At.LTC_FLOAT_2):(n.rectAreaLTC1=At.LTC_HALF_1,n.rectAreaLTC2=At.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=f;const M=n.hash;(M.directionalLength!==g||M.pointLength!==_||M.spotLength!==m||M.rectAreaLength!==p||M.hemiLength!==y||M.numDirectionalShadows!==x||M.numPointShadows!==S||M.numSpotShadows!==R||M.numSpotMaps!==A||M.numLightProbes!==D)&&(n.directional.length=g,n.spot.length=m,n.rectArea.length=p,n.point.length=_,n.hemi.length=y,n.directionalShadow.length=x,n.directionalShadowMap.length=x,n.pointShadow.length=S,n.pointShadowMap.length=S,n.spotShadow.length=R,n.spotShadowMap.length=R,n.directionalShadowMatrix.length=x,n.pointShadowMatrix.length=S,n.spotLightMatrix.length=R+A-C,n.spotLightMap.length=A,n.numSpotLightShadowsWithMaps=C,n.numLightProbes=D,M.directionalLength=g,M.pointLength=_,M.spotLength=m,M.rectAreaLength=p,M.hemiLength=y,M.numDirectionalShadows=x,M.numPointShadows=S,M.numSpotShadows=R,M.numSpotMaps=A,M.numLightProbes=D,n.version=ym++)}function c(l,h){let u=0,d=0,f=0,g=0,_=0;const m=h.matrixWorldInverse;for(let p=0,y=l.length;p<y;p++){const x=l[p];if(x.isDirectionalLight){const S=n.directional[u];S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),u++}else if(x.isSpotLight){const S=n.spot[f];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),S.direction.setFromMatrixPosition(x.matrixWorld),i.setFromMatrixPosition(x.target.matrixWorld),S.direction.sub(i),S.direction.transformDirection(m),f++}else if(x.isRectAreaLight){const S=n.rectArea[g];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),r.identity(),o.copy(x.matrixWorld),o.premultiply(m),r.extractRotation(o),S.halfWidth.set(x.width*.5,0,0),S.halfHeight.set(0,x.height*.5,0),S.halfWidth.applyMatrix4(r),S.halfHeight.applyMatrix4(r),g++}else if(x.isPointLight){const S=n.point[d];S.position.setFromMatrixPosition(x.matrixWorld),S.position.applyMatrix4(m),d++}else if(x.isHemisphereLight){const S=n.hemi[_];S.direction.setFromMatrixPosition(x.matrixWorld),S.direction.transformDirection(m),_++}}}return{setup:a,setupView:c,state:n}}function nc(s){const t=new wm(s),e=[],n=[];function i(h){l.camera=h,e.length=0,n.length=0}function o(h){e.push(h)}function r(h){n.push(h)}function a(h){t.setup(e,h)}function c(h){t.setupView(e,h)}const l={lightsArray:e,shadowsArray:n,camera:null,lights:t,transmissionRenderTarget:{}};return{init:i,state:l,setupLights:a,setupLightsView:c,pushLight:o,pushShadow:r}}function Em(s){let t=new WeakMap;function e(i,o=0){const r=t.get(i);let a;return r===void 0?(a=new nc(s),t.set(i,[a])):o>=r.length?(a=new nc(s),r.push(a)):a=r[o],a}function n(){t=new WeakMap}return{get:e,dispose:n}}class bm extends Zi{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=ah,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Tm extends Zi{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Am=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Cm=`uniform sampler2D shadow_pass;
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
}`;function Pm(s,t,e){let n=new Tr;const i=new ht,o=new ht,r=new me,a=new bm({depthPacking:ch}),c=new Tm,l={},h=e.maxTextureSize,u={[on]:Ce,[Ce]:on,[Ve]:Ve},d=new bn({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ht},radius:{value:4}},vertexShader:Am,fragmentShader:Cm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const g=new ge;g.setAttribute("position",new hn(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const _=new q(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Ec;let p=this.type;this.render=function(A,C,D){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||A.length===0)return;const E=s.getRenderTarget(),M=s.getActiveCubeFace(),I=s.getActiveMipmapLevel(),B=s.state;B.setBlending(Hn),B.buffers.color.setClear(1,1,1,1),B.buffers.depth.setTest(!0),B.setScissorTest(!1);const L=p!==Sn&&this.type===Sn,W=p===Sn&&this.type!==Sn;for(let U=0,K=A.length;U<K;U++){const it=A[U],k=it.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",it,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const $=k.getFrameExtents();if(i.multiply($),o.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/$.x),i.x=o.x*$.x,k.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/$.y),i.y=o.y*$.y,k.mapSize.y=o.y)),k.map===null||L===!0||W===!0){const mt=this.type!==Sn?{minFilter:Ke,magFilter:Ke}:{};k.map!==null&&k.map.dispose(),k.map=new ri(i.x,i.y,mt),k.map.texture.name=it.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const et=k.getViewportCount();for(let mt=0;mt<et;mt++){const Lt=k.getViewport(mt);r.set(o.x*Lt.x,o.y*Lt.y,o.x*Lt.z,o.y*Lt.w),B.viewport(r),k.updateMatrices(it,mt),n=k.getFrustum(),S(C,D,k.camera,it,this.type)}k.isPointLightShadow!==!0&&this.type===Sn&&y(k,D),k.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(E,M,I)};function y(A,C){const D=t.update(_);d.defines.VSM_SAMPLES!==A.blurSamples&&(d.defines.VSM_SAMPLES=A.blurSamples,f.defines.VSM_SAMPLES=A.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),A.mapPass===null&&(A.mapPass=new ri(i.x,i.y)),d.uniforms.shadow_pass.value=A.map.texture,d.uniforms.resolution.value=A.mapSize,d.uniforms.radius.value=A.radius,s.setRenderTarget(A.mapPass),s.clear(),s.renderBufferDirect(C,null,D,d,_,null),f.uniforms.shadow_pass.value=A.mapPass.texture,f.uniforms.resolution.value=A.mapSize,f.uniforms.radius.value=A.radius,s.setRenderTarget(A.map),s.clear(),s.renderBufferDirect(C,null,D,f,_,null)}function x(A,C,D,E){let M=null;const I=D.isPointLight===!0?A.customDistanceMaterial:A.customDepthMaterial;if(I!==void 0)M=I;else if(M=D.isPointLight===!0?c:a,s.localClippingEnabled&&C.clipShadows===!0&&Array.isArray(C.clippingPlanes)&&C.clippingPlanes.length!==0||C.displacementMap&&C.displacementScale!==0||C.alphaMap&&C.alphaTest>0||C.map&&C.alphaTest>0){const B=M.uuid,L=C.uuid;let W=l[B];W===void 0&&(W={},l[B]=W);let U=W[L];U===void 0&&(U=M.clone(),W[L]=U,C.addEventListener("dispose",R)),M=U}if(M.visible=C.visible,M.wireframe=C.wireframe,E===Sn?M.side=C.shadowSide!==null?C.shadowSide:C.side:M.side=C.shadowSide!==null?C.shadowSide:u[C.side],M.alphaMap=C.alphaMap,M.alphaTest=C.alphaTest,M.map=C.map,M.clipShadows=C.clipShadows,M.clippingPlanes=C.clippingPlanes,M.clipIntersection=C.clipIntersection,M.displacementMap=C.displacementMap,M.displacementScale=C.displacementScale,M.displacementBias=C.displacementBias,M.wireframeLinewidth=C.wireframeLinewidth,M.linewidth=C.linewidth,D.isPointLight===!0&&M.isMeshDistanceMaterial===!0){const B=s.properties.get(M);B.light=D}return M}function S(A,C,D,E,M){if(A.visible===!1)return;if(A.layers.test(C.layers)&&(A.isMesh||A.isLine||A.isPoints)&&(A.castShadow||A.receiveShadow&&M===Sn)&&(!A.frustumCulled||n.intersectsObject(A))){A.modelViewMatrix.multiplyMatrices(D.matrixWorldInverse,A.matrixWorld);const L=t.update(A),W=A.material;if(Array.isArray(W)){const U=L.groups;for(let K=0,it=U.length;K<it;K++){const k=U[K],$=W[k.materialIndex];if($&&$.visible){const et=x(A,$,E,M);A.onBeforeShadow(s,A,C,D,L,et,k),s.renderBufferDirect(D,null,L,et,A,k),A.onAfterShadow(s,A,C,D,L,et,k)}}}else if(W.visible){const U=x(A,W,E,M);A.onBeforeShadow(s,A,C,D,L,U,null),s.renderBufferDirect(D,null,L,U,A,null),A.onAfterShadow(s,A,C,D,L,U,null)}}const B=A.children;for(let L=0,W=B.length;L<W;L++)S(B[L],C,D,E,M)}function R(A){A.target.removeEventListener("dispose",R);for(const D in l){const E=l[D],M=A.target.uuid;M in E&&(E[M].dispose(),delete E[M])}}}function Rm(s){function t(){let v=!1;const O=new me;let H=null;const lt=new me(0,0,0,0);return{setMask:function(vt){H!==vt&&!v&&(s.colorMask(vt,vt,vt,vt),H=vt)},setLocked:function(vt){v=vt},setClear:function(vt,Ht,Xt,ne,le){le===!0&&(vt*=ne,Ht*=ne,Xt*=ne),O.set(vt,Ht,Xt,ne),lt.equals(O)===!1&&(s.clearColor(vt,Ht,Xt,ne),lt.copy(O))},reset:function(){v=!1,H=null,lt.set(-1,0,0,0)}}}function e(){let v=!1,O=null,H=null,lt=null;return{setTest:function(vt){vt?Et(s.DEPTH_TEST):_t(s.DEPTH_TEST)},setMask:function(vt){O!==vt&&!v&&(s.depthMask(vt),O=vt)},setFunc:function(vt){if(H!==vt){switch(vt){case Nl:s.depthFunc(s.NEVER);break;case zl:s.depthFunc(s.ALWAYS);break;case Ol:s.depthFunc(s.LESS);break;case Qs:s.depthFunc(s.LEQUAL);break;case Fl:s.depthFunc(s.EQUAL);break;case Bl:s.depthFunc(s.GEQUAL);break;case kl:s.depthFunc(s.GREATER);break;case Hl:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}H=vt}},setLocked:function(vt){v=vt},setClear:function(vt){lt!==vt&&(s.clearDepth(vt),lt=vt)},reset:function(){v=!1,O=null,H=null,lt=null}}}function n(){let v=!1,O=null,H=null,lt=null,vt=null,Ht=null,Xt=null,ne=null,le=null;return{setTest:function(Kt){v||(Kt?Et(s.STENCIL_TEST):_t(s.STENCIL_TEST))},setMask:function(Kt){O!==Kt&&!v&&(s.stencilMask(Kt),O=Kt)},setFunc:function(Kt,he,Qt){(H!==Kt||lt!==he||vt!==Qt)&&(s.stencilFunc(Kt,he,Qt),H=Kt,lt=he,vt=Qt)},setOp:function(Kt,he,Qt){(Ht!==Kt||Xt!==he||ne!==Qt)&&(s.stencilOp(Kt,he,Qt),Ht=Kt,Xt=he,ne=Qt)},setLocked:function(Kt){v=Kt},setClear:function(Kt){le!==Kt&&(s.clearStencil(Kt),le=Kt)},reset:function(){v=!1,O=null,H=null,lt=null,vt=null,Ht=null,Xt=null,ne=null,le=null}}}const i=new t,o=new e,r=new n,a=new WeakMap,c=new WeakMap;let l={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,y=null,x=null,S=null,R=null,A=new jt(0,0,0),C=0,D=!1,E=null,M=null,I=null,B=null,L=null;const W=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let U=!1,K=0;const it=s.getParameter(s.VERSION);it.indexOf("WebGL")!==-1?(K=parseFloat(/^WebGL (\d)/.exec(it)[1]),U=K>=1):it.indexOf("OpenGL ES")!==-1&&(K=parseFloat(/^OpenGL ES (\d)/.exec(it)[1]),U=K>=2);let k=null,$={};const et=s.getParameter(s.SCISSOR_BOX),mt=s.getParameter(s.VIEWPORT),Lt=new me().fromArray(et),Nt=new me().fromArray(mt);function j(v,O,H,lt){const vt=new Uint8Array(4),Ht=s.createTexture();s.bindTexture(v,Ht),s.texParameteri(v,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(v,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Xt=0;Xt<H;Xt++)v===s.TEXTURE_3D||v===s.TEXTURE_2D_ARRAY?s.texImage3D(O,0,s.RGBA,1,1,lt,0,s.RGBA,s.UNSIGNED_BYTE,vt):s.texImage2D(O+Xt,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,vt);return Ht}const ut={};ut[s.TEXTURE_2D]=j(s.TEXTURE_2D,s.TEXTURE_2D,1),ut[s.TEXTURE_CUBE_MAP]=j(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ut[s.TEXTURE_2D_ARRAY]=j(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ut[s.TEXTURE_3D]=j(s.TEXTURE_3D,s.TEXTURE_3D,1,1),i.setClear(0,0,0,1),o.setClear(1),r.setClear(0),Et(s.DEPTH_TEST),o.setFunc(Qs),J(!1),X(zr),Et(s.CULL_FACE),dt(Hn);function Et(v){l[v]!==!0&&(s.enable(v),l[v]=!0)}function _t(v){l[v]!==!1&&(s.disable(v),l[v]=!1)}function Ft(v,O){return h[v]!==O?(s.bindFramebuffer(v,O),h[v]=O,v===s.DRAW_FRAMEBUFFER&&(h[s.FRAMEBUFFER]=O),v===s.FRAMEBUFFER&&(h[s.DRAW_FRAMEBUFFER]=O),!0):!1}function zt(v,O){let H=d,lt=!1;if(v){H=u.get(O),H===void 0&&(H=[],u.set(O,H));const vt=v.textures;if(H.length!==vt.length||H[0]!==s.COLOR_ATTACHMENT0){for(let Ht=0,Xt=vt.length;Ht<Xt;Ht++)H[Ht]=s.COLOR_ATTACHMENT0+Ht;H.length=vt.length,lt=!0}}else H[0]!==s.BACK&&(H[0]=s.BACK,lt=!0);lt&&s.drawBuffers(H)}function N(v){return f!==v?(s.useProgram(v),f=v,!0):!1}const Gt={[ti]:s.FUNC_ADD,[xl]:s.FUNC_SUBTRACT,[vl]:s.FUNC_REVERSE_SUBTRACT};Gt[Ml]=s.MIN,Gt[yl]=s.MAX;const Q={[Sl]:s.ZERO,[wl]:s.ONE,[El]:s.SRC_COLOR,[hr]:s.SRC_ALPHA,[Rl]:s.SRC_ALPHA_SATURATE,[Cl]:s.DST_COLOR,[Tl]:s.DST_ALPHA,[bl]:s.ONE_MINUS_SRC_COLOR,[ur]:s.ONE_MINUS_SRC_ALPHA,[Pl]:s.ONE_MINUS_DST_COLOR,[Al]:s.ONE_MINUS_DST_ALPHA,[Ll]:s.CONSTANT_COLOR,[Il]:s.ONE_MINUS_CONSTANT_COLOR,[Dl]:s.CONSTANT_ALPHA,[Ul]:s.ONE_MINUS_CONSTANT_ALPHA};function dt(v,O,H,lt,vt,Ht,Xt,ne,le,Kt){if(v===Hn){g===!0&&(_t(s.BLEND),g=!1);return}if(g===!1&&(Et(s.BLEND),g=!0),v!==_l){if(v!==_||Kt!==D){if((m!==ti||x!==ti)&&(s.blendEquation(s.FUNC_ADD),m=ti,x=ti),Kt)switch(v){case Bi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Or:s.blendFunc(s.ONE,s.ONE);break;case Fr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Br:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}else switch(v){case Bi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Or:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Fr:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Br:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",v);break}p=null,y=null,S=null,R=null,A.set(0,0,0),C=0,_=v,D=Kt}return}vt=vt||O,Ht=Ht||H,Xt=Xt||lt,(O!==m||vt!==x)&&(s.blendEquationSeparate(Gt[O],Gt[vt]),m=O,x=vt),(H!==p||lt!==y||Ht!==S||Xt!==R)&&(s.blendFuncSeparate(Q[H],Q[lt],Q[Ht],Q[Xt]),p=H,y=lt,S=Ht,R=Xt),(ne.equals(A)===!1||le!==C)&&(s.blendColor(ne.r,ne.g,ne.b,le),A.copy(ne),C=le),_=v,D=!1}function nt(v,O){v.side===Ve?_t(s.CULL_FACE):Et(s.CULL_FACE);let H=v.side===Ce;O&&(H=!H),J(H),v.blending===Bi&&v.transparent===!1?dt(Hn):dt(v.blending,v.blendEquation,v.blendSrc,v.blendDst,v.blendEquationAlpha,v.blendSrcAlpha,v.blendDstAlpha,v.blendColor,v.blendAlpha,v.premultipliedAlpha),o.setFunc(v.depthFunc),o.setTest(v.depthTest),o.setMask(v.depthWrite),i.setMask(v.colorWrite);const lt=v.stencilWrite;r.setTest(lt),lt&&(r.setMask(v.stencilWriteMask),r.setFunc(v.stencilFunc,v.stencilRef,v.stencilFuncMask),r.setOp(v.stencilFail,v.stencilZFail,v.stencilZPass)),yt(v.polygonOffset,v.polygonOffsetFactor,v.polygonOffsetUnits),v.alphaToCoverage===!0?Et(s.SAMPLE_ALPHA_TO_COVERAGE):_t(s.SAMPLE_ALPHA_TO_COVERAGE)}function J(v){E!==v&&(v?s.frontFace(s.CW):s.frontFace(s.CCW),E=v)}function X(v){v!==ml?(Et(s.CULL_FACE),v!==M&&(v===zr?s.cullFace(s.BACK):v===gl?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):_t(s.CULL_FACE),M=v}function at(v){v!==I&&(U&&s.lineWidth(v),I=v)}function yt(v,O,H){v?(Et(s.POLYGON_OFFSET_FILL),(B!==O||L!==H)&&(s.polygonOffset(O,H),B=O,L=H)):_t(s.POLYGON_OFFSET_FILL)}function T(v){v?Et(s.SCISSOR_TEST):_t(s.SCISSOR_TEST)}function w(v){v===void 0&&(v=s.TEXTURE0+W-1),k!==v&&(s.activeTexture(v),k=v)}function F(v,O,H){H===void 0&&(k===null?H=s.TEXTURE0+W-1:H=k);let lt=$[H];lt===void 0&&(lt={type:void 0,texture:void 0},$[H]=lt),(lt.type!==v||lt.texture!==O)&&(k!==H&&(s.activeTexture(H),k=H),s.bindTexture(v,O||ut[v]),lt.type=v,lt.texture=O)}function Y(){const v=$[k];v!==void 0&&v.type!==void 0&&(s.bindTexture(v.type,null),v.type=void 0,v.texture=void 0)}function rt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function tt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function bt(){try{s.texSubImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function gt(){try{s.texSubImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ct(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Pt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function xt(){try{s.texStorage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function ft(){try{s.texStorage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function Tt(){try{s.texImage3D.apply(s,arguments)}catch(v){console.error("THREE.WebGLState:",v)}}function pt(v){Lt.equals(v)===!1&&(s.scissor(v.x,v.y,v.z,v.w),Lt.copy(v))}function Dt(v){Nt.equals(v)===!1&&(s.viewport(v.x,v.y,v.z,v.w),Nt.copy(v))}function Vt(v,O){let H=c.get(O);H===void 0&&(H=new WeakMap,c.set(O,H));let lt=H.get(v);lt===void 0&&(lt=s.getUniformBlockIndex(O,v.name),H.set(v,lt))}function Ot(v,O){const lt=c.get(O).get(v);a.get(O)!==lt&&(s.uniformBlockBinding(O,lt,v.__bindingPointIndex),a.set(O,lt))}function Wt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),l={},k=null,$={},h={},u=new WeakMap,d=[],f=null,g=!1,_=null,m=null,p=null,y=null,x=null,S=null,R=null,A=new jt(0,0,0),C=0,D=!1,E=null,M=null,I=null,B=null,L=null,Lt.set(0,0,s.canvas.width,s.canvas.height),Nt.set(0,0,s.canvas.width,s.canvas.height),i.reset(),o.reset(),r.reset()}return{buffers:{color:i,depth:o,stencil:r},enable:Et,disable:_t,bindFramebuffer:Ft,drawBuffers:zt,useProgram:N,setBlending:dt,setMaterial:nt,setFlipSided:J,setCullFace:X,setLineWidth:at,setPolygonOffset:yt,setScissorTest:T,activeTexture:w,bindTexture:F,unbindTexture:Y,compressedTexImage2D:rt,compressedTexImage3D:tt,texImage2D:St,texImage3D:Tt,updateUBOMapping:Vt,uniformBlockBinding:Ot,texStorage2D:xt,texStorage3D:ft,texSubImage2D:bt,texSubImage3D:gt,compressedTexSubImage2D:ct,compressedTexSubImage3D:Pt,scissor:pt,viewport:Dt,reset:Wt}}function Lm(s,t,e,n,i,o,r){const a=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),l=new ht,h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(T,w){return f?new OffscreenCanvas(T,w):so("canvas")}function _(T,w,F){let Y=1;const rt=yt(T);if((rt.width>F||rt.height>F)&&(Y=F/Math.max(rt.width,rt.height)),Y<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const tt=Math.floor(Y*rt.width),bt=Math.floor(Y*rt.height);u===void 0&&(u=g(tt,bt));const gt=w?g(tt,bt):u;return gt.width=tt,gt.height=bt,gt.getContext("2d").drawImage(T,0,0,tt,bt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+rt.width+"x"+rt.height+") to ("+tt+"x"+bt+")."),gt}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+rt.width+"x"+rt.height+")."),T;return T}function m(T){return T.generateMipmaps&&T.minFilter!==Ke&&T.minFilter!==je}function p(T){s.generateMipmap(T)}function y(T,w,F,Y,rt=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let tt=w;if(w===s.RED&&(F===s.FLOAT&&(tt=s.R32F),F===s.HALF_FLOAT&&(tt=s.R16F),F===s.UNSIGNED_BYTE&&(tt=s.R8)),w===s.RED_INTEGER&&(F===s.UNSIGNED_BYTE&&(tt=s.R8UI),F===s.UNSIGNED_SHORT&&(tt=s.R16UI),F===s.UNSIGNED_INT&&(tt=s.R32UI),F===s.BYTE&&(tt=s.R8I),F===s.SHORT&&(tt=s.R16I),F===s.INT&&(tt=s.R32I)),w===s.RG&&(F===s.FLOAT&&(tt=s.RG32F),F===s.HALF_FLOAT&&(tt=s.RG16F),F===s.UNSIGNED_BYTE&&(tt=s.RG8)),w===s.RG_INTEGER&&(F===s.UNSIGNED_BYTE&&(tt=s.RG8UI),F===s.UNSIGNED_SHORT&&(tt=s.RG16UI),F===s.UNSIGNED_INT&&(tt=s.RG32UI),F===s.BYTE&&(tt=s.RG8I),F===s.SHORT&&(tt=s.RG16I),F===s.INT&&(tt=s.RG32I)),w===s.RGB&&F===s.UNSIGNED_INT_5_9_9_9_REV&&(tt=s.RGB9_E5),w===s.RGBA){const bt=rt?to:ce.getTransfer(Y);F===s.FLOAT&&(tt=s.RGBA32F),F===s.HALF_FLOAT&&(tt=s.RGBA16F),F===s.UNSIGNED_BYTE&&(tt=bt===ue?s.SRGB8_ALPHA8:s.RGBA8),F===s.UNSIGNED_SHORT_4_4_4_4&&(tt=s.RGBA4),F===s.UNSIGNED_SHORT_5_5_5_1&&(tt=s.RGB5_A1)}return(tt===s.R16F||tt===s.R32F||tt===s.RG16F||tt===s.RG32F||tt===s.RGBA16F||tt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),tt}function x(T,w){return m(T)===!0||T.isFramebufferTexture&&T.minFilter!==Ke&&T.minFilter!==je?Math.log2(Math.max(w.width,w.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?w.mipmaps.length:1}function S(T){const w=T.target;w.removeEventListener("dispose",S),A(w),w.isVideoTexture&&h.delete(w)}function R(T){const w=T.target;w.removeEventListener("dispose",R),D(w)}function A(T){const w=n.get(T);if(w.__webglInit===void 0)return;const F=T.source,Y=d.get(F);if(Y){const rt=Y[w.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&C(T),Object.keys(Y).length===0&&d.delete(F)}n.remove(T)}function C(T){const w=n.get(T);s.deleteTexture(w.__webglTexture);const F=T.source,Y=d.get(F);delete Y[w.__cacheKey],r.memory.textures--}function D(T){const w=n.get(T);if(T.depthTexture&&T.depthTexture.dispose(),T.isWebGLCubeRenderTarget)for(let Y=0;Y<6;Y++){if(Array.isArray(w.__webglFramebuffer[Y]))for(let rt=0;rt<w.__webglFramebuffer[Y].length;rt++)s.deleteFramebuffer(w.__webglFramebuffer[Y][rt]);else s.deleteFramebuffer(w.__webglFramebuffer[Y]);w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer[Y])}else{if(Array.isArray(w.__webglFramebuffer))for(let Y=0;Y<w.__webglFramebuffer.length;Y++)s.deleteFramebuffer(w.__webglFramebuffer[Y]);else s.deleteFramebuffer(w.__webglFramebuffer);if(w.__webglDepthbuffer&&s.deleteRenderbuffer(w.__webglDepthbuffer),w.__webglMultisampledFramebuffer&&s.deleteFramebuffer(w.__webglMultisampledFramebuffer),w.__webglColorRenderbuffer)for(let Y=0;Y<w.__webglColorRenderbuffer.length;Y++)w.__webglColorRenderbuffer[Y]&&s.deleteRenderbuffer(w.__webglColorRenderbuffer[Y]);w.__webglDepthRenderbuffer&&s.deleteRenderbuffer(w.__webglDepthRenderbuffer)}const F=T.textures;for(let Y=0,rt=F.length;Y<rt;Y++){const tt=n.get(F[Y]);tt.__webglTexture&&(s.deleteTexture(tt.__webglTexture),r.memory.textures--),n.remove(F[Y])}n.remove(T)}let E=0;function M(){E=0}function I(){const T=E;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),E+=1,T}function B(T){const w=[];return w.push(T.wrapS),w.push(T.wrapT),w.push(T.wrapR||0),w.push(T.magFilter),w.push(T.minFilter),w.push(T.anisotropy),w.push(T.internalFormat),w.push(T.format),w.push(T.type),w.push(T.generateMipmaps),w.push(T.premultiplyAlpha),w.push(T.flipY),w.push(T.unpackAlignment),w.push(T.colorSpace),w.join()}function L(T,w){const F=n.get(T);if(T.isVideoTexture&&X(T),T.isRenderTargetTexture===!1&&T.version>0&&F.__version!==T.version){const Y=T.image;if(Y===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(Y.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{Lt(F,T,w);return}}e.bindTexture(s.TEXTURE_2D,F.__webglTexture,s.TEXTURE0+w)}function W(T,w){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Lt(F,T,w);return}e.bindTexture(s.TEXTURE_2D_ARRAY,F.__webglTexture,s.TEXTURE0+w)}function U(T,w){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Lt(F,T,w);return}e.bindTexture(s.TEXTURE_3D,F.__webglTexture,s.TEXTURE0+w)}function K(T,w){const F=n.get(T);if(T.version>0&&F.__version!==T.version){Nt(F,T,w);return}e.bindTexture(s.TEXTURE_CUBE_MAP,F.__webglTexture,s.TEXTURE0+w)}const it={[un]:s.REPEAT,[wn]:s.CLAMP_TO_EDGE,[pr]:s.MIRRORED_REPEAT},k={[Ke]:s.NEAREST,[Kl]:s.NEAREST_MIPMAP_NEAREST,[ys]:s.NEAREST_MIPMAP_LINEAR,[je]:s.LINEAR,[Eo]:s.LINEAR_MIPMAP_NEAREST,[ni]:s.LINEAR_MIPMAP_LINEAR},$={[hh]:s.NEVER,[gh]:s.ALWAYS,[uh]:s.LESS,[Oc]:s.LEQUAL,[dh]:s.EQUAL,[mh]:s.GEQUAL,[fh]:s.GREATER,[ph]:s.NOTEQUAL};function et(T,w){if(w.type===Fn&&t.has("OES_texture_float_linear")===!1&&(w.magFilter===je||w.magFilter===Eo||w.magFilter===ys||w.magFilter===ni||w.minFilter===je||w.minFilter===Eo||w.minFilter===ys||w.minFilter===ni)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,it[w.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,it[w.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,it[w.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,k[w.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,k[w.minFilter]),w.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,$[w.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){if(w.magFilter===Ke||w.minFilter!==ys&&w.minFilter!==ni||w.type===Fn&&t.has("OES_texture_float_linear")===!1)return;if(w.anisotropy>1||n.get(w).__currentAnisotropy){const F=t.get("EXT_texture_filter_anisotropic");s.texParameterf(T,F.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(w.anisotropy,i.getMaxAnisotropy())),n.get(w).__currentAnisotropy=w.anisotropy}}}function mt(T,w){let F=!1;T.__webglInit===void 0&&(T.__webglInit=!0,w.addEventListener("dispose",S));const Y=w.source;let rt=d.get(Y);rt===void 0&&(rt={},d.set(Y,rt));const tt=B(w);if(tt!==T.__cacheKey){rt[tt]===void 0&&(rt[tt]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,F=!0),rt[tt].usedTimes++;const bt=rt[T.__cacheKey];bt!==void 0&&(rt[T.__cacheKey].usedTimes--,bt.usedTimes===0&&C(w)),T.__cacheKey=tt,T.__webglTexture=rt[tt].texture}return F}function Lt(T,w,F){let Y=s.TEXTURE_2D;(w.isDataArrayTexture||w.isCompressedArrayTexture)&&(Y=s.TEXTURE_2D_ARRAY),w.isData3DTexture&&(Y=s.TEXTURE_3D);const rt=mt(T,w),tt=w.source;e.bindTexture(Y,T.__webglTexture,s.TEXTURE0+F);const bt=n.get(tt);if(tt.version!==bt.__version||rt===!0){e.activeTexture(s.TEXTURE0+F);const gt=ce.getPrimaries(ce.workingColorSpace),ct=w.colorSpace===zn?null:ce.getPrimaries(w.colorSpace),Pt=w.colorSpace===zn||gt===ct?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Pt);let xt=_(w.image,!1,i.maxTextureSize);xt=at(w,xt);const ft=o.convert(w.format,w.colorSpace),St=o.convert(w.type);let Tt=y(w.internalFormat,ft,St,w.colorSpace,w.isVideoTexture);et(Y,w);let pt;const Dt=w.mipmaps,Vt=w.isVideoTexture!==!0,Ot=bt.__version===void 0||rt===!0,Wt=tt.dataReady,v=x(w,xt);if(w.isDepthTexture)Tt=s.DEPTH_COMPONENT16,w.type===Fn?Tt=s.DEPTH_COMPONENT32F:w.type===Xi?Tt=s.DEPTH_COMPONENT24:w.type===_s&&(Tt=s.DEPTH24_STENCIL8),Ot&&(Vt?e.texStorage2D(s.TEXTURE_2D,1,Tt,xt.width,xt.height):e.texImage2D(s.TEXTURE_2D,0,Tt,xt.width,xt.height,0,ft,St,null));else if(w.isDataTexture)if(Dt.length>0){Vt&&Ot&&e.texStorage2D(s.TEXTURE_2D,v,Tt,Dt[0].width,Dt[0].height);for(let O=0,H=Dt.length;O<H;O++)pt=Dt[O],Vt?Wt&&e.texSubImage2D(s.TEXTURE_2D,O,0,0,pt.width,pt.height,ft,St,pt.data):e.texImage2D(s.TEXTURE_2D,O,Tt,pt.width,pt.height,0,ft,St,pt.data);w.generateMipmaps=!1}else Vt?(Ot&&e.texStorage2D(s.TEXTURE_2D,v,Tt,xt.width,xt.height),Wt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,xt.width,xt.height,ft,St,xt.data)):e.texImage2D(s.TEXTURE_2D,0,Tt,xt.width,xt.height,0,ft,St,xt.data);else if(w.isCompressedTexture)if(w.isCompressedArrayTexture){Vt&&Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,v,Tt,Dt[0].width,Dt[0].height,xt.depth);for(let O=0,H=Dt.length;O<H;O++)pt=Dt[O],w.format!==ln?ft!==null?Vt?Wt&&e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,O,0,0,0,pt.width,pt.height,xt.depth,ft,pt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,O,Tt,pt.width,pt.height,xt.depth,0,pt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?Wt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,O,0,0,0,pt.width,pt.height,xt.depth,ft,St,pt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,O,Tt,pt.width,pt.height,xt.depth,0,ft,St,pt.data)}else{Vt&&Ot&&e.texStorage2D(s.TEXTURE_2D,v,Tt,Dt[0].width,Dt[0].height);for(let O=0,H=Dt.length;O<H;O++)pt=Dt[O],w.format!==ln?ft!==null?Vt?Wt&&e.compressedTexSubImage2D(s.TEXTURE_2D,O,0,0,pt.width,pt.height,ft,pt.data):e.compressedTexImage2D(s.TEXTURE_2D,O,Tt,pt.width,pt.height,0,pt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):Vt?Wt&&e.texSubImage2D(s.TEXTURE_2D,O,0,0,pt.width,pt.height,ft,St,pt.data):e.texImage2D(s.TEXTURE_2D,O,Tt,pt.width,pt.height,0,ft,St,pt.data)}else if(w.isDataArrayTexture)Vt?(Ot&&e.texStorage3D(s.TEXTURE_2D_ARRAY,v,Tt,xt.width,xt.height,xt.depth),Wt&&e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,xt.width,xt.height,xt.depth,ft,St,xt.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,Tt,xt.width,xt.height,xt.depth,0,ft,St,xt.data);else if(w.isData3DTexture)Vt?(Ot&&e.texStorage3D(s.TEXTURE_3D,v,Tt,xt.width,xt.height,xt.depth),Wt&&e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,xt.width,xt.height,xt.depth,ft,St,xt.data)):e.texImage3D(s.TEXTURE_3D,0,Tt,xt.width,xt.height,xt.depth,0,ft,St,xt.data);else if(w.isFramebufferTexture){if(Ot)if(Vt)e.texStorage2D(s.TEXTURE_2D,v,Tt,xt.width,xt.height);else{let O=xt.width,H=xt.height;for(let lt=0;lt<v;lt++)e.texImage2D(s.TEXTURE_2D,lt,Tt,O,H,0,ft,St,null),O>>=1,H>>=1}}else if(Dt.length>0){if(Vt&&Ot){const O=yt(Dt[0]);e.texStorage2D(s.TEXTURE_2D,v,Tt,O.width,O.height)}for(let O=0,H=Dt.length;O<H;O++)pt=Dt[O],Vt?Wt&&e.texSubImage2D(s.TEXTURE_2D,O,0,0,ft,St,pt):e.texImage2D(s.TEXTURE_2D,O,Tt,ft,St,pt);w.generateMipmaps=!1}else if(Vt){if(Ot){const O=yt(xt);e.texStorage2D(s.TEXTURE_2D,v,Tt,O.width,O.height)}Wt&&e.texSubImage2D(s.TEXTURE_2D,0,0,0,ft,St,xt)}else e.texImage2D(s.TEXTURE_2D,0,Tt,ft,St,xt);m(w)&&p(Y),bt.__version=tt.version,w.onUpdate&&w.onUpdate(w)}T.__version=w.version}function Nt(T,w,F){if(w.image.length!==6)return;const Y=mt(T,w),rt=w.source;e.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+F);const tt=n.get(rt);if(rt.version!==tt.__version||Y===!0){e.activeTexture(s.TEXTURE0+F);const bt=ce.getPrimaries(ce.workingColorSpace),gt=w.colorSpace===zn?null:ce.getPrimaries(w.colorSpace),ct=w.colorSpace===zn||bt===gt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,w.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,w.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,w.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,ct);const Pt=w.isCompressedTexture||w.image[0].isCompressedTexture,xt=w.image[0]&&w.image[0].isDataTexture,ft=[];for(let H=0;H<6;H++)!Pt&&!xt?ft[H]=_(w.image[H],!0,i.maxCubemapSize):ft[H]=xt?w.image[H].image:w.image[H],ft[H]=at(w,ft[H]);const St=ft[0],Tt=o.convert(w.format,w.colorSpace),pt=o.convert(w.type),Dt=y(w.internalFormat,Tt,pt,w.colorSpace),Vt=w.isVideoTexture!==!0,Ot=tt.__version===void 0||Y===!0,Wt=rt.dataReady;let v=x(w,St);et(s.TEXTURE_CUBE_MAP,w);let O;if(Pt){Vt&&Ot&&e.texStorage2D(s.TEXTURE_CUBE_MAP,v,Dt,St.width,St.height);for(let H=0;H<6;H++){O=ft[H].mipmaps;for(let lt=0;lt<O.length;lt++){const vt=O[lt];w.format!==ln?Tt!==null?Vt?Wt&&e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,0,0,vt.width,vt.height,Tt,vt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,Dt,vt.width,vt.height,0,vt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,0,0,vt.width,vt.height,Tt,pt,vt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt,Dt,vt.width,vt.height,0,Tt,pt,vt.data)}}}else{if(O=w.mipmaps,Vt&&Ot){O.length>0&&v++;const H=yt(ft[0]);e.texStorage2D(s.TEXTURE_CUBE_MAP,v,Dt,H.width,H.height)}for(let H=0;H<6;H++)if(xt){Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,ft[H].width,ft[H].height,Tt,pt,ft[H].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Dt,ft[H].width,ft[H].height,0,Tt,pt,ft[H].data);for(let lt=0;lt<O.length;lt++){const Ht=O[lt].image[H].image;Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,0,0,Ht.width,Ht.height,Tt,pt,Ht.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,Dt,Ht.width,Ht.height,0,Tt,pt,Ht.data)}}else{Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,0,0,Tt,pt,ft[H]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,0,Dt,Tt,pt,ft[H]);for(let lt=0;lt<O.length;lt++){const vt=O[lt];Vt?Wt&&e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,0,0,Tt,pt,vt.image[H]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+H,lt+1,Dt,Tt,pt,vt.image[H])}}}m(w)&&p(s.TEXTURE_CUBE_MAP),tt.__version=rt.version,w.onUpdate&&w.onUpdate(w)}T.__version=w.version}function j(T,w,F,Y,rt,tt){const bt=o.convert(F.format,F.colorSpace),gt=o.convert(F.type),ct=y(F.internalFormat,bt,gt,F.colorSpace);if(!n.get(w).__hasExternalTextures){const xt=Math.max(1,w.width>>tt),ft=Math.max(1,w.height>>tt);rt===s.TEXTURE_3D||rt===s.TEXTURE_2D_ARRAY?e.texImage3D(rt,tt,ct,xt,ft,w.depth,0,bt,gt,null):e.texImage2D(rt,tt,ct,xt,ft,0,bt,gt,null)}e.bindFramebuffer(s.FRAMEBUFFER,T),J(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,Y,rt,n.get(F).__webglTexture,0,nt(w)):(rt===s.TEXTURE_2D||rt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,Y,rt,n.get(F).__webglTexture,tt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ut(T,w,F){if(s.bindRenderbuffer(s.RENDERBUFFER,T),w.depthBuffer&&!w.stencilBuffer){let Y=s.DEPTH_COMPONENT24;if(F||J(w)){const rt=w.depthTexture;rt&&rt.isDepthTexture&&(rt.type===Fn?Y=s.DEPTH_COMPONENT32F:rt.type===Xi&&(Y=s.DEPTH_COMPONENT24));const tt=nt(w);J(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,tt,Y,w.width,w.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,tt,Y,w.width,w.height)}else s.renderbufferStorage(s.RENDERBUFFER,Y,w.width,w.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,T)}else if(w.depthBuffer&&w.stencilBuffer){const Y=nt(w);F&&J(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Y,s.DEPTH24_STENCIL8,w.width,w.height):J(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Y,s.DEPTH24_STENCIL8,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,w.width,w.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,T)}else{const Y=w.textures;for(let rt=0;rt<Y.length;rt++){const tt=Y[rt],bt=o.convert(tt.format,tt.colorSpace),gt=o.convert(tt.type),ct=y(tt.internalFormat,bt,gt,tt.colorSpace),Pt=nt(w);F&&J(w)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Pt,ct,w.width,w.height):J(w)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Pt,ct,w.width,w.height):s.renderbufferStorage(s.RENDERBUFFER,ct,w.width,w.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function Et(T,w){if(w&&w.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,T),!(w.depthTexture&&w.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(w.depthTexture).__webglTexture||w.depthTexture.image.width!==w.width||w.depthTexture.image.height!==w.height)&&(w.depthTexture.image.width=w.width,w.depthTexture.image.height=w.height,w.depthTexture.needsUpdate=!0),L(w.depthTexture,0);const Y=n.get(w.depthTexture).__webglTexture,rt=nt(w);if(w.depthTexture.format===ki)J(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Y,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,Y,0);else if(w.depthTexture.format===ds)J(w)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Y,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,Y,0);else throw new Error("Unknown depthTexture format")}function _t(T){const w=n.get(T),F=T.isWebGLCubeRenderTarget===!0;if(T.depthTexture&&!w.__autoAllocateDepthBuffer){if(F)throw new Error("target.depthTexture not supported in Cube render targets");Et(w.__webglFramebuffer,T)}else if(F){w.__webglDepthbuffer=[];for(let Y=0;Y<6;Y++)e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer[Y]),w.__webglDepthbuffer[Y]=s.createRenderbuffer(),ut(w.__webglDepthbuffer[Y],T,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,w.__webglFramebuffer),w.__webglDepthbuffer=s.createRenderbuffer(),ut(w.__webglDepthbuffer,T,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Ft(T,w,F){const Y=n.get(T);w!==void 0&&j(Y.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),F!==void 0&&_t(T)}function zt(T){const w=T.texture,F=n.get(T),Y=n.get(w);T.addEventListener("dispose",R);const rt=T.textures,tt=T.isWebGLCubeRenderTarget===!0,bt=rt.length>1;if(bt||(Y.__webglTexture===void 0&&(Y.__webglTexture=s.createTexture()),Y.__version=w.version,r.memory.textures++),tt){F.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer[gt]=[];for(let ct=0;ct<w.mipmaps.length;ct++)F.__webglFramebuffer[gt][ct]=s.createFramebuffer()}else F.__webglFramebuffer[gt]=s.createFramebuffer()}else{if(w.mipmaps&&w.mipmaps.length>0){F.__webglFramebuffer=[];for(let gt=0;gt<w.mipmaps.length;gt++)F.__webglFramebuffer[gt]=s.createFramebuffer()}else F.__webglFramebuffer=s.createFramebuffer();if(bt)for(let gt=0,ct=rt.length;gt<ct;gt++){const Pt=n.get(rt[gt]);Pt.__webglTexture===void 0&&(Pt.__webglTexture=s.createTexture(),r.memory.textures++)}if(T.samples>0&&J(T)===!1){F.__webglMultisampledFramebuffer=s.createFramebuffer(),F.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,F.__webglMultisampledFramebuffer);for(let gt=0;gt<rt.length;gt++){const ct=rt[gt];F.__webglColorRenderbuffer[gt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,F.__webglColorRenderbuffer[gt]);const Pt=o.convert(ct.format,ct.colorSpace),xt=o.convert(ct.type),ft=y(ct.internalFormat,Pt,xt,ct.colorSpace,T.isXRRenderTarget===!0),St=nt(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,St,ft,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+gt,s.RENDERBUFFER,F.__webglColorRenderbuffer[gt])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(F.__webglDepthRenderbuffer=s.createRenderbuffer(),ut(F.__webglDepthRenderbuffer,T,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(tt){e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture),et(s.TEXTURE_CUBE_MAP,w);for(let gt=0;gt<6;gt++)if(w.mipmaps&&w.mipmaps.length>0)for(let ct=0;ct<w.mipmaps.length;ct++)j(F.__webglFramebuffer[gt][ct],T,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,ct);else j(F.__webglFramebuffer[gt],T,w,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);m(w)&&p(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(bt){for(let gt=0,ct=rt.length;gt<ct;gt++){const Pt=rt[gt],xt=n.get(Pt);e.bindTexture(s.TEXTURE_2D,xt.__webglTexture),et(s.TEXTURE_2D,Pt),j(F.__webglFramebuffer,T,Pt,s.COLOR_ATTACHMENT0+gt,s.TEXTURE_2D,0),m(Pt)&&p(s.TEXTURE_2D)}e.unbindTexture()}else{let gt=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(gt=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),e.bindTexture(gt,Y.__webglTexture),et(gt,w),w.mipmaps&&w.mipmaps.length>0)for(let ct=0;ct<w.mipmaps.length;ct++)j(F.__webglFramebuffer[ct],T,w,s.COLOR_ATTACHMENT0,gt,ct);else j(F.__webglFramebuffer,T,w,s.COLOR_ATTACHMENT0,gt,0);m(w)&&p(gt),e.unbindTexture()}T.depthBuffer&&_t(T)}function N(T){const w=T.textures;for(let F=0,Y=w.length;F<Y;F++){const rt=w[F];if(m(rt)){const tt=T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,bt=n.get(rt).__webglTexture;e.bindTexture(tt,bt),p(tt),e.unbindTexture()}}}const Gt=[],Q=[];function dt(T){if(T.samples>0){if(J(T)===!1){const w=T.textures,F=T.width,Y=T.height;let rt=s.COLOR_BUFFER_BIT;const tt=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,bt=n.get(T),gt=w.length>1;if(gt)for(let ct=0;ct<w.length;ct++)e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,bt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglFramebuffer);for(let ct=0;ct<w.length;ct++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(rt|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(rt|=s.STENCIL_BUFFER_BIT)),gt){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,bt.__webglColorRenderbuffer[ct]);const Pt=n.get(w[ct]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,Pt,0)}s.blitFramebuffer(0,0,F,Y,0,0,F,Y,rt,s.NEAREST),c===!0&&(Gt.length=0,Q.length=0,Gt.push(s.COLOR_ATTACHMENT0+ct),T.depthBuffer&&T.resolveDepthBuffer===!1&&(Gt.push(tt),Q.push(tt),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,Q)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,Gt))}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),gt)for(let ct=0;ct<w.length;ct++){e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.RENDERBUFFER,bt.__webglColorRenderbuffer[ct]);const Pt=n.get(w[ct]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,bt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+ct,s.TEXTURE_2D,Pt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,bt.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&c){const w=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[w])}}}function nt(T){return Math.min(i.maxSamples,T.samples)}function J(T){const w=n.get(T);return T.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&w.__useRenderToTexture!==!1}function X(T){const w=r.render.frame;h.get(T)!==w&&(h.set(T,w),T.update())}function at(T,w){const F=T.colorSpace,Y=T.format,rt=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||F!==Wn&&F!==zn&&(ce.getTransfer(F)===ue?(Y!==ln||rt!==Vn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",F)),w}function yt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(l.width=T.naturalWidth||T.width,l.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(l.width=T.displayWidth,l.height=T.displayHeight):(l.width=T.width,l.height=T.height),l}this.allocateTextureUnit=I,this.resetTextureUnits=M,this.setTexture2D=L,this.setTexture2DArray=W,this.setTexture3D=U,this.setTextureCube=K,this.rebindTextures=Ft,this.setupRenderTarget=zt,this.updateRenderTargetMipmap=N,this.updateMultisampleRenderTarget=dt,this.setupDepthRenderbuffer=_t,this.setupFrameBufferTexture=j,this.useMultisampledRTT=J}function Im(s,t){function e(n,i=zn){let o;const r=ce.getTransfer(i);if(n===Vn)return s.UNSIGNED_BYTE;if(n===Lc)return s.UNSIGNED_SHORT_4_4_4_4;if(n===Ic)return s.UNSIGNED_SHORT_5_5_5_1;if(n===Ql)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===Jl)return s.BYTE;if(n===$l)return s.SHORT;if(n===Pc)return s.UNSIGNED_SHORT;if(n===Rc)return s.INT;if(n===Xi)return s.UNSIGNED_INT;if(n===Fn)return s.FLOAT;if(n===ho)return s.HALF_FLOAT;if(n===th)return s.ALPHA;if(n===eh)return s.RGB;if(n===ln)return s.RGBA;if(n===nh)return s.LUMINANCE;if(n===ih)return s.LUMINANCE_ALPHA;if(n===ki)return s.DEPTH_COMPONENT;if(n===ds)return s.DEPTH_STENCIL;if(n===sh)return s.RED;if(n===Dc)return s.RED_INTEGER;if(n===oh)return s.RG;if(n===Uc)return s.RG_INTEGER;if(n===Nc)return s.RGBA_INTEGER;if(n===bo||n===To||n===Ao||n===Co)if(r===ue)if(o=t.get("WEBGL_compressed_texture_s3tc_srgb"),o!==null){if(n===bo)return o.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===To)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===Ao)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===Co)return o.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(o=t.get("WEBGL_compressed_texture_s3tc"),o!==null){if(n===bo)return o.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===To)return o.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===Ao)return o.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===Co)return o.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===kr||n===Hr||n===Gr||n===Vr)if(o=t.get("WEBGL_compressed_texture_pvrtc"),o!==null){if(n===kr)return o.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Hr)return o.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Gr)return o.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Vr)return o.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Wr||n===Xr||n===Yr)if(o=t.get("WEBGL_compressed_texture_etc"),o!==null){if(n===Wr||n===Xr)return r===ue?o.COMPRESSED_SRGB8_ETC2:o.COMPRESSED_RGB8_ETC2;if(n===Yr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:o.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===qr||n===Zr||n===jr||n===Kr||n===Jr||n===$r||n===Qr||n===ta||n===ea||n===na||n===ia||n===sa||n===oa||n===ra)if(o=t.get("WEBGL_compressed_texture_astc"),o!==null){if(n===qr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:o.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===Zr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:o.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===jr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:o.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Kr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:o.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===Jr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:o.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===$r)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:o.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Qr)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:o.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===ta)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:o.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===ea)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:o.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===na)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:o.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===ia)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:o.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===sa)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:o.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===oa)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:o.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===ra)return r===ue?o.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:o.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===Po||n===aa||n===ca)if(o=t.get("EXT_texture_compression_bptc"),o!==null){if(n===Po)return r===ue?o.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:o.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===aa)return o.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===ca)return o.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===rh||n===la||n===ha||n===ua)if(o=t.get("EXT_texture_compression_rgtc"),o!==null){if(n===Po)return o.COMPRESSED_RED_RGTC1_EXT;if(n===la)return o.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===ha)return o.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===ua)return o.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===_s?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:e}}class Dm extends Ge{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class te extends Pe{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Um={type:"move"};class tr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new te,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new te,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new P,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new P),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new te,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new P,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new P),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const _ of t.hand.values()){const m=e.getJointPose(_,n),p=this._getHandJoint(l,_);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;l.inputState.pinching&&d>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Um)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new te;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}const Nm=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,zm=`
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

}`;class Om{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(t,e,n){if(this.texture===null){const i=new Se,o=t.properties.get(i);o.__webglTexture=e.texture,(e.depthNear!=n.depthNear||e.depthFar!=n.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}render(t,e){if(this.texture!==null){if(this.mesh===null){const n=e.cameras[0].viewport,i=new bn({vertexShader:Nm,fragmentShader:zm,uniforms:{depthColor:{value:this.texture},depthWidth:{value:n.z},depthHeight:{value:n.w}}});this.mesh=new q(new Me(20,20),i)}t.render(this.mesh,e)}}reset(){this.texture=null,this.mesh=null}}class Fm extends hi{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,g=null;const _=new Om,m=e.getContextAttributes();let p=null,y=null;const x=[],S=[],R=new ht;let A=null;const C=new Ge;C.layers.enable(1),C.viewport=new me;const D=new Ge;D.layers.enable(2),D.viewport=new me;const E=[C,D],M=new Dm;M.layers.enable(1),M.layers.enable(2);let I=null,B=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(j){let ut=x[j];return ut===void 0&&(ut=new tr,x[j]=ut),ut.getTargetRaySpace()},this.getControllerGrip=function(j){let ut=x[j];return ut===void 0&&(ut=new tr,x[j]=ut),ut.getGripSpace()},this.getHand=function(j){let ut=x[j];return ut===void 0&&(ut=new tr,x[j]=ut),ut.getHandSpace()};function L(j){const ut=S.indexOf(j.inputSource);if(ut===-1)return;const Et=x[ut];Et!==void 0&&(Et.update(j.inputSource,j.frame,l||r),Et.dispatchEvent({type:j.type,data:j.inputSource}))}function W(){i.removeEventListener("select",L),i.removeEventListener("selectstart",L),i.removeEventListener("selectend",L),i.removeEventListener("squeeze",L),i.removeEventListener("squeezestart",L),i.removeEventListener("squeezeend",L),i.removeEventListener("end",W),i.removeEventListener("inputsourceschange",U);for(let j=0;j<x.length;j++){const ut=S[j];ut!==null&&(S[j]=null,x[j].disconnect(ut))}I=null,B=null,_.reset(),t.setRenderTarget(p),f=null,d=null,u=null,i=null,y=null,Nt.stop(),n.isPresenting=!1,t.setPixelRatio(A),t.setSize(R.width,R.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(j){o=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(j){a=j,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(j){l=j},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(j){if(i=j,i!==null){if(p=t.getRenderTarget(),i.addEventListener("select",L),i.addEventListener("selectstart",L),i.addEventListener("selectend",L),i.addEventListener("squeeze",L),i.addEventListener("squeezestart",L),i.addEventListener("squeezeend",L),i.addEventListener("end",W),i.addEventListener("inputsourceschange",U),m.xrCompatible!==!0&&await e.makeXRCompatible(),A=t.getPixelRatio(),t.getSize(R),i.renderState.layers===void 0){const ut={antialias:m.antialias,alpha:!0,depth:m.depth,stencil:m.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(i,e,ut),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),y=new ri(f.framebufferWidth,f.framebufferHeight,{format:ln,type:Vn,colorSpace:t.outputColorSpace,stencilBuffer:m.stencil})}else{let ut=null,Et=null,_t=null;m.depth&&(_t=m.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,ut=m.stencil?ds:ki,Et=m.stencil?_s:Xi);const Ft={colorFormat:e.RGBA8,depthFormat:_t,scaleFactor:o};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(Ft),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),y=new ri(d.textureWidth,d.textureHeight,{format:ln,type:Vn,depthTexture:new jc(d.textureWidth,d.textureHeight,Et,void 0,void 0,void 0,void 0,void 0,void 0,ut),stencilBuffer:m.stencil,colorSpace:t.outputColorSpace,samples:m.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1})}y.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),Nt.setContext(i),Nt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function U(j){for(let ut=0;ut<j.removed.length;ut++){const Et=j.removed[ut],_t=S.indexOf(Et);_t>=0&&(S[_t]=null,x[_t].disconnect(Et))}for(let ut=0;ut<j.added.length;ut++){const Et=j.added[ut];let _t=S.indexOf(Et);if(_t===-1){for(let zt=0;zt<x.length;zt++)if(zt>=S.length){S.push(Et),_t=zt;break}else if(S[zt]===null){S[zt]=Et,_t=zt;break}if(_t===-1)break}const Ft=x[_t];Ft&&Ft.connect(Et)}}const K=new P,it=new P;function k(j,ut,Et){K.setFromMatrixPosition(ut.matrixWorld),it.setFromMatrixPosition(Et.matrixWorld);const _t=K.distanceTo(it),Ft=ut.projectionMatrix.elements,zt=Et.projectionMatrix.elements,N=Ft[14]/(Ft[10]-1),Gt=Ft[14]/(Ft[10]+1),Q=(Ft[9]+1)/Ft[5],dt=(Ft[9]-1)/Ft[5],nt=(Ft[8]-1)/Ft[0],J=(zt[8]+1)/zt[0],X=N*nt,at=N*J,yt=_t/(-nt+J),T=yt*-nt;ut.matrixWorld.decompose(j.position,j.quaternion,j.scale),j.translateX(T),j.translateZ(yt),j.matrixWorld.compose(j.position,j.quaternion,j.scale),j.matrixWorldInverse.copy(j.matrixWorld).invert();const w=N+yt,F=Gt+yt,Y=X-T,rt=at+(_t-T),tt=Q*Gt/F*w,bt=dt*Gt/F*w;j.projectionMatrix.makePerspective(Y,rt,tt,bt,w,F),j.projectionMatrixInverse.copy(j.projectionMatrix).invert()}function $(j,ut){ut===null?j.matrixWorld.copy(j.matrix):j.matrixWorld.multiplyMatrices(ut.matrixWorld,j.matrix),j.matrixWorldInverse.copy(j.matrixWorld).invert()}this.updateCamera=function(j){if(i===null)return;_.texture!==null&&(j.near=_.depthNear,j.far=_.depthFar),M.near=D.near=C.near=j.near,M.far=D.far=C.far=j.far,(I!==M.near||B!==M.far)&&(i.updateRenderState({depthNear:M.near,depthFar:M.far}),I=M.near,B=M.far,C.near=I,C.far=B,D.near=I,D.far=B,C.updateProjectionMatrix(),D.updateProjectionMatrix(),j.updateProjectionMatrix());const ut=j.parent,Et=M.cameras;$(M,ut);for(let _t=0;_t<Et.length;_t++)$(Et[_t],ut);Et.length===2?k(M,C,D):M.projectionMatrix.copy(C.projectionMatrix),et(j,M,ut)};function et(j,ut,Et){Et===null?j.matrix.copy(ut.matrixWorld):(j.matrix.copy(Et.matrixWorld),j.matrix.invert(),j.matrix.multiply(ut.matrixWorld)),j.matrix.decompose(j.position,j.quaternion,j.scale),j.updateMatrixWorld(!0),j.projectionMatrix.copy(ut.projectionMatrix),j.projectionMatrixInverse.copy(ut.projectionMatrixInverse),j.isPerspectiveCamera&&(j.fov=fs*2*Math.atan(1/j.projectionMatrix.elements[5]),j.zoom=1)}this.getCamera=function(){return M},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(j){c=j,d!==null&&(d.fixedFoveation=j),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=j)},this.hasDepthSensing=function(){return _.texture!==null};let mt=null;function Lt(j,ut){if(h=ut.getViewerPose(l||r),g=ut,h!==null){const Et=h.views;f!==null&&(t.setRenderTargetFramebuffer(y,f.framebuffer),t.setRenderTarget(y));let _t=!1;Et.length!==M.cameras.length&&(M.cameras.length=0,_t=!0);for(let zt=0;zt<Et.length;zt++){const N=Et[zt];let Gt=null;if(f!==null)Gt=f.getViewport(N);else{const dt=u.getViewSubImage(d,N);Gt=dt.viewport,zt===0&&(t.setRenderTargetTextures(y,dt.colorTexture,d.ignoreDepthValues?void 0:dt.depthStencilTexture),t.setRenderTarget(y))}let Q=E[zt];Q===void 0&&(Q=new Ge,Q.layers.enable(zt),Q.viewport=new me,E[zt]=Q),Q.matrix.fromArray(N.transform.matrix),Q.matrix.decompose(Q.position,Q.quaternion,Q.scale),Q.projectionMatrix.fromArray(N.projectionMatrix),Q.projectionMatrixInverse.copy(Q.projectionMatrix).invert(),Q.viewport.set(Gt.x,Gt.y,Gt.width,Gt.height),zt===0&&(M.matrix.copy(Q.matrix),M.matrix.decompose(M.position,M.quaternion,M.scale)),_t===!0&&M.cameras.push(Q)}const Ft=i.enabledFeatures;if(Ft&&Ft.includes("depth-sensing")){const zt=u.getDepthInformation(Et[0]);zt&&zt.isValid&&zt.texture&&_.init(t,zt,i.renderState)}}for(let Et=0;Et<x.length;Et++){const _t=S[Et],Ft=x[Et];_t!==null&&Ft!==void 0&&Ft.update(_t,ut,l||r)}_.render(t,M),mt&&mt(j,ut),ut.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ut}),g=null}const Nt=new qc;Nt.setAnimationLoop(Lt),this.setAnimationLoop=function(j){mt=j},this.dispose=function(){}}}const Jn=new dn,Bm=new de;function km(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,Wc(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,y,x,S){p.isMeshBasicMaterial||p.isMeshLambertMaterial?o(m,p):p.isMeshToonMaterial?(o(m,p),u(m,p)):p.isMeshPhongMaterial?(o(m,p),h(m,p)):p.isMeshStandardMaterial?(o(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,S)):p.isMeshMatcapMaterial?(o(m,p),g(m,p)):p.isMeshDepthMaterial?o(m,p):p.isMeshDistanceMaterial?(o(m,p),_(m,p)):p.isMeshNormalMaterial?o(m,p):p.isLineBasicMaterial?(r(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,y,x):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function o(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ce&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ce&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const y=t.get(p),x=y.envMap,S=y.envMapRotation;if(x&&(m.envMap.value=x,Jn.copy(S),Jn.x*=-1,Jn.y*=-1,Jn.z*=-1,x.isCubeTexture&&x.isRenderTargetTexture===!1&&(Jn.y*=-1,Jn.z*=-1),m.envMapRotation.value.setFromMatrix4(Bm.makeRotationFromEuler(Jn)),m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const R=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*R,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function r(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,y,x){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*y,m.scale.value=x*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,y){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ce&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=y.texture,m.transmissionSamplerSize.value.set(y.width,y.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function _(m,p){const y=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(y.matrixWorld),m.nearDistance.value=y.shadow.camera.near,m.farDistance.value=y.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Hm(s,t,e,n){let i={},o={},r=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function c(y,x){const S=x.program;n.uniformBlockBinding(y,S)}function l(y,x){let S=i[y.id];S===void 0&&(g(y),S=h(y),i[y.id]=S,y.addEventListener("dispose",m));const R=x.program;n.updateUBOMapping(y,R);const A=t.render.frame;o[y.id]!==A&&(d(y),o[y.id]=A)}function h(y){const x=u();y.__bindingPointIndex=x;const S=s.createBuffer(),R=y.__size,A=y.usage;return s.bindBuffer(s.UNIFORM_BUFFER,S),s.bufferData(s.UNIFORM_BUFFER,R,A),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,x,S),S}function u(){for(let y=0;y<a;y++)if(r.indexOf(y)===-1)return r.push(y),y;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(y){const x=i[y.id],S=y.uniforms,R=y.__cache;s.bindBuffer(s.UNIFORM_BUFFER,x);for(let A=0,C=S.length;A<C;A++){const D=Array.isArray(S[A])?S[A]:[S[A]];for(let E=0,M=D.length;E<M;E++){const I=D[E];if(f(I,A,E,R)===!0){const B=I.__offset,L=Array.isArray(I.value)?I.value:[I.value];let W=0;for(let U=0;U<L.length;U++){const K=L[U],it=_(K);typeof K=="number"||typeof K=="boolean"?(I.__data[0]=K,s.bufferSubData(s.UNIFORM_BUFFER,B+W,I.__data)):K.isMatrix3?(I.__data[0]=K.elements[0],I.__data[1]=K.elements[1],I.__data[2]=K.elements[2],I.__data[3]=0,I.__data[4]=K.elements[3],I.__data[5]=K.elements[4],I.__data[6]=K.elements[5],I.__data[7]=0,I.__data[8]=K.elements[6],I.__data[9]=K.elements[7],I.__data[10]=K.elements[8],I.__data[11]=0):(K.toArray(I.__data,W),W+=it.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,B,I.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(y,x,S,R){const A=y.value,C=x+"_"+S;if(R[C]===void 0)return typeof A=="number"||typeof A=="boolean"?R[C]=A:R[C]=A.clone(),!0;{const D=R[C];if(typeof A=="number"||typeof A=="boolean"){if(D!==A)return R[C]=A,!0}else if(D.equals(A)===!1)return D.copy(A),!0}return!1}function g(y){const x=y.uniforms;let S=0;const R=16;for(let C=0,D=x.length;C<D;C++){const E=Array.isArray(x[C])?x[C]:[x[C]];for(let M=0,I=E.length;M<I;M++){const B=E[M],L=Array.isArray(B.value)?B.value:[B.value];for(let W=0,U=L.length;W<U;W++){const K=L[W],it=_(K),k=S%R;k!==0&&R-k<it.boundary&&(S+=R-k),B.__data=new Float32Array(it.storage/Float32Array.BYTES_PER_ELEMENT),B.__offset=S,S+=it.storage}}}const A=S%R;return A>0&&(S+=R-A),y.__size=S,y.__cache={},this}function _(y){const x={boundary:0,storage:0};return typeof y=="number"||typeof y=="boolean"?(x.boundary=4,x.storage=4):y.isVector2?(x.boundary=8,x.storage=8):y.isVector3||y.isColor?(x.boundary=16,x.storage=12):y.isVector4?(x.boundary=16,x.storage=16):y.isMatrix3?(x.boundary=48,x.storage=48):y.isMatrix4?(x.boundary=64,x.storage=64):y.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",y),x}function m(y){const x=y.target;x.removeEventListener("dispose",m);const S=r.indexOf(x.__bindingPointIndex);r.splice(S,1),s.deleteBuffer(i[x.id]),delete i[x.id],delete o[x.id]}function p(){for(const y in i)s.deleteBuffer(i[y]);r=[],i={},o={}}return{bind:c,update:l,dispose:p}}class Gm{constructor(t={}){const{canvas:e=Dh(),context:n=null,depth:i=!0,stencil:o=!1,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");d=n.getContextAttributes().alpha}else d=r;const f=new Uint32Array(4),g=new Int32Array(4);let _=null,m=null;const p=[],y=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=ke,this._useLegacyLights=!1,this.toneMapping=Gn,this.toneMappingExposure=1;const x=this;let S=!1,R=0,A=0,C=null,D=-1,E=null;const M=new me,I=new me;let B=null;const L=new jt(0);let W=0,U=e.width,K=e.height,it=1,k=null,$=null;const et=new me(0,0,U,K),mt=new me(0,0,U,K);let Lt=!1;const Nt=new Tr;let j=!1,ut=!1;const Et=new de,_t=new P,Ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function zt(){return C===null?it:1}let N=n;function Gt(b,z){return e.getContext(b,z)}try{const b={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Sr}`),e.addEventListener("webglcontextlost",v,!1),e.addEventListener("webglcontextrestored",O,!1),e.addEventListener("webglcontextcreationerror",H,!1),N===null){const z="webgl2";if(N=Gt(z,b),N===null)throw Gt(z)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(b){throw console.error("THREE.WebGLRenderer: "+b.message),b}let Q,dt,nt,J,X,at,yt,T,w,F,Y,rt,tt,bt,gt,ct,Pt,xt,ft,St,Tt,pt,Dt,Vt;function Ot(){Q=new Kf(N),Q.init(),pt=new Im(N,Q),dt=new Wf(N,Q,t,pt),nt=new Rm(N),J=new Qf(N),X=new gm,at=new Lm(N,Q,nt,X,dt,pt,J),yt=new Yf(x),T=new jf(x),w=new ou(N),Dt=new Gf(N,w),F=new Jf(N,w,J,Dt),Y=new ep(N,F,w,J),ft=new tp(N,dt,at),ct=new Xf(X),rt=new mm(x,yt,T,Q,dt,Dt,ct),tt=new km(x,X),bt=new xm,gt=new Em(Q),xt=new Hf(x,yt,T,nt,Y,d,c),Pt=new Pm(x,Y,dt),Vt=new Hm(N,J,dt,nt),St=new Vf(N,Q,J),Tt=new $f(N,Q,J),J.programs=rt.programs,x.capabilities=dt,x.extensions=Q,x.properties=X,x.renderLists=bt,x.shadowMap=Pt,x.state=nt,x.info=J}Ot();const Wt=new Fm(x,N);this.xr=Wt,this.getContext=function(){return N},this.getContextAttributes=function(){return N.getContextAttributes()},this.forceContextLoss=function(){const b=Q.get("WEBGL_lose_context");b&&b.loseContext()},this.forceContextRestore=function(){const b=Q.get("WEBGL_lose_context");b&&b.restoreContext()},this.getPixelRatio=function(){return it},this.setPixelRatio=function(b){b!==void 0&&(it=b,this.setSize(U,K,!1))},this.getSize=function(b){return b.set(U,K)},this.setSize=function(b,z,Z=!0){if(Wt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}U=b,K=z,e.width=Math.floor(b*it),e.height=Math.floor(z*it),Z===!0&&(e.style.width=b+"px",e.style.height=z+"px"),this.setViewport(0,0,b,z)},this.getDrawingBufferSize=function(b){return b.set(U*it,K*it).floor()},this.setDrawingBufferSize=function(b,z,Z){U=b,K=z,it=Z,e.width=Math.floor(b*Z),e.height=Math.floor(z*Z),this.setViewport(0,0,b,z)},this.getCurrentViewport=function(b){return b.copy(M)},this.getViewport=function(b){return b.copy(et)},this.setViewport=function(b,z,Z,V){b.isVector4?et.set(b.x,b.y,b.z,b.w):et.set(b,z,Z,V),nt.viewport(M.copy(et).multiplyScalar(it).round())},this.getScissor=function(b){return b.copy(mt)},this.setScissor=function(b,z,Z,V){b.isVector4?mt.set(b.x,b.y,b.z,b.w):mt.set(b,z,Z,V),nt.scissor(I.copy(mt).multiplyScalar(it).round())},this.getScissorTest=function(){return Lt},this.setScissorTest=function(b){nt.setScissorTest(Lt=b)},this.setOpaqueSort=function(b){k=b},this.setTransparentSort=function(b){$=b},this.getClearColor=function(b){return b.copy(xt.getClearColor())},this.setClearColor=function(){xt.setClearColor.apply(xt,arguments)},this.getClearAlpha=function(){return xt.getClearAlpha()},this.setClearAlpha=function(){xt.setClearAlpha.apply(xt,arguments)},this.clear=function(b=!0,z=!0,Z=!0){let V=0;if(b){let G=!1;if(C!==null){const st=C.texture.format;G=st===Nc||st===Uc||st===Dc}if(G){const st=C.texture.type,Mt=st===Vn||st===Xi||st===Pc||st===_s||st===Lc||st===Ic,wt=xt.getClearColor(),It=xt.getClearAlpha(),Ut=wt.r,Bt=wt.g,Zt=wt.b;Mt?(f[0]=Ut,f[1]=Bt,f[2]=Zt,f[3]=It,N.clearBufferuiv(N.COLOR,0,f)):(g[0]=Ut,g[1]=Bt,g[2]=Zt,g[3]=It,N.clearBufferiv(N.COLOR,0,g))}else V|=N.COLOR_BUFFER_BIT}z&&(V|=N.DEPTH_BUFFER_BIT),Z&&(V|=N.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),N.clear(V)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",v,!1),e.removeEventListener("webglcontextrestored",O,!1),e.removeEventListener("webglcontextcreationerror",H,!1),bt.dispose(),gt.dispose(),X.dispose(),yt.dispose(),T.dispose(),Y.dispose(),Dt.dispose(),Vt.dispose(),rt.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",Kt),Wt.removeEventListener("sessionend",he),Qt.stop()};function v(b){b.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),S=!0}function O(){console.log("THREE.WebGLRenderer: Context Restored."),S=!1;const b=J.autoReset,z=Pt.enabled,Z=Pt.autoUpdate,V=Pt.needsUpdate,G=Pt.type;Ot(),J.autoReset=b,Pt.enabled=z,Pt.autoUpdate=Z,Pt.needsUpdate=V,Pt.type=G}function H(b){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",b.statusMessage)}function lt(b){const z=b.target;z.removeEventListener("dispose",lt),vt(z)}function vt(b){Ht(b),X.remove(b)}function Ht(b){const z=X.get(b).programs;z!==void 0&&(z.forEach(function(Z){rt.releaseProgram(Z)}),b.isShaderMaterial&&rt.releaseShaderCache(b))}this.renderBufferDirect=function(b,z,Z,V,G,st){z===null&&(z=Ft);const Mt=G.isMesh&&G.matrixWorld.determinant()<0,wt=vs(b,z,Z,V,G);nt.setMaterial(V,Mt);let It=Z.index,Ut=1;if(V.wireframe===!0){if(It=F.getWireframeAttribute(Z),It===void 0)return;Ut=2}const Bt=Z.drawRange,Zt=Z.attributes.position;let _e=Bt.start*Ut,we=(Bt.start+Bt.count)*Ut;st!==null&&(_e=Math.max(_e,st.start*Ut),we=Math.min(we,(st.start+st.count)*Ut)),It!==null?(_e=Math.max(_e,0),we=Math.min(we,It.count)):Zt!=null&&(_e=Math.max(_e,0),we=Math.min(we,Zt.count));const Re=we-_e;if(Re<0||Re===1/0)return;Dt.setup(G,V,wt,Z,It);let Xe,ee=St;if(It!==null&&(Xe=w.get(It),ee=Tt,ee.setIndex(Xe)),G.isMesh)V.wireframe===!0?(nt.setLineWidth(V.wireframeLinewidth*zt()),ee.setMode(N.LINES)):ee.setMode(N.TRIANGLES);else if(G.isLine){let Yt=V.linewidth;Yt===void 0&&(Yt=1),nt.setLineWidth(Yt*zt()),G.isLineSegments?ee.setMode(N.LINES):G.isLineLoop?ee.setMode(N.LINE_LOOP):ee.setMode(N.LINE_STRIP)}else G.isPoints?ee.setMode(N.POINTS):G.isSprite&&ee.setMode(N.TRIANGLES);if(G.isBatchedMesh)G._multiDrawInstances!==null?ee.renderMultiDrawInstances(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount,G._multiDrawInstances):ee.renderMultiDraw(G._multiDrawStarts,G._multiDrawCounts,G._multiDrawCount);else if(G.isInstancedMesh)ee.renderInstances(_e,Re,G.count);else if(Z.isInstancedBufferGeometry){const Yt=Z._maxInstanceCount!==void 0?Z._maxInstanceCount:1/0,gn=Math.min(Z.instanceCount,Yt);ee.renderInstances(_e,Re,gn)}else ee.render(_e,Re)};function Xt(b,z,Z){b.transparent===!0&&b.side===Ve&&b.forceSinglePass===!1?(b.side=Ce,b.needsUpdate=!0,We(b,z,Z),b.side=on,b.needsUpdate=!0,We(b,z,Z),b.side=Ve):We(b,z,Z)}this.compile=function(b,z,Z=null){Z===null&&(Z=b),m=gt.get(Z),m.init(z),y.push(m),Z.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),b!==Z&&b.traverseVisible(function(G){G.isLight&&G.layers.test(z.layers)&&(m.pushLight(G),G.castShadow&&m.pushShadow(G))}),m.setupLights(x._useLegacyLights);const V=new Set;return b.traverse(function(G){const st=G.material;if(st)if(Array.isArray(st))for(let Mt=0;Mt<st.length;Mt++){const wt=st[Mt];Xt(wt,Z,G),V.add(wt)}else Xt(st,Z,G),V.add(st)}),y.pop(),m=null,V},this.compileAsync=function(b,z,Z=null){const V=this.compile(b,z,Z);return new Promise(G=>{function st(){if(V.forEach(function(Mt){X.get(Mt).currentProgram.isReady()&&V.delete(Mt)}),V.size===0){G(b);return}setTimeout(st,10)}Q.get("KHR_parallel_shader_compile")!==null?st():setTimeout(st,10)})};let ne=null;function le(b){ne&&ne(b)}function Kt(){Qt.stop()}function he(){Qt.start()}const Qt=new qc;Qt.setAnimationLoop(le),typeof self<"u"&&Qt.setContext(self),this.setAnimationLoop=function(b){ne=b,Wt.setAnimationLoop(b),b===null?Qt.stop():Qt.start()},Wt.addEventListener("sessionstart",Kt),Wt.addEventListener("sessionend",he),this.render=function(b,z){if(z!==void 0&&z.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(S===!0)return;b.matrixWorldAutoUpdate===!0&&b.updateMatrixWorld(),z.parent===null&&z.matrixWorldAutoUpdate===!0&&z.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(z),z=Wt.getCamera()),b.isScene===!0&&b.onBeforeRender(x,b,z,C),m=gt.get(b,y.length),m.init(z),y.push(m),Et.multiplyMatrices(z.projectionMatrix,z.matrixWorldInverse),Nt.setFromProjectionMatrix(Et),ut=this.localClippingEnabled,j=ct.init(this.clippingPlanes,ut),_=bt.get(b,p.length),_.init(),p.push(_),Je(b,z,0,x.sortObjects),_.finish(),x.sortObjects===!0&&_.sort(k,$);const Z=Wt.enabled===!1||Wt.isPresenting===!1||Wt.hasDepthSensing()===!1;Z&&xt.addToRenderList(_,b),this.info.render.frame++,j===!0&&ct.beginShadows();const V=m.state.shadowsArray;Pt.render(V,b,z),j===!0&&ct.endShadows(),this.info.autoReset===!0&&this.info.reset();const G=_.opaque,st=_.transmissive;if(m.setupLights(x._useLegacyLights),z.isArrayCamera){const Mt=z.cameras;if(st.length>0)for(let wt=0,It=Mt.length;wt<It;wt++){const Ut=Mt[wt];rn(G,st,b,Ut)}Z&&xt.render(b);for(let wt=0,It=Mt.length;wt<It;wt++){const Ut=Mt[wt];ze(_,b,Ut,Ut.viewport)}}else st.length>0&&rn(G,st,b,z),Z&&xt.render(b),ze(_,b,z);C!==null&&(at.updateMultisampleRenderTarget(C),at.updateRenderTargetMipmap(C)),b.isScene===!0&&b.onAfterRender(x,b,z),Dt.resetDefaultState(),D=-1,E=null,y.pop(),y.length>0?(m=y[y.length-1],j===!0&&ct.setGlobalState(x.clippingPlanes,m.state.camera)):m=null,p.pop(),p.length>0?_=p[p.length-1]:_=null};function Je(b,z,Z,V){if(b.visible===!1)return;if(b.layers.test(z.layers)){if(b.isGroup)Z=b.renderOrder;else if(b.isLOD)b.autoUpdate===!0&&b.update(z);else if(b.isLight)m.pushLight(b),b.castShadow&&m.pushShadow(b);else if(b.isSprite){if(!b.frustumCulled||Nt.intersectsSprite(b)){V&&_t.setFromMatrixPosition(b.matrixWorld).applyMatrix4(Et);const Mt=Y.update(b),wt=b.material;wt.visible&&_.push(b,Mt,wt,Z,_t.z,null)}}else if((b.isMesh||b.isLine||b.isPoints)&&(!b.frustumCulled||Nt.intersectsObject(b))){const Mt=Y.update(b),wt=b.material;if(V&&(b.boundingSphere!==void 0?(b.boundingSphere===null&&b.computeBoundingSphere(),_t.copy(b.boundingSphere.center)):(Mt.boundingSphere===null&&Mt.computeBoundingSphere(),_t.copy(Mt.boundingSphere.center)),_t.applyMatrix4(b.matrixWorld).applyMatrix4(Et)),Array.isArray(wt)){const It=Mt.groups;for(let Ut=0,Bt=It.length;Ut<Bt;Ut++){const Zt=It[Ut],_e=wt[Zt.materialIndex];_e&&_e.visible&&_.push(b,Mt,_e,Z,_t.z,Zt)}}else wt.visible&&_.push(b,Mt,wt,Z,_t.z,null)}}const st=b.children;for(let Mt=0,wt=st.length;Mt<wt;Mt++)Je(st[Mt],z,Z,V)}function ze(b,z,Z,V){const G=b.opaque,st=b.transmissive,Mt=b.transparent;m.setupLightsView(Z),j===!0&&ct.setGlobalState(x.clippingPlanes,Z),V&&nt.viewport(M.copy(V)),G.length>0&&$e(G,z,Z),st.length>0&&$e(st,z,Z),Mt.length>0&&$e(Mt,z,Z),nt.buffers.depth.setTest(!0),nt.buffers.depth.setMask(!0),nt.buffers.color.setMask(!0),nt.setPolygonOffset(!1)}function rn(b,z,Z,V){if((Z.isScene===!0?Z.overrideMaterial:null)!==null)return;m.state.transmissionRenderTarget[V.id]===void 0&&(m.state.transmissionRenderTarget[V.id]=new ri(1,1,{generateMipmaps:!0,type:Q.has("EXT_color_buffer_half_float")||Q.has("EXT_color_buffer_float")?ho:Vn,minFilter:ni,samples:4,stencilBuffer:o,resolveDepthBuffer:!1,resolveStencilBuffer:!1}));const st=m.state.transmissionRenderTarget[V.id],Mt=V.viewport||M;st.setSize(Mt.z,Mt.w);const wt=x.getRenderTarget();x.setRenderTarget(st),x.getClearColor(L),W=x.getClearAlpha(),W<1&&x.setClearColor(16777215,.5),x.clear();const It=x.toneMapping;x.toneMapping=Gn;const Ut=V.viewport;if(V.viewport!==void 0&&(V.viewport=void 0),m.setupLightsView(V),j===!0&&ct.setGlobalState(x.clippingPlanes,V),$e(b,Z,V),at.updateMultisampleRenderTarget(st),at.updateRenderTargetMipmap(st),Q.has("WEBGL_multisampled_render_to_texture")===!1){let Bt=!1;for(let Zt=0,_e=z.length;Zt<_e;Zt++){const we=z[Zt],Re=we.object,Xe=we.geometry,ee=we.material,Yt=we.group;if(ee.side===Ve&&Re.layers.test(V.layers)){const gn=ee.side;ee.side=Ce,ee.needsUpdate=!0,mn(Re,Z,V,Xe,ee,Yt),ee.side=gn,ee.needsUpdate=!0,Bt=!0}}Bt===!0&&(at.updateMultisampleRenderTarget(st),at.updateRenderTargetMipmap(st))}x.setRenderTarget(wt),x.setClearColor(L,W),Ut!==void 0&&(V.viewport=Ut),x.toneMapping=It}function $e(b,z,Z){const V=z.isScene===!0?z.overrideMaterial:null;for(let G=0,st=b.length;G<st;G++){const Mt=b[G],wt=Mt.object,It=Mt.geometry,Ut=V===null?Mt.material:V,Bt=Mt.group;wt.layers.test(Z.layers)&&mn(wt,z,Z,It,Ut,Bt)}}function mn(b,z,Z,V,G,st){b.onBeforeRender(x,z,Z,V,G,st),b.modelViewMatrix.multiplyMatrices(Z.matrixWorldInverse,b.matrixWorld),b.normalMatrix.getNormalMatrix(b.modelViewMatrix),G.onBeforeRender(x,z,Z,V,b,st),G.transparent===!0&&G.side===Ve&&G.forceSinglePass===!1?(G.side=Ce,G.needsUpdate=!0,x.renderBufferDirect(Z,z,V,G,b,st),G.side=on,G.needsUpdate=!0,x.renderBufferDirect(Z,z,V,G,b,st),G.side=Ve):x.renderBufferDirect(Z,z,V,G,b,st),b.onAfterRender(x,z,Z,V,G,st)}function We(b,z,Z){z.isScene!==!0&&(z=Ft);const V=X.get(b),G=m.state.lights,st=m.state.shadowsArray,Mt=G.state.version,wt=rt.getParameters(b,G.state,st,z,Z),It=rt.getProgramCacheKey(wt);let Ut=V.programs;V.environment=b.isMeshStandardMaterial?z.environment:null,V.fog=z.fog,V.envMap=(b.isMeshStandardMaterial?T:yt).get(b.envMap||V.environment),V.envMapRotation=V.environment!==null&&b.envMap===null?z.environmentRotation:b.envMapRotation,Ut===void 0&&(b.addEventListener("dispose",lt),Ut=new Map,V.programs=Ut);let Bt=Ut.get(It);if(Bt!==void 0){if(V.currentProgram===Bt&&V.lightsStateVersion===Mt)return Ki(b,wt),Bt}else wt.uniforms=rt.getUniforms(b),b.onBuild(Z,wt,x),b.onBeforeCompile(wt,x),Bt=rt.acquireProgram(wt,It),Ut.set(It,Bt),V.uniforms=wt.uniforms;const Zt=V.uniforms;return(!b.isShaderMaterial&&!b.isRawShaderMaterial||b.clipping===!0)&&(Zt.clippingPlanes=ct.uniform),Ki(b,wt),V.needsLights=Ms(b),V.lightsStateVersion=Mt,V.needsLights&&(Zt.ambientLightColor.value=G.state.ambient,Zt.lightProbe.value=G.state.probe,Zt.directionalLights.value=G.state.directional,Zt.directionalLightShadows.value=G.state.directionalShadow,Zt.spotLights.value=G.state.spot,Zt.spotLightShadows.value=G.state.spotShadow,Zt.rectAreaLights.value=G.state.rectArea,Zt.ltc_1.value=G.state.rectAreaLTC1,Zt.ltc_2.value=G.state.rectAreaLTC2,Zt.pointLights.value=G.state.point,Zt.pointLightShadows.value=G.state.pointShadow,Zt.hemisphereLights.value=G.state.hemi,Zt.directionalShadowMap.value=G.state.directionalShadowMap,Zt.directionalShadowMatrix.value=G.state.directionalShadowMatrix,Zt.spotShadowMap.value=G.state.spotShadowMap,Zt.spotLightMatrix.value=G.state.spotLightMatrix,Zt.spotLightMap.value=G.state.spotLightMap,Zt.pointShadowMap.value=G.state.pointShadowMap,Zt.pointShadowMatrix.value=G.state.pointShadowMatrix),V.currentProgram=Bt,V.uniformsList=null,Bt}function Qe(b){if(b.uniformsList===null){const z=b.currentProgram.getUniforms();b.uniformsList=Ks.seqWithValue(z.seq,b.uniforms)}return b.uniformsList}function Ki(b,z){const Z=X.get(b);Z.outputColorSpace=z.outputColorSpace,Z.batching=z.batching,Z.instancing=z.instancing,Z.instancingColor=z.instancingColor,Z.instancingMorph=z.instancingMorph,Z.skinning=z.skinning,Z.morphTargets=z.morphTargets,Z.morphNormals=z.morphNormals,Z.morphColors=z.morphColors,Z.morphTargetsCount=z.morphTargetsCount,Z.numClippingPlanes=z.numClippingPlanes,Z.numIntersection=z.numClipIntersection,Z.vertexAlphas=z.vertexAlphas,Z.vertexTangents=z.vertexTangents,Z.toneMapping=z.toneMapping}function vs(b,z,Z,V,G){z.isScene!==!0&&(z=Ft),at.resetTextureUnits();const st=z.fog,Mt=V.isMeshStandardMaterial?z.environment:null,wt=C===null?x.outputColorSpace:C.isXRRenderTarget===!0?C.texture.colorSpace:Wn,It=(V.isMeshStandardMaterial?T:yt).get(V.envMap||Mt),Ut=V.vertexColors===!0&&!!Z.attributes.color&&Z.attributes.color.itemSize===4,Bt=!!Z.attributes.tangent&&(!!V.normalMap||V.anisotropy>0),Zt=!!Z.morphAttributes.position,_e=!!Z.morphAttributes.normal,we=!!Z.morphAttributes.color;let Re=Gn;V.toneMapped&&(C===null||C.isXRRenderTarget===!0)&&(Re=x.toneMapping);const Xe=Z.morphAttributes.position||Z.morphAttributes.normal||Z.morphAttributes.color,ee=Xe!==void 0?Xe.length:0,Yt=X.get(V),gn=m.state.lights;if(j===!0&&(ut===!0||b!==E)){const Ye=b===E&&V.id===D;ct.setState(V,b,Ye)}let fe=!1;V.version===Yt.__version?(Yt.needsLights&&Yt.lightsStateVersion!==gn.state.version||Yt.outputColorSpace!==wt||G.isBatchedMesh&&Yt.batching===!1||!G.isBatchedMesh&&Yt.batching===!0||G.isInstancedMesh&&Yt.instancing===!1||!G.isInstancedMesh&&Yt.instancing===!0||G.isSkinnedMesh&&Yt.skinning===!1||!G.isSkinnedMesh&&Yt.skinning===!0||G.isInstancedMesh&&Yt.instancingColor===!0&&G.instanceColor===null||G.isInstancedMesh&&Yt.instancingColor===!1&&G.instanceColor!==null||G.isInstancedMesh&&Yt.instancingMorph===!0&&G.morphTexture===null||G.isInstancedMesh&&Yt.instancingMorph===!1&&G.morphTexture!==null||Yt.envMap!==It||V.fog===!0&&Yt.fog!==st||Yt.numClippingPlanes!==void 0&&(Yt.numClippingPlanes!==ct.numPlanes||Yt.numIntersection!==ct.numIntersection)||Yt.vertexAlphas!==Ut||Yt.vertexTangents!==Bt||Yt.morphTargets!==Zt||Yt.morphNormals!==_e||Yt.morphColors!==we||Yt.toneMapping!==Re||Yt.morphTargetsCount!==ee)&&(fe=!0):(fe=!0,Yt.__version=V.version);let Xn=Yt.currentProgram;fe===!0&&(Xn=We(V,z,G));let Ur=!1,Ji=!1,yo=!1;const Le=Xn.getUniforms(),Tn=Yt.uniforms;if(nt.useProgram(Xn.program)&&(Ur=!0,Ji=!0,yo=!0),V.id!==D&&(D=V.id,Ji=!0),Ur||E!==b){Le.setValue(N,"projectionMatrix",b.projectionMatrix),Le.setValue(N,"viewMatrix",b.matrixWorldInverse);const Ye=Le.map.cameraPosition;Ye!==void 0&&Ye.setValue(N,_t.setFromMatrixPosition(b.matrixWorld)),dt.logarithmicDepthBuffer&&Le.setValue(N,"logDepthBufFC",2/(Math.log(b.far+1)/Math.LN2)),(V.isMeshPhongMaterial||V.isMeshToonMaterial||V.isMeshLambertMaterial||V.isMeshBasicMaterial||V.isMeshStandardMaterial||V.isShaderMaterial)&&Le.setValue(N,"isOrthographic",b.isOrthographicCamera===!0),E!==b&&(E=b,Ji=!0,yo=!0)}if(G.isSkinnedMesh){Le.setOptional(N,G,"bindMatrix"),Le.setOptional(N,G,"bindMatrixInverse");const Ye=G.skeleton;Ye&&(Ye.boneTexture===null&&Ye.computeBoneTexture(),Le.setValue(N,"boneTexture",Ye.boneTexture,at))}G.isBatchedMesh&&(Le.setOptional(N,G,"batchingTexture"),Le.setValue(N,"batchingTexture",G._matricesTexture,at));const So=Z.morphAttributes;if((So.position!==void 0||So.normal!==void 0||So.color!==void 0)&&ft.update(G,Z,Xn),(Ji||Yt.receiveShadow!==G.receiveShadow)&&(Yt.receiveShadow=G.receiveShadow,Le.setValue(N,"receiveShadow",G.receiveShadow)),V.isMeshGouraudMaterial&&V.envMap!==null&&(Tn.envMap.value=It,Tn.flipEnvMap.value=It.isCubeTexture&&It.isRenderTargetTexture===!1?-1:1),V.isMeshStandardMaterial&&V.envMap===null&&z.environment!==null&&(Tn.envMapIntensity.value=z.environmentIntensity),Ji&&(Le.setValue(N,"toneMappingExposure",x.toneMappingExposure),Yt.needsLights&&di(Tn,yo),st&&V.fog===!0&&tt.refreshFogUniforms(Tn,st),tt.refreshMaterialUniforms(Tn,V,it,K,m.state.transmissionRenderTarget[b.id]),Ks.upload(N,Qe(Yt),Tn,at)),V.isShaderMaterial&&V.uniformsNeedUpdate===!0&&(Ks.upload(N,Qe(Yt),Tn,at),V.uniformsNeedUpdate=!1),V.isSpriteMaterial&&Le.setValue(N,"center",G.center),Le.setValue(N,"modelViewMatrix",G.modelViewMatrix),Le.setValue(N,"normalMatrix",G.normalMatrix),Le.setValue(N,"modelMatrix",G.matrixWorld),V.isShaderMaterial||V.isRawShaderMaterial){const Ye=V.uniformsGroups;for(let wo=0,dl=Ye.length;wo<dl;wo++){const Nr=Ye[wo];Vt.update(Nr,Xn),Vt.bind(Nr,Xn)}}return Xn}function di(b,z){b.ambientLightColor.needsUpdate=z,b.lightProbe.needsUpdate=z,b.directionalLights.needsUpdate=z,b.directionalLightShadows.needsUpdate=z,b.pointLights.needsUpdate=z,b.pointLightShadows.needsUpdate=z,b.spotLights.needsUpdate=z,b.spotLightShadows.needsUpdate=z,b.rectAreaLights.needsUpdate=z,b.hemisphereLights.needsUpdate=z}function Ms(b){return b.isMeshLambertMaterial||b.isMeshToonMaterial||b.isMeshPhongMaterial||b.isMeshStandardMaterial||b.isShadowMaterial||b.isShaderMaterial&&b.lights===!0}this.getActiveCubeFace=function(){return R},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return C},this.setRenderTargetTextures=function(b,z,Z){X.get(b.texture).__webglTexture=z,X.get(b.depthTexture).__webglTexture=Z;const V=X.get(b);V.__hasExternalTextures=!0,V.__autoAllocateDepthBuffer=Z===void 0,V.__autoAllocateDepthBuffer||Q.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),V.__useRenderToTexture=!1)},this.setRenderTargetFramebuffer=function(b,z){const Z=X.get(b);Z.__webglFramebuffer=z,Z.__useDefaultFramebuffer=z===void 0},this.setRenderTarget=function(b,z=0,Z=0){C=b,R=z,A=Z;let V=!0,G=null,st=!1,Mt=!1;if(b){const It=X.get(b);It.__useDefaultFramebuffer!==void 0?(nt.bindFramebuffer(N.FRAMEBUFFER,null),V=!1):It.__webglFramebuffer===void 0?at.setupRenderTarget(b):It.__hasExternalTextures&&at.rebindTextures(b,X.get(b.texture).__webglTexture,X.get(b.depthTexture).__webglTexture);const Ut=b.texture;(Ut.isData3DTexture||Ut.isDataArrayTexture||Ut.isCompressedArrayTexture)&&(Mt=!0);const Bt=X.get(b).__webglFramebuffer;b.isWebGLCubeRenderTarget?(Array.isArray(Bt[z])?G=Bt[z][Z]:G=Bt[z],st=!0):b.samples>0&&at.useMultisampledRTT(b)===!1?G=X.get(b).__webglMultisampledFramebuffer:Array.isArray(Bt)?G=Bt[Z]:G=Bt,M.copy(b.viewport),I.copy(b.scissor),B=b.scissorTest}else M.copy(et).multiplyScalar(it).floor(),I.copy(mt).multiplyScalar(it).floor(),B=Lt;if(nt.bindFramebuffer(N.FRAMEBUFFER,G)&&V&&nt.drawBuffers(b,G),nt.viewport(M),nt.scissor(I),nt.setScissorTest(B),st){const It=X.get(b.texture);N.framebufferTexture2D(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,N.TEXTURE_CUBE_MAP_POSITIVE_X+z,It.__webglTexture,Z)}else if(Mt){const It=X.get(b.texture),Ut=z||0;N.framebufferTextureLayer(N.FRAMEBUFFER,N.COLOR_ATTACHMENT0,It.__webglTexture,Z||0,Ut)}D=-1},this.readRenderTargetPixels=function(b,z,Z,V,G,st,Mt){if(!(b&&b.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let wt=X.get(b).__webglFramebuffer;if(b.isWebGLCubeRenderTarget&&Mt!==void 0&&(wt=wt[Mt]),wt){nt.bindFramebuffer(N.FRAMEBUFFER,wt);try{const It=b.texture,Ut=It.format,Bt=It.type;if(!dt.textureFormatReadable(Ut)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!dt.textureTypeReadable(Bt)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}z>=0&&z<=b.width-V&&Z>=0&&Z<=b.height-G&&N.readPixels(z,Z,V,G,pt.convert(Ut),pt.convert(Bt),st)}finally{const It=C!==null?X.get(C).__webglFramebuffer:null;nt.bindFramebuffer(N.FRAMEBUFFER,It)}}},this.copyFramebufferToTexture=function(b,z,Z=0){const V=Math.pow(2,-Z),G=Math.floor(z.image.width*V),st=Math.floor(z.image.height*V);at.setTexture2D(z,0),N.copyTexSubImage2D(N.TEXTURE_2D,Z,0,0,b.x,b.y,G,st),nt.unbindTexture()},this.copyTextureToTexture=function(b,z,Z,V=0){const G=z.image.width,st=z.image.height,Mt=pt.convert(Z.format),wt=pt.convert(Z.type);at.setTexture2D(Z,0),N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,Z.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,Z.unpackAlignment),z.isDataTexture?N.texSubImage2D(N.TEXTURE_2D,V,b.x,b.y,G,st,Mt,wt,z.image.data):z.isCompressedTexture?N.compressedTexSubImage2D(N.TEXTURE_2D,V,b.x,b.y,z.mipmaps[0].width,z.mipmaps[0].height,Mt,z.mipmaps[0].data):N.texSubImage2D(N.TEXTURE_2D,V,b.x,b.y,Mt,wt,z.image),V===0&&Z.generateMipmaps&&N.generateMipmap(N.TEXTURE_2D),nt.unbindTexture()},this.copyTextureToTexture3D=function(b,z,Z,V,G=0){const st=b.max.x-b.min.x,Mt=b.max.y-b.min.y,wt=b.max.z-b.min.z,It=pt.convert(V.format),Ut=pt.convert(V.type);let Bt;if(V.isData3DTexture)at.setTexture3D(V,0),Bt=N.TEXTURE_3D;else if(V.isDataArrayTexture||V.isCompressedArrayTexture)at.setTexture2DArray(V,0),Bt=N.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}N.pixelStorei(N.UNPACK_FLIP_Y_WEBGL,V.flipY),N.pixelStorei(N.UNPACK_PREMULTIPLY_ALPHA_WEBGL,V.premultiplyAlpha),N.pixelStorei(N.UNPACK_ALIGNMENT,V.unpackAlignment);const Zt=N.getParameter(N.UNPACK_ROW_LENGTH),_e=N.getParameter(N.UNPACK_IMAGE_HEIGHT),we=N.getParameter(N.UNPACK_SKIP_PIXELS),Re=N.getParameter(N.UNPACK_SKIP_ROWS),Xe=N.getParameter(N.UNPACK_SKIP_IMAGES),ee=Z.isCompressedTexture?Z.mipmaps[G]:Z.image;N.pixelStorei(N.UNPACK_ROW_LENGTH,ee.width),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,ee.height),N.pixelStorei(N.UNPACK_SKIP_PIXELS,b.min.x),N.pixelStorei(N.UNPACK_SKIP_ROWS,b.min.y),N.pixelStorei(N.UNPACK_SKIP_IMAGES,b.min.z),Z.isDataTexture||Z.isData3DTexture?N.texSubImage3D(Bt,G,z.x,z.y,z.z,st,Mt,wt,It,Ut,ee.data):V.isCompressedArrayTexture?N.compressedTexSubImage3D(Bt,G,z.x,z.y,z.z,st,Mt,wt,It,ee.data):N.texSubImage3D(Bt,G,z.x,z.y,z.z,st,Mt,wt,It,Ut,ee),N.pixelStorei(N.UNPACK_ROW_LENGTH,Zt),N.pixelStorei(N.UNPACK_IMAGE_HEIGHT,_e),N.pixelStorei(N.UNPACK_SKIP_PIXELS,we),N.pixelStorei(N.UNPACK_SKIP_ROWS,Re),N.pixelStorei(N.UNPACK_SKIP_IMAGES,Xe),G===0&&V.generateMipmaps&&N.generateMipmap(Bt),nt.unbindTexture()},this.initTexture=function(b){b.isCubeTexture?at.setTextureCube(b,0):b.isData3DTexture?at.setTexture3D(b,0):b.isDataArrayTexture||b.isCompressedArrayTexture?at.setTexture2DArray(b,0):at.setTexture2D(b,0),nt.unbindTexture()},this.resetState=function(){R=0,A=0,C=null,nt.reset(),Dt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return En}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===wr?"display-p3":"srgb",e.unpackColorSpace=ce.workingColorSpace===uo?"display-p3":"srgb"}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Cr{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new jt(t),this.near=e,this.far=n}clone(){return new Cr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Vm extends Pe{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new dn,this.environmentIntensity=1,this.environmentRotation=new dn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,this.backgroundRotation.copy(t.backgroundRotation),this.environmentIntensity=t.environmentIntensity,this.environmentRotation.copy(t.environmentRotation),t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(e.object.environmentIntensity=this.environmentIntensity),e.object.environmentRotation=this.environmentRotation.toArray(),e}}class ii extends Zi{constructor(t){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new jt(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.linewidth=t.linewidth,this.linecap=t.linecap,this.linejoin=t.linejoin,this.fog=t.fog,this}}const oo=new P,ro=new P,ic=new de,ns=new mo,Vs=new po,er=new P,sc=new P;class Bn extends Pe{constructor(t=new ge,e=new ii){super(),this.isLine=!0,this.type="Line",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}computeLineDistances(){const t=this.geometry;if(t.index===null){const e=t.attributes.position,n=[0];for(let i=1,o=e.count;i<o;i++)oo.fromBufferAttribute(e,i-1),ro.fromBufferAttribute(e,i),n[i]=n[i-1],n[i]+=oo.distanceTo(ro);t.setAttribute("lineDistance",new oe(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(t,e){const n=this.geometry,i=this.matrixWorld,o=t.params.Line.threshold,r=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Vs.copy(n.boundingSphere),Vs.applyMatrix4(i),Vs.radius+=o,t.ray.intersectsSphere(Vs)===!1)return;ic.copy(i).invert(),ns.copy(t.ray).applyMatrix4(ic);const a=o/((this.scale.x+this.scale.y+this.scale.z)/3),c=a*a,l=this.isLineSegments?2:1,h=n.index,d=n.attributes.position;if(h!==null){const f=Math.max(0,r.start),g=Math.min(h.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=l){const p=h.getX(_),y=h.getX(_+1),x=Ws(this,t,ns,c,p,y);x&&e.push(x)}if(this.isLineLoop){const _=h.getX(g-1),m=h.getX(f),p=Ws(this,t,ns,c,_,m);p&&e.push(p)}}else{const f=Math.max(0,r.start),g=Math.min(d.count,r.start+r.count);for(let _=f,m=g-1;_<m;_+=l){const p=Ws(this,t,ns,c,_,_+1);p&&e.push(p)}if(this.isLineLoop){const _=Ws(this,t,ns,c,g-1,f);_&&e.push(_)}}}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}}function Ws(s,t,e,n,i,o){const r=s.geometry.attributes.position;if(oo.fromBufferAttribute(r,i),ro.fromBufferAttribute(r,o),e.distanceSqToSegment(oo,ro,er,sc)>n)return;er.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(er);if(!(c<t.near||c>t.far))return{distance:c,point:sc.clone().applyMatrix4(s.matrixWorld),index:i,face:null,faceIndex:null,object:s}}class si extends Se{constructor(t,e,n,i,o,r,a,c,l){super(t,e,n,i,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class fn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(i),e.push(o),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(o-1);const h=n[i],d=n[i+1]-h,f=(r-h)/d;return(i+f)/(o-1)}getTangent(t,e){let i=t-1e-4,o=t+1e-4;i<0&&(i=0),o>1&&(o=1);const r=this.getPoint(i),a=this.getPoint(o),c=e||(r.isVector2?new ht:new P);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new P,i=[],o=[],r=[],a=new P,c=new de;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new P)}o[0]=new P,r[0]=new P;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],a),r[0].crossVectors(i[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(ye(i[f-1].dot(i[f]),-1,1));o[f].applyMatrix4(c.makeRotationAxis(a,g))}r[f].crossVectors(i[f],o[f])}if(e===!0){let f=Math.acos(ye(o[0].dot(o[t]),-1,1));f/=t,i[0].dot(a.crossVectors(o[0],o[t]))>0&&(f=-f);for(let g=1;g<=t;g++)o[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),r[g].crossVectors(i[g],o[g])}return{tangents:i,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class Pr extends fn{constructor(t=0,e=0,n=1,i=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e=new ht){const n=e,i=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(r?o=0:o=i),this.aClockwise===!0&&!r&&(o===i?o=-i:o=o-i);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Wm extends Pr{constructor(t,e,n,i,o,r){super(t,e,n,n,i,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function Rr(){let s=0,t=0,e=0,n=0;function i(o,r,a,c){s=o,t=a,e=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){i(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,h,u){let d=(r-o)/l-(a-o)/(l+h)+(a-r)/h,f=(a-r)/h-(c-r)/(h+u)+(c-a)/u;d*=h,f*=h,i(r,a,d,f)},calc:function(o){const r=o*o,a=r*o;return s+t*o+e*r+n*a}}}const Xs=new P,nr=new Rr,ir=new Rr,sr=new Rr;class Gi extends fn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new P){const n=e,i=this.points,o=i.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%o]:(Xs.subVectors(i[0],i[1]).add(i[0]),l=Xs);const u=i[a%o],d=i[(a+1)%o];if(this.closed||a+2<o?h=i[(a+2)%o]:(Xs.subVectors(i[o-1],i[o-2]).add(i[o-1]),h=Xs),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(u),f),_=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);_<1e-4&&(_=1),g<1e-4&&(g=_),m<1e-4&&(m=_),nr.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,g,_,m),ir.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,g,_,m),sr.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,g,_,m)}else this.curveType==="catmullrom"&&(nr.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),ir.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),sr.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(nr.calc(c),ir.calc(c),sr.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new P().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function oc(s,t,e,n,i){const o=(n-t)*.5,r=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+o+r)*c+(-3*e+3*n-2*o-r)*a+o*s+e}function Xm(s,t){const e=1-s;return e*e*t}function Ym(s,t){return 2*(1-s)*s*t}function qm(s,t){return s*s*t}function ls(s,t,e,n){return Xm(s,t)+Ym(s,e)+qm(s,n)}function Zm(s,t){const e=1-s;return e*e*e*t}function jm(s,t){const e=1-s;return 3*e*e*s*t}function Km(s,t){return 3*(1-s)*s*s*t}function Jm(s,t){return s*s*s*t}function hs(s,t,e,n,i){return Zm(s,t)+jm(s,e)+Km(s,n)+Jm(s,i)}class el extends fn{constructor(t=new ht,e=new ht,n=new ht,i=new ht){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new ht){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(hs(t,i.x,o.x,r.x,a.x),hs(t,i.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class $m extends fn{constructor(t=new P,e=new P,n=new P,i=new P){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new P){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(hs(t,i.x,o.x,r.x,a.x),hs(t,i.y,o.y,r.y,a.y),hs(t,i.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class nl extends fn{constructor(t=new ht,e=new ht){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new ht){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new ht){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qm extends fn{constructor(t=new P,e=new P){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new P){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new P){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class il extends fn{constructor(t=new ht,e=new ht,n=new ht){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new ht){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(ls(t,i.x,o.x,r.x),ls(t,i.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class qi extends fn{constructor(t=new P,e=new P,n=new P){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new P){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(ls(t,i.x,o.x,r.x),ls(t,i.y,o.y,r.y),ls(t,i.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sl extends fn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new ht){const n=e,i=this.points,o=(i.length-1)*t,r=Math.floor(o),a=o-r,c=i[r===0?r:r-1],l=i[r],h=i[r>i.length-2?i.length-1:r+1],u=i[r>i.length-3?i.length-1:r+2];return n.set(oc(a,c.x,l.x,h.x,u.x),oc(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new ht().fromArray(i))}return this}}var ao=Object.freeze({__proto__:null,ArcCurve:Wm,CatmullRomCurve3:Gi,CubicBezierCurve:el,CubicBezierCurve3:$m,EllipseCurve:Pr,LineCurve:nl,LineCurve3:Qm,QuadraticBezierCurve:il,QuadraticBezierCurve3:qi,SplineCurve:sl});class t0 extends fn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new ao[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let o=0;for(;o<i.length;){if(i[o]>=n){const r=i[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,o=this.curves;i<o.length;i++){const r=o[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new ao[i.type]().fromJSON(i))}return this}}class gr extends t0{constructor(t){super(),this.type="Path",this.currentPoint=new ht,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new nl(this.currentPoint.clone(),new ht(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const o=new il(this.currentPoint.clone(),new ht(t,e),new ht(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,o,r){const a=new el(this.currentPoint.clone(),new ht(t,e),new ht(n,i),new ht(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new sl(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,o,r),this}absarc(t,e,n,i,o,r){return this.absellipse(t,e,n,n,i,o,r),this}ellipse(t,e,n,i,o,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,o,r,a,c),this}absellipse(t,e,n,i,o,r,a,c){const l=new Pr(t,e,n,i,o,r,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class _o extends ge{constructor(t=[new ht(0,-.5),new ht(.5,0),new ht(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=ye(i,0,Math.PI*2);const o=[],r=[],a=[],c=[],l=[],h=1/e,u=new P,d=new ht,f=new P,g=new P,_=new P;let m=0,p=0;for(let y=0;y<=t.length-1;y++)switch(y){case 0:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,_.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(_.x,_.y,_.z);break;default:m=t[y+1].x-t[y].x,p=t[y+1].y-t[y].y,f.x=p*1,f.y=-m,f.z=p*0,g.copy(f),f.x+=_.x,f.y+=_.y,f.z+=_.z,f.normalize(),c.push(f.x,f.y,f.z),_.copy(g)}for(let y=0;y<=e;y++){const x=n+y*h*i,S=Math.sin(x),R=Math.cos(x);for(let A=0;A<=t.length-1;A++){u.x=t[A].x*S,u.y=t[A].y,u.z=t[A].x*R,r.push(u.x,u.y,u.z),d.x=y/e,d.y=A/(t.length-1),a.push(d.x,d.y);const C=c[3*A+0]*S,D=c[3*A+1],E=c[3*A+0]*R;l.push(C,D,E)}}for(let y=0;y<e;y++)for(let x=0;x<t.length-1;x++){const S=x+y*t.length,R=S,A=S+t.length,C=S+t.length+1,D=S+1;o.push(R,A,D),o.push(C,D,A)}this.setIndex(o),this.setAttribute("position",new oe(r,3)),this.setAttribute("uv",new oe(a,2)),this.setAttribute("normal",new oe(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new _o(t.points,t.segments,t.phiStart,t.phiLength)}}class co extends _o{constructor(t=1,e=1,n=4,i=8){const o=new gr;o.absarc(0,-e/2,t,Math.PI*1.5,0),o.absarc(0,e/2,t,0,Math.PI*.5),super(o.getPoints(n),i),this.type="CapsuleGeometry",this.parameters={radius:t,length:e,capSegments:n,radialSegments:i}}static fromJSON(t){return new co(t.radius,t.length,t.capSegments,t.radialSegments)}}class xo extends ge{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const o=[],r=[],a=[],c=[],l=new P,h=new ht;r.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),r.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(r[d]/t+1)/2,h.y=(r[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)o.push(u,u+1,0);this.setIndex(o),this.setAttribute("position",new oe(r,3)),this.setAttribute("normal",new oe(a,3)),this.setAttribute("uv",new oe(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xo(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class pe extends ge{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),o=Math.floor(o);const h=[],u=[],d=[],f=[];let g=0;const _=[],m=n/2;let p=0;y(),r===!1&&(t>0&&x(!0),e>0&&x(!1)),this.setIndex(h),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function y(){const S=new P,R=new P;let A=0;const C=(e-t)/n;for(let D=0;D<=o;D++){const E=[],M=D/o,I=M*(e-t)+t;for(let B=0;B<=i;B++){const L=B/i,W=L*c+a,U=Math.sin(W),K=Math.cos(W);R.x=I*U,R.y=-M*n+m,R.z=I*K,u.push(R.x,R.y,R.z),S.set(U,C,K).normalize(),d.push(S.x,S.y,S.z),f.push(L,1-M),E.push(g++)}_.push(E)}for(let D=0;D<i;D++)for(let E=0;E<o;E++){const M=_[E][D],I=_[E+1][D],B=_[E+1][D+1],L=_[E][D+1];h.push(M,I,L),h.push(I,B,L),A+=6}l.addGroup(p,A,0),p+=A}function x(S){const R=g,A=new ht,C=new P;let D=0;const E=S===!0?t:e,M=S===!0?1:-1;for(let B=1;B<=i;B++)u.push(0,m*M,0),d.push(0,M,0),f.push(.5,.5),g++;const I=g;for(let B=0;B<=i;B++){const W=B/i*c+a,U=Math.cos(W),K=Math.sin(W);C.x=E*K,C.y=m*M,C.z=E*U,u.push(C.x,C.y,C.z),d.push(0,M,0),A.x=U*.5+.5,A.y=K*.5*M+.5,f.push(A.x,A.y),g++}for(let B=0;B<i;B++){const L=R+B,W=I+B;S===!0?h.push(W,W+1,L):h.push(W+1,W,L),D+=3}l.addGroup(p,D,S===!0?1:2),p+=D}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new pe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ci extends pe{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new ci(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ol extends gr{constructor(t){super(t),this.uuid=ui(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new gr().fromJSON(i))}return this}}const e0={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let o=rl(s,0,i,e,!0);const r=[];if(!o||o.next===o.prev)return r;let a,c,l,h,u,d,f;if(n&&(o=r0(s,t,o,e)),s.length>80*e){a=l=s[0],c=h=s[1];for(let g=e;g<i;g+=e)u=s[g],d=s[g+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return ps(o,r,e,a,c,f,0),r}};function rl(s,t,e,n,i){let o,r;if(i===_0(s,t,e,n)>0)for(o=t;o<e;o+=n)r=rc(o,s[o],s[o+1],r);else for(o=e-n;o>=t;o-=n)r=rc(o,s[o],s[o+1],r);return r&&vo(r,r.next)&&(gs(r),r=r.next),r}function li(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(vo(e,e.next)||xe(e.prev,e,e.next)===0)){if(gs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function ps(s,t,e,n,i,o,r){if(!s)return;!r&&o&&u0(s,n,i,o);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,o?i0(s,n,i,o):n0(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),gs(s),s=l.next,a=l.next;continue}if(s=l,s===a){r?r===1?(s=s0(li(s),t,e),ps(s,t,e,n,i,o,2)):r===2&&o0(s,t,e,n,i,o):ps(li(s),t,e,n,i,o,1);break}}}function n0(s){const t=s.prev,e=s,n=s.next;if(xe(t,e,n)>=0)return!1;const i=t.x,o=e.x,r=n.x,a=t.y,c=e.y,l=n.y,h=i<o?i<r?i:r:o<r?o:r,u=a<c?a<l?a:l:c<l?c:l,d=i>o?i>r?i:r:o>r?o:r,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Oi(i,a,o,c,r,l,g.x,g.y)&&xe(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function i0(s,t,e,n){const i=s.prev,o=s,r=s.next;if(xe(i,o,r)>=0)return!1;const a=i.x,c=o.x,l=r.x,h=i.y,u=o.y,d=r.y,f=a<c?a<l?a:l:c<l?c:l,g=h<u?h<d?h:d:u<d?u:d,_=a>c?a>l?a:l:c>l?c:l,m=h>u?h>d?h:d:u>d?u:d,p=_r(f,g,t,e,n),y=_r(_,m,t,e,n);let x=s.prevZ,S=s.nextZ;for(;x&&x.z>=p&&S&&S.z<=y;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==r&&Oi(a,h,c,u,l,d,x.x,x.y)&&xe(x.prev,x,x.next)>=0||(x=x.prevZ,S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==i&&S!==r&&Oi(a,h,c,u,l,d,S.x,S.y)&&xe(S.prev,S,S.next)>=0))return!1;S=S.nextZ}for(;x&&x.z>=p;){if(x.x>=f&&x.x<=_&&x.y>=g&&x.y<=m&&x!==i&&x!==r&&Oi(a,h,c,u,l,d,x.x,x.y)&&xe(x.prev,x,x.next)>=0)return!1;x=x.prevZ}for(;S&&S.z<=y;){if(S.x>=f&&S.x<=_&&S.y>=g&&S.y<=m&&S!==i&&S!==r&&Oi(a,h,c,u,l,d,S.x,S.y)&&xe(S.prev,S,S.next)>=0)return!1;S=S.nextZ}return!0}function s0(s,t,e){let n=s;do{const i=n.prev,o=n.next.next;!vo(i,o)&&al(i,n,n.next,o)&&ms(i,o)&&ms(o,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),gs(n),gs(n.next),n=s=o),n=n.next}while(n!==s);return li(n)}function o0(s,t,e,n,i,o){let r=s;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&p0(r,a)){let c=cl(r,a);r=li(r,r.next),c=li(c,c.next),ps(r,t,e,n,i,o,0),ps(c,t,e,n,i,o,0);return}a=a.next}r=r.next}while(r!==s)}function r0(s,t,e,n){const i=[];let o,r,a,c,l;for(o=0,r=t.length;o<r;o++)a=t[o]*n,c=o<r-1?t[o+1]*n:s.length,l=rl(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(f0(l));for(i.sort(a0),o=0;o<i.length;o++)e=c0(i[o],e);return e}function a0(s,t){return s.x-t.x}function c0(s,t){const e=l0(s,t);if(!e)return t;const n=cl(e,s);return li(n,n.next),li(e,e.next)}function l0(s,t){let e=t,n=-1/0,i;const o=s.x,r=s.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const d=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=o&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===o))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,u;e=i;do o>=e.x&&e.x>=c&&o!==e.x&&Oi(r<l?o:n,r,c,l,r<l?n:o,r,e.x,e.y)&&(u=Math.abs(r-e.y)/(o-e.x),ms(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&h0(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function h0(s,t){return xe(s.prev,s,t.prev)<0&&xe(t.next,s,s.next)<0}function u0(s,t,e,n){let i=s;do i.z===0&&(i.z=_r(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,d0(i)}function d0(s){let t,e,n,i,o,r,a,c,l=1;do{for(e=s,s=null,o=null,r=0;e;){for(r++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),o?o.nextZ=i:s=i,i.prevZ=o,o=i;e=n}o.nextZ=null,l*=2}while(r>1);return s}function _r(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function f0(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Oi(s,t,e,n,i,o,r,a){return(i-r)*(t-a)>=(s-r)*(o-a)&&(s-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(o-a)>=(i-r)*(n-a)}function p0(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!m0(s,t)&&(ms(s,t)&&ms(t,s)&&g0(s,t)&&(xe(s.prev,s,t.prev)||xe(s,t.prev,t))||vo(s,t)&&xe(s.prev,s,s.next)>0&&xe(t.prev,t,t.next)>0)}function xe(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function vo(s,t){return s.x===t.x&&s.y===t.y}function al(s,t,e,n){const i=qs(xe(s,t,e)),o=qs(xe(s,t,n)),r=qs(xe(e,n,s)),a=qs(xe(e,n,t));return!!(i!==o&&r!==a||i===0&&Ys(s,e,t)||o===0&&Ys(s,n,t)||r===0&&Ys(e,s,n)||a===0&&Ys(e,t,n))}function Ys(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function qs(s){return s>0?1:s<0?-1:0}function m0(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&al(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function ms(s,t){return xe(s.prev,s,s.next)<0?xe(s,t,s.next)>=0&&xe(s,s.prev,t)>=0:xe(s,t,s.prev)<0||xe(s,s.next,t)<0}function g0(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,o=(s.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&i<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function cl(s,t){const e=new xr(s.i,s.x,s.y),n=new xr(t.i,t.x,t.y),i=s.next,o=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function rc(s,t,e,n){const i=new xr(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function gs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function xr(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function _0(s,t,e,n){let i=0;for(let o=t,r=e-n;o<e;o+=n)i+=(s[r]-s[o])*(s[o+1]+s[r+1]),r=o;return i}class us{static area(t){const e=t.length;let n=0;for(let i=e-1,o=0;o<e;i=o++)n+=t[i].x*t[o].y-t[o].x*t[i].y;return n*.5}static isClockWise(t){return us.area(t)<0}static triangulateShape(t,e){const n=[],i=[],o=[];ac(t),cc(n,t);let r=t.length;e.forEach(ac);for(let c=0;c<e.length;c++)i.push(r),r+=e[c].length,cc(n,e[c]);const a=e0.triangulate(n,i);for(let c=0;c<a.length;c+=3)o.push(a.slice(c,c+3));return o}}function ac(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function cc(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Lr extends ge{constructor(t=new ol([new ht(.5,.5),new ht(-.5,.5),new ht(-.5,-.5),new ht(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];r(l)}this.setAttribute("position",new oe(i,3)),this.setAttribute("uv",new oe(o,2)),this.computeVertexNormals();function r(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,_=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,y=e.UVGenerator!==void 0?e.UVGenerator:x0;let x,S=!1,R,A,C,D;p&&(x=p.getSpacedPoints(h),S=!0,d=!1,R=p.computeFrenetFrames(h,!1),A=new P,C=new P,D=new P),d||(m=0,f=0,g=0,_=0);const E=a.extractPoints(l);let M=E.shape;const I=E.holes;if(!us.isClockWise(M)){M=M.reverse();for(let Q=0,dt=I.length;Q<dt;Q++){const nt=I[Q];us.isClockWise(nt)&&(I[Q]=nt.reverse())}}const L=us.triangulateShape(M,I),W=M;for(let Q=0,dt=I.length;Q<dt;Q++){const nt=I[Q];M=M.concat(nt)}function U(Q,dt,nt){return dt||console.error("THREE.ExtrudeGeometry: vec does not exist"),Q.clone().addScaledVector(dt,nt)}const K=M.length,it=L.length;function k(Q,dt,nt){let J,X,at;const yt=Q.x-dt.x,T=Q.y-dt.y,w=nt.x-Q.x,F=nt.y-Q.y,Y=yt*yt+T*T,rt=yt*F-T*w;if(Math.abs(rt)>Number.EPSILON){const tt=Math.sqrt(Y),bt=Math.sqrt(w*w+F*F),gt=dt.x-T/tt,ct=dt.y+yt/tt,Pt=nt.x-F/bt,xt=nt.y+w/bt,ft=((Pt-gt)*F-(xt-ct)*w)/(yt*F-T*w);J=gt+yt*ft-Q.x,X=ct+T*ft-Q.y;const St=J*J+X*X;if(St<=2)return new ht(J,X);at=Math.sqrt(St/2)}else{let tt=!1;yt>Number.EPSILON?w>Number.EPSILON&&(tt=!0):yt<-Number.EPSILON?w<-Number.EPSILON&&(tt=!0):Math.sign(T)===Math.sign(F)&&(tt=!0),tt?(J=-T,X=yt,at=Math.sqrt(Y)):(J=yt,X=T,at=Math.sqrt(Y/2))}return new ht(J/at,X/at)}const $=[];for(let Q=0,dt=W.length,nt=dt-1,J=Q+1;Q<dt;Q++,nt++,J++)nt===dt&&(nt=0),J===dt&&(J=0),$[Q]=k(W[Q],W[nt],W[J]);const et=[];let mt,Lt=$.concat();for(let Q=0,dt=I.length;Q<dt;Q++){const nt=I[Q];mt=[];for(let J=0,X=nt.length,at=X-1,yt=J+1;J<X;J++,at++,yt++)at===X&&(at=0),yt===X&&(yt=0),mt[J]=k(nt[J],nt[at],nt[yt]);et.push(mt),Lt=Lt.concat(mt)}for(let Q=0;Q<m;Q++){const dt=Q/m,nt=f*Math.cos(dt*Math.PI/2),J=g*Math.sin(dt*Math.PI/2)+_;for(let X=0,at=W.length;X<at;X++){const yt=U(W[X],$[X],J);_t(yt.x,yt.y,-nt)}for(let X=0,at=I.length;X<at;X++){const yt=I[X];mt=et[X];for(let T=0,w=yt.length;T<w;T++){const F=U(yt[T],mt[T],J);_t(F.x,F.y,-nt)}}}const Nt=g+_;for(let Q=0;Q<K;Q++){const dt=d?U(M[Q],Lt[Q],Nt):M[Q];S?(C.copy(R.normals[0]).multiplyScalar(dt.x),A.copy(R.binormals[0]).multiplyScalar(dt.y),D.copy(x[0]).add(C).add(A),_t(D.x,D.y,D.z)):_t(dt.x,dt.y,0)}for(let Q=1;Q<=h;Q++)for(let dt=0;dt<K;dt++){const nt=d?U(M[dt],Lt[dt],Nt):M[dt];S?(C.copy(R.normals[Q]).multiplyScalar(nt.x),A.copy(R.binormals[Q]).multiplyScalar(nt.y),D.copy(x[Q]).add(C).add(A),_t(D.x,D.y,D.z)):_t(nt.x,nt.y,u/h*Q)}for(let Q=m-1;Q>=0;Q--){const dt=Q/m,nt=f*Math.cos(dt*Math.PI/2),J=g*Math.sin(dt*Math.PI/2)+_;for(let X=0,at=W.length;X<at;X++){const yt=U(W[X],$[X],J);_t(yt.x,yt.y,u+nt)}for(let X=0,at=I.length;X<at;X++){const yt=I[X];mt=et[X];for(let T=0,w=yt.length;T<w;T++){const F=U(yt[T],mt[T],J);S?_t(F.x,F.y+x[h-1].y,x[h-1].x+nt):_t(F.x,F.y,u+nt)}}}j(),ut();function j(){const Q=i.length/3;if(d){let dt=0,nt=K*dt;for(let J=0;J<it;J++){const X=L[J];Ft(X[2]+nt,X[1]+nt,X[0]+nt)}dt=h+m*2,nt=K*dt;for(let J=0;J<it;J++){const X=L[J];Ft(X[0]+nt,X[1]+nt,X[2]+nt)}}else{for(let dt=0;dt<it;dt++){const nt=L[dt];Ft(nt[2],nt[1],nt[0])}for(let dt=0;dt<it;dt++){const nt=L[dt];Ft(nt[0]+K*h,nt[1]+K*h,nt[2]+K*h)}}n.addGroup(Q,i.length/3-Q,0)}function ut(){const Q=i.length/3;let dt=0;Et(W,dt),dt+=W.length;for(let nt=0,J=I.length;nt<J;nt++){const X=I[nt];Et(X,dt),dt+=X.length}n.addGroup(Q,i.length/3-Q,1)}function Et(Q,dt){let nt=Q.length;for(;--nt>=0;){const J=nt;let X=nt-1;X<0&&(X=Q.length-1);for(let at=0,yt=h+m*2;at<yt;at++){const T=K*at,w=K*(at+1),F=dt+J+T,Y=dt+X+T,rt=dt+X+w,tt=dt+J+w;zt(F,Y,rt,tt)}}}function _t(Q,dt,nt){c.push(Q),c.push(dt),c.push(nt)}function Ft(Q,dt,nt){N(Q),N(dt),N(nt);const J=i.length/3,X=y.generateTopUV(n,i,J-3,J-2,J-1);Gt(X[0]),Gt(X[1]),Gt(X[2])}function zt(Q,dt,nt,J){N(Q),N(dt),N(J),N(dt),N(nt),N(J);const X=i.length/3,at=y.generateSideWallUV(n,i,X-6,X-3,X-2,X-1);Gt(at[0]),Gt(at[1]),Gt(at[3]),Gt(at[1]),Gt(at[2]),Gt(at[3])}function N(Q){i.push(c[Q*3+0]),i.push(c[Q*3+1]),i.push(c[Q*3+2])}function Gt(Q){o.push(Q.x),o.push(Q.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return v0(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,r=t.shapes.length;o<r;o++){const a=e[t.shapes[o]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new ao[i.type]().fromJSON(i)),new Lr(n,t.options)}}const x0={generateTopUV:function(s,t,e,n,i){const o=t[e*3],r=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new ht(o,r),new ht(a,c),new ht(l,h)]},generateSideWallUV:function(s,t,e,n,i,o){const r=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],g=t[i*3+2],_=t[o*3],m=t[o*3+1],p=t[o*3+2];return Math.abs(a-h)<Math.abs(r-l)?[new ht(r,1-c),new ht(l,1-u),new ht(d,1-g),new ht(_,1-p)]:[new ht(a,1-c),new ht(h,1-u),new ht(f,1-g),new ht(m,1-p)]}};function v0(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const o=s[n];e.shapes.push(o.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class qt extends ge{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],u=new P,d=new P,f=[],g=[],_=[],m=[];for(let p=0;p<=n;p++){const y=[],x=p/n;let S=0;p===0&&r===0?S=.5/e:p===n&&c===Math.PI&&(S=-.5/e);for(let R=0;R<=e;R++){const A=R/e;u.x=-t*Math.cos(i+A*o)*Math.sin(r+x*a),u.y=t*Math.cos(r+x*a),u.z=t*Math.sin(i+A*o)*Math.sin(r+x*a),g.push(u.x,u.y,u.z),d.copy(u).normalize(),_.push(d.x,d.y,d.z),m.push(A+S,1-x),y.push(l++)}h.push(y)}for(let p=0;p<n;p++)for(let y=0;y<e;y++){const x=h[p][y+1],S=h[p][y],R=h[p+1][y],A=h[p+1][y+1];(p!==0||r>0)&&f.push(x,S,A),(p!==n-1||c<Math.PI)&&f.push(S,R,A)}this.setIndex(f),this.setAttribute("position",new oe(g,3)),this.setAttribute("normal",new oe(_,3)),this.setAttribute("uv",new oe(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new qt(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class On extends ge{constructor(t=1,e=.4,n=12,i=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:o},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],c=[],l=[],h=new P,u=new P,d=new P;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const _=g/i*o,m=f/n*Math.PI*2;u.x=(t+e*Math.cos(m))*Math.cos(_),u.y=(t+e*Math.cos(m))*Math.sin(_),u.z=e*Math.sin(m),a.push(u.x,u.y,u.z),h.x=t*Math.cos(_),h.y=t*Math.sin(_),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const _=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,y=(i+1)*f+g;r.push(_,m,y),r.push(m,p,y)}this.setIndex(r),this.setAttribute("position",new oe(a,3)),this.setAttribute("normal",new oe(c,3)),this.setAttribute("uv",new oe(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new On(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class oi extends ge{constructor(t=new qi(new P(-1,-1,0),new P(-1,1,0),new P(1,1,0)),e=64,n=1,i=8,o=!1){super(),this.type="TubeGeometry",this.parameters={path:t,tubularSegments:e,radius:n,radialSegments:i,closed:o};const r=t.computeFrenetFrames(e,o);this.tangents=r.tangents,this.normals=r.normals,this.binormals=r.binormals;const a=new P,c=new P,l=new ht;let h=new P;const u=[],d=[],f=[],g=[];_(),this.setIndex(g),this.setAttribute("position",new oe(u,3)),this.setAttribute("normal",new oe(d,3)),this.setAttribute("uv",new oe(f,2));function _(){for(let x=0;x<e;x++)m(x);m(o===!1?e:0),y(),p()}function m(x){h=t.getPointAt(x/e,h);const S=r.normals[x],R=r.binormals[x];for(let A=0;A<=i;A++){const C=A/i*Math.PI*2,D=Math.sin(C),E=-Math.cos(C);c.x=E*S.x+D*R.x,c.y=E*S.y+D*R.y,c.z=E*S.z+D*R.z,c.normalize(),d.push(c.x,c.y,c.z),a.x=h.x+n*c.x,a.y=h.y+n*c.y,a.z=h.z+n*c.z,u.push(a.x,a.y,a.z)}}function p(){for(let x=1;x<=e;x++)for(let S=1;S<=i;S++){const R=(i+1)*(x-1)+(S-1),A=(i+1)*x+(S-1),C=(i+1)*x+S,D=(i+1)*(x-1)+S;g.push(R,A,D),g.push(A,C,D)}}function y(){for(let x=0;x<=e;x++)for(let S=0;S<=i;S++)l.x=x/e,l.y=S/i,f.push(l.x,l.y)}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON();return t.path=this.parameters.path.toJSON(),t}static fromJSON(t){return new oi(new ao[t.path.type]().fromJSON(t.path),t.tubularSegments,t.radius,t.radialSegments,t.closed)}}class Ct extends Zi{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new jt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new jt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=zc,this.normalScale=new ht(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new dn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapRotation.copy(t.envMapRotation),this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class ll extends Ct{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new ht(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return ye(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new jt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new jt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new jt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get dispersion(){return this._dispersion}set dispersion(t){this._dispersion>0!=t>0&&this.version++,this._dispersion=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.dispersion=t.dispersion,this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Mo extends Pe{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new jt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class M0 extends Mo{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.groundColor=new jt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const or=new de,lc=new P,hc=new P;class hl{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ht(512,512),this.map=null,this.mapPass=null,this.matrix=new de,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Tr,this._frameExtents=new ht(1,1),this._viewportCount=1,this._viewports=[new me(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;lc.setFromMatrixPosition(t.matrixWorld),e.position.copy(lc),hc.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(hc),e.updateMatrixWorld(),or.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(or),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(or)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}const uc=new de,is=new P,rr=new P;class y0 extends hl{constructor(){super(new Ge(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new ht(4,2),this._viewportCount=6,this._viewports=[new me(2,1,1,1),new me(0,1,1,1),new me(3,1,1,1),new me(1,1,1,1),new me(3,0,1,1),new me(1,0,1,1)],this._cubeDirections=[new P(1,0,0),new P(-1,0,0),new P(0,0,1),new P(0,0,-1),new P(0,1,0),new P(0,-1,0)],this._cubeUps=[new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,1,0),new P(0,0,1),new P(0,0,-1)]}updateMatrices(t,e=0){const n=this.camera,i=this.matrix,o=t.distance||n.far;o!==n.far&&(n.far=o,n.updateProjectionMatrix()),is.setFromMatrixPosition(t.matrixWorld),n.position.copy(is),rr.copy(n.position),rr.add(this._cubeDirections[e]),n.up.copy(this._cubeUps[e]),n.lookAt(rr),n.updateMatrixWorld(),i.makeTranslation(-is.x,-is.y,-is.z),uc.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(uc)}}class S0 extends Mo{constructor(t,e,n=0,i=2){super(t,e),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new y0}get power(){return this.intensity*4*Math.PI}set power(t){this.intensity=t/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(t,e){return super.copy(t,e),this.distance=t.distance,this.decay=t.decay,this.shadow=t.shadow.clone(),this}}class w0 extends hl{constructor(){super(new Zc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ul extends Mo{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Pe.DEFAULT_UP),this.updateMatrix(),this.target=new Pe,this.shadow=new w0}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class E0 extends Mo{constructor(t,e){super(t,e),this.isAmbientLight=!0,this.type="AmbientLight"}}class b0{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=dc(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=dc();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function dc(){return(typeof performance>"u"?Date:performance).now()}const fc=new de;class T0{constructor(t,e,n=0,i=1/0){this.ray=new mo(t,e),this.near=n,this.far=i,this.camera=null,this.layers=new br,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(t,e){this.ray.set(t,e)}setFromCamera(t,e){e.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(t.x,t.y,.5).unproject(e).sub(this.ray.origin).normalize(),this.camera=e):e.isOrthographicCamera?(this.ray.origin.set(t.x,t.y,(e.near+e.far)/(e.near-e.far)).unproject(e),this.ray.direction.set(0,0,-1).transformDirection(e.matrixWorld),this.camera=e):console.error("THREE.Raycaster: Unsupported camera type: "+e.type)}setFromXRController(t){return fc.identity().extractRotation(t.matrixWorld),this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(fc),this}intersectObject(t,e=!0,n=[]){return vr(t,this,n,e),n.sort(pc),n}intersectObjects(t,e=!0,n=[]){for(let i=0,o=t.length;i<o;i++)vr(t[i],this,n,e);return n.sort(pc),n}}function pc(s,t){return s.distance-t.distance}function vr(s,t,e,n){if(s.layers.test(t.layers)&&s.raycast(t,e),n===!0){const i=s.children;for(let o=0,r=i.length;o<r;o++)vr(i[o],t,e,!0)}}class mc{constructor(t=1,e=0,n=0){return this.radius=t,this.phi=e,this.theta=n,this}set(t,e,n){return this.radius=t,this.phi=e,this.theta=n,this}copy(t){return this.radius=t.radius,this.phi=t.phi,this.theta=t.theta,this}makeSafe(){return this.phi=Math.max(1e-6,Math.min(Math.PI-1e-6,this.phi)),this}setFromVector3(t){return this.setFromCartesianCoords(t.x,t.y,t.z)}setFromCartesianCoords(t,e,n){return this.radius=Math.sqrt(t*t+e*e+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(t,n),this.phi=Math.acos(ye(e/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Sr}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Sr);class A0{constructor(t){ot(this,"scene",new Vm);ot(this,"renderer");ot(this,"clock",new b0);ot(this,"camera");ot(this,"container");ot(this,"updatables",[]);ot(this,"handleResize",()=>{const{clientWidth:t,clientHeight:e}=this.container;this.camera.aspect=t/e,this.camera.updateProjectionMatrix(),this.renderer.setSize(t,e)});this.container=t,this.camera=new Ge(55,1,.5,800),this.renderer=new Gm({antialias:!0}),this.renderer.setPixelRatio(Math.min(window.devicePixelRatio,2)),this.renderer.outputColorSpace=ke,this.renderer.toneMapping=Ac,this.renderer.toneMappingExposure=1.05,this.renderer.shadowMap.enabled=!0,this.renderer.shadowMap.type=bc,"physicallyCorrectLights"in this.renderer&&(this.renderer.physicallyCorrectLights=!1),this.container.appendChild(this.renderer.domElement),this.handleResize(),window.addEventListener("resize",this.handleResize)}addUpdatable(...t){this.updatables.push(...t)}addToScene(...t){t.forEach(e=>this.scene.add(e))}start(){this.clock.start();const t=()=>{const e=this.clock.getDelta();this.updatables.forEach(n=>n.update(e)),this.renderer.render(this.scene,this.camera),requestAnimationFrame(t)};t()}}const gc=(s,t,e)=>Math.min(e,Math.max(t,s));class C0{constructor(t){ot(this,"base");ot(this,"stick");ot(this,"radius",40);ot(this,"pointerId",null);ot(this,"vector",{x:0,y:0});ot(this,"onPointerDown",t=>{this.pointerId=t.pointerId,t.target.setPointerCapture(t.pointerId),this.updateStick(t)});ot(this,"onPointerMove",t=>{t.pointerId===this.pointerId&&this.updateStick(t)});ot(this,"onPointerUp",t=>{t.pointerId===this.pointerId&&(this.pointerId=null,this.vector={x:0,y:0},this.stick.style.transform="translate(0px, 0px)")});this.base=document.createElement("div"),this.base.className="joystick",this.stick=document.createElement("div"),this.stick.className="joystick-stick",this.base.appendChild(this.stick),t.appendChild(this.base),this.base.addEventListener("pointerdown",this.onPointerDown),this.base.addEventListener("pointermove",this.onPointerMove),this.base.addEventListener("pointerup",this.onPointerUp),this.base.addEventListener("pointercancel",this.onPointerUp)}getVector(){return{...this.vector}}updateStick(t){const e=this.base.getBoundingClientRect(),n=t.clientX-e.left-e.width/2,i=t.clientY-e.top-e.height/2,o=Math.hypot(n,i),r=Math.min(o,this.radius),a=Math.atan2(i,n),c=Math.cos(a)*r,l=Math.sin(a)*r;this.vector={x:gc(c/this.radius,-1,1),y:gc(l/this.radius,-1,1)},this.stick.style.transform=`translate(${c}px, ${l}px)`}}class P0{constructor(t){ot(this,"keys",new Set);ot(this,"joystick");ot(this,"runHeld",!1);ot(this,"jumpQueued",!1);ot(this,"exitQueued",!1);ot(this,"enterQueued",!1);ot(this,"exitButton",null);ot(this,"onKeyDown",t=>{this.keys.add(t.code),t.code==="Space"&&!t.repeat&&(this.jumpQueued=!0),t.code==="KeyE"&&!t.repeat&&(this.exitQueued=!0),t.code==="Enter"&&!t.repeat&&(this.enterQueued=!0)});ot(this,"onKeyUp",t=>{this.keys.delete(t.code)});this.joystick=new C0(t),this.createTouchButtons(t),window.addEventListener("keydown",this.onKeyDown),window.addEventListener("keyup",this.onKeyUp)}getMoveVector(){let t=0,e=0;if((this.keys.has("KeyW")||this.keys.has("ArrowUp"))&&(e+=1),(this.keys.has("KeyS")||this.keys.has("ArrowDown"))&&(e-=1),(this.keys.has("KeyA")||this.keys.has("ArrowLeft"))&&(t-=1),(this.keys.has("KeyD")||this.keys.has("ArrowRight"))&&(t+=1),t!==0||e!==0){const o=Math.hypot(t,e)||1;return{x:t/o,z:e/o}}const n=this.joystick.getVector();return Math.hypot(n.x,n.y)>.05?{x:n.x*Math.abs(n.x),z:-n.y}:{x:0,z:0}}isSprinting(){if(this.keys.has("ShiftLeft")||this.keys.has("ShiftRight")||this.runHeld)return!0;const t=this.joystick.getVector();return Math.hypot(t.x,t.y)>=.85}consumeJumpPressed(){const t=this.jumpQueued;return this.jumpQueued=!1,t}consumeExitPressed(){const t=this.exitQueued;return this.exitQueued=!1,t}consumeEnterPressed(){const t=this.enterQueued;return this.enterQueued=!1,t}setExitVisible(t){this.exitButton&&(this.exitButton.style.display=t?"":"none")}createTouchButtons(t){const e=document.createElement("div");e.className="action-buttons";const n=document.createElement("button");n.className="action-button",n.type="button",n.textContent="БЕГ";const i=document.createElement("button");i.className="action-button",i.type="button",i.textContent="ПРЫЖОК";const o=document.createElement("button");o.className="action-button",o.type="button",o.textContent="ВЫЙТИ",o.style.display="none",this.exitButton=o;const r=c=>{c.preventDefault(),this.runHeld=!0},a=c=>{c.preventDefault(),this.runHeld=!1};n.addEventListener("pointerdown",r),n.addEventListener("pointerup",a),n.addEventListener("pointercancel",a),n.addEventListener("pointerleave",a),i.addEventListener("pointerdown",c=>{c.preventDefault(),this.jumpQueued=!0}),o.addEventListener("pointerdown",c=>{c.preventDefault(),this.exitQueued=!0}),e.append(n,i,o),t.appendChild(e)}}const _c={type:"change"},ar={type:"start"},xc={type:"end"},Zs=new mo,vc=new Nn,R0=Math.cos(70*fo.DEG2RAD);class L0 extends hi{constructor(t,e){super(),this.object=t,this.domElement=e,this.domElement.style.touchAction="none",this.enabled=!0,this.target=new P,this.cursor=new P,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:fi.ROTATE,MIDDLE:fi.DOLLY,RIGHT:fi.PAN},this.touches={ONE:pi.ROTATE,TWO:pi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this.getPolarAngle=function(){return a.phi},this.getAzimuthalAngle=function(){return a.theta},this.getDistance=function(){return this.object.position.distanceTo(this.target)},this.listenToKeyEvents=function(v){v.addEventListener("keydown",Pt),this._domElementKeyEvents=v},this.stopListenToKeyEvents=function(){this._domElementKeyEvents.removeEventListener("keydown",Pt),this._domElementKeyEvents=null},this.saveState=function(){n.target0.copy(n.target),n.position0.copy(n.object.position),n.zoom0=n.object.zoom},this.reset=function(){n.target.copy(n.target0),n.object.position.copy(n.position0),n.object.zoom=n.zoom0,n.object.updateProjectionMatrix(),n.dispatchEvent(_c),n.update(),o=i.NONE},this.update=function(){const v=new P,O=new ai().setFromUnitVectors(t.up,new P(0,1,0)),H=O.clone().invert(),lt=new P,vt=new ai,Ht=new P,Xt=2*Math.PI;return function(le=null){const Kt=n.object.position;v.copy(Kt).sub(n.target),v.applyQuaternion(O),a.setFromVector3(v),n.autoRotate&&o===i.NONE&&B(M(le)),n.enableDamping?(a.theta+=c.theta*n.dampingFactor,a.phi+=c.phi*n.dampingFactor):(a.theta+=c.theta,a.phi+=c.phi);let he=n.minAzimuthAngle,Qt=n.maxAzimuthAngle;isFinite(he)&&isFinite(Qt)&&(he<-Math.PI?he+=Xt:he>Math.PI&&(he-=Xt),Qt<-Math.PI?Qt+=Xt:Qt>Math.PI&&(Qt-=Xt),he<=Qt?a.theta=Math.max(he,Math.min(Qt,a.theta)):a.theta=a.theta>(he+Qt)/2?Math.max(he,a.theta):Math.min(Qt,a.theta)),a.phi=Math.max(n.minPolarAngle,Math.min(n.maxPolarAngle,a.phi)),a.makeSafe(),n.enableDamping===!0?n.target.addScaledVector(h,n.dampingFactor):n.target.add(h),n.target.sub(n.cursor),n.target.clampLength(n.minTargetRadius,n.maxTargetRadius),n.target.add(n.cursor);let Je=!1;if(n.zoomToCursor&&A||n.object.isOrthographicCamera)a.radius=et(a.radius);else{const ze=a.radius;a.radius=et(a.radius*l),Je=ze!=a.radius}if(v.setFromSpherical(a),v.applyQuaternion(H),Kt.copy(n.target).add(v),n.object.lookAt(n.target),n.enableDamping===!0?(c.theta*=1-n.dampingFactor,c.phi*=1-n.dampingFactor,h.multiplyScalar(1-n.dampingFactor)):(c.set(0,0,0),h.set(0,0,0)),n.zoomToCursor&&A){let ze=null;if(n.object.isPerspectiveCamera){const rn=v.length();ze=et(rn*l);const $e=rn-ze;n.object.position.addScaledVector(S,$e),n.object.updateMatrixWorld(),Je=!!$e}else if(n.object.isOrthographicCamera){const rn=new P(R.x,R.y,0);rn.unproject(n.object);const $e=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),n.object.updateProjectionMatrix(),Je=$e!==n.object.zoom;const mn=new P(R.x,R.y,0);mn.unproject(n.object),n.object.position.sub(mn).add(rn),n.object.updateMatrixWorld(),ze=v.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),n.zoomToCursor=!1;ze!==null&&(this.screenSpacePanning?n.target.set(0,0,-1).transformDirection(n.object.matrix).multiplyScalar(ze).add(n.object.position):(Zs.origin.copy(n.object.position),Zs.direction.set(0,0,-1).transformDirection(n.object.matrix),Math.abs(n.object.up.dot(Zs.direction))<R0?t.lookAt(n.target):(vc.setFromNormalAndCoplanarPoint(n.object.up,n.target),Zs.intersectPlane(vc,n.target))))}else if(n.object.isOrthographicCamera){const ze=n.object.zoom;n.object.zoom=Math.max(n.minZoom,Math.min(n.maxZoom,n.object.zoom/l)),ze!==n.object.zoom&&(n.object.updateProjectionMatrix(),Je=!0)}return l=1,A=!1,Je||lt.distanceToSquared(n.object.position)>r||8*(1-vt.dot(n.object.quaternion))>r||Ht.distanceToSquared(n.target)>r?(n.dispatchEvent(_c),lt.copy(n.object.position),vt.copy(n.object.quaternion),Ht.copy(n.target),!0):!1}}(),this.dispose=function(){n.domElement.removeEventListener("contextmenu",St),n.domElement.removeEventListener("pointerdown",T),n.domElement.removeEventListener("pointercancel",F),n.domElement.removeEventListener("wheel",tt),n.domElement.removeEventListener("pointermove",w),n.domElement.removeEventListener("pointerup",F),n.domElement.getRootNode().removeEventListener("keydown",gt,{capture:!0}),n._domElementKeyEvents!==null&&(n._domElementKeyEvents.removeEventListener("keydown",Pt),n._domElementKeyEvents=null)};const n=this,i={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6};let o=i.NONE;const r=1e-6,a=new mc,c=new mc;let l=1;const h=new P,u=new ht,d=new ht,f=new ht,g=new ht,_=new ht,m=new ht,p=new ht,y=new ht,x=new ht,S=new P,R=new ht;let A=!1;const C=[],D={};let E=!1;function M(v){return v!==null?2*Math.PI/60*n.autoRotateSpeed*v:2*Math.PI/60/60*n.autoRotateSpeed}function I(v){const O=Math.abs(v*.01);return Math.pow(.95,n.zoomSpeed*O)}function B(v){c.theta-=v}function L(v){c.phi-=v}const W=function(){const v=new P;return function(H,lt){v.setFromMatrixColumn(lt,0),v.multiplyScalar(-H),h.add(v)}}(),U=function(){const v=new P;return function(H,lt){n.screenSpacePanning===!0?v.setFromMatrixColumn(lt,1):(v.setFromMatrixColumn(lt,0),v.crossVectors(n.object.up,v)),v.multiplyScalar(H),h.add(v)}}(),K=function(){const v=new P;return function(H,lt){const vt=n.domElement;if(n.object.isPerspectiveCamera){const Ht=n.object.position;v.copy(Ht).sub(n.target);let Xt=v.length();Xt*=Math.tan(n.object.fov/2*Math.PI/180),W(2*H*Xt/vt.clientHeight,n.object.matrix),U(2*lt*Xt/vt.clientHeight,n.object.matrix)}else n.object.isOrthographicCamera?(W(H*(n.object.right-n.object.left)/n.object.zoom/vt.clientWidth,n.object.matrix),U(lt*(n.object.top-n.object.bottom)/n.object.zoom/vt.clientHeight,n.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),n.enablePan=!1)}}();function it(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l/=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function k(v){n.object.isPerspectiveCamera||n.object.isOrthographicCamera?l*=v:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),n.enableZoom=!1)}function $(v,O){if(!n.zoomToCursor)return;A=!0;const H=n.domElement.getBoundingClientRect(),lt=v-H.left,vt=O-H.top,Ht=H.width,Xt=H.height;R.x=lt/Ht*2-1,R.y=-(vt/Xt)*2+1,S.set(R.x,R.y,1).unproject(n.object).sub(n.object.position).normalize()}function et(v){return Math.max(n.minDistance,Math.min(n.maxDistance,v))}function mt(v){u.set(v.clientX,v.clientY)}function Lt(v){$(v.clientX,v.clientX),p.set(v.clientX,v.clientY)}function Nt(v){g.set(v.clientX,v.clientY)}function j(v){d.set(v.clientX,v.clientY),f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const O=n.domElement;B(2*Math.PI*f.x/O.clientHeight),L(2*Math.PI*f.y/O.clientHeight),u.copy(d),n.update()}function ut(v){y.set(v.clientX,v.clientY),x.subVectors(y,p),x.y>0?it(I(x.y)):x.y<0&&k(I(x.y)),p.copy(y),n.update()}function Et(v){_.set(v.clientX,v.clientY),m.subVectors(_,g).multiplyScalar(n.panSpeed),K(m.x,m.y),g.copy(_),n.update()}function _t(v){$(v.clientX,v.clientY),v.deltaY<0?k(I(v.deltaY)):v.deltaY>0&&it(I(v.deltaY)),n.update()}function Ft(v){let O=!1;switch(v.code){case n.keys.UP:v.ctrlKey||v.metaKey||v.shiftKey?L(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(0,n.keyPanSpeed),O=!0;break;case n.keys.BOTTOM:v.ctrlKey||v.metaKey||v.shiftKey?L(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(0,-n.keyPanSpeed),O=!0;break;case n.keys.LEFT:v.ctrlKey||v.metaKey||v.shiftKey?B(2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(n.keyPanSpeed,0),O=!0;break;case n.keys.RIGHT:v.ctrlKey||v.metaKey||v.shiftKey?B(-2*Math.PI*n.rotateSpeed/n.domElement.clientHeight):K(-n.keyPanSpeed,0),O=!0;break}O&&(v.preventDefault(),n.update())}function zt(v){if(C.length===1)u.set(v.pageX,v.pageY);else{const O=Ot(v),H=.5*(v.pageX+O.x),lt=.5*(v.pageY+O.y);u.set(H,lt)}}function N(v){if(C.length===1)g.set(v.pageX,v.pageY);else{const O=Ot(v),H=.5*(v.pageX+O.x),lt=.5*(v.pageY+O.y);g.set(H,lt)}}function Gt(v){const O=Ot(v),H=v.pageX-O.x,lt=v.pageY-O.y,vt=Math.sqrt(H*H+lt*lt);p.set(0,vt)}function Q(v){n.enableZoom&&Gt(v),n.enablePan&&N(v)}function dt(v){n.enableZoom&&Gt(v),n.enableRotate&&zt(v)}function nt(v){if(C.length==1)d.set(v.pageX,v.pageY);else{const H=Ot(v),lt=.5*(v.pageX+H.x),vt=.5*(v.pageY+H.y);d.set(lt,vt)}f.subVectors(d,u).multiplyScalar(n.rotateSpeed);const O=n.domElement;B(2*Math.PI*f.x/O.clientHeight),L(2*Math.PI*f.y/O.clientHeight),u.copy(d)}function J(v){if(C.length===1)_.set(v.pageX,v.pageY);else{const O=Ot(v),H=.5*(v.pageX+O.x),lt=.5*(v.pageY+O.y);_.set(H,lt)}m.subVectors(_,g).multiplyScalar(n.panSpeed),K(m.x,m.y),g.copy(_)}function X(v){const O=Ot(v),H=v.pageX-O.x,lt=v.pageY-O.y,vt=Math.sqrt(H*H+lt*lt);y.set(0,vt),x.set(0,Math.pow(y.y/p.y,n.zoomSpeed)),it(x.y),p.copy(y);const Ht=(v.pageX+O.x)*.5,Xt=(v.pageY+O.y)*.5;$(Ht,Xt)}function at(v){n.enableZoom&&X(v),n.enablePan&&J(v)}function yt(v){n.enableZoom&&X(v),n.enableRotate&&nt(v)}function T(v){n.enabled!==!1&&(C.length===0&&(n.domElement.setPointerCapture(v.pointerId),n.domElement.addEventListener("pointermove",w),n.domElement.addEventListener("pointerup",F)),!Dt(v)&&(Tt(v),v.pointerType==="touch"?xt(v):Y(v)))}function w(v){n.enabled!==!1&&(v.pointerType==="touch"?ft(v):rt(v))}function F(v){switch(pt(v),C.length){case 0:n.domElement.releasePointerCapture(v.pointerId),n.domElement.removeEventListener("pointermove",w),n.domElement.removeEventListener("pointerup",F),n.dispatchEvent(xc),o=i.NONE;break;case 1:const O=C[0],H=D[O];xt({pointerId:O,pageX:H.x,pageY:H.y});break}}function Y(v){let O;switch(v.button){case 0:O=n.mouseButtons.LEFT;break;case 1:O=n.mouseButtons.MIDDLE;break;case 2:O=n.mouseButtons.RIGHT;break;default:O=-1}switch(O){case fi.DOLLY:if(n.enableZoom===!1)return;Lt(v),o=i.DOLLY;break;case fi.ROTATE:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enablePan===!1)return;Nt(v),o=i.PAN}else{if(n.enableRotate===!1)return;mt(v),o=i.ROTATE}break;case fi.PAN:if(v.ctrlKey||v.metaKey||v.shiftKey){if(n.enableRotate===!1)return;mt(v),o=i.ROTATE}else{if(n.enablePan===!1)return;Nt(v),o=i.PAN}break;default:o=i.NONE}o!==i.NONE&&n.dispatchEvent(ar)}function rt(v){switch(o){case i.ROTATE:if(n.enableRotate===!1)return;j(v);break;case i.DOLLY:if(n.enableZoom===!1)return;ut(v);break;case i.PAN:if(n.enablePan===!1)return;Et(v);break}}function tt(v){n.enabled===!1||n.enableZoom===!1||o!==i.NONE||(v.preventDefault(),n.dispatchEvent(ar),_t(bt(v)),n.dispatchEvent(xc))}function bt(v){const O=v.deltaMode,H={clientX:v.clientX,clientY:v.clientY,deltaY:v.deltaY};switch(O){case 1:H.deltaY*=16;break;case 2:H.deltaY*=100;break}return v.ctrlKey&&!E&&(H.deltaY*=10),H}function gt(v){v.key==="Control"&&(E=!0,n.domElement.getRootNode().addEventListener("keyup",ct,{passive:!0,capture:!0}))}function ct(v){v.key==="Control"&&(E=!1,n.domElement.getRootNode().removeEventListener("keyup",ct,{passive:!0,capture:!0}))}function Pt(v){n.enabled===!1||n.enablePan===!1||Ft(v)}function xt(v){switch(Vt(v),C.length){case 1:switch(n.touches.ONE){case pi.ROTATE:if(n.enableRotate===!1)return;zt(v),o=i.TOUCH_ROTATE;break;case pi.PAN:if(n.enablePan===!1)return;N(v),o=i.TOUCH_PAN;break;default:o=i.NONE}break;case 2:switch(n.touches.TWO){case pi.DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;Q(v),o=i.TOUCH_DOLLY_PAN;break;case pi.DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;dt(v),o=i.TOUCH_DOLLY_ROTATE;break;default:o=i.NONE}break;default:o=i.NONE}o!==i.NONE&&n.dispatchEvent(ar)}function ft(v){switch(Vt(v),o){case i.TOUCH_ROTATE:if(n.enableRotate===!1)return;nt(v),n.update();break;case i.TOUCH_PAN:if(n.enablePan===!1)return;J(v),n.update();break;case i.TOUCH_DOLLY_PAN:if(n.enableZoom===!1&&n.enablePan===!1)return;at(v),n.update();break;case i.TOUCH_DOLLY_ROTATE:if(n.enableZoom===!1&&n.enableRotate===!1)return;yt(v),n.update();break;default:o=i.NONE}}function St(v){n.enabled!==!1&&v.preventDefault()}function Tt(v){C.push(v.pointerId)}function pt(v){delete D[v.pointerId];for(let O=0;O<C.length;O++)if(C[O]==v.pointerId){C.splice(O,1);return}}function Dt(v){for(let O=0;O<C.length;O++)if(C[O]==v.pointerId)return!0;return!1}function Vt(v){let O=D[v.pointerId];O===void 0&&(O=new ht,D[v.pointerId]=O),O.set(v.pageX,v.pageY)}function Ot(v){const O=v.pointerId===C[0]?C[1]:C[0];return D[O]}n.domElement.addEventListener("contextmenu",St),n.domElement.addEventListener("pointerdown",T),n.domElement.addEventListener("pointercancel",F),n.domElement.addEventListener("wheel",tt,{passive:!1}),n.domElement.getRootNode().addEventListener("keydown",gt,{passive:!0,capture:!0}),this.update()}}class I0{constructor(t,e,n){ot(this,"controls");ot(this,"camera");ot(this,"target");ot(this,"offset",new P(0,2,0));ot(this,"lastTarget",new P);ot(this,"tmp",new P);this.camera=t,this.target=n,this.controls=new L0(t,e),this.controls.enableDamping=!0,this.controls.dampingFactor=.1,this.controls.minDistance=5,this.controls.maxDistance=80,this.controls.maxPolarAngle=Math.PI/2.2,this.controls.enablePan=!1,this.controls.screenSpacePanning=!1,this.controls.target.copy(this.target.position).add(this.offset),t.position.copy(this.controls.target).add(new P(0,8,-14)),this.lastTarget.copy(this.target.position)}setTarget(t){if(this.target===t)return;const e=t.position.clone().sub(this.target.position);this.camera.position.add(e),this.controls.target.add(e),this.target=t,this.lastTarget.copy(t.position)}update(){this.tmp.copy(this.target.position).sub(this.lastTarget),this.tmp.y=0,this.tmp.lengthSq()>0&&(this.camera.position.add(this.tmp),this.controls.target.add(this.tmp));const t=this.target.position.x+this.offset.x,e=this.target.position.z+this.offset.z,n=t-this.controls.target.x,i=e-this.controls.target.z;(Math.abs(n)>1e-4||Math.abs(i)>1e-4)&&(this.tmp.set(n,0,i),this.camera.position.add(this.tmp),this.controls.target.add(this.tmp)),this.controls.target.y=this.target.position.y+this.offset.y,this.lastTarget.copy(this.target.position),this.controls.update()}}const kt={roads:[{position:{x:0,z:0},width:10,length:380,center:"dashed"},{position:{x:0,z:0},width:10,length:380,rotation:Math.PI/2,center:"dashed"},{position:{x:0,z:70},width:10,length:220,rotation:Math.PI/2,center:"dashed"},{position:{x:-70,z:-10},width:10,length:170,center:"dashed"},{position:{x:65,z:120},width:8,length:130,rotation:Math.PI/2,center:"none"}],crosswalks:[],parks:[{position:{x:-120,z:-40},width:70,depth:60}],waterAreas:[{position:{x:-120,z:-50},width:34,depth:24}],beachAreas:[{position:{x:-150,z:-150},width:90,depth:46}],buildings:[{position:{x:-40,z:102},size:{x:10,y:7.5,z:10},color:"#e30611",roof:"#2980b9",rotation:Math.PI,label:"МТС БАНК"},{position:{x:40,z:92},size:{x:12,y:4.2,z:8},color:"#27ae60",roof:"#27ae60",rotation:Math.PI,label:"ПРОДУКТЫ",shutters:!0},{position:{x:-96,z:26},size:{x:24,y:10,z:12},color:"#eeeeee",roof:"#20b2aa",rotation:-Math.PI/2,label:"МЕДСИ",labelTextColor:"#20b2aa",labelBg:"#ffffff",labelAnchor:"center",labelAllSides:!0},{position:{x:-52,z:26},size:{x:10,y:5,z:8},color:"#e30611",roof:"#ffffff",rotation:-Math.PI/2,label:"МТС SHOP",labelBg:"#ffffff",labelTextColor:"#e30611",labelAnchor:"center"},{position:{x:-55,z:-40},size:{x:20,y:5,z:8},color:"#9b59b6",roof:"#8e44ad",rotation:-Math.PI/2,label:"Магазин одежды"},{position:{x:29,z:130},size:{x:7.2,y:7.2,z:7.6},color:"#f6e3d3",roof:"#c65b4a",rotation:Math.PI},{position:{x:37,z:130},size:{x:7.2,y:7,z:7.6},color:"#e8f2ff",roof:"#4a6fa8",rotation:Math.PI},{position:{x:45,z:130},size:{x:7.2,y:7.4,z:7.6},color:"#f3f0d7",roof:"#b85d3d",rotation:Math.PI},{position:{x:53,z:130},size:{x:7.2,y:7.1,z:7.6},color:"#fde2ea",roof:"#a84a6a",rotation:Math.PI},{position:{x:61,z:130},size:{x:7.2,y:7.3,z:7.6},color:"#e8ffe9",roof:"#4f8b6b",rotation:Math.PI},{position:{x:69,z:130},size:{x:7.2,y:7,z:7.6},color:"#fff0d6",roof:"#b06a3c",rotation:Math.PI},{position:{x:77,z:130},size:{x:7.2,y:7.5,z:7.6},color:"#e9e6ff",roof:"#5b4aa8",rotation:Math.PI},{position:{x:85,z:130},size:{x:7.2,y:7.1,z:7.6},color:"#f7f7f2",roof:"#3f4a57",rotation:Math.PI},{position:{x:93,z:130},size:{x:7.2,y:7.3,z:7.6},color:"#e6f7ff",roof:"#3b6c7d",rotation:Math.PI},{position:{x:101,z:130},size:{x:7.2,y:7.2,z:7.6},color:"#ffe6d8",roof:"#b34e3b",rotation:Math.PI}],umbrellas:[{x:-170,z:-150,color:"#ffb3c1"},{x:-150,z:-142,color:"#ffe08a"},{x:-132,z:-156,color:"#9fd3ff"}],rocks:[{x:-188,z:-160,size:1.2},{x:-176,z:-168,size:1},{x:-160,z:-158,size:.8}],parkingLots:[{buildingIndex:0,spots:10},{buildingIndex:1,spots:2},{buildingIndex:2,spots:2},{buildingIndex:3,spots:2},{buildingIndex:4,spots:2}]},ae={worldSize:260,groundColor:"#4caf50",sandColor:"#f7e2b8",skyTopColor:"#6ecbff",skyBottomColor:"#fff7e8",fogColor:"#eef8ff",fogNear:80,fogFar:520,playerSpeed:6,playerSprintMultiplier:1.75,playerTurnSpeed:10,playerJumpSpeed:8.5,playerGravity:22,sunColor:"#fff1c4",ambientColor:"#fff7ea"},Rt={foundationHeight:.5,facadeInset:.06,door:{width:2,frameWidth:2.4,frameHeight:3.2,outward:.6,frameOutward:.45,localZOutset:.9},windows:{width:1.1,height:1.3,desiredStep:2.4,floorHeight:2.4,marginX:1.2,marginTop:1.1,sillFromBase:1.2,doorClearance:.6},roof:{minHeight:.7,maxHeight:1.2,relative:.12}},D0=(s,t)=>{const e=new te;e.rotation.y=s.rotation??0;const n=new q(new ie(s.size.x*1.06,.5,s.size.z*1.06),new Ct({color:"#7f8c8d",roughness:.9,metalness:.02}));n.position.y=Rt.foundationHeight/2,n.castShadow=!0,n.receiveShadow=!0,e.add(n);const i=new ie(s.size.x,s.size.y,s.size.z),o=new Ct({color:s.color,map:t.wall,roughness:.7,metalness:.05}),r=new q(i,o);r.castShadow=!0,r.receiveShadow=!0,r.position.y=Rt.foundationHeight+s.size.y/2,e.add(r);const a=Math.max(Rt.roof.minHeight,Math.min(Rt.roof.maxHeight,s.size.y*Rt.roof.relative)),c=new ie(s.size.x*1.05,a,s.size.z*1.05),l=new Ct({color:s.roof,map:t.roof,roughness:.6,metalness:.08}),h=new q(c,l);h.castShadow=!0,h.position.y=Rt.foundationHeight+s.size.y+a/2-.02,e.add(h);const u=new Ct({color:"#f9f9f7",roughness:.6,metalness:.02}),d=new q(new ie(s.size.x*1.02,.12,s.size.z*1.02),u);d.position.y=Rt.foundationHeight+s.size.y+.02,d.castShadow=!0,d.receiveShadow=!0,e.add(d);const f=new Ct({map:t.windows,emissive:new jt("#ffd9a8"),emissiveIntensity:.2,roughness:.16,metalness:.18,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),g=new Ct({color:"#f4f6fb",roughness:.38,metalness:.16}),_=new Me(Rt.windows.width,Rt.windows.height),m=s.size.y-Rt.windows.marginTop,p=Math.max(1,Math.floor((m-Rt.windows.sillFromBase)/Rt.windows.floorHeight)),y=J=>{const X=Math.max(.01,J-2*Rt.windows.marginX),at=Math.max(1,Math.floor(X/Rt.windows.desiredStep)),yt=X/at,T=-X/2+yt/2;return{cols:at,step:yt,x0:T}},x=y(s.size.x),S=Rt.door.width/2+Rt.windows.doorClearance,R=Rt.door.frameHeight+Rt.windows.doorClearance;for(let J=0;J<p;J+=1){let X=Rt.foundationHeight+Rt.windows.sillFromBase+Rt.windows.height/2+J*Rt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(X+=.6);for(let at=0;at<x.cols;at+=1){const yt=x.x0+at*x.step,T=Math.abs(yt)<=S,w=X<=Rt.foundationHeight+R;if(T&&w)continue;const F=new q(_,f);F.position.set(yt,X,s.size.z/2+Rt.facadeInset),F.renderOrder=1,e.add(F);const Y=.06,rt=new ie(Rt.windows.width+.18,Rt.windows.height+.18,Y),tt=new q(rt,g);if(tt.position.set(yt,X,s.size.z/2+Rt.facadeInset-Y/2),tt.castShadow=!0,tt.receiveShadow=!0,tt.renderOrder=0,e.add(tt),s.shutters){const bt=new Ct({color:"#1f6f39",roughness:.75,metalness:.02}),gt=.22,ct=Rt.windows.height*1.02,Pt=.06,xt=s.size.z/2+Rt.facadeInset+.03,ft=new q(new ie(gt,ct,Pt),bt);ft.position.set(yt-Rt.windows.width/2-gt/2-.06,X,xt),ft.castShadow=!0,ft.renderOrder=1,e.add(ft);const St=new q(new ie(gt,ct,Pt),bt);St.position.set(yt+Rt.windows.width/2+gt/2+.06,X,xt),St.castShadow=!0,St.renderOrder=1,e.add(St)}}}const A=y(s.size.z);for(let J=0;J<p;J+=1){let X=Rt.foundationHeight+Rt.windows.sillFromBase+Rt.windows.height/2+J*Rt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(X+=.35);for(let at=0;at<A.cols;at+=1){const yt=A.x0+at*A.step,T=new q(_,f);T.rotation.y=Math.PI/2,T.position.set(s.size.x/2+Rt.facadeInset,X,yt),T.renderOrder=1,e.add(T);const w=.06,F=new ie(Rt.windows.width+.18,Rt.windows.height+.18,w),Y=new q(F,g);Y.rotation.y=Math.PI/2,Y.position.set(s.size.x/2+Rt.facadeInset-w/2,X,yt),Y.castShadow=!0,Y.receiveShadow=!0,Y.renderOrder=0,e.add(Y)}}for(let J=0;J<p;J+=1){let X=Rt.foundationHeight+Rt.windows.sillFromBase+Rt.windows.height/2+J*Rt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(X+=.35);for(let at=0;at<x.cols;at+=1){const yt=x.x0+at*x.step,T=new q(_,f);T.rotation.y=Math.PI,T.position.set(yt,X,-s.size.z/2-Rt.facadeInset),T.renderOrder=1,e.add(T);const w=.06,F=new ie(Rt.windows.width+.18,Rt.windows.height+.18,w),Y=new q(F,g);Y.rotation.y=Math.PI,Y.position.set(yt,X,-s.size.z/2-Rt.facadeInset+w/2),Y.castShadow=!0,Y.receiveShadow=!0,Y.renderOrder=0,e.add(Y)}}for(let J=0;J<p;J+=1){let X=Rt.foundationHeight+Rt.windows.sillFromBase+Rt.windows.height/2+J*Rt.windows.floorHeight;s.label==="МТС БАНК"&&J>=1&&(X+=.35);for(let at=0;at<A.cols;at+=1){const yt=A.x0+at*A.step,T=new q(_,f);T.rotation.y=-Math.PI/2,T.position.set(-s.size.x/2-Rt.facadeInset,X,yt),T.renderOrder=1,e.add(T);const w=.06,F=new ie(Rt.windows.width+.18,Rt.windows.height+.18,w),Y=new q(F,g);Y.rotation.y=-Math.PI/2,Y.position.set(-s.size.x/2-Rt.facadeInset+w/2,X,yt),Y.castShadow=!0,Y.receiveShadow=!0,Y.renderOrder=0,e.add(Y)}}const C=new q(new ie(2.4,3.2,.35),new Ct({color:"#2c3e50",roughness:.7,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}));C.position.set(0,Rt.foundationHeight+1.85,s.size.z/2+Rt.door.frameOutward),C.renderOrder=2,e.add(C);const D=new ie(2,2.8,.15),E=document.createElement("canvas");E.width=256,E.height=512;const M=E.getContext("2d");let I;if(M){M.fillStyle="#8b5a2b",M.fillRect(0,0,E.width,E.height);const J=M.createLinearGradient(0,0,0,E.height);J.addColorStop(0,"rgba(255,255,255,0.16)"),J.addColorStop(.5,"rgba(0,0,0,0.1)"),J.addColorStop(1,"rgba(0,0,0,0.22)"),M.fillStyle=J,M.fillRect(0,0,E.width,E.height);const X=32,at=(E.height-X*3)/2,yt=E.width-X*2;M.strokeStyle="rgba(0,0,0,0.45)",M.lineWidth=6,M.strokeRect(X,X,yt,at),M.strokeRect(X,X*2+at,yt,at),M.strokeStyle="rgba(255,255,255,0.08)",M.lineWidth=2;for(let T=0;T<E.width;T+=12)M.beginPath(),M.moveTo(T+Math.random()*4,0),M.lineTo(T+Math.random()*4,E.height),M.stroke();I=new si(E),I.wrapS=I.wrapT=wn,I.anisotropy=4}const B=new Ct({color:"#8B4513",roughness:.8,metalness:.15,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3,map:I}),L=new te,W=Rt.door.width/2;L.position.set(W,Rt.foundationHeight+1.75,s.size.z/2+Rt.door.outward);const U=new q(D,B);U.position.set(-2/2,0,0),U.castShadow=!0,U.renderOrder=3,U.name="door",L.add(U),e.add(L);const K=new te,it=new q(new pe(.04,.04,.12,12),new Ct({color:"#dcdcdc",metalness:.8,roughness:.25}));it.rotation.z=Math.PI/2,K.add(it);const k=new q(new qt(.05,12,12),new Ct({color:"#f5f5f5",metalness:.9,roughness:.2}));k.position.set(.08,0,0),K.add(k),K.position.set(-2/2+.08,0,D.parameters.depth/2+.02),U.add(K);const $=document.createElement("canvas");$.width=256,$.height=128;const et=$.getContext("2d");let mt;if(et){et.fillStyle="#c9c9c5",et.fillRect(0,0,$.width,$.height);const J=et.createLinearGradient(0,0,0,$.height);J.addColorStop(0,"rgba(255,255,255,0.25)"),J.addColorStop(1,"rgba(0,0,0,0.18)"),et.fillStyle=J,et.fillRect(0,0,$.width,$.height),et.strokeStyle="rgba(0,0,0,0.25)",et.lineWidth=2;for(let X=22;X<$.height;X+=24)et.beginPath(),et.moveTo(0,X+Math.random()*3),et.lineTo($.width,X+Math.random()*3),et.stroke();mt=new si($),mt.wrapS=mt.wrapT=un,mt.repeat.set(2,1)}const Lt=new Ct({color:"#d0d0cc",roughness:.9,metalness:.02,map:mt}),Nt=Rt.door.frameWidth+.8,j=.55,ut=.16,Et=3,_t=.08,zt=s.size.z/2+Rt.door.outward-j/2-.04,N=zt+(Et-1)*(j-.05);for(let J=0;J<Et;J+=1){const X=ut,at=_t+J*ut,yt=N-J*(j-.05),T=new q(new ie(Nt-J*.18,X,j),Lt);T.position.set(0,at,yt),T.castShadow=!0,T.receiveShadow=!0,e.add(T)}const Gt=new Ct({color:"#c7b18a",roughness:.5,metalness:.25}),Q=new pe(.05,.06,.9,10),dt=J=>{const X=new te,at=Et+1,yt=zt-j/2,T=N+j/2,w=_t+.45,F=w+Et*ut*.6,Y=[];for(let rt=0;rt<at;rt+=1){const tt=new q(Q,Gt),bt=rt/(at-1),gt=T+(yt-T)*bt,ct=w+(F-w)*bt;tt.position.set((Nt/2+.06)*J,ct,gt),tt.castShadow=!0,X.add(tt);const Pt=ct+Q.parameters.height/2;Y.push(new P((Nt/2+.06)*J,Pt,gt))}if(Y.length>=2){const rt=new Gi(Y),tt=new oi(rt,16,.045,10,!1),bt=new q(tt,Gt);bt.castShadow=!0,X.add(bt)}e.add(X)};dt(-1),dt(1);const nt=new q(new ie(3.2,.15,1.4),new Ct({color:s.roof,roughness:.55,metalness:.05}));if(nt.position.set(0,Rt.foundationHeight+3.55,s.size.z/2+.85),nt.rotation.x=-.2,nt.castShadow=!0,e.add(nt),s.label){const X=((tt,bt,gt)=>{const ct=document.createElement("canvas");ct.width=512,ct.height=128;const Pt=ct.getContext("2d");if(!Pt)return new Se;Pt.fillStyle=bt,Pt.fillRect(0,0,ct.width,ct.height),Pt.fillStyle=gt;const xt=tt.length>12?36:64;Pt.font=`bold ${xt}px Arial`,Pt.textAlign="center",Pt.textBaseline="middle",Pt.shadowColor="rgba(0,0,0,0.45)",Pt.shadowBlur=8,Pt.shadowOffsetY=3,Pt.fillText(tt,ct.width/2,ct.height/2+2);const ft=new si(ct);return ft.wrapS=ft.wrapT=wn,ft.anisotropy=8,ft})(s.label,s.labelBg??s.color,s.labelTextColor??"#ffffff"),at=1.4,yt=Rt.foundationHeight+s.size.y+.85,T=.31,w=.31,F=()=>new Ct({map:X,color:"#ffffff",roughness:.25,metalness:.05,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2,side:on}),Y=()=>{const tt=Math.min(s.size.x*.9,8),bt=new q(new Me(tt,at),F()),gt=s.labelAnchor??"center",ct=.35,Pt=gt==="edgeRight"?s.size.x/2-tt/2-ct:gt==="edgeLeft"?-s.size.x/2+tt/2+ct:0;bt.position.set(Pt,yt,s.size.z/2+T),bt.castShadow=!0,bt.renderOrder=4,e.add(bt)},rt=()=>{const tt=Math.min(s.size.x*.9,8),bt=Math.min(s.size.z*.9,8),gt=new q(new Me(tt,at),F());gt.rotation.y=Math.PI,gt.position.set(0,yt,-s.size.z/2-T),gt.castShadow=!0,gt.renderOrder=4,e.add(gt);const ct=new q(new Me(bt,at),F());ct.rotation.y=-Math.PI/2,ct.position.set(s.size.x/2+w,yt,0),ct.castShadow=!0,ct.renderOrder=4,e.add(ct);const Pt=new q(new Me(bt,at),F());Pt.rotation.y=Math.PI/2,Pt.position.set(-s.size.x/2-w,yt,0),Pt.castShadow=!0,Pt.renderOrder=4,e.add(Pt)};Y(),s.labelAllSides&&rt()}return e.position.set(s.position.x,0,s.position.z),e.userData.door=L,e},Dn=(s,t)=>{const n=document.createElement("canvas");n.width=512,n.height=512;const i=n.getContext("2d");if(!i){const a=new Se;return a.needsUpdate=!0,a}s!=="clouds"?(i.fillStyle=t,i.fillRect(0,0,512,512)):i.clearRect(0,0,512,512);const o=a=>{const c=i.getImageData(0,0,512,512),l=c.data;for(let h=0;h<l.length;h+=4){const u=(Math.random()-.5)*a;l[h]+=u,l[h+1]+=u,l[h+2]+=u}i.putImageData(c,0,0)};if(s==="grass"){o(40),i.fillStyle="rgba(0, 0, 0, 0.08)";for(let a=0;a<600;a++)i.fillRect(Math.random()*512,Math.random()*512,1,2)}if(s==="sand"){o(30),i.fillStyle="rgba(255, 255, 255, 0.12)";for(let a=0;a<400;a++)i.fillRect(Math.random()*512,Math.random()*512,2,1)}if(s==="path"){o(25),i.fillStyle="rgba(0, 0, 0, 0.12)";for(let a=0;a<500;a++)i.fillRect(Math.random()*512,Math.random()*512,2,2)}if(s==="road"){o(35),i.fillStyle="rgba(0, 0, 0, 0.12)";for(let a=0;a<500;a++)i.fillRect(Math.random()*512,Math.random()*512,2,2)}if(s==="roof"){o(15),i.strokeStyle="rgba(0, 0, 0, 0.25)",i.lineWidth=2;const a=8,c=512/a;for(let l=0;l<=a;l++)i.beginPath(),i.moveTo(0,l*c),i.lineTo(512,l*c),i.stroke()}if(s==="wall"){const a=i.createLinearGradient(0,0,0,512);a.addColorStop(0,"rgba(255,255,255,0.18)"),a.addColorStop(1,"rgba(0,0,0,0.12)"),i.fillStyle=a,i.fillRect(0,0,512,512),o(22),i.fillStyle="rgba(0, 0, 0, 0.06)";for(let l=0;l<900;l++)i.fillRect(Math.random()*512,Math.random()*512,1,1);for(let l=0;l<140;l++){const h=Math.random()*512,u=Math.random()*512,d=4+Math.random()*16;i.beginPath(),i.arc(h,u,d,0,Math.PI*2),i.fillStyle=`rgba(0, 0, 0, ${.025+Math.random()*.03})`,i.fill()}i.strokeStyle="rgba(0, 0, 0, 0.06)",i.lineWidth=2;const c=48;for(let l=0;l<512;l+=c)i.beginPath(),i.moveTo(0,l+(Math.random()*2-1)),i.lineTo(512,l+(Math.random()*2-1)),i.stroke()}if(s==="windows"){const a=i.createLinearGradient(0,0,0,512);a.addColorStop(0,"rgba(170, 210, 235, 0.95)"),a.addColorStop(1,"rgba(45, 75, 95, 0.95)"),i.fillStyle=a,i.fillRect(0,0,512,512),i.fillStyle="rgba(255, 255, 255, 0.14)",i.beginPath(),i.moveTo(512*.1,512*.9),i.lineTo(512*.9,512*.1),i.lineTo(512*.9,512*.28),i.lineTo(512*.28,512*.9),i.closePath(),i.fill(),i.strokeStyle="rgba(25, 35, 45, 0.95)",i.lineWidth=22,i.strokeRect(0,0,512,512),i.strokeStyle="rgba(255, 255, 255, 0.15)",i.lineWidth=6,i.strokeRect(18,18,476,476),i.fillStyle="rgba(25, 35, 45, 0.9)";const c=14;i.fillRect(512/2-c/2,18,c,476),i.fillRect(18,512/2-c/2,476,c),o(10)}if(s==="tile"){i.fillStyle=t,i.fillRect(0,0,512,512),o(15),i.strokeStyle="rgba(0,0,0,0.15)",i.lineWidth=3;const a=4,c=512/a;for(let l=0;l<=a;l++){const h=l*c;i.beginPath(),i.moveTo(h,0),i.lineTo(h,512),i.stroke(),i.beginPath(),i.moveTo(0,h),i.lineTo(512,h),i.stroke()}}if(s==="clouds")for(let c=0;c<26;c+=1){const l=Math.random()*512,h=Math.random()*512,u=34+Math.random()*62,d=5+Math.floor(Math.random()*5);for(let f=0;f<d;f+=1){const g=(Math.random()-.5)*u*.9,_=(Math.random()-.5)*u*.45,m=u*(1+(Math.random()-.5)*.35)*1.35,p=u*(.7+Math.random()*.35);i.save(),i.translate(l+g,h+_),i.scale(m/Math.max(1e-4,p),1);const y=i.createRadialGradient(0,0,0,0,0,p),x=.34+Math.random()*.18;y.addColorStop(0,`rgba(255, 255, 255, ${x})`),y.addColorStop(.62,`rgba(255, 255, 255, ${x*.62})`),y.addColorStop(1,"rgba(255, 255, 255, 0)"),i.fillStyle=y,i.beginPath(),i.arc(0,0,p,0,Math.PI*2),i.fill(),i.restore()}}const r=new si(n);return r.wrapS=r.wrapT=un,r.anisotropy=4,r},U0=s=>{const n=document.createElement("canvas");n.width=256,n.height=64;const i=n.getContext("2d");if(!i)return new Se;i.fillStyle="#ffffff",i.fillRect(0,0,256,64),i.strokeStyle="#000000",i.lineWidth=8,i.strokeRect(0,0,256,64),i.fillStyle="#000000",i.font="bold 40px monospace",i.textAlign="center",i.textBaseline="middle",i.fillText(s.toUpperCase(),256/2,64/2);const o=new si(n);return o.minFilter=je,o},N0=new qt(.1,6,6),z0=new He({color:8947848,transparent:!0,opacity:.6,depthWrite:!1});class js{constructor(t,e){ot(this,"object",new te);ot(this,"path");ot(this,"speed");ot(this,"targetIndex",0);ot(this,"y");ot(this,"animTime",0);ot(this,"speedScale",1);ot(this,"isParked");ot(this,"doorPivot");ot(this,"doorVoid");ot(this,"doorOpen",0);ot(this,"doorOpenTarget",0);ot(this,"doorOpenSpeed",7);ot(this,"doorMaxAngle",Math.PI*.65);ot(this,"driver");ot(this,"smokeGroup",new te);ot(this,"smokeParticles",[]);ot(this,"nextSmokeTime",0);this.path=t,this.speed=e.speed,this.y=e.y??.22,this.targetIndex=Math.max(0,Math.min(t.length-1,e.startIndex??0)),this.isParked=!!e.parked,this.isParked=!!e.parked,this.object.add(this.buildModel(e.color,e.plateText)),this.object.add(this.smokeGroup);const n=this.path[this.targetIndex]??new P(0,0,0);this.object.position.set(n.x,this.y,n.z),e.plateText&&(this.object.userData.plateText=e.plateText)}setSpeedScale(t){this.speedScale=Math.max(0,t)}setDoorOpen(t){this.doorOpenTarget=t?1:0}getForward2D(){const t=this.object.rotation.y;return{x:Math.sin(t),z:Math.cos(t)}}update(t,e){if(this.path.length<2)return;this.animTime+=t;const n=this.path[this.targetIndex],i=this.object.position.x,o=this.object.position.z,r=n.x-i,a=n.z-o,c=Math.hypot(r,a);if(c<.55){this.targetIndex=(this.targetIndex+1)%this.path.length;return}const l=1/Math.max(c,1e-6),h=r*l,u=a*l,d=this.speed*this.speedScale*t;if(this.object.position.x+=h*Math.min(d,c),this.object.position.z+=u*Math.min(d,c),e!==void 0?this.object.position.y=e+.22:this.object.position.y=this.y,this.object.rotation.y=Math.atan2(h,u),this.updateDoorAnimation(t),this.driver){const f=Math.sin(this.animTime*3.2)*.04;this.driver.head.position.y=this.driver.headBaseY+f,this.driver.earL.position.y=this.driver.earBaseY+f*.9,this.driver.earR.position.y=this.driver.earBaseY+f*.9}this.updateSmoke(t,this.speedScale)}buildModel(t,e){const n=new te,i=new Ct({color:t,roughness:.25,metalness:.1}),o=new Ct({color:"#bfe6ff",roughness:.08,metalness:.05,transparent:!0,opacity:.72}),r=new Ct({color:"#1f2a33",roughness:.9,metalness:.05}),a=new Ct({color:"#151a1f",roughness:.95,metalness:.05,side:Ve}),c=new Ct({color:"#151a1f",roughness:.95,metalness:.05,side:Ce}),l=new ll({color:15901016,roughness:.55,metalness:0,sheen:1,sheenRoughness:.45,sheenColor:16769484,map:this.createFurTexture()}),h=new Ct({color:16775920,roughness:.65,metalness:.05}),u=new Ct({color:16758465,roughness:.45}),d=this.isParked?new qt(1,18,18,0,Math.PI*2,Math.PI*.18,Math.PI*.82):new qt(1,18,18),f=new q(d,i);if(f.scale.set(1.1,.8,2.2),f.position.y=.82,f.castShadow=!0,f.receiveShadow=!0,n.add(f),this.isParked){const ft=new q(d,c);ft.scale.set(1.02,.74,2.05),ft.position.y=.8,ft.castShadow=!1,ft.receiveShadow=!1,n.add(ft)}const g=1.25,_=.7,m=.15,p=new ol,y=-g/2,x=-_/2;p.moveTo(y,x+m),p.lineTo(y,x+_-m),p.quadraticCurveTo(y,x+_,y+m,x+_),p.lineTo(y+g-m,x+_),p.quadraticCurveTo(y+g,x+_,y+g,x+_-m),p.lineTo(y+g,x+m),p.quadraticCurveTo(y+g,x,y+g-m,x),p.lineTo(y+m,x),p.quadraticCurveTo(y,x,y,x+m);const S={depth:.05,bevelEnabled:!0,bevelThickness:.02,bevelSize:.02,bevelSegments:4},R=new Lr(p,S);R.center();const A=new q(R,o);if(A.position.set(0,1.45,.95),A.rotation.x=-.2,n.add(A),!this.isParked){const ft=new Ct({color:"#0a0c0e",roughness:1,metalness:0}),St=new q(new On(.55,.15,12,32),ft);St.rotation.x=Math.PI/2,St.position.set(0,1.45,-.1),n.add(St)}const C=new Ct({color:2829099,roughness:.9,metalness:.02}),D=(ft,St,Tt=1.008)=>{const pt=new P(ft,0,St),Dt=pt.x*pt.x+pt.z*pt.z,Vt=Math.sqrt(Math.max(0,1-Dt));return pt.y=Vt,pt.multiplyScalar(Tt)},E=(ft,St)=>{const Tt=new Gi(ft,!1,"catmullrom",.6),pt=new oi(Tt,40,St,6,!1),Dt=new q(pt,C);return Dt.castShadow=!1,Dt.receiveShadow=!1,Dt},M=ft=>{const pt=ft*.9272727272727272,Dt=.35/2.2,Vt=-.55/2.2,Ot=Xt=>{const ne=[];for(let le=0;le<=10;le+=1){const Kt=le/10,he=pt*(1-.02*Math.sin(Kt*Math.PI));ne.push(D(he,Xt,1.01))}return ne},Wt=()=>{const Xt=[],le=.15909090909090906;for(let Kt=0;Kt<=10;Kt+=1){const he=Kt/10,Qt=-.25+(le- -.25)*he;Xt.push(D(pt,Qt,1.011))}return Xt},v=.012,O=E(Ot(Dt),v),H=E(Ot(Vt),v),lt=E(Wt(),v),vt=new q(new co(.03,.14,4,8),C);vt.rotation.z=Math.PI/2;const Ht=D(pt,-.05/2.2,1.02);vt.position.copy(Ht),f.add(O,H,lt,vt)};M(1),M(-1);const I=new q(new On(.66,.07,10,26),i);I.rotation.x=Math.PI/2,I.scale.set(1,1,1.1);const B=this.isParked?.96:1.02,L=-.08;I.position.set(0,B,L),I.castShadow=!0,n.add(I);const W=new q(new On(.58,.08,10,26),a);W.rotation.x=Math.PI/2,W.scale.set(1,1,1.05),W.position.set(0,B-.12,L-.02),W.castShadow=!1,W.receiveShadow=!0,n.add(W);const U=new q(new pe(.82,.82,.6,26,1,!0),a);U.position.set(0,this.isParked?.86:.92,-.18),U.castShadow=!0,U.receiveShadow=!0,n.add(U);const K=new q(new xo(this.isParked?.9:.74,26),a);if(K.rotation.x=-Math.PI/2,K.position.set(0,this.isParked?.62:.66,-.18),K.receiveShadow=!0,n.add(K),this.isParked){const Ot={x:1.1,y:.8,z:2.2},Wt=-.12+.95/2,v=(.98-.82)/Ot.y,O=Wt/Ot.z,H=Ot.x*Math.sqrt(Math.max(0,1-v*v-O*O)),lt=(rn,$e,mn,We,Qe)=>{const Ki=[],vs=[],di=[],Ms=(st,Mt,wt,It,Ut,Bt)=>{Ki.push(st,Mt,wt),vs.push(It,Ut,Bt)},b=[];for(let st=0;st<=We;st+=1){const wt=.98+(st/We-.5)*$e,It=(wt-.82)/Ot.y;for(let Ut=0;Ut<=Qe;Ut+=1){const Zt=-.12+(Ut/Qe-.5)*rn,_e=Zt/Ot.z,we=1-It*It-_e*_e,Re=we>0?Ot.x*Math.sqrt(we):Ot.x*1e-4,Xe=Re/(Ot.x*Ot.x),ee=(wt-.82)/(Ot.y*Ot.y),Yt=Zt/(Ot.z*Ot.z),gn=Math.hypot(Xe,ee,Yt)||1;b.push({x:Re,y:wt,z:Zt,nx:Xe/gn,ny:ee/gn,nz:Yt/gn})}}const z=Qe+1;for(const st of b)Ms(st.x,st.y,st.z,st.nx,st.ny,st.nz);for(const st of b)Ms(st.x-st.nx*mn,st.y-st.ny*mn,st.z-st.nz*mn,-st.nx,-st.ny,-st.nz);for(let st=0;st<We;st+=1)for(let Mt=0;Mt<Qe;Mt+=1){const wt=st*z+Mt,It=wt+z,Ut=It+1,Bt=wt+1;di.push(wt,It,Bt,It,Ut,Bt)}const Z=b.length;for(let st=0;st<We;st+=1)for(let Mt=0;Mt<Qe;Mt+=1){const wt=Z+st*z+Mt,It=wt+z,Ut=It+1,Bt=wt+1;di.push(wt,Bt,It,It,Bt,Ut)}const V=(st,Mt,wt,It)=>{di.push(st,Mt,wt,Mt,It,wt)};for(let st=0;st<Qe;st+=1){const Mt=st,wt=st+1;V(Mt,wt,Z+Mt,Z+wt)}for(let st=0;st<Qe;st+=1){const Mt=We*z+st,wt=Mt+1;V(Mt,Z+Mt,wt,Z+wt)}for(let st=0;st<We;st+=1){const Mt=st*z,wt=Mt+z;V(Mt,Z+Mt,wt,Z+wt)}for(let st=0;st<We;st+=1){const Mt=st*z+Qe,wt=Mt+z;V(Mt,wt,Z+Mt,Z+wt)}const G=new ge;return G.setIndex(di),G.setAttribute("position",new oe(Ki,3)),G.setAttribute("normal",new oe(vs,3)),G.computeBoundingSphere(),G.translate(-H,-.98,-Wt),G},vt=i.clone();vt.side=Ve;const Ht=new te;Ht.position.set(H,.98,Wt);const Xt=lt(.95,.8,.035*2,8,10),ne=new q(Xt,vt);ne.castShadow=!0,ne.receiveShadow=!0,Ht.add(ne),n.add(Ht),this.doorPivot=Ht;const le=.6,Kt=new ie(le,.8*.9,.95*.9),he=new Ct({color:"#050607",roughness:1,metalness:0,side:on}),Qt=new q(Kt,he),Je=-.12/Ot.z,ze=Ot.x*Math.sqrt(Math.max(0,1-v*v-Je*Je));Qt.position.set(ze-le/2,.98,-.12),Qt.castShadow=!1,Qt.receiveShadow=!1,Qt.visible=!1,n.add(Qt),this.doorVoid=Qt}const it=new q(new ie(.95,.18,.4),r);it.position.set(0,1.06,.45),it.castShadow=!0,n.add(it);const k=new te,$=new P(0,1.22,.34);k.position.copy($),k.rotation.x=-.25,n.add(k);const et=new q(new On(.28,.05,10,18),r);et.castShadow=!0,k.add(et);const mt=new q(new pe(.04,.06,.3,10),r);mt.rotation.x=Math.PI/2,mt.position.set(0,-.12,-.18),k.add(mt);const Lt=new q(new co(.18,1.25,8,14),o);if(Lt.rotation.x=Math.PI/2,Lt.rotation.z=-.55,Lt.scale.set(1.1,.75,.28),Lt.position.set(0,B+.18,$.z+.6),n.add(Lt),!this.isParked){const ft=new qt(.14,16,16),St=new q(ft,h);St.scale.set(1.1,.65,1.2),St.position.set(-.18,.02,.02),St.castShadow=!0,k.add(St);const Tt=new q(ft,h);Tt.scale.set(1.1,.65,1.2),Tt.position.set(.18,.02,.02),Tt.castShadow=!0,k.add(Tt)}const Nt=new q(new pe(.55,.55,.18,18),r);Nt.position.set(0,.92,-.22),Nt.castShadow=!0,n.add(Nt);const j=new q(new pe(.46,.46,.26,16),r);j.position.set(0,1.1,-.22),j.castShadow=!0,n.add(j);const ut=new q(new qt(.55,18,14),i);ut.scale.set(1.25,.55,.6),ut.position.set(0,.55,2.05),ut.castShadow=!0,n.add(ut);const Et=new q(new On(.35,.05,10,18,Math.PI),r);Et.position.set(0,.45,2.15),Et.rotation.x=Math.PI/2,n.add(Et);const _t=new pe(.32,.32,.22,16),Ft=new pe(.2,.2,.23,16),zt=new pe(.08,.08,.24,16),N=new Ct({color:"#20262c",roughness:.9,metalness:.1}),Gt=new Ct({color:"#A0A0A0",roughness:.4,metalness:.8}),Q=new Ct({color:"#FFFFFF",roughness:.2,metalness:.2}),dt=[[.9,.32,1.2,1],[-.9,.32,1.2,-1],[.9,.32,-1.2,1],[-.9,.32,-1.2,-1]];for(const[ft,St,Tt]of dt){const pt=new te;pt.position.set(ft,St,Tt),pt.rotation.z=Math.PI/2;const Dt=new q(_t,N);Dt.castShadow=!0,pt.add(Dt);const Vt=new q(Ft,Gt);pt.add(Vt);const Ot=new q(zt,Q);pt.add(Ot),n.add(pt)}if(!this.isParked){const St=new q(new qt(.66,22,18),l);St.position.set(0,1.93,-.08),St.castShadow=!0,n.add(St);const Tt=new q(new qt(.42,18,14),l);Tt.scale.set(1.05,.75,.95),Tt.position.set(0,1.45,-.28),Tt.castShadow=!0,n.add(Tt),this.addPlayerStyleFace(St,h,.66);const pt=this.createPlayerStyleEar(-.34,l,u);pt.position.set(-.34,2.43,-.18),n.add(pt);const Dt=this.createPlayerStyleEar(.34,l,u);Dt.position.set(.34,2.43,-.18),n.add(Dt),this.driver={head:St,chest:Tt,earL:pt,earR:Dt,headBaseY:St.position.y,chestBaseY:Tt.position.y,earBaseY:pt.position.y}}const nt=new qt(.2,16,16),J=new qt(.14,16,16),X=new Ct({color:16777215,emissive:16777215,emissiveIntensity:1,roughness:.2}),at=new Ct({color:16776960,emissive:16776960,emissiveIntensity:1.5,roughness:.2}),yt=new Ct({color:16711680,emissive:16711680,emissiveIntensity:1.5,roughness:.2}),T=ft=>{const St=new q(nt,X);St.position.set(ft,.82,2.05),St.scale.set(1,1,.4);const Tt=new q(J,at);return Tt.position.set(0,0,.15),Tt.scale.set(1,1,.6),St.add(Tt),St},w=T(.6);n.add(w);const F=T(-.6);n.add(F);const Y=ft=>{const St=new q(nt,yt);return St.position.set(ft,.82,-2.05),St.scale.set(1,1,.5),St},rt=Y(.6);n.add(rt);const tt=Y(-.6);if(n.add(tt),e){const ft=new Me(.5,.125),St=U0(e),Tt=new He({map:St,side:Ve}),pt=new q(ft,Tt);pt.position.set(0,.6,-2.12),pt.rotation.y=Math.PI,pt.rotation.x=-.1,n.add(pt)}const bt=new q(new pe(.06,.06,.2,8),r);bt.rotation.x=Math.PI/2,bt.position.set(.45,.43,-2.05),n.add(bt);const gt=new pe(.16,.16,.08,24);gt.rotateX(Math.PI/2);const ct=new pe(.13,.13,.02,24);ct.rotateX(Math.PI/2);const Pt=new Ct({color:11393254,roughness:.1,metalness:.9}),xt=ft=>{const St=new te,Tt=new q(gt,i);St.add(Tt);const pt=new q(ct,Pt);pt.position.set(0,0,-.05),St.add(pt);const Dt=new q(new pe(.02,.02,.35,8),r);Dt.rotation.z=ft>0?-Math.PI/2.5:Math.PI/2.5,Dt.position.set(ft>0?-.18:.18,-.1,0),St.add(Dt);const Vt=ft>0?1.3:-1.3;return St.position.set(Vt,1.35,.4),St.rotation.y=ft>0?.25:-.25,St};return n.add(xt(1)),n.add(xt(-1)),n}updateSmoke(t,e=1){if(!this.isParked){if(this.nextSmokeTime-=t,this.nextSmokeTime<=0){const n=e<.1;this.nextSmokeTime=n?.15+Math.random()*.15:.05+Math.random()*.05;const i=new q(N0,z0);i.position.set(.45+(Math.random()-.5)*.1,.43+(Math.random()-.5)*.1,-2.15);const o=n?.35:.6;i.scale.setScalar(o+Math.random()*.4),i.rotation.z=Math.random()*Math.PI,this.smokeGroup.add(i);const r=n?.4:1,a=new P((Math.random()-.5)*.15,(.4+Math.random()*.4)*r,(-1.5-Math.random()*1.5)*r);this.smokeParticles.push({mesh:i,life:1,velocity:a})}for(let n=this.smokeParticles.length-1;n>=0;n--){const i=this.smokeParticles[n];if(i.life-=t,i.life<=0){this.smokeGroup.remove(i.mesh),this.smokeParticles.splice(n,1);continue}i.mesh.position.addScaledVector(i.velocity,t),i.mesh.scale.multiplyScalar(1+t*.5)}}}updateDoorAnimation(t){if(!this.doorPivot)return;const e=Math.min(1,t*this.doorOpenSpeed);this.doorOpen+=(this.doorOpenTarget-this.doorOpen)*e,this.doorOpen=fo.clamp(this.doorOpen,0,1),this.doorPivot.rotation.y=-this.doorOpen*this.doorMaxAngle,this.doorVoid&&(this.doorVoid.visible=this.doorOpen>.05)}addPlayerStyleFace(t,e,n){const i=n/.9,o=new q(new qt(.42*i,24,18),e);o.scale.set(1.1,.7,.9),o.position.set(0,-.15*i,.65*i),o.castShadow=!0,t.add(o);const r=new te;r.position.set(0,-.19*i,1.01*i),t.add(r);const a=new ii({color:3881787,linewidth:2}),c=new qi(new P(-.2*i,-.02*i,0),new P(-.1*i,-.1*i,0),new P(0,-.06*i,0)),l=new ge().setFromPoints(c.getPoints(10));r.add(new Bn(l,a));const h=new qi(new P(0,-.06*i,0),new P(.1*i,-.1*i,0),new P(.2*i,-.02*i,0)),u=new ge().setFromPoints(h.getPoints(10));r.add(new Bn(u,a));const d=new Ct({color:16777215,roughness:.1}),f=new q(new qt(.23*i,32,24),d);f.position.set(-.34*i,.14*i,.74*i),f.scale.set(1,1,.85),t.add(f);const g=new q(new qt(.22*i,32,24),d);g.position.set(.34*i,.14*i,.74*i),g.scale.set(1,1,.85),t.add(g);const _=new Ct({color:0,roughness:.4}),m=new q(new qt(.12*i,24,18),_);m.scale.set(1,1,.45),m.position.set(-.34*i,.14*i,.95*i),t.add(m);const p=new q(new qt(.12*i,24,18),_);p.scale.set(1,1,.45),p.position.set(.34*i,.14*i,.95*i),t.add(p);const y=new He({color:16777215}),x=new q(new qt(.028*i,12,12),y);x.position.set(-.3*i,.18*i,1.05*i),t.add(x);const S=new q(new qt(.028*i,12,12),y);S.position.set(.27*i,.18*i,1.05*i),t.add(S);const R=new qt(.13*i,16,16),A=new Ct({color:2829099,roughness:.4}),C=new q(R,A);C.position.set(0,-.02*i,.89*i),C.scale.set(1.1,.85,.7),t.add(C);const D=new Bn(new ge().setFromPoints([new P(0,-.09*i,.83*i),new P(0,-.19*i,.89*i)]),new ii({color:3355443}));t.add(D);const E=new ii({color:4473924});this.createWhiskerLine(-.35*i,-.1*i,.73*i,Math.PI-.3,1.3*i,E,t),this.createWhiskerLine(-.35*i,-.17*i,.73*i,Math.PI-.15,1.25*i,E,t),this.createWhiskerLine(-.35*i,-.24*i,.73*i,Math.PI,1.2*i,E,t),this.createWhiskerLine(.35*i,-.1*i,.73*i,.3,1.3*i,E,t),this.createWhiskerLine(.35*i,-.17*i,.73*i,.15,1.25*i,E,t),this.createWhiskerLine(.35*i,-.24*i,.73*i,0,1.2*i,E,t)}createWhiskerLine(t,e,n,i,o,r,a){const c=[new P(t,e,n),new P(t+Math.cos(i)*o,e,n+Math.sin(i)*o)],l=new ge().setFromPoints(c);a.add(new Bn(l,r))}createPlayerStyleEar(t,e,n){const i=new te,o=new q(new ci(.26,.48,14),e);o.scale.set(1,1.05,1),i.add(o);const r=new q(new ci(.2,.38,14),n);return r.position.set(0,-.05,.06),r.scale.set(.82,.82,.55),i.add(r),i.rotation.z=t>0?-.45:.45,i.rotation.x=-.1,i.castShadow=!1,i}createFurTexture(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");if(!e){const i=new Se;return i.needsUpdate=!0,i}e.fillStyle="#f2a158",e.fillRect(0,0,t.width,t.height),e.fillStyle="rgba(194, 114, 49, 0.25)";for(let i=0;i<220;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=1+Math.random()*2.2;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}e.fillStyle="rgba(255, 255, 255, 0.05)";for(let i=0;i<80;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=.8+Math.random()*1.4;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}const n=new si(t);return n.wrapS=un,n.wrapT=un,n.repeat.set(2.2,2.2),n.colorSpace=ke,n}}const Ii=["КОТ-404","МЯУ-007","РЫБА","С0Н","ТЫГДЫК","ЛАПКИ","МУР","КУСЬ","ШЕРСТЬ","ЖРАТЬ"];class O0{constructor(){ot(this,"group",new te);ot(this,"wallTexture",Dn("wall","#f5efe8"));ot(this,"roofTexture",Dn("roof","#d07055"));ot(this,"windowTexture",Dn("windows","#7fc8ff"));ot(this,"groundTexture",Dn("grass",ae.groundColor));ot(this,"sandTexture",Dn("sand",ae.sandColor));ot(this,"roadTexture",Dn("road","#555a60"));ot(this,"tileTexture",Dn("tile","#e0e0e0"));ot(this,"cloudTexture",Dn("clouds","rgba(0,0,0,0)"));ot(this,"buildingPaths",[]);ot(this,"centerLineMaterial",new Ct({color:"#ffffff",roughness:.4,metalness:.1,side:on}));ot(this,"colliders",[]);ot(this,"doors",[]);ot(this,"mtsShopDoor");ot(this,"birds",[]);ot(this,"birdsTime",0);ot(this,"intersections",this.computeIntersections());ot(this,"trafficCars",[]);ot(this,"parkedCars",[]);ot(this,"parkingParams",{spotW:2.9,spotD:5.8,gap:.4,pad:1.2,aisle:6.4,drivewayW:3.2});ot(this,"parkingLayouts",[]);ot(this,"trafficState","NS_GO");ot(this,"trafficTimer",0);ot(this,"trafficCycleTime",5);ot(this,"trafficYellowTime",1.5);ot(this,"trafficLights",[]);ot(this,"riverWidth",18);this.wallTexture.repeat.set(2,2),this.roofTexture.repeat.set(2,2),this.windowTexture.repeat.set(1,1),this.parkingLayouts=this.computeParkingLayouts(),this.intersections=this.computeIntersections(),this.buildSky(),this.buildHills(),this.buildGround(),this.buildParks(),this.buildBeach(),this.buildWater(),this.buildRoads(),this.buildPathsToBuildings(),this.buildParkingLots(),this.buildCrosswalks(),this.buildTrafficLights(),this.buildBuildings(),this.buildTrees(),this.buildLamps(),this.buildUmbrellas(),this.buildBenches(),this.buildRocks(),this.buildBirds(),this.buildTrafficCars()}getWorldHeight(t,e){const n=this.getTerrainHeight(t,e);return Math.abs(t- -70)<6&&Math.abs(e- -40)<16?Math.max(n,.04):n}getRiverCenterZ(t){return 160+10*Math.sin(t*.05)}getTerrainHeight(t,e){if(this.isPointNearBuilding(t,e,6)||this.isPointInParking(t,e,4))return 0;let n=0;const i=this.getRiverCenterZ(t),o=Math.abs(e-i);if(o<this.riverWidth){const h=o/this.riverWidth,u=5*(Math.cos(h*Math.PI)+1)*.5;n-=u}const r=-110,a=-80,c=45,l=(t-r)**2+(e-a)**2;if(l<c*c){const u=Math.sqrt(l)/c;n+=7*(Math.cos(u*Math.PI)+1)*.5}return n}isPointInRiver(t,e,n=0){const i=this.getRiverCenterZ(t);return Math.abs(e-i)<this.riverWidth-2+n}update(t){this.updateTrafficLights(t),this.updateBirds(t),this.updateTrafficCars(t)}updateTrafficCars(t){if(this.trafficCars.length===0)return;const e=18,n=2.2,i=6,o=h=>h*h,r=this.intersections,a=4,c=18,l=h=>this.getTrafficLightState(h);for(const h of this.trafficCars){const u=h.object.position,d=h.getForward2D();let f=1,g=1/0;for(const m of this.trafficCars){if(m===h)continue;const p=m.object.position,y=p.x-u.x,x=p.z-u.z,S=o(y)+o(x);if(S>e*e||S<1e-4)continue;const R=Math.sqrt(S),A=y/R,C=x/R;A*d.x+C*d.z<.7||Math.abs(y*d.z-x*d.x)>n||R<g&&(g=R)}if(g<1/0){if(g<i*.4)f=0;else if(g<i){const m=(g-i*.4)/(i*.6);f=Math.min(f,Math.max(0,m))}}for(const m of r){const p=m.x-u.x,y=m.z-u.z,x=o(p)+o(y);if(x>c*c||x<a*a)continue;const S=Math.sqrt(x),R=p/S,A=y/S;if(!(R*d.x+A*d.z>.4))continue;const D=Math.abs(y)>Math.abs(p)?"NS":"EW",E=l(D);if(!(E==="RED"||E==="YELLOW"))continue;const I=(S-a)/Math.max(c-a,.001),B=Math.max(0,Math.min(1,I));f=Math.min(f,B)}h.setSpeedScale(f);const _=this.getWorldHeight(u.x,u.z);h.update(t,_)}}buildTrafficCars(){const t=kt.roads??[];if(t.length===0)return;const e=(a,c,l)=>Math.max(c,Math.min(l,a)),n=a=>{const c=a.rotation??0,l=a.length/2,h=a.width/2-1.15,u=e(a.width*.25,1.2,Math.max(1.2,h)),d=4,f=4.5,g=[];for(let m=-l+d;m<=l-d+1e-6;m+=f){const p=this.localToWorldXZ(a.position.x,a.position.z,c,u,m);g.push(new P(p.x,0,p.z))}const _=[];for(let m=l-d;m>=-l+d-1e-6;m-=f){const p=this.localToWorldXZ(a.position.x,a.position.z,c,-u,m);_.push(new P(p.x,0,p.z))}if(g.length>0&&_.length>0){const m=g[g.length-1],p=_[0];m.distanceTo(p)<.1&&_.shift()}if(_.length>0&&g.length>0){const m=_[_.length-1],p=g[0];m.distanceTo(p)<.1&&g.shift()}return[...g,..._]},i=a=>t[a]??null,o=[i(0),i(1),i(2)].filter(Boolean);if(o.length===0)return;const r=["#ff6b6b","#6bcBff","#ffd166"];o.forEach((a,c)=>{const l=n(a);if(l.length<4)return;const h=Ii[Math.floor(Math.random()*Ii.length)],u=new js(l,{color:r[c%r.length],speed:8,y:.23,startIndex:Math.floor(l.length*c/o.length),plateText:h});this.trafficCars.push(u),this.group.add(u.object)})}computeWorldBounds2D(t){let e=-130,n=ae.worldSize/2,i=-260/2,o=ae.worldSize/2;const r=(c,l,h,u)=>{e=Math.min(e,c),n=Math.max(n,l),i=Math.min(i,h),o=Math.max(o,u)};for(const c of kt.roads??[]){const l=c.rotation??0,h=Math.abs(Math.cos(l)),u=Math.abs(Math.sin(l)),d=c.width/2,f=c.length/2,g=h*d+u*f,_=u*d+h*f;r(c.position.x-g,c.position.x+g,c.position.z-_,c.position.z+_)}for(const c of kt.buildings??[]){const l=c.size.x/2,h=c.size.z/2;r(c.position.x-l,c.position.x+l,c.position.z-h,c.position.z+h)}const a=[...kt.waterAreas??[],...kt.beachAreas??[],...kt.parks??[]];for(const c of a)r(c.position.x-c.width/2,c.position.x+c.width/2,c.position.z-c.depth/2,c.position.z+c.depth/2);return{minX:e-t,maxX:n+t,minZ:i-t,maxZ:o+t}}buildSky(){const t=ae.worldSize*1.6,e=new qt(t,32,32),n=new bn({side:Ce,uniforms:{topColor:{value:new jt(ae.skyTopColor)},bottomColor:{value:new jt(ae.skyBottomColor)},offset:{value:24},exponent:{value:.42}},vertexShader:`
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
      `}),i=new q(e,n);this.group.add(i),this.buildSunAndClouds()}buildSunAndClouds(){const t=ae.worldSize*3,e=105,n=35,i=ae.worldSize*1.6,o=new te,r=Math.min(i*.78,t*.6),a=Math.min(i*.5,e+n*.45);o.position.set(0,a,-r);const c=ae.worldSize*.075,l=new q(new qt(c,28,28),new He({color:16773552,fog:!1,depthWrite:!1,depthTest:!0}));l.renderOrder=3,o.add(l);const h=new q(new qt(c*2.4,28,28),new He({color:16770979,fog:!1,transparent:!0,opacity:.42,side:Ce,depthWrite:!1,depthTest:!0}));h.renderOrder=2,o.add(h);const u=new q(new qt(c*1.8,28,28),new He({color:16765834,fog:!1,transparent:!0,opacity:.48,side:Ce,depthWrite:!1,depthTest:!0}));u.renderOrder=2,o.add(u),this.group.add(o),this.cloudTexture.wrapS=this.cloudTexture.wrapT=un,this.cloudTexture.repeat.set(1,1);const d=new Ct({color:"#ffffff",roughness:1,metalness:0,transparent:!0,opacity:.85,emissive:"#ffffff",emissiveIntensity:.03,alphaMap:this.cloudTexture,depthWrite:!1}),f=(m,p,y,x)=>{const S=new te,R=5;for(let A=0;A<R;A+=1){const C=7+Math.random()*5,D=new q(new qt(C,18,18),d);D.position.set((Math.random()-.5)*20,(Math.random()-.5)*5,(Math.random()-.5)*12),S.add(D)}return S.position.set(m,p,y),S.scale.setScalar(x),S.rotation.y=Math.random()*Math.PI*2,S.renderOrder=2,S},g=new te,_=18;for(let m=0;m<_;m+=1){const p=(Math.random()-.5)*t,y=(Math.random()-.5)*t,x=e+Math.random()*n,S=.9+Math.random()*.55;g.add(f(p,x,y,S))}this.group.add(g)}buildGround(){const t=this.computeWorldBounds2D(40),e=Math.max(t.maxX-t.minX,t.maxZ-t.minZ,ae.worldSize),n=128,i=new Me(e,e,n,n),o=i.attributes.position;for(let h=0;h<o.count;h++){const u=o.getX(h),d=o.getY(h),f=u,g=-d;let _=this.getTerrainHeight(f,g);this.isPointOnRoad(f,g,1.5)&&(_-=.4),o.setZ(h,_)}i.computeVertexNormals(),this.groundTexture.repeat.set(10,10);const r=new Ct({color:ae.groundColor,map:this.groundTexture,roughness:.85,metalness:.05}),a=new q(i,r);a.rotation.x=-Math.PI/2,a.receiveShadow=!0,this.group.add(a);const c=["#ff6b6b","#ff9ff3","#ffeaa7","#a29bfe","#ff7675","#fdcb6e","#fef5e7","#c8d6e5","#ffcccc"],l=ae.worldSize*.5;for(let h=0;h<1200;h+=1){const u=Math.random()*Math.PI*2,d=Math.random()*l,f=Math.cos(u)*d,g=Math.sin(u)*d;if(this.isPointOnRoad(f,g,1.2)||this.isPointOnPath(f,g,.5)||this.isPointInParking(f,g,1.4)||this.isPointNearBuilding(f,g,2.8)||this.isPointInAreas(f,g,kt.waterAreas,0)||this.isPointInAreas(f,g,kt.beachAreas,0))continue;const _=c[Math.floor(Math.random()*c.length)],m=new q(new pe(.04,.04,.6,6),new Ct({color:"#27ae60"}));m.position.set(f,.3,g);const p=this.createFlowerHead(_);p.position.set(f,.65,g),p.castShadow=!0,this.group.add(m,p);const y=.8+Math.random()*1;m.scale.set(y,y,y),p.scale.set(y,y,y)}this.buildBushes()}isPointOnPath(t,e,n=0){for(const i of this.buildingPaths){const o=i.p1.distanceToSquared(i.p2);if(o===0){if(i.p1.distanceTo(new ht(t,e))<i.width/2+n)return!0;continue}const r=((t-i.p1.x)*(i.p2.x-i.p1.x)+(e-i.p1.y)*(i.p2.y-i.p1.y))/o,a=Math.max(0,Math.min(1,r)),c=i.p1.x+a*(i.p2.x-i.p1.x),l=i.p1.y+a*(i.p2.y-i.p1.y);if(Math.hypot(t-c,e-l)<i.width/2+n)return!0}return!1}createFlowerHead(t){const e=new te,n=new q(new qt(.08,8,8),new Ct({color:"#ffff00"}));e.add(n);const i=new qt(.08,8,8),o=new Ct({color:t,roughness:.6});for(let r=0;r<5;r++){const a=r/5*Math.PI*2,c=new q(i,o);c.position.set(Math.cos(a)*.1,0,Math.sin(a)*.1),e.add(c)}return e}createBushMesh(t){const e=new te,n=new q(new pe(.1*t,.15*t,.4*t,6),new Ct({color:"#7a5138",roughness:1}));n.position.y=.2*t,n.castShadow=!0,e.add(n);const i=["#2ecc71","#27ae60","#16a085","#2ecc71"],o=i[Math.floor(Math.random()*i.length)],r=new Ct({color:o,roughness:.8}),a=2+Math.floor(Math.random()*2);for(let c=0;c<a;c++){const l=(.5+Math.random()*.3)*t,h=new q(new qt(l,7,7),r);h.position.set((Math.random()-.5)*.3*t,(.4+c*.4)*t,(Math.random()-.5)*.3*t),h.castShadow=!0,e.add(h)}return e}buildBushes(){for(let t=0;t<60;t++){const e=20+Math.random()*80,n=Math.random()*Math.PI*2,i=Math.cos(n)*e,o=Math.sin(n)*e;if(this.isPointOnRoad(i,o,2)||this.isPointNearBuilding(i,o,3)||this.isPointInRiver(i,o,2)||this.isPointInParking(i,o,2))continue;const r=this.getWorldHeight(i,o),a=this.createBushMesh(1+Math.random()*.5);a.position.set(i,r,o),this.group.add(a)}}isPointInAreas(t,e,n,i){return n?n.some(o=>Math.abs(t-o.position.x)<=o.width/2+i&&Math.abs(e-o.position.z)<=o.depth/2+i):!1}isPointOnRoad(t,e,n=0){const i=kt.roads??[];for(const o of i){const r=o.rotation??0,a=this.worldToLocalXZ(o.position.x,o.position.z,r,t,e);if(Math.abs(a.x)<=o.width/2+n&&Math.abs(a.z)<=o.length/2+n)return!0}return!1}isPointNearBuilding(t,e,n){return kt.buildings.some(i=>{const o=i.rotation??0,r=this.worldToLocalXZ(i.position.x,i.position.z,o,t,e);return Math.abs(r.x)<=i.size.x/2+n&&Math.abs(r.z)<=i.size.z/2+n})}isMainRoad(t){return(t.center??"none")!=="none"||t.width>=10}getClosestRoadInfo(t,e,n=!1){const i=kt.roads??[];if(i.length===0)return null;const o=(c,l,h)=>Math.max(l,Math.min(h,c));let r=null,a=null;for(const c of i){const l=c.rotation??0,h=this.worldToLocalXZ(c.position.x,c.position.z,l,t,e),u=o(h.x,-c.width/2,c.width/2),d=o(h.z,-c.length/2,c.length/2),f=this.localToWorldXZ(c.position.x,c.position.z,l,u,d),g=t-f.x,_=e-f.z,m=g*g+_*_,p={road:c,worldOnRoad:f,localOnRoad:{x:u,z:d},distance2:m};(!r||m<r.distance2)&&(r=p),this.isMainRoad(c)&&(!a||m<a.distance2)&&(a=p)}return!n||!a||!r?r:a.distance2<=r.distance2*1.6?a:r}isPointInParking(t,e,n=0){return this.parkingLayouts.some(i=>{const o=this.worldToLocalXZ(i.center.x,i.center.z,i.rotation,t,e);return Math.abs(o.x)<=i.totalW/2+n&&Math.abs(o.z)<=i.totalD/2+n})}worldToLocalXZ(t,e,n,i,o){const r=i-t,a=o-e,c=Math.cos(-n),l=Math.sin(-n);return{x:r*c+a*l,z:-r*l+a*c}}computeIntersections(){const t=kt.roads??[],e=1e-6,n=(r,a)=>r.x*a.z-r.z*a.x,i=r=>({x:Math.sin(r),z:Math.cos(r)}),o=[];for(let r=0;r<t.length;r+=1)for(let a=r+1;a<t.length;a+=1){const c=t[r],l=t[a],h=c.rotation??0,u=l.rotation??0,d={x:c.position.x,z:c.position.z},f={x:l.position.x,z:l.position.z},g=i(h),_=i(u),m=n(g,_);if(Math.abs(m)<e)continue;const p={x:f.x-d.x,z:f.z-d.z},y=n(p,_)/m,x={x:d.x+g.x*y,z:d.z+g.z*y},S=this.worldToLocalXZ(c.position.x,c.position.z,h,x.x,x.z),R=this.worldToLocalXZ(l.position.x,l.position.z,u,x.x,x.z),A=Math.abs(S.x)<=c.width/2+.01&&Math.abs(S.z)<=c.length/2+.01,C=Math.abs(R.x)<=l.width/2+.01&&Math.abs(R.z)<=l.length/2+.01;if(!A||!C)continue;const D=Math.max(c.width,l.width),E=D/2+7.5;o.some(I=>Math.hypot(I.x-x.x,I.z-x.z)<.5)||o.push({x:x.x,z:x.z,halfSize:E,roadWidth:D})}return o}buildHills(){const t=["#5fae6a","#72bf76","#86c56f","#a7cf6a","#c9c56a","#8bbf8a"],e=this.computeWorldBounds2D(0),i=Math.max(Math.abs(e.minX),Math.abs(e.maxX),Math.abs(e.minZ),Math.abs(e.maxZ))+6,o=20,r=(a,c,l)=>{const h=a.attributes.position;if(h){for(let u=0;u<h.count;u+=1){const d=h.getX(u),f=h.getY(u),g=h.getZ(u);if(Math.hypot(d,g)<1e-6)continue;const m=Math.min(1,Math.max(0,f/Math.max(1e-6,l))),p=1-Math.min(1,Math.max(0,m)),y=Math.sin(d*3.1)*.35+Math.cos(g*2.7)*.35,x=(Math.random()-.5)*.5,S=1+(y+x)*c*p;h.setXYZ(u,d*S,f,g*S)}a.computeVertexNormals()}};for(let a=0;a<o;a+=1){const c=a/o*Math.PI*2,l=i+(Math.random()-.5)*14,h=Math.cos(c)*l,u=Math.sin(c)*l,d=20+Math.random()*22,f=7+Math.random()*10,g=t[Math.floor(Math.random()*t.length)],_=new Ct({color:g,roughness:.95,metalness:0}),m=[],p=18,y=d,x=f,S=2,R=1.05;for(let E=0;E<=p;E+=1){const M=E/p,I=M*y,B=x*Math.pow(Math.max(0,1-Math.pow(M,S)),R);m.push(new ht(I,B))}const A=new _o(m,28);r(A,.07,x);const C=new q(A,_);C.castShadow=!1,C.receiveShadow=!1,C.position.set(h,-1.6,u),C.rotation.y=Math.random()*Math.PI*2,this.group.add(C);const D=6+Math.floor(Math.random()*10);for(let E=0;E<D;E+=1){const M=Math.random()*Math.PI*2,I=d*(.75+Math.random()*.55),B=h+Math.cos(M)*I,L=u+Math.sin(M)*I;this.isPointOnRoad(B,L,1.2)||this.isPointNearBuilding(B,L,4.5)||this.isPointInAreas(B,L,kt.waterAreas,2)||this.isPointInAreas(B,L,kt.beachAreas,2)||this.addTree(B,L)}}}buildBeach(){const t=kt.beachAreas;if(!t||t.length===0)return;this.sandTexture.repeat.set(8,6);const e=new Ct({color:ae.sandColor,map:this.sandTexture,roughness:.9,metalness:0});t.forEach(n=>{const o=new Me(n.width,n.depth,16,16),r=o.attributes.position;for(let c=0;c<r.count;c++){const l=r.getX(c),h=r.getY(c),u=this.getWorldHeight(n.position.x+l,n.position.z-h);r.setZ(c,u)}o.computeVertexNormals();const a=new q(o,e);a.position.set(n.position.x,.12,n.position.z),a.rotation.x=-Math.PI/2,a.receiveShadow=!0,this.group.add(a)})}buildWater(){const t=new Ct({color:"#4FA4F4",roughness:.1,metalness:.5,transparent:!0,opacity:.85}),e=kt.waterAreas;e==null||e.forEach(c=>{const l=new q(new Me(c.width,c.depth),t);l.rotation.x=-Math.PI/2,l.position.set(c.position.x,-1.8,c.position.z),this.group.add(l)});const n=400,i=120,o=new Me(n,this.riverWidth,i,4),r=o.attributes.position;for(let c=0;c<r.count;c++){const l=r.getX(c),h=r.getY(c),u=l,d=this.getRiverCenterZ(u);r.setX(c,u),r.setY(c,-(d+h)),r.setZ(c,0)}o.computeVertexNormals(),o.computeBoundingBox(),o.computeBoundingSphere();const a=new q(o,t);a.rotation.x=-Math.PI/2,a.position.y=-3.8,this.group.add(a)}buildRoads(){var t;(t=kt.roads)==null||t.forEach(e=>{const n=new te;n.position.set(e.position.x,0,e.position.z),n.rotation.y=e.rotation??0;const i=Math.max(2,Math.ceil(e.length/4)),o=new Me(e.width,e.length,4,i),r=o.attributes.position;n.updateMatrixWorld();const a=Math.cos(e.rotation??0),c=Math.sin(e.rotation??0),l=e.position.x,h=e.position.z;for(let g=0;g<r.count;g++){const _=r.getX(g),p=-r.getY(g),y=_*a+p*c+l,x=-_*c+p*a+h;let R=this.getTerrainHeight(y,x);R<-.5&&(R=0),R+=.04,r.setZ(g,R)}o.computeVertexNormals();const u=new q(o,new Ct({color:"#555a60",map:this.roadTexture,roughness:.9,metalness:.08}));u.rotation.x=-Math.PI/2,u.receiveShadow=!0,n.add(u),this.group.add(n);const d=e.center??"none";this.addCenterLine(n,d,e.length,e);const f=8;for(let g=-e.length/2;g<=e.length/2;g+=f){const _=e.position.x+0*a+g*c,m=e.position.z+(-0*c+g*a),y=this.getTerrainHeight(_,m)<-.5,x=this.isPointNearBuilding(_,m,4)||this.isPointInParking(_,m,4);y&&!x&&((g%16===0||Math.abs(g%16)<f/2)&&this.addPillar(n,g,e.width),this.addRailingSegment(n,g,f,e.width))}})}addPillar(t,e,n){const i=new pe(.6,.6,8),o=new Ct({color:"#555555"}),r=new q(i,o);r.position.set(-n/2+1,-4,e),t.add(r);const a=new q(i,o);a.position.set(n/2-1,-4,e),t.add(a)}addRailingSegment(t,e,n,i){const r=new Ct({color:"#888888",roughness:.5}),a=new ie(.3,1,n),c=new q(a,r);c.position.set(-i/2,1/2,e),t.add(c);const l=new q(a,r);l.position.set(i/2,1/2,e),t.add(l)}buildPathsToBuildings(){const t=new Ct({color:"#dcdcdc",map:this.tileTexture,roughness:.9,metalness:.1}),e=kt.roads??[];if(e.length===0)return;const n=2.4,i=.03,o=(l,h,u)=>Math.max(h,Math.min(u,l)),r=(l,h,u,d)=>{const f=u-l.x,g=d-l.z,_=Math.cos(-h),m=Math.sin(-h);return{x:f*_+g*m,z:-f*m+g*_}},a=(l,h,u,d)=>{const f=Math.cos(h),g=Math.sin(h);return{x:l.x+u*f+d*g,z:l.z+(-u*g+d*f)}},c=(l,h)=>{let u={x:e[0].position.x,z:e[0].position.z},d=1/0;for(const f of e){const g=f.rotation??0,_=r(f.position,g,l,h),m=o(_.x,-f.width/2,f.width/2),p=o(_.z,-f.length/2,f.length/2),y=a(f.position,g,m,p),x=(l-y.x)**2+(h-y.z)**2;x<d&&(d=x,u=y)}return u};kt.buildings.forEach(l=>{const h=l.rotation??0,u=l.size.z/2+Rt.door.localZOutset,d=a(l.position,h,0,u),f=c(d.x,d.z),g=d.x-f.x,_=d.z-f.z,m=Math.hypot(g,_);if(m<.5)return;const p=new q(new ie(m,.06,n),t),y=(d.x+f.x)/2,x=(d.z+f.z)/2;p.position.set(y,i,x);const S=-Math.atan2(_,g);p.rotation.y=S,p.receiveShadow=!0,this.group.add(p),this.buildingPaths.push({p1:new ht(d.x,d.z),p2:new ht(f.x,f.z),width:n});const R=-_/m,A=g/m,D=Math.floor(m/3.5),E=n/2+.8;for(let M=1;M<D;M++){const I=M/D,B=f.x+g*I,L=f.z+_*I,W=B+R*E,U=L+A*E,K=B-R*E,it=L-A*E,k=($,et)=>{const mt=this.createBushMesh(.5),Lt=this.getTerrainHeight($,et);mt.position.set($,Lt,et),this.group.add(mt)};Math.random()>.3&&k(W,U),Math.random()>.3&&k(K,it)}})}pushLotAwayFromRoadIfNeeded(t,e,n,i,o){const r=this.getClosestRoadInfo(t.x,t.z,!0);if(!r)return t;const a=r.road,c=a.rotation??0,l=this.worldToLocalXZ(a.position.x,a.position.z,c,t.x,t.z),h=e-c,u=Math.abs(Math.cos(h))*n+Math.abs(Math.sin(h))*i,d=a.width/2+u+o,f=Math.abs(l.x);if(f>=d)return t;const g=d-f,_=Math.sign(l.x)||1,m=Math.cos(c)*_,p=-Math.sin(c)*_;return{x:t.x+m*g,z:t.z+p*g}}computeParkingLayouts(){const t=kt.parkingLots;if(!t||t.length===0)return[];const{spotW:e,spotD:n,gap:i,pad:o,aisle:r}=this.parkingParams,a=[];return t.forEach(c=>{const l=kt.buildings[c.buildingIndex];if(!l)return;const h=l.rotation??0,u=Math.max(1,Math.floor(c.spots)),d=u<=5?1:2,f=d===1?u:Math.ceil(u/2),g=d===2?Math.floor(u/2):0,_=Math.max(f,g,1),m=_*e+(_-1)*i+o*2,p=d===1?n+r+o*2:2*n+r+o*2,y=this.getBuildingSafePosition(l),x=l.size.z/2+Rt.door.localZOutset,S=this.localToWorldXZ(y.x,y.z,h,0,x),R=this.getClosestRoadInfo(S.x,S.z,!0),A=(R==null?void 0:R.worldOnRoad)??S,C=l.size.z/2+p/2+3.2,D=l.size.x/2+m/2+1.2,E=-D,M=this.localToWorldXZ(y.x,y.z,h,D,C),I=this.localToWorldXZ(y.x,y.z,h,E,C),B=(M.x-A.x)**2+(M.z-A.z)**2,W=(I.x-A.x)**2+(I.z-A.z)**2<B?{x:E,z:C}:{x:D,z:C};let U=this.localToWorldXZ(y.x,y.z,h,W.x,W.z);U=this.pushLotAwayFromRoadIfNeeded(U,h,m/2,p/2,.8);const K=d===2?0:-p/2+o+n+r/2,it=d===1?[-r/2]:[-(r/2+n/2),+(r/2+n/2)],k=this.getClosestRoadInfo(U.x,U.z,!0);a.push({buildingIndex:c.buildingIndex,center:U,rotation:h,totalW:m,totalD:p,rows:d,spots:u,spotsRowA:f,spotsRowB:g,rowCentersLocalZ:it,aisleCenterZ:K,roadForLot:k})}),a}buildParkingLots(){if(this.parkingLayouts.length===0)return;const t=new Ct({color:"#3f464d",roughness:.95,metalness:.05}),e=new Ct({color:"#f7f9fc",roughness:.4,metalness:.05}),{spotW:n,spotD:i,gap:o,pad:r,aisle:a,drivewayW:c}=this.parkingParams,l=.024,h=(f,g,_,m)=>{const p=Math.cos(g),y=Math.sin(g);return{x:f.x+_*p+m*y,z:f.z+(-_*y+m*p)}},u=(f,g,_,m)=>{const p=g.x-f.x,y=g.z-f.z,x=Math.hypot(p,y);if(x<.25)return;const S=new q(new ie(x,.06,_),m);S.position.set((f.x+g.x)/2,l,(f.z+g.z)/2),S.rotation.y=-Math.atan2(y,p),S.receiveShadow=!0,this.group.add(S)},d=["#ff6b6b","#6bcBff","#ffd166","#a29bfe"];this.parkingLayouts.forEach(f=>{const{center:g,rotation:_,totalW:m,totalD:p,rows:y,spotsRowA:x,spotsRowB:S,rowCentersLocalZ:R,aisleCenterZ:A}=f,C=new q(new ie(m,.08,p),t);C.position.set(g.x,.025,g.z),C.rotation.y=_,C.receiveShadow=!0,this.group.add(C);const D=(U,K,it)=>{const k=h({x:g.x,z:g.z},_,U,K),$=new q(new ie(.08,.06,it),e);$.position.set(k.x,.07,k.z),$.rotation.y=_,this.group.add($)};for(let U=0;U<R.length;U+=1){const K=R[U],it=i,$=Math.max(1,y===1||U===0?x:S);for(let j=0;j<=$;j+=1){const ut=-m/2+r+j*(n+o);D(ut,K,it)}const et=Math.sign(K)||-1,mt=K+et*(i/2-.12),Lt=h({x:g.x,z:g.z},_,0,mt),Nt=new q(new ie(m-r*2,.06,.08),e);Nt.position.set(Lt.x,.07,Lt.z),Nt.rotation.y=_,this.group.add(Nt)}const E=.08,M=U=>{const K=h({x:g.x,z:g.z},_,0,U),it=new q(new ie(m-r*2,.06,E),e);it.position.set(K.x,.07,K.z),it.rotation.y=_,this.group.add(it)};y===2?(M(-a/2),M(+a/2)):M(R[0]+i/2);const I=f.roadForLot;if(I){const U=I.road,K=U.rotation??0,it=this.worldToLocalXZ(U.position.x,U.position.z,K,g.x,g.z),k=Math.sign(it.x)||1,$=.25,et=6,mt=h(U.position,K,k*(U.width/2+$),I.localOnRoad.z),Lt=h(U.position,K,k*(U.width/2+$+et),I.localOnRoad.z),Nt=h({x:g.x,z:g.z},_,-m/2,A),j=h({x:g.x,z:g.z},_,+m/2,A),ut=(Nt.x-Lt.x)**2+(Nt.z-Lt.z)**2,Et=(j.x-Lt.x)**2+(j.z-Lt.z)**2,_t=ut<Et?Nt:j,Ft=this.worldToLocalXZ(U.position.x,U.position.z,K,_t.x,_t.z),zt=h(U.position,K,k*(U.width/2+$+et),Ft.z);u(mt,Lt,c,t),u(Lt,zt,c,t),u(zt,_t,c,t)}const B=[];for(let U=0;U<R.length;U+=1){const K=R[U],k=Math.max(1,y===1||U===0?x:S),$=K>=0?Math.PI:0;for(let et=0;et<k;et+=1){const mt=-m/2+r+n/2+et*(n+o);B.push({x:mt,z:K,yaw:$})}}const L=Math.min(2,B.length);(L===1?[Math.floor(B.length/2)]:[0,Math.max(0,B.length-1)]).slice(0,L).forEach((U,K)=>{const it=B[U];if(!it)return;const k=h({x:g.x,z:g.z},_,it.x,it.z),$=d[(f.buildingIndex+K)%d.length],et=Ii[Math.floor(Math.random()*Ii.length)],mt=new js([new P(k.x,0,k.z)],{color:$,speed:0,parked:!0,plateText:et});mt.object.position.set(k.x,.23,k.z),mt.object.rotation.y=_+it.yaw,mt.object.userData.parkedCar=!0,mt.object.userData.carColor=$,this.group.add(mt.object),this.parkedCars.push({car:mt,object:mt.object,radius:2.6,doorOpen:!1})})})}addCenterLine(t,e,n,i){if(e==="none")return;if(e==="dashed"){this.addDashedLine(t,0,n,this.centerLineMaterial,i);return}const o=r=>{this.computeCenterLineIntervals(i).forEach(c=>{const l=c.b-c.a;if(l<.6)return;const h=(c.a+c.b)/2;t.add(this.createSolidLine(r,l,this.centerLineMaterial,h,i))})};if(e==="solid"){o(0);return}e==="double"&&(o(-.35),o(.35))}computeCenterLineIntervals(t){const e=t.rotation??0,n=-t.length/2,i=t.length/2,o=[];for(const l of this.intersections){const h=this.worldToLocalXZ(t.position.x,t.position.z,e,l.x,l.z);if(Math.abs(h.x)>t.width/2+.6)continue;const u=l.halfSize+1,d=Math.max(n,h.z-u),f=Math.min(i,h.z+u);f<=n||d>=i||o.push({a:d,b:f})}if(o.length===0)return[{a:n,b:i}];o.sort((l,h)=>l.a-h.a);const r=[];for(const l of o){const h=r[r.length-1];!h||l.a>h.b?r.push({a:l.a,b:l.b}):h.b=Math.max(h.b,l.b)}const a=[];let c=n;for(const l of r)l.a>c&&a.push({a:c,b:l.a}),c=Math.max(c,l.b);return i>c&&a.push({a:c,b:i}),a}buildCrosswalks(){var e;const t=new Ct({color:"#f7f9fc",roughness:.3});(e=kt.crosswalks)==null||e.forEach(n=>{const i=new te,o=.45,r=.75,a=Math.floor(n.length/r)+2,c=-n.length/2+o/2;for(let l=0;l<a;l+=1){const h=c+l*r;if(h>n.length/2)break;const u=new q(new Me(n.width,o),t);u.position.set(0,.06,h),u.rotation.x=-Math.PI/2,i.add(u)}i.position.set(n.position.x,.05,n.position.z),i.rotation.y=n.rotation??0,this.group.add(i)})}createSolidLine(t,e,n,i=0,o){const r=Math.max(2,Math.ceil(e/4)),a=new Me(.18,e,1,r),c=a.attributes.position,l=o.rotation??0,h=o.position.x,u=o.position.z,d=Math.cos(l),f=Math.sin(l);for(let _=0;_<c.count;_++){const m=c.getX(_),p=c.getY(_),y=t+m,x=i+p,S=h+y*d+x*f,R=u+(-y*f+x*d);let A=this.getWorldHeight(S,R);A<-.5&&(A=0),A+=.055,c.setZ(_,A)}a.computeVertexNormals();for(let _=0;_<c.count;_++){const m=c.getX(_),p=c.getY(_);c.setX(_,m+t),c.setY(_,p+i)}const g=new q(a,n);return g.rotation.x=-Math.PI/2,g.receiveShadow=!1,g}addDashedLine(t,e,n,i,o){const c=Math.floor(n/5),l=o.rotation??0,h=Math.cos(l),u=Math.sin(l),d=o.position.x,f=o.position.z;for(let g=0;g<c;g+=1){const _=-n/2+1.5+g*5,m=this.localToWorldXZ(d,f,l,e,_),p=this.localToWorldXZ(d,f,l,e,_-3/2),y=this.localToWorldXZ(d,f,l,e,_+3/2);if(this.isInAnyIntersection(m.x,m.z)||this.isInAnyIntersection(p.x,p.z)||this.isInAnyIntersection(y.x,y.z))continue;const x=new Me(.18,3,1,2),S=x.attributes.position;for(let A=0;A<S.count;A++){const C=S.getX(A),D=S.getY(A),E=_+D,M=e+C,I=d+M*h+E*u,B=f+(-M*u+E*h);let L=this.getWorldHeight(I,B);L<-.5&&(L=0),L+=.055,S.setX(A,M),S.setY(A,E),S.setZ(A,L)}const R=new q(x,i);R.rotation.x=-Math.PI/2,R.receiveShadow=!1,t.add(R)}}isInAnyIntersection(t,e){return this.intersections.some(n=>Math.abs(t-n.x)<=n.halfSize&&Math.abs(e-n.z)<=n.halfSize)}localToWorldXZ(t,e,n,i,o){const r=Math.cos(n),a=Math.sin(n);return{x:t+i*r+o*a,z:e+(-i*a+o*r)}}buildTrafficLights(){if(this.intersections.length===0)return;const t=new pe(.1,.1,4,8),e=new Ct({color:2899536}),n=new ie(.5,1.2,.5),i=new xo(.15,16);this.intersections.forEach(o=>{const r=o.roadWidth/2+.6;[{x:-r,z:-r,rot:0,type:"NS"},{x:r,z:-r,rot:-Math.PI/2,type:"EW"},{x:r,z:r,rot:Math.PI,type:"NS"},{x:-r,z:r,rot:Math.PI/2,type:"EW"}].forEach(c=>{const l=c.x+o.x,h=c.z+o.z;if(this.isPointInParking(l,h,1))return;const u=new te;u.position.set(l,0,h);const d=new q(t,e);d.position.y=2,d.castShadow=!0,u.add(d);const f=new q(n,e);f.position.set(0,3.5,0),f.rotation.y=c.rot,f.castShadow=!0,u.add(f);const g=new He({color:3342336}),_=new He({color:3355392}),m=new He({color:13056}),p=new q(i,g);p.position.set(0,.3,.26),f.add(p);const y=new q(i,_);y.position.set(0,0,.26),f.add(y);const x=new q(i,m);x.position.set(0,-.3,.26),f.add(x),this.trafficLights.push({type:c.type,red:g,yellow:_,green:m}),this.group.add(u)})}),this.applyTrafficLightVisuals()}updateTrafficLights(t){if(this.trafficLights.length!==0)switch(this.trafficTimer+=t,this.trafficState){case"NS_GO":this.trafficTimer>=this.trafficCycleTime&&this.transitionTraffic("NS_YELLOW");break;case"NS_YELLOW":this.trafficTimer>=this.trafficYellowTime&&this.transitionTraffic("EW_GO");break;case"EW_GO":this.trafficTimer>=this.trafficCycleTime&&this.transitionTraffic("EW_YELLOW");break;case"EW_YELLOW":this.trafficTimer>=this.trafficYellowTime&&this.transitionTraffic("NS_GO");break}}transitionTraffic(t){this.trafficState=t,this.trafficTimer=0,this.applyTrafficLightVisuals()}getTrafficLightState(t){return this.trafficState===`${t}_GO`?"GREEN":this.trafficState===`${t}_YELLOW`?"YELLOW":"RED"}applyTrafficLightVisuals(){this.trafficLights.forEach(t=>{t.red.color.setHex(3342336),t.yellow.color.setHex(3355392),t.green.color.setHex(13056);const e=this.getTrafficLightState(t.type);e==="RED"&&t.red.color.setHex(16711680),e==="YELLOW"&&t.yellow.color.setHex(16776960),e==="GREEN"&&t.green.color.setHex(65280)})}buildParks(){var e;const t=new Ct({color:"#76d09a",roughness:.85,metalness:.03});(e=kt.parks)==null||e.forEach(n=>{const o=new q(new Me(n.width,n.depth,16,16),t),r=o.geometry.attributes.position;for(let a=0;a<r.count;a++){const c=r.getX(a),l=r.getY(a),h=n.position.x+c,u=n.position.z-l,d=this.getTerrainHeight(h,u);r.setZ(a,d)}o.geometry.computeVertexNormals(),o.rotation.x=-Math.PI/2,o.position.set(n.position.x,.15,n.position.z),o.receiveShadow=!0,this.group.add(o)})}getBuildingSafePosition(t){const e=kt.roads??[],n=.8;let i={x:t.position.x,z:t.position.z};const o=t.rotation??0,r=t.size.x/2,a=t.size.z/2;for(const c of e){const l=c.rotation??0,h=this.worldToLocalXZ(c.position.x,c.position.z,l,i.x,i.z),u=o-l,d=Math.abs(Math.cos(u)),f=Math.abs(Math.sin(u)),g=d*r+f*a,_=f*r+d*a,m=c.width/2+g+n,p=c.length/2+_+n;if(Math.abs(h.x)<m&&Math.abs(h.z)<p){const y=m-Math.abs(h.x),x=Math.sign(h.x)||1,S=Math.cos(l)*x,R=-Math.sin(l)*x;i={x:i.x+S*y,z:i.z+R*y}}}return i}buildBuildings(){kt.buildings.forEach(t=>{let e=this.getBuildingSafePosition(t);const n=this.getRiverCenterZ(e.x),i=e.z-n,o=t.size.z/2+9;if(Math.abs(i)<o){const d=Math.sign(i)||1,f=n+d*o;e={x:e.x,z:f}}const r=t.rotation??0,a=this.getWorldHeight(e.x,e.z),c=D0({...t,position:e},{wall:this.wallTexture,roof:this.roofTexture,windows:this.windowTexture});c.position.y=a,this.colliders.push({position:{x:e.x,z:e.z},half:{x:t.size.x/2+.4,z:t.size.z/2+.4},rotation:r,type:"building"});const l=c.userData.door,h=t.size.z/2+Rt.door.localZOutset,u=this.localToWorldXZ(e.x,e.z,r,0,h);l&&(this.doors.push({mesh:l,position:u,rotation:r,open:0,label:t.label}),t.label==="МТС SHOP"&&(this.mtsShopDoor={x:u.x,z:u.z})),this.group.add(c)})}buildTrees(){const t=kt.parks??[],e=kt.waterAreas,n=kt.beachAreas,i=a=>{if(t.length!==0)for(let c=0;c<a;c+=1){const l=t[Math.floor(Math.random()*t.length)],h=l.position.x+(Math.random()-.5)*l.width,u=l.position.z+(Math.random()-.5)*l.depth;this.isPointOnRoad(h,u,2)||this.isPointInParking(h,u,2.2)||this.isPointInAreas(h,u,e,2)||this.isPointInAreas(h,u,n,2)||this.isPointInRiver(h,u,2)||this.isPointNearBuilding(h,u,4.5)||this.addTree(h,u)}},o=()=>{kt.buildings.forEach(a=>{const c=a.rotation??0,l=a.size.x/2+1.4,h=a.size.z/2+1.4,u=a.size.x*a.size.z,f=(u>=180?6:u>=110?5:4)+Math.floor(Math.random()*4);let g=0;for(let _=0;_<24&&g<f;_+=1){const m=_%2===0?1:-1,p=Math.random()<.5?"z":"x",y=p==="z"?Math.random()<.5?h:-h:Math.random()<.5?l:-l,x=p==="z"?m*(l+1+Math.random()*2.2):y+m*(1+Math.random()*2.2),S=p==="z"?y+(Math.random()-.5)*2.6:m*(h+1+Math.random()*2.2),R=this.localToWorldXZ(a.position.x,a.position.z,c,x,S);this.isPointOnRoad(R.x,R.z,1.6)||this.isPointInParking(R.x,R.z,2.2)||this.isPointInAreas(R.x,R.z,e,1.6)||this.isPointInAreas(R.x,R.z,n,1.6)||this.isPointInRiver(R.x,R.z,2)||this.isPointNearBuilding(R.x,R.z,1.2)||(this.addTree(R.x,R.z),g+=1)}})},r=()=>{const a=kt.roads??[];if(a.length===0)return;const c=(l,h)=>{this.isPointOnRoad(l,h,1.6)||this.isPointInParking(l,h,2.2)||this.isPointInAreas(l,h,e,1.6)||this.isPointInAreas(l,h,n,1.6)||this.isPointInRiver(l,h,2)||this.isPointNearBuilding(l,h,2.2)||this.addTree(l,h)};a.forEach(l=>{const h=l.rotation??0,u=l.length/2,d=Math.cos(h),f=Math.sin(h),g=[l.width/2+2.4,-(l.width/2+2.4)],_=10;for(const m of g)for(let p=-u+6;p<=u-6+1e-6;p+=_){const y=m,x=p+(Math.random()-.5)*3,S=l.position.x+y*d+x*f,R=l.position.z+-y*f+x*d;c(S,R)}})};i(90),o(),r()}addTree(t,e){const n=this.getWorldHeight(t,e),i=new q(new pe(.35,.5,2.6,10),new Ct({color:"#7a5138",roughness:.9}));i.position.set(t,n+1.3,e),i.castShadow=!0;const o=["#3fbf74","#34a96b","#5cd18a"];for(let r=0;r<4;r+=1){const a=new q(new qt(1.4-r*.12,12,12),new Ct({color:o[r%o.length],roughness:.75}));a.position.set(t,n+3.2+r*.5,e+(r%2===0?.2:-.2)),a.castShadow=!0,this.group.add(a)}this.group.add(i),this.colliders.push({position:{x:t,z:e},half:{x:.6,z:.6},rotation:0,type:"tree"})}buildLamps(){const t=(n,i)=>{const o=this.getWorldHeight(n,i),r=new q(new pe(.1,.12,2.8,8),new Ct({color:"#7a5a3a"}));r.position.set(n,o+1.4,i),r.castShadow=!0;const a=new q(new qt(.35,12,12),new Ct({color:"#ffd77b",emissive:"#ffd77b",emissiveIntensity:.8}));a.position.set(n,o+2.9,i),a.castShadow=!0;const c=new S0("#ffd7a3",.5,8);c.position.set(n,o+2.9,i),this.group.add(r,a,c)};[0,1].forEach(n=>{const i=kt.buildings[n];if(!i)return;const o=i.rotation??0,r=i.size.z/2+Rt.door.localZOutset,a=i.size.x>=10?2.2:1.8,c=this.localToWorldXZ(i.position.x,i.position.z,o,a,r+1.2);this.isPointOnRoad(c.x,c.z,.8)||t(c.x,c.z)})}buildUmbrellas(){kt.umbrellas.forEach(t=>{const e=this.getWorldHeight(t.x,t.z),n=new q(new pe(.08,.1,2.4,8),new Ct({color:"#f0f0f0"}));n.position.set(t.x,e+1.2,t.z),n.castShadow=!0;const i=new q(new ci(1.6,.9,12),new Ct({color:t.color}));i.position.set(t.x,e+2.2,t.z),i.castShadow=!0,this.group.add(n,i)})}buildBenches(){const t=kt.parks??[];if(t.length===0)return;const e=()=>t[Math.floor(Math.random()*t.length)],n=kt.waterAreas,i=5;for(let o=0;o<i;o+=1){const r=e(),a=r.position.x+(Math.random()-.5)*(r.width-8),c=r.position.z+(Math.random()-.5)*(r.depth-8);if(this.isPointOnRoad(a,c,2.5)||this.isPointInAreas(a,c,n,2.5)||this.isPointInAreas(a,c,n,2.5))continue;const l=this.getWorldHeight(a,c),h=Math.random()*Math.PI*2,u=new q(new ie(2.4,.2,.7),new Ct({color:"#8d5b3e"}));u.position.set(a,l+.6,c),u.rotation.y=h,u.castShadow=!0;const d=new q(new ie(2.4,.7,.15),new Ct({color:"#7b4f36"}));d.position.set(a,l+1,c-.25),d.rotation.y=h,d.castShadow=!0,this.group.add(u,d)}}buildRocks(){kt.rocks.forEach(t=>{const e=this.getWorldHeight(t.x,t.z),n=new q(new qt(t.size,10,10),new Ct({color:"#a2b1bf",roughness:.8}));n.position.set(t.x,e+t.size*.5,t.z),n.castShadow=!0,this.group.add(n)})}resolveCollisions(t,e){const n=t.clone();for(const i of this.colliders){const o=i.rotation,r=n.x-i.position.x,a=n.z-i.position.z,c=Math.cos(-o),l=Math.sin(-o),h=r*c+a*l,u=-r*l+a*c,d=i.half.x,f=i.half.z,g=Math.max(-d,Math.min(d,h)),_=Math.max(-f,Math.min(f,u)),m=h-g,p=u-_,y=m*m+p*p;let x=h,S=u;if(Math.abs(h)<=d&&Math.abs(u)<=f){const D=d-Math.abs(h)+e,E=f-Math.abs(u)+e;D<E?x=h>=0?d+e:-d-e:S=u>=0?f+e:-f-e}else if(y<e*e){const D=Math.max(1e-6,Math.sqrt(y)),E=e-D,M=m/D,I=p/D;x+=M*E,S+=I*E}else continue;const A=i.position.x+x*Math.cos(o)+S*Math.sin(o),C=i.position.z+(-x*Math.sin(o)+S*Math.cos(o));n.x=A,n.z=C}return n}resolvePlayerMovement(t,e){const n=this.resolveCollisions(t,e),i=(o,r)=>{const a=n.x-o.position.x,c=n.z-o.position.z,l=Math.hypot(a,c),h=e+r;if(l<1e-6||l>=h)return;const u=h-l,d=a/l,f=c/l;n.x+=d*u,n.z+=f*u};for(const o of this.parkedCars)i(o.object,o.radius);for(const o of this.trafficCars)i(o.object,2.2);return n}resolveCarMovement(t,e,n){const i=this.resolveCollisions(t,e),o=(r,a)=>{if(r===n)return;const c=i.x-r.position.x,l=i.z-r.position.z,h=Math.hypot(c,l),u=e+a;if(h<1e-6||h>=u)return;const d=u-h,f=c/h,g=l/h;i.x+=f*d,i.z+=g*d};for(const r of this.parkedCars)o(r.object,r.radius);for(const r of this.trafficCars)o(r.object,2.2);return i}updateDoors(t,e){const o=Math.PI*.45;this.doors.forEach(r=>{const a=Math.hypot(e.x-r.position.x,e.z-r.position.z),c=a<=2.6?1:a>=3.2?0:r.open,l=6;r.open=fo.clamp(r.open+(c-r.open)*Math.min(1,t*l),0,1),r.mesh.rotation.y=o*r.open})}getBuildingDoorPosition(t){if(t==="МТС SHOP"&&this.mtsShopDoor)return this.mtsShopDoor;const e=this.doors.find(n=>n.label===t);return e==null?void 0:e.position}getParkedCarObjects(){return this.parkedCars.map(t=>t.object)}occupyParkedCar(t){var c;const e=this.parkedCars.findIndex(l=>l.object===t);if(e<0)return null;const n=this.parkedCars[e],i=((c=n.object.userData)==null?void 0:c.carColor)??"#ff6b6b",o=n.object.position,r=n.object.rotation.y;this.group.remove(n.object),this.parkedCars.splice(e,1),this.parkedCars.splice(e,1);const a=new js([new P(o.x,0,o.z)],{color:i,speed:0,y:.23,parked:!1,plateText:"ПЕРСИК 777"});return a.object.position.set(o.x,o.y,o.z),a.object.rotation.y=r,a.object.userData.carColor=i,a.object.userData.carInstance=a,this.group.add(a.object),a.object}parkCarAt(t){var a,c;const e=((a=t.userData)==null?void 0:a.carColor)??"#ff6b6b",n=t.position,i=t.rotation.y;this.group.remove(t),this.group.remove(t);const o=((c=t.userData)==null?void 0:c.plateText)||Ii[Math.floor(Math.random()*Ii.length)],r=new js([new P(n.x,0,n.z)],{color:e,speed:0,y:.23,parked:!0,plateText:o});return r.object.position.set(n.x,.23,n.z),r.object.rotation.y=i,r.object.userData.parkedCar=!0,r.object.userData.carColor=e,r.object.userData.carInstance=r,this.group.add(r.object),this.parkedCars.push({car:r,object:r.object,radius:2.6,doorOpen:!1}),r.object}updateParkedCarDoors(t,e,n=4.6,i=5.2){for(const o of this.parkedCars){const r=e.x-o.object.position.x,a=e.z-o.object.position.z,c=Math.hypot(r,a);c<=n&&!o.doorOpen?(o.doorOpen=!0,o.car.setDoorOpen(!0)):c>=i&&o.doorOpen&&(o.doorOpen=!1,o.car.setDoorOpen(!1)),o.car.updateDoorAnimation(t)}}closeAllParkedCarDoors(t=0){for(const e of this.parkedCars)e.doorOpen&&(e.doorOpen=!1,e.car.setDoorOpen(!1),t>0&&e.car.updateDoorAnimation(t))}findParkedCarNear(t,e){let n=null,i=e;for(const o of this.parkedCars){const r=o.object.position.x-t.x,a=o.object.position.z-t.z,c=Math.hypot(r,a);c<=i&&(i=c,n=o)}return n?{car:n,distance:i}:null}buildBirds(){[{x:-60,z:20},{x:0,z:80},{x:40,z:130}].forEach((e,n)=>{const i=new te,o=4+Math.floor(Math.random()*3),r=new Me(.7,.35),a=new He({color:"#2d3436",side:Ve});for(let d=0;d<o;d+=1){const f=new q(r,a);f.position.set((Math.random()-.5)*3,(Math.random()-.5)*.6,(Math.random()-.5)*1.5),f.rotation.x=-Math.PI/2+(Math.random()-.5)*.3,f.rotation.z=(Math.random()-.5)*.5,i.add(f)}const c=26+Math.random()*10,l=32+Math.random()*6,h=.18+Math.random()*.08,u=n*Math.PI*.8;this.birds.push({group:i,radius:c,speed:h,height:l,center:e,phase:u}),this.group.add(i)})}updateBirds(t){this.birds.length!==0&&(this.birdsTime+=t,this.birds.forEach(e=>{const n=this.birdsTime*e.speed+e.phase,i=e.center.x+Math.cos(n)*e.radius,o=e.center.z+Math.sin(n)*e.radius;e.group.position.set(i,e.height,o),e.group.rotation.y=-n+Math.PI/2}))}}class F0{constructor(){ot(this,"object");ot(this,"playerGroup");ot(this,"catGroup");ot(this,"catParts",null);ot(this,"catAnimTime",0);ot(this,"velocity",new P);ot(this,"verticalVelocity",0);ot(this,"eyeLookTimer",0);ot(this,"eyeLookDuration",0);ot(this,"eyeLookStart",new ht(0,0));ot(this,"eyeLookTarget",new ht(0,0));ot(this,"eyeLookOffset",new ht(0,0));ot(this,"leftPupilBase",new P);ot(this,"rightPupilBase",new P);ot(this,"leftHighlightBase",new P);ot(this,"rightHighlightBase",new P);this.playerGroup=new te,this.playerGroup.position.set(0,0,4),this.playerGroup.rotation.y=Math.PI*1.25,this.catGroup=new te,this.catGroup.scale.set(.6,.6,.6),this.playerGroup.add(this.catGroup),this.buildCat(),this.object=this.playerGroup}setSpawn(t){this.playerGroup.position.set(t.x,t.y??0,t.z),typeof t.yaw=="number"&&(this.playerGroup.rotation.y=t.yaw),this.verticalVelocity=0}buildCat(){const t=this.createFurTexture(),e=new ll({color:15901016,roughness:.55,metalness:0,sheen:1,sheenRoughness:.45,sheenColor:16769484,map:t}),n=new Ct({color:16775920,roughness:.65,metalness:.05}),i=new q(new qt(1.35,32,24),e);i.scale.set(1,.78,1.1),i.position.y=1,i.castShadow=!0,this.catGroup.add(i);const o=new q(new qt(.9,32,24),e);o.scale.set(1.05,.95,1.05),o.position.set(0,2.05,.45),o.castShadow=!0,this.catGroup.add(o);const r=new q(new qt(.42,24,18),n);r.scale.set(1.1,.7,.9),r.position.set(0,-.15,.65),r.castShadow=!0,o.add(r);const a=new te;a.position.set(0,-.19,1.01),o.add(a);const c=new ii({color:3881787,linewidth:2}),l=new qi(new P(-.2,-.02,0),new P(-.1,-.1,0),new P(0,-.06,0)),h=new ge().setFromPoints(l.getPoints(10)),u=new Bn(h,c);a.add(u);const d=new qi(new P(0,-.06,0),new P(.1,-.1,0),new P(.2,-.02,0)),f=new ge().setFromPoints(d.getPoints(10)),g=new Bn(f,c);a.add(g);const _=this.createEar(-.45,e),m=this.createEar(.45,e);o.add(_),o.add(m);const p=new Ct({color:16777215,roughness:.1}),y=new q(new qt(.23,32,24),p);y.position.set(-.34,.14,.74),y.scale.set(1,1,.85),o.add(y);const x=new q(new qt(.22,32,24),p);x.position.set(.34,.14,.74),x.scale.set(1,1,.85),o.add(x);const S=new Ct({color:13662778,roughness:.55,metalness:.05}),R=new Gi([new P(-.48,.44,.7),new P(-.32,.5,.72),new P(-.16,.44,.7)]),A=new oi(R,16,.035,10,!1),C=new q(A,S);C.castShadow=!0,o.add(C);const D=new Gi([new P(.16,.44,.7),new P(.32,.5,.72),new P(.48,.44,.7)]),E=new oi(D,16,.035,10,!1),M=new q(E,S);M.castShadow=!0,o.add(M);const I=new Ct({color:0,roughness:.4}),B=new q(new qt(.12,24,18),I);B.scale.set(1,1,.45),B.position.set(-.34,.14,.94),this.leftPupilBase.copy(B.position),o.add(B);const L=new q(new qt(.12,24,18),I);L.scale.set(1,1,.45),L.position.set(.34,.14,.94),this.rightPupilBase.copy(L.position),o.add(L);const W=new He({color:16777215}),U=new q(new qt(.028,12,12),W);U.position.set(-.3,.18,1.02),this.leftHighlightBase.copy(U.position),o.add(U);const K=new q(new qt(.028,12,12),W);K.position.set(.27,.18,1.02),this.rightHighlightBase.copy(K.position),o.add(K);const it=this.createNose();o.add(it);const k=new Bn(new ge().setFromPoints([new P(0,-.09,.83),new P(0,-.19,.89)]),new ii({color:3355443}));o.add(k);const $=new ii({color:4473924});this.createWhiskerLine(-.35,-.1,.73,Math.PI-.3,1.3,$,o),this.createWhiskerLine(-.35,-.17,.73,Math.PI-.15,1.25,$,o),this.createWhiskerLine(-.35,-.24,.73,Math.PI,1.2,$,o),this.createWhiskerLine(.35,-.1,.73,.3,1.3,$,o),this.createWhiskerLine(.35,-.17,.73,.15,1.25,$,o),this.createWhiskerLine(.35,-.24,.73,0,1.2,$,o);const et=new pe(.2,.22,.8,16),mt=(dt,nt)=>{const J=new te;J.position.set(dt,.85,nt);const X=new q(et,e);X.position.y=-.4,X.castShadow=!0,J.add(X);const at=this.createPaw(0,-.72,0,n);return J.add(at),this.catGroup.add(J),{legGroup:J,paw:at}},Lt=mt(-.6,.8),Nt=mt(.6,.8),j=mt(-.7,-.5),ut=mt(.7,-.5),Et=new te;Et.position.set(0,1,-1.2);const _t=new Gi([new P(0,0,0),new P(0,.5,-.4),new P(0,1.2,-.2),new P(0,1.5,.2)]),Ft=new oi(_t,20,.15,8,!1),zt=new q(Ft,e);zt.castShadow=!0,Et.add(zt);const N=new q(new qt(.2,16,16),n);N.position.set(0,1.5,.2),N.castShadow=!0,Et.add(N),this.catGroup.add(Et);const Gt=new q(new On(.35,.06,8,32),new Ct({color:15158332,roughness:.3}));Gt.position.set(0,1.55,.3),Gt.rotation.x=Math.PI/2-.2,this.catGroup.add(Gt);const Q=new q(new qt(.1,16,16),new Ct({color:15844367,metalness:.8,roughness:.2}));Q.position.set(0,1.4,.6),this.catGroup.add(Q),this.catParts={head:o,leftEar:_,rightEar:m,leftFrontLeg:Lt.legGroup,rightFrontLeg:Nt.legGroup,leftBackLeg:j.legGroup,rightBackLeg:ut.legGroup,leftFrontPaw:Lt.paw,rightFrontPaw:Nt.paw,leftBackPaw:j.paw,rightBackPaw:ut.paw,tail:Et,leftPupil:B,rightPupil:L,leftPupilHighlight:U,rightPupilHighlight:K}}createEar(t,e){const n=new te,i=new q(new ci(.55,.95,32),e);i.scale.set(1,1.05,1),n.add(i);const o=new q(new ci(.42,.78,32),new Ct({color:16758465,roughness:.45}));return o.position.set(0,-.08,.08),o.scale.set(.82,.82,.55),n.add(o),n.position.set(t,.45,.05),n.rotation.z=t>0?-.45:.45,n.rotation.x=-.1,n}createNose(){const t=new qt(.13,16,16),e=new Ct({color:2829099,roughness:.4}),n=new q(t,e);return n.position.set(0,-.02,.89),n.scale.set(1.1,.85,.7),n}createFurTexture(){const t=document.createElement("canvas");t.width=128,t.height=128;const e=t.getContext("2d");if(!e){const i=new Se;return i.needsUpdate=!0,i}e.fillStyle="#f2a158",e.fillRect(0,0,t.width,t.height),e.fillStyle="rgba(194, 114, 49, 0.25)";for(let i=0;i<220;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=1+Math.random()*2.2;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}e.fillStyle="rgba(255, 255, 255, 0.05)";for(let i=0;i<80;i+=1){const o=Math.random()*t.width,r=Math.random()*t.height,a=.8+Math.random()*1.4;e.beginPath(),e.arc(o,r,a,0,Math.PI*2),e.fill()}const n=new si(t);return n.wrapS=un,n.wrapT=un,n.repeat.set(2.2,2.2),n.colorSpace=ke,n}createWhiskerLine(t,e,n,i,o,r,a){const c=[new P(t,e,n),new P(t+Math.cos(i)*o,e,n+Math.sin(i)*o)],l=new ge().setFromPoints(c),h=new Bn(l,r);a.add(h)}createPaw(t,e,n,i){const o=new te;o.position.set(t,e,n);const r=new q(new qt(.24,16,16),i);return r.scale.set(1.1,.6,1.2),r.castShadow=!0,o.add(r),o}update(t,e,n,i=0){const o=Math.hypot(e.x,e.z),r=!!(n!=null&&n.sprint);if(o>0){const h=ae.playerSpeed*(r?ae.playerSprintMultiplier:1);this.velocity.set(e.x/o,0,e.z/o).multiplyScalar(h),this.playerGroup.position.addScaledVector(this.velocity,t);const u=Math.atan2(this.velocity.x,this.velocity.z),f=e.z>.2&&Math.abs(e.x)>.2?ae.playerTurnSpeed*.5:ae.playerTurnSpeed;this.playerGroup.rotation.y=this.lerpYaw(this.playerGroup.rotation.y,u,f*t)}else this.velocity.set(0,0,0);const a=this.velocity.length()>.1,c=a&&r;this.animateCat(t,a,c),this.playerGroup.position.y<=i+1e-4&&(this.playerGroup.position.y=i,this.verticalVelocity<0&&(this.verticalVelocity=0),n!=null&&n.jump&&(this.verticalVelocity=ae.playerJumpSpeed)),this.verticalVelocity-=ae.playerGravity*t,this.playerGroup.position.y+=this.verticalVelocity*t,this.playerGroup.position.y<i&&(this.playerGroup.position.y=i,this.verticalVelocity=0)}animateCat(t,e,n){if(!this.catParts)return;this.catAnimTime+=t*(n?12:8);const i=this.catAnimTime;if(this.updateEyeLook(t),e){const o=Math.sin(i)*(n?.65:.5);this.catParts.leftFrontLeg.rotation.x=o,this.catParts.rightBackLeg.rotation.x=o,this.catParts.rightFrontLeg.rotation.x=-o,this.catParts.leftBackLeg.rotation.x=-o,this.catParts.leftFrontPaw.rotation.x=-o*.4,this.catParts.rightFrontPaw.rotation.x=o*.4,this.catParts.leftBackPaw.rotation.x=o*.4,this.catParts.rightBackPaw.rotation.x=-o*.4,this.catGroup.position.y=Math.abs(Math.sin(i*2))*(n?.12:.06),this.catParts.tail.rotation.z=Math.sin(i*2)*.4,this.catParts.tail.rotation.x=Math.sin(i)*.15}else this.catParts.leftFrontLeg.rotation.x=0,this.catParts.rightFrontLeg.rotation.x=0,this.catParts.leftBackLeg.rotation.x=0,this.catParts.rightBackLeg.rotation.x=0,this.catParts.leftFrontPaw.rotation.x=0,this.catParts.rightFrontPaw.rotation.x=0,this.catParts.leftBackPaw.rotation.x=0,this.catParts.rightBackPaw.rotation.x=0,this.catParts.leftEar.rotation.x=-.1+Math.sin(i*2)*.05,this.catParts.rightEar.rotation.x=-.1+Math.sin(i*2)*.05,this.catParts.leftEar.rotation.z=.5+Math.sin(i*1.5)*.03,this.catParts.rightEar.rotation.z=-.5-Math.sin(i*1.5)*.03,this.catGroup.position.y=Math.sin(i*.5)*.02,this.catParts.tail.rotation.z=Math.sin(i*.8)*.15}updateEyeLook(t){if(!this.catParts)return;if(this.eyeLookDuration>0){this.eyeLookTimer+=t;const o=Math.min(this.eyeLookTimer/this.eyeLookDuration,1);this.eyeLookOffset.lerpVectors(this.eyeLookStart,this.eyeLookTarget,o),o>=1&&(this.eyeLookTarget.lengthSq()>1e-4?(this.eyeLookStart.copy(this.eyeLookOffset),this.eyeLookTarget.set(0,0),this.eyeLookDuration=.45,this.eyeLookTimer=0):this.eyeLookDuration=0)}else if(Math.random()<t*.9){const a=(Math.random()*2-1)*.12,c=(Math.random()*2-1)*.05;this.eyeLookStart.copy(this.eyeLookOffset),this.eyeLookTarget.set(a,c),this.eyeLookDuration=.5+Math.random()*.35,this.eyeLookTimer=0}const e=this.eyeLookOffset.x,n=this.eyeLookOffset.y;this.catParts.leftPupil.position.set(this.leftPupilBase.x+e,this.leftPupilBase.y+n,this.leftPupilBase.z),this.catParts.rightPupil.position.set(this.rightPupilBase.x+e,this.rightPupilBase.y+n,this.rightPupilBase.z);const i=1.2;this.catParts.leftPupilHighlight.position.set(this.leftHighlightBase.x+e*i,this.leftHighlightBase.y+n*i,this.leftHighlightBase.z),this.catParts.rightPupilHighlight.position.set(this.rightHighlightBase.x+e*i,this.rightHighlightBase.y+n*i,this.rightHighlightBase.z)}lerpYaw(t,e,n){const i=fo.euclideanModulo(e-t+Math.PI,Math.PI*2)-Math.PI;return t+i*n}}class B0{constructor(t){ot(this,"element");ot(this,"minimapWrap");ot(this,"minimapCanvas");ot(this,"minimapCtx");ot(this,"toastEl");ot(this,"promoEl");ot(this,"toastTimer",null);ot(this,"staticCanvas",null);ot(this,"staticCtx",null);ot(this,"mapOpen",!1);ot(this,"bounds",null);ot(this,"lastCanvasW",0);ot(this,"lastCanvasH",0);ot(this,"promoCloseHandler",null);ot(this,"onMusicToggleHandler",null);this.element=document.createElement("div"),this.element.className="ui",this.element.innerHTML=`
      <div class="ui-top">
        <div class="logo">MTS City</div>
      </div>
      <div class="ui-buttons">
        <button class="ui-button" type="button" data-action="toggle-help">≡</button>
        <button class="ui-button" type="button" data-action="toggle-music">🎵</button>
      </div>
      <div class="ui-toast" data-role="toast" aria-live="polite" hidden></div>
      <div class="ui-modal" data-role="promo" hidden>
        <div class="ui-modal__card">
          <div class="ui-modal__text" data-role="promo-text"></div>
          <button class="ui-modal__close" type="button" data-role="promo-close" aria-label="Закрыть уведомление">×</button>
        </div>
      </div>

      <div class="minimap" data-role="minimap">
        <canvas data-role="minimap-canvas"></canvas>
      </div>
    `,t.appendChild(this.element);const e=this.element.querySelector('[data-role="toast"]'),n=this.element.querySelector('[data-role="minimap"]'),i=this.element.querySelector('[data-role="minimap-canvas"]'),o=this.element.querySelector('[data-role="promo"]'),r=this.element.querySelector('[data-role="promo-text"]'),a=this.element.querySelector('[data-role="promo-close"]');if(!e||!n||!i||!o||!r||!a)throw new Error("UI DOM not found");const c=i.getContext("2d");if(!c)throw new Error("Minimap 2d context not available");this.toastEl=e,this.minimapWrap=n,this.minimapCanvas=i,this.minimapCtx=c,this.promoEl=o,this.minimapWrap.addEventListener("click",()=>this.toggleMap());const l=this.element.querySelector('[data-action="toggle-help"]');l==null||l.addEventListener("click",()=>this.toggleHelp());const h=this.element.querySelector('[data-action="toggle-music"]');h==null||h.addEventListener("click",()=>{var u;return(u=this.onMusicToggleHandler)==null?void 0:u.call(this)}),this.toastEl.addEventListener("click",()=>this.hideMessage()),a.addEventListener("click",()=>{var u;this.hidePromo(),(u=this.promoCloseHandler)==null||u.call(this)}),this.bounds=this.computeWorldBounds()}showMessage(t,e){this.toastTimer!=null&&(window.clearTimeout(this.toastTimer),this.toastTimer=null),this.toastEl.textContent=t,this.toastEl.hidden=!1,this.element.classList.add("toast-open");const n=(e==null?void 0:e.durationMs)??6500;n>0&&(this.toastTimer=window.setTimeout(()=>{this.hideMessage()},n))}hideMessage(){this.toastTimer!=null&&(window.clearTimeout(this.toastTimer),this.toastTimer=null),this.toastEl.hidden=!0,this.element.classList.remove("toast-open")}showPromo(t,e){if(!this.promoEl)return;const n=this.promoEl.querySelector(".promo-text");if(n)if(e){n.innerHTML=`${t}<br><button class="promo-action-btn">${e.label}</button>`;const i=this.promoEl.querySelector(".promo-action-btn");i&&(i.onclick=o=>{o.stopPropagation(),e.onClick()},i.style.marginTop="8px",i.style.padding="6px 12px",i.style.background="#e30611",i.style.color="white",i.style.border="none",i.style.borderRadius="4px",i.style.cursor="pointer",i.style.fontSize="14px",i.style.fontWeight="bold")}else n.innerText=t;this.promoEl.classList.add("visible")}hidePromo(){this.promoEl.hidden=!0,this.promoEl.classList.remove("open")}isPromoVisible(){return!this.promoEl.hidden}onPromoClosed(t){this.promoCloseHandler=t}onMusicToggle(t){this.onMusicToggleHandler=t}setMusicIcon(t){const e=this.element.querySelector('[data-action="toggle-music"]');e&&(e.textContent=t?"🎵":"🔇")}toggleMap(){this.mapOpen=!this.mapOpen,this.element.classList.toggle("map-open",this.mapOpen),this.lastCanvasW=0,this.lastCanvasH=0}toggleHelp(){this.element.classList.toggle("help-hidden")}updateMinimap(t){this.bounds||(this.bounds=this.computeWorldBounds()),this.ensureMinimapSize(),this.ensureStaticLayer(),this.staticCanvas&&(this.minimapCtx.clearRect(0,0,this.minimapCanvas.width,this.minimapCanvas.height),this.minimapCtx.drawImage(this.staticCanvas,0,0));const e=this.worldToMap(t.x,t.z),n=this.minimapCtx;n.save(),n.translate(e.x,e.y),n.rotate(-t.yaw+Math.PI),n.fillStyle="#ffffff",n.strokeStyle="rgba(0,0,0,0.45)",n.lineWidth=Math.max(1,Math.round(this.minimapCanvas.width*.006)),n.beginPath();const i=Math.max(8,Math.round(this.minimapCanvas.width*.03));n.moveTo(0,-i),n.lineTo(i*.65,i),n.lineTo(0,i*.55),n.lineTo(-i*.65,i),n.closePath(),n.fill(),n.stroke(),n.restore()}ensureMinimapSize(){const t=Math.min(window.devicePixelRatio||1,2),e=this.minimapWrap.getBoundingClientRect(),n=Math.max(1,Math.round(e.width*t)),i=Math.max(1,Math.round(e.height*t));n===this.lastCanvasW&&i===this.lastCanvasH||(this.lastCanvasW=n,this.lastCanvasH=i,this.minimapCanvas.width=n,this.minimapCanvas.height=i,this.staticCanvas=null,this.staticCtx=null)}ensureStaticLayer(){if(this.staticCanvas&&this.staticCtx)return;const t=document.createElement("canvas");t.width=this.minimapCanvas.width,t.height=this.minimapCanvas.height;const e=t.getContext("2d");e&&(this.staticCanvas=t,this.staticCtx=e,this.renderStaticMap(e,t.width,t.height))}computeWorldBounds(){let t=-130,e=ae.worldSize/2,n=-260/2,i=ae.worldSize/2;const o=(c,l,h,u)=>{t=Math.min(t,c),e=Math.max(e,l),n=Math.min(n,h),i=Math.max(i,u)};for(const c of kt.roads??[]){const l=c.rotation??0,h=Math.abs(Math.cos(l)),u=Math.abs(Math.sin(l)),d=c.width/2,f=c.length/2,g=h*d+u*f,_=u*d+h*f;o(c.position.x-g,c.position.x+g,c.position.z-_,c.position.z+_)}for(const c of kt.buildings??[]){const l=c.size.x/2,h=c.size.z/2;o(c.position.x-l,c.position.x+l,c.position.z-h,c.position.z+h)}const r=[...kt.parks??[],...kt.waterAreas??[],...kt.beachAreas??[]];for(const c of r)o(c.position.x-c.width/2,c.position.x+c.width/2,c.position.z-c.depth/2,c.position.z+c.depth/2);const a=18;return{minX:t-a,maxX:e+a,minZ:n-a,maxZ:i+a}}worldToMap(t,e){if(!this.bounds)return{x:0,y:0};const{minX:n,maxX:i,minZ:o,maxZ:r}=this.bounds,a=this.minimapCanvas.width,c=this.minimapCanvas.height,l=(t-n)/Math.max(1e-6,i-n),h=(e-o)/Math.max(1e-6,r-o);return{x:l*a,y:(1-h)*c}}renderStaticMap(t,e,n){t.clearRect(0,0,e,n),t.fillStyle=this.mapOpen?"rgba(10, 24, 34, 0.95)":"rgba(10, 24, 34, 0.55)",t.fillRect(0,0,e,n),t.strokeStyle="rgba(255,255,255,0.45)",t.lineWidth=Math.max(2,Math.round(e*.01)),t.strokeRect(t.lineWidth/2,t.lineWidth/2,e-t.lineWidth,n-t.lineWidth);const i=(o,r,a,c,l)=>{const h=this.worldToMap(o-a/2,r-c/2),u=this.worldToMap(o+a/2,r+c/2),d=Math.min(h.x,u.x),f=Math.max(h.x,u.x),g=Math.min(h.y,u.y),_=Math.max(h.y,u.y);t.fillStyle=l,t.fillRect(d,g,f-d,_-g)};for(const o of kt.parks??[])i(o.position.x,o.position.z,o.width,o.depth,"rgba(88, 190, 124, 0.22)");for(const o of kt.waterAreas??[])i(o.position.x,o.position.z,o.width,o.depth,"rgba(120, 210, 255, 0.22)");for(const o of kt.beachAreas??[])i(o.position.x,o.position.z,o.width,o.depth,"rgba(255, 220, 160, 0.18)");t.fillStyle="rgba(205, 220, 235, 0.18)";for(const o of kt.roads??[])this.drawRotatedRect(t,o.position.x,o.position.z,o.width,o.length,o.rotation??0,"rgba(145, 160, 175, 0.55)");for(const o of kt.buildings??[]){const r=o.label?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.55)";this.drawRotatedRect(t,o.position.x,o.position.z,o.size.x,o.size.z,o.rotation??0,r)}if(this.mapOpen){t.font=`${Math.max(12,Math.round(e*.03))}px Arial`,t.fillStyle="rgba(255,255,255,0.9)",t.textAlign="center",t.textBaseline="top";for(const o of kt.buildings??[]){if(!o.label)continue;const r=this.worldToMap(o.position.x,o.position.z);t.fillText(o.label,r.x,r.y+Math.max(6,Math.round(e*.018)))}}}drawRotatedRect(t,e,n,i,o,r,a){const c=i/2,l=o/2,h=Math.cos(r),u=Math.sin(r),d=[{x:-c,z:-l},{x:c,z:-l},{x:c,z:l},{x:-c,z:l}].map(g=>({x:e+g.x*h+g.z*u,z:n+(-g.x*u+g.z*h)})),f=this.worldToMap(d[0].x,d[0].z);t.beginPath(),t.moveTo(f.x,f.y);for(let g=1;g<d.length;g+=1){const _=this.worldToMap(d[g].x,d[g].z);t.lineTo(_.x,_.y)}t.closePath(),t.fillStyle=a,t.fill()}}class k0{constructor(t,e=.3){ot(this,"ctx");ot(this,"gainNode");ot(this,"buffer",null);ot(this,"source",null);ot(this,"enabled",!0);ot(this,"isPlaying",!1);ot(this,"url");this.url=t;const n=window.AudioContext||window.webkitAudioContext;this.ctx=new n,this.gainNode=this.ctx.createGain(),this.gainNode.gain.value=e,this.gainNode.connect(this.ctx.destination),this.loadAudio()}async loadAudio(){try{const e=await(await fetch(this.url)).arrayBuffer();this.buffer=await this.ctx.decodeAudioData(e),this.enabled&&this.isPlaying&&this.startSource()}catch(t){console.error("Failed to load audio:",t)}}toggle(){return this.enabled=!this.enabled,this.enabled?this.play():this.pause(),this.enabled}async play(){if(this.enabled){if(this.isPlaying=!0,this.ctx.state==="suspended")try{await this.ctx.resume()}catch(t){console.warn("Context resume failed:",t)}this.buffer&&!this.source&&this.startSource()}}pause(){if(this.isPlaying=!1,this.source){try{this.source.stop()}catch{}this.source=null}}startSource(){if(this.buffer){if(this.source)try{this.source.stop()}catch{}this.source=this.ctx.createBufferSource(),this.source.buffer=this.buffer,this.source.loop=!0,this.source.connect(this.gainNode),this.source.start(0)}}isEnabled(){return this.enabled}}const Ir=document.getElementById("app");if(!Ir)throw new Error("App container not found");const Oe=new A0(Ir),Ze=new B0(Ir),Un=new P0(Ze.element),Ae=new O0,se=new F0,Js={},Mr=new k0("/sounds/music.mp3",.4);Ze.onMusicToggle(()=>{const s=Mr.toggle();Ze.setMusicIcon(s)});const kn=async()=>{if(Mr.isEnabled())try{await Mr.play(),document.removeEventListener("click",kn),document.removeEventListener("keydown",kn),document.removeEventListener("touchstart",kn),document.removeEventListener("pointerdown",kn)}catch{}};document.addEventListener("click",kn);document.addEventListener("keydown",kn);document.addEventListener("touchstart",kn);document.addEventListener("pointerdown",kn);let $n=null,Fi=null,Ni=null,re=null,sn=!1,Di=0;const $s=4.5,rs=[],H0=new qt(.12,8,8);let yr=Ae.getParkedCarObjects();const Mc=new T0,cr=new ht,G0=s=>{var e;let t=s;for(;t;){if((e=t.userData)!=null&&e.parkedCar)return t;t=t.parent}return null},ss=kt.buildings.find(s=>s.label==="МТС БАНК")??kt.buildings[0];if(ss){const s=ss.rotation??0,t=ss.size.z/2+Rt.door.localZOutset,e=Math.sin(s),n=Math.cos(s),i=ss.position.x+e*t,o=ss.position.z+n*t,r=4.2;se.setSpawn({x:i+e*r,z:o+n*r,yaw:s})}Ze.onPromoClosed(()=>{Fi&&(Js[Fi]=!0)});Oe.scene.background=new jt(ae.skyBottomColor);Oe.scene.fog=new Cr(ae.fogColor,ae.fogNear,ae.fogFar);Oe.addToScene(Ae.group,se.object);const V0=new E0(ae.ambientColor,.7),W0=new M0(ae.skyBottomColor,"#a7e1c2",.95),pn=new ul(ae.sunColor,1.7);pn.position.set(16,22,10);pn.castShadow=!0;pn.shadow.mapSize.set(1024,1024);pn.shadow.camera.near=2;pn.shadow.camera.far=80;pn.shadow.camera.left=-30;pn.shadow.camera.right=30;pn.shadow.camera.top=30;pn.shadow.camera.bottom=-30;const Dr=new ul("#eaf5ff",.28);Dr.position.set(-12,14,-18);Dr.castShadow=!1;Oe.addToScene(V0,W0,pn,Dr);const lr=new I0(Oe.camera,Oe.renderer.domElement,se.object),X0=new P(0,1,0),yc=new P,Sc=new P,wc=new P,Y0=12,q0=1.4,Z0=3.6,j0=1.7,K0=(s,t)=>{const e=new P(-Math.sin(t),0,-Math.cos(t));for(let n=0;n<6;n+=1){const i=new Ct({color:"#4a4f55",transparent:!0,opacity:.65}),o=new q(H0,i),r=new P(0,.35,-2.1).add(new P((Math.random()-.5)*.25,0,(Math.random()-.5)*.2)),a=s.localToWorld(r);o.position.copy(a),o.castShadow=!1,o.receiveShadow=!1,Oe.scene.add(o),rs.push({mesh:o,velocity:new P(e.x*(.2+Math.random()*.2),.6+Math.random()*.4,e.z*(.2+Math.random()*.2)),life:0,maxLife:.9+Math.random()*.4})}};Oe.renderer.domElement.addEventListener("pointerdown",s=>{var a;if(sn||s.button!==0)return;const t=Oe.renderer.domElement.getBoundingClientRect();cr.x=(s.clientX-t.left)/t.width*2-1,cr.y=-((s.clientY-t.top)/t.height)*2+1,Mc.setFromCamera(cr,Oe.camera);const e=Mc.intersectObjects(yr,!0);if(e.length===0)return;const n=G0(((a=e[0])==null?void 0:a.object)??null);if(!n)return;const i=se.object.position.x-n.position.x,o=se.object.position.z-n.position.z;if(Math.hypot(i,o)>$s){Ze.showMessage("Подойдите ближе к машине");return}Ni=n});Oe.addUpdatable(Ae,{update:s=>{var a;!sn&&Ni&&(re=Ae.occupyParkedCar(Ni)??Ni,Ni=null,yr=Ae.getParkedCarObjects(),sn=!0,se.object.visible=!1,Ze.showMessage("Котик сел в машину"),re&&(lr.setTarget(re),Di=re.rotation.y,K0(re,Di)),Un.setExitVisible(!0));const t=Un.getMoveVector(),e=Un.isSprinting(),n=Un.consumeJumpPressed(),i=Math.hypot(t.x,t.z);if(!sn&&Un.consumeEnterPressed()){const c=Ae.findParkedCarNear({x:se.object.position.x,z:se.object.position.z},$s);(a=c==null?void 0:c.car)!=null&&a.object?Ni=c.car.object:Ze.showMessage("Подойдите ближе к машине")}if(sn&&re&&(Un.consumeExitPressed()||Un.consumeEnterPressed())){const c=Ae.parkCarAt(re);if(yr=Ae.getParkedCarObjects(),sn=!1,re=null,se.object.visible=!0,Un.setExitVisible(!1),lr.setTarget(se.object),c){const l=c.rotation.y;wc.set(Math.cos(l),0,-Math.sin(l));const h=c.position.clone().addScaledVector(wc,2.2);se.object.position.set(h.x,0,h.z);const u=Ae.resolvePlayerMovement(se.object.position,.9);se.object.position.x=u.x,se.object.position.z=u.z}Ze.showMessage("Котик вышел из машины")}if(sn){if(re){if(i>.01){const c=t.z,l=-t.x,h=Y0*(e?q0:1),u=Math.max(.2,Math.abs(c));Di+=l*Z0*u*s,Sc.set(Math.sin(Di),0,Math.cos(Di)),yc.copy(Sc).multiplyScalar(h*c*s),re.position.add(yc),re.rotation.y=Di}re.userData.carInstance&&re.userData.carInstance.updateSmoke(s,i)}}else if(i>.01){const c=new P;Oe.camera.getWorldDirection(c),c.y=0,c.normalize();const l=new P().crossVectors(c,X0).normalize(),h=new P().addScaledVector(l,t.x).addScaledVector(c,t.z),u=Ae.getWorldHeight(se.object.position.x,se.object.position.z);se.update(s,{x:h.x,z:h.z},{sprint:e,jump:n},u)}else{const c=Ae.getWorldHeight(se.object.position.x,se.object.position.z);se.update(s,{x:0,z:0},{sprint:e,jump:n},c)}if(sn){if(re){const c=Ae.resolveCarMovement(re.position,j0,re);re.position.x=c.x,re.position.z=c.z;const l=Ae.getWorldHeight(re.position.x,re.position.z);re.position.y=l+.22}}else{const c=Ae.resolvePlayerMovement(se.object.position,.9);se.object.position.x=c.x,se.object.position.z=c.z}if(re){const c=Ae.getWorldHeight(re.position.x,re.position.z);re.position.y=c+.22}if(sn?Ae.closeAllParkedCarDoors(s):(Ae.updateDoors(s,se.object.position),Ae.updateParkedCarDoors(s,se.object.position,$s,$s+.6)),rs.length>0)for(let c=rs.length-1;c>=0;c-=1){const l=rs[c];l.life+=s,l.mesh.position.addScaledVector(l.velocity,s);const h=1-Math.min(1,l.life/l.maxLife);l.mesh.scale.setScalar(1+(1-h)*.8);const u=l.mesh.material;u.opacity=.65*h,l.life>=l.maxLife&&(Oe.scene.remove(l.mesh),rs.splice(c,1))}const o=[{label:"МТС БАНК",text:"УРА! Вам выдали кредитную карту. Изучите город, чтобы найти скидки!"},{label:"МТС SHOP",text:"С вашей Кредитной картой доступен кешбэк до 20% на всю технику",action:{label:"Открыть каталог",onClick:()=>{window.open("https://shop.mts.ru/catalog","_blank")}}},{label:"Магазин одежды",text:"Вам доступна скидка 3% на одежду по вашей кредитной карте"},{label:"МЕДСИ",text:"Кешбэк 10 процентов на любые процедуры"}];let r=null;if(!sn)for(const c of o){const l=kt.buildings.find(d=>d.label===c.label);if(!l)continue;const h=Math.max(l.size.x,l.size.z)/2+4.5;if(Math.hypot(se.object.position.x-l.position.x,se.object.position.z-l.position.z)<=h){r=c;break}}r?($n&&$n!==r.label&&(Js[$n]=!1,Fi=null),$n=r.label,!(Js[r.label]===!0)&&Fi!==r.label&&(Ze.showPromo(r.text,r.action),Fi=r.label)):$n&&(Js[$n]=!1,$n=null,Fi=null,Ze.hidePromo()),lr.update(),sn&&re?Ze.updateMinimap({x:re.position.x,z:re.position.z,yaw:re.rotation.y}):Ze.updateMinimap({x:se.object.position.x,z:se.object.position.z,yaw:se.object.rotation.y})}});Oe.start();
