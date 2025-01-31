// Generouted, changes to this file will be overridden

import { components, hooks, utils } from '@generouted/react-router/client'

// eslint-disable-next-line sonarjs/redundant-type-aliases
export type ModalPath = never

export interface Params {
  '/room/:uuid': { uuid: string }
}

export type Path =
  | '/'
  | '/room/:uuid'

export const { Link, Navigate } = components<Path, Params>()
export const { useModals, useNavigate, useParams } = hooks<Path, Params, ModalPath>()
export const { redirect } = utils<Path, Params>()
