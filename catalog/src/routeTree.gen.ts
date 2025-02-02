/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as PrivateImport } from './routes/_private'
import { Route as AuthImport } from './routes/_auth'
import { Route as PrivateIndexImport } from './routes/_private/index'
import { Route as PrivateTagImport } from './routes/_private/$tag'
import { Route as AuthAuthImport } from './routes/_auth/auth'

// Create/Update Routes

const PrivateRoute = PrivateImport.update({
  id: '/_private',
  getParentRoute: () => rootRoute,
} as any)

const AuthRoute = AuthImport.update({
  id: '/_auth',
  getParentRoute: () => rootRoute,
} as any)

const PrivateIndexRoute = PrivateIndexImport.update({
  path: '/',
  getParentRoute: () => PrivateRoute,
} as any)

const PrivateTagRoute = PrivateTagImport.update({
  path: '/$tag',
  getParentRoute: () => PrivateRoute,
} as any)

const AuthAuthRoute = AuthAuthImport.update({
  path: '/auth',
  getParentRoute: () => AuthRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/_auth': {
      id: '/_auth'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof AuthImport
      parentRoute: typeof rootRoute
    }
    '/_private': {
      id: '/_private'
      path: ''
      fullPath: ''
      preLoaderRoute: typeof PrivateImport
      parentRoute: typeof rootRoute
    }
    '/_auth/auth': {
      id: '/_auth/auth'
      path: '/auth'
      fullPath: '/auth'
      preLoaderRoute: typeof AuthAuthImport
      parentRoute: typeof AuthImport
    }
    '/_private/$tag': {
      id: '/_private/$tag'
      path: '/$tag'
      fullPath: '/$tag'
      preLoaderRoute: typeof PrivateTagImport
      parentRoute: typeof PrivateImport
    }
    '/_private/': {
      id: '/_private/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof PrivateIndexImport
      parentRoute: typeof PrivateImport
    }
  }
}

// Create and export the route tree

interface AuthRouteChildren {
  AuthAuthRoute: typeof AuthAuthRoute
}

const AuthRouteChildren: AuthRouteChildren = {
  AuthAuthRoute: AuthAuthRoute,
}

const AuthRouteWithChildren = AuthRoute._addFileChildren(AuthRouteChildren)

interface PrivateRouteChildren {
  PrivateTagRoute: typeof PrivateTagRoute
  PrivateIndexRoute: typeof PrivateIndexRoute
}

const PrivateRouteChildren: PrivateRouteChildren = {
  PrivateTagRoute: PrivateTagRoute,
  PrivateIndexRoute: PrivateIndexRoute,
}

const PrivateRouteWithChildren =
  PrivateRoute._addFileChildren(PrivateRouteChildren)

export interface FileRoutesByFullPath {
  '': typeof PrivateRouteWithChildren
  '/auth': typeof AuthAuthRoute
  '/$tag': typeof PrivateTagRoute
  '/': typeof PrivateIndexRoute
}

export interface FileRoutesByTo {
  '': typeof AuthRouteWithChildren
  '/auth': typeof AuthAuthRoute
  '/$tag': typeof PrivateTagRoute
  '/': typeof PrivateIndexRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/_auth': typeof AuthRouteWithChildren
  '/_private': typeof PrivateRouteWithChildren
  '/_auth/auth': typeof AuthAuthRoute
  '/_private/$tag': typeof PrivateTagRoute
  '/_private/': typeof PrivateIndexRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths: '' | '/auth' | '/$tag' | '/'
  fileRoutesByTo: FileRoutesByTo
  to: '' | '/auth' | '/$tag' | '/'
  id:
    | '__root__'
    | '/_auth'
    | '/_private'
    | '/_auth/auth'
    | '/_private/$tag'
    | '/_private/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  AuthRoute: typeof AuthRouteWithChildren
  PrivateRoute: typeof PrivateRouteWithChildren
}

const rootRouteChildren: RootRouteChildren = {
  AuthRoute: AuthRouteWithChildren,
  PrivateRoute: PrivateRouteWithChildren,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* prettier-ignore-end */

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/_auth",
        "/_private"
      ]
    },
    "/_auth": {
      "filePath": "_auth.tsx",
      "children": [
        "/_auth/auth"
      ]
    },
    "/_private": {
      "filePath": "_private.tsx",
      "children": [
        "/_private/$tag",
        "/_private/"
      ]
    },
    "/_auth/auth": {
      "filePath": "_auth/auth.tsx",
      "parent": "/_auth"
    },
    "/_private/$tag": {
      "filePath": "_private/$tag.tsx",
      "parent": "/_private"
    },
    "/_private/": {
      "filePath": "_private/index.tsx",
      "parent": "/_private"
    }
  }
}
ROUTE_MANIFEST_END */
