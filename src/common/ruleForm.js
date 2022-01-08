export const DEFAULT_EVENT_RULE = {
  type: 'event_rule',
  function: '',
  measure: {},
  params: [],
  time_params: [],
};
export const DEFAULT_RULE = {
  type: 'rules_relation',
  relation: 'and',
  rules: [],
};
export const GEN_DEFAULT_SINGLE_LAYER = (name, id) => ({
  name,
  id,
  note: '',
  relation: 'and',
  rules: [{}, {}],
  type: 'rules_relation',
});
export const DEFAULT_LAYERS = [GEN_DEFAULT_SINGLE_LAYER('分层1', 1)];
