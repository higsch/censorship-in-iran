const toBoolean = (s) => s.toLowerCase() === 'true' ? true : false;

const getStatus = (d) => {
  let status = [];
  if (d.awaiting_trial) status.push('awaiting_trial');
  if (d.furlough) status.push('furlough');
  if (d.in_exile) status.push('in_exile');
  if (d.in_prison) status.push('in_prison');
  if (d.killed) status.push('killed');
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
    released: toBoolean(d.released),
    suspended_sentence: toBoolean(d.suspended_sentence)
  };

  return {
    ...tmp,
    status: getStatus(tmp),
    none: true
  }
};
