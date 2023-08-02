import todosApi from '../api'
import { useMutation } from '@tanstack/react-query'

export const useDeleteTodoMutation = () => {
  return useMutation({ mutationFn: todosApi.delete })
}
