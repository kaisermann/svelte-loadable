<script>
  import { onMount } from 'svelte'

  const STATES = Object.freeze({
    INITIALIZED: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
    TIMEOUT: 4,
  })

  export let delay = 200
  export let timeout = null
  export let loader = null
  export let component = null
  export let error = null

  let load_time = null
  let timeout_timer = null
  let state = STATES.INITIALIZED
  let componentProps
  let slots

  $: {
    let { $$slots, delay, timeout, loader, component, error, ...rest } = $$props
    slots = $$slots
    componentProps = rest
  }

  const clearTimers = () => {
    clearTimeout(load_time)
    clearTimeout(timeout_timer)
  }

  export const load = async () => {
    clearTimers()

    if (typeof loader !== 'function') {
      return
    }

    load_time = setTimeout(() => {
      state = STATES.LOADING
      error = null
      component = null
    }, parseFloat(delay))

    if (timeout) {
      timeout_timer = setTimeout(() => {
        state = STATES.TIMEOUT
      }, parseFloat(timeout))
    }

    try {
      const componentModule = await loader()
      state = STATES.SUCCESS
      component = componentModule.default || componentModule
    } catch (e) {
      state = STATES.ERROR
      error = e
    }

    clearTimers()
  }

  onMount(load)
</script>

{#if state === STATES.ERROR}
  <slot name="error" {error} />
{:else if state === STATES.TIMEOUT}
  <slot name="timeout" />
{:else if state === STATES.LOADING}
  <slot name="loading" />
{:else if state === STATES.SUCCESS}
  {#if slots && slots.success}
    <slot name="success" {component} props={$$props} />
  {:else}
    <svelte:component this={component} />
  {/if}
{/if}
