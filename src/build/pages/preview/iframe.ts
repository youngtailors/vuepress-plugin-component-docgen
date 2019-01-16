export const createIframe = (id: string) => {
  return `
      <iframe \
        src="https://codesandbox.io/embed/${id}?codemirror=1&verticallayout=1&fontsize=12&view=preview&runonclick=1&hidenavigation=1" \
        id="iframeMe"\
        style="width:100%; height:600px; border:0; border-radius: 4px; overflow:hidden;"\
        sandbox="allow-modals allow-forms allow-popups allow-scripts allow-same-origin">\
        </iframe>
    `
}
