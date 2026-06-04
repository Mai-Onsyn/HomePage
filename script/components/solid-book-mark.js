class SolidBookMark extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const text = this.getAttribute("text") || "undefine";
        const flip = this.getAttribute('flip') === "true";
        this.shadowRoot.innerHTML = `
        <link  rel="stylesheet" href="../../css/base.css">
        <script src="./layout.js"></script>
        <style>            
            .bookmark-base {
                position: relative;
                box-sizing: border-box;
                z-index: 0;
                
                --bg-transform: ${flip ? 'scaleX(-1)' : 'none'};
            }
        
            .bookmark-base::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: -1;
        
                background: white;
        
                -webkit-mask-image:
                        linear-gradient(to bottom, transparent 0%, #3b6ef3c0 15%),
                        linear-gradient(to right, transparent 0%, #3b6ef380 80%),
                        linear-gradient(to top, transparent 0%, #3b6ef3c0 60%);
        
                -webkit-mask-composite: source-in;
                mask-composite: intersect;
        
                -webkit-mask-size: 100% 100%;
                mask-size: 100% 100%;
                
                transform: var(--bg-transform);
            }
        
            .bookmark-base::after {
                content: '';
                position: absolute;
                top: 0;
                ${flip ? "left" : "right"}: 0;
                bottom: 0;
                width: 1px;
                z-index: 1;
                background: linear-gradient(to bottom,
                    #3b6ef300 0%,
                    #3b6ef300 10%,
                    #ffffff80 11%,
                    transparent 100%
                );
            }
            
            .bookmark-base[flip="true"]::after {
                right: auto;
                left: 0;
            }
        
            .point {
                background: #3b6ef3;
                border-radius: 50%;
                width: 6px;
                height: 6px;
                flex-shrink: 0;
                margin: 4px 0;
            }
        
            .ray {
                background: linear-gradient(to bottom, #3b6ef3ff 0%, transparent 80%);
                height: 100%;
                width: 1px;
            }
        </style>
        
        <layout-column horizontal-alignment="Center" gap="0px" class="bookmark-base" style="width: 48px; height: 100%;">
            <p style="color: black; font-size: 10pt; margin: 0; padding-top: 70%;">${text}</p>
            <div class="point"></div>
            <div class="ray"></div>
        </layout-column>
        `;
    }
}

customElements.define('solid-book-mark', SolidBookMark);