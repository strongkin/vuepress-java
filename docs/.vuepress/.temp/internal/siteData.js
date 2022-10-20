export const siteData = JSON.parse("{\"base\":\"/vuepress-java/\",\"lang\":\"en-US\",\"title\":\"strongking\",\"description\":\"strongking博客\",\"head\":[[\"link\",{\"rel\":\"icon\",\"href\":\"/images/good.png\"}]],\"locales\":{}}")

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSiteData) {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ siteData }) => {
    __VUE_HMR_RUNTIME__.updateSiteData(siteData)
  })
}
