# svelte-loadable

> Dynamically load a svelte component. Based on [react-loadable](https://github.com/jamiebuilds/react-loadable).

## Usage

Just pass a `loader` method which return a async module import:

```html
<script>
  import Loadable from 'svelte-loadable'
</script>

<Loadable loader={() => import('./AsyncComponent.svelte')} />
```

### Props

- `loader`: a function which `import()` your component to the `<Loadable>` component;
- `delay`: minimum delay in `msecs` for showing the `loading slot`;
- `timeout`: time in `msecs` for showing the `timeout slot`.

### Slots

- `loading`: customizes the loading state;
- `error`: customizes the error state. You can `let:error` to have access to the error variable;
- `timeout`: customizes the timeout state. Will only appear if `timeout` prop is defined;
- `success`: customizes the imported component render (add props, etc). You can `let:component` to access the imported component.

#### Example:

```html
<script>
  import Loadable from 'svelte-loadable'
</script>

<Loadable bind:this={loadable} loader={() => import('./AsyncComponent.svelte')}>
  <div slot="loading">Loading...</div>
  <div slot="error" let:error>
    {error}
    <br>
    <button on:click="loadable.load()">Try again</button>
  </div>
</Loadable>

### Methods
  - Use the `.load()` method to retry loading.

```

---

For more examples, please check the [`example/src/App.svelte`](https://github.com/kaisermann/svelte-loadable/blob/master/example/src/App.svelte) file.
