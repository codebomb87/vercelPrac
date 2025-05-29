// 전역 변수
let currentN = 100;
let maxY = 10000;
let maxX = 1000;
let isLogScale = true;
let visibleComplexities = new Set(['O(1)', 'O(log n)', 'O(n)', 'O(n log n)', 'O(n²)', 'O(2ⁿ)']);

// 복잡도 함수들
const complexities = [
    { name: 'O(1)', color: '#4ade80', func: (n) => 1 },
    { name: 'O(log n)', color: '#22d3ee', func: (n) => Math.log2(Math.max(n, 1)) },
    { name: 'O(n)', color: '#fbbf24', func: (n) => n },
    { name: 'O(n log n)', color: '#fb923c', func: (n) => n * Math.log2(Math.max(n, 1)) },
    { name: 'O(n²)', color: '#f87171', func: (n) => n * n },
    { name: 'O(2ⁿ)', color: '#a78bfa', func: (n) => Math.pow(2, Math.min(n, 30)) }
]; 