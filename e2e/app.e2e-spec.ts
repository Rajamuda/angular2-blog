import { Percobaan1Page } from './app.po';

describe('percobaan1 App', function() {
  let page: Percobaan1Page;

  beforeEach(() => {
    page = new Percobaan1Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
