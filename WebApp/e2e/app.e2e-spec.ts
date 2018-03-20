import { SimpleEventCreationPage } from './app.po';

describe('simple-event-creation App', () => {
  let page: SimpleEventCreationPage;

  beforeEach(() => {
    page = new SimpleEventCreationPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
