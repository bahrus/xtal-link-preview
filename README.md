[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/bahrus/xtal-link-preview)

# \<xtal-link-preview\>

Open URL Preview.  To achieve similar affects as seen on twitter, slack, and other sites, \<xtal-link-preview\> will get some metadata from the url and display a brief summary.

To use:

1)  Reference the library: 

```html
<link rel="import" href="xtal-link-preview.html">
```

or

```html
<script async src="xtal-link-preview.js">
```

or

```html
<script async type="module" src="xtal-link-preview.js">
```

2)  Add the tag with the desired url:

```html
<xtal-link-preview href="http://www.theonion.com/"></xtal-link-preview>
```


Example:

<!--
```
<custom-element-demo>
  <template>
    <link rel="import" href="xtal-link-preview.html">
    <xtal-link-preview  href="http://www.theonion.com/">
  </template
</custom-element-demo>
```
-->
```html
<xtal-link-preview  href="http://www.theonion.com/"></xtl-link-preview>
``` 
## Install the Polymer-CLI

First, make sure you have the [Polymer CLI](https://www.npmjs.com/package/polymer-cli) installed. Then run `polymer serve` to serve your element locally.

## Viewing Your Element

```
$ polymer serve
```

## Running Tests

```
$ polymer test
```

Your application is already set up to be tested via [web-component-tester](https://github.com/Polymer/web-component-tester). Run `polymer test` to run your application's test suite locally.
