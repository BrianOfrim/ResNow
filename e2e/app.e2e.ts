import { RsvpnowPage } from './app.po';

describe('rsvpnow App', function() {
  let page: RsvpnowPage;

  beforeEach(() => {
    page = new RsvpnowPage();
  })

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('rsvpnow Works!');
  });
});
