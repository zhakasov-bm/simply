export function processIcon(icon: any) {
  if (typeof icon === 'object' && icon) {
    return {
      ...icon,
      url: icon.url || '',
      alt: icon.alt || '',
    }
  }
  return icon
}

export function processSubservicesWithIcons(subservices: any[]) {
  return subservices.map((sub) => ({
    ...sub,
    icon: processIcon(sub.icon),
  }))
}
