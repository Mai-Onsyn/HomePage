class WorkCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        const imgSrc = this.getAttribute('image') || '';
        const titleText = this.getAttribute('title') || 'No Titled';
        const descText = this.getAttribute('desc') || 'No Information';

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../../css/text-style.css">
            <link rel="stylesheet" href="../../css/base.css">
            <style>
                .card-image-wrapper {
                    width: 100%;
                    aspect-ratio: 16/9;
                    overflow: hidden;
                    border-radius: 6px;
                    border: 1px solid white;
                    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
                }
                .card-image {
                    width: 100%;
                    aspect-ratio: 16/9;
                    display: block;
                    object-fit: cover;
                    object-position: center;
                }
            </style>
            <generic-button width="240px" height="100%" content-align="TopCenter">
                <layout-column vertical-arrangement="SpaceBetween" horizontal-alignment="Start" padding="4px">
                
                    <layout-box class="card-image-wrapper">
                        <img src="${imgSrc}" alt="${titleText}" class="card-image"/>
                    </layout-box>
                    <p class="section-title" style="line-height: 40px">${titleText}</p>
                    <p class="prompt-text-small">${descText}</p>
                </layout-column>
            </generic-button>
        `;
    }
}

customElements.define('work-card', WorkCard);