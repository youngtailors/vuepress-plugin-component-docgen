import { createIframe } from './iframe'

/**
 * @param {string} url the codesandbox url
 * @description What it's going on here ?
 * It is taking the url for calling codesandbox. Codesandbox create an instance
 * and return an id. Then we create an iframe that embed the codesandbox_id
 * and add it after the #code
 * @returns {string} return the preview string
 */
export default url => {
  return `
## Code\n\n\n
<script>
    export default {
      mounted() {
        fetch("${url}")
        .then(x => x.json())
        .then(data => {
          var check = document.querySelector("#iframeMeContainer");
          if (check) {
            check.parentNode.removeChild(check);
          }
          setTimeout(() => {
            var giveIframe = ${createIframe};
            var el = document.querySelector("#code");
            var d = document.createElement("div");
            d.id = 'iframeMeContainer';
            el.append(d);
      
            d.innerHTML = giveIframe(data.sandbox_id);
          }, 0)
        });
      }
    }
</script>`
}
