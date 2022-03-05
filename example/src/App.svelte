<script>
  import Loadable from '../../Loadable.svelte'

  let retry

  const getDelayedLoader = (delay = 3000) => () =>
    new Promise((resolve, reject) =>
      setTimeout(() => resolve(import('./AsyncComponent.svelte')), delay),
    )

  const getFailureLoader = (delay = 3000) => () =>
    new Promise((resolve, reject) =>
      setTimeout(() => reject(new Error('Some error')), delay),
    )
</script>

<h1>This one will work</h1>
<Loadable loader={() => import('./AsyncComponent.svelte')} delay="300">
  <div slot="loading">Loading and blessed to succeed...</div>
</Loadable>

<h1>This one will not</h1>
<Loadable loader={getFailureLoader(5000)} timeout="3000">
  <div slot="loading">Loading but doomed to failed...</div>
  <div slot="timeout">This is taking a while...</div>
  <div slot="error" let:error let:retry>
    {error}
    <br />
    <button on:click={retry}>Try again</button>
  </div>
</Loadable>

<h1>This one will work with custom props by using the "default" slots</h1>
<Loadable loader={getDelayedLoader()} let:component>
  <div slot="loading">Loading and blessed to succeed...</div>
  <svelte:component this={component} customProp={true} />
</Loadable>

<h1>
  This one will work with custom props by passing props to the Loadable
  component
</h1>
<Loadable loader={getDelayedLoader()} customProp={true}>
  <div slot="loading">Loading and blessed to succeed...</div>
</Loadable>

<h1>This one will timeout</h1>
<Loadable loader={getDelayedLoader(7000)} timeout="3000">
  <div slot="loading">Loading...</div>
  <div slot="timeout">This is taking a little bit too long...</div>
</Loadable>

<h1>This one will work</h1>
<Loadable loader={() => import('./AsyncComponent.svelte')} delay="300">
  <div slot="loading">Loading and blessed to succeed...</div>
</Loadable>
