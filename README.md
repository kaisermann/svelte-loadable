# svelte-loadable

> Dynamically load a svelte component. Based on [react-loadable](https://github.com/jamiebuilds/react-loadable).

# How to use

Just pass a `loader` function which imports your component to the `<Loadable>` component.

Fill the `loading` slot for customizing the loading state.

Fill the `error` slot for customizing the error state. You can `bind:error` to have access to the error variable.

Use the `.load()` method to retry loading.

**Example:**

```html
<Loadable ref:loadable {loader} bind:error>
  <div slot="loading">Loading but doomed to failed...</div>
  <div slot="error">
    {error}
    <br>
    <button on:click="refs.loadable.load()">Try again</button>
  </div>
</Loadable>

<script>
  export default {
    components: {
      Loadable: '../../Loadable.html'
    },
    data() {
      return {
        loader: () => import('./AsyncComponent.html'),
      }
    }
  }
</script>
```