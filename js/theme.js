const metaColorScheme = document.querySelector('meta[name="color-scheme"]');
const fieldset = document.querySelector('fieldset');

fieldset.addEventListener('change', event => {
  colorScheme(event.target.value);
});

const theme = localStorage.getItem('color-scheme') ?? 'auto';

function colorScheme(theme) {
  metaColorScheme.setAttribute(
    'content',
    theme === 'auto' ? 'light dark' : theme,
  );

  localStorage.setItem('color-scheme', theme);

  const input = fieldset.querySelector(`[value="${theme}"]`);
  input.checked = true;
}

colorScheme(theme);
