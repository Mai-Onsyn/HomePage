const md = window.markdownit({
    html: true,
    linkify: true,
    typographer: true,
    // highlight: function (str, lang) {
    //     if (lang && hljs.getLanguage(lang)) {
    //         try {
    //             return '<pre class="hljs"><code>' +
    //                 hljs.highlight(str, { language: lang, ignoreIllegals: true }).value +
    //                 '</code></pre>';
    //         } catch (__) {}
    //     }
    //     return '<pre class="hljs"><code>' + md.utils.escapeHtml(str) + '</code></pre>';
    // }
});

const urlParams = new URLSearchParams(window.location.search);
const mdPath = urlParams.get('path');
fetch(mdPath)
    .then(response => {
        if (!response.ok) throw new Error('文章文件不存在');
        return response.text();
    })
    .then(mdText => {
        document.getElementById('article-body').innerHTML = md.render(mdText);
    })
    .catch(err => {
        document.getElementById('article-body').innerHTML = `<p style="color:red;">文章加载失败: ${err.message}</p>`;
    });