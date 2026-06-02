// 1. Row 组件
class LayoutRow extends HTMLElement {
    connectedCallback() {
        this.style.display = 'flex';
        this.style.flexDirection = 'row';
        this.style.padding = '0px';

        // 处理内边距
        if (this.hasAttribute('padding')) {
            this.style.padding = this.getAttribute('padding');
        }

        this.style.setProperty('--layout-gap', '0px');

        if (this.hasAttribute('gap')) {
            this.style.setProperty('--layout-gap', this.getAttribute('gap'));
        }
    }
}

// 2. Column 组件
class LayoutColumn extends HTMLElement {
    connectedCallback() {
        this.style.display = 'flex';
        this.style.flexDirection = 'column';
        this.style.padding = '0px';

        if (this.hasAttribute('padding')) {
            this.style.padding = this.getAttribute('padding');
        }

        this.style.setProperty('--layout-gap', '0px');

        if (this.hasAttribute('gap')) {
            this.style.setProperty('--layout-gap', this.getAttribute('gap'));
        }
    }
}

// 3. Box 组件
class LayoutBox extends HTMLElement {
    connectedCallback() {
        this.style.padding = '0px';
        if (this.hasAttribute('padding')) {
            this.style.padding = this.getAttribute('padding');
        }
    }
}

class SpacerHorizontal extends HTMLElement {
    connectedCallback() {
        this.style.display = 'inline-block';
        this.style.flexShrink = '0'; // 防止在 Flex 布局中被压缩

        // 映射 size 属性到 width
        const size = this.getAttribute('size') || '0px';
        this.style.width = size;
        this.style.height = '1px'; // 给予微小的基础高度或保持 0
    }
}

// 垂直 Spacer (主要在 Column 中使用，通过 height 撑开空间)
class SpacerVertical extends HTMLElement {
    connectedCallback() {
        this.style.display = 'block';
        this.style.flexShrink = '0'; // 防止在 Flex 布局中被压缩

        // 映射 size 属性到 height
        const size = this.getAttribute('size') || '0px';
        this.style.height = size;
        this.style.width = '100%'; // 默认占满整行宽度
    }
}

// 注册自定义标签
customElements.define('horizontal-spacer', SpacerHorizontal);
customElements.define('vertical-spacer', SpacerVertical);

// 注册标签
customElements.define('layout-row', LayoutRow);
customElements.define('layout-column', LayoutColumn);
customElements.define('layout-box', LayoutBox);