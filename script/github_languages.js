async function loadPLangColorJson(url) {
    try {
        const response = await fetch(url);

        return await response.json();
    } catch (error) {
        console.error("加载 JSON 文件失败:", error);
    }
}

async function loadLanguages() {
    try {
        const repos = ["VeloVoice", "Dobot", "Trisona", "BadJavaCode", "HomePage", "Renderer4", "LibrarySystem"];

        const totalLanguages = {};
        let totalBytes = 0;
        for (const repo of repos) {
            const response = await fetch(`https://api.github.com/repos/Mai-Onsyn/${repo}/languages`);
            const data = await response.json();

            for (const [language, bytes] of Object.entries(data)) {
                if (language === 'C') continue;
                totalLanguages[language] = (totalLanguages[language] || 0) + bytes;
                totalBytes += bytes;
            }
        }

        const langColors = await loadPLangColorJson('../assets/lang_colors.json');
        // console.log(langColors);
        const sortedEntries = Object.entries(totalLanguages).sort((a, b) => b[1] - a[1]);
        let count = 0;
        for (const [language, bytes] of sortedEntries) {
            if (count++ > 3) break;
            document.getElementById("lang-column").insertAdjacentHTML('beforeend',`
                <layout-row class="lang-concentration" vertical-alignment="Center" gap="16px">
                    <span class="body-text" style="width: 80px; display: inline-block; flex-shrink: 0">
                        ${language}
                    </span>
                    <progress-bar percent="${bytes / totalBytes * 100}%" color="${langColors[language]}"></progress-bar>
                    <span class="body-text" style="width: 30px; display: inline-block; flex-shrink: 0">
                        ${(bytes / totalBytes * 100).toFixed(0)}%
                    </span>
                </layout-row>
            `);
            // console.log(language);
            // console.log(langColors[language]);
        }
    } catch (error) {
        console.log(error);
    }
}

loadLanguages();