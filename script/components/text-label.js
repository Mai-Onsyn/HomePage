class TextLabel extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const text = this.getAttribute("text") || '';
        // const size = this.getAttribute("size") || '21px';

        this.innerHTML = `
            <style>
                .label-container {
                    display: inline-block;
                    padding-left: 8px;
                    padding-right: 8px;
                    padding-bottom: 4px;
                    border-radius: 8px;
                    background-color: #3b6ef320;
                }
                
                .label-text {
                    font-size: 12px;
                    color: #3b6ef3;
                    line-height: 12px;
                }
            </style>
            <div class="label-container">
                <span class="label-text">${text}</span>
            </div>
        `;
    }
}

customElements.define('text-label', TextLabel);