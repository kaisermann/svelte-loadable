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

- `loader`: a function which `import()` your component to the `<Loadable>` component.
- `delay`: minimum delay in `msecs` for showing the `loading slot`. Default: 200
- `timeout`: time in `msecs` for showing the `timeout slot`.

Any other prop will be passed directly onto the rendered component if no `success` slot is defined:

```html
<Loadable loader="{...}" foo="cookie" bar="potato" />
<!-- `foo` and `bar` will be available to the rendered component -->
```

If a `success` slot is used, the passed props will be available in the slots `props` object:

```html
<Loadable loader="{...}" foo="cookie" bar="potato">
  <div slot="success" let:component let:props>
    <svelte:component this="{component}" {...props} />
    <!-- `foo` and `bar` will be available to the rendered component -->
  </div>
</Loadable>
```

### Slots

- `loading`: customizes the loading state;
- `error`: customizes the error state. You can `let:error` to have access to the error variable;
- `timeout`: customizes the timeout state. Will only appear if `timeout` prop is defined;
- `success`: customizes the imported component render (add props, etc). You can `let:component` to access the imported component and `let:props` to get all props passed to the component that are not related to `svelte-loadable`.

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
