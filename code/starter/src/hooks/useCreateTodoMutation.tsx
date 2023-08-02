import todosApi from '../api'
import { useMutation } from '@tanstack/react-query'

export const useCreateTodoMutation = () => {
  return useMutation({ mutationFn: todosApi.create })
}
