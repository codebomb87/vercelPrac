// 숫자 포맷팅
function formatNumber(num) {
    if (num >= 1e9) return (num / 1e9).toFixed(1) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(1) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(1) + 'K';
    return num.toLocaleString();
}

// 축 눈금 값 계산
function calculateTicks(min, max, count = 5) {
    const range = max - min;
    const step = range / count;
    const ticks = [];
    for (let i = 0; i <= count; i++) {
        ticks.push(min + step * i);
    }
    return ticks;
}

// 로그 스케일 눈금 계산
function calculateLogTicks(maxValue) {
    const ticks = [];
    const maxLog = Math.log10(maxValue);
    for (let i = 0; i <= Math.ceil(maxLog); i++) {
        const value = Math.pow(10, i);
        if (value <= maxValue) {
            ticks.push(value);
        }
    }
    return ticks;
}

// 현재 계산 결과 업데이트
function updateCalculations() {
    const calcResults = document.getElementById('calcResults');
    const currentNSpan = document.getElementById('currentN');
    
    currentNSpan.textContent = currentN.toLocaleString();
    calcResults.innerHTML = '';
    
    complexities.forEach(complexity => {
        if (!visibleComplexities.has(complexity.name)) return;
        
        const value = complexity.func(currentN);
        const item = document.createElement('div');
        item.className = 'calc-item';
        
        const complexitySpan = document.createElement('span');
        complexitySpan.className = 'calc-complexity';
        complexitySpan.textContent = complexity.name;
        
        const valueSpan = document.createElement('span');
        valueSpan.className = 'calc-value';
        valueSpan.style.color = complexity.color;
        valueSpan.textContent = formatNumber(value);
        
        item.appendChild(complexitySpan);
        item.appendChild(valueSpan);
        calcResults.appendChild(item);
    });
} 