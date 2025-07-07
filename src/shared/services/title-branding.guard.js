export const titleBrandingGuard = (to, from, next) => {
  const baseTitle = 'YourBono';
  document.title = `${baseTitle} | ${to.meta['title']}`;
  next();
}