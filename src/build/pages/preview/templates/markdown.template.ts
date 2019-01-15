import { createIframe } from '..'

export default url => {
  return `
## Code\n\n\n## Preview\n\n\n
<script>
    fetch("${url}")
    .then(x => x.json())
    .then(data => {
      var giveIframe = ${createIframe};
      var el = document.querySelector("#preview");

      el.innerHTML = giveIframe(data.sandbox_id);
    });
</script>`
}
