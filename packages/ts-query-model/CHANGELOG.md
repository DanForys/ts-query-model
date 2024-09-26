# Changelog

## [2.0.3](https://github.com/DanForys/ts-query-model/compare/v2.0.2...v2.0.3) (2024-09-26)


### Bug Fixes

* db drivers to top-level exports. Update docs. ([#48](https://github.com/DanForys/ts-query-model/issues/48)) ([3055d75](https://github.com/DanForys/ts-query-model/commit/3055d7596bcea108ae3609f8fe1d6d9fb261cde4))
* simplify package.json exports ([#50](https://github.com/DanForys/ts-query-model/issues/50)) ([89d64db](https://github.com/DanForys/ts-query-model/commit/89d64db2f967435ba139726e3de98a6fb4fcf00d))

## [2.0.2](https://github.com/DanForys/ts-query-model/compare/v2.0.1...v2.0.2) (2024-09-25)


### Bug Fixes

* doc updates ([#46](https://github.com/DanForys/ts-query-model/issues/46)) ([ddc9286](https://github.com/DanForys/ts-query-model/commit/ddc9286648d37ee96b966d9ec830da65b6e0c897))

## [2.0.1](https://github.com/DanForys/ts-query-model/compare/v2.0.0...v2.0.1) (2024-09-24)


### Bug Fixes

* column type aliases not exported correctly ([#44](https://github.com/DanForys/ts-query-model/issues/44)) ([80e87af](https://github.com/DanForys/ts-query-model/commit/80e87af66bdbf2e604aff20b3a65b05251486f15))

## [2.0.0](https://github.com/DanForys/ts-query-model/compare/v1.1.0...v2.0.0) (2024-09-24)


### ⚠ BREAKING CHANGES

* add insert query ([#42](https://github.com/DanForys/ts-query-model/issues/42))

### Features

* add insert query ([#42](https://github.com/DanForys/ts-query-model/issues/42)) ([2bc1433](https://github.com/DanForys/ts-query-model/commit/2bc1433519d3c1de1d02c26ce4fc11cc67896ed0))

## [1.1.0](https://github.com/DanForys/ts-query-model/compare/v1.0.1...v1.1.0) (2024-09-22)


### Features

* null validation checks ([#40](https://github.com/DanForys/ts-query-model/issues/40)) ([ec928ee](https://github.com/DanForys/ts-query-model/commit/ec928ee5ba886432289226b6ae714d3f89fbab6e))

## [1.0.1](https://github.com/DanForys/ts-query-model/compare/v1.0.0...v1.0.1) (2024-09-21)


### Bug Fixes

* remove mysql execute ([#38](https://github.com/DanForys/ts-query-model/issues/38)) ([f43d4b7](https://github.com/DanForys/ts-query-model/commit/f43d4b7c0f3b706c7fc75699868c6faacd268d8e))

## [1.0.0](https://github.com/DanForys/ts-query-model/compare/v0.7.2...v1.0.0) (2024-09-21)


### ⚠ BREAKING CHANGES

* get/getAll fns in columnSet ([#36](https://github.com/DanForys/ts-query-model/issues/36))

### Features

* get/getAll fns in columnSet ([#36](https://github.com/DanForys/ts-query-model/issues/36)) ([aa5d728](https://github.com/DanForys/ts-query-model/commit/aa5d728ec28590deb45a12da03ae358996208595))

## [0.7.2](https://github.com/DanForys/ts-query-model/compare/v0.7.1...v0.7.2) (2024-09-21)


### Bug Fixes

* ExtractRowType improvements ([#34](https://github.com/DanForys/ts-query-model/issues/34)) ([3b5778b](https://github.com/DanForys/ts-query-model/commit/3b5778badfaeb9c4092196304470b6018d7c59a6))

## [0.7.1](https://github.com/DanForys/ts-query-model/compare/v0.7.0...v0.7.1) (2024-09-20)


### Bug Fixes

* README ([#33](https://github.com/DanForys/ts-query-model/issues/33)) ([5e564f1](https://github.com/DanForys/ts-query-model/commit/5e564f196bf226fcf278c0c2ea60c448de796d27))
* separetely export db connection classes ([#31](https://github.com/DanForys/ts-query-model/issues/31)) ([75e2e57](https://github.com/DanForys/ts-query-model/commit/75e2e57fb5e63a6a6fc0e265614d21479b7ee209))

## [0.7.0](https://github.com/DanForys/ts-query-model/compare/v0.6.0...v0.7.0) (2024-08-29)


### Features

* columnSet builder ([#28](https://github.com/DanForys/ts-query-model/issues/28)) ([44421d1](https://github.com/DanForys/ts-query-model/commit/44421d1ed5a83fd18dca6f002f56b5c5247764b3))

## [0.6.0](https://github.com/DanForys/ts-query-model/compare/v0.5.1...v0.6.0) (2024-08-29)


### Features

* basic logging support ([#26](https://github.com/DanForys/ts-query-model/issues/26)) ([6ebbbbc](https://github.com/DanForys/ts-query-model/commit/6ebbbbc0357016969adfc81202eba4137b58acb2))

## [0.5.1](https://github.com/DanForys/ts-query-model/compare/v0.5.0...v0.5.1) (2024-08-29)


### Bug Fixes

* node &gt;16 support, bump mysql2 version ([632b2c7](https://github.com/DanForys/ts-query-model/commit/632b2c781357642c337e3542ca7ecb90bbb23554))
* node version &gt; 14 supported ([fcb66ee](https://github.com/DanForys/ts-query-model/commit/fcb66eea88e24eadaad0ec4565b713abd38b84b6))

## [0.5.0](https://github.com/DanForys/ts-query-model/compare/v0.4.5...v0.5.0) (2024-08-29)


### Features

* postgres support ([#22](https://github.com/DanForys/ts-query-model/issues/22)) ([a8a4ca0](https://github.com/DanForys/ts-query-model/commit/a8a4ca0d9ea6b843b4cb235e12ef91c3eb265379))

## [0.4.5](https://github.com/DanForys/ts-query-model/compare/v0.4.4...v0.4.5) (2024-08-28)


### Bug Fixes

* docs ([d7b7121](https://github.com/DanForys/ts-query-model/commit/d7b7121fa401badc6958716ca8ed8b9f88579c76))

## [0.4.4](https://github.com/DanForys/ts-query-model/compare/v0.4.3...v0.4.4) (2024-08-28)


### Bug Fixes

* update docs ([82ed613](https://github.com/DanForys/ts-query-model/commit/82ed6132d820af931936cf7a670be396214101de))

## [0.4.3](https://github.com/DanForys/ts-query-model/compare/v0.4.2...v0.4.3) (2024-08-28)


### Bug Fixes

* docs ([787d854](https://github.com/DanForys/ts-query-model/commit/787d854af756f354007507ec69f1db949387f18d))

## [0.4.2](https://github.com/DanForys/ts-query-model/compare/v0.4.1...v0.4.2) (2024-08-28)


### Bug Fixes

* docs ([e80fb4e](https://github.com/DanForys/ts-query-model/commit/e80fb4e833c9a1754b1130ce3578b24e982b5776))

## [0.4.1](https://github.com/DanForys/ts-query-model/compare/v0.4.0...v0.4.1) (2024-08-28)


### Bug Fixes

* package json version ([2aa1fbd](https://github.com/DanForys/ts-query-model/commit/2aa1fbd0f52bced959f391f49351b5aca3a01a3d))
