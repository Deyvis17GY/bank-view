export const optimizedClasses =
  (styleObject: Record<string, string> = {}, className?: string) =>
  (...classList: string[]) =>
    classList.reduce((listClass, myClass) => {
      const list = className
        ? listClass + ' ' + className
        : listClass + ' ' + myClass

      let output = list
      if (list) output += ' '
      if (styleObject[myClass]) {
        output += styleObject[myClass]
      }

      return output
    }, '')
