CREATE TABLE public.orion_content (
    parents integer[],
    path text,
    content_type text NOT NULL,
    title text NOT NULL,
    subtitle text,
    hero_img text,
    date_created date NOT NULL,
    date_modified date NOT NULL,
    date_published date,
    date_expired date,
    content text,
    id integer NOT NULL,
    summary text,
    status text
);
CREATE SEQUENCE public.orion_content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.orion_content_id_seq OWNED BY public.orion_content.id;
CREATE TABLE public.orion_group (
    parents integer[],
    name text,
    id integer NOT NULL
);
CREATE SEQUENCE public.orion_group_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.orion_group_id_seq OWNED BY public.orion_group.id;
CREATE TABLE public.orion_page (
    id integer NOT NULL,
    path text NOT NULL,
    layout text NOT NULL,
    title text NOT NULL,
    created timestamp with time zone DEFAULT now() NOT NULL,
    modified timestamp with time zone,
    published timestamp with time zone,
    expires timestamp with time zone,
    show_in_menu boolean NOT NULL,
    "position" integer DEFAULT 0 NOT NULL
);
CREATE TABLE public.orion_page_ancestry (
    page_id integer NOT NULL,
    ancestor_id integer NOT NULL,
    direct boolean DEFAULT false NOT NULL
);
CREATE TABLE public.orion_page_author (
    page_id integer NOT NULL,
    user_id integer NOT NULL
);
CREATE TABLE public.orion_page_content (
    id integer NOT NULL,
    page_id integer NOT NULL,
    block text NOT NULL,
    component text NOT NULL,
    props jsonb NOT NULL
);
CREATE SEQUENCE public.orion_page_content_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.orion_page_content_id_seq OWNED BY public.orion_page_content.id;
CREATE SEQUENCE public.orion_page_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.orion_page_id_seq OWNED BY public.orion_page.id;
CREATE TABLE public.orion_page_tag (
    page_id integer NOT NULL,
    tag_id text NOT NULL
);
CREATE TABLE public.orion_permissions (
    permission_set text NOT NULL
);
CREATE TABLE public.orion_role (
    parents integer[],
    name text,
    id integer NOT NULL
);
CREATE SEQUENCE public.orion_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.orion_role_id_seq OWNED BY public.orion_role.id;
CREATE TABLE public.orion_role_permissions (
    role_id integer NOT NULL,
    "create" boolean NOT NULL,
    read boolean NOT NULL,
    update boolean NOT NULL,
    delete boolean NOT NULL,
    permission_set text NOT NULL
);
CREATE TABLE public.orion_tag (
    tag text NOT NULL,
    hidden boolean NOT NULL
);
CREATE TABLE public.orion_user (
    id integer NOT NULL,
    cognito_id text NOT NULL,
    given_name text NOT NULL,
    email text NOT NULL,
    title text,
    avatar text,
    bio text,
    role_id integer NOT NULL,
    group_id integer NOT NULL
);
CREATE SEQUENCE public.orion_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
ALTER SEQUENCE public.orion_user_id_seq OWNED BY public.orion_user.id;
ALTER TABLE ONLY public.orion_content ALTER COLUMN id SET DEFAULT nextval('public.orion_content_id_seq'::regclass);
ALTER TABLE ONLY public.orion_group ALTER COLUMN id SET DEFAULT nextval('public.orion_group_id_seq'::regclass);
ALTER TABLE ONLY public.orion_page ALTER COLUMN id SET DEFAULT nextval('public.orion_page_id_seq'::regclass);
ALTER TABLE ONLY public.orion_page_content ALTER COLUMN id SET DEFAULT nextval('public.orion_page_content_id_seq'::regclass);
ALTER TABLE ONLY public.orion_role ALTER COLUMN id SET DEFAULT nextval('public.orion_role_id_seq'::regclass);
ALTER TABLE ONLY public.orion_user ALTER COLUMN id SET DEFAULT nextval('public.orion_user_id_seq'::regclass);
ALTER TABLE ONLY public.orion_content
    ADD CONSTRAINT orion_content_id_key UNIQUE (id);
ALTER TABLE ONLY public.orion_content
    ADD CONSTRAINT orion_content_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orion_group
    ADD CONSTRAINT orion_group_id_key UNIQUE (id);
ALTER TABLE ONLY public.orion_group
    ADD CONSTRAINT orion_group_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orion_page_ancestry
    ADD CONSTRAINT orion_page_ancestry_pkey PRIMARY KEY (page_id, ancestor_id);
ALTER TABLE ONLY public.orion_page_author
    ADD CONSTRAINT orion_page_author_pkey PRIMARY KEY (page_id, user_id);
ALTER TABLE ONLY public.orion_page_content
    ADD CONSTRAINT orion_page_content_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orion_page
    ADD CONSTRAINT orion_page_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orion_page_tag
    ADD CONSTRAINT orion_page_tag_pkey PRIMARY KEY (page_id, tag_id);
ALTER TABLE ONLY public.orion_permissions
    ADD CONSTRAINT orion_permissions_pkey PRIMARY KEY (permission_set);
ALTER TABLE ONLY public.orion_role
    ADD CONSTRAINT orion_role_id_key UNIQUE (id);
ALTER TABLE ONLY public.orion_role_permissions
    ADD CONSTRAINT orion_role_permissions_pkey PRIMARY KEY (role_id, permission_set);
ALTER TABLE ONLY public.orion_role
    ADD CONSTRAINT orion_role_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orion_tag
    ADD CONSTRAINT orion_tag_pkey PRIMARY KEY (tag);
ALTER TABLE ONLY public.orion_user
    ADD CONSTRAINT orion_user_cognito_id_key UNIQUE (cognito_id);
ALTER TABLE ONLY public.orion_user
    ADD CONSTRAINT orion_user_pkey PRIMARY KEY (id);
ALTER TABLE ONLY public.orion_page_ancestry
    ADD CONSTRAINT orion_page_ancestry_ancestor_id_fkey FOREIGN KEY (ancestor_id) REFERENCES public.orion_page(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.orion_page_ancestry
    ADD CONSTRAINT orion_page_ancestry_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.orion_page(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.orion_page_author
    ADD CONSTRAINT orion_page_author_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.orion_page(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.orion_page_author
    ADD CONSTRAINT orion_page_author_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.orion_user(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.orion_page_content
    ADD CONSTRAINT orion_page_content_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.orion_page(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.orion_page_tag
    ADD CONSTRAINT orion_page_tag_page_id_fkey FOREIGN KEY (page_id) REFERENCES public.orion_page(id) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.orion_page_tag
    ADD CONSTRAINT orion_page_tag_tag_id_fkey FOREIGN KEY (tag_id) REFERENCES public.orion_tag(tag) ON UPDATE RESTRICT ON DELETE RESTRICT;
ALTER TABLE ONLY public.orion_role_permissions
    ADD CONSTRAINT orion_role_permissions_permission_set_fkey FOREIGN KEY (permission_set) REFERENCES public.orion_permissions(permission_set) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.orion_role_permissions
    ADD CONSTRAINT orion_role_permissions_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.orion_role(id) ON UPDATE CASCADE ON DELETE CASCADE;
ALTER TABLE ONLY public.orion_user
    ADD CONSTRAINT orion_user_group_id_fkey FOREIGN KEY (group_id) REFERENCES public.orion_group(id) ON UPDATE SET NULL ON DELETE SET NULL;
ALTER TABLE ONLY public.orion_user
    ADD CONSTRAINT orion_user_role_id_fkey FOREIGN KEY (role_id) REFERENCES public.orion_role(id) ON UPDATE SET NULL ON DELETE SET NULL;
