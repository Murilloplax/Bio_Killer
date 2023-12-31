    const des = document.getElementById('des').getContext('2d')

    const botaoReiniciar = document.getElementById("reiniciarBotao");
        botaoReiniciar.addEventListener("click", function(){
        reiniciarJogo(); // Esta função irá reiniciar o jogo    });

    });

    // CÉU
    const bg1 = new BG(0,0,800,500,'./assets/img/background/nature_1/1.png')
    const bg2 = new BG(0,0,800,500,'./assets/img/background/nature_1/2.png')
    const bg4 = new BG(0,0,800,500,'./assets/img/background/nature_1/4.png')
    const earth = new BG(0,0,800,500,'./assets/img/background/sky_3/7.png')
    const bg7 = new BG(0,0,800,500,'./assets/img/background/fundo.jpg')
    let robb = new Robb(0,370,110,128,'./assets/img/player/lacaio/robb.png')
    let lacaio = new Lacaio(0,0,80,100,'./assets/img/player/lacaio/lacaio.png')
    let urso = new Lacaio(0,0,100,100,'./assets/img/player/lacaio/urso.png')
    let radioativo = new Lacaio(0,0,60,60,'./assets/img/player/lacaio/radioativo.png')
    let planta = new Planta(0,0,80,80,'./assets/img/player/lacaio/cogumelo.png')
    let energia = new Planta(0,0,80,80,'./assets/img/player/lacaio/municao.png')
    
    let txt_pts = new Texto()
    let txt_vidas = new Texto()
    let txt_municao = new Texto()
    let pts = new Texto()
    let vida = new Texto()
    let municao = new Texto()
    let texto_game_over = new Texto()
    let fundo_game_over = new Texto()
    let fim_jogo = new Texto()
    let fundo_fim_jogo = new Texto()
    let fases = new Texto()
    let txt_fases = new Texto()

    let jogar = true
    let dar_tiro = true
    let fase = 1; // Controla a fase do jogo
    let ursoDesenhado = false; 
    let radioativoDesenhado = false; 

    // Som

    const som1 = new Audio("assets/som/background.wav")
    const som2 = new Audio("assets/som/tiro.wav")
    const som3 = new Audio("assets/som/urso.wav")
    const som4 = new Audio("assets/som/zumbi.wav")
    const som5 = new Audio("assets/som/radiacao.ogg")
    som1.volume = 0.2
    som1.loop = true
    som2.volume = 0.5
    som2.playbackRate = 15.0;
    som3.volume = 0.9
    som4.volume = 0.9
    som5.volume = 0.9
    const grupoTiros = []

    let isJumping = false;


    // MOVIMENTO

    document.addEventListener('keydown', (ev)=>{
        if(ev.key === 'a'){
            robb.dir_x -= 5;
        }
        if(ev.key === 'd'){
            robb.dir_x += 5;
        }
        if(ev.key === 's'){
            robb.dir_y += 5;
        }
        if(ev.key === 'w' && !isJumping){ 
            isJumping = true
            robb.dir_y -= 10
        }
        som1.play()
    })
    
    document.addEventListener('keyup', (ev)=>{
        if(ev.key === 'a'){
            robb.dir_x = 0;
        }
        if(ev.key === 'd'){
            robb.dir_x = 0;
        }
        if(ev.key === 's'){
            robb.dir_x = 0;
        }
        if(ev.key === 'w'){
            robb.dir_y = 0;
            isJumping = false;  // Reinicie o estado de pulo quando a tecla é liberada
        }
    });

    document.addEventListener('keypress', (ev)=>{
        if (ev.key === 'l') {
            let tiro = new Tiro(robb.x + 40 + robb.w / 2, robb.y + 60, 8, 4, './assets/img/player/lacaio/tiro.png')
            grupoTiros.push(tiro)
            robb.municao -= 1
            som2.play()
        }
    })
    
    function colisao(){
        if(robb.colid(lacaio)){
            lacaio.recomeca()
            robb.vida -=1
            som4.play()
        }
        if(robb.colid(planta)){
            planta.recomeca()
            robb.vida +=1
        }
        if(robb.colid(energia)){
            energia.recomeca()
            robb.municao += 10
        }
    }

    function game_over(){
        if(robb.vida <= 0){
            jogar = false
            botaoReiniciar.style.display = "block";
            botaoReiniciar.style.margin = "auto"
            som1.pause()
        }
    }

    function reiniciarJogo() {
        jogar = true;
        dar_tiro = true;
        fase = 1;
        ursoDesenhado = false;
        radioativoDesenhado = false;
        robb = new Robb(0, 370, 110, 128, './assets/img/player/lacaio/robb.png');
        botaoReiniciar.style.display = "none";
    }

    function verificarColisaoTiroLacaio(tiro, lacaio) {
        
        return (
            tiro.x < lacaio.x + lacaio.w &&
            tiro.x + tiro.w > lacaio.x &&
            tiro.y < lacaio.y + lacaio.h &&
            tiro.y + tiro.h > lacaio.y
        );
    }
    function verificarColisaoTiroUrso(tiro, urso) {
        return (
            tiro.x < urso.x + urso.w &&
            tiro.x + tiro.w > urso.x &&
            tiro.y < urso.y + urso.h &&
            tiro.y + tiro.h > urso.y
        );
    }
    function verificarColisaoTiroRadioativo(tiro, radioativo) {
        return (
            tiro.x < radioativo.x + radioativo.w &&
            tiro.x + tiro.w > radioativo.x &&
            tiro.y < radioativo.y + radioativo.h &&
            tiro.y + tiro.h > radioativo.y
        );
    }

    
    function desenha(){
        if(jogar === true){
            bg1.des_obj()
            bg2.des_obj()
            bg4.des_obj()
            earth.des_obj()

            robb.des_obj()
            lacaio.des_obj()
            planta.des_obj()
            energia.des_obj()

            grupoTiros.forEach((tiro)=>{
                tiro.des_tiro()
            })

            txt_pts.des_text('Pontos : ',20,40,'white','30px Times')
            pts.des_text(robb.pts,120,40,'white','30px Times')
            txt_vidas.des_text('Vidas : ',210,40,'white','30px Times')
            vida.des_text(robb.vida,300,40,'white','30px Times')
            txt_municao.des_text('Munição:',600,40,'white','30px Times')
            municao.des_text(robb.municao,720,40,'white','30px Times')
            txt_fases.des_text('Fase Atual:',360,40,'red','30px Times')
            fases.des_text(fase,500,40,'red','30px times')
            
            if (fase === 2) {
                urso.des_obj();
                if (robb.colid(urso)) {
                    urso.recomeca()
                    robb.vida -= 1
                    som3.play()
                }
            }

            if (fase === 3) {
                radioativo.des_obj();
                urso.des_obj();
                if (robb.colid(radioativo)) {
                    radioativo.recomeca()
                    robb.vida -= 1
                    som5.play()
                }if (robb.colid(urso)) {
                    urso.recomeca()
                    robb.vida -= 1
                    som3.play()
                }
            }if (fase === 4) {
                bg7.des_obj()
                fim_jogo.des_text('You Win',198,263, 'black','102px Times')
                fundo_fim_jogo.des_text('You Win',203,260, 'white','100px Times')
                botaoReiniciar.style.display = "block"; // Mostra o botão de reiniciar                
                botaoReiniciar.style.margin = "auto"
            }
        }            
            else if (jogar === false){
                bg7.des_obj()
                texto_game_over.des_text('Game Over',143,263, 'black','102px Times') 
                fundo_game_over.des_text('Game Over',140,260, 'white','100px Times')
            
    }

}
    
    
    function atualiza(){
        robb.move()
        lacaio.move_lacaio()
        radioativo.move_radio()
        urso.move_urso()
        planta.move_planta()
        energia.move_energia()
        robb.anim('robb')
        earth.move(-500,800)
        game_over()

        if(robb.municao > 0){
            dar_tiro = true
        }else{
            robb.municao = 0
            dar_tiro = false
        }
        
        if(robb.pts >= 10 && !ursoDesenhado){
            urso.x = 770;
            urso.y = Math.random() * (370 - 0)
            ursoDesenhado = true;
            fase = 2;
        }
        if(robb.pts >= 20 && !radioativoDesenhado) {
            radioativo.x = 770; 
            radioativo.y = Math.random() * (370 - 0)
            radioativoDesenhado = true;
            fase = 3;
        }
        if(robb.pts >= 30){
            fase = 4;
        }
        
        grupoTiros.forEach((tiro)=>{
            tiro.move_tiro()
            if(tiro.y <= -50 || !dar_tiro){
                grupoTiros.splice(tiro[0],1)
            }
            if(dar_tiro && verificarColisaoTiroLacaio(tiro, lacaio)){
                lacaio.morrer()
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                robb.pts += 1
            }
            if(dar_tiro && verificarColisaoTiroLacaio(tiro, urso)){
                urso.morrer()
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                robb.pts += 1
            }
            if(dar_tiro && verificarColisaoTiroLacaio(tiro, radioativo)){
                radioativo.morrer()
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1)
                robb.pts += 1
            }
            if(tiro.y <= -50){
                grupoTiros.splice(grupoTiros.indexOf(tiro), 1);
            }
        })
        colisao()
        game_over()
       }

    function main(){
        des.clearRect(0,0,des.width,des.height)
        desenha()
        atualiza()
        requestAnimationFrame(main)
    }
    main()


    