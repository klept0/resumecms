// The matching resume preset offered after a landing preset (issue #219).
import assert from 'node:assert/strict';
import { test } from 'node:test';
import { offerQuestion, resumePresetOffer } from './presetOffer.js';

const presets = [
  { id: 'healthcare', label: 'Healthcare' },
  { id: 'trades', label: 'Trades' },
];
const resumes = [
  { id: 'r1', name: 'Work', isDefault: false },
  { id: 'r2', name: 'Main', isDefault: true },
];

test('no offer without a resumePreset', () => {
  assert.equal(resumePresetOffer({ id: 'consulting' }, presets, resumes), null);
  assert.equal(resumePresetOffer(null, presets, resumes), null);
  assert.equal(resumePresetOffer(undefined, presets, resumes), null);
});

test('no offer for an unknown resume preset', () => {
  assert.equal(resumePresetOffer({ resumePreset: 'writing' }, presets, resumes), null);
});

test('no offer without a default resume', () => {
  const none = resumes.map((r) => ({ ...r, isDefault: false }));
  assert.equal(resumePresetOffer({ resumePreset: 'trades' }, presets, none), null);
  assert.equal(resumePresetOffer({ resumePreset: 'trades' }, presets, null), null);
  assert.equal(resumePresetOffer({ resumePreset: 'trades' }, presets, undefined), null);
});

test('the preset and the default resume, otherwise', () => {
  const offer = resumePresetOffer({ resumePreset: 'trades' }, presets, resumes);
  assert.deepEqual(offer, { preset: presets[1], resume: resumes[1] });
});

test('the question names the preset and the resume', () => {
  const offer = resumePresetOffer({ resumePreset: 'healthcare' }, presets, resumes);
  assert.equal(offerQuestion(offer), 'Use the "Healthcare" preset on your resume "Main" too?');
});
