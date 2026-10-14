(function(){
  var b=document.querySelector('.burger'),n=document.getElementById('nav');
  if(b&&n)b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o?'true':'false');});
  function $(i){return document.getElementById(i);}
  var DN=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'],d=new Date().getDay();
  var TIPS=['Batch-cook for the week ahead.','Plan once, eat well all week.','Use leftovers for lunch.','Try a meat-free dinner.','Check the fridge before you shop.','Keep tonight simple and fun.','Cook something slow and cosy.'];
  if($('sb-day')){$('sb-day').textContent=DN[d];$('sb-tip').textContent=TIPS[d];}
  var wk=document.querySelectorAll('#wk span');if(wk.length)wk[(d+6)%7].classList.add('on');
  // 1. Week planner: [name, minutes, key ingredients]
  var M={all:[['Sheet-pan chicken thighs with potatoes and greens',40,'chicken thighs, potatoes'],['Weeknight penne with meat sauce',30,'minced beef, penne'],['Egg fried rice with peas',15,'eggs, frozen peas'],['Bean and cheese quesadillas',15,'tortillas, beans'],['Salmon with rice and broccoli',25,'salmon, broccoli'],['Chicken and vegetable stir-fry',20,'chicken, peppers'],['Slow-cooked beef stew',150,'stewing beef, carrots'],['Homemade pizza with salad',35,'pizza dough, mozzarella'],['Turkey chilli with rice',40,'minced turkey, kidney beans']],
    veg:[['Chickpea and spinach curry with rice',30,'chickpeas, spinach'],['Roasted squash soup with feta',55,'squash, feta'],['Mushroom and pea risotto',35,'mushrooms, rice'],['Bean and cheese quesadillas',15,'tortillas, beans'],['Egg fried rice with peas',15,'eggs, frozen peas'],['Veggie burgers with sweet potato wedges',35,'sweet potatoes, burgers'],['Lentil shepherd’s pie',60,'lentils, potatoes'],['Pasta with tomato and roasted vegetables',25,'pasta, courgettes'],['Halloumi and vegetable traybake',35,'halloumi, peppers']],
    fish:[['Salmon with rice and broccoli',25,'salmon, broccoli'],['Tuna and sweetcorn pasta bake',35,'tinned tuna, pasta'],['Fish tacos with slaw',20,'white fish, cabbage'],['Chickpea and spinach curry with rice',30,'chickpeas, spinach'],['Egg fried rice with peas',15,'eggs, frozen peas'],['Baked cod with potatoes and peas',30,'cod, potatoes'],['Mushroom and pea risotto',35,'mushrooms, rice'],['Fishcakes with salad',30,'potatoes, salmon'],['Pasta with tomato and roasted vegetables',25,'pasta, courgettes']],
    light:[['Big walnut, olive and cheese salad',15,'leaves, walnuts'],['Roasted squash soup with feta',55,'squash, feta'],['Chicken and vegetable stir-fry',20,'chicken, peppers'],['Salmon with rice and broccoli',25,'salmon, broccoli'],['Vegetable omelette with salad',15,'eggs, peppers'],['Lentil and vegetable soup',40,'lentils, carrots'],['Grain bowl with roasted vegetables',30,'quinoa, chickpeas'],['Baked cod with potatoes and peas',30,'cod, potatoes'],['Turkey lettuce wraps',20,'minced turkey, lettuce']]};
  var wd=$('wp-d'),wt=$('wp-t'),wp=$('wp-p'),wl=$('wp-l'),wf=$('wp-f'),DAYS=['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
  function plan(){if(!wd)return;var t=+wt.value,p=+wp.value,L=M[wd.value],quick=L.filter(function(x){return x[1]<=t;}),slow=L.filter(function(x){return x[1]>t;}),out=[],used=[];
    $('wp-p-o').textContent=p;
    function pick(arr){for(var i=0;i<arr.length;i++){if(used.indexOf(arr[i][0])<0){used.push(arr[i][0]);return arr[i];}}return arr[0]||L[0];}
    for(var i=0;i<7;i++){var day=DAYS[i],m;
      if(wl.checked&&i===3&&out.length){var prev=out[1]||out[0];out.push([day,'Leftovers night','Use up '+prev[1].toLowerCase()+' and anything else in the fridge']);continue;}
      if(wf.checked&&i===4){out.push([day,'Homemade &ldquo;takeaway&rdquo;: crispy chicken or tofu wraps','Fun Friday food, ready in about 25 minutes']);continue;}
      m=(i>=5?pick(slow.concat(quick)):pick(quick.length?quick:L));
      out.push([day,m[0],m[1]+' min &middot; '+m[2]]);}
    $('wp-h').textContent='Your week for '+p+(p>1?' people':' person');
    $('wp-list').innerHTML=out.map(function(x){return '<li><i>'+x[0]+'</i><div><b>'+x[1]+'</b><small>'+x[2]+'</small></div></li>';}).join('');
    var ing=[];used.forEach(function(u){L.forEach(function(x){if(x[0]===u)x[2].split(', ').forEach(function(g){if(ing.indexOf(g)<0)ing.push(g);});});});
    $('wp-shop').innerHTML='<b>Start your list:</b> '+ing.join(', ')+', plus onions, garlic and a bag of salad. Quantities: plan for '+p+(p>1?' people':' person')+(p>2?'; cook double on the leftovers night.':'.');}
  if(wd){[wd,wt,wp,wl,wf].forEach(function(x){x.addEventListener('input',plan);x.addEventListener('change',plan);});plan();}
  // 2. Plate builder
  var PB={breakfast:[['Fruit and veg',0.4,'#3A7D44','a banana or a handful of berries'],['Protein',0.25,'#E4572E','2 eggs or 150 g yogurt'],['Grains',0.3,'#F6D365','40 g oats or 2 slices wholegrain toast'],['Healthy fats',0.05,'#8B6B4A','a few nuts or seeds']],
    lunch:[['Fruit and veg',0.5,'#3A7D44','2 big handfuls of salad or veg'],['Protein',0.25,'#E4572E','100 g chicken, tuna or beans'],['Grains',0.2,'#F6D365','1 wrap or 60 g dry grains'],['Healthy fats',0.05,'#8B6B4A','1 tbsp dressing or ¼ avocado']],
    dinner:[['Fruit and veg',0.5,'#3A7D44','2–3 handfuls of vegetables'],['Protein',0.25,'#E4572E','120 g meat or fish, or 150 g tofu or beans'],['Grains',0.2,'#F6D365','75 g dry pasta or rice, or 2 small potatoes'],['Healthy fats',0.05,'#8B6B4A','1 tbsp olive oil for cooking']]};
  var WH={adult:[1,'Typical everyday portions for an adult.'],active:[1.3,'Larger portions of grains and protein for very active days.'],child:[0.6,'Roughly half to two-thirds of an adult portion; let appetite guide you.']};
  var pm=$('pb-m'),pw=$('pb-w');
  function arc(a0,a1,c){var r=66,cx=85,cy=85,x0=cx+r*Math.cos(a0),y0=cy+r*Math.sin(a0),x1=cx+r*Math.cos(a1),y1=cy+r*Math.sin(a1),lg=a1-a0>Math.PI?1:0;return '<path d="M'+cx+' '+cy+' L'+x0.toFixed(1)+' '+y0.toFixed(1)+' A'+r+' '+r+' 0 '+lg+' 1 '+x1.toFixed(1)+' '+y1.toFixed(1)+'Z" fill="'+c+'" stroke="#fff" stroke-width="2"/>';}
  function plate(){if(!pm)return;var P=PB[pm.value],W=WH[pw.value],a=-Math.PI/2,g='';
    P.forEach(function(x){var e=a+x[1]*2*Math.PI;g+=arc(a,e,x[2]);a=e;});$('pl-g').innerHTML=g;
    $('pb-h').textContent='A balanced '+pm.value+' plate';
    $('pb-l').innerHTML=P.map(function(x){return '<li><span><i style="background:'+x[2]+'"></i>'+x[0]+'</span><b>'+Math.round(x[1]*100)+'%</b></li><li style="border-bottom:0;padding-top:0"><small class="muted">'+x[3]+'</small></li>';}).join('');
    $('pb-n').innerHTML='<b>Portions:</b> '+W[1]+(W[0]!==1?' Scale the amounts above by about '+W[0]+'×.':'')+' This is a general guide, not personal nutrition advice.';}
  if(pm){[pm,pw].forEach(function(x){x.addEventListener('change',plate);});plate();}
  // 3. Fridge checker: [name, fridge, freezer, best place, tip, best]
  var FC={leftovers:['Cooked leftovers','3–4 days','2–3 months','Shallow, covered containers on a middle shelf','Cool quickly and refrigerate within two hours. Reheat once, until steaming hot.',0],
    rice:['Cooked rice','1 day','1 month','Airtight container, chilled within an hour','Cool rice fast by spreading it out. Reheat only once until piping hot.',0],
    chicken:['Raw chicken','1–2 days','9 months','Bottom shelf, in a sealed container','Keep raw meat below ready-to-eat food so juices can’t drip. Cook to 74°C (165°F).',1],
    mince:['Raw minced meat','1–2 days','3–4 months','Bottom shelf, sealed','Freeze on the day you buy it if you won’t cook it soon. Cook to 71°C (160°F).',1],
    fish:['Raw fish','1–2 days','3–6 months','Bottom shelf, coldest part of the fridge','Fresh fish should smell of the sea, not “fishy”. Cook until opaque and flaky.',1],
    eggs:['Eggs','3–5 weeks','Not in shell','In their box on a main shelf, not the door','The door is the warmest part of the fridge. Freeze beaten eggs if you need to.',0],
    milk:['Milk (opened)','5–7 days','3 months','Door or top shelf','Freezing changes the texture slightly; it’s best for cooking once thawed.',0],
    cheese:['Hard cheese','3–4 weeks (opened)','6 months, grated','Wrapped in wax paper, then a bag','Cut off at least 2 cm around any mould on hard cheese; throw out mouldy soft cheese.',0],
    bread:['Bread','Not recommended','3 months','Bread bin for 2–3 days; freezer for longer','The fridge makes bread go stale faster. Slice before freezing and toast from frozen.',2],
    greens:['Leafy greens','3–5 days','Cook first, then 6 months','Salad drawer, wrapped in a paper towel','Keep leaves dry to stop them going slimy. Wash just before eating.',0],
    berries:['Berries','2–3 days','6–12 months','Salad drawer, unwashed','Pick out any mouldy ones straight away. Freeze on a tray, then bag.',0],
    soup:['Homemade soup','3–4 days','2–3 months','Covered, in portions','Leave space at the top of containers when freezing; liquids expand.',1]};
  var ff=$('fc-f');
  function fridge(){if(!ff)return;var F=FC[ff.value];$('fc-h').textContent=F[0];
    $('fc-k').innerHTML=[['Fridge',F[1]],['Freezer',F[2]],['Counter',ff.value==='bread'?'2–3 days':'2 hours max']].map(function(x,i){return '<div class="'+((F[5]===1&&i===1)||(F[5]===2&&i===2)||(F[5]===0&&i===0)?'best':'')+'"><b>'+x[1]+'</b><small>'+x[0]+'</small></div>';}).join('');
    $('fc-s').innerHTML='<b>Where to keep it:</b> '+F[3]+'.';$('fc-t').innerHTML='<b>Tip:</b> '+F[4];}
  if(ff){ff.addEventListener('change',fridge);fridge();}
  // contact & cookies
  var cf=$('cform');
  if(cf)cf.addEventListener('submit',function(ev){ev.preventDefault();if(cf.website.value)return;if(!cf.checkValidity()){cf.reportValidity();return;}
    var body='Name: '+cf.name.value+'\nEmail: '+cf.email.value+'\nTopic: '+cf.topic.value+'\n\n'+cf.message.value;
    window.location.href='mailto:'+cf.dataset.to+'?subject='+encodeURIComponent('Website enquiry: '+cf.topic.value)+'&body='+encodeURIComponent(body);
    var s=$('fm');s.hidden=false;s.textContent='Your email app should now open with your message ready to send. If it doesn’t, please email us directly at '+cf.dataset.to+'.';});
  var c=$('cookie'),v=null;try{v=localStorage.getItem('dfg_cookie');}catch(e){}
  if(c&&!v)c.classList.add('show');
  document.querySelectorAll('[data-cookie]').forEach(function(x){x.addEventListener('click',function(){try{localStorage.setItem('dfg_cookie',x.dataset.cookie);}catch(e){}c.classList.remove('show');});});
  var y=$('year');if(y)y.textContent=new Date().getFullYear();
})();
