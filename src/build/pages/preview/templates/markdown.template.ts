import { createIframe } from '..'

export default url => {
  return `
## Code\n\n\n## Preview\n\n\n
<script>
    Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling);
    },false;
    fetch("${url}")
    .then(x => x.json())
    .then(data => {
    console.log(data.sandbox_id);
    var giveIframe = ${createIframe};
    var el = document.querySelector("#preview");
    console.log(giveIframe(data.sandbox_id));
    el.innerHTML = giveIframe(data.sandbox_id);
    });
</script>`
}
