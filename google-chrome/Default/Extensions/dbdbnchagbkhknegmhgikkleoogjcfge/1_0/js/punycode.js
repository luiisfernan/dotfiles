var punycode=new function(){function r(r){return r-48<10?r-22:r-65<26?r-65:r-97<26?r-97:a}function o(r,o){return r+22+75*(r<26)-((0!=o)<<5)}function e(r,o,e){var n;for(r=e?Math.floor(r/i):r>>1,r+=Math.floor(r/o),n=0;r>(a-u)*c>>1;n+=a)r=Math.floor(r/(a-u));return Math.floor(n+(a-u+1)*r/(r+d))}function n(r,o){return r-=(r-97<26)<<5,r+((!o&&r-65<26)<<5)}this.utf16={decode:function(r){for(var o,e,n=[],t=0,f=r.length;t<f;){if(o=r.charCodeAt(t++),55296===(63488&o)){if(e=r.charCodeAt(t++),55296!==(64512&o)||56320!==(64512&e))throw new RangeError("UTF-16(decode): Illegal UTF-16 sequence");o=((1023&o)<<10)+(1023&e)+65536}n.push(o)}return n},encode:function(r){for(var o,e=[],n=0,t=r.length;n<t;){if(o=r[n++],55296===(63488&o))throw new RangeError("UTF-16(encode): Illegal UTF-16 value");o>65535&&(o-=65536,e.push(String.fromCharCode(o>>>10&1023|55296)),o=56320|1023&o),e.push(String.fromCharCode(o))}return e.join("")}};var t=128,f=72,h="-",a=36,i=700,u=1,c=26,d=38,l=2147483647;this.decode=function(o,n){var i,d,p,g,s,C,v,w,y,A,E,M,R,_=[],m=[],S=o.length;for(i=t,p=0,g=f,s=o.lastIndexOf(h),s<0&&(s=0),C=0;C<s;++C){if(n&&(m[_.length]=o.charCodeAt(C)-65<26),o.charCodeAt(C)>=128)throw new RangeError("Illegal input >= 0x80");_.push(o.charCodeAt(C))}for(v=s>0?s+1:0;v<S;){for(w=p,y=1,A=a;;A+=a){if(v>=S)throw RangeError("punycode_bad_input(1)");if(E=r(o.charCodeAt(v++)),E>=a)throw RangeError("punycode_bad_input(2)");if(E>Math.floor((l-p)/y))throw RangeError("punycode_overflow(1)");if(p+=E*y,M=A<=g?u:A>=g+c?c:A-g,E<M)break;if(y>Math.floor(l/(a-M)))throw RangeError("punycode_overflow(2)");y*=a-M}if(d=_.length+1,g=e(p-w,d,0===w),Math.floor(p/d)>l-i)throw RangeError("punycode_overflow(3)");i+=Math.floor(p/d),p%=d,n&&m.splice(p,0,o.charCodeAt(v-1)-65<26),_.splice(p,0,i),p++}if(n)for(p=0,R=_.length;p<R;p++)m[p]&&(_[p]=String.fromCharCode(_[p]).toUpperCase().charCodeAt(0));return this.utf16.encode(_)},this.encode=function(r,i){var d,p,g,s,C,v,w,y,A,E,M,R;i&&(R=this.utf16.decode(r)),r=this.utf16.decode(r.toLowerCase());var _=r.length;if(i)for(v=0;v<_;v++)R[v]=r[v]!=R[v];var m=[];for(d=t,p=0,C=f,v=0;v<_;++v)r[v]<128&&m.push(String.fromCharCode(R?n(r[v],R[v]):r[v]));for(g=s=m.length,s>0&&m.push(h);g<_;){for(w=l,v=0;v<_;++v)M=r[v],M>=d&&M<w&&(w=M);if(w-d>Math.floor((l-p)/(g+1)))throw RangeError("punycode_overflow (1)");for(p+=(w-d)*(g+1),d=w,v=0;v<_;++v){if(M=r[v],M<d&&++p>l)return Error("punycode_overflow(2)");if(M==d){for(y=p,A=a;E=A<=C?u:A>=C+c?c:A-C,!(y<E);A+=a)m.push(String.fromCharCode(o(E+(y-E)%(a-E),0))),y=Math.floor((y-E)/(a-E));m.push(String.fromCharCode(o(y,i&&R[v]?1:0))),C=e(p,g+1,g==s),p=0,++g}}++p,++d}return m.join("")},this.ToASCII=function(r){for(var o=r.split("."),e=[],n=0;n<o.length;++n){var t=o[n];e.push(t.match(/[^A-Za-z0-9-]/)?"xn--"+punycode.encode(t):t)}return e.join(".")},this.ToUnicode=function(r){for(var o=r.split("."),e=[],n=0;n<o.length;++n){var t=o[n];e.push(t.match(/^xn--/)?punycode.decode(t.slice(4)):t)}return e.join(".")}};