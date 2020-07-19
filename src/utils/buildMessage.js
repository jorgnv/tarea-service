export default (entity, action) => {
  if (action === 'list') {
    return `${entity}s ${action}ed`
  }

  return `${entity} ${action}d`
}
