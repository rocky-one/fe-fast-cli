export const changeCustomTheme = (theme, root, classPrefix) => {
  if (root?.className) {
    const classNames = root.className.trim().split(' ');
    const findIndex = classNames.findIndex((name) => name.startsWith(classPrefix));
    if (findIndex !== -1) {
      classNames.splice(findIndex, 1, theme);
    } else {
      classNames.push(theme);
    }
    root.className = classNames.join(' ');
  } else {
    root.className = theme;
  }
};

export const changeElementTheme = (theme, root) => {
  if (root?.className) {
    const classNames = root.className
      .trim()
      .split(' ')
      .filter((name) => name !== 'dark');
    if (theme === 'dark') {
      classNames.push(theme);
    }
    root.className = classNames.join(' ');
  } else {
    root.className = theme;
  }
};
