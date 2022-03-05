# [2.0.0](https://github.com/kaisermann/svelte-loadable/compare/v1.5.1...v2.0.0) (2022-03-05)


### Features

* pass retry method to error slot ([f798b08](https://github.com/kaisermann/svelte-loadable/commit/f798b08dd9a76c0fe15002be34cb7a4ea06ca5b3))



## [1.5.1](https://github.com/kaisermann/svelte-loadable/compare/v1.5.0...v1.5.1) (2020-12-17)


### Bug Fixes

* make onMount sync and suppress load event when un-mounted ([#40](https://github.com/kaisermann/svelte-loadable/issues/40)) ([50ff154](https://github.com/kaisermann/svelte-loadable/commit/50ff154309d370631b738f0fe0107daaf3e4b0e8))



# [1.5.0](https://github.com/kaisermann/svelte-loadable/compare/v1.4.0...v1.5.0) (2020-05-12)


### Features

* create callback event after component loads ([#28](https://github.com/kaisermann/svelte-loadable/issues/28)) ([1b8609b](https://github.com/kaisermann/svelte-loadable/commit/1b8609b0c7124671f4aad06241ca1c703be5738e))



# [1.4.0](https://github.com/kaisermann/svelte-loadable/compare/v1.3.2...v1.4.0) (2020-01-18)


### Features

* add ability to unload component and optionally callback ([#23](https://github.com/kaisermann/svelte-loadable/issues/23)) ([086880c](https://github.com/kaisermann/svelte-loadable/commit/086880cc0517669511797bc5389c1a291e1ead68))



## [1.3.2](https://github.com/kaisermann/svelte-loadable/compare/v1.3.1...v1.3.2) (2020-01-14)


### Bug Fixes

* 🐛 slot check ([619bf51](https://github.com/kaisermann/svelte-loadable/commit/619bf516a96bead547f4e42afdeb30299d635354))



## [1.3.1](https://github.com/kaisermann/svelte-loadable/compare/v1.3.0...v1.3.1) (2019-12-10)


### Bug Fixes

* if no error slot provided throw error so an error is shown in console ([#22](https://github.com/kaisermann/svelte-loadable/issues/22)) ([d5d0139](https://github.com/kaisermann/svelte-loadable/commit/d5d013901f5c9b550c10e5ec8cefa287fac77811))



# [1.3.0](https://github.com/kaisermann/svelte-loadable/compare/v1.2.0...v1.3.0) (2019-09-17)


### Features

* add loader cache ([#15](https://github.com/kaisermann/svelte-loadable/issues/15)) ([43d26cf](https://github.com/kaisermann/svelte-loadable/commit/43d26cfc2dcfc4e1ad1e4b352ed4a82c44043b63))
* only delay setting state to LOADING if delay is > 0, and reset defaults on reload ([b5e70fe](https://github.com/kaisermann/svelte-loadable/commit/b5e70fe0ac40c4378c05c4e3d1408dd2804b448d))



# [1.2.0](https://github.com/kaisermann/svelte-loadable/compare/v1.1.1...v1.2.0) (2019-09-09)


### Features

* 🎸 make loading happen before `onMount` ([5213bb0](https://github.com/kaisermann/svelte-loadable/commit/5213bb0065f8e7d541db830deb4664f778f9e0e9)), closes [#12](https://github.com/kaisermann/svelte-loadable/issues/12)



## [1.1.1](https://github.com/kaisermann/svelte-loadable/compare/v1.0.2...v1.1.1) (2019-09-04)


### Bug Fixes

* 🐛 pass props to rendered component when not using slots ([607b7a2](https://github.com/kaisermann/svelte-loadable/commit/607b7a23aa239eb5d6f372b8fe5107a4860b8f44))


### Features

* Pass props down to loaded component ([09fefbd](https://github.com/kaisermann/svelte-loadable/commit/09fefbdf4a0db55a49fa45bf778b61a8df23ebf5))



## [1.0.2](https://github.com/kaisermann/svelte-loadable/compare/v1.0.0...v1.0.2) (2019-07-25)


### Bug Fixes

* check if SLOTS exists before checking for a specific slot ([d3c82ba](https://github.com/kaisermann/svelte-loadable/commit/d3c82ba2c08b3a2d951ee6a7c048a3dfabef6f63))



# [1.0.0](https://github.com/kaisermann/svelte-loadable/compare/7918ae2f44fe8e67c003da1d2ad33b450a2cf06b...v1.0.0) (2019-07-25)


### Features

* 🎸 Update to svelte v3 ([7918ae2](https://github.com/kaisermann/svelte-loadable/commit/7918ae2f44fe8e67c003da1d2ad33b450a2cf06b))


### BREAKING CHANGES

* 🧨 will not support svelte v2 anymore



