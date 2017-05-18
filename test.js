(function(elid, wi, he, exp, pot, gld, hp, lvl, cur_e, e_sz){
    var hit = function(){
        evs[cur_e][8]-=lvl*4+6;
        if (evs[cur_e][8]<=0) {
            alert("Monster defeated and you got "+evs[cur_e][10]+"EXP and $"+evs[cur_e][11]);
            exp+=evs[cur_e][10]; gld+=evs[cur_e][11];
            while (exp>=lvl*10) { exp-=lvl*10; lvl++; alert("Level Up!") }
            cur_e++; if (cur_e==e_sz) alert("Victory!")
        } else {
            hp-=Math.max(0,evs[cur_e][9]-lvl*2-1);
            if(hp<=0) alert("Game Over!")
        }
    }
    var use = function(){ if (pot>0){pot--;hp+=10;if(hp>100)hp=100} }
    var nxt = function(){ cur_e++ }
    var battle = ["Attack", "Use Potion +10HP", "Skip Battle", hit, use, nxt];
    var canvas=document.querySelector(elid), ctx=canvas.getContext("2d");
    canvas.width=wi; canvas.height=he;
    var evs=[], e_tp=[
    ["Shop", "Wizard provides his services", "Buy Potion $20", "Full Heal $100", "Leave",
        function(){ if(gld>=20){gld-=20;pot++} },
        function(){ if(gld>=100){gld-=100;hp=100} }, nxt ],
    ["Skeleton", "A terrible skeleton on your way"].concat(battle,70,15,25,100),
    ["Goblin", "Green goblin wants to get your money"].concat(battle,50,10,15,70),
    ["Slime", "What the strange jelly monster?"].concat(battle,20,6,7,30),
    ["Dragon", "Omg! It is evil Dragon!","Attack","Use Potion +10HP","-",hit,use,,300,25,100,1000 ] ];
    var q=e_tp.length-1;
    for (var i=0;i<e_sz-1;i++) evs.push( e_tp[Math.floor(Math.random()*q)].slice(0) );
    evs.push( e_tp[q].slice(0) );
    var game = setInterval(function(){
        ctx.clearRect(0,0,wi,he);
        ctx.fillText("NanoRPG in 30 lines of JavaScript by ripatti",10,15);
        ctx.fillText("LVL "+lvl+"  HP "+hp+"/100  EXP "+exp+"/"+lvl*10+"  ATK "+(lvl*4+6)+
         "  DEF "+(lvl*2+1)+"  Gold $"+gld+"  Potions "+pot,10,30);
        for (var i=0;i<e_sz;i++) ctx.fillText((i==e_sz-1||i<=cur_e)?evs[i][0]:"??",i*50+15,70);
        ctx.fillText("@",cur_e*50+25,60);
        ctx.fillText(evs[cur_e][1],20,100);
        if (evs[cur_e].length>8) ctx.fillText("Enemy HP "+evs[cur_e][8],250,100);
        for (var i=0;i<3;i++) {
            ctx.strokeRect(i*120+5,120,110,20);
            ctx.fillText(evs[cur_e][i+2],i*120+10,133);
        }
    }, 100);
    document.addEventListener('click', function(e){
        if (hp>0)
            for (var i=0;i<3;i++)
                if (i*120+5<=e.pageX && e.pageX<i*120+115 && 120<=e.pageY && e.pageY<140)
                    evs[cur_e][i+5]()
    }, false);
})("#canvas",365,150,0,3,100,100,1,0,7);