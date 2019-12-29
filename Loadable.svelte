<script context="module">
  export const ALL_LOADERS = new Map()
  export const LOADED = new Map()

  const STATES = Object.freeze({
    INITIALIZED: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
    TIMEOUT: 4,
  })

  export function findByResolved(resolved) {
    for (let [loader, r] of ALL_LOADERS) {
      if (r === resolved) return loader
    }
    return null
  }

  export function register(loadable) {
    const resolved = loadable.resolve()
    const loader = findByResolved(resolved)

    if (loader) return loader

    ALL_LOADERS.set(loadable.loader, resolved)
    return loadable.loader
  }

  export function preloadAll() {
    return Promise.all(
      Array.from(ALL_LOADERS.keys())
        .filter(loader => !LOADED.has(loader))
        .map(async loader => load(loader)),
    ).then(() => {
      /** If new loaders have been registered by loaded components, load them next. */
      if (ALL_LOADERS.size > LOADED.size) {
        return preloadAll()
      }
    })
  }

  export async function load(loader) {
    const componentModule = await loader()
    const component = componentModule.default || componentModule

    LOADED.set(loader, component)
    return component
  }

  let loadComponent = load
</script>

<script>
  import { onMount, getContext } from 'svelte'

  export let delay = 200
  export let timeout = null
  export let loader = null
  export let unload = false
  export let component = null
  export let error = null

  let load_timer = null
  let timeout_timer = null
  let state = STATES.INITIALIZED
  let componentProps
  let slots = $$props.$$slots

  $: {
    let { delay, timeout, loader, component, error, ...rest } = $$props
    componentProps = rest
  }

  const capture = getContext('svelte-loadable-capture')
  if (typeof capture === 'function' && ALL_LOADERS.has(loader)) {
    capture(loader)
  }

  function clearTimers() {
    clearTimeout(load_timer)
    clearTimeout(timeout_timer)
  }

  export async function load() {
    clearTimers()

    if (typeof loader !== 'function') {
      return
    }

    error = null
    component = null

    if (delay > 0) {
      state = STATES.INITIALIZED
      load_timer = setTimeout(() => {
        state = STATES.LOADING
      }, parseFloat(delay))
    } else {
      state = STATES.LOADING
    }

    if (timeout) {
      timeout_timer = setTimeout(() => {
        state = STATES.TIMEOUT
      }, parseFloat(timeout))
    }

    try {
      component = await loadComponent(loader)
      state = STATES.SUCCESS
    } catch (e) {
      state = STATES.ERROR
      error = e
      if (slots == null || slots.error == null) {
        throw e
      }
    }

    clearTimers()
  }

  if (LOADED.has(loader)) {
    state = STATES.SUCCESS
    component = LOADED.get(loader)
  } else {
    onMount(() => {
      load()
      if (unload && unload !== 'false') {
        return () => {
          LOADED.delete(loader)
          if (typeof unload === 'function') {
            unload()
          }
        }
      }
    })
  }
</script>

{#if state === STATES.ERROR}
  <slot name="error" {error} />
{:else if state === STATES.TIMEOUT}
  <slot name="timeout" />
{:else if state === STATES.LOADING}
  <slot name="loading" />
{:else if state === STATES.SUCCESS}
  {#if slots && slots.success}
    <slot name="success" {component} />
  {:else if slots && slots.default}
    <slot {component} />
  {:else}
    <svelte:component this={component} {...componentProps} />
  {/if}
{/if}
