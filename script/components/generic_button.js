class GlassButton extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const width = this.getAttribute('width') || '100%';
        const height = this.getAttribute('height') || '100%';
        const border_radius = this.getAttribute('border-radius') || '6px';
        const align = this.getAttribute('content-align') || 'Center';
        const href = this.getAttribute('href') || '#';
        const hrefNewPage = this.getAttribute('new-page') === 'true' || false;

        if (this.hasAttribute('padding')) {
            this.style.padding = this.getAttribute('padding');
        }

        this.shadowRoot.innerHTML = `
            <style>
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
                
                .link-a {
                    color: inherit;
                    text-decoration: none;
                }
            </style>
            <link rel="stylesheet" href="../../css/base.css">
            <a href="${href}" class="link-a">
                <layout-box class="button-container" alignment="${align}">
                    <slot></slot>
                </layout-box>
            </a>
        `;
        //
        // this.addEventListener('click', () => {
        //     window.open(href, hrefNewPage ? '_blank' : '_self')
        // });
    }
}
customElements.define('generic-button', GlassButton);