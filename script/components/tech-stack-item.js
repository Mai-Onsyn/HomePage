class TechStackItem extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const iconUrl = this.getAttribute('icon') || '#';
        const name = this.getAttribute('name') || 'tech'

        this.shadowRoot.innerHTML = `
        <link rel="stylesheet" href="../../css/base.css">
        <style>
            .tech-item-container {
                border-radius: 4px;
                padding: 8px;
                /*border: 1px solid #3b6ef330;*/
                /*background-color: #ffffff40;*/
            }
            
            .tech-item-text {
                color: #262626;
                font-size: 12px;
                font-weight: bold;
            }
        </style>
        <div class="tech-item-container genric-card">
            <layout-row vertical-alignment="Center" gap="8px">
                <object data="${iconUrl}" type="image/svg+xml" width="20" height="20"></object>
                <span class="tech-item-text">${name}</span>
            </layout-row>
        </div>
        `;
    }
}
customElements.define('tech-stack-item', TechStackItem);