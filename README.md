# svelte-loadable

> Dynamically load a svelte component. Based on [react-loadable](https://github.com/jamiebuilds/react-loadable).

## How to use

- Props
  - `loader`: a function which `import()` your component to the `<Loadable>` component;
  - `delay`: minimum delay in `msecs` for showing the `loading slot`;
  - `timeout`: time in `msecs` for showing the `timeout slot`.

- Slots
  - `loading`: customizes the loading state;
  - `error`: customizes the error state. You can `bind:error` to have access to the error variable;
  - `timeout`: customizes the timeout state. Will only appear if `timeout` prop is defined;
  - `success`: customizes the imported component render (add props, etc).

- Methods
  - Use the `.load()` method to retry loading.

## Example

```html
<Loadable ref:loadable {loader} bind:error>
  <div slot="loading">Loading...</div>
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
