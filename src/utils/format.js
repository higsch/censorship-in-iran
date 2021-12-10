import { utcParse } from 'd3';

const toBoolean = (s) => s.toLowerCase() === 'true' ? true : false;

const parseLastUpdate = (s) => utcParse('%Y-%m-%d')(s);
const parseModifiedDate = (s) => utcParse('%Y-%m-%d %H:%M')(s);

const getStatus = (d) => {
  let status = [];
  
  if (d.awaiting_trial) status.push('awaiting_trial');
  if (d.furlough) status.push('furlough');
  if (d.in_exile) status.push('in_exile');
  if (d.in_prison) status.push('in_prison');
  if (d.killed) status.push('killed');
  if (d.dead) status.push('dead');
  if (d.released) status.push('released');
  if (d.suspended_sentence) status.push('suspended_sentence');

  if (status.length === 0) status.push('unknown');

  return status.join(';');
};

export const formatData = (d) => {
  const tmp = {
    ...d,
    awaiting_trial: toBoolean(d.awaiting_trial),
    furlough: toBoolean(d.furlough),
    in_exile: toBoolean(d.in_exile),
    in_prison: toBoolean(d.in_prison),
    killed: toBoolean(d.killed),
    dead: toBoolean(d.dead),
    released: toBoolean(d.released),
    suspended_sentence: toBoolean(d.suspended_sentence)
  };

  return {
    ...tmp,
    status: getStatus(tmp),
    none: true,
    gender: tmp.gender ? tmp.gender.toLowerCase() : null,
    occupation: tmp.occupation === 'N/A' ? null : tmp.occupation.replace(/\s/g, '_').toLowerCase(),
    institutioninvestigating: tmp.institutioninvestigating === 'N/A' ? null : tmp.institutioninvestigating.replace(/\s/g, '_').toLowerCase(),
    province: tmp.province === 'N/A' ? null : tmp.province.replace(/\s/g, '_').toLowerCase(),
    ethnicgroup: tmp.ethnicgroup === 'N/A' ? null : tmp.ethnicgroup.replace(/\s/g, '_').toLowerCase(),
    religoiusgroup: tmp.religoiusgroup === 'N/A' ? null : tmp.religoiusgroup.replace(/\s/g, '_').toLowerCase(),
    intro_en: tmp.intro_en === 'N/A' ? null : tmp.intro_en,
    intro_fa: tmp.intro_fa === 'N/A' ? null : tmp.intro_fa,
    bio_en: tmp.bio_en === 'N/A' ? null : tmp.bio_en,
    bio_fa: tmp.bio_fa === 'N/A' ? null : tmp.bio_fa,
    twitter: tmp.twitter === 'N/A' ? null : tmp.twitter.replace(/@/g, ''),
    blog_link: tmp.blog_link === 'N/A' ? null : tmp.blog_link,
    career_en: tmp.career_en === 'N/A' ? null : tmp.career_en,
    career_fa: tmp.career_fa === 'N/A' ? null : tmp.career_fa,
    sentence_en: tmp.sentence_en === 'N/A' ? null : tmp.sentence_en,
    sentence_fa: tmp.sentence_fa === 'N/A' ? null : tmp.sentence_fa,
    organisation_name_en: tmp.organisation_name_en === 'N/A' ? null : tmp.organisation_name_en,
    organisation_name_fa: tmp.organisation_name_fa === 'N/A' ? null : tmp.organisation_name_fa,
    last_update: tmp.last_update ? parseLastUpdate(tmp.last_update) : null,
    modified_date: tmp.modified_date ? parseModifiedDate(tmp.modified_date) : null
  }
};
