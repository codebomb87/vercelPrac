// 이벤트 리스너와 제어 관련 함수들

// DOM 요소들
let nSlider, nValue, xMaxSlider, xMaxValue, yMaxSlider, yMaxValue;
let logScaleBtn, linearScaleBtn;

// 초기화 함수
function initializeControls() {
    // DOM 요소 참조 가져오기
    nSlider = document.getElementById('nSlider');
    nValue = document.getElementById('nValue');
    xMaxSlider = document.getElementById('xMaxSlider');
    xMaxValue = document.getElementById('xMaxValue');
    yMaxSlider = document.getElementById('yMaxSlider');
    yMaxValue = document.getElementById('yMaxValue');
    logScaleBtn = document.getElementById('logScale');
    linearScaleBtn = document.getElementById('linearScale');

    // 슬라이더 이벤트
    document.getElementById('nSlider').addEventListener('input', handleNSliderChange);
    document.getElementById('xMaxSlider').addEventListener('input', handleXMaxSliderChange);
    document.getElementById('yMaxSlider').addEventListener('input', handleYMaxSliderChange);
    
    // 스케일 버튼 이벤트
    document.getElementById('logScale').addEventListener('click', handleLogScaleClick);
    document.getElementById('linearScale').addEventListener('click', handleLinearScaleClick);
    
    // 범례 클릭 이벤트
    document.querySelectorAll('.legend-item').forEach(item => {
        item.addEventListener('click', handleLegendClick);
    });
}

// 초기 설정 함수
function initializeSettings() {
    // 초기 로그 스케일 설정에 따른 Y축 슬라이더 상태 설정
    if (isLogScale) {
        yMaxSlider.disabled = true;
        yMaxSlider.style.opacity = '0.5';
        yMaxSlider.parentElement.style.opacity = '0.5';
    }
}

// 슬라이더 이벤트 핸들러
function handleNSliderChange() {
    currentN = parseInt(document.getElementById('nSlider').value);
    document.getElementById('nValue').textContent = currentN.toLocaleString();
    drawChart();
    updateCalculations();
}

function handleXMaxSliderChange() {
    const xMaxSlider = document.getElementById('xMaxSlider');
    const nSlider = document.getElementById('nSlider');
    const nValue = document.getElementById('nValue');
    
    maxX = parseInt(xMaxSlider.value);
    document.getElementById('xMaxValue').textContent = maxX.toLocaleString();
    
    // n 슬라이더의 최대값을 X축 범위에 맞춰 조정
    nSlider.max = maxX;
    if (currentN > maxX) {
        currentN = maxX;
        nSlider.value = currentN;
        nValue.textContent = currentN.toLocaleString();
    }
    
    // 범위 정보 업데이트
    const nRangeInfo = nSlider.parentElement.querySelector('.range-info');
    nRangeInfo.textContent = `1 ~ ${formatNumber(maxX)}`;
    
    drawChart();
    updateCalculations();
}

function handleYMaxSliderChange() {
    maxY = parseInt(document.getElementById('yMaxSlider').value);
    document.getElementById('yMaxValue').textContent = maxY.toLocaleString();
    drawChart();
}

// 스케일 모드 변경
function handleLogScaleClick() {
    const logScaleBtn = document.getElementById('logScale');
    const linearScaleBtn = document.getElementById('linearScale');
    const yMaxSlider = document.getElementById('yMaxSlider');
    
    isLogScale = true;
    logScaleBtn.classList.add('active');
    linearScaleBtn.classList.remove('active');
    
    // 로그 스케일에서는 Y축 슬라이더 비활성화
    yMaxSlider.disabled = true;
    yMaxSlider.style.opacity = '0.5';
    yMaxSlider.parentElement.style.opacity = '0.5';
    
    drawChart();
}

function handleLinearScaleClick() {
    const logScaleBtn = document.getElementById('logScale');
    const linearScaleBtn = document.getElementById('linearScale');
    const yMaxSlider = document.getElementById('yMaxSlider');
    
    isLogScale = false;
    linearScaleBtn.classList.add('active');
    logScaleBtn.classList.remove('active');
    
    // 선형 스케일에서는 Y축 슬라이더 활성화
    yMaxSlider.disabled = false;
    yMaxSlider.style.opacity = '1';
    yMaxSlider.parentElement.style.opacity = '1';
    
    drawChart();
}

// 범례 클릭 이벤트
function handleLegendClick(event) {
    const complexity = event.currentTarget.dataset.complexity;
    if (visibleComplexities.has(complexity)) {
        visibleComplexities.delete(complexity);
        event.currentTarget.style.opacity = '0.3';
    } else {
        visibleComplexities.add(complexity);
        event.currentTarget.style.opacity = '1';
    }
    drawChart();
    updateCalculations();
} 