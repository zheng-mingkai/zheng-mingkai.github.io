// 导入 data 对象
import { data } from './data.js';

let map = [];
let stepsNum = 0;
let steps = [];

let currentX, currentY;
let isGameStarted = false;
let stepIndex = 0;
let level = 0;
// 检查是否有自定义地图
const customMapData = localStorage.getItem('customMap');
if (customMapData) {
    const customMap = JSON.parse(customMapData);
    data.push(customMap);
}

function updateStepsDisplay() {
    const circles = document.querySelectorAll('.circle');
    circles.forEach((circle, index) => {
        circle.textContent = steps[index] || '';
    });
}
function selectLevel(event) {
    level = event.target.value;
    init();
}

function startGame() {
    if (steps.length === 0) {
        alert('请先输入移动步骤');
        return;
    }
    isGameStarted = true;
    const currentCell = document.querySelector(`.row:nth-child(${currentY + 1}) .cell:nth-child(${currentX + 1})`);
    currentCell.style.backgroundColor = 'black';
    move();
}

function move() {
    if (stepIndex >= steps.length) {
        alert('游戏失败，步骤用完还未到达出口');
        return;
    }
    const direction = steps[stepIndex];
    let newX = currentX;
    let newY = currentY;

    switch (direction) {
        case '↑':
            newY--;
            break;
        case '↓':
            newY++;
            break;
        case '←':
            newX--;
            break;
        case '→':
            newX++;
            break;
    }

    // 检查是否超出边界或遇到不可移动位置
    if (newX < 0 || newX >= map[0].length || newY < 0 || newY >= map.length || map[newY][newX] === -1) {
        stepIndex++;
        // 递归调用 move 尝试下一个方向
        move();
        return;
    }

    const currentCell = document.querySelector(`.row:nth-child(${currentY + 1}) .cell:nth-child(${currentX + 1})`);
    const newCell = document.querySelector(`.row:nth-child(${newY + 1}) .cell:nth-child(${newX + 1})`);

    currentCell.style.backgroundColor = getOriginalColor(map[currentY][currentX]);
    newCell.style.backgroundColor = 'black';

    currentX = newX;
    currentY = newY;

    // 先更新位置和颜色，再判断是否到达出口
    if (map[currentY][currentX] === -9) {
        setTimeout(() => {
            alert('游戏成功，到达出口');
            // 自动下一关
            const currentLevel = document.getElementById('level').value;
            const nextLevel = parseInt(currentLevel) + 1;
            if (nextLevel < data.length) {
                document.getElementById('level').value = nextLevel;
                selectLevel({ target: document.getElementById('level') });
            } else {
                alert('恭喜你，通关了！');
            }
            // 清空步骤
            init();
            isGameStarted = false;
        }, 500); // 等待 500 毫秒，确保视觉上角色覆盖出口
        return;
    }

    // 继续使用当前方向移动
    setTimeout(move, 500);
}

function init() {
    steps = [];
    stepIndex = 0;
    isGameStarted = false;
    map = data[level].map;
    stepsNum = data[level].stepsNum;
    const gameDiv = document.getElementById('game');
    gameDiv.innerHTML = '';

    // 初始化游戏格子
    for (let i = 0; i < map.length; i++) {
        const rowDiv = document.createElement('div');
        rowDiv.classList.add('row');

        for (let j = 0; j < map[i].length; j++) {
            const cellDiv = document.createElement('div');
            cellDiv.classList.add('cell');

            // 根据不同的值设置背景颜色
            switch (map[i][j]) {
                case -1:
                    cellDiv.style.backgroundColor = 'gray';
                    break;
                case -2:
                    cellDiv.style.backgroundColor = 'blue';
                    currentX = j;
                    currentY = i;
                    break;
                case -9:
                    cellDiv.style.backgroundColor = 'green';
                    break;
                case 0:
                    cellDiv.style.backgroundColor = 'white';
                    break;
            }

            rowDiv.appendChild(cellDiv);
        }

        gameDiv.appendChild(rowDiv);
    }

    initSteps()
}

function getOriginalColor(value) {
    switch (value) {
        case -1:
            return 'gray';
        case -2:
            return 'blue';
        case -9:
            return 'green';
        case 0:
            return 'white';
    }
}
// 初始化步骤条
function initSteps() {
    // 创建用于显示方向的圆形格子容器
    const stepsContainer = document.getElementById('steps')
    stepsContainer.innerHTML = '';
    // 初始化圆形格子
    for (let i = 0; i < stepsNum; i++) {
        const circle = document.createElement('div');
        circle.classList.add('circle');
        stepsContainer.appendChild(circle);
    }
}
// 更新步骤条
function updateSteps(key) {
    let direction;
    switch (key) {
        case 'ArrowUp':
            direction = '↑';
            break;
        case 'ArrowDown':
            direction = '↓';
            break;
        case 'ArrowLeft':
            direction = '←';
            break;
        case 'ArrowRight':
            direction = '→';
            break;
        default:
            return; // 非上下左右键，忽略
    }

    steps.push(direction);
    updateStepsDisplay();
}

window.onload = async function () {
    // 初始化关卡
    let levelElement = document.getElementById('level');
    for (let i = 0; i < data.length; i++) {
        let option = `<option value="${i}">第${i + 1}关</option>`;
        levelElement.innerHTML += option;
    }
    // 渲染地图
    init();

    // 监听键盘事件
    document.addEventListener('keydown', function (event) {
        if (!isGameStarted) {
            if (event.key === 'Enter') {
                startGame();
            }
            if (steps.length >= stepsNum) {
                return; // 格子数量已满，不再接受新输入
            }
            updateSteps(event.key);
        }
    });
    document.getElementById('level').addEventListener('change', (event) => {
        selectLevel(event)
    });
    document.getElementById('start').addEventListener('click', () => {
        startGame()
    });
    document.getElementById('clearStep').addEventListener('click', () => {
        init()
    });
    document.getElementById('top').addEventListener('click', () => {
        if (!isGameStarted) {
            updateSteps('ArrowUp')
        }
    });
    document.getElementById('left').addEventListener('click', () => {
        if (!isGameStarted) {
            updateSteps('ArrowLeft')
        }
    });
    document.getElementById('right').addEventListener('click', () => {
        if (!isGameStarted) {
            updateSteps('ArrowRight')
        }
    });
    document.getElementById('bottom').addEventListener('click', () => {
        if (!isGameStarted) {
            updateSteps('ArrowDown')
        }
    });
};