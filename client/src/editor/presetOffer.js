// After a landing preset is applied (issue #219): the matching resume preset
// to offer for the default resume, if the landing preset names one
// (`resumePreset` in its template.json) that exists and there's a default
// resume. Returns { preset, resume } or null. Only an offer: the landing
// editor asks, and applies it to the resume's draft only on a yes.
export function resumePresetOffer(landingPreset, resumePresets, resumes) {
  const id = landingPreset?.resumePreset;
  if (!id) return null;
  const preset = resumePresets.find((p) => p.id === id);
  const resume = (resumes || []).find((r) => r.isDefault);
  return preset && resume ? { preset, resume } : null;
}

// The banner's question.
export function offerQuestion({ preset, resume }) {
  return `Use the "${preset.label}" preset on your resume "${resume.name}" too?`;
}
