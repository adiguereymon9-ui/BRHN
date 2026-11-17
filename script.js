(function(){
  var d=document, $=function(i){return d.getElementById(i)};
  $("yr").textContent=new Date().getFullYear();

  // time slots every 30 min, 7:00 AM - 8:30 PM
  var t=$("time");
  for(var m=7*60;m<=20*60+30;m+=30){
    var h=Math.floor(m/60),mm=m%60,ap=h>=12?"PM":"AM",h12=h%12||12;
    var label=h12+":"+(mm?"30":"00")+" "+ap, o=d.createElement("option");
    o.value=label;o.textContent=label;t.appendChild(o);
  }
  // date: today or later
  var now=new Date(), pad=function(n){return String(n).padStart(2,"0")};
  var today=now.getFullYear()+"-"+pad(now.getMonth()+1)+"-"+pad(now.getDate());
  $("date").min=today; $("date").value=today;

  // hero media fallback: if an <img>/<video> is added and fails, keep the placeholder look
  var hero=d.querySelector(".hero"), media=d.querySelector("[data-hero-media]");
  var el=media.querySelector("img,video");
  if(el){el.addEventListener("error",function(){el.remove()});}

  function setErr(id,msg){$(id).textContent=msg}
  $("booking").addEventListener("submit",function(e){
    e.preventDefault();
    var bad=null;
    ["name","email","date","time","consent"].forEach(function(k){setErr("e-"+k,"")});
    var name=$("name").value.trim(), email=$("email").value.trim();
    if(!name){setErr("e-name","Enter your name.");bad=bad||$("name")}
    if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)){setErr("e-email","Enter a valid email address.");bad=bad||$("email")}
    if(!$("date").value||$("date").value<today){setErr("e-date","Choose today or a future date.");bad=bad||$("date")}
    if(!t.value){setErr("e-time","Choose a time.");bad=bad||t}
    if(!$("consent").checked){setErr("e-consent","Please agree to the Privacy Notice to continue.");bad=bad||$("consent")}
    if(bad){bad.focus();return}
    var seat=d.querySelector('input[name="seat"]:checked').value;
    var dt=new Date($("date").value+"T12:00:00").toLocaleDateString("en-US",{weekday:"long",month:"long",day:"numeric"});
    var ok=$("ok");
    ok.innerHTML="";
    var h=d.createElement("h3");h.textContent="Request received, "+name.split(" ")[0]+".";
    var p=d.createElement("p");
    p.textContent=seat+" for "+$("guests").value+" on "+dt+" at "+t.value+". We will email "+email+" to confirm.";
    ok.appendChild(h);ok.appendChild(p);ok.hidden=false;ok.scrollIntoView({block:"nearest"});
    // NOTE: static demo. Connect this to a booking service (e.g. email form backend, OpenTable, Resy, Square Appointments) to receive real requests.
  });
})();
