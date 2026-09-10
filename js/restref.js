window.Restref = (function () {
  var STORAGE = {
    home: "restref.home",
    reservations: "restref.reservations",
  };

  var DEFAULTS = {
    home:
      "<script type='text/javascript' src='//www.opentable.co.uk/widget/restref-v2/loader?rid=515106&widgetMode=floating&ot_source=Restaurant%20website'></" +
      "script>",
    reservations:
      "<script type='text/javascript' src='//www.opentable.co.uk/widget/restref-v2/loader?rid=515106&widgetMode=embedded&ot_source=Restaurant%20website'></" +
      "script>",
  };

  function get(page) {
    try {
      var stored = window.localStorage.getItem(STORAGE[page]);
      if (stored && stored.trim()) return stored.trim();
    } catch (error) {
      /* private mode */
    }
    return DEFAULTS[page];
  }

  function set(page, html) {
    window.localStorage.setItem(STORAGE[page], html.trim());
  }

  function reset(page) {
    window.localStorage.removeItem(STORAGE[page]);
    return DEFAULTS[page];
  }

  function inject(mount, html) {
    if (!mount) return;
    mount.innerHTML = html;
    mount.querySelectorAll("script").forEach(function (oldScript) {
      var script = document.createElement("script");
      Array.prototype.forEach.call(oldScript.attributes, function (attr) {
        script.setAttribute(attr.name, attr.value);
      });
      script.textContent = oldScript.textContent;
      oldScript.replaceWith(script);
    });
  }

  function loadPage(page, mount) {
    inject(mount, get(page));
  }

  return {
    DEFAULTS: DEFAULTS,
    get: get,
    set: set,
    reset: reset,
    inject: inject,
    loadPage: loadPage,
  };
})();
