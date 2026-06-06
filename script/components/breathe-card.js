class BreatheCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {

        const disableHover = this.getAttribute('static') === "true";
        const largeMove = parseInt(this.getAttribute('strength')) || 6;
        const randomAnimate = this.getAttribute('random') === "true";
        const smallMove = largeMove / 2;

        const hoverStyles = disableHover ? '' : `
            :host(:hover) {
                animation-play-state: paused;
            }
            :host(:hover) .container {
                transform: scale(1.04) translateY(-5px);
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
            }
            :host(:active) .container {
                transform: scale(1.015) translateY(-2px);
                box-shadow: 0 4px 4px rgba(0, 0, 0, 0.2);
            }
        `;

        const randomDuration = `${(Math.random() * 3 + 5).toFixed(2) * (randomAnimate ? 3 : 1)}s`;
        const randomDelay = `${-(Math.random() * 5).toFixed(2)}s`;

        const frames = this.generateRandomKeyframes(largeMove);

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block !important; 
                    width: max-content;
                    height: max-content;
                    max-width: 100%;
                    
                    overflow: visible; 
                    
                    --breathe-duration: ${randomDuration};
                    --breathe-delay: ${randomDelay};
                
                    will-change: transform;
                
                    animation: floatAndBreathe
                               var(--breathe-duration)
                               ease-in-out
                               var(--breathe-delay)
                               infinite
                               alternate;
                }

                .container {
                    display: inline-block;
                    box-sizing: border-box;
                    border-radius: 6px;
                    
                    transition: transform 0.4s cubic-bezier(0.25, 1, 0.5, 1),
                                box-shadow 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                }
                
                ${hoverStyles}
                
                ${randomAnimate ? frames : `
                @keyframes floatAndBreathe {
                    0% {
                        transform: translate(0, 0) scale(1);
                    }
                    25% {
                        transform: translate(${largeMove}px, -${largeMove}px) scale(1.015);
                    }
                    50% {
                        transform: translate(-${smallMove}px, ${smallMove}px) scale(1.01);
                    }
                    75% {
                        transform: translate(${largeMove}px, ${smallMove}px) scale(0.99);
                    }
                    100% {
                        transform: translate(0, 0) scale(1);
                    }
                }`}
            </style>
            
            <div class="container">
                <slot></slot>
            </div>
        `;
    }

    generateRandomKeyframes(strength = 10) {
        // 关键帧步长，步长越小（帧数越多），运动周期越长、越丰富。5% 的步长意味着有 21 个控制点
        const step = 5;
        let keyframesCSS = `@keyframes floatAndBreathe {\n`;

        // 随机生成几个微调的频率因子，确保每次生成的曲线都不一样
        const freqX1 = 1 + Math.random() * 0.5;
        const freqX2 = 2 + Math.random() * 1.0;
        const freqY1 = 1 + Math.random() * 0.5;
        const freqY2 = 2 + Math.random() * 1.0;

        // 随机生成相位差，打破单纯正弦波的对称感
        const phaseX = Math.random() * Math.PI;
        const phaseY = Math.random() * Math.PI;

        for (let i = 0; i <= 100; i += step) {
            let x = 0;
            let y = 0;
            let scale = 1;

            // 完美闭合逻辑：第一帧(0%)和最后一帧(100%)必须死死钉在原点
            if (i > 0 && i < 100) {
                // 将百分比转化为弧度 (0 到 2π)
                const angle = (i / 100) * Math.PI * 2;

                /* 利用双频叠加生成类似柏林噪声的平滑曲线：
                  Math.sin(angle * freq) 确保了 0% 和 100% 时值一定为 0（完美闭合）
                  叠加第二层高频 Math.cos 增加不规则的细节
                */
                x = (Math.sin(angle * freqX1) * 0.7 + Math.cos(angle * freqX2 + phaseX) * 0.3) * strength;
                y = (Math.sin(angle * freqY1) * 0.7 + Math.sin(angle * freqY2 + phaseY) * 0.3) * strength;

                // 呼吸效应（缩放）：控制在 0.97 到 1.03 之间微调，同样在首尾闭合
                scale = 1 + (Math.sin(angle * 2 + phaseX) * 0.02);
            }

            // 四舍五入保留两位小数，保持 CSS 干净
            x = parseFloat(x.toFixed(2));
            y = parseFloat(y.toFixed(2));
            scale = parseFloat(scale.toFixed(4));

            keyframesCSS += `    ${i}% { transform: translate(${x}px, ${y}px) scale(${scale}); }\n`;
        }

        keyframesCSS += `}`;
        return keyframesCSS;
    }
}

customElements.define('breathe-card', BreatheCard);