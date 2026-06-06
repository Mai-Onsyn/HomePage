class BlogItemCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const imgUrl = this.getAttribute('image') || '#';
        const title = this.getAttribute('title') || 'No Titled';
        const desc = this.getAttribute('desc') || 'No Description';
        const tagStr = this.getAttribute('tags') || '';
        const date = this.getAttribute('date') || '1970-01-01';
        const article = this.getAttribute('article') || '#';

        const tagList = tagStr.split(/;\s+/);
        let tagDOM = "";
        tagList.forEach(tag => {
            tagDOM += `<text-label text="${tag}"></text-label>`;
        })

        this.addEventListener('click', () => {
            window.open(`./markdown.html?path=${article}`, '_blank');
        });

        this.innerHTML = `
            <style>
                .blog-image-wrapper {
                    width: 180px;
                    aspect-ratio: 1.6;
                    overflow: hidden;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
                    flex-shrink: 0;
                }
                .blog-image {
                    width: 100%;
                    aspect-ratio: 1.6;
                    display: block;
                    object-fit: cover;
                    object-position: center;
                }
                
                .body-text-limit {
                    width: 360px;
                    line-height: 14px;
                }
            </style>
            
            <layout-row padding="16px" gap="16px" class="genric-card" vertical-alignment="Center">
                <layout-box class="blog-image-wrapper" alignment="Center">
                    <img src="${imgUrl}" alt="${title}" class="blog-image">
                </layout-box>
                
                <layout-column gap="8px">
                    <span class="section-title">${title}</span>
                    <span class="prompt-text body-text-limit">${desc}</span>
                    <layout-row gap="16px">${tagDOM}</layout-row>
                    <layout-row gap="8px">
                        <object data="../../assets/icon/calendar.svg" type="image/svg+xml" width="16" height="16"></object>
                        <span class="prompt-text-small">${date}</span>
                    </layout-row>
                </layout-column>
                
                <horizontal-spacer weight="1"></horizontal-spacer>
                
                <span style="font-size: 32px; font-weight: lighter">→</span>
            </layout-row>
        `;
    }
}

customElements.define('blog-item', BlogItemCard);