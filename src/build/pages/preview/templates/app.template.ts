export default preview => {
  return `
<template>
    <div id="app">${preview}</div>
</template>
<script>
    export default {
        name: "App"
    };
</script>
`
}
