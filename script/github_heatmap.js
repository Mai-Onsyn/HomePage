(function () {
    const username = "Mai-Onsyn";

    // 尺寸配置
    const CELL = 10; // 方块大小 (从 11 缩小到 10)
    const GAP = 2;   // 间距 (从 3 缩小到 2)
    const STEP = CELL + GAP; // 每个格子占用的总步长 (12px)

    const X_OFFSET = 30; // 给左侧“周一、周三”留出的空间
    const Y_OFFSET = 15; // 给顶部“月份”留出的空间

    // 颜色等级 (对应 0, 1, 2, 3, 4)
    const COLORS = ["#eaeff6", "#ccdbff", "#aac4fe", "#84a8fb", "#6191f9"];

    async function loadHeatmap() {
        try {
            // const response = await fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`);
            const data = await response.json();

            // --- 核心优化逻辑：补齐第一周 ---
            const targetDays = 183; // 期望显示的半年天数
            let startIndex = data.contributions.length - targetDays;

            // 如果计算出的起始点小于 0，直接从 0 开始
            if (startIndex < 0) startIndex = 0;

            // 检查这天是星期几 (0-6)
            const firstDayDate = new Date(data.contributions[startIndex].date);
            const firstDayOfWeek = firstDayDate.getDay();

            // 如果不是周日(0)，就把起始点往前移，直到移到周日
            if (firstDayOfWeek !== 0) {
                startIndex = startIndex - firstDayOfWeek;
                if (startIndex < 0) startIndex = 0; // 安全边界检查
            }

            // 截取对齐后的半年数据
            const halfYearData = data.contributions.slice(startIndex);
            // ---------------------------------

            // 计算这半年的总贡献量
            document.getElementById("stats-count").textContent = halfYearData.reduce((sum, day) => sum + day.count, 0);

            render(halfYearData);
        } catch (error) {
            console.error("加载失败:", error);
        }
    }

    function render(contributions) {
        const svg = document.getElementById("heatmapSvg");
        const ns = "http://www.w3.org/2000/svg";

        // 动态计算对齐后的总周数
        const totalWeeks = Math.ceil(contributions.length / 7);
        svg.setAttribute("viewBox", `0 0 ${X_OFFSET + totalWeeks * STEP} ${Y_OFFSET + 7 * STEP}`);
        svg.innerHTML = "";

        // 绘制左侧星期标签 (Mon, Wed, Fri)
        const days = ["Mon", "Wed", "Fri"];
        const dayIndices = [1, 3, 5];
        dayIndices.forEach((dayIdx, i) => {
            const text = document.createElementNS(ns, "text");
            text.setAttribute("x", 0);
            text.setAttribute("y", Y_OFFSET + dayIdx * STEP + 9);
            text.setAttribute("class", "label-text");
            text.textContent = days[i];
            svg.appendChild(text);
        });

        let currentWeek = 0;
        let lastMonth = -1;

        // 循环渲染每一个贡献格子
        contributions.forEach((day) => {
            const dateObj = new Date(day.date);
            const dayOfWeek = dateObj.getDay();
            const month = dateObj.getMonth();

            const x = X_OFFSET + currentWeek * STEP;
            const y = Y_OFFSET + dayOfWeek * STEP;

            const rect = document.createElementNS(ns, "rect");
            rect.setAttribute("x", x);
            rect.setAttribute("y", y);
            rect.setAttribute("width", CELL);
            rect.setAttribute("height", CELL);
            rect.setAttribute("rx", 2);
            rect.setAttribute("class", "heatmap-cell");
            rect.setAttribute("fill", COLORS[Math.min(day.level, 4)]);

            const title = document.createElementNS(ns, "title");
            title.textContent = `${day.date} : ${day.count} 次贡献`;
            rect.appendChild(title);
            svg.appendChild(rect);

            // 绘制顶部月份标签
            if (currentWeek > 0 && month !== lastMonth && dayOfWeek === 0) {
                const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
                const text = document.createElementNS(ns, "text");
                text.setAttribute("x", x);
                text.setAttribute("y", 10);
                text.setAttribute("class", "label-text");
                text.textContent = monthNames[month];
                svg.appendChild(text);

                lastMonth = month;
            } else if (month !== lastMonth && dayOfWeek === 0) {
                // 如果是第 0 周，虽然不渲染文字，但仍需更新 lastMonth 变量，确保后面月份能正常对比
                lastMonth = month;
            }

            // 遇到周六，列数自增
            if (dayOfWeek === 6) {
                currentWeek++;
            }
        });
    }

    loadHeatmap();
})();