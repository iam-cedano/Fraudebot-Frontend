const APP_ROUTES = {
  home: "/",
  contact: "/contacto",
  search: "/busqueda",
  scammer: "/estafadores/:id",
  organization: "/empresas/:id",
} as const;

function scammerPath(id: string) {
  return APP_ROUTES.scammer.replace(":id", id);
}

function organizationPath(id: string) {
  return APP_ROUTES.organization.replace(":id", id);
}

export { APP_ROUTES, scammerPath, organizationPath };
