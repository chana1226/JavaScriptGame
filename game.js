
    let text = document.getElementById('rndrma').innerText;
    alert(text);

    // canvas 기본 설정 (캔버스 DOM 선택 및 2d 설정)
    let canvas = document.getElementById('gameSpace');
    let context = canvas.getContext('2d');

    // 캔버스 재설정
    function clear() {
      context.fillStyle = '#ffffff';
      context.strokestyle = '#614511';
      context.fillRect(0, 0, canvas.width, canvas.height);
      context.strokeRect(0, 0, canvas.width, canvas.height);
    }
    

    // 기본요소 설정
    // 점수 세팅
    let point = 0 ; // 점수 세팅

    let snakeX ; // 뱀 위치 x좌표
    let snakeY ; // 뱀 위치 y좌표

    let foodX; // 먹이 위치 x좌표
    let foodY; // 먹이 위치 y좌표

    let spaceY = canvas.height; // 캔버스 높이, y좌표
    let spaceX = canvas.width; // 캔버스 너비, x좌표
    
    
    let keyX ; // 키보드 방향키 입력값 저장

    let speed; // 이동속도
    let moveIt ; // 지속이동
    let turnS = false ; // 방향 변경. 변경시 true
    let moveX = 20 ; // 가로 이동
    let moveY = 0 ; // 세로 이동

    //



    // 뱀 설정
    let snake = [{x: 200, y: 200}, {x: 180, y: 200}, {x: 160, y: 200}]; // 뱀의 몸 설정 (뱀의 길이 : 3)
                                                    // 뱀의 몸 길이 표시이므로 y좌표 고정
    let snakeColor = '#b8860b'; // 뱀 색 설정
    let lineColor = '#696969' ; // 뱀 선 색 설정
    let foodColor = '#8b0000'; // 음식 색 설정
    let foodLColor = '#614511'; // 음식 선 색 설정

    // 캔버스에 뱀 표시 + 몸의 모양이 되는 사각형 그리기
    //setSnake(); // 게임 실행 위한 뱀

    function snakeBodyParts(snakeParts) { // 뱀의 몸 디테일
        context.fillStyle = snakeColor ; // 뱀의 몸 색
        context.strokeStyle = foodColor ; // 뱀의 몸 선색
        context.fillRect(snakeParts.x, snakeParts.y, 15, 15);
        context.strokeRect(snakeParts.x, snakeParts.y, 15, 15);
    }

    function setSnake() { // 캔버스에 뱀 그림
        snake.forEach(snakeBodyParts);
    }

    
    // 게임 실행
    foodSet(); // 먹이 배치
    start();



    // 뱀 움직이기
    // 먹이를 먹을 경우 몸이 한 칸 늘어남
    // (이때, 움직이기 위해 머리 추가하고 맨 끝칸 지우고, 머리 추가하고, 맨 끝칸 지우고 하는 과정은 먹이 안 먹었을 때만,
    // 먹었을 때는 오히려 늘려야 하므로 제거하면 안 됨.)
    function move() {
        let head = {x: snake[0].x + moveX, y: snake[0].y + moveY} ; // 뱀 머리 설정
        snake.unshift(head) ; // 뱀의 몸 배열 맨 앞에 뱀 머리 추가
        let eatFull = snake[0].x === foodX && snake[0].y === foodY ;

        if (eatFull) { // 뱀의 머리가 음식에 닿았을 경우,
            point += 100; // 점수 100점씩
            document.getElementById('scoreN').innerHTML = point ; // 화면에 점수 입력
            foodSet(); // 새로운 좌표에 음식 배치
        } else {
            snake.pop(); // 뱀 몸 마지막 요소 삭제
        }
    }


    //


    // 키보드 입력 이벤트
    document.addEventListener("keydown", keyDownHandler);
        // keydown만 사용한 이유 : 이벤트 일어나는 순이 keydown이 가장 먼저이며
        // 한 번만 눌러도 뱀이 해당 방향으로 계속 이동하도록 만들고 싶기 때문에 keydown으로만 설정했다.
    
    function keyDownHandler(e) {
        if (e.keyCode == 39 || e.key == "ArrowRight") { // 오른쪽 키의 keycode와 방향이 맞을 경우 true
            keyX = 39;
            //console.log('오른쪽');
        } else if (e.keyCode == 37 || e.key == "ArrowLeft") { // 왼쪽 키의 keycode와 방향이 맞을 경우 true
            keyX = 37;
            //console.log('왼쪽');
        } else if (e.keyCode == 38 || e.key == "ArrowUp") { // 위쪽 키의 keycode와 방향이 맞을 경우 true
            keyX = 38;
            //console.log('위쪽');
        } else if (e.keyCode == 40 || e.key == "ArrowDown") { // 아래쪽 키의 keycode와 방향이 맞을 경우 true
            keyX = 40;
            //console.log('아래쪽');
        }

        direction(keyX);
    }


    // 키보드 입력 방향으로 움직이기
    function direction(keyX) {

        if (turnS) return ; // 방향 변경 값 넘김
        turnS = true ; // 방향 변경됨.

        let right = moveX === 20 ; // 오른쪽으로 20
        let left = moveX === -20 ; // 왼쪽으로 -20
        let up = moveY === -20 ; // 위쪽으로 -20
        let down = moveY === 20 ; // 아래쪽으로 20

        if (keyX === 39 && !left) { // 누른 키가 오른쪽이고 왼쪽 이동이 아닐 경우,
            moveX = 20;
            moveY = 0 ;
        } else if (keyX === 37 && !right) { // 누른 키가 왼쪽이고 오른쪽 이동이 아닐 경우,
            moveX = -20 ;
            moveY = 0;
        } else if (keyX === 38 && !down) { // 누른 키가 위쪽이고 아래쪽 이동이 아닐 경우,
            moveX = 0;
            moveY = -20 ;
        } else if (keyX === 40 && !up) { // 누른 키가 아래쪽이고 위쪽 이동이 아닐 경우,
            moveX = 0;
            moveY = 20 ;
        }
    }



    // 게임 진행을 위한 함수 정의
    function start() {

        if (gameOver()) {
            return ;
        }

        turnS = false ;

        setTimeout(function onTick() {
            clear();
            //backPic();
            foodDe();
            setSnake();
            move();

        start() ; // 반복
        }, 250)
    }



    // 게임 종료 조건
        // 1. 자신의 몸(뱀 길이의 일부)과 머리가 충돌
        // 2. 벽에 머리 충돌
    function gameOver() {
        // 1번 조건
        for (let i = 3 ; i < snake.length ; i++) {
            // 가로와 세로 둘 다 머리인 snake[0]과 충돌 체크
            if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) return true
        }

        // 2번 조건
        let rightW_bump = snake[0].x > spaceX - 20 ; // 뱀의 머리가 수평 이동할 때, 오른쪽 벽에 충돌할 경우
        let leftW_bump = snake[0].x < 0 ; // 뱀의 머리가 수평 이동할 때, 왼쪽 벽에 충돌할 경우
        let upW_bump = snake[0].y < 0 ; // 뱀의 머리가 수직 이동할 때, 위쪽 벽에 충돌할 경우
        let downW_bump = snake[0].y > spaceY - 20 ; // 뱀의 머리가 수직 이동할 때, 아래쪽 벽에 충돌할 경우

        return rightW_bump || leftW_bump || upW_bump || downW_bump
    }



    // 뱀 먹이 관련
    
    // 무작위로 좌표에 입력할 값을 생성하기 위한 함수 -> 캔버스 안에서 먹이를 무작위로 생성할 예정
    function randomSet(min, max) {
        return Math.round((Math.random() * (max-min)+min) / 20) * 20;
    }

    // 뱀 먹이 위치 선정 => 조건 1) 뱀의 현재 위치에 음식이 있으면 안 됨
    function foodSet(){
        foodX = randomSet(0, spaceX - 20) ; // 음식 x좌표 랜덤 생성
        foodY = randomSet(0, spaceY - 20) ; // 음식 y좌표 랜덤 생성

        // 조건 1
        // (1) 뱀의 몸이 먹이와 닿았을 때, 즉 뱀의 현재 위치에 먹이가 있을 경우 (2) 음식 다시 생성
        snake.forEach(function snakeFull(bodyP) {
            let eatFood = bodyP.x == foodX && bodyP.y == foodY; // (1)
            context.strokeStyle = color
            if (eatFood) foodSet(); // (2)
        }) ;
    }
    
    // 캔버스에 음식 디자인
    function foodDe() {
        context.fillStyle = foodColor ;
        context.strokestyle = foodLColor ;
        context.fillRect(foodX, foodY, 15, 15) ;
        context.strokeRect(foodX, foodY, 15, 15);
    }
