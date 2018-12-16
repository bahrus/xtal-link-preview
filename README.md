[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-link-preview)

<a href="https://nodei.co/npm/xtal-link-preview/"><img src="https://nodei.co/npm/xtal-link-preview.png"></a>

# \<xtal-link-preview\>

xtal-link-preview comes with default styling.  xtal-link-preview-base allows you to provide your own styling.

Provide preview of URL. 

## Syntax:

<!--
```
<custom-element-demo>
<template>
    <div>
        <wc-info package-name="npm install p-d.p-u" href="https://unpkg.com/xtal-link-preview@0.0.37/web-components.json"></wc-info>
        <script type="module" src="https://unpkg.com/wc-info@0.0.13/wc-info.js?module"></script>
    </div>
</template>
</custom-element-demo>
```
-->

```html
<xtal-link-preview preview href="https://onsen.io"></xtal-link-preview>
```

Try altering the href attribute below

<!--
```
<custom-element-demo>
  <template>
  <div>
    <script src="https://unpkg.com/@webcomponents/webcomponentsjs/webcomponents-loader.js"></script>
    <script type="module" src="https://cdn.jsdelivr.net/npm/xtal-link-preview@0.0.36/dist/xtal-link-preview.iife.js"></script>
    <h3>Basic xtal-link-preview demo</h3>
    <xtal-link-preview preview href="https://onsen.io"></xtal-link-preview>
  </div>
    </template>
</custom-element-demo>
```
-->

## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) and npm (packaged with [Node.js](https://nodejs.org)) installed. Run `npm install` to install your element's dependencies, then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
