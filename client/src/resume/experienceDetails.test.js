import test from 'node:test';
import assert from 'node:assert/strict';
import { EXPERIENCE_DETAIL_FIELDS, EXPERIENCE_DETAIL_KEYS, experienceDetails, hasExperienceDetails } from './experienceDetails.js';
import { EXPERIENCE_DETAIL_KEYS as SERVER_KEYS } from '../../../server/src/experienceDetails.js';

test('details come out in field order with their labels', () => {
  const data = {
    contactSupervisor: 'no',
    supervisor: 'Jane Doe, (555) 555-0100',
    salary: '$85,000 per year',
    grade: 'GS-0343-11',
    hoursPerWeek: '40',
  };
  assert.deepEqual(experienceDetails(data), [
    { key: 'hoursPerWeek', label: 'Hours per week', value: '40' },
    { key: 'grade', label: 'Series and grade', value: 'GS-0343-11' },
    { key: 'salary', label: 'Salary', value: '$85,000 per year' },
    { key: 'supervisor', label: 'Supervisor', value: 'Jane Doe, (555) 555-0100' },
    { key: 'contactSupervisor', label: 'May contact supervisor', value: 'No' },
  ]);
  assert.deepEqual(EXPERIENCE_DETAIL_FIELDS.map((field) => field.key), EXPERIENCE_DETAIL_KEYS);
});

test('values are trimmed and blanks, whitespace and non-strings are dropped', () => {
  assert.deepEqual(experienceDetails({ hoursPerWeek: '  40  ', grade: '   ', salary: '', supervisor: 40, contactSupervisor: null }), [
    { key: 'hoursPerWeek', label: 'Hours per week', value: '40' },
  ]);
});

test('contactSupervisor shows only as Yes or No', () => {
  assert.equal(experienceDetails({ contactSupervisor: 'yes' })[0].value, 'Yes');
  assert.equal(experienceDetails({ contactSupervisor: 'YES ' })[0].value, 'Yes');
  assert.equal(experienceDetails({ contactSupervisor: 'no' })[0].value, 'No');
  assert.deepEqual(experienceDetails({ contactSupervisor: 'maybe' }), []);
  assert.deepEqual(experienceDetails({ contactSupervisor: '' }), []);
});

test('missing data gives no details', () => {
  assert.deepEqual(experienceDetails(undefined), []);
  assert.deepEqual(experienceDetails(null), []);
  assert.deepEqual(experienceDetails({}), []);
});

test('hasExperienceDetails reports whether anything is filled in', () => {
  assert.equal(hasExperienceDetails({}), false);
  assert.equal(hasExperienceDetails({ salary: '  ', contactSupervisor: 'maybe' }), false);
  assert.equal(hasExperienceDetails({ salary: '$1' }), true);
  assert.equal(hasExperienceDetails({ contactSupervisor: 'no' }), true);
});

test('client keys match the server list', () => {
  assert.deepEqual(EXPERIENCE_DETAIL_KEYS, SERVER_KEYS);
});
