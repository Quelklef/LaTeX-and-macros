
// https://stackoverflow.com/a/58589468/4608364
function escapeHtml(s) {
    return (s + '').replace(/[&<>"']/g, function (m) {
        return ({
            '&': '&amp;', '<': '&lt;', '>': '&gt;',
            '"': '&quot;', "'": '&#39;'
        })[m];
    });
}

window.addEventListener('load', () => {

  const $presets = document.getElementById('presets');
  for (const preset of Object.values(presets)) {
    $presets.insertAdjacentHTML('beforeend', renderPreset(preset));
  }

  function renderPreset(preset) {
    return `
      <div class="preset">

        <p class="accordian-title">
          <input type="checkbox" class="preset-checkmark" name="${preset.id}" /> <b>${preset.name}</b>
        </p>

        <div class="accordian-content peek">
          <table>
            ${preset.macros.map(macro => `
              <tr>
                <td><code>${escapeHtml(macro.example.in)}</code></td>
                <td>&rarr;</td>
                <td><code>${escapeHtml(macro.example.out)}</code></td>
              </td>
            `).join('\n')}
          </table>
        </div>

      </div>
    `;
  }

  Array.from(document.getElementsByClassName('preset-checkmark')).forEach($box => {

    chrome.storage.sync.get('enabledPresets', ({ enabledPresets }) => $box.checked = enabledPresets.includes($box.name));

    $box.addEventListener('click', function(event) {
      chrome.storage.sync.get('enabledPresets', ({ enabledPresets }) => {
        enabledPresets = enabledPresets.filter(p => p !== $box.name);
        if ($box.checked) enabledPresets.push($box.name);
        chrome.storage.sync.set({ 'enabledPresets': enabledPresets });
      });

      // Don't proc accordian
      event.stopPropagation();
    });

  });

  Array.from(document.getElementsByClassName('accordian-title')).forEach($title => {
    $title.addEventListener('click', () => {
      if ($title.classList.contains('show-content'))
        $title.classList.remove('show-content');
      else
        $title.classList.add('show-content');
    });
  });

  const $timeout = document.getElementById('timeout');
  chrome.storage.sync.get('timeout', ({ timeout }) => $timeout.value = timeout);
  $timeout.addEventListener('input', () => chrome.storage.sync.set({ timeout: parseInt($timeout.value) }));

  const $lookbehind = document.getElementById('lookbehind');
  chrome.storage.sync.get('lookbehind', ({ lookbehind }) => $lookbehind.value = lookbehind);
  $lookbehind.addEventListener('input', () => chrome.storage.sync.set({ lookbehind: parseInt($lookbehind.value) }));

  const $customMacros = document.getElementById('custom-macros');
  chrome.storage.sync.get('customMacros', ({ customMacros }) => $customMacros.value = customMacros);
  $customMacros.addEventListener('input', () => chrome.storage.sync.set({ customMacros: $customMacros.value }));

});
  
