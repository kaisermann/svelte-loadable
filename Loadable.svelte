<script>
  import { onMount } from 'svelte'

  const SLOTS = $$props.$$slots
  const STATES = Object.freeze({
    INITIALIZED: 0,
    LOADING: 1,
    SUCCESS: 2,
    ERROR: 3,
    TIMEOUT: 4,
  })

  export let delay = 0
  export let timeout = null
  export let loader = null
  export let component = null
  export let error = null

  let loadTimer = null
  let timeoutTimer = null
  let state = STATES.INITIALIZED

  const clearTimers = () => {
    clearTimeout(loadTimer)
    clearTimeout(timeoutTimer)
  }

  export const load = async () => {
    clearTimers()

    if (typeof loader !== 'function') {
      return
    }

    loadTimer = setTimeout(() => {
      state = STATES.LOADING
      error = null
      component = null
    }, parseFloat(delay))

    if (timeout) {
      timeoutTimer = setTimeout(() => {
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
  {#if SLOTS.success}
    <slot name="success" {component} />
  {:else}
    <svelte:component this={component} />
  {/if}
{/if}
