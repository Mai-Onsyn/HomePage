class GlassButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const width = this.getAttribute('width') || '48px';
        const height = this.getAttribute('height') || '36px';
        const border_radius = this.getAttribute('border-radius' || '6px')
        const color = this.getAttribute('color') || '#000000';

        // 2. 将样式和结构完全封装在 Shadow 内
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                }
                button {
                    position: relative;
                    overflow: hidden;
                    font-size: 12pt;
                    font-weight: 500;
                    width: ${width};
                    height: ${height};
                    color: ${color};
                    background-color: rgb(255 255 255 / 0);
                    border: none;
                    border-radius: ${border_radius};
                    cursor: pointer;
                    outline: none;
                    user-select: none;
                    transition: background-color 0.4s;
                    
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
                button:hover {
                    background-color: rgb(128 128 128 / 0.5);
                }
                button:active {
                    background-color: rgb(128 128 128 / 0.7);
                }
                
                ::slotted(object), ::slotted(img), ::slotted(svg) {
            display: block;
            pointer-events: none; /* 防止 object 劫持按钮的点击/Hover事件 */
        }
            </style>
            <button><slot></slot></button>
        `;
    }
}
customElements.define('generic-button', GlassButton);