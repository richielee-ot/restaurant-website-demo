(function () {
  var DEFAULT_DOMAIN = "www.opentable.co.uk";
  var DEFAULT_RID = "515106";
  var DEFAULT_MODE = "floating";
  var DEFAULT_SOURCE = "Restaurant website";

  var mount = document.getElementById("restref-mount");
  var preview = document.getElementById("snippet-preview");
  var statusEl = document.getElementById("status");
  var snippetField = document.getElementById("snippet");
  var ridField = document.getElementById("rid");
  var modeField = document.getElementById("widgetMode");
  var domainField = document.getElementById("domain");

  function defaultSnippet() {
    return buildSnippet(DEFAULT_RID, DEFAULT_MODE, DEFAULT_DOMAIN);
  }

  function buildSnippet(rid, widgetMode, domain) {
    var src =
      "//" +
      domain +
      "/widget/restref-v2/loader?rid=" +
      encodeURIComponent(rid) +
      "&widgetMode=" +
      encodeURIComponent(widgetMode) +
      "&ot_source=" +
      encodeURIComponent(DEFAULT_SOURCE);
    return (
      "<script type=\"text/javascript\" src='" + src + "'></" + "script>"
    );
  }

  function snippetFromParams(params) {
    var rid = params.get("rid");
    if (!rid) return null;
    var widgetMode = params.get("widgetMode") || DEFAULT_MODE;
    var domain = params.get("domain") || DEFAULT_DOMAIN;
    return {
      html: buildSnippet(rid, widgetMode, domain),
      rid: rid,
      widgetMode: widgetMode,
      domain: domain,
    };
  }

  function setStatus(message) {
    statusEl.textContent = message;
  }

  function injectSnippet(html) {
    mount.innerHTML = html;
    mount.querySelectorAll("script").forEach(function (oldScript) {
      var script = document.createElement("script");
      Array.prototype.forEach.call(oldScript.attributes, function (attr) {
        script.setAttribute(attr.name, attr.value);
      });
      script.textContent = oldScript.textContent;
      oldScript.replaceWith(script);
    });
    preview.textContent = html.trim();
    snippetField.value = html.trim();
  }

  function shareableUrl(rid, widgetMode, domain) {
    var url = new URL(window.location.href);
    url.searchParams.set("rid", rid);
    url.searchParams.set("widgetMode", widgetMode);
    if (domain && domain !== DEFAULT_DOMAIN) {
      url.searchParams.set("domain", domain);
    } else {
      url.searchParams.delete("domain");
    }
    return url.toString();
  }

  function fillFields(rid, widgetMode, domain) {
    ridField.value = rid;
    modeField.value = widgetMode;
    domainField.value = domain;
  }

  document.getElementById("params-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var rid = ridField.value.trim();
    var widgetMode = modeField.value.trim() || DEFAULT_MODE;
    var domain = domainField.value.trim() || DEFAULT_DOMAIN;
    if (!rid) {
      setStatus("Add a restaurant ID (rid) first.");
      return;
    }
    window.location.assign(shareableUrl(rid, widgetMode, domain));
  });

  document.getElementById("paste-form").addEventListener("submit", function (event) {
    event.preventDefault();
    var html = snippetField.value.trim();
    if (!html) {
      setStatus("Paste a restref <script> snippet first.");
      return;
    }
    injectSnippet(html);
    setStatus("Loaded pasted snippet. This is session-only and is not stored.");
  });

  document.getElementById("copy-link").addEventListener("click", function () {
    var rid = ridField.value.trim() || DEFAULT_RID;
    var widgetMode = modeField.value.trim() || DEFAULT_MODE;
    var domain = domainField.value.trim() || DEFAULT_DOMAIN;
    var url = shareableUrl(rid, widgetMode, domain);
    navigator.clipboard.writeText(url).then(
      function () {
        history.replaceState(null, "", url);
        setStatus("Copied shareable link.");
      },
      function () {
        setStatus("Copy failed. Select and copy this URL: " + url);
      }
    );
  });

  var fromUrl = snippetFromParams(new URLSearchParams(window.location.search));
  if (fromUrl) {
    fillFields(fromUrl.rid, fromUrl.widgetMode, fromUrl.domain);
    injectSnippet(fromUrl.html);
    setStatus("Loaded restref-v2 from the URL.");
  } else {
    fillFields(DEFAULT_RID, DEFAULT_MODE, DEFAULT_DOMAIN);
    injectSnippet(defaultSnippet());
    setStatus("Loaded the default restref snippet.");
  }
})();
