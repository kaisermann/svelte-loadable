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

  function findByResolved(resolved) {
    for (const [loader, r] of ALL_LOADERS) {
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
        .filter((loader) => !LOADED.has(loader))
        .map((loader) => loadComponent(loader)),
    ).then(() => {
      /** If new loaders have been registered by loaded components, load them next. */
      if (ALL_LOADERS.size > LOADED.size) {
        return preloadAll()
      }
    })
  }

  async function loadComponent(loader, unloader) {
    const componentModule = await loader()
    const component = componentModule.default || componentModule

    if (!unloader) {
      LOADED.set(loader, component)
    }

    return component
  }
</script>

<script>
  import { onMount, getContext, createEventDispatcher } from 'svelte'

  export let delay = 200
  export let timeout = null
  export let loader = null
  export let unloader = false
  export let component = null
  export let error = null

  const slots = $$props.$$slots

  let load_timer = null
  let timeout_timer = null
  let state = STATES.INITIALIZED
  let componentProps
  let mounted = false

  $: {
    // eslint-disable-next-line no-shadow
    const { delay, timeout, loader, component, error, ...rest } = $$props

    componentProps = rest
  }

  const dispatch = createEventDispatcher()

  const capture = getContext('svelte-loadable-capture')

  if (typeof capture === 'function' && ALL_LOADERS.has(loader)) {
    capture(loader)
  }

  function clearTimers() {
    clearTimeout(load_timer)
    clearTimeout(timeout_timer)
  }

  async function load() {
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
      component = await loadComponent(loader, unloader)
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
      mounted = true
      load().then(() => {
        if (mounted) {
          dispatch('load')
        }
      })

      return () => {
        mounted = false
        if (typeof unloader === 'function') {
          unloader()
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
    <slot {component} retry={load} />
  {:else}
    <svelte:component this={component} {...componentProps} />
  {/if}
{/if}
