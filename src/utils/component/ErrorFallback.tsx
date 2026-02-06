import type { FallbackProps } from "react-error-boundary";

export default function ErrorFallBack({error, resetErrorBoundary}:FallbackProps){

return(
    <>
    <div>잠시후 다시 시도해 주세요</div>
    <button onClick={resetErrorBoundary}>retry</button>
    </>
)
}