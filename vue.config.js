const fs = require('fs');
const path = require('path');
const join = path.join
const slugify = require('transliteration').slugify
const hljs = require('highlight.js')
const striptags = require('./strip-tags')

function resolve(dir) {
    return path.resolve(__dirname, dir)
}
var replaceDelimiters = function (str) {
    return str.replace(/({{|}})/g, '<span>$1</span>')
};
const markdownRender = require('markdown-it')({
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return replaceDelimiters(hljs.highlight(lang, str).value);
            } catch (__) {
            }
        }

        return ''; // use external default escaping
    },
    table_open: function () {
        return '<table class="table">';
    }
})
function getEntries(path) {
    let files = fs.readdirSync(resolve(path));
    const entries = files.reduce((ret, item) => {
        const itemPath = join(path, item)
        const isDir = fs.statSync(itemPath).isDirectory();
        if (isDir) {
            ret[item] = resolve(join(itemPath, 'index.js'))
        } else {
            const [name] = item.split('.')
            ret[name] = resolve(`${itemPath}`)
        }
        return ret
    }, {})
    return entries
}

//开发环境配置
const devConfig = {
    css: {
        loaderOptions: {
            less: {
                modifyVars: {
                    'primary-color': '#c62f2f',
                    'link-color': '#c62f2f',
                    'border-radius-base': '4px'
                },
                javascriptEnabled: true
            }
        },
    },
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.vue', '.json', '.md'],
            alias: {
                '@': resolve('packages'),
                'assets': resolve('src/assets'),
                'views': resolve('src/views'),
            }
        }
    },
    chainWebpack: config => {
        config.module
            .rule('md')
            .test(/\.md$/)
            .use('vue-loader')
            .loader('vue-loader')
            .end()
            .use("vue-markdown-loader")
            .loader('vue-markdown-loader/lib/markdown-compiler')
            .options({
                raw: true,
                wrapper: 'article',
                use: [
                    [require('markdown-it-container'), 'demo', {
                        validate: function (params) {
                            return params.trim().match(/^demo\s*(.*)$/);
                        },

                        render: function (tokens, idx) {
                            if (tokens[idx].nesting === 1) {
                                var summaryContent = tokens[idx + 1].content;
                                var summary = striptags.fetch(summaryContent, 'summary');
                                var summaryHTML = summary ? markdownRender.render(summary) : '';

                                var content = tokens[idx + 2].content;
                                var code = tokens[idx + 2].markup + tokens[idx + 2].info + '\n' + content + tokens[idx + 2].markup;
                                var codeHtml = code ? markdownRender.render(code) : '';
                                return `<demo-box>
                                    <div class="box-demo-show" slot="component">${content}</div>
                                    <div slot="description">${summaryHTML}</div>
                                    <div class="highlight" slot="code">${codeHtml}</div>`
                            } else {
                                return '</demo-box>\n'
                            }
                        }
                    }],
                    [require('markdown-it-anchor'), {
                        level: 2,
                        slugify: slugify,
                        permalink: true,
                        permalinkBefore: true
                    }],
                    [require('markdown-it-attrs')]
                ]
            })
    },
    devServer: {
        port: 8091,
        hot: true,
        open: 'Google Chrome'
    }
}
//生成环境配置
const buildConfig = {
    css: {
        sourceMap: true,
        extract: {
            filename: 'style/[name].css'
        }
    },
    configureWebpack: {
        entry: {
            ...getEntries('packages'),
        },
        output: {
            filename: '[name]/index.js',
            libraryTarget: 'commonjs2',
        }
    },
    chainWebpack: config => {
        config.module
            .rule('js')
            .include
            .add('/packages')
            .end()
            .use('babel')
            .loader('babel-loader')
            .tap(options => {
                return options
            })
        config.optimization.delete('splitChunks')
        config.plugins.delete('copy')
        config.plugins.delete('html')
        config.plugins.delete('preload')
        config.plugins.delete('prefetch')
        config.plugins.delete('hmr')
        config.entryPoints.delete('app')

        config.module
            .rule('fonts')
            .use('url-loader')
            .tap(option => {
                option.fallback.options.name = 'static/fonts/[name].[hash:8].[ext]'
                return option
            })
    },
    outputDir: 'lib',
    productionSourceMap: false,
}

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;
