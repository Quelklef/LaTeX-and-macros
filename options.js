// https://stackoverflow.com/a/3955096/4608364
Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

window.addEventListener('load', function() {

  const $presets = document.getElementById('presets');
  for (const preset of Object.values(presets)) {
    $presets.insertAdjacentHTML('beforeend', renderPreset(preset));
  }

  function renderPreset(preset) {
    const testText = "abc ABC 012 !@#";

    return `
    <div class="preset">

      <div class="accordian-title">
        <h3><input type="checkbox" class="enable-box" name="${preset.id}"> ${preset.name}</h3>
      </div>

      <div class="cols accordian-content">
        <div>
          <h4>Replacements</h4>

          <div class="peek replacements">
            ${Object.keys(preset.replacements).length === 0 ? 'No replacements.' : `
              <table>
                ${Object.entries(preset.replacements).map(([from, to]) => `
                  <tr>
                    <td>${from}</td>
                    <td>&rarr;</td>
                    <td>${to}</td>
                  </td>
                `).join('\n')}
              </table>
            `}
          </div>
        </div>

        <div>
          <h4>Commands</h4></td></tr>

          <div class="peek commands">
            ${Object.keys(preset.commands).length === 0 ? 'No commands.' : `
              <table>
                ${Object.entries(preset.commands).map(([name, cmd]) => `
                  <tr>
                    <td style="text-align: right">${name}{</td>
                    <td>${testText}</td>
                    <td>}</td>
                    <td>&rarr;</td>
                    <td>${cmd(testText)}</td>
                  </tr>
                `).join('\n')}
              </table>
            `}
          </div>
        </div>
      </div>

    </div>`;
  }

  Array.from(document.getElementsByClassName('enable-box')).forEach($box => {

    chrome.storage.sync.get('enabledPresets', items => {
      $box.checked = items.enabledPresets.includes($box.name);
    });

    $box.addEventListener('click', function(event) {
      chrome.storage.sync.get('enabledPresets', items => {
        if ($box.checked && !items.enabledPresets.includes($box.name))
          chrome.storage.sync.set({ 'enabledPresets': items.enabledPresets.concat([$box.name]) });
        else if (!$box.checked && items.enabledPresets.includes($box.name))
          chrome.storage.sync.set({ 'enabledPresets': items.enabledPresets.remove($box.name) });
      });

      // Don't proc accordian
      event.stopPropagation();
    });

  });

  Array.from(document.getElementsByClassName('accordian-title')).forEach($title => {
    $title.addEventListener('click', function() {
      if ($title.classList.contains('show-content'))
        $title.classList.remove('show-content');
      else
        $title.classList.add('show-content');
    });
  });


  const $customReplacements = document.getElementById('custom-replacements');
  chrome.storage.sync.get('customReplacements', items => {
    $customReplacements.value =
      Object.entries(items.customReplacements).map(([key, val]) =>
            key.replace('\\', '\\\\').replace('->', '-\\>') +
            " -> " +
            val.replace('\\', '\\\\').replace('->', '-\\>')
      ).join('\n');
  });

  $customReplacements.addEventListener('input', function() {
    chrome.storage.sync.set({ 'customReplacements': parseCustomReplacements($customReplacements.value) });
  });

  function parseCustomReplacements(text) {
    const result = {};
    for (const line of text.split('\n')) {
      if (!line.includes(' -> ')) continue;
      let [from, to] = line.split(' -> ');
      from = from.replace('-\\.>', '->').replace('\\\\', '\\');
      to = to.replace('-\\.>', '->').replace('\\\\', '\\');
      result[from] = to;
    }
    return result;
  }



  const $customCommands = document.getElementById('custom-commands');
  chrome.storage.sync.get('customCommands', items => {
    if (items.customCommands)
      $customCommands.value = items.customCommands;
  });

  $customCommands.addEventListener('input', function() {
    chrome.storage.sync.set({ 'customCommands': $customCommands.value });
  });


  const $timeout = document.getElementById('timeout');
  chrome.storage.sync.get('timeout', items => {
    $timeout.value = items.timeout;
  });
  $timeout.addEventListener('input', function() {
    chrome.storage.sync.set({ 'timeout': parseInt($timeout.value) });
  });

  const $lookbehind = document.getElementById('lookbehind');
  chrome.storage.sync.get('lookbehind', items => {
    $lookbehind.value = items.lookbehind;
  });
  $lookbehind.addEventListener('input', function() {
    chrome.storage.sync.set({ 'lookbehind': parseInt($lookbehind.value) });
  });


});

