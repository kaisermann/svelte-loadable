# svelte-loadable

> Dynamically load a svelte component. Based on [react-loadable](https://github.com/jamiebuilds/react-loadable).

# How to use

- Props
  - `loader`: a function which `import()` your component to the `<Loadable>` component;

  - `delay`: minimum delay in `msecs` for the loading slot to appear.

- Slots
  - Optionally fill the `loading` slot for customizing the loading state;

  - Optionally fill the `error` slot for customizing the error state. You can `bind:error` to have access to the error variable;

  - Optionally fill the `success` slot for customizing the imported component render (add props, etc).

- Methods
  - Use the `.load()` method to retry loading.

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
      Loadable: 'svelte-loadable',
    },
    data() {
      return {
        loader: () => import('./AsyncComponent.html'),
      }
    }
  }
</script>
```

For more examples, please check the [`example/src/App.html`](https://github.com/kaisermann/svelte-loadable/blob/master/example/src/App.html) file.
