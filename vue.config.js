const fs = require("fs");
const path = require("path");
const join = path.join;
const slugify = require("transliteration").slugify;
const hljs = require("highlight.js");
const striptags = require("./strip-tags");

function convert(str) {
  str = str.replace(/(&#x)(\w{4});/gi, function($0) {
    return String.fromCharCode(
      parseInt(
        encodeURIComponent($0).replace(/(%26%23x)(\w{4})(%3B)/g, "$2"),
        16
      )
    );
  });
  return str;
}

/**
 * 由于v-pre会导致在加载时直接按内容生成页面.但是我们想要的是直接展示组件效果,通过正则进行替换
 * hljs是highlight.js中的高亮样式类名
 * @param  {[type]} render e.g '<code v-pre class="test"></code>' | '<code></code>'
 * @return {[type]}        e.g '<code class="hljs test></code>'   | '<code class="hljs></code>'
 */
function wrap(render) {
  return function() {
    return render
      .apply(this, arguments)
      .replace('<code v-pre class="', '<code class="hljs ')
      .replace("<code>", '<code class="hljs">');
  };
}

function resolve(dir) {
  return path.resolve(__dirname, dir);
}

var replaceDelimiters = function(str) {
  return str.replace(/({{|}})/g, "<span>$1</span>");
};
const markdownRender = require("markdown-it")({
  highlight: function(str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return replaceDelimiters(hljs.highlight(lang, str).value);
      } catch (__) {}
    }

    return ""; // use external default escaping
  },
  table_open: function() {
    return '<table class="table">';
  }
});

function getEntries(path) {
  let files = fs.readdirSync(resolve(path));
  const entries = files.reduce((ret, item) => {
    const itemPath = join(path, item);
    const isDir = fs.statSync(itemPath).isDirectory();
    if (isDir) {
      ret[item] = resolve(join(itemPath, "index.js"));
    } else {
      const [name] = item.split(".");
      ret[name] = resolve(`${itemPath}`);
    }
    return ret;
  }, {});
  return entries;
}

//开发环境配置
const devConfig = {
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          "primary-color": "#c62f2f",
          "link-color": "#c62f2f",
          "border-radius-base": "4px"
        },
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    resolve: {
      extensions: [".js", ".vue", ".json", ".md"],
      alias: {
        "@": resolve("packages"),
        assets: resolve("src/assets"),
        views: resolve("src/views")
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule("md")
      .test(/\.md$/)
      .use("vue-loader")
      .loader("vue-loader")
      .end()
      .use("vue-markdown-loader")
      .loader("vue-markdown-loader/lib/markdown-compiler")
      .options({
        raw: true,
        preventExtract: true,
        use: [
          [
            require("markdown-it-container"),
            "demo",
            {
              validate: function(params) {
                return params.trim().match(/^demo\s*(.*)$/);
              },

              render: function(tokens, idx) {
                if (tokens[idx].nesting === 1) {
                  var summaryContent = tokens[idx + 1].content;
                  var summary = striptags.fetch(summaryContent, "summary");
                  var summaryHTML = summary
                    ? markdownRender.render(summary)
                    : "";

                  var content = tokens[idx + 2].content;
                  var code =
                    tokens[idx + 2].markup +
                    tokens[idx + 2].info +
                    "\n" +
                    content +
                    tokens[idx + 2].markup;
                  var codeHtml = code ? markdownRender.render(code) : "";
                  return `<demo-box>
                                  <div class="box-demo-show" slot="component">${content}</div>
                                  <div slot="description">${summaryHTML}</div>
                                  <div class="highlight" slot="code">${codeHtml}</div>`;
                } else {
                  return "</demo-box>\n";
                }
              }
            }
          ],
          [
            require("markdown-it-anchor"),
            {
              level: 2,
              slugify: slugify,
              permalink: true,
              permalinkBefore: true
            }
          ],
          [require("markdown-it-attrs")]
        ]
      });
  },
  devServer: {
    port: 8091,
    hot: true,
    open: "Google Chrome",
    proxy: {
      //配置跨域
      "/v2": {
        target: "https://api.douban.com/",
        ws: true,
        changOrigin: true
      }
    }
  }
};
//生成环境配置
const buildConfig = {
  css: {
    sourceMap: true,
    extract: {
      filename: "style/[name].css"
    }
  },
  configureWebpack: {
    entry: {
      ...getEntries("packages")
    },
    output: {
      filename: "[name]/index.js",
      libraryTarget: "commonjs2"
    }
  },
  chainWebpack: config => {
    config.module
      .rule("js")
      .include.add("/packages")
      .end()
      .use("babel")
      .loader("babel-loader")
      .tap(options => {
        return options;
      });
    config.optimization.delete("splitChunks");
    config.plugins.delete("copy");
    config.plugins.delete("html");
    config.plugins.delete("preload");
    config.plugins.delete("prefetch");
    config.plugins.delete("hmr");
    config.entryPoints.delete("app");

    config.module
      .rule("fonts")
      .use("url-loader")
      .tap(option => {
        option.fallback.options.name = "static/fonts/[name].[hash:8].[ext]";
        return option;
      });
  },
  outputDir: "lib",
  productionSourceMap: false
};

module.exports = process.env.NODE_ENV === 'development' ? devConfig : buildConfig;
