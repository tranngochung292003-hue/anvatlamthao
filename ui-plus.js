/* ui-plus.js – Popup chào mừng, thanh chạy, slider, hiệu ứng, footer đầy đủ
   Cách dùng: thêm 1 dòng trước </body> của index.html:  <script src="ui-plus.js"></script> */
(function(){
const SHOP={owner:"Trần Ngọc Hùng",addr:"[ĐIỀN ĐỊA CHỈ QUÁN]",hotline:"0978 472 704",tel:"0978472704"};
const $=id=>document.getElementById(id);

/* ---------- CSS ---------- */
const css=`
@keyframes lf{0%,100%{transform:translateY(0) rotate(-3deg)}50%{transform:translateY(-5px) rotate(3deg)}}
@keyframes spin{to{transform:rotate(360deg)}}
@keyframes bump{40%{transform:scale(1.25) rotate(-8deg)}}
@keyframes glow{50%{box-shadow:0 12px 34px #ff8a0099}}
@keyframes up{from{opacity:0;transform:translateY(14px)}}
@keyframes mq{to{transform:translateX(-50%)}}
@keyframes pop{from{opacity:0;transform:scale(.85) translateY(20px)}}
.top img,.hero img{animation:lf 3.2s ease-in-out infinite}
.hero img{animation-duration:4.2s;filter:drop-shadow(0 6px 10px #0005)}
.top img:hover,.hero img:hover{animation:spin .8s}
button,.cta,.cb a{transition:transform .15s,filter .2s,box-shadow .2s}
.add:hover,.cta:hover,.mini:hover,.big:hover,.ap:hover,.cb a:hover,.vcard button:hover{transform:translateY(-2px);filter:brightness(1.06)}
button:active,.cta:active,.cb a:active{transform:scale(.94)}
.cartbtn.bump{animation:bump .5s}
.bar button{animation:glow 2.4s infinite}
.cta{animation:glow 2.4s infinite}
.card{animation:up .45s both;transition:transform .2s}.card:hover{transform:translateY(-3px)}
.mq{background:var(--sun);color:var(--ink);overflow:hidden;white-space:nowrap;font-weight:700;font-size:.82rem;padding:6px 0}
.mq div{display:inline-block;animation:mq 28s linear infinite}.mq span{padding:0 22px}
.sl{margin-top:12px;position:relative}
.sl .tr{display:flex;overflow-x:auto;scroll-snap-type:x mandatory;scrollbar-width:none;border-radius:20px;scroll-behavior:smooth}.sl .tr::-webkit-scrollbar{display:none}
.sl .s{flex:none;width:100%;scroll-snap-align:start;padding:20px 18px;min-height:112px;display:flex;flex-direction:column;justify-content:center;gap:4px;color:#fff;cursor:pointer}
.sl .s b{font-size:1.15rem}.sl .s small{opacity:.92;font-size:.85rem}
.sl .d{display:flex;justify-content:center;gap:6px;margin-top:8px}.sl .d i{width:8px;height:8px;border-radius:9px;background:var(--line);transition:.3s}.sl .d i.on{width:22px;background:var(--org)}
#wl{align-items:center;padding:16px}#wl .sheet{border-radius:28px;text-align:center;animation:pop .45s both;max-width:380px}
#wl .lg{width:96px;animation:lf 3s ease-in-out infinite}#wl h2{display:block;font-size:1.35rem;margin:6px 0}
#wl p{color:var(--mute);margin-bottom:12px}#wl .big{margin-bottom:8px}#wl .vc{background:#fff;border:2px dashed var(--org);border-radius:14px;padding:10px;margin-bottom:10px}#wl .vc b{color:var(--red);font-size:1.1rem}
#wl .gh{background:#fff;border:2px solid var(--line);color:var(--ink)}
.ft2{margin-top:18px;background:var(--ink);color:#fff;border-radius:24px;padding:20px 16px;display:grid;gap:16px;font-size:.88rem}
.ft2 h4{color:var(--sun);margin-bottom:4px}.ft2 p,.ft2 li{opacity:.85}.ft2 ul{list-style:none;padding:0}.ft2 li{padding:3px 0}
.ft2 button,.ft2 a{color:#fff;text-decoration:underline}
.ft2 .tr2{display:flex;gap:8px;flex-wrap:wrap}.ft2 .tr2 span{background:#ffffff1f;border-radius:99px;padding:3px 12px;font-size:.78rem}
@media(min-width:600px){.ft2{grid-template-columns:repeat(3,1fr)}}
.fab{position:fixed;right:14px;bottom:calc(88px + env(safe-area-inset-bottom,0px));z-index:35;display:flex;flex-direction:column;gap:8px}
.fab a,.fab button{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;font-size:1.2rem;text-decoration:none;box-shadow:0 6px 16px #0004;color:#fff}
.fab .z{background:#0068ff}.fab .t{background:var(--ink);opacity:0;pointer-events:none}.fab .t.on{opacity:1;pointer-events:auto}
@media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}`;
const st=document.createElement("style");st.textContent=css;document.head.appendChild(st);

/* ---------- Thanh chữ chạy ---------- */
const mq=document.createElement("div");mq.className="mq";
function mqText(){let free="";try{free=fmt(CFG.free)}catch(_){free="100.000đ"}
 const t=[`🎉 Chào mừng bạn đến Ăn Vặt Lâm Thao`,`🚚 Miễn phí giao hàng từ ${free}`,`🎟️ Voucher mới mỗi ngày – bấm “Dùng mã”`,`⭐ Đăng ký tài khoản để tích điểm thưởng`,`⚡ Đặt Nhanh - Giao Nhanh`].map(x=>`<span>${x}</span>`).join("");
 mq.innerHTML=`<div>${t}${t}</div>`}
mqText();document.querySelector("header.top").after(mq);
if($("area"))new MutationObserver(mqText).observe($("area"),{childList:true,characterData:true,subtree:true});

/* ---------- Slider ---------- */
const S=[
 ["linear-gradient(120deg,#e0301f,#ff8a00)","🔥 Đặt Nhanh - Giao Nhanh","Món nóng giòn, giao tận nơi trong khu vực","#menu"],
 ["linear-gradient(120deg,#2e8b4a,#8fd3b0)","🎟️ Voucher mỗi ngày","Bấm để xem mã giảm giá hôm nay","#vs"],
 ["linear-gradient(120deg,#3a150e,#8a3b1f)","🍱 Combo tiết kiệm","Ăn no – giá mềm, xem ngay các combo","combo"],
 ["linear-gradient(120deg,#0068ff,#6aa8ff)","⭐ Tích điểm đổi hạng","Đăng ký tài khoản, 1.000đ = 1 điểm","acc"]];
const sl=document.createElement("section");sl.className="sl";
sl.innerHTML=`<div class="tr">${S.map((s,i)=>`<div class="s" data-i="${i}" style="background:${s[0]}"><b>${s[1]}</b><small>${s[2]}</small></div>`).join("")}</div><div class="d">${S.map((_,i)=>`<i class="${i?"":"on"}"></i>`).join("")}</div>`;
document.querySelector(".hero").after(sl);
const tr=sl.querySelector(".tr"),dots=sl.querySelectorAll(".d i");let idx=0,hold=false;
const go=i=>{idx=(i+S.length)%S.length;tr.scrollTo({left:idx*tr.clientWidth})};
tr.addEventListener("scroll",()=>{const n=Math.round(tr.scrollLeft/tr.clientWidth);idx=n;dots.forEach((d,j)=>d.classList.toggle("on",j==n))});
["touchstart","mouseenter"].forEach(e=>tr.addEventListener(e,()=>hold=true));["touchend","mouseleave"].forEach(e=>tr.addEventListener(e,()=>setTimeout(()=>hold=false,3000)));
setInterval(()=>{if(!hold&&!document.hidden)go(idx+1)},4200);
tr.addEventListener("click",e=>{const s=e.target.closest(".s");if(!s)return;const a=S[+s.dataset.i][3];
 if(a=="combo"){try{cur="combo";buildTabs();menu()}catch(_){}document.getElementById("menu").scrollIntoView()}
 else if(a=="acc")$("acBtn").click();else{const t=document.querySelector(a);if(t&&!t.hidden)t.scrollIntoView();else document.getElementById("menu").scrollIntoView()}});

/* ---------- Popup chào mừng (1 lần/ngày) ---------- */
function welcome(){const day=new Date().toDateString();let seen;try{seen=localStorage.getItem("alt_wl")}catch(_){}
 if(seen===day)return;try{localStorage.setItem("alt_wl",day)}catch(_){}
 let v=null;try{v=VC&&VC[0]}catch(_){}
 const m=document.createElement("div");m.className="mask";m.id="wl";
 m.innerHTML=`<div class="sheet"><img class="lg" src="logo.webp" alt=""><h2>Chào mừng bạn! 👋</h2><p>Ăn Vặt Lâm Thao – Đặt Nhanh, Giao Nhanh. Hôm nay bạn muốn ăn gì nào?</p>${v?`<div class="vc">🎟️ Voucher hôm nay<br><b>${esc(v.code)}</b><br><small>${esc(v.desc)}</small></div>`:""}${v?`<button class="big" id="wlv" data-vc="${esc(v.code)}">Dùng mã ${esc(v.code)}</button>`:""}<button class="big${v?" gh":""}" id="wlm">Xem thực đơn</button><button class="big gh" data-close="wl" style="height:42px">Để sau</button></div>`;
 document.body.appendChild(m);open_("wl");
 $("wlm").onclick=()=>{close_("wl");document.getElementById("menu").scrollIntoView()};
 if($("wlv"))$("wlv").addEventListener("click",()=>close_("wl"))}
setTimeout(welcome,1800);

/* ---------- Hiệu ứng giỏ hàng khi thêm món ---------- */
if($("cnt"))new MutationObserver(()=>{const b=$("cartBtn");b.classList.remove("bump");void b.offsetWidth;b.classList.add("bump")}).observe($("cnt"),{childList:true});

/* ---------- Chính sách bổ sung + Footer ---------- */
const pol=document.querySelector("#pol .sheet");
pol.insertAdjacentHTML("beforeend",`<details id="pol-about"><summary>Giới thiệu</summary><p>Ăn Vặt Lâm Thao phục vụ đồ ăn nhanh, ăn vặt, đồ uống và combo, chế biến trong ngày và giao tận nơi trong khu vực phục vụ.</p></details>
<details id="pol-faq"><summary>Câu hỏi thường gặp</summary><p><b>Có cần tài khoản để đặt không?</b> Không, nhưng tài khoản giúp lưu thông tin, xem lịch sử đơn và tích điểm.<br><b>Bao lâu nhận được hàng?</b> Thường 20–40 phút, lâu hơn vào giờ cao điểm.<br><b>Đặt sai thì sao?</b> Hủy trong “Đơn của tôi” khi quán chưa xác nhận, hoặc gọi hotline ${SHOP.hotline}.</p></details>`);
document.querySelectorAll(".ft p").forEach(p=>{p.innerHTML=p.innerHTML.replace("[Họ tên]",SHOP.owner).replace("[địa chỉ quán]",SHOP.addr)});
const f2=document.createElement("div");f2.className="ft2";
f2.innerHTML=`<div><h4>Ăn Vặt Lâm Thao</h4><p>Đồ ăn nhanh, ăn vặt, đồ uống, combo. Đặt Nhanh - Giao Nhanh.</p><p style="margin-top:6px">📍 ${SHOP.addr}<br>📞 <a href="tel:${SHOP.tel}">${SHOP.hotline}</a></p></div>
<div><h4>Hỗ trợ khách hàng</h4><ul><li><button data-pol="about">Giới thiệu</button></li><li><button data-pol="faq">Câu hỏi thường gặp</button></li><li><button data-pol="ship">Chính sách giao hàng</button></li><li><button data-pol="cancel">Hủy đơn &amp; đổi trả</button></li></ul></div>
<div><h4>Điều khoản &amp; dịch vụ</h4><ul><li><button data-pol="terms">Điều khoản sử dụng</button></li><li><button data-pol="privacy">Chính sách bảo mật</button></li><li><button data-pol="promo">Voucher &amp; điểm thưởng</button></li></ul><div class="tr2" style="margin-top:8px"><span>💵 Tiền mặt</span><span>🏦 VietQR</span></div></div>`;
document.querySelector(".ft").before(f2);

/* ---------- Nút nổi: Zalo + lên đầu trang ---------- */
const fab=document.createElement("div");fab.className="fab";
fab.innerHTML=`<a class="z" href="https://zalo.me/${SHOP.tel}" target="_blank" rel="noopener" aria-label="Zalo">💬</a><button class="t" aria-label="Lên đầu trang">⬆</button>`;
document.body.appendChild(fab);const tb=fab.querySelector(".t");
tb.onclick=()=>scrollTo({top:0});addEventListener("scroll",()=>tb.classList.toggle("on",scrollY>500),{passive:true});
})();
