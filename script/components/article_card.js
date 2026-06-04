class ArticleCard extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' })
    }

    connectedCallback() {
        const imgSrc = this.getAttribute('image') || 'https://i2.hdslb.com/bfs/article/96d2b3d2a72e6497a011c885ab9245c51507ce18.png@470w_628h_1c.avif';
        const titleText = this.getAttribute('title') || 'No Titled';
        const descText = this.getAttribute('desc') || 'No Information';
        const dateText = this.getAttribute('date') || 'Unknown Date';

        this.shadowRoot.innerHTML = `
            <link rel="stylesheet" href="../../css/text-style.css">
            <link rel="stylesheet" href="../../css/base.css">
            <link rel="stylesheet" href="../../css/modifier.css">
            <style>
                .card-image-wrapper {
                aspect-ratio: 3/4; 
    width: 72px;
    flex-shrink: 0;
                    overflow: hidden;
                    border-radius: 6px;
                    border: 1px solid white;
                    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
                }
                .card-image {
                    width: 100%;
    height: 100%;
                    object-fit: cover; 
    object-position: center;
                    display: block;
                }
            </style>
            <generic-button width="250px" height="auto" content-align="TopCenter">
                <layout-row class="fill-max-size" padding="12px">
                
                    <layout-box class="card-image-wrapper">
                        <img src="${imgSrc}" alt="${titleText}" class="card-image"/>
                    </layout-box>
                    
                    <horizontal-spacer size="8px"></horizontal-spacer>
                    
                    <layout-column vertical-arrangement="SpaceBetween">
                        <p class="section-title" style="line-height: 20px">${titleText}</p>
                        <p class="prompt-text-small">${descText}</p>
                        <p class="prompt-text-small">${dateText}</p>
                    </layout-column>
                </layout-row>
            </generic-button>
        `;
    }
}

customElements.define('article-card', ArticleCard);