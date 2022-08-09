/**
 * This file is imported in Stencil's `globalScript` config option.
 *
 * @see {@link https://stenciljs.com/docs/config#globalscript Stencil's globalScript property}
 */
export default function (): void {
  if (isBrowser()) {
    document.body.dispatchEvent(new CustomEvent("myThemeChange", { bubbles: true, detail: { theme: "light" } }));
  }
}

const isBrowser = new Function("try {return this===window;}catch(e){ return false;}");
