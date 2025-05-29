// 차트 그리기
function drawChart() {
    const svg = document.getElementById('complexityChart');
    const width = svg.clientWidth || 800;
    const height = svg.clientHeight || 500;
    const margin = { top: 30, right: 100, bottom: 80, left: 100 };
    const chartWidth = width - margin.left - margin.right;
    const chartHeight = height - margin.top - margin.bottom;
    
    svg.setAttribute('viewBox', `0 0 ${width} ${height}`);
    svg.innerHTML = '';
    
    // 배경 그라디언트
    const defs = document.createElementNS('http://www.w3.org/2000/svg', 'defs');
    const gradient = document.createElementNS('http://www.w3.org/2000/svg', 'linearGradient');
    gradient.setAttribute('id', 'bgGradient');
    gradient.setAttribute('x1', '0%');
    gradient.setAttribute('y1', '0%');
    gradient.setAttribute('x2', '100%');
    gradient.setAttribute('y2', '100%');
    
    const stop1 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop1.setAttribute('offset', '0%');
    stop1.setAttribute('stop-color', 'rgba(102, 126, 234, 0.1)');
    
    const stop2 = document.createElementNS('http://www.w3.org/2000/svg', 'stop');
    stop2.setAttribute('offset', '100%');
    stop2.setAttribute('stop-color', 'rgba(118, 75, 162, 0.1)');
    
    gradient.appendChild(stop1);
    gradient.appendChild(stop2);
    defs.appendChild(gradient);
    svg.appendChild(defs);
    
    // 배경
    const bg = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
    bg.setAttribute('width', width);
    bg.setAttribute('height', height);
    bg.setAttribute('fill', 'url(#bgGradient)');
    svg.appendChild(bg);
    
    // 복잡도 곡선들의 최대값 계산
    const visibleComplexitiesArray = complexities.filter(c => visibleComplexities.has(c.name));
    const currentMaxY = isLogScale ? 
        Math.max(...visibleComplexitiesArray.map(c => Math.log10(Math.max(c.func(maxX), 1)))) :
        Math.min(maxY, Math.max(...visibleComplexitiesArray.map(c => c.func(maxX))));
    
    // 그리드 라인과 눈금
    const gridGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    gridGroup.setAttribute('opacity', '0.1');
    
    // X축 눈금
    const xTicks = calculateTicks(0, maxX, 10);
    xTicks.forEach(tick => {
        const x = margin.left + (tick / maxX) * chartWidth;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', x);
        line.setAttribute('y1', margin.top);
        line.setAttribute('x2', x);
        line.setAttribute('y2', height - margin.bottom);
        line.setAttribute('stroke', '#ffffff');
        line.setAttribute('stroke-width', '1');
        gridGroup.appendChild(line);
    });
    
    // Y축 눈금
    const yTicks = isLogScale ? 
        calculateLogTicks(Math.pow(10, currentMaxY)) :
        calculateTicks(0, currentMaxY, 10);
    
    yTicks.forEach(tick => {
        const yValue = isLogScale ? Math.log10(Math.max(tick, 1)) : tick;
        const y = height - margin.bottom - (yValue / currentMaxY) * chartHeight;
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', margin.left);
        line.setAttribute('y1', y);
        line.setAttribute('x2', width - margin.right);
        line.setAttribute('y2', y);
        line.setAttribute('stroke', '#ffffff');
        line.setAttribute('stroke-width', '1');
        gridGroup.appendChild(line);
    });
    
    svg.appendChild(gridGroup);
    
    // 축
    const axisGroup = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    
    const xAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    xAxis.setAttribute('x1', margin.left);
    xAxis.setAttribute('y1', height - margin.bottom);
    xAxis.setAttribute('x2', width - margin.right);
    xAxis.setAttribute('y2', height - margin.bottom);
    xAxis.setAttribute('stroke', '#ffffff');
    xAxis.setAttribute('stroke-width', '2');
    axisGroup.appendChild(xAxis);
    
    const yAxis = document.createElementNS('http://www.w3.org/2000/svg', 'line');
    yAxis.setAttribute('x1', margin.left);
    yAxis.setAttribute('y1', margin.top);
    yAxis.setAttribute('x2', margin.left);
    yAxis.setAttribute('y2', height - margin.bottom);
    yAxis.setAttribute('stroke', '#ffffff');
    yAxis.setAttribute('stroke-width', '2');
    axisGroup.appendChild(yAxis);
    
    svg.appendChild(axisGroup);
    
    // X축 눈금 레이블
    const xTickLabels = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    xTicks.forEach(tick => {
        const x = margin.left + (tick / maxX) * chartWidth;
        
        // 눈금 표시
        const tickMark = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tickMark.setAttribute('x1', x);
        tickMark.setAttribute('y1', height - margin.bottom);
        tickMark.setAttribute('x2', x);
        tickMark.setAttribute('y2', height - margin.bottom + 5);
        tickMark.setAttribute('stroke', '#ffffff');
        tickMark.setAttribute('stroke-width', '2');
        xTickLabels.appendChild(tickMark);
        
        // 레이블
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', x);
        label.setAttribute('y', height - margin.bottom + 20);
        label.setAttribute('text-anchor', 'middle');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#a0a0a0');
        label.setAttribute('font-family', 'JetBrains Mono, monospace');
        label.textContent = formatNumber(tick);
        xTickLabels.appendChild(label);
    });
    svg.appendChild(xTickLabels);
    
    // Y축 눈금 레이블
    const yTickLabels = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    yTicks.forEach(tick => {
        const yValue = isLogScale ? Math.log10(Math.max(tick, 1)) : tick;
        const y = height - margin.bottom - (yValue / currentMaxY) * chartHeight;
        
        // 눈금 표시
        const tickMark = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        tickMark.setAttribute('x1', margin.left - 5);
        tickMark.setAttribute('y1', y);
        tickMark.setAttribute('x2', margin.left);
        tickMark.setAttribute('y2', y);
        tickMark.setAttribute('stroke', '#ffffff');
        tickMark.setAttribute('stroke-width', '2');
        yTickLabels.appendChild(tickMark);
        
        // 레이블
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        label.setAttribute('x', margin.left - 10);
        label.setAttribute('y', y + 4);
        label.setAttribute('text-anchor', 'end');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', '#a0a0a0');
        label.setAttribute('font-family', 'JetBrains Mono, monospace');
        label.textContent = formatNumber(tick);
        yTickLabels.appendChild(label);
    });
    svg.appendChild(yTickLabels);
    
    // 축 레이블
    const xAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    xAxisLabel.setAttribute('x', margin.left + chartWidth / 2);
    xAxisLabel.setAttribute('y', height - 20);
    xAxisLabel.setAttribute('text-anchor', 'middle');
    xAxisLabel.setAttribute('font-size', '14');
    xAxisLabel.setAttribute('fill', '#ffffff');
    xAxisLabel.setAttribute('font-weight', 'bold');
    xAxisLabel.textContent = '입력 크기 (n)';
    svg.appendChild(xAxisLabel);
    
    const yAxisLabel = document.createElementNS('http://www.w3.org/2000/svg', 'text');
    yAxisLabel.setAttribute('x', 20);
    yAxisLabel.setAttribute('y', margin.top + chartHeight / 2);
    yAxisLabel.setAttribute('text-anchor', 'middle');
    yAxisLabel.setAttribute('font-size', '14');
    yAxisLabel.setAttribute('fill', '#ffffff');
    yAxisLabel.setAttribute('font-weight', 'bold');
    yAxisLabel.setAttribute('transform', `rotate(-90, 20, ${margin.top + chartHeight / 2})`);
    yAxisLabel.textContent = isLogScale ? '연산 횟수 (log10)' : '연산 횟수';
    svg.appendChild(yAxisLabel);
    
    // 복잡도 곡선들 그리기
    complexities.forEach(complexity => {
        if (!visibleComplexities.has(complexity.name)) return;
        
        const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
        let pathData = '';
        
        const steps = Math.min(200, maxX);
        for (let i = 0; i <= steps; i++) {
            const n = (i / steps) * maxX;
            if (n < 1) continue;
            
            const x = margin.left + (n / maxX) * chartWidth;
            const value = complexity.func(n);
            const yValue = isLogScale ? 
                Math.log10(Math.max(value, 1)) :
                Math.min(value, maxY);
            const y = height - margin.bottom - (yValue / currentMaxY) * chartHeight;
            
            if (pathData === '') {
                pathData += `M ${x} ${y}`;
            } else {
                pathData += ` L ${x} ${y}`;
            }
        }
        
        path.setAttribute('d', pathData);
        path.setAttribute('stroke', complexity.color);
        path.setAttribute('stroke-width', '3');
        path.setAttribute('fill', 'none');
        path.setAttribute('opacity', '0.9');
        svg.appendChild(path);
        
        // 현재 n에서의 점 표시
        if (currentN <= maxX) {
            const currentXPos = margin.left + (currentN / maxX) * chartWidth;
            const currentValue = complexity.func(currentN);
            const currentYValue = isLogScale ? 
                Math.log10(Math.max(currentValue, 1)) :
                Math.min(currentValue, maxY);
            const currentY = height - margin.bottom - (currentYValue / currentMaxY) * chartHeight;
            
            const point = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
            point.setAttribute('cx', currentXPos);
            point.setAttribute('cy', currentY);
            point.setAttribute('r', '6');
            point.setAttribute('fill', complexity.color);
            point.setAttribute('stroke', '#000000');
            point.setAttribute('stroke-width', '2');
            svg.appendChild(point);
        }
        
        // 레이블 (오른쪽 끝에)
        const endValue = complexity.func(maxX);
        const endYValue = isLogScale ? 
            Math.log10(Math.max(endValue, 1)) :
            Math.min(endValue, maxY);
        const endY = height - margin.bottom - (endYValue / currentMaxY) * chartHeight;
        
        const label = document.createElementNS('http://www.w3.org/2000/svg', 'text');
        const labelX = width - margin.right + 10;
        label.setAttribute('x', labelX);
        label.setAttribute('y', endY + 4);
        label.setAttribute('text-anchor', 'start');
        label.setAttribute('font-size', '12');
        label.setAttribute('fill', complexity.color);
        label.setAttribute('font-weight', 'bold');
        label.setAttribute('font-family', 'JetBrains Mono, monospace');
        label.textContent = complexity.name;
        svg.appendChild(label);
    });
} 