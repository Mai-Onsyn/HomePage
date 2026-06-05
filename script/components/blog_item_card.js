class BlogItemCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const imgUrl = this.getAttribute('image') || '#';
        const title = this.getAttribute('title') || 'No Titled';
        const desc = this.getAttribute('desc') || 'No Description';
        const tags = this.getAttribute('tags') || '';
        const date = this.getAttribute('date') || '1970-01-01';

        this.innerHTML = `
            <style>
                .blog-image-wrapper {
                    width: 180px;
                    aspect-ratio: 1.6;
                    overflow: hidden;
                    border-radius: 6px;
                    box-shadow: 0 2px 4px 2px rgba(0, 0, 0, 0.1);
                }
                .blog-image {
                    width: 100%;
                    aspect-ratio: 1.6;
                    display: block;
                }
            </style>
            
            <layout-row padding="16px" class="genric-card">
                <layout-box class="blog-image-wrapper" alignment="Center">
                    <img src="${imgUrl}" alt="${title}" class="blog-image">
                </layout-box>
            </layout-row>
        `;
    }
}

customElements.define('blog-item', BlogItemCard);