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

#### Basic Example:

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
```

### Methods
  - Use the `.load()` method to retry loading.

### Registering a loader
#### Or, preventing "flash of loading"

By default, Svelte Loadable will dynamically load the specified loader (import statement) every time the component is initialized and reinitialized. This creates a delay between initial rendering, and rending the loaded component, even for components which have previously been loaded. To work around that, Svelte Loadable provides an optional cache, which can be used to predefine a loader, and keep track of whether it has already been loaded. When a loader is registered, it will render immediately on the next initialization.

To set that up, you'll need to `register` the loader at definition time in a module script block, instead of passing the loader directly to the loadable component instance, then pass the resulting loader on to the loadable component. It looks like this (with `svelte-routing`).

*NOTE:* A `resolve` function is necessary for the cache to keep track of its loaded assets, and for SSR solutions. The `resolve` function must return a resolved path, which will be used to keep track of loadables, and to facilitate loading before hydration in SSR solutions. A [babel plugin](#babel-plugin) is included for basic caching functionality.

**App.svelte:**

```html
<script context="module">
import { register } from 'svelte-loadable'

// Loaders must be registered outside of the render tree.
const PageLoader = register({
  loader: () => import('./pages/Page.svelte'),
  resolve: () => require.resolve('./pages/Page.svelte')
})
const HomeLoader = register({
  loader: () => import('./home/Home.svelte'),
  resolve: () => require.resolve('./home/Home.svelte')
})
</script>

<script>
import { Router, Link, Route } from 'svelte-routing'
import Loadable from 'svelte-loadable'

export let url = ''
</script>

<Router url="{url}">
  <Route path="/pages/:slug" let:params>
    <Loadable loader={PageLoader} slug={params.slug}>
      <div slot="loading">Loading...</div>
    </Loadable>
  </Route>
  <Route path="/">
    <Loadable loader={HomeLoader} />
  </Route>
</Router>
```

Another advantage is that if the same module is registered in two different places in the tree, the previous loader will be used instead of creating a second loader.

This comes with additional benefits and opportunities as well. There is now a `preloadAll` method, which can be used to proactively (and recursively) preload all the modules after the initial render of the application, if desired. That method can also be used server side to preload all the necessary components to pull off server side rendering (SSR).

### babel plugin

The Svelte Loadable babel plugin will automatically add the `resolve` method to your registered loaders, to cut down on manual configuration. Add the Svelte Loadable babel plugin to your plugins list in `.babelrc` or equivalent:

**.babelrc or package.json**

```json
{
  "plugins": [
    "svelte-loadable/babel"
  ]
}
```

Once configured, you can skip adding the resolve method, and let the babel plugin do it for you:

```html
<script context="module">
import { register } from 'svelte-loadable'

// Loaders must be registered outside of the render tree.
const PageLoader = register({
  loader: () => import('./pages/Page.svelte')
})
const HomeLoader = register({
  loader: () => import('./home/Home.svelte')
})
</script>
```

### Additional Methods

#### preloadAll()

Preloads all registered Loaders. Works server side, and client side.

```js
import { preloadAll } from 'svelte-loadable'

// Somewhere in your code, after the initial tree is rendered:
preloadAll().then(() => {...});
```

### The 'svelte-loadable-capture' Context for SSR

To facilitate the creation of SSR solutions, Svelte Loadable uses a context which can be set up by an SSR solution in a `LoadableProvider` using the string identifier 'svelte-loadable-capture'. Svelte Loadable expects the context to provide a method, to which it will pass the registered loader function. For an example implementation, check out [`npdev:svelte-loadable`](https://github.com/CaptainN/npdev-svelte-loadable) a Meteor SSR solution built on top of Svelte Loadable. The [babel plugin](#babel-plugin) is also useful for SSR, and provides everything needed for basic runtime caching, and `npdev:svele-loadable`.

---

For more examples, please check the [`example/src/App.svelte`](https://github.com/kaisermann/svelte-loadable/blob/master/example/src/App.svelte) file.
