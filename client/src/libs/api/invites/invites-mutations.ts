import { useMutation } from '@tanstack/react-query'
import { patchInvite } from './invites-api'

export const useAcceptInvite = () =>
  useMutation({
    mutationFn: patchInvite,
  })
