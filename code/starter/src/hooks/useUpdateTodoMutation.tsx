import todosApi from '../api'
import { useMutation } from '@tanstack/react-query'

export const useUpdateTodoMutation = () => {
  return useMutation({ mutationFn: todosApi.update })
}
