class AsyncComponent extends HTMLElement {
    async connectedCallback() {
        const src = this.getAttribute('src');
        if (!src) return;

        try {
            const res = await fetch(src);
            const html = await res.text();

            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');

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