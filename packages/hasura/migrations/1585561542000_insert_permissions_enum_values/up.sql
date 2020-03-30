-- Manually create migration to add the values to the hasura enum.
-- This is required before we can set the table to a hasura enum.
-- See: https://github.com/hasura/graphql-engine/issues/2817
INSERT INTO public.orion_permissions(permission_set)
    VALUES ('pages'), ('articles'), ('users') ON CONFLICT DO NOTHING;
