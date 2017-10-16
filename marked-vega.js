(function() {
  var PolymerVis = {
    marked: {
      CodeRendererVega: codeRendererVega,
      ImageRendererVega: imageRendererVega,
      RendererVega: renderer => imageRendererVega(codeRendererVega(renderer))
    }
  };

  /* global module */
  if (typeof module !== 'undefined' && typeof module.exports !== 'undefined')
    module.exports = PolymerVis;
  else window.PolymerVis = Object.assign(window.PolymerVis || {}, PolymerVis);

  /**
   * Function to overwrite `marked.Renderer.image`. Takes in URL to the Vega or
   * Vega-Lite spec and return `vega-element` to display the chart.
   * @param {marked.Renderer} renderer
   * @return {marked.Renderer}
   */
  function imageRendererVega(renderer) {
    if (!renderer) return;
    // retain original renderer.image
    var defaultImageRenderer = renderer.image.bind(renderer);

    renderer.image = function(href, title, text) {
      // if image source is a file with .json, assume it is a vega/vega-lite spec
      var ext = href
        .split('.')
        .pop()
        .trim()
        .toLowerCase();

      var mode = text && text.trim().toLowerCase();

      if (
        ext === 'json' &&
        ['vega-lite', 'vl', 'vegalite'].indexOf(mode) >= 0
      ) {
        return `<vega-element hover tooltip vega-lite-spec-url='${href}'></vega-element>`;
      }
      if (ext === 'json' && ['vega', 'vg'].indexOf(mode) >= 0) {
        return `<vega-element hover tooltip vega-spec-url='${href}'></vega-element>`;
      }
      return defaultImageRenderer(href, title, text);
    };

    return renderer;
  }

  /**
   * Function to overwrite `marked.Renderer.code`. Parse either JSON or YAML
   * strings and return `vega-element` to display the chart.
   * @param {marked.Renderer} renderer
   * @return {marked.Renderer}
   */
  function codeRendererVega(renderer) {
    if (!renderer) return;
    // retain original renderer.code
    var defaultCodeRenderer = renderer.code.bind(renderer);

    renderer.code = function(code, lang) {
      if (lang === 'vega-lite') {
        try {
          let spec = JSON.stringify(JSON.parse(code));
          return `<vega-element hover tooltip vega-lite-spec='${spec}'></vega-element>`;
        } catch (err1) {
          try {
            let spec = JSON.stringify(YAML.parse(code));
            return `<vega-element hover tooltip vega-lite-spec='${spec}'></vega-element>`;
          } catch (err2) {
            console.warn(err1);
            console.warn(err2);
          }
        }
      }

      if (lang === 'vega') {
        try {
          let spec = JSON.stringify(JSON.parse(code));
          return `<vega-element hover tooltip vega-spec='${spec}'></vega-element>`;
        } catch (err1) {
          try {
            let spec = JSON.stringify(YAML.parse(code));
            return `<vega-element hover tooltip vega-spec='${spec}'></vega-element>`;
          } catch (err2) {
            console.warn(err1);
            console.warn(err2);
          }
        }
      }
      return defaultCodeRenderer(code, lang);
    };

    return renderer;
  }
})();
