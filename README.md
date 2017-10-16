marked-vega
[![GitHub release](https://img.shields.io/github/release/PolymerVis/marked-vega.svg)](https://github.com/PolymerVis/marked-vega/releases)
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/PolymerVis/marked-vega)
[![styled with prettier](https://img.shields.io/badge/styled_with-prettier-ff69b4.svg)](https://github.com/prettier/prettier)
==========

<!---
```
<custom-element-demo>
  <template>
    <link rel="import" href="marked-vega.html">
    <link rel="import" href="../marked-element/marked-element.html">
    <next-code-block></next-code-block>
  </template>
</custom-element-demo>
```
-->
```html
<marked-element>
  <marked-vega slot="markdown-html"></marked-vega>
  <script type="text/markdown" src="demo/demo.md"></script>
</marked-element>
```

`marked-vega` is an add-on element for
[`marked-element`](https://www.webcomponents.org/element/PolymerElements/marked-element)
to render [Vega](https://vega.github.io/vega) and
[Vega-Lite](https://vega.github.io/vega-lite) charts in markdown documents with
[`vega-element`](https://www.webcomponents.org/element/PolymerElements/vega-element).

More API documentation and demos can be found on
[the web components page for `marked-vega`](https://www.webcomponents.org/element/PolymerVis/marked-vega).

## Disclaimer
PolymerVis is a personal project and is NOT in any way affliated with Vega,
Vega-Lite, Polymer or Google.

## Installation

```
bower install --save PolymerVis/marked-vega
```

## Markdown Syntax
`marked-vega` introduces a few new markdown syntax.  

### 1. Image markdown
Syntax
~~~~
![vg|vega|vega-lite|vl](https://someurl/spec.json)
~~~~
Example
~~~~
![vega](barchart-vg.json)
~~~~

### 2. Code markdown
Syntax
~~~~
```vg|vega|vega-lite|vl
<Vega/Vega-Lite JSON specification>
or
<Vega/Vega-Lite JSON specification in YAML format>
```
~~~~
Example - JSON specification
~~~~
```vega-lite
{
  "data": {
    "values": [
      {"a": "A","b": 28}, {"a": "B","b": 55}, {"a": "C","b": 43},
      {"a": "D","b": 91}, {"a": "E","b": 81}, {"a": "F","b": 53},
      {"a": "G","b": 19}, {"a": "H","b": 87}, {"a": "I","b": 52}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal"},
    "y": {"field": "b", "type": "quantitative"}
  }
}
```
~~~~

Example - YAML specification
~~~~
```vega-lite
data:
  values:
    - x: A
      y: 13
    - x: B
      y: 55
    - x: C
      y: 43
    - x: D
      y: 91      
    - x: E
      y: 81      
    - x: F
      y: 53      
    - x: G
      y: 19      
    - x: H
      y: 87      
    - x: I
      y: 52      
mark:
  bar
encoding:
  x:
    field: x
    type: ordinal
  y:
    field: y
    type: quantitative
```
~~~~

## Basic usage
`marked-vega` enable parsing and rendering of Vega/Vega-Lite charts by updating
the `renderer` attribute of the parent `marked-element` and adding a few new
rules to the [`marked`](https://github.com/chjj/marked) markdown parser and
compiler.  

The easiest way to use `marked-vega` is to replace it as the default slot element
when using `marked-element`.  

**Before**  
```html
<marked-element>
  <div slot="markdown-html"></div>
  <script type="text/markdown" src="../guidelines.md"></script>
</marked-element>
```
**After**  
```html
<marked-element>
  <marked-vega slot="markdown-html"></marked-vega>
  <script type="text/markdown" src="demo/demo.md"></script>
</marked-element>
```

Please look at the
[the webcomponents page for `marked-element`](https://www.webcomponents.org/element/PolymerElements/marked-element)
for other ways of using `marked-element`.

## Custom renderer
Alternatively if you wish to use to further customize the `renderer` for
`marked-element`, you can used the provided `renderers`:
- `PolymerVis.marked.CodeRendererVega` modifies the rules for the `code` markdown
- `PolymerVis.marked.ImageRendererVega` modifies the rules for the `image` markdown
- `PolymerVis.marked.RendererVega` modifies the rules for the `code` and `image` markdown   

Each `renderer` is a function of the form `function(renderer) { ... return renderer; }`.

**Example**
```javascript
this.customRenderer = function(renderer) {
  // other customized renderer codes
  ...
  // return vega renderer codes
  return PolymerVis.marked.RendererVega(renderer);
};
```
```html
<marked-element renderer="[[customRenderer]]">
  <marked-vega slot="markdown-html"></marked-vega>
  <script type="text/markdown" src="demo/demo.md"></script>
</marked-element>
```
