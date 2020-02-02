import { render as testRender, wait } from '@testing-library/svelte'

import App from './fixtures/App.svelte'

function render(loadableProps) {
  return testRender(App, {
    props: {
      loadableProps,
    },
  })
}

test('renders a dynamic component', async () => {
  const { getByText } = render({
    loader: () => import('./fixtures/Component.svelte'),
  })

  await wait(
    () => {
      expect(getByText('Dynamic Component')).toBeInTheDocument()
    },
    { timeout: 500 },
  )
})

test('renders a dynamic component with passed props', async () => {
  const { getByText } = render({
    loader: () => import('./fixtures/Component.svelte'),
    phrase: 'Custom prop',
  })

  await wait(
    () => {
      expect(getByText('Custom prop')).toBeInTheDocument()
    },
    { timeout: 500 },
  )
})
