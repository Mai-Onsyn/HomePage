class GlassButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const width = this.getAttribute('width') || '100%';
        const height = this.getAttribute('height') || '100%';
        const border_radius = this.getAttribute('border-radius') || '6px';
        const color = this.getAttribute('color') || '#000000';
        const align = this.getAttribute('content-align') || 'Center';

        if (this.hasAttribute('padding')) {
            this.style.padding = this.getAttribute('padding');
        }

        this.shadowRoot.innerHTML = `
            <style>
                /*:host {
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
                }*/

                ::slotted(object), ::slotted(img), ::slotted(svg) {
                    display: block;
                    pointer-events: none;
                }
                .button-container {
                    cursor: pointer;
                    user-select: none;
                    background-color: transparent;
                    border-radius: ${border_radius};
                    width: ${width};
                    height: ${height};
                    transition: background-color 0.4s;
                }
                
                .button-container:hover {
                    background-color: rgb(128 128 128 / 0.5);
                }
                .button-container:active {
                    background-color: rgb(128 128 128 / 0.7);
                }
            </style>
            <link rel="stylesheet" href="../../css/base.css">
            <layout-box class="button-container" alignment="${align}">
                <slot></slot>
            </layout-box>
<!--            <button><slot></slot></button>-->
        `;
    }
}
customElements.define('generic-button', GlassButton);