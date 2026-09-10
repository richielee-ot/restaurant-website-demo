window.Restref = (function () {
  var STORAGE = {
    home: "restref.home",
    reservations: "restref.reservations",
    pages: "restref.floatingPages",
  };

  var DEFAULTS = {
    home:
      "<script type='text/javascript' src='//www.opentable.co.uk/widget/restref-v2/loader?rid=515106&widgetMode=floating&ot_source=Restaurant%20website'></" +
      "script>",
    reservations:
      "<script type='text/javascript' src='//www.opentable.co.uk/widget/restref-v2/loader?rid=515106&widgetMode=embedded&ot_source=Restaurant%20website'></" +
      "script>",
  };

  var DEFAULT_PAGES = {
    home: true,
    reservations: true,
    settings: true,
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

  function getPages() {
    try {
      var stored = window.localStorage.getItem(STORAGE.pages);
      if (stored) {
        var parsed = JSON.parse(stored);
        return {
          home: parsed.home !== false,
          reservations: parsed.reservations !== false,
          settings: parsed.settings !== false,
        };
      }
    } catch (error) {
      /* private mode or bad JSON */
    }
    return {
      home: DEFAULT_PAGES.home,
      reservations: DEFAULT_PAGES.reservations,
      settings: DEFAULT_PAGES.settings,
    };
  }

  function setPages(pages) {
    window.localStorage.setItem(
      STORAGE.pages,
      JSON.stringify({
        home: !!pages.home,
        reservations: !!pages.reservations,
        settings: !!pages.settings,
      })
    );
  }

  function resetPages() {
    window.localStorage.removeItem(STORAGE.pages);
    return getPages();
  }

  function currentSurface() {
    var file = (window.location.pathname.split("/").pop() || "index.html").toLowerCase();
    if (file === "" || file === "index.html") return "home";
    if (file === "reservations.html") return "reservations";
    if (file === "settings.html") return "settings";
    return "home";
  }

  function isFloatingEnabledHere() {
    return getPages()[currentSurface()] !== false;
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

  function write(page) {
    if (page === "home" && !isFloatingEnabledHere()) return;
    document.write(get(page));
  }

  return {
    DEFAULTS: DEFAULTS,
    get: get,
    set: set,
    reset: reset,
    getPages: getPages,
    setPages: setPages,
    resetPages: resetPages,
    inject: inject,
    write: write,
  };
})();
