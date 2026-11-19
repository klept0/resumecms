// The labelled details line of an experience entry (issue #223), for a US
// federal (USAJOBS) or other formal resume: plain text with its labels, so
// a resume parser reads "Hours per week: 40" as written. Only the filled
// fields, in this order. EXPERIENCE_DETAIL_KEYS mirrors the server's
// (server/src/experienceDetails.js), which publicBlocks.js strips from a
// surface the entry's flag hides them on.
export const EXPERIENCE_DETAIL_FIELDS = [
  { key: 'hoursPerWeek', label: 'Hours per week' },
  { key: 'grade', label: 'Series and grade' },
  { key: 'salary', label: 'Salary' },
  { key: 'supervisor', label: 'Supervisor' },
  { key: 'contactSupervisor', label: 'May contact supervisor' },
];
export const EXPERIENCE_DETAIL_KEYS = EXPERIENCE_DETAIL_FIELDS.map((field) => field.key);
const CONTACT_ANSWERS = { yes: 'Yes', no: 'No' };

// [{ key, label, value }] for the fields with something to show, values
// trimmed; contactSupervisor only as 'yes'/'no' ('Yes'/'No').
export function experienceDetails(data) {
  const out = [];
  for (const { key, label } of EXPERIENCE_DETAIL_FIELDS) {
    const raw = data?.[key];
    if (typeof raw !== 'string') continue;
    const value = key === 'contactSupervisor' ? CONTACT_ANSWERS[raw.trim().toLowerCase()] : raw.trim();
    if (value) out.push({ key, label, value });
  }
  return out;
}

// Whether any detail is filled in (the editor's group summary).
export function hasExperienceDetails(data) {
  return experienceDetails(data).length > 0;
}
