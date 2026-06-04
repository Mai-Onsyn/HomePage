class ProgressBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const color = this.getAttribute('color') || 'blue';
        const percent = this.getAttribute('percent') || '0%';

        this.shadowRoot.innerHTML = `
            <style>
                .track {
                    width: 100%;
                    height: 100%;
                    
                    background: rgba(255, 255, 255, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 100000px;
                    overflow: hidden;
                    position: relative;
                }
                
                .thumb {
                    display: block;
                    height: 100%;
                    width: ${percent};       
                    
                    background: ${color};
                    border-radius: 100000px;
                    transition: width 0.4s cubic-bezier(0.25, 1, 0.5, 1); 
                    
                    box-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
                }
            </style>
            <div class="track">
                <div class="thumb"></div>
            </div>
        `;
    }
}

customElements.define('progress-bar', ProgressBar);