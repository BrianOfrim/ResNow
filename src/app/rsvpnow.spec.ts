import {describe, it, expect, beforeEachProviders, inject} from 'angular2/testing';
import {RsvpnowApp} from '../app/rsvpnow';

beforeEachProviders(() => [RsvpnowApp]);

describe('App: Rsvpnow', () => {
  it('should have the `defaultMeaning` as 42', inject([RsvpnowApp], (app: RsvpnowApp) => {
    expect(app.defaultMeaning).toBe(42);
  }));

  describe('#meaningOfLife', () => {
    it('should get the meaning of life', inject([RsvpnowApp], (app: RsvpnowApp) => {
      expect(app.meaningOfLife()).toBe('The meaning of life is 42');
      expect(app.meaningOfLife(22)).toBe('The meaning of life is 22');
    }));
  });
});

