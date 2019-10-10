export * from 'components/queries'
/* -------------------------------------------------------------------------------------
 * Assess base uses a form of the createGroup query which takes a non-null parentId arg.
 * There is a corresponding version of createGroup in components/queries which doesn't 
 * take a parentId arg. This is the version that was originally in knowledge base, as
 * KB at the time of writing doesn't specify group parent IDs when creating groups.
 * Ideally, the components package should provide a standard version of createGroup that
 * both AB and KB can use, but a decision first needs to be made about what parent ID
 * values KB should use when creating groups.
 * -------------------------------------------------------------------------------------
 */
export { default as createGroupMutation } from './groups/create-group.graphql'
export * from './assessments'
