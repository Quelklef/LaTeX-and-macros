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
    const testText = "ABCXYZ abcxyz !@#$%^&*()";

    return `
    <div class="preset">

      <div>
        <h3>${preset.name}</h3>
        <p>Enable preset: <input type="checkbox" class="enable-box" name="${preset.name}"></p>
      </div>

      <div class="cols">
        <div>
          <h4>Replacements</h4>

          <div class="peek replacements">
            <table>
              ${Object.entries(preset.replacements).map(([from, to]) => `
                <tr>
                  <td>${from}</td>
                  <td>&rarr;</td>
                  <td>${to}</td>
                </td>
              `).join('\n')}
            </table>
          </div>
        </div>

        <div>
          <h4>Commands</h4></td></tr>

          <div class="peek commands">
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
          </div>
        </div>
      </div>

    </div>`;
  }

  Array.from(document.getElementsByClassName('enable-box')).forEach($box => {

    chrome.storage.sync.get('enabled_presets', items => {
      $box.checked = items.enabled_presets.includes($box.name);
    });

    $box.addEventListener('click', function() {
      chrome.storage.sync.get('enabled_presets', items => {
        if ($box.checked && !items.enabled_presets.includes($box.name))
          chrome.storage.sync.set({ 'enabled_presets': items.enabled_presets.concat([$box.name]) });
        else if (!$box.checked && items.enabled_presets.includes($box.name))
          chrome.storage.sync.set({ 'enabled_presets': items.enabled_presets.remove($box.name) });
      });
    });

  });

});

