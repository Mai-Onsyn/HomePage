class AsyncComponent extends HTMLElement {
    async connectedCallback() {
        const src = this.getAttribute('src');
        if (!src) return;

        try {
            const res = await fetch(src);
            const html = await res.text();

            // 转换为 DOM 片段，提取其中的 style 防止重复注入全局
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

            // 如果组件内部有 style，将其移入组件局部，或者统一处理
            this.innerHTML = doc.body.innerHTML;
            if (doc.head.querySelector('style')) {
                this.appendChild(doc.head.querySelector('style'));
            }
        } catch (e) {
            console.error(`加载组件失败: ${src}`, e);
        }
    }
}
customElements.define('link-html', AsyncComponent);