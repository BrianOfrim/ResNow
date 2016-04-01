export class RsvpnowPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('rsvpnow-app p')).getText();
  }
}
