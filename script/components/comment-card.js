class CommentCard extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const username = this.getAttribute('name') || '匿名用户';
        const content = this.getAttribute('content') || '';
        const date = this.getAttribute('date') || '1970-01-01 00:00'
        const likes = parseInt(this.getAttribute('like')) || 0;
        const dislikes = parseInt(this.getAttribute('dislike')) || 0;

        this.innerHTML = `
            <link rel="stylesheet" href="../../css/modifier.css">
            <link rel="stylesheet" href="../../css/text-style.css">
            <style>
                .layout-slid-box {
                    opacity: 0;
                    transform: translate(0, 128px);
                    
                    transition: all 1.2s cubic-bezier(0.25, 1, 0.5, 1);
                }
                
                .layout-slid-box.show {
                    opacity: 1;
                    transform: translate(0, 0);
                }
            
                .content-body-text {
                    width: 720px;
                    display: inline-block;
                    padding: 16px;
                    
                    text-indent: 2em;
                }
                
                .interaction-text {
                    display: inline-block;
                    min-width: 48px;
                }
                
                .dislike-icon {
                    transform: scale(1, -1);
                }
            </style>
            
            <layout-box class="fill-max-width genric-card layout-slid-box" padding="16px">
                <layout-column>
                    <span class="section-title">${username}</span>
                    <span class="body-text content-body-text">${content}</span>
                    <span class="prompt-text-small">${date}</span>
                </layout-column>
                <layout-row align-self="BottomEnd">
                    <layout-row gap="8px" vertical-alignment="Center">
                        <object data="../../assets/icon/like.svg" width="16px" height="16px" type="image/svg+xml"></object>
                        <span class="interaction-text">${likes}</span>
                    </layout-row>
                    <layout-row gap="8px" vertical-alignment="Center">
                        <object data="../../assets/icon/like.svg" class="dislike-icon" width="16px" height="16px" type="image/svg+xml"></object>
                        <span class="interaction-text">${dislikes}</span>
                    </layout-row>
                </layout-row>
            </layout-box>
        `;
        slideInAnimation('.layout-slid-box')
    }
}

customElements.define('comment-card', CommentCard);