import { newE2EPage } from '@stencil/core/testing';

describe('myThemeChange emits on page load', () => {
  it("attempt #1", async () => {
    const page = await newE2EPage();
    await page.setContent('<my-component></my-component>');

    const myThemeChangeSpy = await page.spyOnEvent("myThemeChange");
    await page.waitForChanges();

    expect(myThemeChangeSpy).toHaveReceivedEventTimes(1);
    expect(myThemeChangeSpy.lastEvent.detail.theme).toBe("light");
  });

  it("attempt #2", async () => {
    const page = await newE2EPage();
    await page.setContent('<my-component></my-component>');

    const emitted = await page.evaluate(() => {
      const emittedEvents = [];
      document.addEventListener("myThemeChange", (event) => emittedEvents.push(event));
      return emittedEvents;
    });

    expect(emitted).toHaveLength(1);
    expect(emitted[0].detail.theme).toBe("light");
  });
})

describe('my-component', () => {
  it('renders', async () => {
    const page = await newE2EPage();

    await page.setContent('<my-component></my-component>');
    const element = await page.find('my-component');
    expect(element).toHaveClass('hydrated');
  });

  it('renders changes to the name data', async () => {
    const page = await newE2EPage();

    await page.setContent('<my-component></my-component>');
    const component = await page.find('my-component');
    const element = await page.find('my-component >>> div');
    expect(element.textContent).toEqual(`Hello, World! I'm `);

    component.setProperty('first', 'James');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James`);

    component.setProperty('last', 'Quincy');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Quincy`);

    component.setProperty('middle', 'Earl');
    await page.waitForChanges();
    expect(element.textContent).toEqual(`Hello, World! I'm James Earl Quincy`);
  });
});
