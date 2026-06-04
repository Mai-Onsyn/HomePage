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

            const scripts = doc.querySelectorAll('script');
            scripts.forEach(oldScript => {
                const newScript = document.createElement('script');

                // 如果是外部引入的脚本 <script src="...">
                if (oldScript.src) {
                    newScript.src = oldScript.src;
                } else {
                    // 如果是内联脚本 <script>console.log(...)</script>
                    newScript.textContent = oldScript.textContent;
                }

                // 强行插入到当前组件中，此时浏览器会立刻激活并执行该脚本
                this.appendChild(newScript);
            });
        } catch (e) {
            console.error(`加载组件失败: ${src}`, e);
        }
    }
}

customElements.define('link-html', AsyncComponent);