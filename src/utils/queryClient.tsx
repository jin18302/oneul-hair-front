import {
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider
} from '@tanstack/react-query';
import { HttpStatusCode, isAxiosError } from 'axios';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      throwOnError: true
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (isAxiosError(error) && error.response) {
        alert(error.response.data.errorMessage);
        return;
      }
    }
  }),
  mutationCache: new MutationCache({
    onError: (error) => {
      if (isAxiosError(error) && error.response) { //내가 터뜨린 예외
        alert(error.response.data.errorMessage);

        if (error.response.status == HttpStatusCode.Unauthorized) {
          //로그인 페이지로 이동
        }
      }
      alert(error.message);
    }
  })
})

export const QueryProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};