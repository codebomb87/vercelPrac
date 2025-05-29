// 앱 초기화 및 메인 제어 로직

// 앱 초기화 함수
function initializeApp() {
    // 초기 로그 스케일 설정에 따른 Y축 슬라이더 상태 설정
    const yMaxSlider = document.getElementById('yMaxSlider');
    if (isLogScale) {
        yMaxSlider.disabled = true;
        yMaxSlider.style.opacity = '0.5';
        yMaxSlider.parentElement.style.opacity = '0.5';
    }
    
    // 컨트롤 초기화
    initializeControls();
    
    // 초기 설정 적용
    initializeSettings();
    
    // 차트 그리기
    drawChart();
    
    // 계산 결과 업데이트
    updateCalculations();
}

// 윈도우 리사이즈 핸들러
function handleResize() {
    drawChart();
}

// 페이지 로드 완료 시 초기화
window.addEventListener('load', initializeApp);

// 윈도우 리사이즈 이벤트
window.addEventListener('resize', handleResize); 